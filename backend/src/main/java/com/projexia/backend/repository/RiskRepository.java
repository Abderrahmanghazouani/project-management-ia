package com.projexia.backend.repository;

import com.projexia.backend.model.Risk;
import com.projexia.backend.model.StatutRisque;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RiskRepository extends JpaRepository<Risk, String> {

    List<Risk> findByProjetRefProjet(String refProjet);

    List<Risk> findByProjetRefProjetAndStatut(String refProjet, StatutRisque statut);

    List<Risk> findByProjetRefProjetOrderByCriticiteDesc(String refProjet);
}