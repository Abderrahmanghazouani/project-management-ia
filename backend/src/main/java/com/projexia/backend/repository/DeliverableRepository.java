package com.projexia.backend.repository;

import com.projexia.backend.model.Deliverable;
import com.projexia.backend.model.StatutLivrable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DeliverableRepository extends JpaRepository<Deliverable, String> {

    List<Deliverable> findByProjetRefProjet(String refProjet);

    List<Deliverable> findByProjetRefProjetAndStatut(String refProjet, StatutLivrable statut);
}