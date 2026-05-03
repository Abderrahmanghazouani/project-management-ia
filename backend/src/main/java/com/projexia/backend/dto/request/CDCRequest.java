package com.projexia.backend.dto.request;



import jakarta.validation.constraints.*;
import lombok.*;

/**
 * CDCRequest — Données envoyées par le frontend
 * pour analyser un cahier des charges avec Gemini
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CDCRequest {

    @NotBlank(message = "Le texte du CDC est obligatoire")
    private String texteCdc;

    @NotBlank(message = "La référence du projet est obligatoire")
    private String refProjet;

    @NotBlank(message = "Le matricule du client est obligatoire")
    private String matriculeClient;
}