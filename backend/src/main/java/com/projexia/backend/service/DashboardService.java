package com.projexia.backend.service;

import com.projexia.backend.dto.response.DashboardResponse;
import com.projexia.backend.dto.response.ProjectResponse;
import com.projexia.backend.dto.response.TicketResponse;
import com.projexia.backend.model.PrioriteTicket;
import com.projexia.backend.model.StatutProjet;
import com.projexia.backend.model.StatutSprint;
import com.projexia.backend.model.StatutTicket;
import com.projexia.backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class DashboardService {

    private final ProjectRepository projectRepository;
    private final TicketRepository ticketRepository;
    private final UserRepository userRepository;
    private final SprintRepository sprintRepository;
    private final IAEstimationRepository iaEstimationRepository;
    private final CostTrackingRepository costTrackingRepository;

    // ─── Stats globales ───────────────────────────────────────────────────────
    public DashboardResponse getStats() {

        // ── Projets ───────────────────────────────────────────────────────────
        int totalProjets   = (int) projectRepository.count();
        int projetsActifs  = (int) projectRepository.countByStatut(StatutProjet.ACTIF);

        // ── Tickets ───────────────────────────────────────────────────────────
        int totalTickets    = (int) ticketRepository.count();
        int ticketsEnRetard = (int) ticketRepository.countByStatut(StatutTicket.IN_PROGRESS);

        // ── Membres ───────────────────────────────────────────────────────────
        int totalMembres = (int) userRepository.count();

        // ── Sprints ───────────────────────────────────────────────────────────
        int totalSprints  = (int) sprintRepository.count();
        int sprintsActifs = (int) sprintRepository.countByStatut(StatutSprint.ACTIF);

        // ── Estimations IA ────────────────────────────────────────────────────
        int totalEstimations       = (int) iaEstimationRepository.count();
        int estimationsConfirmees  = (int) iaEstimationRepository.countByStatut(
                com.projexia.backend.model.StatutEstimation.CONFIRMEE);

        // ── Budgets ───────────────────────────────────────────────────────────
        BigDecimal budgetTotalPrevu = costTrackingRepository.sumBudgetPrevu();
        BigDecimal budgetTotalReel  = costTrackingRepository.sumBudgetReel();
        BigDecimal ecartTotal = budgetTotalPrevu.subtract(budgetTotalReel);

        // ── 5 derniers projets ────────────────────────────────────────────────
        List<ProjectResponse> derniersProjets = projectRepository
                .findAll(PageRequest.of(0, 5,
                        Sort.by(Sort.Direction.DESC, "dateCreation")))
                .stream()
                .map(ProjectResponse::fromEntity)
                .collect(Collectors.toList());

        // ── 5 tickets critiques (priorité CRITIQUE, statut TO_DO) ─────────────
        List<TicketResponse> ticketsPrioritaires = ticketRepository
                .findTop5ByPrioriteAndStatutOrderByDateCreationAsc(
                        PrioriteTicket.CRITIQUE, StatutTicket.TO_DO)
                .stream()
                .map(TicketResponse::fromEntity)
                .collect(Collectors.toList());

        return DashboardResponse.builder()
                .totalProjets(totalProjets)
                .projetsActifs(projetsActifs)
                .totalTickets(totalTickets)
                .ticketsEnRetard(ticketsEnRetard)
                .totalMembres(totalMembres)
                .totalSprints(totalSprints)
                .sprintsActifs(sprintsActifs)
                .totalEstimations(totalEstimations)
                .estimationsConfirmees(estimationsConfirmees)
                .budgetTotalPrevu(budgetTotalPrevu)
                .budgetTotalReel(budgetTotalReel)
                .ecartTotal(ecartTotal)
                .derniersProjets(derniersProjets)
                .ticketsPrioritaires(ticketsPrioritaires)
                .build();
    }
}