package com.projexia.backend.unit;



import com.projexia.backend.dto.request.MemberRequest;
import com.projexia.backend.dto.response.DistributionResponse;
import com.projexia.backend.dto.response.MemberResponse;
import com.projexia.backend.model.*;
import com.projexia.backend.repository.*;
import com.projexia.backend.service.TeamService;
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
@DisplayName("Tests unitaires — TeamService")
class TeamServiceTest {

    @Mock
    private ProjectMemberRepository memberRepository;

    @Mock
    private ProjectRepository projectRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private IATaskRepository iaTaskRepository;

    @Mock
    private IAEstimationRepository estimationRepository;

    @InjectMocks
    private TeamService teamService;

    private Project projet;
    private User user;
    private ProjectMember member;
    private MemberRequest memberRequest;

    @BeforeEach
    void setUp() {
        projet = Project.builder()
                .refProjet("PRJ-2025-001")
                .nom("Projexia Platform")
                .statut(StatutProjet.ACTIF)
                .build();

        user = User.builder()
                .matricule("DEV-2025-001")
                .nom("Essaoudi")
                .prenom("Soufiane")
                .email("soufiane@projexia.com")
                .role(Role.DEVELOPER)
                .actif(true)
                .build();

        member = ProjectMember.builder()
                .refMembre("MBR-2025-001")
                .roleProjet("Fullstack")
                .projet(projet)
                .user(user)
                .build();

        memberRequest = MemberRequest.builder()
                .matriculeUser("DEV-2025-001")
                .roleProjet("Fullstack")
                .build();
    }

    // ═══════════════════════════════════════════
    // TESTS AJOUTER MEMBRE
    // ═══════════════════════════════════════════

    @Test
    @DisplayName("Ajouter membre — succès")
    void ajouterMembre_Devrait_Succes() {

        // GIVEN
        when(projectRepository.findById("PRJ-2025-001"))
                .thenReturn(Optional.of(projet));
        when(userRepository.findByMatricule("DEV-2025-001"))
                .thenReturn(Optional.of(user));
        when(memberRepository
                .existsByProjetRefProjetAndUserMatricule(
                        anyString(), anyString()))
                .thenReturn(false);
        when(memberRepository.save(any(ProjectMember.class)))
                .thenReturn(member);

        // WHEN
        MemberResponse response = teamService
                .ajouterMembre("PRJ-2025-001", memberRequest);

        // THEN
        assertNotNull(response);
        assertEquals("Fullstack", response.getRoleProjet());
        verify(memberRepository, times(1))
                .save(any(ProjectMember.class));
    }

    @Test
    @DisplayName("Ajouter membre — échec si projet introuvable")
    void ajouterMembre_Devrait_LancerException_ProjetIntrouvable() {

        // GIVEN
        when(projectRepository.findById(anyString()))
                .thenReturn(Optional.empty());

        // WHEN + THEN
        assertThrows(
                RuntimeException.class,
                () -> teamService.ajouterMembre(
                        "PRJ-INCONNU", memberRequest)
        );
        verify(memberRepository, never())
                .save(any(ProjectMember.class));
    }

    @Test
    @DisplayName("Ajouter membre — échec si déjà membre")
    void ajouterMembre_Devrait_LancerException_DejaMembre() {

        // GIVEN
        when(projectRepository.findById(anyString()))
                .thenReturn(Optional.of(projet));
        when(userRepository.findByMatricule(anyString()))
                .thenReturn(Optional.of(user));
        when(memberRepository
                .existsByProjetRefProjetAndUserMatricule(
                        anyString(), anyString()))
                .thenReturn(true);

        // WHEN + THEN
        assertThrows(
                RuntimeException.class,
                () -> teamService.ajouterMembre(
                        "PRJ-2025-001", memberRequest)
        );
        verify(memberRepository, never())
                .save(any(ProjectMember.class));
    }

    // ═══════════════════════════════════════════
    // TESTS LISTER MEMBRES
    // ═══════════════════════════════════════════

