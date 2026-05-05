package com.projexia.backend.controller;

import com.projexia.backend.dto.request.RiskRequest;
import com.projexia.backend.dto.response.RiskResponse;
import com.projexia.backend.model.StatutRisque;
import com.projexia.backend.service.RiskService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/risks")
@RequiredArgsConstructor
@Tag(name = "Risques", description = "Registre des risques M8")
public class RiskController {

    private final RiskService riskService;

    // ─── POST /api/risks ──────────────────────────────────────────────────────
    @PostMapping
    @Operation(summary = "Créer un risque", description = "Criticité calculée automatiquement")
    public ResponseEntity<RiskResponse> creerRisque(
            @Valid @RequestBody RiskRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(riskService.creerRisque(request));
    }

    // ─── GET /api/risks/{refProjet} ───────────────────────────────────────────
    @GetMapping("/{refProjet}")
    @Operation(summary = "Lister les risques d'un projet", description = "Triés par criticité décroissante")
    public ResponseEntity<List<RiskResponse>> listerRisques(
            @PathVariable String refProjet) {
        return ResponseEntity.ok(riskService.listerRisques(refProjet));
    }

    // ─── PUT /api/risks/{ref} ─────────────────────────────────────────────────
    @PutMapping("/{ref}")
    @Operation(summary = "Modifier un risque")
    public ResponseEntity<RiskResponse> modifierRisque(
            @PathVariable String ref,
            @Valid @RequestBody RiskRequest request) {
        return ResponseEntity.ok(riskService.modifierRisque(ref, request));
    }

    // ─── PATCH /api/risks/{ref}/statut ────────────────────────────────────────
    @PatchMapping("/{ref}/statut")
    @Operation(summary = "Changer le statut d'un risque")
    public ResponseEntity<RiskResponse> changerStatut(
            @PathVariable String ref,
            @RequestParam StatutRisque statut) {
        return ResponseEntity.ok(riskService.changerStatut(ref, statut));
    }

    // ─── DELETE /api/risks/{ref} ──────────────────────────────────────────────
    @DeleteMapping("/{ref}")
    @Operation(summary = "Supprimer un risque")
    public ResponseEntity<Void> supprimerRisque(@PathVariable String ref) {
        riskService.supprimerRisque(ref);
        return ResponseEntity.noContent().build();
    }
}