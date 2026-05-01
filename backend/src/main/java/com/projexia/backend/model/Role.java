package com.projexia.backend.model;



/**
 * Enumération des rôles utilisateurs
 *
 * Principe RBAC : chaque rôle a des droits différents
 * ADMIN     → accès total
 * MANAGER   → gestion projets et équipes
 * DEVELOPER → mise à jour de ses tickets
 * CLIENT    → soumission CDC et suivi
 */
public enum Role {
    ADMIN,
    MANAGER,
    DEVELOPER,
    CLIENT
}
