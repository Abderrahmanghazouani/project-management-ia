package com.projexia.backend.unit;


import com.projexia.backend.dto.request.CDCRequest;
import com.projexia.backend.dto.response.EstimationResponse;
import com.projexia.backend.dto.response.IATaskResponse;
import com.projexia.backend.model.*;
import com.projexia.backend.repository.*;
import com.projexia.backend.service.GeminiService;
import com.projexia.backend.service.IAEstimationService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@DisplayName("Tests unitaires — IAEstimationService")
class IAEstimationServiceTest {

    @Mock
    private GeminiService geminiService;

    @Mock
    private IAEstimationRepository estimationRepository;

    @Mock
    private IATaskRepository taskRepository;

    @Mock
    private ProjectRepository projectRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private IAEstimationService iaEstimationService;

    private CDCRequest cdcRequest;
    private Project projet;
    private User client;
    private IAEstimation estimationEnAttente;
    private EstimationResponse geminiResponse;

    @BeforeEach
    void setUp() {

        projet = Project.builder()
                .refProjet("PRJ-2025-001")
                .nom("Projet Test")
                .statut(StatutProjet.ACTIF)
                .build();

        client = User.builder()
                .matricule("CLT-2025-001")
                .nom("Ghazouani")
                .prenom("Abderrahman")
                .email("ghazouani@projexia.com")
                .role(Role.CLIENT)
                .actif(true)
                .build();

        cdcRequest = CDCRequest.builder()
                .texteCdc("Développer une plateforme " +
                        "de gestion de projets avec IA")
                .refProjet("PRJ-2025-001")
                .matriculeClient("CLT-2025-001")
                .build();

        estimationEnAttente = IAEstimation.builder()
                .refEstimation("EST-2025-001")
                .texteCdc(cdcRequest.getTexteCdc())
                .totalJours(14)
                .complexite("Moyenne")
                .risques("Dependance API|Delai serre")
                .statut(StatutEstimation.EN_ATTENTE)
                .projet(projet)
                .client(client)
                .build();

        geminiResponse = EstimationResponse.builder()
                .tasks(List.of(
                        IATaskResponse.builder()
                                .titre("Auth JWT")
                                .joursEstimes(3)
                                .build(),
                        IATaskResponse.builder()
                                .titre("Board Kanban")
                                .joursEstimes(4)
                                .build()
                ))
                .totalJours(14)
                .complexite("Moyenne")
                .risques(List.of(
                        "Dependance API Gemini",
                        "Delai serre equipe 3 personnes"))
                .manuel(false)
                .message("Analyse IA réussie !")
                .build();
    }

    // ═══════════════════════════════════════════
    // TESTS ANALYSER ET SAUVEGARDER
    // ═══════════════════════════════════════════

    @Test
    @DisplayName("Analyser CDC — succès avec Gemini")
    void analyserCDC_Devrait_Succes() {

        // GIVEN
        when(projectRepository.findById("PRJ-2025-001"))
                .thenReturn(Optional.of(projet));
        when(userRepository.findByMatricule("CLT-2025-001"))
                .thenReturn(Optional.of(client));
        when(geminiService.analyserCDC(anyString()))
                .thenReturn(geminiResponse);
        when(estimationRepository
                .save(any(IAEstimation.class)))
                .thenReturn(estimationEnAttente);
        when(taskRepository.findByEstimationRefEstimation(
                anyString()))
                .thenReturn(List.of());

        // WHEN
        EstimationResponse response =
                iaEstimationService
                        .analyserEtSauvegarder(cdcRequest);

        // THEN
        assertNotNull(response);
        assertFalse(response.isManuel());
        verify(geminiService, times(1))
                .analyserCDC(anyString());
        verify(estimationRepository, times(1))
                .save(any(IAEstimation.class));
    }

