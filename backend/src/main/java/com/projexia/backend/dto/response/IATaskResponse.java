package com.projexia.backend.dto.response;



import com.projexia.backend.model.IATask;
import lombok.*;

/**
 * IATaskResponse — Représente une tâche suggérée par Gemini
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class IATaskResponse {

    private String refTacheIa;
    private String titre;
    private Integer joursEstimes;

    public static IATaskResponse fromEntity(IATask task) {
        return IATaskResponse.builder()
                .refTacheIa(task.getRefTacheIa())
                .titre(task.getTitre())
                .joursEstimes(task.getJoursEstimes())
                .build();
    }
}
