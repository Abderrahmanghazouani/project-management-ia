package com.projexia.backend.service;



import com.projexia.backend.dto.request.LoginRequest;
import com.projexia.backend.dto.request.RegisterRequest;
import com.projexia.backend.dto.response.AuthResponse;
import com.projexia.backend.model.User;
import com.projexia.backend.repository.UserRepository;
import com.projexia.backend.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Year;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * AuthService — Logique métier d'authentification
 *
 * Principes appliqués :
 * 1. @Service      → Spring IOC gère cette instance
 * 2. @Transactional→ JTA — tout réussit ou tout échoue
 * 3. BCrypt        → hashage du mot de passe
 * 4. JWT           → génération du token après auth
 */
@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    // Compteur pour générer les matricules uniques
    private static final AtomicInteger counter =
            new AtomicInteger(1);

    // ═══════════════════════════════════════════
    // REGISTER — Créer un nouveau compte
    // ═══════════════════════════════════════════

    /**
     * Créer un nouveau compte utilisateur
     *
     * Workflow :
     * 1. Vérifier que l'email n'existe pas déjà
     * 2. Générer un matricule unique
     * 3. Hasher le mot de passe avec BCrypt
     * 4. Sauvegarder en BD via Flyway
     * 5. Générer et retourner le token JWT
     *
     * @param request → données du formulaire register
     * @return AuthResponse → token + infos utilisateur
     */
    @Transactional
    public AuthResponse register(RegisterRequest request) {

        // ── Étape 1 : Vérifier email unique ──────
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException(
                    "Email déjà utilisé : " + request.getEmail()
            );
        }

        // ── Étape 2 : Générer le matricule ────────
        String matricule = genererMatricule(
                request.getRole().name()
        );

        // ── Étape 3 : Créer l'utilisateur ─────────
        User user = User.builder()
                .matricule(matricule)
                .nom(request.getNom())
                .prenom(request.getPrenom())
                .email(request.getEmail())
                // BCrypt hache le mot de passe
                // "password123" → "$2a$10$xyz..."
                .motDePasse(passwordEncoder.encode(
                        request.getMotDePasse()))
                .role(request.getRole())
                .actif(true)
                .build();

        // ── Étape 4 : Sauvegarder en BD ───────────
        userRepository.save(user);

        // ── Étape 5 : Générer le token JWT ────────
        String token = jwtService.genererToken(user);

        return AuthResponse.builder()
                .token(token)
                .matricule(user.getMatricule())
                .nom(user.getNom())
                .prenom(user.getPrenom())
                .email(user.getEmail())
                .role(user.getRole())
                .message("Compte créé avec succès")
                .build();
    }

    // ═══════════════════════════════════════════
    // LOGIN — Se connecter
    // ═══════════════════════════════════════════

    /**
     * Authentifier un utilisateur existant
     *
     * Workflow :
     * 1. Spring Security vérifie email + mot de passe
     * 2. Si OK → charger l'utilisateur depuis la BD
     * 3. Générer et retourner le token JWT
     *
     * @param request → email + mot de passe
     * @return AuthResponse → token + infos utilisateur
     */
    @Transactional(readOnly = true)
    public AuthResponse login(LoginRequest request) {

        // ── Étape 1 : Vérifier les credentials ───
        // Spring Security compare automatiquement
        // le mot de passe avec le hash BCrypt en BD
        // Lance BadCredentialsException si incorrect
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getMotDePasse()
                )
        );

        // ── Étape 2 : Charger l'utilisateur ──────
        User user = userRepository
                .findByEmail(request.getEmail())
                .orElseThrow(() ->
                        new RuntimeException("Utilisateur introuvable")
                );

        // ── Étape 3 : Générer le token JWT ────────
        String token = jwtService.genererToken(user);

        return AuthResponse.builder()
                .token(token)
                .matricule(user.getMatricule())
                .nom(user.getNom())
                .prenom(user.getPrenom())
                .email(user.getEmail())
                .role(user.getRole())
                .message("Connexion réussie")
                .build();
    }

    // ═══════════════════════════════════════════
    // UTILITAIRE — Générer un matricule unique
    // ═══════════════════════════════════════════

    /**
     * Générer un matricule unique basé sur le rôle
     *
     * Format : PREFIX-ANNEE-NNN
     * Exemples :
     * ADMIN     → ADM-2024-001
     * MANAGER   → MGR-2024-002
     * DEVELOPER → DEV-2024-003
     * CLIENT    → CLT-2024-004
     */
    private String genererMatricule(String role) {
        String prefix = switch (role) {
            case "ADMIN"     -> "ADM";
            case "MANAGER"   -> "MGR";
            case "DEVELOPER" -> "DEV";
            case "CLIENT"    -> "CLT";
            default          -> "USR";
        };

        int annee = Year.now().getValue();
        int numero = counter.getAndIncrement();

        return String.format("%s-%d-%03d",
                prefix, annee, numero);
    }
}
