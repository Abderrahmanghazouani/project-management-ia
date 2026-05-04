package com.projexia.backend.unit;

import com.projexia.backend.dto.request.SprintRequest;
import com.projexia.backend.dto.response.SprintResponse;
import com.projexia.backend.model.*;
import com.projexia.backend.repository.ProjectRepository;
import com.projexia.backend.repository.SprintRepository;
import com.projexia.backend.repository.TicketRepository;
import com.projexia.backend.service.SprintService;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@DisplayName("Tests unitaires - SprintService")
class SprintServiceTest {

    @Mock private SprintRepository sprintRepository;
    @Mock private ProjectRepository projectRepository;
    @Mock private TicketRepository ticketRepository;

    @InjectMocks private SprintService sprintService;

    private Project projetMock;
    private Sprint sprintMock;
    private SprintRequest requestValide;

    @BeforeEach
    void setUp() {
        projetMock = new Project();
        projetMock.setRefProjet("PRJ-2025-001");

        sprintMock = Sprint.builder()
                .refSprint("SPR-2025-001")
                .nom("Sprint 1")
                .objectif("Mise en place de l'authentification")
                .dateDebut(LocalDate.of(2025, 6, 1))
                .dateFin(LocalDate.of(2025, 6, 14))
                .capacite(20)
                .statut(StatutSprint.A_VENIR)
                .dateCreation(LocalDateTime.now())
                .projet(projetMock)
                .build();

        requestValide = new SprintRequest();
        requestValide.setNom("Sprint 1");
        requestValide.setObjectif("Mise en place de l'authentification");
        requestValide.setDateDebut(LocalDate.of(2025, 6, 1));
        requestValide.setDateFin(LocalDate.of(2025, 6, 14));
        requestValide.setCapacite(20);
        requestValide.setRefProjet("PRJ-2025-001");
    }

    // ─── creerSprint ──────────────────────────────────────────────────────────

    @Test
    @DisplayName("creerSprint_Devrait_Succes")
    void creerSprint_Devrait_Succes() {
        when(projectRepository.findById("PRJ-2025-001")).thenReturn(Optional.of(projetMock));
        when(sprintRepository.count()).thenReturn(0L);
        when(sprintRepository.save(any(Sprint.class))).thenReturn(sprintMock);

        SprintResponse response = sprintService.creerSprint(requestValide);

        assertThat(response).isNotNull();
        assertThat(response.getNom()).isEqualTo("Sprint 1");
        assertThat(response.getStatut()).isEqualTo(StatutSprint.A_VENIR);
        assertThat(response.getRefProjet()).isEqualTo("PRJ-2025-001");

        verify(sprintRepository).save(any(Sprint.class));
    }

    @Test
    @DisplayName("creerSprint_Devrait_LancerException_DateFinAvantDateDebut")
    void creerSprint_Devrait_LancerException_DateFinAvantDateDebut() {
        requestValide.setDateFin(LocalDate.of(2025, 5, 1)); // antérieure au dateDebut

        assertThatThrownBy(() -> sprintService.creerSprint(requestValide))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessageContaining("date de fin");

        verify(sprintRepository, never()).save(any());
    }

    @Test
    @DisplayName("creerSprint_Devrait_LancerException_ProjetIntrouvable")
    void creerSprint_Devrait_LancerException_ProjetIntrouvable() {
        when(projectRepository.findById("PRJ-INCONNU")).thenReturn(Optional.empty());
        requestValide.setRefProjet("PRJ-INCONNU");

        assertThatThrownBy(() -> sprintService.creerSprint(requestValide))
                .isInstanceOf(EntityNotFoundException.class)
                .hasMessageContaining("PRJ-INCONNU");
    }

    // ─── listerSprints ────────────────────────────────────────────────────────

    @Test
    @DisplayName("listerSprints_Devrait_RetournerPage")
    void listerSprints_Devrait_RetournerPage() {
        var pageable = PageRequest.of(0, 20);
        var page = new PageImpl<>(List.of(sprintMock));

        when(projectRepository.existsById("PRJ-2025-001")).thenReturn(true);
        when(sprintRepository.findByProjetRefProjet("PRJ-2025-001", pageable)).thenReturn(page);

        Page<SprintResponse> result = sprintService.listerSprints("PRJ-2025-001", pageable);

        assertThat(result).isNotNull();
        assertThat(result.getTotalElements()).isEqualTo(1);
        assertThat(result.getContent().get(0).getNom()).isEqualTo("Sprint 1");
    }

