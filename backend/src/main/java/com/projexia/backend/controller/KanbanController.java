package com.projexia.backend.controller;

import com.projexia.backend.dto.response.KanbanResponse;
import com.projexia.backend.dto.response.TicketResponse;
import com.projexia.backend.service.KanbanService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/kanban")
@RequiredArgsConstructor
@Tag(name = "Kanban", description = "Board Kanban - 3 colonnes")
public class KanbanController {

    private final KanbanService kanbanService;

    // ─── GET /api/kanban/{refProjet} — Board complet ──────────────────────────
    @GetMapping("/{refProjet}")
    @Operation(
            summary = "Board Kanban d'un projet",
            description = "Retourne les 3 colonnes : TO_DO / IN_PROGRESS / DONE"
    )
    public ResponseEntity<KanbanResponse> getBoard(@PathVariable String refProjet) {
        return ResponseEntity.ok(kanbanService.getBoardKanban(refProjet));
    }

    // ─── PUT /api/kanban/{refTicket}/avancer ──────────────────────────────────
    @PutMapping("/{refTicket}/avancer")
    @Operation(
            summary = "Avancer un ticket",
            description = "TO_DO → IN_PROGRESS → DONE. Erreur si déjà DONE."
    )
    public ResponseEntity<TicketResponse> avancer(@PathVariable String refTicket) {
        return ResponseEntity.ok(kanbanService.avancerStatut(refTicket));
    }

    // ─── PUT /api/kanban/{refTicket}/revenir ──────────────────────────────────
    @PutMapping("/{refTicket}/revenir")
    @Operation(
            summary = "Reculer un ticket",
            description = "DONE → IN_PROGRESS → TO_DO. Erreur si déjà TO_DO."
    )
    public ResponseEntity<TicketResponse> revenir(@PathVariable String refTicket) {
        return ResponseEntity.ok(kanbanService.revenirStatut(refTicket));
    }
}