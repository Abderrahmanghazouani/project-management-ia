package com.projexia.backend.controller;

import com.projexia.backend.dto.request.CostRequest;
import com.projexia.backend.dto.response.CostResponse;
import com.projexia.backend.service.CostTrackingService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/costs")
@RequiredArgsConstructor
@Tag(name = "Couts", description = "Suivi des couts M10")
public class CostController {

    private final CostTrackingService costTrackingService;

    // ─── POST /api/costs ──────────────────────────────────────────────────────
    @PostMapping
    @PreAuthorize("hasRole('MANAGER')")
    @Operation(summary = "Enregistrer un coût", description = "Réservé au MANAGER")
    public ResponseEntity<CostResponse> enregistrerCout(
            @Valid @RequestBody CostRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(costTrackingService.enregistrerCout(request));
    }

    // ─── GET /api/costs/{refProjet} ───────────────────────────────────────────
    @GetMapping("/{refProjet}")
    @Operation(summary = "Historique des coûts d'un projet")
    public ResponseEntity<List<CostResponse>> listerCouts(
            @PathVariable String refProjet) {
        return ResponseEntity.ok(costTrackingService.listerCouts(refProjet));
    }

    // ─── GET /api/costs/{refProjet}/dernier ───────────────────────────────────
    @GetMapping("/{refProjet}/dernier")
    @Operation(summary = "Dernier coût enregistré pour un projet")
    public ResponseEntity<CostResponse> dernierCout(
            @PathVariable String refProjet) {
        return ResponseEntity.ok(costTrackingService.dernierCout(refProjet));
    }

    // ─── GET /api/costs/{refProjet}/ecart ─────────────────────────────────────
    @GetMapping("/{refProjet}/ecart")
    @Operation(summary = "Écart total budget prévu vs réel d'un projet")
    public ResponseEntity<BigDecimal> calculerEcartTotal(
            @PathVariable String refProjet) {
        return ResponseEntity.ok(costTrackingService.calculerEcartTotal(refProjet));
    }
}