package com.projexia.backend.dto.response;

import com.projexia.backend.model.PrioriteTicket;
import com.projexia.backend.model.StatutTicket;
import com.projexia.backend.model.Ticket;
import com.projexia.backend.model.TypeTicket;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class TicketResponse {

    private String refTicket;
    private String titre;
    private String description;
    private TypeTicket typeTicket;
    private PrioriteTicket priorite;
    private StatutTicket statut;
    private Integer storyPoints;
    private LocalDateTime dateCreation;
    private String refProjet;
    private String matriculeAssigne;

    public static TicketResponse fromEntity(Ticket t) {
        return TicketResponse.builder()
                .refTicket(t.getRefTicket())
                .titre(t.getTitre())
                .description(t.getDescription())
                .typeTicket(t.getTypeTicket())
                .priorite(t.getPriorite())
                .statut(t.getStatut())
                .storyPoints(t.getStoryPoints())
                .dateCreation(t.getDateCreation())
                .refProjet(t.getProjet() != null ? t.getProjet().getRefProjet() : null)
                .matriculeAssigne(t.getAssigne() != null ? t.getAssigne().getMatricule() : null)
                .build();
    }
}