-- =====================================================
-- V1__create_users_table.sql
-- Auteur : Équipe Projexia
-- Description : Création de la table users
-- Flyway exécute ce script UNE SEULE FOIS
-- automatiquement au démarrage de l'application
-- =====================================================

CREATE TABLE users (
                       matricule     VARCHAR(50)  PRIMARY KEY,
                       nom           VARCHAR(100) NOT NULL,
                       prenom        VARCHAR(100) NOT NULL,
                       email         VARCHAR(150) NOT NULL UNIQUE,
                       mot_de_passe  VARCHAR(255) NOT NULL,
                       role          VARCHAR(20)  NOT NULL
                           CHECK (role IN ('ADMIN','MANAGER','DEVELOPER','CLIENT')),
                       date_creation TIMESTAMP    NOT NULL DEFAULT NOW(),
                       actif         BOOLEAN      NOT NULL DEFAULT TRUE
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role  ON users(role);

COMMENT ON TABLE  users            IS 'Utilisateurs Projexia';
COMMENT ON COLUMN users.matricule  IS 'Format : USR-YYYY-NNN';
COMMENT ON COLUMN users.role       IS 'ADMIN|MANAGER|DEVELOPER|CLIENT';