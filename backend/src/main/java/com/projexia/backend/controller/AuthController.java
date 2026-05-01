package com.projexia.backend.controller;



import com.projexia.backend.dto.request.LoginRequest;
import com.projexia.backend.dto.request.RegisterRequest;
import com.projexia.backend.dto.response.AuthResponse;
import com.projexia.backend.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * AuthController — Endpoints d'authentification
 *
 * Principes appliqués :
 * 1. @RestController  → retourne JSON automatiquement
 * 2. @Valid           → Bean Validation sur les DTOs
 * 3. @Operation       → documentation Swagger
 * 4. ResponseEntity   → contrôle du code HTTP retourné
 *
 * Endpoints publics (pas de JWT requis) :
 * POST /api/auth/register → créer un compte
 * POST /api/auth/login    → se connecter
 */
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@Tag(name = "Authentification",
        description = "Register et Login")
public class AuthController {

    private final AuthService authService;

    // ═══════════════════════════════════════════
    // POST /api/auth/register
    // ═══════════════════════════════════════════

    /**
     * Créer un nouveau compte utilisateur
     *
     * @param request → nom, prenom, email,
     *                  motDePasse, role
     * @return 201 CREATED + token JWT
     */
    @PostMapping("/register")
    @Operation(
            summary = "Créer un compte",
            description = "Inscription d'un nouvel utilisateur"
    )
    public ResponseEntity<AuthResponse> register(
            @Valid @RequestBody RegisterRequest request) {

        AuthResponse response = authService.register(request);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    // ═══════════════════════════════════════════
    // POST /api/auth/login
    // ═══════════════════════════════════════════

    /**
     * Authentifier un utilisateur existant
     *
     * @param request → email + motDePasse
     * @return 200 OK + token JWT
     */
    @PostMapping("/login")
    @Operation(
            summary = "Se connecter",
            description = "Login avec email et mot de passe"
    )
    public ResponseEntity<AuthResponse> login(
            @Valid @RequestBody LoginRequest request) {

        AuthResponse response = authService.login(request);
        return ResponseEntity.ok(response);
    }
}
