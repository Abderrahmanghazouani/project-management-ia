package com.projexia.backend.security;





import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

/**
 * JwtService — Gestion des tokens JWT
 *
 * Principe JWT :
 * 1. genererToken()  → créer un token signé
 * 2. validerToken()  → vérifier signature + expiration
 * 3. extraireEmail() → lire les données du token
 *
 * Principe Spring IOC :
 * @Service → Spring crée et gère cette instance
 * @Value   → Spring injecte les valeurs depuis application.properties
 */
@Service
public class JwtService {

    /**
     * Clé secrète pour signer les tokens
     * Injectée depuis application.properties
     * jwt.secret=projexia-secret-key-minimum-32-chars!
     */
    @Value("${jwt.secret}")
    private String secretKey;

    /**
     * Durée de validité du token en millisecondes
     * 86400000 = 24 heures
     */
    @Value("${jwt.expiration}")
    private long expiration;

    // ═══════════════════════════════════════════
    // GÉNÉRATION DU TOKEN
    // ═══════════════════════════════════════════

    /**
     * Générer un token JWT pour un utilisateur
     * Appelé après un login ou register réussi
     *
     * @param userDetails → l'utilisateur connecté
     * @return token JWT signé
     */
    public String genererToken(UserDetails userDetails) {
        return genererTokenAvecClaims(new HashMap<>(), userDetails);
    }

    /**
     * Générer un token avec des données supplémentaires (claims)
     * Ex: ajouter le rôle dans le token
     *
     * @param claimsSupplementaires → données à ajouter au token
     * @param userDetails → l'utilisateur
     * @return token JWT signé
     */
    public String genererTokenAvecClaims(
            Map<String, Object> claimsSupplementaires,
            UserDetails userDetails) {

        return Jwts.builder()
                // Données dans le token
                .claims(claimsSupplementaires)
                // Sujet = email de l'utilisateur
                .subject(userDetails.getUsername())
                // Date de création
                .issuedAt(new Date(System.currentTimeMillis()))
                // Date d'expiration = maintenant + 24h
                .expiration(new Date(System.currentTimeMillis() + expiration))
                // Signer avec notre clé secrète
                .signWith(getCleSignature())
                .compact();
    }

    // ═══════════════════════════════════════════
    // VALIDATION DU TOKEN
    // ═══════════════════════════════════════════

    /**
     * Valider un token JWT
     * Vérifie que :
     * 1. Le token appartient bien à cet utilisateur
     * 2. Le token n'est pas expiré
     *
     * @param token → le token reçu du frontend
     * @param userDetails → l'utilisateur en BD
     * @return true si valide, false sinon
     */
    public boolean validerToken(String token, UserDetails userDetails) {
        final String email = extraireEmail(token);
        return email.equals(userDetails.getUsername())
                && !estExpire(token);
    }

    // ═══════════════════════════════════════════
    // EXTRACTION DES DONNÉES DU TOKEN
    // ═══════════════════════════════════════════

    /**
     * Extraire l'email depuis le token
     * C'est le "subject" qu'on a mis lors de la création
     */
    public String extraireEmail(String token) {
        return extraireClaim(token, Claims::getSubject);
    }

    /**
     * Extraire la date d'expiration du token
     */
    public Date extraireExpiration(String token) {
        return extraireClaim(token, Claims::getExpiration);
    }

    /**
     * Méthode générique pour extraire n'importe quelle
     * donnée (claim) depuis le token
     *
     * @param token → le token JWT
     * @param claimsResolver → quelle donnée extraire
     */
    public <T> T extraireClaim(String token,
                               Function<Claims, T> claimsResolver) {
        final Claims claims = extraireTousClaims(token);
        return claimsResolver.apply(claims);
    }

    // ═══════════════════════════════════════════
    // MÉTHODES PRIVÉES
    // ═══════════════════════════════════════════

    /**
     * Vérifier si le token est expiré
     */
    private boolean estExpire(String token) {
        return extraireExpiration(token).before(new Date());
    }

    /**
     * Extraire toutes les données du token
     * Lance une exception si le token est invalide
     */
    private Claims extraireTousClaims(String token) {
        return Jwts.parser()
                .verifyWith(getCleSignature())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    /**
     * Convertir la clé secrète (String) en clé cryptographique
     * HMAC-SHA256 (HS256)
     */
    private SecretKey getCleSignature() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}

