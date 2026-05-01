package com.projexia.backend.exception;


import com.projexia.backend.dto.response.ErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

/**
 * GlobalExceptionHandler — Gestion centralisée des erreurs
 *
 * Principe @RestControllerAdvice :
 * Intercepte TOUTES les exceptions de l'application
 * et retourne un JSON propre au lieu d'un stacktrace
 *
 * Sans ce handler :
 * → Frontend reçoit une page HTML d'erreur illisible
 *
 * Avec ce handler :
 * → Frontend reçoit { "status": 404, "message": "..." }
 */
@RestControllerAdvice
public class GlobalExceptionHandler {

    // ═══════════════════════════════════════════
    // Erreurs de validation (@Valid)
    // ═══════════════════════════════════════════

    /**
     * Intercepte les erreurs de validation Bean
     * Ex: email invalide, mot de passe trop court
     *
     * Retourne : 400 Bad Request + liste des erreurs
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidation(
            MethodArgumentNotValidException ex) {

        Map<String, String> erreurs = new HashMap<>();

        ex.getBindingResult()
                .getAllErrors()
                .forEach(error -> {
                    String champ = ((FieldError) error)
                            .getField();
                    String message = error.getDefaultMessage();
                    erreurs.put(champ, message);
                });

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(erreurs);
    }

    // ═══════════════════════════════════════════
    // Mauvais credentials (login raté)
    // ═══════════════════════════════════════════

    /**
     * Email ou mot de passe incorrect
     * Retourne : 401 Unauthorized
     */
    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ErrorResponse> handleBadCredentials(
            BadCredentialsException ex) {

        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body(new ErrorResponse(
                        401,
                        "Email ou mot de passe incorrect"
                ));
    }

    // ═══════════════════════════════════════════
    // Utilisateur introuvable
    // ═══════════════════════════════════════════

    /**
     * Utilisateur non trouvé en BD
     * Retourne : 404 Not Found
     */
    @ExceptionHandler(UsernameNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleUserNotFound(
            UsernameNotFoundException ex) {

        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(new ErrorResponse(404, ex.getMessage()));
    }

    // ═══════════════════════════════════════════
    // Erreurs métier (RuntimeException)
    // ═══════════════════════════════════════════

    /**
     * Erreurs métier génériques
     * Ex: email déjà utilisé
     * Retourne : 400 Bad Request
     */
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ErrorResponse> handleRuntime(
            RuntimeException ex) {

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(new ErrorResponse(400, ex.getMessage()));
    }

    // ═══════════════════════════════════════════
    // Erreurs inattendues
    // ═══════════════════════════════════════════

    /**
     * Toute autre erreur non gérée
     * Retourne : 500 Internal Server Error
     */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGeneral(
            Exception ex) {

        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ErrorResponse(
                        500,
                        "Erreur interne du serveur"
                ));
    }
}
