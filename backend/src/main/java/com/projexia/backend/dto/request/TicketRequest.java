package com.projexia.backend.dto.request;

import com.projexia.backend.model.PrioriteTicket;
import com.projexia.backend.model.TypeTicket;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TicketRequest {

    @NotBlank(message = "Le titre est obligatoire")
    private String titre;

    private String description;

    @NotNull(message = "Le type de ticket est obligatoire")
    private TypeTicket typeTicket;

    @NotNull(message = "La priorité est obligatoire")
    private PrioriteTicket priorite;

    private Integer storyPoints;

    @NotBlank(message = "La référence du projet est obligatoire")
    private String refProjet;

    private String matriculeAssigne;
}