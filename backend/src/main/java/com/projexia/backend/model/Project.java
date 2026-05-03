package com.projexia.backend.model;



import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * Project — Entité JPA mappée sur la table "projects"
 *
 * Principes appliqués :
 * 1. @Entity + @Table → mapping JPA
 * 2. Lombok → réduction code répétitif
 * 3. @ManyToOne → relation avec User (créateur)
 * 4. @PrePersist → initialisation automatique
 */
@Entity
@Table(name = "projects")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Project {

    @Id
    @Column(name = "ref_projet", length = 50)
    private String refProjet;

    @NotBlank(message = "Le nom est obligatoire")
    @Size(max = 150)
    @Column(name = "nom", nullable = false)
    private String nom;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(name = "statut", nullable = false)
    private StatutProjet statut;

    @NotNull(message = "La date de début est obligatoire")
    @Column(name = "date_debut", nullable = false)
    private LocalDate dateDebut;

    @NotNull(message = "La date de fin est obligatoire")
    @Column(name = "date_fin", nullable = false)
    private LocalDate dateFin;

    @Column(name = "budget_prevu",
            precision = 15, scale = 2)
    private BigDecimal budgetPrevu = BigDecimal.ZERO;

    @Column(name = "budget_reel",
            precision = 15, scale = 2)
    private BigDecimal budgetReel = BigDecimal.ZERO;

    @Column(name = "date_creation")
    private LocalDateTime dateCreation;

    /**
     * Relation ManyToOne avec User
     * Un projet est créé par un seul utilisateur
     * Un utilisateur peut créer plusieurs projets
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "matricule_createur")
    private User createur;

    @PrePersist
    public void prePersist() {
        this.dateCreation = LocalDateTime.now();
        if (this.statut == null)
            this.statut = StatutProjet.ACTIF;
        if (this.budgetPrevu == null)
            this.budgetPrevu = BigDecimal.ZERO;
        if (this.budgetReel == null)
            this.budgetReel = BigDecimal.ZERO;
    }
}
