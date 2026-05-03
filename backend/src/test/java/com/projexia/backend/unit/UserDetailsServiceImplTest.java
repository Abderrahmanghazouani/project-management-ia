package com.projexia.backend.unit;



import com.projexia.backend.model.Role;
import com.projexia.backend.model.User;
import com.projexia.backend.repository.UserRepository;
import com.projexia.backend.security.UserDetailsServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@DisplayName("Tests unitaires — UserDetailsServiceImpl")
class UserDetailsServiceImplTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserDetailsServiceImpl userDetailsService;

    private User user;

    @BeforeEach
    void setUp() {
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
    @DisplayName("LoadByUsername — succès avec email existant")
    void loadByUsername_Devrait_RetournerUser() {
        when(userRepository.findByEmail("yassine@projexia.com"))
                .thenReturn(Optional.of(user));

        UserDetails result = userDetailsService
                .loadUserByUsername("yassine@projexia.com");

        assertNotNull(result);
        assertEquals("yassine@projexia.com",
                result.getUsername());
        verify(userRepository, times(1))
                .findByEmail("yassine@projexia.com");
    }

    @Test
    @DisplayName("LoadByUsername — échec si email introuvable")
    void loadByUsername_Devrait_LancerException() {
        when(userRepository.findByEmail(anyString()))
                .thenReturn(Optional.empty());

        assertThrows(
                UsernameNotFoundException.class,
                () -> userDetailsService
                        .loadUserByUsername("inconnu@test.com")
        );
    }

    @Test
    @DisplayName("User actif — isEnabled doit être true")
    void loadByUsername_UserActif_Devrait_EtreEnabled() {
        when(userRepository.findByEmail(anyString()))
                .thenReturn(Optional.of(user));

        UserDetails result = userDetailsService
                .loadUserByUsername("yassine@projexia.com");

        assertTrue(result.isEnabled());
        assertTrue(result.isAccountNonLocked());
    }

    @Test
    @DisplayName("User inactif — isEnabled doit être false")
    void loadByUsername_UserInactif_Devrait_EtreDisabled() {
        user.setActif(false);
        when(userRepository.findByEmail(anyString()))
                .thenReturn(Optional.of(user));

        UserDetails result = userDetailsService
                .loadUserByUsername("yassine@projexia.com");

        assertFalse(result.isEnabled());
        assertFalse(result.isAccountNonLocked());
    }

    @Test
    @DisplayName("Autorités — doit contenir ROLE_DEVELOPER")
    void loadByUsername_Devrait_AvoirRole() {
        when(userRepository.findByEmail(anyString()))
                .thenReturn(Optional.of(user));

        UserDetails result = userDetailsService
                .loadUserByUsername("yassine@projexia.com");

        assertTrue(result.getAuthorities()
                .stream()
                .anyMatch(a -> a.getAuthority()
                        .equals("ROLE_DEVELOPER")));
    }
}