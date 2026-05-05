package com.projexia.backend.unit;

import com.projexia.backend.dto.request.DeliverableRequest;
import com.projexia.backend.dto.response.DeliverableResponse;
import com.projexia.backend.model.Deliverable;
import com.projexia.backend.model.Project;
import com.projexia.backend.model.StatutLivrable;
import com.projexia.backend.repository.DeliverableRepository;
import com.projexia.backend.repository.ProjectRepository;
import com.projexia.backend.service.DeliverableService;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@DisplayName("Tests unitaires — DeliverableService")
class DeliverableServiceTest {

    @Mock private DeliverableRepository deliverableRepository;
    @Mock private ProjectRepository projectRepository;

    @InjectMocks private DeliverableService deliverableService;

    private Project projetMock;
    private Deliverable livrableMock;
    private DeliverableRequest requestValide;

    @BeforeEach
    void setUp() {
        projetMock = new Project();
        projetMock.setRefProjet("PRJ-2025-001");

        livrableMock = Deliverable.builder()
                .refLivrable("LVR-2025-001")
                .nom("Documentation API Swagger")
                .datePrevue(LocalDate.now().plusDays(10))
                .statut(StatutLivrable.EN_ATTENTE)
                .dateCreation(LocalDateTime.now())
                .projet(projetMock)
                .build();

        requestValide = new DeliverableRequest();
        requestValide.setNom("Documentation API Swagger");
        requestValide.setDatePrevue(LocalDate.now().plusDays(10));
        requestValide.setRefProjet("PRJ-2025-001");
    }

    // ─── creerLivrable ────────────────────────────────────────────────────────

    @Test
    @DisplayName("creerLivrable_Devrait_Succes")
    void creerLivrable_Devrait_Succes() {
        when(projectRepository.findById("PRJ-2025-001")).thenReturn(Optional.of(projetMock));
        when(deliverableRepository.count()).thenReturn(0L);
        when(deliverableRepository.save(any(Deliverable.class))).thenReturn(livrableMock);

        DeliverableResponse response = deliverableService.creerLivrable(requestValide);

        assertThat(response).isNotNull();
        assertThat(response.getNom()).isEqualTo("Documentation API Swagger");
        assertThat(response.getStatut()).isEqualTo(StatutLivrable.EN_ATTENTE);
        verify(deliverableRepository).save(any(Deliverable.class));
    }

    @Test
    @DisplayName("creerLivrable_Devrait_StatutEnRetard_SiDateDepassee")
    void creerLivrable_Devrait_StatutEnRetard_SiDateDepassee() {
        // Date dans le passé → doit générer EN_RETARD automatiquement
        requestValide.setDatePrevue(LocalDate.now().minusDays(5));

        Deliverable livrableRetard = Deliverable.builder()
                .refLivrable("LVR-2025-002")
                .nom("Documentation API Swagger")
                .datePrevue(LocalDate.now().minusDays(5))
                .statut(StatutLivrable.EN_RETARD)
                .dateCreation(LocalDateTime.now())
                .projet(projetMock)
                .build();

        when(projectRepository.findById("PRJ-2025-001")).thenReturn(Optional.of(projetMock));
        when(deliverableRepository.count()).thenReturn(1L);
        when(deliverableRepository.save(any(Deliverable.class))).thenReturn(livrableRetard);

        // Capturer l'entité réellement passée au save
        ArgumentCaptor<Deliverable> captor = ArgumentCaptor.forClass(Deliverable.class);
        deliverableService.creerLivrable(requestValide);

        verify(deliverableRepository).save(captor.capture());
        assertThat(captor.getValue().getStatut()).isEqualTo(StatutLivrable.EN_RETARD);
    }

    // ─── listerLivrables ──────────────────────────────────────────────────────

    @Test
    @DisplayName("listerLivrables_Devrait_RetournerListe")
    void listerLivrables_Devrait_RetournerListe() {
        Deliverable livrable2 = Deliverable.builder()
                .refLivrable("LVR-2025-002")
                .nom("Rapport de tests JUnit")
                .datePrevue(LocalDate.now().plusDays(20))
                .statut(StatutLivrable.EN_ATTENTE)
                .dateCreation(LocalDateTime.now())
                .projet(projetMock)
                .build();

        when(projectRepository.existsById("PRJ-2025-001")).thenReturn(true);
        when(deliverableRepository.findByProjetRefProjet("PRJ-2025-001"))
                .thenReturn(List.of(livrableMock, livrable2));

        List<DeliverableResponse> result = deliverableService.listerLivrables("PRJ-2025-001");

        assertThat(result).hasSize(2);
        assertThat(result.get(0).getRefLivrable()).isEqualTo("LVR-2025-001");
        assertThat(result.get(1).getNom()).isEqualTo("Rapport de tests JUnit");
    }

