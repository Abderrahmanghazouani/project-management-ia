package com.projexia.backend.service;

import com.projexia.backend.dto.response.KanbanResponse;
import com.projexia.backend.dto.response.TicketResponse;
import com.projexia.backend.model.Project;
import com.projexia.backend.model.StatutTicket;
import com.projexia.backend.model.Ticket;
import com.projexia.backend.repository.ProjectRepository;
import com.projexia.backend.repository.TicketRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class KanbanService {

    private final TicketRepository ticketRepository;
    private final ProjectRepository projectRepository;

    // ─── Board complet — 3 colonnes ───────────────────────────────────────────
    @Transactional(readOnly = true)
    public KanbanResponse getBoardKanban(String refProjet) {
        Project projet = projectRepository.findById(refProjet)
                .orElseThrow(() -> new EntityNotFoundException(
                        "Projet introuvable : " + refProjet));

        List<Ticket> tousLesTickets = ticketRepository
                .findByProjetRefProjetAndStatut(refProjet, StatutTicket.TO_DO);

        // Récupérer les 3 colonnes séparément
        List<TicketResponse> todo = ticketRepository
                .findByProjetRefProjetAndStatut(refProjet, StatutTicket.TO_DO)
                .stream().map(TicketResponse::fromEntity).toList();

        List<TicketResponse> inProgress = ticketRepository
                .findByProjetRefProjetAndStatut(refProjet, StatutTicket.IN_PROGRESS)
                .stream().map(TicketResponse::fromEntity).toList();

        List<TicketResponse> done = ticketRepository
                .findByProjetRefProjetAndStatut(refProjet, StatutTicket.DONE)
                .stream().map(TicketResponse::fromEntity).toList();

        int total = todo.size() + inProgress.size() + done.size();

        return KanbanResponse.builder()
                .refProjet(refProjet)
                .nomProjet(projet.getNom())
                .todo(todo)
                .inProgress(inProgress)
                .done(done)
                .totalTickets(total)
                .build();
    }

    // ─── Avancer : TO_DO → IN_PROGRESS → DONE ─────────────────────────────────
    public TicketResponse avancerStatut(String refTicket) {
        Ticket ticket = ticketRepository.findById(refTicket)
                .orElseThrow(() -> new EntityNotFoundException(
                        "Ticket introuvable : " + refTicket));

        StatutTicket nouveauStatut = switch (ticket.getStatut()) {
            case TO_DO      -> StatutTicket.IN_PROGRESS;
            case IN_PROGRESS -> StatutTicket.DONE;
            case DONE       -> throw new IllegalStateException(
                    "Le ticket " + refTicket + " est déjà terminé (DONE).");
        };

        ticket.setStatut(nouveauStatut);
        return TicketResponse.fromEntity(ticketRepository.save(ticket));
    }

    // ─── Revenir : DONE → IN_PROGRESS → TO_DO ─────────────────────────────────
    public TicketResponse revenirStatut(String refTicket) {
        Ticket ticket = ticketRepository.findById(refTicket)
                .orElseThrow(() -> new EntityNotFoundException(
                        "Ticket introuvable : " + refTicket));

        StatutTicket nouveauStatut = switch (ticket.getStatut()) {
            case DONE        -> StatutTicket.IN_PROGRESS;
            case IN_PROGRESS -> StatutTicket.TO_DO;
            case TO_DO       -> throw new IllegalStateException(
                    "Le ticket " + refTicket + " est déjà au début (TO_DO).");
        };

        ticket.setStatut(nouveauStatut);
        return TicketResponse.fromEntity(ticketRepository.save(ticket));
    }
}