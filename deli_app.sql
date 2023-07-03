-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 29-06-2023 a las 22:15:09
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
-- Estructura de tabla para la tabla `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `local_id` int(11) NOT NULL,
  `category_name` varchar(255) DEFAULT NULL,
  `category_image` varchar(255) DEFAULT NULL,
  `category_description` varchar(150) DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT 1,
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categories`
--

INSERT INTO `categories` (`id`, `local_id`, `category_name`, `category_image`, `category_description`, `active`, `createdAt`, `updatedAt`) VALUES
(1, 1, 'Pizzas', 'https://res.cloudinary.com/df9dg3owy/image/upload/v1687720483/puntopizza/Pizzas.jpg', NULL, 0, '2023-06-25 16:14:44', '2023-06-25 16:14:44'),
(2, 1, 'BTS', NULL, NULL, 1, '2023-06-25 16:31:50', '2023-06-25 16:31:50'),
(4, 1, 'Amaruarfaafa', NULL, NULL, 1, '2023-06-25 20:59:26', '2023-06-25 20:59:26'),
(5, 1, 'Hamburgesas', 'https://res.cloudinary.com/df9dg3owy/image/upload/v1687737972/puntopizza/Hamburgesas.jpg', NULL, 1, '2023-06-25 21:06:14', '2023-06-25 21:06:14'),
(6, 1, 'Aa', NULL, NULL, 1, '2023-06-25 21:07:30', '2023-06-25 21:07:30'),
(7, 1, '032320', NULL, NULL, 1, '2023-06-25 21:08:31', '2023-06-25 21:08:31'),
(8, 1, 'Dsa', NULL, NULL, 1, '2023-06-25 21:10:09', '2023-06-25 21:10:09'),
(9, 1, 'Ff', NULL, NULL, 1, '2023-06-25 21:11:19', '2023-06-25 21:11:19'),
(10, 1, 'Fasf', NULL, NULL, 1, '2023-06-25 21:11:34', '2023-06-25 21:11:34');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `gallonegro`
--

