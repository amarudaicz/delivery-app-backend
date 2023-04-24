-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 22-04-2023 a las 01:39:00
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `deli_app`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `gallonegro`
--

CREATE TABLE `gallonegro` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` longtext NOT NULL,
  `description` varchar(150) DEFAULT NULL,
  `ingredients` longtext DEFAULT NULL,
  `variations` longtext DEFAULT NULL,
  `local_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `gallonegro`
--

INSERT INTO `gallonegro` (`id`, `name`, `price`, `description`, `ingredients`, `variations`, `local_id`, `category_id`, `createdAt`) VALUES
(1, 'Americana', '500', NULL, NULL, NULL, 1, 1, '2023-04-21 20:12:22');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `gallonegro`
--
ALTER TABLE `gallonegro`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_category` (`category_id`),
  ADD KEY `local_id` (`local_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `gallonegro`
--
ALTER TABLE `gallonegro`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `gallonegro`
--
ALTER TABLE `gallonegro`
  ADD CONSTRAINT `gallonegro_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `gallonegro_ibfk_2` FOREIGN KEY (`local_id`) REFERENCES `locals` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
