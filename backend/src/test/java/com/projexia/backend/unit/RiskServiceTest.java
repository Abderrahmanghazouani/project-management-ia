package com.projexia.backend.unit;

import com.projexia.backend.dto.request.RiskRequest;
import com.projexia.backend.dto.response.RiskResponse;
import com.projexia.backend.model.Project;
import com.projexia.backend.model.Risk;
import com.projexia.backend.model.StatutRisque;
import com.projexia.backend.repository.ProjectRepository;
import com.projexia.backend.repository.RiskRepository;
import com.projexia.backend.service.RiskService;
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
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@DisplayName("Tests unitaires — RiskService")
class RiskServiceTest {

    @Mock private RiskRepository riskRepository;
    @Mock private ProjectRepository projectRepository;

    @InjectMocks private RiskService riskService;

    private Project projetMock;
    private Risk riskMock;
    private RiskRequest requestValide;

    @BeforeEach
    void setUp() {
        projetMock = new Project();
        projetMock.setRefProjet("PRJ-2025-001");

        riskMock = Risk.builder()
                .refRisque("RSK-2025-001")
                .description("Indisponibilité API Gemini")
                .probabilite("Faible")
                .impact("Eleve")
                .criticite("Elevee")
                .planMitigation("Mode dégradé + saisie manuelle")
                .responsable("Yassine")
                .statut(StatutRisque.IDENTIFIE)
                .dateCreation(LocalDateTime.now())
                .projet(projetMock)
                .build();

        requestValide = new RiskRequest();
        requestValide.setDescription("Indisponibilité API Gemini");
        requestValide.setProbabilite("Faible");
        requestValide.setImpact("Eleve");
        requestValide.setCriticite("Elevee");
        requestValide.setPlanMitigation("Mode dégradé + saisie manuelle");
        requestValide.setResponsable("Yassine");
        requestValide.setRefProjet("PRJ-2025-001");
    }

    // ─── creerRisque ──────────────────────────────────────────────────────────

    @Test
    @DisplayName("creerRisque_Devrait_Succes")
    void creerRisque_Devrait_Succes() {
        when(projectRepository.findById("PRJ-2025-001")).thenReturn(Optional.of(projetMock));
        when(riskRepository.count()).thenReturn(0L);
        when(riskRepository.save(any(Risk.class))).thenReturn(riskMock);

        RiskResponse response = riskService.creerRisque(requestValide);

        assertThat(response).isNotNull();
        assertThat(response.getDescription()).isEqualTo("Indisponibilité API Gemini");
        assertThat(response.getStatut()).isEqualTo(StatutRisque.IDENTIFIE);

        // Vérifier que la criticité a été calculée automatiquement
        ArgumentCaptor<Risk> captor = ArgumentCaptor.forClass(Risk.class);
        verify(riskRepository).save(captor.capture());
        assertThat(captor.getValue().getCriticite()).isNotNull().isNotBlank();
    }

    @Test
    @DisplayName("creerRisque_Devrait_LancerException_ProjetIntrouvable")
    void creerRisque_Devrait_LancerException_ProjetIntrouvable() {
        when(projectRepository.findById("PRJ-INEXISTANT")).thenReturn(Optional.empty());
        requestValide.setRefProjet("PRJ-INEXISTANT");

        assertThatThrownBy(() -> riskService.creerRisque(requestValide))
                .isInstanceOf(EntityNotFoundException.class)
                .hasMessageContaining("PRJ-INEXISTANT");

        verify(riskRepository, never()).save(any());
    }

    // ─── listerRisques ────────────────────────────────────────────────────────

    @Test
    @DisplayName("listerRisques_Devrait_RetournerListe")
    void listerRisques_Devrait_RetournerListe() {
        Risk riskCritique = Risk.builder()
                .refRisque("RSK-2025-002")
                .description("Dépassement planning")
                .probabilite("Elevee")
                .impact("Eleve")
                .criticite("Critique")
                .statut(StatutRisque.EN_COURS)
                .dateCreation(LocalDateTime.now())
                .projet(projetMock)
                .build();

        when(projectRepository.existsById("PRJ-2025-001")).thenReturn(true);
        when(riskRepository.findByProjetRefProjetOrderByCriticiteDesc("PRJ-2025-001"))
                .thenReturn(List.of(riskCritique, riskMock));

        List<RiskResponse> result = riskService.listerRisques("PRJ-2025-001");

        assertThat(result).hasSize(2);
        assertThat(result.get(0).getRefRisque()).isEqualTo("RSK-2025-002");
    }

