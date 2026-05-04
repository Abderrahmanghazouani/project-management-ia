package com.projexia.backend.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class SprintRequest {

    @NotBlank(message = "Le nom du sprint est obligatoire")
    private String nom;

    private String objectif;

    @NotNull(message = "La date de début est obligatoire")
    private LocalDate dateDebut;

    @NotNull(message = "La date de fin est obligatoire")
    private LocalDate dateFin;

    private Integer capacite;

    @NotBlank(message = "La référence du projet est obligatoire")
    private String refProjet;
}