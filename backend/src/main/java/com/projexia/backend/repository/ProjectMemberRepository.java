package com.projexia.backend.repository;



import com.projexia.backend.model.ProjectMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * ProjectMemberRepository — Accès à la table project_members
 */
@Repository
public interface ProjectMemberRepository
        extends JpaRepository<ProjectMember, String> {

    // Tous les membres d'un projet
    List<ProjectMember> findByProjetRefProjet(
            String refProjet);

    // Vérifier si un user est déjà membre du projet
    boolean existsByProjetRefProjetAndUserMatricule(
            String refProjet,
            String matricule);

    // Trouver un membre spécifique
    Optional<ProjectMember> findByProjetRefProjetAndUserMatricule(
            String refProjet,
            String matricule);

    // Compter les membres d'un projet
    long countByProjetRefProjet(String refProjet);

    // Projets d'un utilisateur
    List<ProjectMember> findByUserMatricule(
            String matricule);
}