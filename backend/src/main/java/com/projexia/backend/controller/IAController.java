package com.projexia.backend.controller;

import com.projexia.backend.dto.request.CDCRequest;
import com.projexia.backend.dto.response.EstimationResponse;
import com.projexia.backend.service.FileExtractorService;
import com.projexia.backend.service.IAEstimationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

/**
 * IAController — Endpoints REST Module M3
 *
 * Principes appliqués :
 * 1. @RestController  → retourne JSON
 * 2. @PreAuthorize    → RBAC par endpoint
 * 3. @Valid           → validation DTOs
 * 4. @Operation       → documentation Swagger
 *
 * Endpoints :
 * POST /api/ia/analyze         → analyser texte brut
 * POST /api/ia/analyze/file    → analyser PDF/DOCX/TXT
 * PUT  /api/ia/confirm/{ref}   → confirmer estimation
 * PUT  /api/ia/reject/{ref}    → rejeter estimation
 * GET  /api/ia/{refProjet}     → historique estimations
 */
@RestController
@RequestMapping("/api/ia")
@RequiredArgsConstructor
@Tag(name = "Assistant IA",
        description = "Analyse CDC avec Gemini — M3")
public class IAController {

    private final IAEstimationService iaEstimationService;
    private final FileExtractorService fileExtractorService;

    // ═══════════════════════════════════════════
    // POST /api/ia/analyze → Analyser texte brut
    // ═══════════════════════════════════════════

    @PostMapping("/analyze")
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER','CLIENT')")
    @Operation(
            summary = "Analyser un CDC (texte brut)",
            description =
                    "Envoie le texte du CDC à Gemini et retourne " +
                            "tâches, durée, complexité et risques. " +
                            "Si Gemini indisponible → fallback manuel."
    )
    public ResponseEntity<EstimationResponse> analyserCDC(
            @Valid @RequestBody CDCRequest request) {

        EstimationResponse response =
                iaEstimationService
                        .analyserEtSauvegarder(request);

        return ResponseEntity.ok(response);
    }

    // ═══════════════════════════════════════════
    // POST /api/ia/analyze/file → Analyser fichier
    // ═══════════════════════════════════════════

    @PostMapping(
            value = "/analyze/file",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER','CLIENT')")
    @Operation(
            summary = "Analyser un CDC depuis fichier",
            description =
                    "Uploader un fichier PDF, DOCX ou TXT. " +
                            "Le texte est extrait automatiquement " +
                            "puis envoyé à Gemini pour analyse."
    )
    public ResponseEntity<EstimationResponse> analyserFichier(
            @RequestParam("file") MultipartFile file,
            @RequestParam("refProjet") String refProjet,
            @RequestParam("matriculeClient")
            String matriculeClient)
            throws IOException {

        // ── Étape 1 : Extraire le texte du fichier ──
        String texte = fileExtractorService
                .extraireTexte(file);

        // ── Étape 2 : Construire la requête CDC ──────
        CDCRequest request = CDCRequest.builder()
                .texteCdc(texte)
                .refProjet(refProjet)
                .matriculeClient(matriculeClient)
                .build();

        // ── Étape 3 : Même logique que texte brut ────
        EstimationResponse response =
                iaEstimationService
                        .analyserEtSauvegarder(request);

        return ResponseEntity.ok(response);
    }

    // ═══════════════════════════════════════════
    // PUT /api/ia/confirm/{ref} → Confirmer
    // ═══════════════════════════════════════════

    @PutMapping("/confirm/{refEstimation}")
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER','CLIENT')")
    @Operation(
            summary = "Confirmer l'estimation IA",
            description =
                    "Client valide l'estimation → " +
                            "statut passe à CONFIRMEE → déclenche M4"
    )
    public ResponseEntity<EstimationResponse> confirmer(
            @PathVariable String refEstimation) {

        return ResponseEntity.ok(
                iaEstimationService
                        .confirmerEstimation(refEstimation));
    }

    // ═══════════════════════════════════════════
    // PUT /api/ia/reject/{ref} → Rejeter
    // ═══════════════════════════════════════════

    @PutMapping("/reject/{refEstimation}")
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER','CLIENT')")
    @Operation(
            summary = "Rejeter l'estimation IA",
            description =
                    "Client rejette l'estimation → " +
                            "statut passe à REJETEE → saisie manuelle"
    )
    public ResponseEntity<EstimationResponse> rejeter(
            @PathVariable String refEstimation) {

        return ResponseEntity.ok(
                iaEstimationService
                        .rejeterEstimation(refEstimation));
    }

    // ═══════════════════════════════════════════
    // GET /api/ia/{refProjet} → Historique
    // ═══════════════════════════════════════════

    @GetMapping("/{refProjet}")
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER','CLIENT')")
    @Operation(
            summary = "Historique des estimations",
            description =
                    "Retourne toutes les estimations " +
                            "d'un projet (versionnées)"
    )
    public ResponseEntity<List<EstimationResponse>> historique(
            @PathVariable String refProjet) {

        return ResponseEntity.ok(
                iaEstimationService.historique(refProjet));
    }
}