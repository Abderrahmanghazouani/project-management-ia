package com.projexia.backend.unit;



import com.projexia.backend.dto.request.ProjectRequest;
import com.projexia.backend.dto.response.ProjectResponse;
import com.projexia.backend.model.Project;
import com.projexia.backend.model.Role;
import com.projexia.backend.model.StatutProjet;
import com.projexia.backend.model.User;
import com.projexia.backend.repository.ProjectRepository;
import com.projexia.backend.repository.UserRepository;
import com.projexia.backend.service.ProjectService;
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

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@DisplayName("Tests unitaires — ProjectService")
class ProjectServiceTest {

    @Mock
    private ProjectRepository projectRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private ProjectService projectService;

    private ProjectRequest projectRequest;
    private Project projectExistant;
    private User createur;

    @BeforeEach
    void setUp() {
        createur = User.builder()
                .matricule("MGR-2024-001")
                .nom("Ghazouani")
                .prenom("Abderrahman")
                .email("ghazouani@projexia.com")
                .motDePasse("$2a$10$hash")
                .role(Role.MANAGER)
                .actif(true)
                .build();

        projectRequest = ProjectRequest.builder()
                .nom("Projet Projexia")
                .description("Plateforme IA de gestion de projets")
                .dateDebut(LocalDate.of(2025, 1, 1))
                .dateFin(LocalDate.of(2025, 6, 30))
                .budgetPrevu(new BigDecimal("50000"))
                .statut(StatutProjet.ACTIF)
                .matriculeCreateur("MGR-2024-001")
                .build();

        projectExistant = Project.builder()
                .refProjet("PRJ-2025-001")
                .nom("Projet Projexia")
                .description("Plateforme IA de gestion de projets")
                .dateDebut(LocalDate.of(2025, 1, 1))
                .dateFin(LocalDate.of(2025, 6, 30))
                .budgetPrevu(new BigDecimal("50000"))
                .budgetReel(BigDecimal.ZERO)
                .statut(StatutProjet.ACTIF)
                .createur(createur)
                .build();
    }

    // ═══════════════════════════════════════════
    // TESTS CRÉER PROJET
    // ═══════════════════════════════════════════

    @Test
    @DisplayName("Créer projet — succès avec données valides")
    void creerProjet_Devrait_Succes() {

        // GIVEN
        when(projectRepository.existsByNom(anyString()))
                .thenReturn(false);
        when(userRepository.findByMatricule(anyString()))
                .thenReturn(Optional.of(createur));
        when(projectRepository.save(any(Project.class)))
                .thenReturn(projectExistant);

        // WHEN
        ProjectResponse response =
                projectService.creerProjet(projectRequest);

        // THEN
        assertNotNull(response);
        assertEquals("Projet Projexia", response.getNom());
        assertEquals(StatutProjet.ACTIF, response.getStatut());
        verify(projectRepository, times(1))
                .save(any(Project.class));
    }

    @Test
    @DisplayName("Créer projet — échec si nom déjà existant")
    void creerProjet_Devrait_LancerException_NomDejaExistant() {

        // GIVEN
        when(projectRepository.existsByNom(anyString()))
                .thenReturn(true);

        // WHEN + THEN
        RuntimeException ex = assertThrows(
                RuntimeException.class,
                () -> projectService.creerProjet(projectRequest)
        );

        assertTrue(ex.getMessage()
                .contains("existe déjà"));
        verify(projectRepository, never())
                .save(any(Project.class));
    }

    @Test
    @DisplayName("Créer projet — échec si dateFin avant dateDebut")
    void creerProjet_Devrait_LancerException_DateInvalide() {

        // GIVEN
        // dateFin avant dateDebut
        projectRequest.setDateFin(LocalDate.of(2024, 1, 1));

        // On mock uniquement ce qui est appelé avant la validation des dates
        when(projectRepository.existsByNom(anyString()))
                .thenReturn(false);

        // ✅ Pas de mock findByMatricule car
        // l'exception est lancée avant cet appel

        // WHEN + THEN
        RuntimeException ex = assertThrows(
                RuntimeException.class,
                () -> projectService.creerProjet(projectRequest)
        );

        assertTrue(ex.getMessage()
                .contains("date de fin"));
        verify(projectRepository, never())
                .save(any(Project.class));
    }

