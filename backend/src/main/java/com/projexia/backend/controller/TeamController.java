package com.projexia.backend.controller;



import com.projexia.backend.dto.request.MemberRequest;
import com.projexia.backend.dto.response.DistributionResponse;
import com.projexia.backend.dto.response.MemberResponse;
import com.projexia.backend.service.TeamService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * TeamController — Endpoints REST M4
 *
 * Principes appliqués :
 * 1. @RestController  → retourne JSON
 * 2. @PreAuthorize    → RBAC par endpoint
 * 3. @Valid           → validation DTOs
 * 4. @Operation       → documentation Swagger
 */
@RestController
@RequestMapping("/api/projects/{refProjet}/team")
@RequiredArgsConstructor
@Tag(name = "Équipe",
        description = "Gestion équipe & distribution M4")
public class TeamController {

    private final TeamService teamService;

    // ═══════════════════════════════════════════
    // POST /api/projects/{ref}/team
    // ═══════════════════════════════════════════

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    @Operation(
            summary = "Ajouter un membre",
            description = "Ajouter un utilisateur au projet"
    )
    public ResponseEntity<MemberResponse> ajouterMembre(
            @PathVariable String refProjet,
            @Valid @RequestBody MemberRequest request) {

        MemberResponse response =
                teamService.ajouterMembre(
                        refProjet, request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    // ═══════════════════════════════════════════
    // GET /api/projects/{ref}/team
    // ═══════════════════════════════════════════

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER','CLIENT','DEVELOPER')")
    @Operation(
            summary = "Lister les membres",
            description = "Retourne tous les membres du projet"
    )
    public ResponseEntity<List<MemberResponse>> listerMembres(
            @PathVariable String refProjet) {

        return ResponseEntity.ok(
                teamService.listerMembres(refProjet));
    }

    // ═══════════════════════════════════════════
    // DELETE /api/projects/{ref}/team/{refMembre}
    // ═══════════════════════════════════════════

    @DeleteMapping("/{refMembre}")
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    @Operation(
            summary = "Supprimer un membre",
            description = "Retirer un membre du projet"
    )
    public ResponseEntity<Void> supprimerMembre(
            @PathVariable String refProjet,
            @PathVariable String refMembre) {

        teamService.supprimerMembre(refMembre);
        return ResponseEntity.noContent().build();
    }

    // ═══════════════════════════════════════════
    // POST /api/projects/{ref}/team/distribute
    // ═══════════════════════════════════════════

    @PostMapping("/distribute/{refEstimation}")
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    @Operation(
            summary = "Distribuer les tâches IA",
            description =
                    "Distribution automatique des tâches " +
                            "entre les membres via algorithme round-robin"
    )
    public ResponseEntity<DistributionResponse> distribuerTaches(
            @PathVariable String refProjet,
            @PathVariable String refEstimation) {

        return ResponseEntity.ok(
                teamService.distribuerTaches(
                        refProjet, refEstimation));
    }
}