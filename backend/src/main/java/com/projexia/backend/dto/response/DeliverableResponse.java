package com.projexia.backend.dto.response;

import com.projexia.backend.model.Deliverable;
import com.projexia.backend.model.StatutLivrable;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Builder
public class DeliverableResponse {

    private String refLivrable;
    private String nom;
    private String description;
    private LocalDate datePrevue;
    private String lienFichier;
    private StatutLivrable statut;
    private LocalDateTime dateCreation;
    private String refProjet;

    public static DeliverableResponse fromEntity(Deliverable d) {
        return DeliverableResponse.builder()
                .refLivrable(d.getRefLivrable())
                .nom(d.getNom())
                .description(d.getDescription())
                .datePrevue(d.getDatePrevue())
                .lienFichier(d.getLienFichier())
                .statut(d.getStatut())
                .dateCreation(d.getDateCreation())
                .refProjet(d.getProjet() != null ? d.getProjet().getRefProjet() : null)
                .build();
    }
}