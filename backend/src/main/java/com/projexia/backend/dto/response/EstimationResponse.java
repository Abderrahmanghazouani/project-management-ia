package com.projexia.backend.dto.response;



import com.projexia.backend.model.IAEstimation;
import com.projexia.backend.model.IATask;
import com.projexia.backend.model.StatutEstimation;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

/**
 * EstimationResponse — Résultat retourné au frontend
 * après analyse Gemini ou en cas de fallback
 *
 * Si manuel = true → Gemini indisponible
 * Si manuel = false → analyse Gemini réussie
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EstimationResponse {

    private String refEstimation;
    private List<IATaskResponse> tasks;
    private Integer totalJours;
    private String complexite;
    private List<String> risques;
    private StatutEstimation statut;
    private String refProjet;
    private LocalDateTime dateCreation;
    private String message;

    // true si Gemini indisponible → fallback manuel
    private boolean manuel;

    /**
     * Conversion entité → DTO
     */
    public static EstimationResponse fromEntity(
            IAEstimation estimation,
            List<IATask> tasks) {

        // Parser les risques (stockés en TEXT séparé par |)
        List<String> risquesList = List.of();
        if (estimation.getRisques() != null &&
                !estimation.getRisques().isEmpty()) {
            risquesList = List.of(
                    estimation.getRisques().split("\\|"));
        }

        List<IATaskResponse> taskResponses = tasks.stream()
                .map(IATaskResponse::fromEntity)
                .collect(Collectors.toList());

        return EstimationResponse.builder()
                .refEstimation(estimation.getRefEstimation())
                .tasks(taskResponses)
                .totalJours(estimation.getTotalJours())
                .complexite(estimation.getComplexite())
                .risques(risquesList)
                .statut(estimation.getStatut())
                .refProjet(estimation.getProjet() != null ?
                        estimation.getProjet().getRefProjet() : null)
                .dateCreation(estimation.getDateCreation())
                .manuel(false)
                .build();
    }
}