    // ─── changerStatut ────────────────────────────────────────────────────────

    @Test
    @DisplayName("changerStatut_IDENTIFIE_vers_EN_COURS")
    void changerStatut_IDENTIFIE_vers_EN_COURS() {
        riskMock.setStatut(StatutRisque.IDENTIFIE);
        Risk riskMaj = Risk.builder()
                .refRisque("RSK-2025-001")
                .description(riskMock.getDescription())
                .probabilite(riskMock.getProbabilite())
                .impact(riskMock.getImpact())
                .criticite(riskMock.getCriticite())
                .statut(StatutRisque.EN_COURS)
                .dateCreation(riskMock.getDateCreation())
                .projet(projetMock)
                .build();

        when(riskRepository.findById("RSK-2025-001")).thenReturn(Optional.of(riskMock));
        when(riskRepository.save(any(Risk.class))).thenReturn(riskMaj);

        RiskResponse response = riskService.changerStatut("RSK-2025-001", StatutRisque.EN_COURS);

        assertThat(response.getStatut()).isEqualTo(StatutRisque.EN_COURS);

        ArgumentCaptor<Risk> captor = ArgumentCaptor.forClass(Risk.class);
        verify(riskRepository).save(captor.capture());
        assertThat(captor.getValue().getStatut()).isEqualTo(StatutRisque.EN_COURS);
    }

    @Test
    @DisplayName("changerStatut_EN_COURS_vers_MITIGE")
    void changerStatut_EN_COURS_vers_MITIGE() {
        riskMock.setStatut(StatutRisque.EN_COURS);
        Risk riskMaj = Risk.builder()
                .refRisque("RSK-2025-001")
                .description(riskMock.getDescription())
                .probabilite(riskMock.getProbabilite())
                .impact(riskMock.getImpact())
                .criticite(riskMock.getCriticite())
                .statut(StatutRisque.MITIGE)
                .dateCreation(riskMock.getDateCreation())
                .projet(projetMock)
                .build();

        when(riskRepository.findById("RSK-2025-001")).thenReturn(Optional.of(riskMock));
        when(riskRepository.save(any(Risk.class))).thenReturn(riskMaj);

        RiskResponse response = riskService.changerStatut("RSK-2025-001", StatutRisque.MITIGE);

        assertThat(response.getStatut()).isEqualTo(StatutRisque.MITIGE);
    }

    @Test
    @DisplayName("changerStatut_MITIGE_vers_CLOS")
    void changerStatut_MITIGE_vers_CLOS() {
        riskMock.setStatut(StatutRisque.MITIGE);
        Risk riskClos = Risk.builder()
                .refRisque("RSK-2025-001")
                .description(riskMock.getDescription())
                .probabilite(riskMock.getProbabilite())
                .impact(riskMock.getImpact())
                .criticite(riskMock.getCriticite())
                .statut(StatutRisque.CLOS)
                .dateCreation(riskMock.getDateCreation())
                .projet(projetMock)
                .build();

        when(riskRepository.findById("RSK-2025-001")).thenReturn(Optional.of(riskMock));
        when(riskRepository.save(any(Risk.class))).thenReturn(riskClos);

        RiskResponse response = riskService.changerStatut("RSK-2025-001", StatutRisque.CLOS);

        assertThat(response.getStatut()).isEqualTo(StatutRisque.CLOS);
    }

    // ─── Tests de la matrice criticité (méthode package-private) ─────────────

    @Test
    @DisplayName("calculerCriticite_EleveeXEleve_Devrait_EtreCritique")
    void calculerCriticite_EleveeXEleve_Devrait_EtreCritique() {
        assertThat(riskService.calculerCriticite("Elevee", "Eleve")).isEqualTo("Critique");
    }

    @Test
    @DisplayName("calculerCriticite_FaibleXFaible_Devrait_EtreFaible")
    void calculerCriticite_FaibleXFaible_Devrait_EtreFaible() {
        assertThat(riskService.calculerCriticite("Faible", "Faible")).isEqualTo("Faible");
    }
}
