package com.projexia.backend.repository;

import com.projexia.backend.model.CostTracking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Repository
public interface CostTrackingRepository extends JpaRepository<CostTracking, String> {

    List<CostTracking> findByProjetRefProjet(String refProjet);

    Optional<CostTracking> findTopByProjetRefProjetOrderByDateEnregistrementDesc(String refProjet);

    @Query("SELECT COALESCE(SUM(c.budgetPrevu - c.budgetReel), 0) " +
            "FROM CostTracking c WHERE c.projet.refProjet = :refProjet")
    BigDecimal calculerEcartTotal(@Param("refProjet") String refProjet);

    @Query("SELECT COALESCE(SUM(c.budgetPrevu), 0) FROM CostTracking c")
    BigDecimal sumBudgetPrevu();

    @Query("SELECT COALESCE(SUM(c.budgetReel), 0) FROM CostTracking c")
    BigDecimal sumBudgetReel();
}