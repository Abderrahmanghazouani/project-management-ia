package com.projexia.backend.dto.request;

import com.projexia.backend.model.Role;
import jakarta.validation.constraints.*;
import lombok.*;

/**
 * RegisterRequest — données envoyées par le frontend
 * pour créer un nouveau compte utilisateur
 *
 * Principe Bean Validation :
 * @NotBlank → champ obligatoire non vide
 * @Email    → format email valide
 * @Size     → longueur min/max
 *
 * Ces annotations sont vérifiées automatiquement
 * par Spring grâce à @Valid dans le controller
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RegisterRequest {

    @NotBlank(message = "Le nom est obligatoire")
    @Size(min = 2, max = 100, message = "Nom entre 2 et 100 caractères")
    private String nom;

    @NotBlank(message = "Le prénom est obligatoire")
    @Size(min = 2, max = 100, message = "Prénom entre 2 et 100 caractères")
    private String prenom;

    @NotBlank(message = "L'email est obligatoire")
    @Email(message = "Format email invalide")
    private String email;

    @NotBlank(message = "Le mot de passe est obligatoire")
    @Size(min = 8, message = "Mot de passe minimum 8 caractères")
    @Pattern(
            regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).*$",
            message = "Mot de passe doit contenir majuscule, minuscule et chiffre"
    )
    private String motDePasse;

    @NotNull(message = "Le rôle est obligatoire")
    private Role role;
}