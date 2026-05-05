package com.projexia.backend.service;


import com.projexia.backend.dto.request.UpdateRoleRequest;
import com.projexia.backend.dto.response.UserResponse;
import com.projexia.backend.model.Role;
import com.projexia.backend.model.User;
import com.projexia.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * AdminService — Logique métier Administration M12
 *
 * Principes appliqués :
 * 1. @Service      → Spring IOC
 * 2. @Transactional→ JTA
 * 3. RBAC          → seul ADMIN peut accéder
 * 4. Pagination    → liste paginée des utilisateurs
 */
@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class AdminService {

    private final UserRepository userRepository;

    // ═══════════════════════════════════════════
    // LISTER LES UTILISATEURS
    // ═══════════════════════════════════════════

    @Transactional(readOnly = true)
    public Page<UserResponse> listerUtilisateurs(
            Pageable pageable) {

        return userRepository
                .findAll(pageable)
                .map(UserResponse::fromEntity);
    }

    // ═══════════════════════════════════════════
    // LISTER PAR RÔLE
    // ═══════════════════════════════════════════

    @Transactional(readOnly = true)
    public Page<UserResponse> listerParRole(
            Role role,
            Pageable pageable) {

        return userRepository
                .findByRole(role, pageable)
                .map(UserResponse::fromEntity);
    }

    // ═══════════════════════════════════════════
    // CONSULTER UN UTILISATEUR
    // ═══════════════════════════════════════════

    @Transactional(readOnly = true)
    public UserResponse consulterUtilisateur(
            String matricule) {

        User user = userRepository
                .findByMatricule(matricule)
                .orElseThrow(() -> new RuntimeException(
                        "Utilisateur introuvable : "
                                + matricule));

        return UserResponse.fromEntity(user);
    }

    // ═══════════════════════════════════════════
    // MODIFIER LE RÔLE
    // ═══════════════════════════════════════════

    public UserResponse modifierRole(
            String matricule,
            UpdateRoleRequest request) {

        User user = userRepository
                .findByMatricule(matricule)
                .orElseThrow(() -> new RuntimeException(
                        "Utilisateur introuvable : "
                                + matricule));

        Role ancienRole = user.getRole();
        user.setRole(request.getRole());
        userRepository.save(user);

        log.info("Rôle modifié : {} → {} → {}",
                matricule, ancienRole, request.getRole());

        return UserResponse.fromEntity(user);
    }

    // ═══════════════════════════════════════════
    // ACTIVER / DÉSACTIVER UN COMPTE
    // ═══════════════════════════════════════════

    public UserResponse toggleActif(String matricule) {

        User user = userRepository
                .findByMatricule(matricule)
                .orElseThrow(() -> new RuntimeException(
                        "Utilisateur introuvable : "
                                + matricule));

        boolean nouvelEtat = !user.getActif();
        user.setActif(nouvelEtat);
        userRepository.save(user);

        log.info("Compte {} : actif = {}",
                matricule, nouvelEtat);

        return UserResponse.fromEntity(user);
    }

    // ═══════════════════════════════════════════
    // STATISTIQUES
    // ═══════════════════════════════════════════

    @Transactional(readOnly = true)
    public long compterParRole(Role role) {
        return userRepository
                .findByRole(role,
                        Pageable.unpaged())
                .getTotalElements();
    }
}
