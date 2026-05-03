package com.projexia.backend.service;

import com.projexia.backend.dto.request.TicketRequest;
import com.projexia.backend.dto.response.TicketResponse;
import com.projexia.backend.model.StatutTicket;
import com.projexia.backend.model.Ticket;
import com.projexia.backend.repository.ProjectRepository;
import com.projexia.backend.repository.TicketRepository;
import com.projexia.backend.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Year;
import java.util.concurrent.atomic.AtomicLong;

@Service
@RequiredArgsConstructor
@Transactional
public class TicketService {

    private final TicketRepository ticketRepository;
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

    // Compteur thread-safe pour la génération de référence
    private final AtomicLong counter = new AtomicLong(
            // Initialisation à partir du nb de tickets existants au démarrage
            // (sera rechargé dynamiquement via ticketRepository.count() en prod)
            0L
    );

    // ─── Génération de référence : TKT-2025-001 ───────────────────────────────
    private String genererRef() {
        long num = ticketRepository.count() + counter.incrementAndGet();
        return String.format("TKT-%d-%03d", Year.now().getValue(), num);
    }

    // ─── Créer un ticket ──────────────────────────────────────────────────────
    public TicketResponse creerTicket(TicketRequest request) {
        var projet = projectRepository.findById(request.getRefProjet())
                .orElseThrow(() -> new EntityNotFoundException(
                        "Projet introuvable : " + request.getRefProjet()));

        var ticket = Ticket.builder()
                .refTicket(genererRef())
                .titre(request.getTitre())
                .description(request.getDescription())
                .typeTicket(request.getTypeTicket())
                .priorite(request.getPriorite())
                .statut(StatutTicket.TO_DO)
                .storyPoints(request.getStoryPoints() != null ? request.getStoryPoints() : 0)
                .projet(projet)
                .build();

        if (request.getMatriculeAssigne() != null && !request.getMatriculeAssigne().isBlank()) {
            var assigne = userRepository.findById(request.getMatriculeAssigne())
                    .orElseThrow(() -> new EntityNotFoundException(
                            "Utilisateur introuvable : " + request.getMatriculeAssigne()));
            ticket.setAssigne(assigne);
        }

        return TicketResponse.fromEntity(ticketRepository.save(ticket));
    }

    // ─── Lister le backlog d'un projet (paginé) ───────────────────────────────
    @Transactional(readOnly = true)
    public Page<TicketResponse> listerBacklog(String refProjet, Pageable pageable) {
        if (!projectRepository.existsById(refProjet)) {
            throw new EntityNotFoundException("Projet introuvable : " + refProjet);
        }
        return ticketRepository.findByProjetRefProjet(refProjet, pageable)
                .map(TicketResponse::fromEntity);
    }

    // ─── Changer le statut d'un ticket ───────────────────────────────────────
    public TicketResponse changerStatut(String refTicket, StatutTicket nouveauStatut) {
        var ticket = ticketRepository.findById(refTicket)
                .orElseThrow(() -> new EntityNotFoundException(
                        "Ticket introuvable : " + refTicket));

        ticket.setStatut(nouveauStatut);
        return TicketResponse.fromEntity(ticketRepository.save(ticket));
    }

    // ─── Mes tickets (par matricule assigné, paginé) ──────────────────────────
    @Transactional(readOnly = true)
    public Page<TicketResponse> mesTickets(String matricule, Pageable pageable) {
        return ticketRepository.findByAssigneMatricule(matricule, pageable)
                .map(TicketResponse::fromEntity);
    }

    // ─── Consulter un ticket ──────────────────────────────────────────────────
    @Transactional(readOnly = true)
    public TicketResponse consulterTicket(String refTicket) {
        return ticketRepository.findById(refTicket)
                .map(TicketResponse::fromEntity)
                .orElseThrow(() -> new EntityNotFoundException(
                        "Ticket introuvable : " + refTicket));
    }
}