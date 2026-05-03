package com.projexia.backend.controller;



import com.projexia.backend.dto.request.ProjectRequest;
import com.projexia.backend.dto.response.ProjectResponse;
import com.projexia.backend.model.StatutProjet;
import com.projexia.backend.service.ProjectService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

/**
 * ProjectController — Endpoints REST Gestion des Projets
 *
 * Principes appliqués :
 * 1. @RestController  → retourne JSON automatiquement
 * 2. @PreAuthorize    → RBAC par endpoint
 * 3. @Valid           → Bean Validation sur les DTOs
 * 4. Pagination       → page + size + sort en paramètres
 * 5. @Operation       → documentation Swagger
 */
@RestController
@RequestMapping("/api/projects")
@RequiredArgsConstructor
@Tag(name = "Projets",
        description = "Gestion des projets M2")
public class ProjectController {

    private final ProjectService projectService;

    // ═══════════════════════════════════════════
    // POST /api/projects → Créer un projet
    // ═══════════════════════════════════════════

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER','CLIENT')")
    @Operation(
            summary = "Créer un projet",
            description = "Crée un nouveau projet avec nom, dates et budget"
    )
    public ResponseEntity<ProjectResponse> creerProjet(
            @Valid @RequestBody ProjectRequest request) {

        ProjectResponse response =
                projectService.creerProjet(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    // ═══════════════════════════════════════════
    // GET /api/projects → Lister avec pagination
    // ═══════════════════════════════════════════

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER','CLIENT')")
    @Operation(
            summary = "Lister les projets",
            description = "Liste paginée avec filtres optionnels"
    )
    public ResponseEntity<Page<ProjectResponse>> listerProjets(
            @RequestParam(defaultValue = "0")   int page,
            @RequestParam(defaultValue = "20")  int size,
            @RequestParam(defaultValue = "dateCreation")
            String sortBy,
            @RequestParam(required = false)
            StatutProjet statut,
            @RequestParam(required = false)
            String search) {

        Pageable pageable = PageRequest.of(
                page, size,
                Sort.by(Sort.Direction.DESC, sortBy));

        Page<ProjectResponse> projets;

        if (search != null && !search.isEmpty()) {
            projets = projectService
                    .rechercherParNom(search, pageable);
        } else if (statut != null) {
            projets = projectService
                    .listerParStatut(statut, pageable);
        } else {
            projets = projectService
                    .listerProjets(pageable);
        }

        return ResponseEntity.ok(projets);
    }

    // ═══════════════════════════════════════════
    // GET /api/projects/{ref} → Consulter
    // ═══════════════════════════════════════════

    @GetMapping("/{refProjet}")
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER','CLIENT','DEVELOPER')")
    @Operation(
            summary = "Consulter un projet",
            description = "Retourne tous les détails d'un projet"
    )
    public ResponseEntity<ProjectResponse> consulterProjet(
            @PathVariable String refProjet) {

        return ResponseEntity.ok(
                projectService.consulterProjet(refProjet));
    }

    // ═══════════════════════════════════════════
    // PUT /api/projects/{ref} → Modifier
    // ═══════════════════════════════════════════

    @PutMapping("/{refProjet}")
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    @Operation(
            summary = "Modifier un projet",
            description = "Met à jour les informations d'un projet"
    )
    public ResponseEntity<ProjectResponse> modifierProjet(
            @PathVariable String refProjet,
            @Valid @RequestBody ProjectRequest request) {

        return ResponseEntity.ok(
                projectService.modifierProjet(
                        refProjet, request));
    }

    // ═══════════════════════════════════════════
    // PATCH /api/projects/{ref}/statut → Changer statut
    // ═══════════════════════════════════════════

    @PatchMapping("/{refProjet}/statut")
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    @Operation(
            summary = "Changer le statut",
            description = "ACTIF | EN_PAUSE | TERMINE"
    )
    public ResponseEntity<ProjectResponse> changerStatut(
            @PathVariable String refProjet,
            @RequestParam StatutProjet statut) {

        return ResponseEntity.ok(
                projectService.changerStatut(
                        refProjet, statut));
    }
}