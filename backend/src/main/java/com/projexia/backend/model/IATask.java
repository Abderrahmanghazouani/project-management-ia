package com.projexia.backend.model;


import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "ia_tasks")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class IATask {

    @Id
    @Column(name = "ref_tache_ia", length = 50)
    private String refTacheIa;

    @Column(name = "titre", nullable = false)
    private String titre;

    @Column(name = "jours_estimes")
    private Integer joursEstimes;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ref_estimation")
    private IAEstimation estimation;
}
