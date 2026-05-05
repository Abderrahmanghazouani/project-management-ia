package com.projexia.backend.controller;

import com.projexia.backend.dto.request.DeliverableRequest;
import com.projexia.backend.dto.response.DeliverableResponse;
import com.projexia.backend.model.StatutLivrable;
import com.projexia.backend.service.DeliverableService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/deliverables")
@RequiredArgsConstructor
@Tag(name = "Livrables", description = "Gestion livrables M9")
public class DeliverableController {

    private final DeliverableService deliverableService;

    // ─── POST /api/deliverables ───────────────────────────────────────────────
    @PostMapping
    @Operation(summary = "Créer un livrable",
            description = "Statut EN_RETARD automatique si datePrevue déjà dépassée")
    public ResponseEntity<DeliverableResponse> creerLivrable(
            @Valid @RequestBody DeliverableRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(deliverableService.creerLivrable(request));
    }

    // ─── GET /api/deliverables/{refProjet} ────────────────────────────────────
    @GetMapping("/{refProjet}")
    @Operation(summary = "Lister les livrables d'un projet")
    public ResponseEntity<List<DeliverableResponse>> listerLivrables(
            @PathVariable String refProjet) {
        return ResponseEntity.ok(deliverableService.listerLivrables(refProjet));
    }

    // ─── PUT /api/deliverables/{ref} ──────────────────────────────────────────
    @PutMapping("/{ref}")
    @Operation(summary = "Modifier un livrable")
    public ResponseEntity<DeliverableResponse> modifierLivrable(
            @PathVariable String ref,
            @Valid @RequestBody DeliverableRequest request) {
        return ResponseEntity.ok(deliverableService.modifierLivrable(ref, request));
    }

    // ─── PATCH /api/deliverables/{ref}/statut ─────────────────────────────────
    @PatchMapping("/{ref}/statut")
    @Operation(summary = "Changer le statut d'un livrable")
    public ResponseEntity<DeliverableResponse> marquerComme(
            @PathVariable String ref,
            @RequestParam StatutLivrable statut) {
        return ResponseEntity.ok(deliverableService.marquerComme(ref, statut));
    }
}