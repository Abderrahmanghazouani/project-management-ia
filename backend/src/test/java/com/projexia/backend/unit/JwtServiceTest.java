package com.projexia.backend.unit;



import com.projexia.backend.model.Role;
import com.projexia.backend.model.User;
import com.projexia.backend.security.JwtService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.util.ReflectionTestUtils;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
@DisplayName("Tests unitaires — JwtService")
class JwtServiceTest {

    private JwtService jwtService;
    private User user;

    @BeforeEach
    void setUp() {
        jwtService = new JwtService();

        // Injecter les valeurs @Value manuellement
        ReflectionTestUtils.setField(
                jwtService,
                "secretKey",
                "cHJvamV4aWEtc2VjcmV0LWtleS1zdXBlci1sb25ndWUtbWluaW11bS0zMi1jaGFycy0yMDI0IQ=="
        );
        ReflectionTestUtils.setField(
                jwtService,
                "expiration",
                86400000L
        );

        user = User.builder()
                .matricule("DEV-2024-001")
                .nom("Abderrazik")
                .prenom("Yassine")
                .email("yassine@projexia.com")
                .motDePasse("$2a$10$hashedPassword")
                .role(Role.DEVELOPER)
                .actif(true)
                .build();
    }

    @Test
    @DisplayName("Générer token — ne doit pas être null")
    void genererToken_Devrait_RetournerToken() {
        String token = jwtService.genererToken(user);
        assertNotNull(token);
        assertFalse(token.isEmpty());
    }

    @Test
    @DisplayName("Token — doit avoir 3 parties (header.payload.signature)")
    void token_Devrait_Avoir3Parties() {
        String token = jwtService.genererToken(user);
        String[] parties = token.split("\\.");
        assertEquals(3, parties.length);
    }

    @Test
    @DisplayName("Extraire email — doit retourner le bon email")
    void extraireEmail_Devrait_RetournerEmail() {
        String token = jwtService.genererToken(user);
        String email = jwtService.extraireEmail(token);
        assertEquals("yassine@projexia.com", email);
    }

    @Test
    @DisplayName("Valider token — token valide doit retourner true")
    void validerToken_Devrait_RetournerTrue_TokenValide() {
        String token = jwtService.genererToken(user);
        boolean valide = jwtService.validerToken(token, user);
        assertTrue(valide);
    }

    @Test
    @DisplayName("Valider token — mauvais user doit retourner false")
    void validerToken_Devrait_RetournerFalse_MauvaisUser() {
        String token = jwtService.genererToken(user);

        User autreUser = User.builder()
                .matricule("CLT-2024-002")
                .email("autre@projexia.com")
                .motDePasse("$2a$10$hash")
                .role(Role.CLIENT)
                .actif(true)
                .build();

        boolean valide = jwtService.validerToken(token, autreUser);
        assertFalse(valide);
    }

    @Test
    @DisplayName("Extraire expiration — doit retourner une date")
    void extraireExpiration_Devrait_RetournerDate() {
        String token = jwtService.genererToken(user);
        assertNotNull(jwtService.extraireExpiration(token));
    }

    @Test
    @DisplayName("Token expiré — doit retourner false ou lancer exception")
    void validerToken_Devrait_RetournerFalse_TokenExpire() {
        // Créer un JwtService avec expiration -1ms
        JwtService jwtServiceExpire = new JwtService();
        ReflectionTestUtils.setField(
                jwtServiceExpire,
                "secretKey",
                "cHJvamV4aWEtc2VjcmV0LWtleS1zdXBlci1sb25ndWUtbWluaW11bS0zMi1jaGFycy0yMDI0IQ=="
        );
        ReflectionTestUtils.setField(
                jwtServiceExpire,
                "expiration",
                -1000L
        );

        // Générer un token déjà expiré
        String tokenExpire = jwtServiceExpire.genererToken(user);

        // JWT lance ExpiredJwtException — c'est le comportement normal
        // On vérifie que l'exception est bien lancée
        assertThrows(
                Exception.class,
                () -> jwtServiceExpire.validerToken(tokenExpire, user)
        );
    }
}
