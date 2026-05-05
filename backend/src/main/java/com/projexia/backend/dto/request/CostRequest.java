package com.projexia.backend.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class CostRequest {

    @NotNull(message = "Le budget prévu est obligatoire")
    private BigDecimal budgetPrevu;

    @NotNull(message = "Le budget réel est obligatoire")
    private BigDecimal budgetReel;

    private String commentaire;

    @NotBlank(message = "La référence du projet est obligatoire")
    private String refProjet;

    @NotBlank(message = "Le matricule de l'enregistreur est obligatoire")
    private String matriculeEnregistre;
}