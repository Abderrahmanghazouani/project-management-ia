package com.projexia.backend.controller;



import com.projexia.backend.dto.request.CDCRequest;
import com.projexia.backend.dto.response.EstimationResponse;
import com.projexia.backend.service.IAEstimationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * IAController — Endpoints REST Module M3
 *
 * Principes appliqués :
 * 1. @RestController  → retourne JSON
 * 2. @PreAuthorize    → RBAC par endpoint
 * 3. @Valid           → validation DTOs
 * 4. @Operation       → documentation Swagger
 */
@RestController
@RequestMapping("/api/ia")
@RequiredArgsConstructor
@Tag(name = "Assistant IA",
        description = "Analyse CDC avec Gemini — M3")
public class IAController {

    private final IAEstimationService iaEstimationService;

    // ═══════════════════════════════════════════
    // POST /api/ia/analyze → Analyser le CDC
    // ═══════════════════════════════════════════

    @PostMapping("/analyze")
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER','CLIENT')")
    @Operation(
            summary = "Analyser un CDC avec Gemini",
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