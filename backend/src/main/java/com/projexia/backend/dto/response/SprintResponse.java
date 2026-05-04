package com.projexia.backend.dto.response;

import com.projexia.backend.model.Sprint;
import com.projexia.backend.model.StatutSprint;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Builder
public class SprintResponse {

    private String refSprint;
    private String nom;
    private String objectif;
    private LocalDate dateDebut;
    private LocalDate dateFin;
    private Integer capacite;
    private StatutSprint statut;
    private LocalDateTime dateCreation;
    private String refProjet;

    public static SprintResponse fromEntity(Sprint s) {
        return SprintResponse.builder()
                .refSprint(s.getRefSprint())
                .nom(s.getNom())
                .objectif(s.getObjectif())
                .dateDebut(s.getDateDebut())
                .dateFin(s.getDateFin())
                .capacite(s.getCapacite())
                .statut(s.getStatut())
                .dateCreation(s.getDateCreation())
                .refProjet(s.getProjet() != null ? s.getProjet().getRefProjet() : null)
                .build();
    }
}