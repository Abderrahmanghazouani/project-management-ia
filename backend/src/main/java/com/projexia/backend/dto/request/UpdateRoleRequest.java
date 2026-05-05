package com.projexia.backend.dto.request;



import com.projexia.backend.model.Role;
import jakarta.validation.constraints.*;
import lombok.*;

/**
 * UpdateRoleRequest — Modifier le rôle d'un utilisateur
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdateRoleRequest {

    @NotNull(message = "Le rôle est obligatoire")
    private Role role;
}