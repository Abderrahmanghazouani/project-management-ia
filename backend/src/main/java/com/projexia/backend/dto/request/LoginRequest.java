package com.projexia.backend.dto.request;



import jakarta.validation.constraints.*;
import lombok.*;

/**
 * LoginRequest — données envoyées par le frontend
 * pour se connecter à la plateforme
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LoginRequest {

    @NotBlank(message = "L'email est obligatoire")
    @Email(message = "Format email invalide")
    private String email;

    @NotBlank(message = "Le mot de passe est obligatoire")
    private String motDePasse;
}