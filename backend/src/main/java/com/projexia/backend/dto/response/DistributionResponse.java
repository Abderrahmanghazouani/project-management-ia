package com.projexia.backend.dto.response;


import lombok.*;
import java.util.List;
import java.util.Map;

/**
 * DistributionResponse — Résultat de la distribution
 * automatique des tâches (algorithme round-robin)
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DistributionResponse {

    private String refProjet;
    private int totalTaches;
    private int totalMembres;

    // Map : matricule → liste de tâches assignées
    private Map<String, List<String>> distribution;

    private String message;
}
