package com.projexia.backend.model;



/**
 * StatutProjet — États possibles d'un projet
 *
 * ACTIF    → projet en cours de développement
 * EN_PAUSE → projet temporairement suspendu
 * TERMINE  → projet livré et clôturé
 */
public enum StatutProjet {
    ACTIF,
    EN_PAUSE,
    TERMINE
}