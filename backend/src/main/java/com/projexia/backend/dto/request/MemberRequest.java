package com.projexia.backend.dto.request;



import jakarta.validation.constraints.*;
import lombok.*;

/**
 * MemberRequest — Données pour ajouter un membre
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MemberRequest {

    @NotBlank(message = "Le matricule est obligatoire")
    private String matriculeUser;

    @NotBlank(message = "Le rôle est obligatoire")
    private String roleProjet;
}
