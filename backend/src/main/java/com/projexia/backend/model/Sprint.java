package com.projexia.backend.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "sprints")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Sprint {

    @Id
    @Column(name = "ref_sprint", length = 50)
    private String refSprint;

    @Column(name = "nom", nullable = false, length = 150)
    private String nom;

    @Column(name = "objectif", columnDefinition = "TEXT")
    private String objectif;

    @Column(name = "date_debut", nullable = false)
    private LocalDate dateDebut;

    @Column(name = "date_fin", nullable = false)
    private LocalDate dateFin;

    @Column(name = "capacite")
    @Builder.Default
    private Integer capacite = 0;

    @Enumerated(EnumType.STRING)
    @Column(name = "statut", nullable = false, length = 20)
    @Builder.Default
    private StatutSprint statut = StatutSprint.A_VENIR;

    @Column(name = "date_creation", nullable = false)
    private LocalDateTime dateCreation;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ref_projet")
    private Project projet;

    @PrePersist
    protected void onCreate() {
        this.dateCreation = LocalDateTime.now();
        if (this.statut == null) {
            this.statut = StatutSprint.A_VENIR;
        }
        if (this.capacite == null) {
            this.capacite = 0;
        }
    }
}