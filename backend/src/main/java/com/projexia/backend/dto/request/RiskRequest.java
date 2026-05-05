package com.projexia.backend.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RiskRequest {

    @NotBlank(message = "La description est obligatoire")
    private String description;

    @NotBlank(message = "La probabilité est obligatoire")
    private String probabilite;   // Faible | Moyenne | Elevee

    @NotBlank(message = "L'impact est obligatoire")
    private String impact;        // Faible | Moyen | Eleve

    @NotBlank(message = "La criticité est obligatoire")
    private String criticite;     // calculée automatiquement, mais acceptée en entrée aussi

    private String planMitigation;

    private String responsable;

    @NotBlank(message = "La référence du projet est obligatoire")
    private String refProjet;
}