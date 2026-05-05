package com.projexia.backend.repository;

import com.projexia.backend.model.PrioriteTicket;
import com.projexia.backend.model.StatutTicket;
import com.projexia.backend.model.Ticket;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, String> {

    Page<Ticket> findByProjetRefProjet(String refProjet, Pageable pageable);

    List<Ticket> findByProjetRefProjetAndStatut(String refProjet, StatutTicket statut);

    Page<Ticket> findByAssigneMatricule(String matricule, Pageable pageable);

    long countByProjetRefProjetAndStatut(String refProjet, StatutTicket statut);

    long countByStatut(StatutTicket statut);

    List<Ticket> findTop5ByPrioriteAndStatutOrderByDateCreationAsc(PrioriteTicket priorite, StatutTicket statut);
}