    @Test
    @DisplayName("Lister membres — doit retourner la liste")
    void listerMembres_Devrait_RetournerListe() {

        // GIVEN
        when(memberRepository.findByProjetRefProjet(
                "PRJ-2025-001"))
                .thenReturn(List.of(member));

        // WHEN
        List<MemberResponse> result = teamService
                .listerMembres("PRJ-2025-001");

        // THEN
        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("MBR-2025-001",
                result.get(0).getRefMembre());
    }

    // ═══════════════════════════════════════════
    // TESTS DISTRIBUTION ROUND-ROBIN
    // ═══════════════════════════════════════════

    @Test
    @DisplayName("Distribution — répartir équitablement")
    void distribuer_Devrait_RepartirEquitablement() {

        // GIVEN
        User user2 = User.builder()
                .matricule("DEV-2025-002")
                .nom("Abderrazik")
                .prenom("Yassine")
                .role(Role.DEVELOPER)
                .actif(true)
                .build();

        ProjectMember member2 = ProjectMember.builder()
                .refMembre("MBR-2025-002")
                .roleProjet("Backend")
                .projet(projet)
                .user(user2)
                .build();

        IAEstimation estimation = IAEstimation.builder()
                .refEstimation("EST-2025-001")
                .statut(StatutEstimation.CONFIRMEE)
                .build();

        IATask task1 = IATask.builder()
                .refTacheIa("EST-2025-001-T1")
                .titre("Auth JWT")
                .joursEstimes(3)
                .estimation(estimation)
                .build();

        IATask task2 = IATask.builder()
                .refTacheIa("EST-2025-001-T2")
                .titre("Kanban Board")
                .joursEstimes(4)
                .estimation(estimation)
                .build();

        IATask task3 = IATask.builder()
                .refTacheIa("EST-2025-001-T3")
                .titre("Gemini API")
                .joursEstimes(5)
                .estimation(estimation)
                .build();

        IATask task4 = IATask.builder()
                .refTacheIa("EST-2025-001-T4")
                .titre("CRUD Projets")
                .joursEstimes(2)
                .estimation(estimation)
                .build();

        when(memberRepository.findByProjetRefProjet(
                "PRJ-2025-001"))
                .thenReturn(List.of(member, member2));

        when(iaTaskRepository
                .findByEstimationRefEstimation(
                        "EST-2025-001"))
                .thenReturn(List.of(
                        task1, task2, task3, task4));

        // WHEN
        DistributionResponse response =
                teamService.distribuerTaches(
                        "PRJ-2025-001", "EST-2025-001");

        // THEN
        assertNotNull(response);
        assertEquals(4, response.getTotalTaches());
        assertEquals(2, response.getTotalMembres());

        // Chaque membre doit avoir 2 tâches (4/2 = 2)
        assertEquals(2, response.getDistribution()
                .get("DEV-2025-001").size());
        assertEquals(2, response.getDistribution()
                .get("DEV-2025-002").size());
    }

    @Test
    @DisplayName("Distribution — échec si pas de membres")
    void distribuer_Devrait_LancerException_PasDeMembres() {

        // GIVEN
        when(memberRepository.findByProjetRefProjet(
                anyString()))
                .thenReturn(List.of());

        // WHEN + THEN
        assertThrows(
                RuntimeException.class,
                () -> teamService.distribuerTaches(
                        "PRJ-2025-001", "EST-2025-001")
        );
    }

    @Test
    @DisplayName("Distribution — échec si pas de tâches")
    void distribuer_Devrait_LancerException_PasDeTaches() {

        // GIVEN
        when(memberRepository.findByProjetRefProjet(
                anyString()))
                .thenReturn(List.of(member));
        when(iaTaskRepository
                .findByEstimationRefEstimation(anyString()))
                .thenReturn(List.of());

        // WHEN + THEN
        assertThrows(
                RuntimeException.class,
                () -> teamService.distribuerTaches(
                        "PRJ-2025-001", "EST-2025-001")
        );
    }
}
