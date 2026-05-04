package com.projexia.backend.repository;

import com.projexia.backend.model.Sprint;
import com.projexia.backend.model.StatutSprint;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SprintRepository extends JpaRepository<Sprint, String> {

    List<Sprint> findByProjetRefProjet(String refProjet);

    Optional<Sprint> findByProjetRefProjetAndStatut(String refProjet, StatutSprint statut);

    Page<Sprint> findByProjetRefProjet(String refProjet, Pageable pageable);

    boolean existsByNomAndProjetRefProjet(String nom, String refProjet);
}