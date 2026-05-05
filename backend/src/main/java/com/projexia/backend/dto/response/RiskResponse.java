package com.projexia.backend.dto.response;

import com.projexia.backend.model.Risk;
import com.projexia.backend.model.StatutRisque;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class RiskResponse {

    private String refRisque;
    private String description;
    private String probabilite;
    private String impact;
    private String criticite;
    private String planMitigation;
    private String responsable;
    private StatutRisque statut;
    private LocalDateTime dateCreation;
    private String refProjet;

    public static RiskResponse fromEntity(Risk r) {
        return RiskResponse.builder()
                .refRisque(r.getRefRisque())
                .description(r.getDescription())
                .probabilite(r.getProbabilite())
                .impact(r.getImpact())
                .criticite(r.getCriticite())
                .planMitigation(r.getPlanMitigation())
                .responsable(r.getResponsable())
                .statut(r.getStatut())
                .dateCreation(r.getDateCreation())
                .refProjet(r.getProjet() != null ? r.getProjet().getRefProjet() : null)
                .build();
    }
}