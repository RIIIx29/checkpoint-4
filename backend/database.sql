-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2
-- http://www.phpmyadmin.net
--
-- Client :  localhost
-- Généré le :  Jeu 26 Octobre 2017 à 13:53
-- Version du serveur :  5.7.19-0ubuntu0.16.04.1
-- Version de PHP :  7.0.22-0ubuntu0.16.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `simple-mvc`
--

-- --------------------------------------------------------

--
-- Structure de la table `item`
--

CREATE TABLE user (
  id INT(11) UNSIGNED NOT NULL,
  userName VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE
  password VARCHAR(255) NOT NULL,
  resetCode VARCHAR(255) DEFAULT NULL,
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table Projets
--
CREATE TABLE
  project (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    desc TEXT NOT NULL,
  type ENUM("REALISATIONS", "PROJETS") NOT NULL,
    date DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  );


CREATE TABLE
  image (
    id INT PRIMARY KEY AUTO_INCREMENT,
    imgLink VARCHAR(255) NOT NULL,
    alt TINYTEXT NOT NULL,
    date DATETIME DEFAULT CURRENT_TIMESTAMP,
    project_id INT NULL,
    CONSTRAINT fk_image_project FOREIGN KEY (project_id) REFERENCES project(id) ON DELETE CASCADE
  );

--
-- Index pour les tables exportées
--

--
-- Index pour la table `item`
--
ALTER TABLE project
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `item`
--
ALTER TABLE project
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
