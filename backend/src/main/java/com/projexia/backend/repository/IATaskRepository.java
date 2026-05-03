package com.projexia.backend.repository;



import com.projexia.backend.model.IATask;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * IATaskRepository — Accès à la table ia_tasks
 */
@Repository
public interface IATaskRepository
        extends JpaRepository<IATask, String> {

    // Tâches d'une estimation
    List<IATask> findByEstimationRefEstimation(
            String refEstimation);

    // Supprimer les tâches d'une estimation
    void deleteByEstimationRefEstimation(
            String refEstimation);
}
