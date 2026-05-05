package com.projexia.backend.model;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "cost_tracking")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CostTracking {

    @Id
    @Column(name = "ref_cout", length = 50)
    private String refCout;

    @Column(name = "budget_prevu", nullable = false, precision = 15, scale = 2)
    @Builder.Default
    private BigDecimal budgetPrevu = BigDecimal.ZERO;

    @Column(name = "budget_reel", nullable = false, precision = 15, scale = 2)
    @Builder.Default
    private BigDecimal budgetReel = BigDecimal.ZERO;

    /**
     * Calculé en base (GENERATED ALWAYS AS budget_prevu - budget_reel STORED)
     * insertable=false, updatable=false → JPA ne touche pas à cette colonne
     */
    @Column(name = "ecart", precision = 15, scale = 2,
            insertable = false, updatable = false)
    private BigDecimal ecart;

    @Column(name = "date_enregistrement", nullable = false)
    private LocalDateTime dateEnregistrement;

    @Column(name = "commentaire", columnDefinition = "TEXT")
    private String commentaire;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ref_projet")
    private Project projet;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "matricule_enregistre")
    private User enregistrePar;

    @PrePersist
    protected void onCreate() {
        this.dateEnregistrement = LocalDateTime.now();
        if (this.budgetPrevu == null) this.budgetPrevu = BigDecimal.ZERO;
        if (this.budgetReel == null) this.budgetReel = BigDecimal.ZERO;
    }
}