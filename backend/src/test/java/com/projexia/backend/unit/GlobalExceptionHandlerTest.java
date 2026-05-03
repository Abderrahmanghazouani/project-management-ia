package com.projexia.backend.unit;



import com.projexia.backend.dto.response.ErrorResponse;
import com.projexia.backend.exception.GlobalExceptionHandler;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
@DisplayName("Tests unitaires — GlobalExceptionHandler")
class GlobalExceptionHandlerTest {

    private GlobalExceptionHandler handler;

    @BeforeEach
    void setUp() {
        handler = new GlobalExceptionHandler();
    }

    @Test
    @DisplayName("BadCredentials — doit retourner 401")
    void handleBadCredentials_Devrait_Retourner401() {
        BadCredentialsException ex =
                new BadCredentialsException("Mauvais credentials");

        ResponseEntity<ErrorResponse> response =
                handler.handleBadCredentials(ex);

        assertEquals(HttpStatus.UNAUTHORIZED,
                response.getStatusCode());
        assertEquals(401,
                response.getBody().getStatus());
        assertEquals("Email ou mot de passe incorrect",
                response.getBody().getMessage());
    }

    @Test
    @DisplayName("UserNotFound — doit retourner 404")
    void handleUserNotFound_Devrait_Retourner404() {
        UsernameNotFoundException ex =
                new UsernameNotFoundException("User introuvable");

        ResponseEntity<ErrorResponse> response =
                handler.handleUserNotFound(ex);

        assertEquals(HttpStatus.NOT_FOUND,
                response.getStatusCode());
        assertEquals(404,
                response.getBody().getStatus());
        assertEquals("User introuvable",
                response.getBody().getMessage());
    }

    @Test
    @DisplayName("RuntimeException — doit retourner 400")
    void handleRuntime_Devrait_Retourner400() {
        RuntimeException ex =
                new RuntimeException("Email déjà utilisé");

        ResponseEntity<ErrorResponse> response =
                handler.handleRuntime(ex);

        assertEquals(HttpStatus.BAD_REQUEST,
                response.getStatusCode());
        assertEquals(400,
                response.getBody().getStatus());
        assertEquals("Email déjà utilisé",
                response.getBody().getMessage());
    }

    @Test
    @DisplayName("Exception générale — doit retourner 500")
    void handleGeneral_Devrait_Retourner500() {
        Exception ex = new Exception("Erreur inattendue");

        ResponseEntity<ErrorResponse> response =
                handler.handleGeneral(ex);

        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR,
                response.getStatusCode());
        assertEquals(500,
                response.getBody().getStatus());
    }

    @Test
    @DisplayName("ErrorResponse — timestamp ne doit pas être null")
    void errorResponse_Devrait_AvoirTimestamp() {
        RuntimeException ex = new RuntimeException("Test");

        ResponseEntity<ErrorResponse> response =
                handler.handleRuntime(ex);

        assertNotNull(response.getBody().getTimestamp());
    }
}
