-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 12-03-2023 a las 22:37:12
-- Versión del servidor: 10.4.25-MariaDB
-- Versión de PHP: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `delivery_test`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `category_name` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `categories`
--

INSERT INTO `categories` (`id`, `category_name`, `createdAt`, `updatedAt`) VALUES
(1, 'Pizzas', '2023-01-27 21:04:17', '2023-01-27 21:04:17');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `elcaracol`
--

CREATE TABLE `elcaracol` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` longtext NOT NULL,
  `ingredients` longtext DEFAULT NULL,
  `id_category` int(11) NOT NULL,
  `createdAt` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `elcaracol`
--

INSERT INTO `elcaracol` (`id`, `name`, `price`, `ingredients`, `id_category`, `createdAt`) VALUES
(1, 'Muzzarella', '{\'media\':500, \'completa\': 1000}', '[\'Huevo\',\'Jamon\',\'Tomate\']', 1, '2023-01-29 19:08:09');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `locals`
--

CREATE TABLE `locals` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `name_url` varchar(255) NOT NULL,
  `location` varchar(255) DEFAULT NULL,
  `contact` int(11) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `locals`
--

INSERT INTO `locals` (`id`, `name`, `name_url`, `location`, `contact`, `description`, `createdAt`, `updatedAt`) VALUES
(1, 'Punto Pizza', 'puntopizza', 'Av San Martin 4535', 3544569, 'Hamburgesas, Lomos y mas..', '2023-01-27 19:43:34', '2023-01-27 19:43:34'),
(2, 'Gallo Negro', 'gallonegro', 'Remedios de escalada 166', 3544569, 'Hamburgesas y mas..', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(4, 'Guanajuato', 'guanajuato', 'Av San Martin 4535', 3544569, 'Hamburgesas, Lomos y mas..', '0000-00-00 00:00:00', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `puntopizza`
--

CREATE TABLE `puntopizza` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` longtext NOT NULL,
  `ingredients` longtext DEFAULT NULL,
  `id_category` int(11) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `puntopizza`
--

INSERT INTO `puntopizza` (`id`, `name`, `price`, `ingredients`, `id_category`, `createdAt`) VALUES
(16, 'Muzzarella', '{\"media\":500, \"completa\": 1000}', '[\'Huevo\',\'Jamon\',\'Tomate\']', 1, '2023-01-29 18:55:10');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `elcaracol`
--
ALTER TABLE `elcaracol`
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `id_category` (`id_category`);

--
-- Indices de la tabla `locals`
--
ALTER TABLE `locals`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `puntopizza`
--
ALTER TABLE `puntopizza`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_category` (`id_category`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `elcaracol`
--
ALTER TABLE `elcaracol`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `locals`
--
ALTER TABLE `locals`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `puntopizza`
--
ALTER TABLE `puntopizza`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `elcaracol`
--
ALTER TABLE `elcaracol`
  ADD CONSTRAINT `elcaracol_ibfk_1` FOREIGN KEY (`id_category`) REFERENCES `categories` (`id`);

--
-- Filtros para la tabla `puntopizza`
--
ALTER TABLE `puntopizza`
  ADD CONSTRAINT `puntopizza_ibfk_1` FOREIGN KEY (`id_category`) REFERENCES `categories` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
