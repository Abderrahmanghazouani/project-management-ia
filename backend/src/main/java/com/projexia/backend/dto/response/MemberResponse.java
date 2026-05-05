package com.projexia.backend.dto.response;



import com.projexia.backend.model.ProjectMember;
import lombok.*;
import java.time.LocalDateTime;

/**
 * MemberResponse — Données retournées au frontend
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MemberResponse {

    private String refMembre;
    private String matriculeUser;
    private String nom;
    private String prenom;
    private String email;
    private String roleProjet;
    private String roleSysteme;
    private LocalDateTime dateAjout;
    private String refProjet;

    public static MemberResponse fromEntity(
            ProjectMember member) {
        return MemberResponse.builder()
                .refMembre(member.getRefMembre())
                .matriculeUser(
                        member.getUser() != null ?
                                member.getUser().getMatricule() : null)
                .nom(member.getUser() != null ?
                        member.getUser().getNom() : null)
                .prenom(member.getUser() != null ?
                        member.getUser().getPrenom() : null)
                .email(member.getUser() != null ?
                        member.getUser().getEmail() : null)
                .roleProjet(member.getRoleProjet())
                .roleSysteme(member.getUser() != null ?
                        member.getUser().getRole().name() : null)
                .dateAjout(member.getDateAjout())
                .refProjet(member.getProjet() != null ?
                        member.getProjet().getRefProjet() : null)
                .build();
    }
}