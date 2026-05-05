package com.projexia.backend.service;

import com.projexia.backend.dto.request.DeliverableRequest;
import com.projexia.backend.dto.response.DeliverableResponse;
import com.projexia.backend.model.Deliverable;
import com.projexia.backend.model.Project;
import com.projexia.backend.model.StatutLivrable;
import com.projexia.backend.repository.DeliverableRepository;
import com.projexia.backend.repository.ProjectRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.Year;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class DeliverableService {

    private final DeliverableRepository deliverableRepository;
    private final ProjectRepository projectRepository;

    // ─── Génération de référence : LVR-2025-001 ───────────────────────────────
    private String genererRef() {
        long count = deliverableRepository.count() + 1;
        return String.format("LVR-%d-%03d", Year.now().getValue(), count);
    }

    // ─── Créer un livrable ────────────────────────────────────────────────────
    public DeliverableResponse creerLivrable(DeliverableRequest request) {
        Project projet = projectRepository.findById(request.getRefProjet())
                .orElseThrow(() -> new EntityNotFoundException(
                        "Projet introuvable : " + request.getRefProjet()));

        // Détection automatique du retard : date prévue déjà dépassée
        StatutLivrable statut = request.getDatePrevue().isBefore(LocalDate.now())
                ? StatutLivrable.EN_RETARD
                : StatutLivrable.EN_ATTENTE;

        Deliverable deliverable = Deliverable.builder()
                .refLivrable(genererRef())
                .nom(request.getNom())
                .description(request.getDescription())
                .datePrevue(request.getDatePrevue())
                .lienFichier(request.getLienFichier())
                .statut(statut)
                .projet(projet)
                .build();

        return DeliverableResponse.fromEntity(deliverableRepository.save(deliverable));
    }

    // ─── Lister les livrables d'un projet ────────────────────────────────────
    @Transactional(readOnly = true)
    public List<DeliverableResponse> listerLivrables(String refProjet) {
        if (!projectRepository.existsById(refProjet)) {
            throw new EntityNotFoundException("Projet introuvable : " + refProjet);
        }
        return deliverableRepository.findByProjetRefProjet(refProjet)
                .stream().map(DeliverableResponse::fromEntity).toList();
    }

    // ─── Modifier un livrable ─────────────────────────────────────────────────
    public DeliverableResponse modifierLivrable(String refLivrable, DeliverableRequest request) {
        Deliverable deliverable = deliverableRepository.findById(refLivrable)
                .orElseThrow(() -> new EntityNotFoundException(
                        "Livrable introuvable : " + refLivrable));

        deliverable.setNom(request.getNom());
        deliverable.setDescription(request.getDescription());
        deliverable.setLienFichier(request.getLienFichier());

        // Recalcul du statut si la date change
        if (request.getDatePrevue() != null) {
            deliverable.setDatePrevue(request.getDatePrevue());
            if (deliverable.getStatut() == StatutLivrable.EN_ATTENTE
                    && request.getDatePrevue().isBefore(LocalDate.now())) {
                deliverable.setStatut(StatutLivrable.EN_RETARD);
            }
        }

        return DeliverableResponse.fromEntity(deliverableRepository.save(deliverable));
    }

    // ─── Changer le statut d'un livrable ─────────────────────────────────────
    public DeliverableResponse marquerComme(String refLivrable, StatutLivrable nouveauStatut) {
        Deliverable deliverable = deliverableRepository.findById(refLivrable)
                .orElseThrow(() -> new EntityNotFoundException(
                        "Livrable introuvable : " + refLivrable));

        deliverable.setStatut(nouveauStatut);
        return DeliverableResponse.fromEntity(deliverableRepository.save(deliverable));
    }
}