CREATE TABLE `gallonegro` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` int(10) NOT NULL,
  `image` varchar(255) NOT NULL,
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

INSERT INTO `gallonegro` (`id`, `name`, `price`, `image`, `description`, `ingredients`, `variations`, `local_id`, `category_id`, `createdAt`) VALUES
(1, 'Americana', 500, '', NULL, NULL, NULL, 2, 5, '2023-04-21 20:12:22'),
(20, 'sdf', 425, 'http://res.cloudinary.com/diyorb8ka/image/upload/v1682128494/yxszxckmkqrnbuxr8h9e.jpg', NULL, '[\"sdf\"]', '[]', 2, 5, '2023-04-21 22:54:55');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `guanajuato`
--

CREATE TABLE `guanajuato` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` int(11) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `description` varchar(150) DEFAULT NULL,
  `ingredients` longtext DEFAULT NULL,
  `variations` longtext DEFAULT NULL,
  `local_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `guanajuato`
--

INSERT INTO `guanajuato` (`id`, `name`, `price`, `image`, `description`, `ingredients`, `variations`, `local_id`, `category_id`, `createdAt`) VALUES
(6, 'Chuck Taylor', 300, 'https://assets.unileversolutions.com/recipes-v2/210995.jpg', NULL, NULL, NULL, 4, 6, '2023-04-28 09:31:02');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `locals`
--

CREATE TABLE `locals` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `name_url` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `location` varchar(255) NOT NULL,
  `phone` int(20) NOT NULL,
  `delivery_cost` int(10) DEFAULT NULL,
  `delivery_time` varchar(10) DEFAULT NULL,
  `pick_in_local` int(11) DEFAULT NULL,
  `aliascbu` varchar(30) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `theme` int(10) NOT NULL,
  `instagram` varchar(200) DEFAULT NULL,
  `website` varchar(200) DEFAULT NULL,
  `maps` varchar(255) DEFAULT NULL,
  `horarios` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `options_group` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '\'[]\'',
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `locals`
--

INSERT INTO `locals` (`id`, `name`, `name_url`, `image`, `location`, `phone`, `delivery_cost`, `delivery_time`, `pick_in_local`, `aliascbu`, `description`, `theme`, `instagram`, `website`, `maps`, `horarios`, `options_group`, `createdAt`, `updatedAt`) VALUES
(1, 'Punto Pizza', 'puntopizza', NULL, 'av san martin 4220', 354355778, 250, '30 - 40', NULL, '00', NULL, 1, NULL, NULL, NULL, '{\"semana\":{\"dias\":[\"Lun\"],\"maIn\":\"10am\",\"maFn\":\"11pm\",\"taIn\":null,\"taFn\":null},\"finDeSemana\":{\"dias\":[\"\"],\"maIn\":null,\"maFn\":null,\"taIn\":null,\"taFn\":null}}', '[{\"nameVariation\":\"Presentaciones\",\"typePrice\":1,\"simple\":true,\"multiple\":false,\"max\":1,\"min\":0,\"options\":[{\"nameOption\":\"simple\",\"price\":1500,\"active\":true},{\"nameOption\":\"doble\",\"price\":2000,\"active\":false}],\"id\":1}]', '2023-01-27 19:43:34', '2023-01-27 19:43:34'),
(2, 'Gallo Negro', 'gallonegro', 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/fast-food-logo-design-template-5e3d4fd2fb94e028469b27c3fc842c92_screen.jpg?ts=1570593625', 'Remedios de escalada 166', 3544569, 200, '20 - 30', 0, NULL, 'Hamburgesas y mas..', 2, NULL, NULL, NULL, NULL, '', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(4, 'Guanajuato', 'guanajuato', NULL, 'Av San Martin 4535', 3544569, NULL, NULL, 0, NULL, 'Hamburgesas, Lomos y mas..', 3, NULL, NULL, NULL, NULL, '', '0000-00-00 00:00:00', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `puntopizza`
--

CREATE TABLE `puntopizza` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` int(10) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `description` varchar(150) DEFAULT NULL,
  `ingredients` longtext DEFAULT NULL,
  `variations` longtext DEFAULT NULL,
  `stock` tinyint(1) NOT NULL DEFAULT 1,
  `local_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `puntopizza`
--

INSERT INTO `puntopizza` (`id`, `name`, `price`, `image`, `description`, `ingredients`, `variations`, `stock`, `local_id`, `category_id`, `createdAt`) VALUES
(6, 'Proof', 30000, 'https://res.cloudinary.com/df9dg3owy/image/upload/v1687986631/puntopizza/Proof.jpg', 'Proof album. Ver. compacta', '[\"KIM NAM JOON\",\"KIM SEOK JIN\",\"JUNG HOSEOK\",\"MIN YOON GI\",\"PARK JI MIN\",\"KIM TAE HYUNG\",\"JEON JUNG KOOK\"]', '[]', 0, 1, 2, '2023-06-26 20:24:16'),
(7, 'Map of the Soul', 650000, 'https://res.cloudinary.com/df9dg3owy/image/upload/v1687986369/puntopizza/Map%20of%20the%20Soul.jpg', 'Albúm mots BTS\r\nVer 03', '[\"KIM NAM JOON\",\"KIM SEOK JIN\",\"JUNG HOSEOK\",\"MIN YOON GI\",\"PARK JI MIN\",\"KIM TAE HYUNG\",\"JEON JUNG KOOK\"]', '[]', 1, 1, 2, '2023-06-26 20:24:28'),
(9, 'Asd', 3214, NULL, NULL, '[]', '[{\"nameVariation\":\"Presentaciones\",\"typePrice\":1,\"simple\":true,\"multiple\":false,\"max\":1,\"min\":0,\"options\":[{\"nameOption\":\"simple\",\"price\":1500,\"active\":true},{\"nameOption\":\"doble\",\"price\":2000,\"active\":false}],\"id\":1}]', 1, 1, 1, '2023-06-26 21:16:07'),
(10, 'Butter albúm ', 540000, 'https://res.cloudinary.com/df9dg3owy/image/upload/v1687986211/puntopizza/Butter-alb%C3%BAm.webp', 'Albúm butter bts ver.1', '[\"KIM NAM JOON\",\"KIM SEOK JIN\",\"JUNG HOSEOK\",\"MIN YOON GI\",\"PARK JI MIN\",\"KIM TAE HYUNG\",\"JEON JUNG KOOK\",\"BUTTER\"]', '[]', 0, 1, 2, '2023-06-28 18:03:34'),
(11, 'Sdf', 2, NULL, NULL, '[]', '[]', 1, 1, 1, '2023-06-28 19:54:33');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(20) NOT NULL,
  `password` varchar(200) NOT NULL,
  `admin` tinyint(1) NOT NULL DEFAULT 0,
  `admin_table` varchar(20) DEFAULT NULL,
  `local_id` int(11) DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT 1,
  `token` varchar(255) DEFAULT NULL,
  `root` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `admin`, `admin_table`, `local_id`, `active`, `token`, `root`) VALUES
(1, 'amarudaicz', '$2b$15$sdhji5/o1OQigVD6Qwycg.kxnXer7mCxIiTERs8A8XeFkVDyQHdzi', 1, 'puntopizza', 1, 1, '', 0),
(2, 'agustina1', '$2b$15$SmZts0pYZDsE5StomeKl.ewmZtfWy4acnMW0L5FSbFx4xREqyTnua', 1, 'gallonegro', 2, 1, '', 0),
(27, 'amdaraewaau', '$2b$15$nC0yV9PYMo3W.GQ16mraF.gFEG.jOiLXMu5w78GuATqHZ6NmPUl2e', 1, 'puntopizza', 1, 1, '', 0),
(28, 'root', '$2b$15$sdhji5/o1OQigVD6Qwycg.kxnXer7mCxIiTERs8A8XeFkVDyQHdzi', 1, NULL, NULL, 1, '', 1),
(30, 'amdaraewaaaau', '$2b$15$P0A2VLW19atzJxECAljhnerreQ/MtVNj71lQcx7AExOKsk97o8SlC', 1, 'puntopizza', 1, 1, NULL, 0),
(32, 'amdaraewazzaaau', '$2b$15$DhEcacSETdygqfxvCbicm.84TcmOJpVtQxoymWW2uxwcqQfCTHihy', 1, 'puntopizza', 1, 1, NULL, 0),
(33, 'amarudaicz10@gmail.c', '$2b$15$FCXfVaANEH.AMH8wW4rJY.3xqz9nlu9vhumsvtsSIy.wVObr3UGFC', 0, NULL, NULL, 1, NULL, 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `local_id` (`local_id`);

--
-- Indices de la tabla `gallonegro`
--
ALTER TABLE `gallonegro`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_category` (`category_id`),
  ADD KEY `local_id` (`local_id`);

