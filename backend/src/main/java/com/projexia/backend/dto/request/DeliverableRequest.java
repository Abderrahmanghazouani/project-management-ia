package com.projexia.backend.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class DeliverableRequest {

    @NotBlank(message = "Le nom est obligatoire")
    private String nom;

    private String description;

    @NotNull(message = "La date prévue est obligatoire")
    private LocalDate datePrevue;

    private String lienFichier;

    @NotBlank(message = "La référence du projet est obligatoire")
    private String refProjet;
}