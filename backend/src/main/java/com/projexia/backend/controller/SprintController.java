package com.projexia.backend.controller;

import com.projexia.backend.dto.request.SprintRequest;
import com.projexia.backend.dto.response.SprintResponse;
import com.projexia.backend.model.StatutSprint;
import com.projexia.backend.service.SprintService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/sprints")
@RequiredArgsConstructor
@Tag(name = "Sprints", description = "Sprints & Planning")
public class SprintController {

    private final SprintService sprintService;

    // ─── POST /api/sprints ────────────────────────────────────────────────────
    @PostMapping
    @PreAuthorize("hasRole('MANAGER')")
    @Operation(summary = "Créer un sprint", description = "Réservé au MANAGER")
    public ResponseEntity<SprintResponse> creerSprint(
            @Valid @RequestBody SprintRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(sprintService.creerSprint(request));
    }

    // ─── GET /api/sprints/projet/{refProjet} ──────────────────────────────────
    @GetMapping("/projet/{refProjet}")
    @Operation(summary = "Lister les sprints d'un projet", description = "Liste paginée des sprints (20/page)")
    public ResponseEntity<Page<SprintResponse>> listerSprints(
            @PathVariable String refProjet,
            @PageableDefault(size = 20) Pageable pageable) {
        return ResponseEntity.ok(sprintService.listerSprints(refProjet, pageable));
    }

    // ─── GET /api/sprints/{refSprint} ─────────────────────────────────────────
    @GetMapping("/{refSprint}")
    @Operation(summary = "Consulter un sprint")
    public ResponseEntity<SprintResponse> consulterSprint(
            @PathVariable String refSprint) {
        return ResponseEntity.ok(sprintService.consulterSprint(refSprint));
    }

    // ─── PUT /api/sprints/{refSprint}/tickets/{refTicket} ─────────────────────
    @PutMapping("/{refSprint}/tickets/{refTicket}")
    @Operation(summary = "Affecter un ticket à un sprint")
    public ResponseEntity<SprintResponse> affecterTicket(
            @PathVariable String refSprint,
            @PathVariable String refTicket) {
        return ResponseEntity.ok(sprintService.affecterTicket(refSprint, refTicket));
    }

    // ─── PUT /api/sprints/{refSprint}/statut ──────────────────────────────────
    @PutMapping("/{refSprint}/statut")
    @Operation(summary = "Changer le statut d'un sprint")
    public ResponseEntity<SprintResponse> changerStatut(
            @PathVariable String refSprint,
            @RequestParam StatutSprint statut) {
        return ResponseEntity.ok(sprintService.changerStatut(refSprint, statut));
    }
}