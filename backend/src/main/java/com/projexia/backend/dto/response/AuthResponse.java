package com.projexia.backend.dto.response;



import com.projexia.backend.model.Role;
import lombok.*;

/**
 * AuthResponse — données retournées au frontend
 * après un login ou register réussi
 *
 * Principe DTO :
 * On ne retourne JAMAIS l'entité User directement
 * car elle contient le mot de passe haché
 *
 * Le frontend reçoit uniquement :
 * - token JWT pour les prochaines requêtes
 * - matricule pour identifier l'utilisateur
 * - informations de base (nom, email, role)
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuthResponse {

    private String token;
    private String matricule;
    private String nom;
    private String prenom;
    private String email;
    private Role role;
    private String message;
}
