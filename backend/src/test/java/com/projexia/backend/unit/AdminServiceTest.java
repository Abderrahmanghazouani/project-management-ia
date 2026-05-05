package com.projexia.backend.unit;



import com.projexia.backend.dto.request.UpdateRoleRequest;
import com.projexia.backend.dto.response.UserResponse;
import com.projexia.backend.model.Role;
import com.projexia.backend.model.User;
import com.projexia.backend.repository.UserRepository;
import com.projexia.backend.service.AdminService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@DisplayName("Tests unitaires — AdminService")
class AdminServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private AdminService adminService;

    private User userAdmin;
    private User userDeveloper;
    private Pageable pageable;

    @BeforeEach
    void setUp() {
        userAdmin = User.builder()
                .matricule("ADM-2025-001")
                .nom("Ghazouani")
                .prenom("Abderrahman")
                .email("admin@projexia.com")
                .motDePasse("$2a$10$hash")
                .role(Role.ADMIN)
                .actif(true)
                .build();

        userDeveloper = User.builder()
                .matricule("DEV-2025-001")
                .nom("Essaoudi")
                .prenom("Soufiane")
                .email("soufiane@projexia.com")
                .motDePasse("$2a$10$hash")
                .role(Role.DEVELOPER)
                .actif(true)
                .build();

        pageable = PageRequest.of(0, 20);
    }

    // ═══════════════════════════════════════════
    // TESTS LISTER
    // ═══════════════════════════════════════════

    @Test
    @DisplayName("Lister utilisateurs — doit retourner page")
    void listerUtilisateurs_Devrait_RetournerPage() {

        // GIVEN
        Page<User> page = new PageImpl<>(
                List.of(userAdmin, userDeveloper));
        when(userRepository.findAll(pageable))
                .thenReturn(page);

        // WHEN
        Page<UserResponse> result =
                adminService.listerUtilisateurs(pageable);

        // THEN
        assertNotNull(result);
        assertEquals(2, result.getTotalElements());
    }

    @Test
    @DisplayName("Lister par rôle — doit filtrer")
    void listerParRole_Devrait_Filtrer() {

        // GIVEN
        Page<User> page = new PageImpl<>(
                List.of(userDeveloper));
        when(userRepository.findByRole(
                Role.DEVELOPER, pageable))
                .thenReturn(page);

        // WHEN
        Page<UserResponse> result =
                adminService.listerParRole(
                        Role.DEVELOPER, pageable);

        // THEN
        assertNotNull(result);
        assertEquals(1, result.getTotalElements());
    }

    // ═══════════════════════════════════════════
    // TESTS CONSULTER
    // ═══════════════════════════════════════════

    @Test
    @DisplayName("Consulter — doit retourner l'utilisateur")
    void consulter_Devrait_RetournerUtilisateur() {

        // GIVEN
        when(userRepository.findByMatricule(
                "DEV-2025-001"))
                .thenReturn(Optional.of(userDeveloper));

        // WHEN
        UserResponse result =
                adminService.consulterUtilisateur(
                        "DEV-2025-001");

        // THEN
        assertNotNull(result);
        assertEquals("DEV-2025-001",
                result.getMatricule());
        assertEquals(Role.DEVELOPER, result.getRole());
    }

    @Test
    @DisplayName("Consulter — échec si introuvable")
    void consulter_Devrait_LancerException_Introuvable() {

        // GIVEN
        when(userRepository.findByMatricule(anyString()))
                .thenReturn(Optional.empty());

        // WHEN + THEN
        assertThrows(
                RuntimeException.class,
                () -> adminService.consulterUtilisateur(
                        "INCONNU")
        );
    }

    // ═══════════════════════════════════════════
    // TESTS MODIFIER RÔLE
    // ═══════════════════════════════════════════

    @Test
    @DisplayName("Modifier rôle — DEVELOPER vers MANAGER")
    void modifierRole_Devrait_ChangerRole() {

        // GIVEN
        UpdateRoleRequest request =
                new UpdateRoleRequest(Role.MANAGER);

        when(userRepository.findByMatricule(
                "DEV-2025-001"))
                .thenReturn(Optional.of(userDeveloper));
        when(userRepository.save(any(User.class)))
                .thenReturn(userDeveloper);

        // WHEN
        UserResponse result =
                adminService.modifierRole(
                        "DEV-2025-001", request);

        // THEN
        assertNotNull(result);
        verify(userRepository, times(1))
                .save(any(User.class));
        assertEquals(Role.MANAGER,
                userDeveloper.getRole());
    }

    // ═══════════════════════════════════════════
    // TESTS TOGGLE ACTIF
    // ═══════════════════════════════════════════

    @Test
    @DisplayName("Toggle actif — actif → inactif")
    void toggleActif_Devrait_Desactiver() {

        // GIVEN
        when(userRepository.findByMatricule(
                "DEV-2025-001"))
                .thenReturn(Optional.of(userDeveloper));
        when(userRepository.save(any(User.class)))
                .thenReturn(userDeveloper);

        // WHEN
        adminService.toggleActif("DEV-2025-001");

        // THEN
        assertFalse(userDeveloper.getActif());
        verify(userRepository, times(1))
                .save(any(User.class));
    }

    @Test
    @DisplayName("Toggle actif — inactif → actif")
    void toggleActif_Devrait_Reactiver() {

        // GIVEN
        userDeveloper.setActif(false);
        when(userRepository.findByMatricule(
                "DEV-2025-001"))
                .thenReturn(Optional.of(userDeveloper));
        when(userRepository.save(any(User.class)))
                .thenReturn(userDeveloper);

        // WHEN
        adminService.toggleActif("DEV-2025-001");

        // THEN
        assertTrue(userDeveloper.getActif());
        verify(userRepository, times(1))
                .save(any(User.class));
    }
}