package com.projexia.backend.model;



import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "ia_estimations")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class IAEstimation {

    @Id
    @Column(name = "ref_estimation", length = 50)
    private String refEstimation;

    @Column(name = "texte_cdc",
            columnDefinition = "TEXT",
            nullable = false)
    private String texteCdc;

    @Column(name = "total_jours")
    private Integer totalJours;

    @Column(name = "complexite", length = 20)
    private String complexite;

    @Column(name = "risques",
            columnDefinition = "TEXT")
    private String risques;

    @Enumerated(EnumType.STRING)
    @Column(name = "statut", nullable = false)
    private StatutEstimation statut;

    @Column(name = "date_creation")
    private LocalDateTime dateCreation;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ref_projet")
    private Project projet;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "matricule_client")
    private User client;

    @PrePersist
    public void prePersist() {
        this.dateCreation = LocalDateTime.now();
        if (this.statut == null)
            this.statut = StatutEstimation.EN_ATTENTE;
    }
}
