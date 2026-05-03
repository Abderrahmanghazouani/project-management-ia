package com.projexia.backend.service;



import com.projexia.backend.dto.request.ProjectRequest;
import com.projexia.backend.dto.response.ProjectResponse;
import com.projexia.backend.model.Project;
import com.projexia.backend.model.StatutProjet;
import com.projexia.backend.model.User;
import com.projexia.backend.repository.ProjectRepository;
import com.projexia.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Year;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * ProjectService — Logique métier des projets
 *
 * Principes appliqués :
 * 1. @Service      → Spring IOC
 * 2. @Transactional→ JTA — tout réussit ou tout échoue
 * 3. Pagination    → Page<T> + Pageable
 * 4. Validation    → règles métier (dates, nom unique)
 */
@Service
@RequiredArgsConstructor
@Transactional
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

    private static final AtomicInteger counter =
            new AtomicInteger(1);

    // ═══════════════════════════════════════════
    // CRÉER UN PROJET
    // ═══════════════════════════════════════════

    /**
     * Créer un nouveau projet
     *
     * Workflow :
     * 1. Vérifier que le nom n'existe pas déjà
     * 2. Vérifier que dateFin > dateDebut
     * 3. Charger le créateur depuis la BD
     * 4. Générer une référence unique
     * 5. Sauvegarder en BD
     */
    public ProjectResponse creerProjet(ProjectRequest req) {

        // Vérifier nom unique
        if (projectRepository.existsByNom(req.getNom())) {
            throw new RuntimeException(
                    "Un projet avec ce nom existe déjà : "
                            + req.getNom());
        }

        // Vérifier dates cohérentes
        if (req.getDateFin().isBefore(req.getDateDebut())) {
            throw new RuntimeException(
                    "La date de fin doit être après la date de début");
        }

        // Charger le créateur
        User createur = userRepository
                .findByMatricule(req.getMatriculeCreateur())
                .orElseThrow(() -> new RuntimeException(
                        "Créateur introuvable : "
                                + req.getMatriculeCreateur()));

        // Générer la référence
        String ref = genererRefProjet();

        // Construire et sauvegarder
        Project projet = Project.builder()
                .refProjet(ref)
                .nom(req.getNom())
                .description(req.getDescription())
                .dateDebut(req.getDateDebut())
                .dateFin(req.getDateFin())
                .budgetPrevu(req.getBudgetPrevu())
                .statut(req.getStatut() != null ?
                        req.getStatut() : StatutProjet.ACTIF)
                .createur(createur)
                .build();

        projectRepository.save(projet);

        return ProjectResponse.fromEntity(projet);
    }

    // ═══════════════════════════════════════════
    // LISTER LES PROJETS (avec pagination)
    // ═══════════════════════════════════════════

    /**
     * Lister tous les projets avec pagination
     * Pageable gère automatiquement LIMIT + OFFSET
     */
    @Transactional(readOnly = true)
    public Page<ProjectResponse> listerProjets(
            Pageable pageable) {
        return projectRepository
                .findAll(pageable)
                .map(ProjectResponse::fromEntity);
    }

    /**
     * Lister les projets filtrés par statut
     */
    @Transactional(readOnly = true)
    public Page<ProjectResponse> listerParStatut(
            StatutProjet statut,
            Pageable pageable) {
        return projectRepository
                .findByStatut(statut, pageable)
                .map(ProjectResponse::fromEntity);
    }

    /**
     * Rechercher des projets par nom
     */
    @Transactional(readOnly = true)
    public Page<ProjectResponse> rechercherParNom(
            String search,
            Pageable pageable) {
        return projectRepository
                .searchByNom(search, pageable)
                .map(ProjectResponse::fromEntity);
    }

    // ═══════════════════════════════════════════
    // CONSULTER UN PROJET
    // ═══════════════════════════════════════════

    @Transactional(readOnly = true)
    public ProjectResponse consulterProjet(String refProjet) {
        Project projet = projectRepository
                .findById(refProjet)
                .orElseThrow(() -> new RuntimeException(
                        "Projet introuvable : " + refProjet));
        return ProjectResponse.fromEntity(projet);
    }

    // ═══════════════════════════════════════════
    // MODIFIER UN PROJET
    // ═══════════════════════════════════════════

    public ProjectResponse modifierProjet(
            String refProjet,
            ProjectRequest req) {

        Project projet = projectRepository
                .findById(refProjet)
                .orElseThrow(() -> new RuntimeException(
                        "Projet introuvable : " + refProjet));

        // Vérifier nom unique (sauf pour ce projet)
        if (projectRepository.existsByNomAndRefProjetNot(
                req.getNom(), refProjet)) {
            throw new RuntimeException(
                    "Un autre projet avec ce nom existe déjà");
        }

        // Vérifier dates
        if (req.getDateFin().isBefore(req.getDateDebut())) {
            throw new RuntimeException(
                    "La date de fin doit être après la date de début");
        }

        // Mettre à jour les champs
        projet.setNom(req.getNom());
        projet.setDescription(req.getDescription());
        projet.setDateDebut(req.getDateDebut());
        projet.setDateFin(req.getDateFin());
        projet.setBudgetPrevu(req.getBudgetPrevu());
        if (req.getStatut() != null)
            projet.setStatut(req.getStatut());

        projectRepository.save(projet);

        return ProjectResponse.fromEntity(projet);
    }

    // ═══════════════════════════════════════════
    // CHANGER LE STATUT
    // ═══════════════════════════════════════════

    public ProjectResponse changerStatut(
            String refProjet,
            StatutProjet nouveauStatut) {

        Project projet = projectRepository
                .findById(refProjet)
                .orElseThrow(() -> new RuntimeException(
                        "Projet introuvable : " + refProjet));

        projet.setStatut(nouveauStatut);
        projectRepository.save(projet);

        return ProjectResponse.fromEntity(projet);
    }

    // ═══════════════════════════════════════════
    // UTILITAIRE — Générer référence
    // ═══════════════════════════════════════════

    /**
     * Générer une référence unique
     * Format : PRJ-2025-001
     */
    private String genererRefProjet() {
        int annee = Year.now().getValue();
        int numero = counter.getAndIncrement();
        return String.format("PRJ-%d-%03d", annee, numero);
    }
}