    @Test
    @DisplayName("Analyser CDC — fallback si Gemini indisponible")
    void analyserCDC_Devrait_Fallback_GeminiIndisponible() {

        // GIVEN
        EstimationResponse fallbackResponse =
                EstimationResponse.builder()
                        .tasks(List.of())
                        .totalJours(0)
                        .complexite("Inconnue")
                        .risques(List.of(
                                "Service IA indisponible"))
                        .manuel(true)
                        .message("Service IA indisponible.")
                        .build();

        when(projectRepository.findById(anyString()))
                .thenReturn(Optional.of(projet));
        when(userRepository.findByMatricule(anyString()))
                .thenReturn(Optional.of(client));
        when(geminiService.analyserCDC(anyString()))
                .thenReturn(fallbackResponse);
        when(estimationRepository
                .save(any(IAEstimation.class)))
                .thenReturn(estimationEnAttente);
        when(taskRepository.findByEstimationRefEstimation(
                anyString()))
                .thenReturn(List.of());

        // WHEN
        EstimationResponse response =
                iaEstimationService
                        .analyserEtSauvegarder(cdcRequest);

        // THEN
        assertNotNull(response);
        assertTrue(response.isManuel());
        assertEquals("Service IA indisponible. Saisie manuelle.",
                response.getMessage());
    }

    @Test
    @DisplayName("Analyser CDC — échec si projet introuvable")
    void analyserCDC_Devrait_LancerException_ProjetIntrouvable() {

        // GIVEN
        when(projectRepository.findById(anyString()))
                .thenReturn(Optional.empty());

        // WHEN + THEN
        assertThrows(
                RuntimeException.class,
                () -> iaEstimationService
                        .analyserEtSauvegarder(cdcRequest)
        );
        verify(geminiService, never())
                .analyserCDC(anyString());
    }

    // ═══════════════════════════════════════════
    // TESTS CONFIRMER
    // ═══════════════════════════════════════════

    @Test
    @DisplayName("Confirmer — statut passe à CONFIRMEE")
    void confirmer_Devrait_ChangerStatut_CONFIRMEE() {

        // GIVEN
        when(estimationRepository
                .findById("EST-2025-001"))
                .thenReturn(
                        Optional.of(estimationEnAttente));
        when(estimationRepository
                .save(any(IAEstimation.class)))
                .thenReturn(estimationEnAttente);
        when(taskRepository.findByEstimationRefEstimation(
                anyString()))
                .thenReturn(List.of());

        // WHEN
        EstimationResponse response =
                iaEstimationService
                        .confirmerEstimation("EST-2025-001");

        // THEN
        assertNotNull(response);
        verify(estimationRepository, times(1))
                .save(any(IAEstimation.class));
        assertEquals(StatutEstimation.CONFIRMEE,
                estimationEnAttente.getStatut());
    }

    @Test
    @DisplayName("Confirmer — échec si déjà confirmée")
    void confirmer_Devrait_LancerException_DejaConfirmee() {

        // GIVEN
        estimationEnAttente.setStatut(
                StatutEstimation.CONFIRMEE);
        when(estimationRepository
                .findById(anyString()))
                .thenReturn(
                        Optional.of(estimationEnAttente));

        // WHEN + THEN
        assertThrows(
                RuntimeException.class,
                () -> iaEstimationService
                        .confirmerEstimation("EST-2025-001")
        );
    }

    // ═══════════════════════════════════════════
    // TESTS REJETER
    // ═══════════════════════════════════════════

    @Test
    @DisplayName("Rejeter — statut passe à REJETEE")
    void rejeter_Devrait_ChangerStatut_REJETEE() {

        // GIVEN
        when(estimationRepository
                .findById("EST-2025-001"))
                .thenReturn(
                        Optional.of(estimationEnAttente));
        when(estimationRepository
                .save(any(IAEstimation.class)))
                .thenReturn(estimationEnAttente);
        when(taskRepository.findByEstimationRefEstimation(
                anyString()))
                .thenReturn(List.of());

        // WHEN
        EstimationResponse response =
                iaEstimationService
                        .rejeterEstimation("EST-2025-001");

        // THEN
        assertNotNull(response);
        assertEquals(StatutEstimation.REJETEE,
                estimationEnAttente.getStatut());
        verify(estimationRepository, times(1))
                .save(any(IAEstimation.class));
    }

    @Test
    @DisplayName("Historique — doit retourner les estimations")
    void historique_Devrait_RetournerListe() {

        // GIVEN
        when(estimationRepository
                .findByProjetRefProjet("PRJ-2025-001"))
                .thenReturn(
                        List.of(estimationEnAttente));
        when(taskRepository.findByEstimationRefEstimation(
                anyString()))
                .thenReturn(List.of());

        // WHEN
        var result = iaEstimationService
                .historique("PRJ-2025-001");

        // THEN
        assertNotNull(result);
        assertEquals(1, result.size());
    }
}