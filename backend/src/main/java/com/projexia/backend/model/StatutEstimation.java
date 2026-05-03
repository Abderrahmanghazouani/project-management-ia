package com.projexia.backend.model;



/**
 * StatutEstimation — États de l'estimation IA
 *
 * EN_ATTENTE → générée, client n'a pas encore décidé
 * CONFIRMEE  → client valide → déclenche M4
 * REJETEE    → client rejette → saisie manuelle
 */
public enum StatutEstimation {
    EN_ATTENTE,
    CONFIRMEE,
    REJETEE
}
