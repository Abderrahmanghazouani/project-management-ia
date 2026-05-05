package com.projexia.backend.service;

import com.projexia.backend.dto.request.RiskRequest;
import com.projexia.backend.dto.response.RiskResponse;
import com.projexia.backend.model.Project;
import com.projexia.backend.model.Risk;
import com.projexia.backend.model.StatutRisque;
import com.projexia.backend.repository.ProjectRepository;
import com.projexia.backend.repository.RiskRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Year;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Transactional
public class RiskService {

    private final RiskRepository riskRepository;
    private final ProjectRepository projectRepository;

    // ─── Matrice criticité : probabilite x impact ─────────────────────────────
    // Probabilité : Faible=1, Moyenne=2, Elevee=3
    // Impact      : Faible=1, Moyen=2,  Eleve=3
    // Score ≤ 1 → Faible | 2 → Moyenne | 3-4 → Elevee | 6-9 → Critique
    private static final Map<String, Integer> SCORE_PROB = Map.of(
            "Faible", 1, "Moyenne", 2, "Elevee", 3
    );
    private static final Map<String, Integer> SCORE_IMPACT = Map.of(
            "Faible", 1, "Moyen", 2, "Eleve", 3
    );

    public String calculerCriticite(String probabilite, String impact) {
        int p = SCORE_PROB.getOrDefault(probabilite, 1);
        int i = SCORE_IMPACT.getOrDefault(impact, 1);
        int score = p * i;
        if (score >= 6) return "Critique";
        if (score >= 3) return "Elevee";
        if (score == 2) return "Moyenne";
        return "Faible";
    }

    // ─── Génération de référence : RSK-2025-001 ───────────────────────────────
    private String genererRef() {
        long count = riskRepository.count() + 1;
        return String.format("RSK-%d-%03d", Year.now().getValue(), count);
    }

    // ─── Créer un risque ──────────────────────────────────────────────────────
    public RiskResponse creerRisque(RiskRequest request) {
        Project projet = projectRepository.findById(request.getRefProjet())
                .orElseThrow(() -> new EntityNotFoundException(
                        "Projet introuvable : " + request.getRefProjet()));

        String criticite = calculerCriticite(request.getProbabilite(), request.getImpact());

        Risk risk = Risk.builder()
                .refRisque(genererRef())
                .description(request.getDescription())
                .probabilite(request.getProbabilite())
                .impact(request.getImpact())
                .criticite(criticite)
                .planMitigation(request.getPlanMitigation())
                .responsable(request.getResponsable())
                .statut(StatutRisque.IDENTIFIE)
                .projet(projet)
                .build();

        return RiskResponse.fromEntity(riskRepository.save(risk));
    }

    // ─── Lister les risques d'un projet (triés par criticité desc) ────────────
    @Transactional(readOnly = true)
    public List<RiskResponse> listerRisques(String refProjet) {
        if (!projectRepository.existsById(refProjet)) {
            throw new EntityNotFoundException("Projet introuvable : " + refProjet);
        }
        return riskRepository.findByProjetRefProjetOrderByCriticiteDesc(refProjet)
                .stream().map(RiskResponse::fromEntity).toList();
    }

    // ─── Modifier un risque ───────────────────────────────────────────────────
    public RiskResponse modifierRisque(String refRisque, RiskRequest request) {
        Risk risk = riskRepository.findById(refRisque)
                .orElseThrow(() -> new EntityNotFoundException(
                        "Risque introuvable : " + refRisque));

        risk.setDescription(request.getDescription());
        risk.setProbabilite(request.getProbabilite());
        risk.setImpact(request.getImpact());
        risk.setCriticite(calculerCriticite(request.getProbabilite(), request.getImpact()));
        risk.setPlanMitigation(request.getPlanMitigation());
        risk.setResponsable(request.getResponsable());

        return RiskResponse.fromEntity(riskRepository.save(risk));
    }

    // ─── Changer le statut d'un risque ───────────────────────────────────────
    public RiskResponse changerStatut(String refRisque, StatutRisque nouveauStatut) {
        Risk risk = riskRepository.findById(refRisque)
                .orElseThrow(() -> new EntityNotFoundException(
                        "Risque introuvable : " + refRisque));

        risk.setStatut(nouveauStatut);
        return RiskResponse.fromEntity(riskRepository.save(risk));
    }

    // ─── Supprimer un risque ──────────────────────────────────────────────────
    public void supprimerRisque(String refRisque) {
        if (!riskRepository.existsById(refRisque)) {
            throw new EntityNotFoundException("Risque introuvable : " + refRisque);
        }
        riskRepository.deleteById(refRisque);
    }
}