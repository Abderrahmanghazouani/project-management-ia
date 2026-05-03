package com.projexia.backend.repository;


import com.projexia.backend.model.Project;
import com.projexia.backend.model.StatutProjet;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * ProjectRepository — Accès à la table "projects"
 *
 * Principe Spring Data JPA :
 * Les méthodes sont nommées selon une convention
 * Spring génère automatiquement le SQL correspondant
 */
@Repository
public interface ProjectRepository
        extends JpaRepository<Project, String> {

    // Filtrer par statut avec pagination
    // SQL : SELECT * FROM projects WHERE statut = ? LIMIT ? OFFSET ?
    Page<Project> findByStatut(
            StatutProjet statut,
            Pageable pageable);

    // Projets d'un créateur avec pagination
    Page<Project> findByCreateurMatricule(
            String matricule,
            Pageable pageable);

    // Vérifier si un nom existe déjà
    boolean existsByNom(String nom);

    // Vérifier si un nom existe pour un autre projet
    boolean existsByNomAndRefProjetNot(
            String nom,
            String refProjet);

    // Recherche par nom (insensible à la casse)
    @Query("SELECT p FROM Project p WHERE " +
            "LOWER(p.nom) LIKE LOWER(CONCAT('%', :search, '%'))")
    Page<Project> searchByNom(
            @Param("search") String search,
            Pageable pageable);

    // Projets par statut et créateur
    Page<Project> findByStatutAndCreateurMatricule(
            StatutProjet statut,
            String matricule,
            Pageable pageable);
}