    @Test
    @DisplayName("Créer projet — échec si créateur introuvable")
    void creerProjet_Devrait_LancerException_CreateurIntrouvable() {

        // GIVEN
        when(projectRepository.existsByNom(anyString()))
                .thenReturn(false);
        when(userRepository.findByMatricule(anyString()))
                .thenReturn(Optional.empty());

        // WHEN + THEN
        assertThrows(
                RuntimeException.class,
                () -> projectService.creerProjet(projectRequest)
        );
    }

    // ═══════════════════════════════════════════
    // TESTS LISTER PROJETS
    // ═══════════════════════════════════════════

    @Test
    @DisplayName("Lister projets — doit retourner une page")
    void listerProjets_Devrait_RetournerPage() {

        // GIVEN
        Pageable pageable = PageRequest.of(0, 20);
        Page<Project> page = new PageImpl<>(
                List.of(projectExistant));

        when(projectRepository.findAll(pageable))
                .thenReturn(page);

        // WHEN
        Page<ProjectResponse> result =
                projectService.listerProjets(pageable);

        // THEN
        assertNotNull(result);
        assertEquals(1, result.getTotalElements());
        assertEquals("Projet Projexia",
                result.getContent().get(0).getNom());
    }

    @Test
    @DisplayName("Lister par statut — doit filtrer correctement")
    void listerParStatut_Devrait_Filtrer() {

        // GIVEN
        Pageable pageable = PageRequest.of(0, 20);
        Page<Project> page = new PageImpl<>(
                List.of(projectExistant));

        when(projectRepository.findByStatut(
                StatutProjet.ACTIF, pageable))
                .thenReturn(page);

        // WHEN
        Page<ProjectResponse> result =
                projectService.listerParStatut(
                        StatutProjet.ACTIF, pageable);

        // THEN
        assertNotNull(result);
        assertEquals(1, result.getTotalElements());
        assertEquals(StatutProjet.ACTIF,
                result.getContent().get(0).getStatut());
    }

    // ═══════════════════════════════════════════
    // TESTS CONSULTER PROJET
    // ═══════════════════════════════════════════

    @Test
    @DisplayName("Consulter projet — succès")
    void consulterProjet_Devrait_RetournerProjet() {

        // GIVEN
        when(projectRepository.findById("PRJ-2025-001"))
                .thenReturn(Optional.of(projectExistant));

        // WHEN
        ProjectResponse result =
                projectService.consulterProjet("PRJ-2025-001");

        // THEN
        assertNotNull(result);
        assertEquals("PRJ-2025-001", result.getRefProjet());
        assertEquals("Projet Projexia", result.getNom());
    }

    @Test
    @DisplayName("Consulter projet — échec si introuvable")
    void consulterProjet_Devrait_LancerException_Introuvable() {

        // GIVEN
        when(projectRepository.findById(anyString()))
                .thenReturn(Optional.empty());

        // WHEN + THEN
        assertThrows(
                RuntimeException.class,
                () -> projectService.consulterProjet("PRJ-INCONNU")
        );
    }

    // ═══════════════════════════════════════════
    // TEST CHANGER STATUT
    // ═══════════════════════════════════════════

    @Test
    @DisplayName("Changer statut — ACTIF vers EN_PAUSE")
    void changerStatut_Devrait_Succes() {

        // GIVEN
        when(projectRepository.findById("PRJ-2025-001"))
                .thenReturn(Optional.of(projectExistant));
        when(projectRepository.save(any(Project.class)))
                .thenReturn(projectExistant);

        // WHEN
        ProjectResponse result = projectService.changerStatut(
                "PRJ-2025-001", StatutProjet.EN_PAUSE);

        // THEN
        assertNotNull(result);
        verify(projectRepository, times(1))
                .save(any(Project.class));
    }
}
