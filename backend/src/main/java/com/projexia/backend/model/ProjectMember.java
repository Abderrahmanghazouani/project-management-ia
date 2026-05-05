package com.projexia.backend.model;


import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

/**
 * ProjectMember — Membre d'un projet
 *
 * Représente la relation entre un User et un Project
 * avec un rôle spécifique dans ce projet
 *
 * Principes :
 * @ManyToOne → un membre appartient à 1 projet
 * @ManyToOne → un membre est 1 utilisateur
 */
@Entity
@Table(name = "project_members")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProjectMember {

    @Id
    @Column(name = "ref_membre", length = 50)
    private String refMembre;

    @Column(name = "role_projet",
            nullable = false,
            length = 30)
    private String roleProjet;

    @Column(name = "date_ajout")
    private LocalDateTime dateAjout;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ref_projet")
    private Project projet;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "matricule_user")
    private User user;

    @PrePersist
    public void prePersist() {
        this.dateAjout = LocalDateTime.now();
    }
}