package com.projexia.backend.unit;


import com.projexia.backend.dto.request.LoginRequest;
import com.projexia.backend.dto.request.RegisterRequest;
import com.projexia.backend.dto.response.AuthResponse;
import com.projexia.backend.model.Role;
import com.projexia.backend.model.User;
import com.projexia.backend.repository.UserRepository;
import com.projexia.backend.security.JwtService;
import com.projexia.backend.service.AuthService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

/**
 * AuthServiceTest — Tests unitaires du service d'authentification
 *
 * Principes appliqués :
 * 1. @ExtendWith(MockitoExtension.class) → activer Mockito
 * 2. @Mock    → simuler les dépendances (pas de BD réelle)
 * 3. @InjectMocks → injecter les mocks dans AuthService
 * 4. Given/When/Then → structure claire des tests
 *
 * Pourquoi des mocks ?
 * → On teste UNIQUEMENT la logique de AuthService
 * → On ne teste PAS la BD, JWT, ou Spring Security
 * → Les mocks simulent le comportement des dépendances
 */
@ExtendWith(MockitoExtension.class)
@DisplayName("Tests unitaires — AuthService")
class AuthServiceTest {

    // ── Mocks — dépendances simulées ──────────
    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtService jwtService;

    @Mock
    private AuthenticationManager authenticationManager;

    // ── Classe testée ─────────────────────────
    @InjectMocks
    private AuthService authService;

    // ── Données de test ───────────────────────
    private RegisterRequest registerRequest;
    private LoginRequest loginRequest;
    private User userExistant;

    /**
     * @BeforeEach : exécuté avant CHAQUE test
     * Prépare les données communes
     */
    @BeforeEach
    void setUp() {
        // Données register
        registerRequest = RegisterRequest.builder()
                .nom("Abderrazik")
                .prenom("Yassine")
                .email("yassine@projexia.com")
                .motDePasse("Password123!")
                .role(Role.DEVELOPER)
                .build();

        // Données login
        loginRequest = LoginRequest.builder()
                .email("yassine@projexia.com")
                .motDePasse("Password123!")
                .build();

        // Utilisateur existant en BD (simulé)
        userExistant = User.builder()
                .matricule("DEV-2024-001")
                .nom("Abderrazik")
                .prenom("Yassine")
                .email("yassine@projexia.com")
                .motDePasse("$2a$10$hashedPassword")
                .role(Role.DEVELOPER)
                .actif(true)
                .build();
    }

    // ═══════════════════════════════════════════
    // TESTS REGISTER
    // ═══════════════════════════════════════════

    @Test
    @DisplayName("Register — succès avec données valides")
    void register_Devrait_CreerUtilisateur_Succes() {

        // ── GIVEN (préparer) ──────────────────
        // Email n'existe pas encore
        when(userRepository.existsByEmail(anyString()))
                .thenReturn(false);
        // BCrypt retourne un hash simulé
        when(passwordEncoder.encode(anyString()))
                .thenReturn("$2a$10$hashedPassword");
        // Save retourne l'utilisateur sauvegardé
        when(userRepository.save(any(User.class)))
                .thenReturn(userExistant);
        // JWT retourne un token simulé
        when(jwtService.genererToken(any(User.class)))
                .thenReturn("token.jwt.simule");

        // ── WHEN (exécuter) ───────────────────
        AuthResponse response = authService.register(registerRequest);

        // ── THEN (vérifier) ───────────────────
        assertNotNull(response);
        assertEquals("token.jwt.simule", response.getToken());
        assertEquals("yassine@projexia.com", response.getEmail());
        assertEquals(Role.DEVELOPER, response.getRole());
        assertEquals("Compte créé avec succès", response.getMessage());

        // Vérifier que save() a été appelé une fois
        verify(userRepository, times(1)).save(any(User.class));
        // Vérifier que le mot de passe a été haché
        verify(passwordEncoder, times(1)).encode("Password123!");
    }

