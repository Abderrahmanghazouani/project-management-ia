package com.projexia.backend.repository;



import com.projexia.backend.model.IAEstimation;
import com.projexia.backend.model.StatutEstimation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * IAEstimationRepository — Accès à la table ia_estimations
 */
@Repository
public interface IAEstimationRepository
        extends JpaRepository<IAEstimation, String> {

    // Toutes les estimations d'un projet
    List<IAEstimation> findByProjetRefProjet(
            String refProjet);

    // Dernière estimation d'un projet
    Optional<IAEstimation>
    findTopByProjetRefProjetOrderByDateCreationDesc(
            String refProjet);

    // Estimations par statut
    List<IAEstimation> findByStatut(
            StatutEstimation statut);

    // Estimation confirmée d'un projet
    Optional<IAEstimation>
    findByProjetRefProjetAndStatut(
            String refProjet,
            StatutEstimation statut);
}