--
-- Indices de la tabla `guanajuato`
--
ALTER TABLE `guanajuato`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_category` (`category_id`),
  ADD KEY `local_id` (`local_id`);

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
  ADD KEY `id_category` (`category_id`),
  ADD KEY `local_id` (`local_id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD KEY `local_id` (`local_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `gallonegro`
--
ALTER TABLE `gallonegro`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `guanajuato`
--
ALTER TABLE `guanajuato`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `locals`
--
ALTER TABLE `locals`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `puntopizza`
--
ALTER TABLE `puntopizza`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `categories`
--
ALTER TABLE `categories`
  ADD CONSTRAINT `categories_ibfk_1` FOREIGN KEY (`local_id`) REFERENCES `locals` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Filtros para la tabla `gallonegro`
--
ALTER TABLE `gallonegro`
  ADD CONSTRAINT `gallonegro_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `gallonegro_ibfk_2` FOREIGN KEY (`local_id`) REFERENCES `locals` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `guanajuato`
--
ALTER TABLE `guanajuato`
  ADD CONSTRAINT `guanajuato_ibfk_1` FOREIGN KEY (`local_id`) REFERENCES `locals` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `guanajuato_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `puntopizza`
--
ALTER TABLE `puntopizza`
  ADD CONSTRAINT `puntopizza_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `puntopizza_ibfk_2` FOREIGN KEY (`local_id`) REFERENCES `locals` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`local_id`) REFERENCES `locals` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