    @Test
    @DisplayName("Register — échec si email déjà utilisé")
    void register_Devrait_LancerException_EmailDejaUtilise() {

        // ── GIVEN ─────────────────────────────
        // Email existe déjà en BD
        when(userRepository.existsByEmail(anyString()))
                .thenReturn(true);

        // ── WHEN + THEN ───────────────────────
        RuntimeException exception = assertThrows(
                RuntimeException.class,
                () -> authService.register(registerRequest)
        );

        assertTrue(exception.getMessage()
                .contains("Email déjà utilisé"));

        // Vérifier que save() n'a PAS été appelé
        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    @DisplayName("Register — mot de passe bien haché avec BCrypt")
    void register_Devrait_HacherMotDePasse() {

        // ── GIVEN ─────────────────────────────
        when(userRepository.existsByEmail(anyString()))
                .thenReturn(false);
        when(passwordEncoder.encode("Password123!"))
                .thenReturn("$2a$10$hashedPassword");
        when(userRepository.save(any(User.class)))
                .thenReturn(userExistant);
        when(jwtService.genererToken(any(User.class)))
                .thenReturn("token.jwt.simule");

        // ── WHEN ──────────────────────────────
        authService.register(registerRequest);

        // ── THEN ──────────────────────────────
        // Le mot de passe brut ne doit JAMAIS être stocké
        verify(passwordEncoder, times(1))
                .encode("Password123!");
    }

    // ═══════════════════════════════════════════
    // TESTS LOGIN
    // ═══════════════════════════════════════════

    @Test
    @DisplayName("Login — succès avec credentials corrects")
    void login_Devrait_RetournerToken_Succes() {

        // ── GIVEN ─────────────────────────────
        // Spring Security authentifie sans erreur
        when(authenticationManager.authenticate(
                any(UsernamePasswordAuthenticationToken.class)))
                .thenReturn(null);
        // Utilisateur trouvé en BD
        when(userRepository.findByEmail(anyString()))
                .thenReturn(Optional.of(userExistant));
        // JWT généré
        when(jwtService.genererToken(any(User.class)))
                .thenReturn("token.jwt.simule");

        // ── WHEN ──────────────────────────────
        AuthResponse response = authService.login(loginRequest);

        // ── THEN ──────────────────────────────
        assertNotNull(response);
        assertEquals("token.jwt.simule", response.getToken());
        assertEquals("yassine@projexia.com", response.getEmail());
        assertEquals("Connexion réussie", response.getMessage());
    }

    @Test
    @DisplayName("Login — échec avec mauvais mot de passe")
    void login_Devrait_LancerException_MauvaisCredentials() {

        // ── GIVEN ─────────────────────────────
        // Spring Security lance BadCredentialsException
        when(authenticationManager.authenticate(
                any(UsernamePasswordAuthenticationToken.class)))
                .thenThrow(new BadCredentialsException(
                        "Mauvais mot de passe"));

        // ── WHEN + THEN ───────────────────────
        assertThrows(
                BadCredentialsException.class,
                () -> authService.login(loginRequest)
        );

        // Vérifier que findByEmail n'a pas été appelé
        verify(userRepository, never())
                .findByEmail(anyString());
    }

    @Test
    @DisplayName("Login — échec si utilisateur introuvable")
    void login_Devrait_LancerException_UtilisateurIntrouvable() {

        // ── GIVEN ─────────────────────────────
        when(authenticationManager.authenticate(
                any(UsernamePasswordAuthenticationToken.class)))
                .thenReturn(null);
        // Utilisateur non trouvé en BD
        when(userRepository.findByEmail(anyString()))
                .thenReturn(Optional.empty());

        // ── WHEN + THEN ───────────────────────
        assertThrows(
                RuntimeException.class,
                () -> authService.login(loginRequest)
        );
    }

    // ═══════════════════════════════════════════
    // TESTS JWT
    // ═══════════════════════════════════════════

    @Test
    @DisplayName("Register — token JWT généré et retourné")
    void register_Devrait_GenererToken_JWT() {

        // ── GIVEN ─────────────────────────────
        when(userRepository.existsByEmail(anyString()))
                .thenReturn(false);
        when(passwordEncoder.encode(anyString()))
                .thenReturn("$2a$10$hashedPassword");
        when(userRepository.save(any(User.class)))
                .thenReturn(userExistant);
        when(jwtService.genererToken(any(User.class)))
                .thenReturn("eyJhbGciOiJIUzI1NiJ9.test.token");

        // ── WHEN ──────────────────────────────
        AuthResponse response = authService.register(registerRequest);

        // ── THEN ──────────────────────────────
        assertNotNull(response.getToken());
        assertFalse(response.getToken().isEmpty());
        // Vérifier que genererToken() a été appelé
        verify(jwtService, times(1))
                .genererToken(any(User.class));
    }
}
