package com.projexia.backend.service;

import com.projexia.backend.dto.request.SprintRequest;
import com.projexia.backend.dto.response.SprintResponse;
import com.projexia.backend.model.Sprint;
import com.projexia.backend.model.StatutSprint;
import com.projexia.backend.model.Ticket;
import com.projexia.backend.repository.ProjectRepository;
import com.projexia.backend.repository.SprintRepository;
import com.projexia.backend.repository.TicketRepository;
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
public class SprintService {

    private final SprintRepository sprintRepository;
    private final ProjectRepository projectRepository;
    private final TicketRepository ticketRepository;

    // Compteur thread-safe pour la génération de référence
    private final AtomicLong counter = new AtomicLong(0L);

    // ─── Génération de référence : SPR-2025-001 ───────────────────────────────
    private String genererRef() {
        long num = sprintRepository.count() + counter.incrementAndGet();
        return String.format("SPR-%d-%03d", Year.now().getValue(), num);
    }

    // ─── Créer un sprint ──────────────────────────────────────────────────────
    public SprintResponse creerSprint(SprintRequest request) {
        if (request.getDateFin().isBefore(request.getDateDebut()) ||
                request.getDateFin().isEqual(request.getDateDebut())) {
            throw new IllegalArgumentException(
                    "La date de fin doit être postérieure à la date de début");
        }

        var projet = projectRepository.findById(request.getRefProjet())
                .orElseThrow(() -> new EntityNotFoundException(
                        "Projet introuvable : " + request.getRefProjet()));

        var sprint = Sprint.builder()
                .refSprint(genererRef())
                .nom(request.getNom())
                .objectif(request.getObjectif())
                .dateDebut(request.getDateDebut())
                .dateFin(request.getDateFin())
                .capacite(request.getCapacite() != null ? request.getCapacite() : 0)
                .statut(StatutSprint.A_VENIR)
                .projet(projet)
                .build();

        return SprintResponse.fromEntity(sprintRepository.save(sprint));
    }

    // ─── Lister les sprints d'un projet (paginé) ──────────────────────────────
    @Transactional(readOnly = true)
    public Page<SprintResponse> listerSprints(String refProjet, Pageable pageable) {
        if (!projectRepository.existsById(refProjet)) {
            throw new EntityNotFoundException("Projet introuvable : " + refProjet);
        }
        return sprintRepository.findByProjetRefProjet(refProjet, pageable)
                .map(SprintResponse::fromEntity);
    }

    // ─── Consulter un sprint ──────────────────────────────────────────────────
    @Transactional(readOnly = true)
    public SprintResponse consulterSprint(String refSprint) {
        return sprintRepository.findById(refSprint)
                .map(SprintResponse::fromEntity)
                .orElseThrow(() -> new EntityNotFoundException(
                        "Sprint introuvable : " + refSprint));
    }

    // ─── Affecter un ticket à un sprint ──────────────────────────────────────
    public SprintResponse affecterTicket(String refSprint, String refTicket) {
        Sprint sprint = sprintRepository.findById(refSprint)
                .orElseThrow(() -> new EntityNotFoundException(
                        "Sprint introuvable : " + refSprint));

        Ticket ticket = ticketRepository.findById(refTicket)
                .orElseThrow(() -> new EntityNotFoundException(
                        "Ticket introuvable : " + refTicket));

        ticket.setSprint(sprint);
        ticketRepository.save(ticket);

        return SprintResponse.fromEntity(sprint);
    }

    // ─── Changer le statut d'un sprint ───────────────────────────────────────
    public SprintResponse changerStatut(String refSprint, StatutSprint nouveauStatut) {
        Sprint sprint = sprintRepository.findById(refSprint)
                .orElseThrow(() -> new EntityNotFoundException(
                        "Sprint introuvable : " + refSprint));

        validerTransition(sprint.getStatut(), nouveauStatut);
        sprint.setStatut(nouveauStatut);

        return SprintResponse.fromEntity(sprintRepository.save(sprint));
    }

    // ─── Validation des transitions de statut ────────────────────────────────
    private void validerTransition(StatutSprint actuel, StatutSprint cible) {
        boolean valide = switch (actuel) {
            case A_VENIR -> cible == StatutSprint.ACTIF;
            case ACTIF   -> cible == StatutSprint.TERMINE;
            case TERMINE -> false;
        };

        if (!valide) {
            throw new IllegalStateException(
                    String.format("Transition invalide : %s → %s", actuel, cible));
        }
    }
}