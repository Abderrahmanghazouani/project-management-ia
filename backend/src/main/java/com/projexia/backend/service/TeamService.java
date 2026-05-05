package com.projexia.backend.service;



import com.projexia.backend.dto.request.MemberRequest;
import com.projexia.backend.dto.response.DistributionResponse;
import com.projexia.backend.dto.response.MemberResponse;
import com.projexia.backend.model.*;
import com.projexia.backend.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Year;
import java.util.*;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;

/**
 * TeamService — Logique métier M4
 *
 * Principes appliqués :
 * 1. @Transactional → JTA tout réussit ou tout échoue
 * 2. Round-robin    → distribution équitable des tâches
 * 3. Spring IOC     → injection des dépendances
 */
@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class TeamService {

    private final ProjectMemberRepository memberRepository;
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;
    private final IATaskRepository iaTaskRepository;
    private final IAEstimationRepository estimationRepository;

    private static final AtomicInteger counter =
            new AtomicInteger(1);

    // ═══════════════════════════════════════════
    // AJOUTER UN MEMBRE
    // ═══════════════════════════════════════════

    /**
     * Ajouter un membre à un projet
     *
     * Workflow :
     * 1. Vérifier que le projet existe
     * 2. Vérifier que l'utilisateur existe
     * 3. Vérifier qu'il n'est pas déjà membre
     * 4. Créer et sauvegarder le membre
     */
    public MemberResponse ajouterMembre(
            String refProjet,
            MemberRequest request) {

        // Vérifier projet
        Project projet = projectRepository
                .findById(refProjet)
                .orElseThrow(() -> new RuntimeException(
                        "Projet introuvable : " + refProjet));

        // Vérifier utilisateur
        User user = userRepository
                .findByMatricule(request.getMatriculeUser())
                .orElseThrow(() -> new RuntimeException(
                        "Utilisateur introuvable : "
                                + request.getMatriculeUser()));

        // Vérifier doublon
        if (memberRepository
                .existsByProjetRefProjetAndUserMatricule(
                        refProjet,
                        request.getMatriculeUser())) {
            throw new RuntimeException(
                    "Cet utilisateur est déjà membre du projet");
        }

        // Générer référence
        String ref = genererRef();

        // Créer le membre
        ProjectMember member = ProjectMember.builder()
                .refMembre(ref)
                .roleProjet(request.getRoleProjet())
                .projet(projet)
                .user(user)
                .build();

        memberRepository.save(member);

        log.info("Membre ajouté : {} → projet {}",
                user.getMatricule(), refProjet);

        return MemberResponse.fromEntity(member);
    }

    // ═══════════════════════════════════════════
    // LISTER LES MEMBRES
    // ═══════════════════════════════════════════

    @Transactional(readOnly = true)
    public List<MemberResponse> listerMembres(
            String refProjet) {

        return memberRepository
                .findByProjetRefProjet(refProjet)
                .stream()
                .map(MemberResponse::fromEntity)
                .collect(Collectors.toList());
    }

    // ═══════════════════════════════════════════
    // SUPPRIMER UN MEMBRE
    // ═══════════════════════════════════════════

    public void supprimerMembre(String refMembre) {

        ProjectMember member = memberRepository
                .findById(refMembre)
                .orElseThrow(() -> new RuntimeException(
                        "Membre introuvable : " + refMembre));

        memberRepository.delete(member);
        log.info("Membre supprimé : {}", refMembre);
    }

    // ═══════════════════════════════════════════
    // DISTRIBUTION AUTOMATIQUE — ROUND ROBIN
    // ═══════════════════════════════════════════

    /**
     * Distribuer les tâches IA entre les membres
     * Algorithme Round-Robin :
     * Chaque tâche est assignée au membre suivant
     * dans la liste, de façon cyclique et équitable
     *
     * Ex: 3 membres, 6 tâches :
     * Tâche 1 → Membre A
     * Tâche 2 → Membre B
     * Tâche 3 → Membre C
     * Tâche 4 → Membre A
     * Tâche 5 → Membre B
     * Tâche 6 → Membre C
     */
    public DistributionResponse distribuerTaches(
            String refProjet,
            String refEstimation) {

        // Charger les membres du projet
        List<ProjectMember> membres = memberRepository
                .findByProjetRefProjet(refProjet);

        if (membres.isEmpty()) {
            throw new RuntimeException(
                    "Aucun membre dans ce projet. " +
                            "Ajoutez des membres avant de distribuer.");
        }

        // Charger les tâches de l'estimation
        List<IATask> taches = iaTaskRepository
                .findByEstimationRefEstimation(
                        refEstimation);

        if (taches.isEmpty()) {
            throw new RuntimeException(
                    "Aucune tâche à distribuer " +
                            "pour cette estimation.");
        }

        // ── Algorithme Round-Robin ─────────────
        Map<String, List<String>> distribution =
                new HashMap<>();

        // Initialiser la map pour chaque membre
        membres.forEach(m ->
                distribution.put(
                        m.getUser().getMatricule(),
                        new ArrayList<>()
                )
        );

        // Distribuer les tâches en round-robin
        int nbMembres = membres.size();
        for (int i = 0; i < taches.size(); i++) {
            // Index cyclique : 0, 1, 2, 0, 1, 2...
            int indexMembre = i % nbMembres;
            ProjectMember membre = membres.get(indexMembre);
            IATask tache = taches.get(i);

            distribution
                    .get(membre.getUser().getMatricule())
                    .add(tache.getTitre() +
                            " (" + tache.getJoursEstimes() + "j)");
        }

        log.info("Distribution round-robin : {} tâches → {} membres",
                taches.size(), nbMembres);

        return DistributionResponse.builder()
                .refProjet(refProjet)
                .totalTaches(taches.size())
                .totalMembres(nbMembres)
                .distribution(distribution)
                .message("Distribution équitable effectuée " +
                        "avec algorithme round-robin")
                .build();
    }

    // ═══════════════════════════════════════════
    // UTILITAIRE
    // ═══════════════════════════════════════════

    private String genererRef() {
        int annee = Year.now().getValue();
        int numero = counter.getAndIncrement();
        return String.format("MBR-%d-%03d",
                annee, numero);
    }
}