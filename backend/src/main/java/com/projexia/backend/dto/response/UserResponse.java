package com.projexia.backend.dto.response;



import com.projexia.backend.model.Role;
import com.projexia.backend.model.User;
import lombok.*;

import java.time.LocalDateTime;

/**
 * UserResponse — données d'un utilisateur
 * retournées dans les listes et fiches
 *
 * Utilisé par :
 * - GET /api/admin/users (liste des utilisateurs)
 * - GET /api/users/me (profil de l'utilisateur connecté)
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserResponse {

    private String matricule;
    private String nom;
    private String prenom;
    private String email;
    private Role role;
    private Boolean actif;
    private LocalDateTime dateCreation;

    /**
     * Méthode statique de conversion
     * User (entité) → UserResponse (DTO)
     *
     * Principe : on contrôle exactement
     * ce qu'on expose au frontend
     */
    public static UserResponse fromEntity(User user) {
        return UserResponse.builder()
                .matricule(user.getMatricule())
                .nom(user.getNom())
                .prenom(user.getPrenom())
                .email(user.getEmail())
                .role(user.getRole())
                .actif(user.getActif())
                .dateCreation(user.getDateCreation())
                .build();
    }
}
