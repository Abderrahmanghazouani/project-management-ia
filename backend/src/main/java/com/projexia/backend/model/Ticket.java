package com.projexia.backend.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "tickets")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Ticket {

    @Id
    @Column(name = "ref_ticket", length = 50)
    private String refTicket;

    @Column(name = "titre", nullable = false, length = 200)
    private String titre;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(name = "type_ticket", nullable = false, length = 20)
    private TypeTicket typeTicket;

    @Enumerated(EnumType.STRING)
    @Column(name = "priorite", nullable = false, length = 20)
    private PrioriteTicket priorite;

    @Enumerated(EnumType.STRING)
    @Column(name = "statut", nullable = false, length = 20)
    @Builder.Default
    private StatutTicket statut = StatutTicket.TO_DO;

    @Column(name = "story_points")
    @Builder.Default
    private Integer storyPoints = 0;

    @Column(name = "date_creation", nullable = false)
    private LocalDateTime dateCreation;

    @Column(name = "date_maj")
    private LocalDateTime dateMaj;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ref_projet")
    private Project projet;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "matricule_assigne")
    private User assigne;

    @PrePersist
    protected void onCreate() {
        this.dateCreation = LocalDateTime.now();
        if (this.statut == null) {
            this.statut = StatutTicket.TO_DO;
        }
        if (this.storyPoints == null) {
            this.storyPoints = 0;
        }
    }

    @PreUpdate
    protected void onUpdate() {
        this.dateMaj = LocalDateTime.now();
    }
}
