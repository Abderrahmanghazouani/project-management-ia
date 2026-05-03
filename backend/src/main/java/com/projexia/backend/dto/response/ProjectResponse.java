package com.projexia.backend.dto.response;



import com.projexia.backend.model.Project;
import com.projexia.backend.model.StatutProjet;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * ProjectResponse — Données retournées au frontend
 *
 * Principe DTO :
 * On contrôle exactement ce qu'on expose
 * On ne retourne jamais l'entité directement
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProjectResponse {

    private String refProjet;
    private String nom;
    private String description;
    private StatutProjet statut;
    private LocalDate dateDebut;
    private LocalDate dateFin;
    private BigDecimal budgetPrevu;
    private BigDecimal budgetReel;
    private LocalDateTime dateCreation;
    private String matriculeCreateur;
    private String nomCreateur;
    private String prenomCreateur;

    /**
     * Conversion entité → DTO
     * Méthode statique utilitaire
     */
    public static ProjectResponse fromEntity(Project p) {
        return ProjectResponse.builder()
                .refProjet(p.getRefProjet())
                .nom(p.getNom())
                .description(p.getDescription())
                .statut(p.getStatut())
                .dateDebut(p.getDateDebut())
                .dateFin(p.getDateFin())
                .budgetPrevu(p.getBudgetPrevu())
                .budgetReel(p.getBudgetReel())
                .dateCreation(p.getDateCreation())
                .matriculeCreateur(
                        p.getCreateur() != null ?
                                p.getCreateur().getMatricule() : null)
                .nomCreateur(
                        p.getCreateur() != null ?
                                p.getCreateur().getNom() : null)
                .prenomCreateur(
                        p.getCreateur() != null ?
                                p.getCreateur().getPrenom() : null)
                .build();
    }
}
