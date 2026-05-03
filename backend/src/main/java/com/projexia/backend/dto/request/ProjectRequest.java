package com.projexia.backend.dto.request;



import com.projexia.backend.model.StatutProjet;
import jakarta.validation.constraints.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

/**
 * ProjectRequest — Données envoyées par le frontend
 * pour créer ou modifier un projet
 *
 * Principe Bean Validation :
 * @NotBlank → champ obligatoire non vide
 * @NotNull  → champ obligatoire (objets)
 * @Size     → longueur min/max
 * @Positive → valeur positive uniquement
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProjectRequest {

    @NotBlank(message = "Le nom est obligatoire")
    @Size(min = 3, max = 150,
            message = "Nom entre 3 et 150 caractères")
    private String nom;

    private String description;

    @NotNull(message = "La date de début est obligatoire")
    private LocalDate dateDebut;

    @NotNull(message = "La date de fin est obligatoire")
    private LocalDate dateFin;

    @PositiveOrZero(message = "Le budget doit être positif")
    private BigDecimal budgetPrevu;

    private StatutProjet statut;

    @NotBlank(message = "Le créateur est obligatoire")
    private String matriculeCreateur;
}
