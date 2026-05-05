package com.projexia.backend.controller;

import com.projexia.backend.dto.response.DashboardResponse;
import com.projexia.backend.dto.response.ProjectResponse;
import com.projexia.backend.dto.response.TicketResponse;
import com.projexia.backend.service.DashboardService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
@Tag(name = "Dashboard", description = "Statistiques globales M11")
public class DashboardController {

    private final DashboardService dashboardService;

    // ─── GET /api/dashboard/stats ─────────────────────────────────────────────
    @GetMapping("/stats")
    @Operation(summary = "Toutes les statistiques globales")
    public ResponseEntity<DashboardResponse> getStats() {
        return ResponseEntity.ok(dashboardService.getStats());
    }

    // ─── GET /api/dashboard/projets ───────────────────────────────────────────
    @GetMapping("/projets")
    @Operation(summary = "Statistiques des projets")
    public ResponseEntity<Map<String, Object>> statsProjects() {
        DashboardResponse stats = dashboardService.getStats();
        return ResponseEntity.ok(Map.of(
                "totalProjets",        stats.getTotalProjets(),
                "projetsActifs",       stats.getProjetsActifs(),
                "derniersProjets",     stats.getDerniersProjets()
        ));
    }

    // ─── GET /api/dashboard/tickets ───────────────────────────────────────────
    @GetMapping("/tickets")
    @Operation(summary = "Statistiques des tickets")
    public ResponseEntity<Map<String, Object>> statsTickets() {
        DashboardResponse stats = dashboardService.getStats();
        return ResponseEntity.ok(Map.of(
                "totalTickets",         stats.getTotalTickets(),
                "ticketsEnRetard",      stats.getTicketsEnRetard(),
                "ticketsPrioritaires",  stats.getTicketsPrioritaires()
        ));
    }

    // ─── GET /api/dashboard/couts ─────────────────────────────────────────────
    @GetMapping("/couts")
    @Operation(summary = "Statistiques budgétaires")
    public ResponseEntity<Map<String, Object>> statsCouts() {
        DashboardResponse stats = dashboardService.getStats();
        return ResponseEntity.ok(Map.of(
                "budgetTotalPrevu", stats.getBudgetTotalPrevu(),
                "budgetTotalReel",  stats.getBudgetTotalReel(),
                "ecartTotal",       stats.getEcartTotal()
        ));
    }
}