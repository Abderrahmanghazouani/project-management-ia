package com.projexia.backend.dto.response;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class KanbanResponse {

    private String refProjet;
    private String nomProjet;
    private List<TicketResponse> todo;        // statut TO_DO
    private List<TicketResponse> inProgress;  // statut IN_PROGRESS
    private List<TicketResponse> done;        // statut DONE
    private int totalTickets;
}