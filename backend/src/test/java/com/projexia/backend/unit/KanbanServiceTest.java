package com.projexia.backend.unit;

import com.projexia.backend.dto.response.KanbanResponse;
import com.projexia.backend.dto.response.TicketResponse;
import com.projexia.backend.model.*;
import com.projexia.backend.repository.ProjectRepository;
import com.projexia.backend.repository.TicketRepository;
import com.projexia.backend.service.KanbanService;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@DisplayName("Tests unitaires — KanbanService")
class KanbanServiceTest {

    @Mock private TicketRepository ticketRepository;
    @Mock private ProjectRepository projectRepository;

    @InjectMocks private KanbanService kanbanService;

    private Project projetMock;

    // ─── Helpers ──────────────────────────────────────────────────────────────

    private Ticket buildTicket(String ref, StatutTicket statut) {
        return Ticket.builder()
                .refTicket(ref)
                .titre("Ticket " + ref)
                .typeTicket(TypeTicket.TASK)
                .priorite(PrioriteTicket.HAUTE)
                .statut(statut)
                .storyPoints(2)
                .dateCreation(LocalDateTime.now())
                .projet(projetMock)
                .build();
    }

    @BeforeEach
    void setUp() {
        projetMock = new Project();
        projetMock.setRefProjet("PRJ-2025-001");
        projetMock.setNom("ProjExia Platform");
    }

    // ─── getBoard ─────────────────────────────────────────────────────────────

    @Test
    @DisplayName("getBoard_Devrait_Retourner3Colonnes")
    void getBoard_Devrait_Retourner3Colonnes() {
        when(projectRepository.findById("PRJ-2025-001"))
                .thenReturn(Optional.of(projetMock));
        when(ticketRepository.findByProjetRefProjetAndStatut("PRJ-2025-001", StatutTicket.TO_DO))
                .thenReturn(List.of(buildTicket("TKT-001", StatutTicket.TO_DO)));
        when(ticketRepository.findByProjetRefProjetAndStatut("PRJ-2025-001", StatutTicket.IN_PROGRESS))
                .thenReturn(List.of(buildTicket("TKT-002", StatutTicket.IN_PROGRESS)));
        when(ticketRepository.findByProjetRefProjetAndStatut("PRJ-2025-001", StatutTicket.DONE))
                .thenReturn(List.of(buildTicket("TKT-003", StatutTicket.DONE)));

        KanbanResponse board = kanbanService.getBoardKanban("PRJ-2025-001");

        assertThat(board).isNotNull();
        assertThat(board.getRefProjet()).isEqualTo("PRJ-2025-001");
        assertThat(board.getNomProjet()).isEqualTo("ProjExia Platform");
        assertThat(board.getTodo()).isNotNull();
        assertThat(board.getInProgress()).isNotNull();
        assertThat(board.getDone()).isNotNull();
    }

    @Test
    @DisplayName("getBoard_Devrait_GrouperParStatut")
    void getBoard_Devrait_GrouperParStatut() {
        when(projectRepository.findById("PRJ-2025-001"))
                .thenReturn(Optional.of(projetMock));
        when(ticketRepository.findByProjetRefProjetAndStatut("PRJ-2025-001", StatutTicket.TO_DO))
                .thenReturn(List.of(
                        buildTicket("TKT-001", StatutTicket.TO_DO),
                        buildTicket("TKT-002", StatutTicket.TO_DO)
                ));
        when(ticketRepository.findByProjetRefProjetAndStatut("PRJ-2025-001", StatutTicket.IN_PROGRESS))
                .thenReturn(List.of(buildTicket("TKT-003", StatutTicket.IN_PROGRESS)));
        when(ticketRepository.findByProjetRefProjetAndStatut("PRJ-2025-001", StatutTicket.DONE))
                .thenReturn(List.of());

        KanbanResponse board = kanbanService.getBoardKanban("PRJ-2025-001");

        assertThat(board.getTodo()).hasSize(2);
        assertThat(board.getInProgress()).hasSize(1);
        assertThat(board.getDone()).isEmpty();
        assertThat(board.getTotalTickets()).isEqualTo(3);
    }

    // ─── avancerStatut ────────────────────────────────────────────────────────

    @Test
    @DisplayName("avancerStatut_TODO_vers_IN_PROGRESS")
    void avancerStatut_TODO_vers_IN_PROGRESS() {
        Ticket ticket = buildTicket("TKT-001", StatutTicket.TO_DO);
        Ticket ticketMaj = buildTicket("TKT-001", StatutTicket.IN_PROGRESS);

        when(ticketRepository.findById("TKT-001")).thenReturn(Optional.of(ticket));
        when(ticketRepository.save(any(Ticket.class))).thenReturn(ticketMaj);

        TicketResponse response = kanbanService.avancerStatut("TKT-001");

        assertThat(response.getStatut()).isEqualTo(StatutTicket.IN_PROGRESS);

        // Vérifier que le statut a bien été changé sur l'entité avant save
        ArgumentCaptor<Ticket> captor = ArgumentCaptor.forClass(Ticket.class);
        verify(ticketRepository).save(captor.capture());
        assertThat(captor.getValue().getStatut()).isEqualTo(StatutTicket.IN_PROGRESS);
    }

    @Test
    @DisplayName("avancerStatut_IN_PROGRESS_vers_DONE")
    void avancerStatut_IN_PROGRESS_vers_DONE() {
        Ticket ticket = buildTicket("TKT-002", StatutTicket.IN_PROGRESS);
        Ticket ticketMaj = buildTicket("TKT-002", StatutTicket.DONE);

        when(ticketRepository.findById("TKT-002")).thenReturn(Optional.of(ticket));
        when(ticketRepository.save(any(Ticket.class))).thenReturn(ticketMaj);

        TicketResponse response = kanbanService.avancerStatut("TKT-002");

        assertThat(response.getStatut()).isEqualTo(StatutTicket.DONE);
    }

    @Test
    @DisplayName("avancerStatut_DONE_Devrait_LancerException")
    void avancerStatut_DONE_Devrait_LancerException() {
        Ticket ticket = buildTicket("TKT-003", StatutTicket.DONE);

        when(ticketRepository.findById("TKT-003")).thenReturn(Optional.of(ticket));

        assertThatThrownBy(() -> kanbanService.avancerStatut("TKT-003"))
                .isInstanceOf(IllegalStateException.class)
                .hasMessageContaining("TKT-003")
                .hasMessageContaining("DONE");

        // Aucun save ne doit être appelé
        verify(ticketRepository, never()).save(any());
    }

    // ─── revenirStatut ────────────────────────────────────────────────────────

    @Test
    @DisplayName("revenirStatut_DONE_vers_IN_PROGRESS")
    void revenirStatut_DONE_vers_IN_PROGRESS() {
        Ticket ticket = buildTicket("TKT-004", StatutTicket.DONE);
        Ticket ticketMaj = buildTicket("TKT-004", StatutTicket.IN_PROGRESS);

        when(ticketRepository.findById("TKT-004")).thenReturn(Optional.of(ticket));
        when(ticketRepository.save(any(Ticket.class))).thenReturn(ticketMaj);

        TicketResponse response = kanbanService.revenirStatut("TKT-004");

        assertThat(response.getStatut()).isEqualTo(StatutTicket.IN_PROGRESS);

        ArgumentCaptor<Ticket> captor = ArgumentCaptor.forClass(Ticket.class);
        verify(ticketRepository).save(captor.capture());
        assertThat(captor.getValue().getStatut()).isEqualTo(StatutTicket.IN_PROGRESS);
    }
}