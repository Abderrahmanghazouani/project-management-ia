package com.projexia.backend.unit;

import com.projexia.backend.dto.request.TicketRequest;
import com.projexia.backend.dto.response.TicketResponse;
import com.projexia.backend.model.*;
import com.projexia.backend.repository.ProjectRepository;
import com.projexia.backend.repository.TicketRepository;
import com.projexia.backend.repository.UserRepository;
import com.projexia.backend.service.TicketService;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@DisplayName("Tests unitaires — TicketService")
class TicketServiceTest {

    @Mock private TicketRepository ticketRepository;
    @Mock private ProjectRepository projectRepository;
    @Mock private UserRepository userRepository;

    @InjectMocks private TicketService ticketService;

    private Project projetMock;
    private User userMock;
    private Ticket ticketMock;
    private TicketRequest requestValide;

    @BeforeEach
    void setUp() {
        projetMock = new Project();
        projetMock.setRefProjet("PRJ-2025-001");

        userMock = new User();
        userMock.setMatricule("USR-001");

        ticketMock = Ticket.builder()
                .refTicket("TKT-2025-001")
                .titre("Mettre en place l'auth JWT")
                .typeTicket(TypeTicket.TASK)
                .priorite(PrioriteTicket.HAUTE)
                .statut(StatutTicket.TO_DO)
                .storyPoints(3)
                .dateCreation(LocalDateTime.now())
                .projet(projetMock)
                .build();

        requestValide = new TicketRequest();
        requestValide.setTitre("Mettre en place l'auth JWT");
        requestValide.setTypeTicket(TypeTicket.TASK);
        requestValide.setPriorite(PrioriteTicket.HAUTE);
        requestValide.setStoryPoints(3);
        requestValide.setRefProjet("PRJ-2025-001");
    }

    // ─── creerTicket ──────────────────────────────────────────────────────────

    @Test
    @DisplayName("creerTicket_Devrait_Succes")
    void creerTicket_Devrait_Succes() {
        when(projectRepository.findById("PRJ-2025-001")).thenReturn(Optional.of(projetMock));
        when(ticketRepository.count()).thenReturn(0L);
        when(ticketRepository.save(any(Ticket.class))).thenReturn(ticketMock);

        TicketResponse response = ticketService.creerTicket(requestValide);

        assertThat(response).isNotNull();
        assertThat(response.getTitre()).isEqualTo("Mettre en place l'auth JWT");
        assertThat(response.getTypeTicket()).isEqualTo(TypeTicket.TASK);
        assertThat(response.getPriorite()).isEqualTo(PrioriteTicket.HAUTE);
        verify(ticketRepository, times(1)).save(any(Ticket.class));
    }

    @Test
    @DisplayName("creerTicket_Devrait_StatutInitial_TO_DO")
    void creerTicket_Devrait_StatutInitial_TO_DO() {
        when(projectRepository.findById("PRJ-2025-001")).thenReturn(Optional.of(projetMock));
        when(ticketRepository.count()).thenReturn(0L);
        when(ticketRepository.save(any(Ticket.class))).thenReturn(ticketMock);

        // Capturer l'entité passée au save pour vérifier le statut initial
        ArgumentCaptor<Ticket> captor = ArgumentCaptor.forClass(Ticket.class);
        ticketService.creerTicket(requestValide);

        verify(ticketRepository).save(captor.capture());
        assertThat(captor.getValue().getStatut()).isEqualTo(StatutTicket.TO_DO);
    }

    // ─── changerStatut ────────────────────────────────────────────────────────

    @Test
    @DisplayName("changerStatut_TO_DO_vers_IN_PROGRESS")
    void changerStatut_TO_DO_vers_IN_PROGRESS() {
        ticketMock.setStatut(StatutTicket.TO_DO);
        Ticket ticketMaj = Ticket.builder()
                .refTicket("TKT-2025-001")
                .titre(ticketMock.getTitre())
                .typeTicket(ticketMock.getTypeTicket())
                .priorite(ticketMock.getPriorite())
                .statut(StatutTicket.IN_PROGRESS)
                .storyPoints(ticketMock.getStoryPoints())
                .dateCreation(ticketMock.getDateCreation())
                .projet(projetMock)
                .build();

        when(ticketRepository.findById("TKT-2025-001")).thenReturn(Optional.of(ticketMock));
        when(ticketRepository.save(any(Ticket.class))).thenReturn(ticketMaj);

        TicketResponse response = ticketService.changerStatut("TKT-2025-001", StatutTicket.IN_PROGRESS);

        assertThat(response.getStatut()).isEqualTo(StatutTicket.IN_PROGRESS);
        verify(ticketRepository).save(any(Ticket.class));
    }

    @Test
    @DisplayName("changerStatut_IN_PROGRESS_vers_DONE")
    void changerStatut_IN_PROGRESS_vers_DONE() {
        ticketMock.setStatut(StatutTicket.IN_PROGRESS);
        Ticket ticketDone = Ticket.builder()
                .refTicket("TKT-2025-001")
                .titre(ticketMock.getTitre())
                .typeTicket(ticketMock.getTypeTicket())
                .priorite(ticketMock.getPriorite())
                .statut(StatutTicket.DONE)
                .storyPoints(ticketMock.getStoryPoints())
                .dateCreation(ticketMock.getDateCreation())
                .projet(projetMock)
                .build();

        when(ticketRepository.findById("TKT-2025-001")).thenReturn(Optional.of(ticketMock));
        when(ticketRepository.save(any(Ticket.class))).thenReturn(ticketDone);

        TicketResponse response = ticketService.changerStatut("TKT-2025-001", StatutTicket.DONE);

        assertThat(response.getStatut()).isEqualTo(StatutTicket.DONE);
    }

    // ─── listerBacklog ────────────────────────────────────────────────────────

    @Test
    @DisplayName("listerBacklog_Devrait_Paginer")
    void listerBacklog_Devrait_Paginer() {
        PageRequest pageable = PageRequest.of(0, 20);
        Page<Ticket> pageMock = new PageImpl<>(List.of(ticketMock), pageable, 1);

        when(projectRepository.existsById("PRJ-2025-001")).thenReturn(true);
        when(ticketRepository.findByProjetRefProjet("PRJ-2025-001", pageable))
                .thenReturn(pageMock);

        Page<TicketResponse> result = ticketService.listerBacklog("PRJ-2025-001", pageable);

        assertThat(result).isNotNull();
        assertThat(result.getTotalElements()).isEqualTo(1);
        assertThat(result.getContent()).hasSize(1);
        assertThat(result.getContent().get(0).getTitre())
                .isEqualTo("Mettre en place l'auth JWT");
    }

    // ─── consulterTicket ──────────────────────────────────────────────────────

    @Test
    @DisplayName("consulterTicket_Devrait_LancerException_Introuvable")
    void consulterTicket_Devrait_LancerException_Introuvable() {
        when(ticketRepository.findById("TKT-INEXISTANT")).thenReturn(Optional.empty());

        assertThatThrownBy(() -> ticketService.consulterTicket("TKT-INEXISTANT"))
                .isInstanceOf(EntityNotFoundException.class)
                .hasMessageContaining("TKT-INEXISTANT");
    }
}
