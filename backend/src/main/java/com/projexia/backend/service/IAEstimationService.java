package com.projexia.backend.service;



import com.projexia.backend.dto.request.CDCRequest;
import com.projexia.backend.dto.response.EstimationResponse;
import com.projexia.backend.dto.response.IATaskResponse;
import com.projexia.backend.model.*;
import com.projexia.backend.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Year;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;

/**
 * IAEstimationService — Logique métier M3
 *
 * Principes appliqués :
 * 1. @Transactional → tout réussit ou tout échoue
 * 2. Appel GeminiService → analyse CDC
 * 3. Sauvegarde BD → estimation versionnée
 * 4. Confirmation/Rejet → changement de statut
 */
@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class IAEstimationService {

    private final GeminiService geminiService;
    private final IAEstimationRepository estimationRepository;
    private final IATaskRepository taskRepository;
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

    private static final AtomicInteger counter =
            new AtomicInteger(1);

    // ═══════════════════════════════════════════
    // ANALYSER ET SAUVEGARDER
    // ═══════════════════════════════════════════

    /**
     * Analyser le CDC avec Gemini et sauvegarder
     *
     * Workflow :
     * 1. Charger le projet et le client
     * 2. Appeler GeminiService
     * 3. Sauvegarder IAEstimation en BD
     * 4. Sauvegarder les IATask en BD
     * 5. Retourner EstimationResponse
     */
    public EstimationResponse analyserEtSauvegarder(
            CDCRequest request) {

        // ── Charger le projet ─────────────────
        Project projet = projectRepository
                .findById(request.getRefProjet())
                .orElseThrow(() -> new RuntimeException(
                        "Projet introuvable : "
                                + request.getRefProjet()));

        // ── Charger le client ─────────────────
        User client = userRepository
                .findByMatricule(request.getMatriculeClient())
                .orElseThrow(() -> new RuntimeException(
                        "Client introuvable : "
                                + request.getMatriculeClient()));

        // ── Appeler Gemini ────────────────────
        log.info("Analyse CDC pour projet : {}",
                request.getRefProjet());

        EstimationResponse geminiResult =
                geminiService.analyserCDC(
                        request.getTexteCdc());

        // ── Générer la référence ──────────────
        String refEstimation = genererRef();

        // ── Convertir risques en String ───────
        String risquesString = "";
        if (geminiResult.getRisques() != null) {
            risquesString = String.join("|",
                    geminiResult.getRisques());
        }

        // ── Sauvegarder IAEstimation ──────────
        IAEstimation estimation = IAEstimation.builder()
                .refEstimation(refEstimation)
                .texteCdc(request.getTexteCdc())
                .totalJours(geminiResult.getTotalJours())
                .complexite(geminiResult.getComplexite())
                .risques(risquesString)
                .statut(StatutEstimation.EN_ATTENTE)
                .projet(projet)
                .client(client)
                .build();

        estimationRepository.save(estimation);

        // ── Sauvegarder les IATask ────────────
        if (geminiResult.getTasks() != null) {
            int taskCounter = 1;
            for (IATaskResponse taskResp :
                    geminiResult.getTasks()) {

                IATask task = IATask.builder()
                        .refTacheIa(refEstimation
                                + "-T" + taskCounter++)
                        .titre(taskResp.getTitre())
                        .joursEstimes(
                                taskResp.getJoursEstimes())
                        .estimation(estimation)
                        .build();

                taskRepository.save(task);
            }
        }

        // ── Retourner la réponse ──────────────
        List<IATask> tasks = taskRepository
                .findByEstimationRefEstimation(
                        refEstimation);

        EstimationResponse response =
                EstimationResponse.fromEntity(
                        estimation, tasks);

        response.setMessage(geminiResult.isManuel() ?
                "Service IA indisponible. Saisie manuelle." :
                "Analyse IA réussie !");

        response.setManuel(geminiResult.isManuel());

        return response;
    }

    // ═══════════════════════════════════════════
    // CONFIRMER L'ESTIMATION
    // ═══════════════════════════════════════════

    /**
     * Client confirme l'estimation
     * → Statut passe à CONFIRMEE
     * → Déclenche M4 (distribution des tâches)
     */
    public EstimationResponse confirmerEstimation(
            String refEstimation) {

        IAEstimation estimation = estimationRepository
                .findById(refEstimation)
                .orElseThrow(() -> new RuntimeException(
                        "Estimation introuvable : "
                                + refEstimation));

        if (estimation.getStatut() !=
                StatutEstimation.EN_ATTENTE) {
            throw new RuntimeException(
                    "Seule une estimation EN_ATTENTE " +
                            "peut être confirmée");
        }

        estimation.setStatut(StatutEstimation.CONFIRMEE);
        estimationRepository.save(estimation);

        log.info("Estimation confirmée : {}",
                refEstimation);

        List<IATask> tasks = taskRepository
                .findByEstimationRefEstimation(
                        refEstimation);

        return EstimationResponse.fromEntity(
                estimation, tasks);
    }

    // ═══════════════════════════════════════════
    // REJETER L'ESTIMATION
    // ═══════════════════════════════════════════

    /**
     * Client rejette l'estimation
     * → Statut passe à REJETEE
     * → Saisie manuelle possible
     */
    public EstimationResponse rejeterEstimation(
            String refEstimation) {

        IAEstimation estimation = estimationRepository
                .findById(refEstimation)
                .orElseThrow(() -> new RuntimeException(
                        "Estimation introuvable : "
                                + refEstimation));

        if (estimation.getStatut() !=
                StatutEstimation.EN_ATTENTE) {
            throw new RuntimeException(
                    "Seule une estimation EN_ATTENTE " +
                            "peut être rejetée");
        }

        estimation.setStatut(StatutEstimation.REJETEE);
        estimationRepository.save(estimation);

        log.info("Estimation rejetée : {}",
                refEstimation);

        List<IATask> tasks = taskRepository
                .findByEstimationRefEstimation(
                        refEstimation);

        return EstimationResponse.fromEntity(
                estimation, tasks);
    }

    // ═══════════════════════════════════════════
    // HISTORIQUE DES ESTIMATIONS
    // ═══════════════════════════════════════════

    /**
     * Retourner toutes les estimations d'un projet
     */
    @Transactional(readOnly = true)
    public List<EstimationResponse> historique(
            String refProjet) {

        return estimationRepository
                .findByProjetRefProjet(refProjet)
                .stream()
                .map(estimation -> {
                    List<IATask> tasks = taskRepository
                            .findByEstimationRefEstimation(
                                    estimation.getRefEstimation());
                    return EstimationResponse
                            .fromEntity(estimation, tasks);
                })
                .collect(Collectors.toList());
    }

    // ═══════════════════════════════════════════
    // UTILITAIRE
    // ═══════════════════════════════════════════

    private String genererRef() {
        int annee = Year.now().getValue();
        int numero = counter.getAndIncrement();
        return String.format("EST-%d-%03d",
                annee, numero);
    }
}
