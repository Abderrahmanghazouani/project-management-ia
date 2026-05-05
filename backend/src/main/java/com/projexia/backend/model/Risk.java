package com.projexia.backend.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "risks")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Risk {

    @Id
    @Column(name = "ref_risque", length = 50)
    private String refRisque;

    @Column(name = "description", nullable = false, columnDefinition = "TEXT")
    private String description;

    @Column(name = "probabilite", nullable = false, length = 20)
    private String probabilite;

    @Column(name = "impact", nullable = false, length = 20)
    private String impact;

    @Column(name = "criticite", nullable = false, length = 20)
    private String criticite;

    @Column(name = "plan_mitigation", columnDefinition = "TEXT")
    private String planMitigation;

    @Column(name = "responsable", length = 100)
    private String responsable;

    @Enumerated(EnumType.STRING)
    @Column(name = "statut", nullable = false, length = 20)
    @Builder.Default
    private StatutRisque statut = StatutRisque.IDENTIFIE;

    @Column(name = "date_creation", nullable = false)
    private LocalDateTime dateCreation;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ref_projet")
    private Project projet;

    @PrePersist
    protected void onCreate() {
        this.dateCreation = LocalDateTime.now();
        if (this.statut == null) {
            this.statut = StatutRisque.IDENTIFIE;
        }
    }
}