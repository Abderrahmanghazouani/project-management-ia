package com.projexia.backend.service;



import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.projexia.backend.dto.response.EstimationResponse;
import com.projexia.backend.dto.response.IATaskResponse;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import io.github.resilience4j.retry.annotation.Retry;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * GeminiService — Appel à l'API Google Gemini
 *
 * Principes appliqués :
 * 1. Resilience4j CircuitBreaker → tolérance aux pannes
 * 2. Retry → réessayer 3 fois si échec
 * 3. Fallback → retourner mode manuel si Gemini indisponible
 * 4. @Value → clé API depuis application.properties
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class GeminiService {

    @Value("${gemini.api.key}")
    private String apiKey;

    @Value("${gemini.model:gemini-1.5-flash}")
    private String model;

    @Value("${gemini.timeout:30}")
    private int timeout;

    private final ObjectMapper objectMapper =
            new ObjectMapper();

    // ═══════════════════════════════════════════
    // ANALYSER LE CDC
    // ═══════════════════════════════════════════

    /**
     * Analyser un CDC avec Gemini
     *
     * CircuitBreaker : si 50% des appels échouent
     * → ouvrir le circuit → appeler fallback
     *
     * Retry : réessayer 3 fois avant d'appeler fallback
     */
    @CircuitBreaker(
            name = "geminiService",
            fallbackMethod = "fallbackAnalyse"
    )
    @Retry(name = "geminiService")
    public EstimationResponse analyserCDC(String cdcText) {
        log.info("Appel API Gemini pour analyse CDC...");

        String prompt = construirePrompt(cdcText);
        String jsonResponse = appellerGeminiAPI(prompt);
        return parserReponse(jsonResponse);
    }

    // ═══════════════════════════════════════════
    // FALLBACK — Si Gemini indisponible
    // ═══════════════════════════════════════════

    /**
     * Fallback appelé si CircuitBreaker est ouvert
     * ou si toutes les tentatives ont échoué
     */
    public EstimationResponse fallbackAnalyse(
            String cdcText,
            Throwable throwable) {

        log.warn("Gemini indisponible : {}",
                throwable.getMessage());

        return EstimationResponse.builder()
                .tasks(new ArrayList<>())
                .totalJours(0)
                .complexite("Faible")
                .risques(List.of(
                        "Service IA temporairement indisponible"))
                .manuel(true)
                .message(
                        "Service IA indisponible. " +
                                "Veuillez saisir les tâches manuellement.")
                .build();
    }

    // ═══════════════════════════════════════════
    // CONSTRUIRE LE PROMPT
    // ═══════════════════════════════════════════

    /**
     * Construire le prompt envoyé à Gemini
     * Format JSON imposé pour faciliter le parsing
     */
    private String construirePrompt(String cdcText) {
        return """
            Tu es un expert en gestion de projets informatiques.
            Analyse le cahier des charges suivant et retourne
            UNIQUEMENT un objet JSON valide
            (sans texte avant, sans balises markdown).

            Structure JSON attendue exactement :
            {
              "tasks": [
                {"title": "...", "estimated_days": <int>}
              ],
              "total_days": <int>,
              "complexity": "Faible | Moyenne | Elevee",
              "risks": ["risque 1", "risque 2"]
            }

            Cahier des charges a analyser :
            %s
            """.formatted(cdcText);
    }

    // ═══════════════════════════════════════════
    // APPELER L'API GEMINI
    // ═══════════════════════════════════════════

    /**
     * Appel HTTP vers l'API Google Gemini
     * Endpoint : POST generateContent
     */
    private String appellerGeminiAPI(String prompt) {
        String url = String.format(
                "https://generativelanguage.googleapis.com/" +
                        "v1beta/models/%s:generateContent?key=%s",
                model, apiKey
        );

        RestTemplate restTemplate = new RestTemplate();

        // Construire le body de la requête
        Map<String, Object> requestBody = Map.of(
                "contents", List.of(
                        Map.of("parts", List.of(
                                Map.of("text", prompt)
                        ))
                ),
                "generationConfig", Map.of(
                        "temperature", 0.1,
                        "maxOutputTokens", 2048
                )
        );

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, Object>> entity =
                new HttpEntity<>(requestBody, headers);

        log.info("Envoi requête à Gemini API...");

        ResponseEntity<String> response =
                restTemplate.postForEntity(
                        url, entity, String.class);

        if (response.getStatusCode() == HttpStatus.OK) {
            return extraireTexteReponse(
                    response.getBody());
        }

        throw new RuntimeException(
                "Erreur API Gemini : " +
                        response.getStatusCode());
    }

    // ═══════════════════════════════════════════
    // EXTRAIRE LE TEXTE DE LA RÉPONSE GEMINI
    // ═══════════════════════════════════════════

    /**
     * Extraire le texte JSON de la réponse Gemini
     * Structure : candidates[0].content.parts[0].text
     */
    private String extraireTexteReponse(String responseBody) {
        try {
            JsonNode root = objectMapper
                    .readTree(responseBody);

            String text = root
                    .path("candidates")
                    .get(0)
                    .path("content")
                    .path("parts")
                    .get(0)
                    .path("text")
                    .asText();

            // Nettoyer les balises markdown si présentes
            text = text.replaceAll("```json", "")
                    .replaceAll("```", "")
                    .trim();

            log.info("Réponse Gemini reçue : {}", text);
            return text;

        } catch (Exception e) {
            throw new RuntimeException(
                    "Erreur parsing réponse Gemini : "
                            + e.getMessage());
        }
    }

    // ═══════════════════════════════════════════
    // PARSER LA RÉPONSE JSON
    // ═══════════════════════════════════════════

    /**
     * Parser le JSON retourné par Gemini
     * en EstimationResponse
     */
    private EstimationResponse parserReponse(String json) {
        try {
            JsonNode root = objectMapper.readTree(json);

            // Parser les tâches
            List<IATaskResponse> tasks = new ArrayList<>();
            JsonNode tasksNode = root.path("tasks");
            for (JsonNode taskNode : tasksNode) {
                tasks.add(IATaskResponse.builder()
                        .titre(taskNode
                                .path("title").asText())
                        .joursEstimes(taskNode
                                .path("estimated_days").asInt())
                        .build());
            }

            // Parser les risques
            List<String> risques = new ArrayList<>();
            JsonNode risquesNode = root.path("risks");
            for (JsonNode risque : risquesNode) {
                risques.add(risque.asText());
            }

            return EstimationResponse.builder()
                    .tasks(tasks)
                    .totalJours(root
                            .path("total_days").asInt())
                    .complexite(root
                            .path("complexity").asText())
                    .risques(risques)
                    .manuel(false)
                    .message("Analyse IA réussie")
                    .build();

        } catch (Exception e) {
            throw new RuntimeException(
                    "Erreur parsing JSON Gemini : "
                            + e.getMessage());
        }
    }
}
