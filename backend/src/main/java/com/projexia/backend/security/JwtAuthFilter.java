package com.projexia.backend.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

/**
 * JwtAuthFilter — Filtre de sécurité JWT
 *
 * Principe :
 * Intercepte CHAQUE requête HTTP une seule fois
 * (extends OncePerRequestFilter)
 *
 * Workflow :
 * 1. Lire le header Authorization
 * 2. Extraire le token Bearer
 * 3. Valider le token avec JwtService
 * 4. Charger l'utilisateur depuis la BD
 * 5. Mettre l'utilisateur dans le SecurityContext
 * 6. Passer la requête au controller
 */
@Component
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain)
            throws ServletException, IOException {

        // ── Étape 1 : Lire le header Authorization ──
        final String authHeader = request.getHeader("Authorization");

        // Si pas de header ou ne commence pas par "Bearer "
        // → passer au filtre suivant sans authentifier
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        // ── Étape 2 : Extraire le token ──────────────
        // "Bearer eyJhbGciOiJI..." → "eyJhbGciOiJI..."
        final String token = authHeader.substring(7);

        // ── Étape 3 : Extraire l'email du token ──────
        final String email;
        try {
            email = jwtService.extraireEmail(token);
        } catch (Exception e) {
            // Token malformé ou invalide
            filterChain.doFilter(request, response);
            return;
        }

        // ── Étape 4 : Vérifier si déjà authentifié ───
        // Si email extrait et pas encore authentifié
        if (email != null &&
                SecurityContextHolder.getContext()
                        .getAuthentication() == null) {

            // ── Étape 5 : Charger l'utilisateur BD ───
            UserDetails userDetails =
                    userDetailsService.loadUserByUsername(email);

            // ── Étape 6 : Valider le token ────────────
            if (jwtService.validerToken(token, userDetails)) {

                // ── Étape 7 : Créer l'authentification ─
                UsernamePasswordAuthenticationToken authToken =
                        new UsernamePasswordAuthenticationToken(
                                userDetails,
                                null,
                                userDetails.getAuthorities()
                        );

                authToken.setDetails(
                        new WebAuthenticationDetailsSource()
                                .buildDetails(request)
                );

                // ── Étape 8 : Mettre dans le contexte ──
                // Spring Security sait maintenant
                // qui fait la requête
                SecurityContextHolder.getContext()
                        .setAuthentication(authToken);
            }
        }

        // ── Étape 9 : Passer au controller ───────────
        filterChain.doFilter(request, response);
    }
}