    // ─── affecterTicket ───────────────────────────────────────────────────────

    @Test
    @DisplayName("affecterTicket_Devrait_Succes")
    void affecterTicket_Devrait_Succes() {
        Ticket ticketMock = Ticket.builder()
                .refTicket("TKT-2025-001")
                .titre("Implémentation JWT")
                .typeTicket(TypeTicket.TASK)
                .priorite(PrioriteTicket.HAUTE)
                .statut(StatutTicket.TO_DO)
                .storyPoints(3)
                .dateCreation(LocalDateTime.now())
                .projet(projetMock)
                .build();

        when(sprintRepository.findById("SPR-2025-001")).thenReturn(Optional.of(sprintMock));
        when(ticketRepository.findById("TKT-2025-001")).thenReturn(Optional.of(ticketMock));
        when(ticketRepository.save(any(Ticket.class))).thenReturn(ticketMock);

        SprintResponse response = sprintService.affecterTicket("SPR-2025-001", "TKT-2025-001");

        assertThat(response).isNotNull();
        assertThat(response.getRefSprint()).isEqualTo("SPR-2025-001");
        verify(ticketRepository).save(ticketMock);
    }

    @Test
    @DisplayName("affecterTicket_Devrait_LancerException_TicketIntrouvable")
    void affecterTicket_Devrait_LancerException_TicketIntrouvable() {
        when(sprintRepository.findById("SPR-2025-001")).thenReturn(Optional.of(sprintMock));
        when(ticketRepository.findById("TKT-INCONNU")).thenReturn(Optional.empty());

        assertThatThrownBy(() -> sprintService.affecterTicket("SPR-2025-001", "TKT-INCONNU"))
                .isInstanceOf(EntityNotFoundException.class)
                .hasMessageContaining("TKT-INCONNU");
    }

    // ─── changerStatut ────────────────────────────────────────────────────────

    @Test
    @DisplayName("changerStatut_A_VENIR_vers_ACTIF")
    void changerStatut_A_VENIR_vers_ACTIF() {
        sprintMock.setStatut(StatutSprint.A_VENIR);
        Sprint sprintActif = Sprint.builder()
                .refSprint("SPR-2025-001")
                .nom("Sprint 1")
                .dateDebut(sprintMock.getDateDebut())
                .dateFin(sprintMock.getDateFin())
                .capacite(20)
                .statut(StatutSprint.ACTIF)
                .dateCreation(LocalDateTime.now())
                .projet(projetMock)
                .build();

        when(sprintRepository.findById("SPR-2025-001")).thenReturn(Optional.of(sprintMock));
        when(sprintRepository.save(any(Sprint.class))).thenReturn(sprintActif);

        SprintResponse response = sprintService.changerStatut("SPR-2025-001", StatutSprint.ACTIF);

        assertThat(response.getStatut()).isEqualTo(StatutSprint.ACTIF);
        verify(sprintRepository).save(sprintMock);
    }

    @Test
    @DisplayName("changerStatut_ACTIF_vers_TERMINE")
    void changerStatut_ACTIF_vers_TERMINE() {
        sprintMock.setStatut(StatutSprint.ACTIF);
        Sprint sprintTermine = Sprint.builder()
                .refSprint("SPR-2025-001")
                .nom("Sprint 1")
                .dateDebut(sprintMock.getDateDebut())
                .dateFin(sprintMock.getDateFin())
                .capacite(20)
                .statut(StatutSprint.TERMINE)
                .dateCreation(LocalDateTime.now())
                .projet(projetMock)
                .build();

        when(sprintRepository.findById("SPR-2025-001")).thenReturn(Optional.of(sprintMock));
        when(sprintRepository.save(any(Sprint.class))).thenReturn(sprintTermine);

        SprintResponse response = sprintService.changerStatut("SPR-2025-001", StatutSprint.TERMINE);

        assertThat(response.getStatut()).isEqualTo(StatutSprint.TERMINE);
    }

    @Test
    @DisplayName("changerStatut_TERMINE_vers_ACTIF_Devrait_LancerException")
    void changerStatut_TERMINE_vers_ACTIF_Devrait_LancerException() {
        sprintMock.setStatut(StatutSprint.TERMINE);

        when(sprintRepository.findById("SPR-2025-001")).thenReturn(Optional.of(sprintMock));

        assertThatThrownBy(() -> sprintService.changerStatut("SPR-2025-001", StatutSprint.ACTIF))
                .isInstanceOf(IllegalStateException.class)
                .hasMessageContaining("Transition invalide");
    }
}