package com.projexia.backend.dto.response;

import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Builder
public class DashboardResponse {

    // ─── Stats générales projets ──────────────────────────────────────────────
    private int totalProjets;
    private int projetsActifs;

    // ─── Stats tickets ────────────────────────────────────────────────────────
    private int totalTickets;
    private int ticketsEnRetard;

    // ─── Stats membres ────────────────────────────────────────────────────────
    private int totalMembres;

    // ─── Stats sprints ────────────────────────────────────────────────────────
    private int totalSprints;
    private int sprintsActifs;

    // ─── Stats IA ─────────────────────────────────────────────────────────────
    private int totalEstimations;
    private int estimationsConfirmees;

    // ─── Stats coûts ─────────────────────────────────────────────────────────
    private BigDecimal budgetTotalPrevu;
    private BigDecimal budgetTotalReel;
    private BigDecimal ecartTotal;

    // ─── Listes ───────────────────────────────────────────────────────────────
    private List<ProjectResponse> derniersProjets;
    private List<TicketResponse> ticketsPrioritaires;
}