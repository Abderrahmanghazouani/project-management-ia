package com.projexia.backend.dto.response;

import com.projexia.backend.model.CostTracking;
import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Builder
public class CostResponse {

    private String refCout;
    private BigDecimal budgetPrevu;
    private BigDecimal budgetReel;
    private BigDecimal ecart;
    private LocalDateTime dateEnregistrement;
    private String commentaire;
    private String refProjet;
    private String matriculeEnregistre;

    public static CostResponse fromEntity(CostTracking c) {
        // L'écart est calculé en base via GENERATED ALWAYS,
        // mais on le recalcule côté Java pour la réponse immédiate
        // (avant que PostgreSQL ne rafraîchisse la valeur stockée)
        BigDecimal ecartCalcule = (c.getEcart() != null)
                ? c.getEcart()
                : c.getBudgetPrevu().subtract(c.getBudgetReel());

        return CostResponse.builder()
                .refCout(c.getRefCout())
                .budgetPrevu(c.getBudgetPrevu())
                .budgetReel(c.getBudgetReel())
                .ecart(ecartCalcule)
                .dateEnregistrement(c.getDateEnregistrement())
                .commentaire(c.getCommentaire())
                .refProjet(c.getProjet() != null ? c.getProjet().getRefProjet() : null)
                .matriculeEnregistre(c.getEnregistrePar() != null
                        ? c.getEnregistrePar().getMatricule() : null)
                .build();
    }
}