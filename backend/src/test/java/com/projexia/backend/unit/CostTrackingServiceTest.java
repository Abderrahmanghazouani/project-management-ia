package com.projexia.backend.unit;

import com.projexia.backend.dto.request.CostRequest;
import com.projexia.backend.dto.response.CostResponse;
import com.projexia.backend.model.CostTracking;
import com.projexia.backend.model.Project;
import com.projexia.backend.model.User;
import com.projexia.backend.repository.CostTrackingRepository;
import com.projexia.backend.repository.ProjectRepository;
import com.projexia.backend.repository.UserRepository;
import com.projexia.backend.service.CostTrackingService;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@DisplayName("Tests unitaires — CostTrackingService")
class CostTrackingServiceTest {

    @Mock
    private CostTrackingRepository costTrackingRepository;

    @Mock
    private ProjectRepository projectRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private CostTrackingService costTrackingService;

    private Project project;
    private User user;
    private CostRequest costRequest;
    private CostTracking costTracking;

    @BeforeEach
    void setUp() {
        project = Project.builder()
                .refProjet("PRJ-2025-001")
                .nom("Test Project")
                .build();

        user = User.builder()
                .matricule("USR-001")
                .nom("Doe")
                .prenom("John")
                .build();

        costRequest = new CostRequest();
        costRequest.setRefProjet("PRJ-2025-001");
        costRequest.setMatriculeEnregistre("USR-001");
        costRequest.setBudgetPrevu(new BigDecimal("1000.00"));
        costRequest.setBudgetReel(new BigDecimal("900.00"));
        costRequest.setCommentaire("Test comment");

        costTracking = CostTracking.builder()
                .refCout("CST-2026-001")
                .budgetPrevu(new BigDecimal("1000.00"))
                .budgetReel(new BigDecimal("900.00"))
                .commentaire("Test comment")
                .projet(project)
                .enregistrePar(user)
                .dateEnregistrement(LocalDateTime.now())
                .build();
    }

    @Test
    @DisplayName("Enregistrer coût — Succès")
    void enregistrerCout_Succes() {
        // GIVEN
        when(projectRepository.findById("PRJ-2025-001")).thenReturn(Optional.of(project));
        when(userRepository.findById("USR-001")).thenReturn(Optional.of(user));
        when(costTrackingRepository.count()).thenReturn(0L);
        when(costTrackingRepository.save(any(CostTracking.class))).thenReturn(costTracking);

        // WHEN
        CostResponse response = costTrackingService.enregistrerCout(costRequest);

        // THEN
        assertThat(response).isNotNull();
        assertThat(response.getBudgetPrevu()).isEqualTo(new BigDecimal("1000.00"));
        assertThat(response.getBudgetReel()).isEqualTo(new BigDecimal("900.00"));
        assertThat(response.getRefProjet()).isEqualTo("PRJ-2025-001");
        assertThat(response.getMatriculeEnregistre()).isEqualTo("USR-001");
        
        verify(projectRepository).save(project);
        assertThat(project.getBudgetReel()).isEqualTo(new BigDecimal("900.00"));
    }

    @Test
    @DisplayName("Enregistrer coût — Projet introuvable")
    void enregistrerCout_ProjetIntrouvable() {
        // GIVEN
        when(projectRepository.findById("PRJ-2025-001")).thenReturn(Optional.empty());

        // WHEN & THEN
        assertThrows(EntityNotFoundException.class, () -> costTrackingService.enregistrerCout(costRequest));
        verify(costTrackingRepository, never()).save(any());
    }

    @Test
    @DisplayName("Lister coûts — Succès")
    void listerCouts_Succes() {
        // GIVEN
        when(projectRepository.existsById("PRJ-2025-001")).thenReturn(true);
        when(costTrackingRepository.findByProjetRefProjet("PRJ-2025-001")).thenReturn(List.of(costTracking));

        // WHEN
        List<CostResponse> responses = costTrackingService.listerCouts("PRJ-2025-001");

        // THEN
        assertThat(responses).hasSize(1);
        assertThat(responses.get(0).getRefCout()).isEqualTo("CST-2026-001");
    }

    @Test
    @DisplayName("Dernier coût — Succès")
    void dernierCout_Succes() {
        // GIVEN
        when(projectRepository.existsById("PRJ-2025-001")).thenReturn(true);
        when(costTrackingRepository.findTopByProjetRefProjetOrderByDateEnregistrementDesc("PRJ-2025-001"))
                .thenReturn(Optional.of(costTracking));

        // WHEN
        CostResponse response = costTrackingService.dernierCout("PRJ-2025-001");

        // THEN
        assertThat(response).isNotNull();
        assertThat(response.getRefCout()).isEqualTo("CST-2026-001");
    }

    @Test
    @DisplayName("Calculer écart total — Succès")
    void calculerEcartTotal_Succes() {
        // GIVEN
        when(projectRepository.existsById("PRJ-2025-001")).thenReturn(true);
        when(costTrackingRepository.calculerEcartTotal("PRJ-2025-001")).thenReturn(new BigDecimal("100.00"));

        // WHEN
        BigDecimal ecart = costTrackingService.calculerEcartTotal("PRJ-2025-001");

        // THEN
        assertThat(ecart).isEqualTo(new BigDecimal("100.00"));
    }
}
