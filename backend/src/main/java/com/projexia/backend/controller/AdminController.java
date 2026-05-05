package com.projexia.backend.controller;



import com.projexia.backend.dto.request.UpdateRoleRequest;
import com.projexia.backend.dto.response.UserResponse;
import com.projexia.backend.model.Role;
import com.projexia.backend.service.AdminService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

/**
 * AdminController — Endpoints Administration M12
 *
 * Tous les endpoints sont réservés au rôle ADMIN
 * Protection via @PreAuthorize("hasRole('ADMIN')")
 */
@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
@Tag(name = "Administration",
        description = "Gestion utilisateurs M12 — ADMIN only")
public class AdminController {

    private final AdminService adminService;

    // ═══════════════════════════════════════════
    // GET /api/admin/users → Lister
    // ═══════════════════════════════════════════

    @GetMapping("/users")
    @Operation(
            summary = "Lister tous les utilisateurs",
            description = "Liste paginée — ADMIN uniquement"
    )
    public ResponseEntity<Page<UserResponse>> listerUtilisateurs(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(required = false) Role role) {

        Pageable pageable = PageRequest.of(
                page, size,
                Sort.by("nom").ascending());

        if (role != null) {
            return ResponseEntity.ok(
                    adminService.listerParRole(
                            role, pageable));
        }

        return ResponseEntity.ok(
                adminService.listerUtilisateurs(pageable));
    }

    // ═══════════════════════════════════════════
    // GET /api/admin/users/{matricule}
    // ═══════════════════════════════════════════

    @GetMapping("/users/{matricule}")
    @Operation(summary = "Consulter un utilisateur")
    public ResponseEntity<UserResponse> consulter(
            @PathVariable String matricule) {

        return ResponseEntity.ok(
                adminService.consulterUtilisateur(
                        matricule));
    }

    // ═══════════════════════════════════════════
    // PUT /api/admin/users/{matricule}/role
    // ═══════════════════════════════════════════

    @PutMapping("/users/{matricule}/role")
    @Operation(
            summary = "Modifier le rôle",
            description = "Changer le rôle d'un utilisateur"
    )
    public ResponseEntity<UserResponse> modifierRole(
            @PathVariable String matricule,
            @Valid @RequestBody UpdateRoleRequest request) {

        return ResponseEntity.ok(
                adminService.modifierRole(
                        matricule, request));
    }

    // ═══════════════════════════════════════════
    // PATCH /api/admin/users/{matricule}/toggle
    // ═══════════════════════════════════════════

    @PatchMapping("/users/{matricule}/toggle")
    @Operation(
            summary = "Activer / Désactiver un compte",
            description = "Toggle le statut actif du compte"
    )
    public ResponseEntity<UserResponse> toggleActif(
            @PathVariable String matricule) {

        return ResponseEntity.ok(
                adminService.toggleActif(matricule));
    }
}