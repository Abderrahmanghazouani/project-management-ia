package com.projexia.backend.controller;

import com.projexia.backend.dto.request.TicketRequest;
import com.projexia.backend.dto.response.TicketResponse;
import com.projexia.backend.model.StatutTicket;
import com.projexia.backend.service.TicketService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/tickets")
@RequiredArgsConstructor
@Tag(name = "Tickets", description = "Gestion du backlog")
public class TicketController {

    private final TicketService ticketService;

    // ─── POST /api/tickets ────────────────────────────────────────────────────
    @PostMapping
    @PreAuthorize("hasRole('MANAGER')")
    @Operation(summary = "Créer un ticket", description = "Réservé au MANAGER")
    public ResponseEntity<TicketResponse> creerTicket(
            @Valid @RequestBody TicketRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ticketService.creerTicket(request));
    }

    // ─── GET /api/tickets/backlog/{refProjet} ─────────────────────────────────
    @GetMapping("/backlog/{refProjet}")
    @Operation(summary = "Backlog d'un projet", description = "Liste paginée des tickets (20/page)")
    public ResponseEntity<Page<TicketResponse>> listerBacklog(
            @PathVariable String refProjet,
            @PageableDefault(size = 20) Pageable pageable) {
        return ResponseEntity.ok(ticketService.listerBacklog(refProjet, pageable));
    }

    // ─── PUT /api/tickets/{ref}/statut ────────────────────────────────────────
    @PutMapping("/{ref}/statut")
    @Operation(summary = "Changer le statut d'un ticket")
    public ResponseEntity<TicketResponse> changerStatut(
            @PathVariable String ref,
            @RequestParam StatutTicket statut) {
        return ResponseEntity.ok(ticketService.changerStatut(ref, statut));
    }

    // ─── GET /api/tickets/mes-taches ──────────────────────────────────────────
    @GetMapping("/mes-taches")
    @Operation(summary = "Mes tickets assignés")
    public ResponseEntity<Page<TicketResponse>> mesTickets(
            @AuthenticationPrincipal UserDetails userDetails,
            @PageableDefault(size = 20) Pageable pageable) {
        return ResponseEntity.ok(
                ticketService.mesTickets(userDetails.getUsername(), pageable));
    }

    // ─── GET /api/tickets/{ref} ───────────────────────────────────────────────
    @GetMapping("/{ref}")
    @Operation(summary = "Consulter un ticket")
    public ResponseEntity<TicketResponse> consulterTicket(@PathVariable String ref) {
        return ResponseEntity.ok(ticketService.consulterTicket(ref));
    }
}