package com.projexia.backend.service;

import com.projexia.backend.dto.request.CostRequest;
import com.projexia.backend.dto.response.CostResponse;
import com.projexia.backend.model.CostTracking;
import com.projexia.backend.repository.CostTrackingRepository;
import com.projexia.backend.repository.ProjectRepository;
import com.projexia.backend.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.Year;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class CostTrackingService {

    private final CostTrackingRepository costTrackingRepository;
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

    // Compteur thread-safe pour la génération de référence
    private final AtomicLong counter = new AtomicLong(0L);

    // ─── Génération de référence : CST-2025-001 ───────────────────────────────
    private String genererRef() {
        long num = costTrackingRepository.count() + counter.incrementAndGet();
        return String.format("CST-%d-%03d", Year.now().getValue(), num);
    }

    // ─── Enregistrer un coût ──────────────────────────────────────────────────
    public CostResponse enregistrerCout(CostRequest request) {
        var projet = projectRepository.findById(request.getRefProjet())
                .orElseThrow(() -> new EntityNotFoundException(
                        "Projet introuvable : " + request.getRefProjet()));

        var enregistreur = userRepository.findById(request.getMatriculeEnregistre())
                .orElseThrow(() -> new EntityNotFoundException(
                        "Utilisateur introuvable : " + request.getMatriculeEnregistre()));

        var costTracking = CostTracking.builder()
                .refCout(genererRef())
                .budgetPrevu(request.getBudgetPrevu())
                .budgetReel(request.getBudgetReel())
                .commentaire(request.getCommentaire())
                .projet(projet)
                .enregistrePar(enregistreur)
                .build();

        CostTracking saved = costTrackingRepository.save(costTracking);

        // Mettre à jour le budget_reel dans la table projects
        projet.setBudgetReel(request.getBudgetReel());
        projectRepository.save(projet);

        return CostResponse.fromEntity(saved);
    }

    // ─── Lister l'historique des coûts d'un projet ────────────────────────────
    @Transactional(readOnly = true)
    public List<CostResponse> listerCouts(String refProjet) {
        if (!projectRepository.existsById(refProjet)) {
            throw new EntityNotFoundException("Projet introuvable : " + refProjet);
        }
        return costTrackingRepository.findByProjetRefProjet(refProjet)
                .stream()
                .map(CostResponse::fromEntity)
                .collect(Collectors.toList());
    }

    // ─── Dernier coût enregistré pour un projet ───────────────────────────────
    @Transactional(readOnly = true)
    public CostResponse dernierCout(String refProjet) {
        if (!projectRepository.existsById(refProjet)) {
            throw new EntityNotFoundException("Projet introuvable : " + refProjet);
        }
        return costTrackingRepository
                .findTopByProjetRefProjetOrderByDateEnregistrementDesc(refProjet)
                .map(CostResponse::fromEntity)
                .orElseThrow(() -> new EntityNotFoundException(
                        "Aucun coût enregistré pour le projet : " + refProjet));
    }

    // ─── Calculer l'écart total d'un projet ───────────────────────────────────
    @Transactional(readOnly = true)
    public BigDecimal calculerEcartTotal(String refProjet) {
        if (!projectRepository.existsById(refProjet)) {
            throw new EntityNotFoundException("Projet introuvable : " + refProjet);
        }
        return costTrackingRepository.calculerEcartTotal(refProjet);
    }
}