    // ─── marquerComme ─────────────────────────────────────────────────────────

    @Test
    @DisplayName("marquerComme_EN_ATTENTE_vers_LIVRE")
    void marquerComme_EN_ATTENTE_vers_LIVRE() {
        livrableMock.setStatut(StatutLivrable.EN_ATTENTE);
        Deliverable livrableLivre = Deliverable.builder()
                .refLivrable("LVR-2025-001")
                .nom(livrableMock.getNom())
                .datePrevue(livrableMock.getDatePrevue())
                .statut(StatutLivrable.LIVRE)
                .dateCreation(livrableMock.getDateCreation())
                .projet(projetMock)
                .build();

        when(deliverableRepository.findById("LVR-2025-001")).thenReturn(Optional.of(livrableMock));
        when(deliverableRepository.save(any(Deliverable.class))).thenReturn(livrableLivre);

        DeliverableResponse response = deliverableService.marquerComme(
                "LVR-2025-001", StatutLivrable.LIVRE);

        assertThat(response.getStatut()).isEqualTo(StatutLivrable.LIVRE);

        ArgumentCaptor<Deliverable> captor = ArgumentCaptor.forClass(Deliverable.class);
        verify(deliverableRepository).save(captor.capture());
        assertThat(captor.getValue().getStatut()).isEqualTo(StatutLivrable.LIVRE);
    }

    @Test
    @DisplayName("marquerComme_LIVRE_Devrait_Succes")
    void marquerComme_LIVRE_Devrait_Succes() {
        livrableMock.setStatut(StatutLivrable.EN_RETARD);
        Deliverable livrableLivre = Deliverable.builder()
                .refLivrable("LVR-2025-001")
                .nom(livrableMock.getNom())
                .datePrevue(livrableMock.getDatePrevue())
                .statut(StatutLivrable.LIVRE)
                .dateCreation(livrableMock.getDateCreation())
                .projet(projetMock)
                .build();

        when(deliverableRepository.findById("LVR-2025-001")).thenReturn(Optional.of(livrableMock));
        when(deliverableRepository.save(any(Deliverable.class))).thenReturn(livrableLivre);

        // Un livrable EN_RETARD peut quand même être marqué LIVRE
        DeliverableResponse response = deliverableService.marquerComme(
                "LVR-2025-001", StatutLivrable.LIVRE);

        assertThat(response.getStatut()).isEqualTo(StatutLivrable.LIVRE);
    }

    // ─── modifierLivrable ─────────────────────────────────────────────────────

    @Test
    @DisplayName("modifierLivrable_Devrait_Succes")
    void modifierLivrable_Devrait_Succes() {
        DeliverableRequest requestModif = new DeliverableRequest();
        requestModif.setNom("Documentation API Swagger — v2");
        requestModif.setDatePrevue(LocalDate.now().plusDays(15));
        requestModif.setLienFichier("https://docs.projexia.ma/swagger");
        requestModif.setRefProjet("PRJ-2025-001");

        Deliverable livrableModif = Deliverable.builder()
                .refLivrable("LVR-2025-001")
                .nom("Documentation API Swagger — v2")
                .datePrevue(LocalDate.now().plusDays(15))
                .lienFichier("https://docs.projexia.ma/swagger")
                .statut(StatutLivrable.EN_ATTENTE)
                .dateCreation(livrableMock.getDateCreation())
                .projet(projetMock)
                .build();

        when(deliverableRepository.findById("LVR-2025-001")).thenReturn(Optional.of(livrableMock));
        when(deliverableRepository.save(any(Deliverable.class))).thenReturn(livrableModif);

        DeliverableResponse response = deliverableService.modifierLivrable(
                "LVR-2025-001", requestModif);

        assertThat(response.getNom()).isEqualTo("Documentation API Swagger — v2");
        assertThat(response.getLienFichier()).isEqualTo("https://docs.projexia.ma/swagger");
    }

    @Test
    @DisplayName("modifierLivrable_Devrait_LancerException_Introuvable")
    void modifierLivrable_Devrait_LancerException_Introuvable() {
        when(deliverableRepository.findById("LVR-INEXISTANT")).thenReturn(Optional.empty());

        assertThatThrownBy(() -> deliverableService.modifierLivrable("LVR-INEXISTANT", requestValide))
                .isInstanceOf(EntityNotFoundException.class)
                .hasMessageContaining("LVR-INEXISTANT");
    }
}