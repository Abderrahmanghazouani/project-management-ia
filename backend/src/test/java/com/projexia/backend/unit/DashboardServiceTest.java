package com.projexia.backend.unit;

import com.projexia.backend.dto.response.DashboardResponse;
import com.projexia.backend.model.*;
import com.projexia.backend.repository.*;
import com.projexia.backend.service.DashboardService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;

import java.math.BigDecimal;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
@DisplayName("Tests unitaires — DashboardService")
class DashboardServiceTest {

    @Mock
    private ProjectRepository projectRepository;
    @Mock
    private TicketRepository ticketRepository;
    @Mock
    private UserRepository userRepository;
    @Mock
    private SprintRepository sprintRepository;
    @Mock
    private IAEstimationRepository iaEstimationRepository;
    @Mock
    private CostTrackingRepository costTrackingRepository;

    @InjectMocks
    private DashboardService dashboardService;

    @Test
    @DisplayName("Récupérer les statistiques du tableau de bord — Succès")
    void getStats_Succes() {
        // GIVEN
        when(projectRepository.count()).thenReturn(10L);
        when(projectRepository.countByStatut(StatutProjet.ACTIF)).thenReturn(5L);

        when(ticketRepository.count()).thenReturn(50L);
        when(ticketRepository.countByStatut(StatutTicket.IN_PROGRESS)).thenReturn(10L);

        when(userRepository.count()).thenReturn(20L);

        when(sprintRepository.count()).thenReturn(15L);
        when(sprintRepository.countByStatut(StatutSprint.ACTIF)).thenReturn(3L);

        when(iaEstimationRepository.count()).thenReturn(30L);
        when(iaEstimationRepository.countByStatut(StatutEstimation.CONFIRMEE)).thenReturn(15L);

        when(costTrackingRepository.sumBudgetPrevu()).thenReturn(new BigDecimal("10000.00"));
        when(costTrackingRepository.sumBudgetReel()).thenReturn(new BigDecimal("8000.00"));

        Page<Project> projectPage = new PageImpl<>(List.of(
                Project.builder().refProjet("PRJ-1").nom("P1").build(),
                Project.builder().refProjet("PRJ-2").nom("P2").build()
        ));
        when(projectRepository.findAll(any(PageRequest.class))).thenReturn(projectPage);

        List<Ticket> criticalTickets = List.of(
                Ticket.builder().refTicket("TK-1").titre("T1").priorite(PrioriteTicket.CRITIQUE).statut(StatutTicket.TO_DO).build()
        );
        when(ticketRepository.findTop5ByPrioriteAndStatutOrderByDateCreationAsc(
                eq(PrioriteTicket.CRITIQUE), eq(StatutTicket.TO_DO)))
                .thenReturn(criticalTickets);

        // WHEN
        DashboardResponse response = dashboardService.getStats();

        // THEN
        assertThat(response).isNotNull();
        assertThat(response.getTotalProjets()).isEqualTo(10);
        assertThat(response.getProjetsActifs()).isEqualTo(5);
        assertThat(response.getTotalTickets()).isEqualTo(50);
        assertThat(response.getTicketsEnRetard()).isEqualTo(10);
        assertThat(response.getTotalMembres()).isEqualTo(20);
        assertThat(response.getTotalSprints()).isEqualTo(15);
        assertThat(response.getSprintsActifs()).isEqualTo(3);
        assertThat(response.getTotalEstimations()).isEqualTo(30);
        assertThat(response.getEstimationsConfirmees()).isEqualTo(15);
        assertThat(response.getBudgetTotalPrevu()).isEqualTo(new BigDecimal("10000.00"));
        assertThat(response.getBudgetTotalReel()).isEqualTo(new BigDecimal("8000.00"));
        assertThat(response.getEcartTotal()).isEqualTo(new BigDecimal("2000.00"));
        assertThat(response.getDerniersProjets()).hasSize(2);
        assertThat(response.getTicketsPrioritaires()).hasSize(1);
    }
}
