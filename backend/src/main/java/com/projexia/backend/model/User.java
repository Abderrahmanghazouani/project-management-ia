package com.projexia.backend.model;



import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

/**
 * Entité User — mappe la table "users" dans PostgreSQL
 *
 * Principes appliqués :
 * 1. JPA (@Entity) → mapping objet-relationnel
 * 2. Lombok → réduit le code répétitif
 * 3. UserDetails → intégration Spring Security
 * 4. Bean Validation → validation des données
 */
@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User implements UserDetails {

    @Id
    @Column(name = "matricule", length = 50)
    private String matricule;

    @NotBlank(message = "Le nom est obligatoire")
    @Size(max = 100)
    @Column(name = "nom", nullable = false)
    private String nom;

    @NotBlank(message = "Le prénom est obligatoire")
    @Size(max = 100)
    @Column(name = "prenom", nullable = false)
    private String prenom;

    @NotBlank(message = "L'email est obligatoire")
    @Email(message = "Format email invalide")
    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @NotBlank(message = "Le mot de passe est obligatoire")
    @Column(name = "mot_de_passe", nullable = false)
    private String motDePasse;

    @Enumerated(EnumType.STRING)
    @Column(name = "role", nullable = false)
    private Role role;

    @Column(name = "date_creation")
    private LocalDateTime dateCreation;

    @Builder.Default
    @Column(name = "actif")
    private Boolean actif = true;

    /**
     * @PrePersist : exécuté automatiquement
     * avant chaque INSERT en base de données
     */
    @PrePersist
    public void prePersist() {
        this.dateCreation = LocalDateTime.now();
        if (this.actif == null) this.actif = true;
    }

    // ═══════════════════════════════════
    // UserDetails — Spring Security
    // ═══════════════════════════════════

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(
                new SimpleGrantedAuthority("ROLE_" + role.name())
        );
    }

    @Override
    public String getPassword() {
        return this.motDePasse;
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public boolean isAccountNonExpired()    { return true; }

    @Override
    public boolean isAccountNonLocked()     { return actif; }

    @Override
    public boolean isCredentialsNonExpired(){ return true; }

    @Override
    public boolean isEnabled()              { return actif; }
}
