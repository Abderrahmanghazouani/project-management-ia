package com.projexia.backend.dto.response;



import lombok.*;
import java.time.LocalDateTime;

/**
 * ErrorResponse — format standard des erreurs
 * retournées au frontend
 *
 * Au lieu d'un stacktrace illisible,
 * le frontend reçoit un JSON propre :
 * {
 *   "status": 404,
 *   "message": "Utilisateur introuvable",
 *   "timestamp": "2024-01-15T10:30:00"
 * }
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ErrorResponse {

    private int status;
    private String message;
    private LocalDateTime timestamp;

    public ErrorResponse(int status, String message) {
        this.status = status;
        this.message = message;
        this.timestamp = LocalDateTime.now();
    }
}