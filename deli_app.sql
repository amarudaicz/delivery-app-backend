-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 20-08-2023 a las 20:50:08
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
  `sort_order` int(11) NOT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categories`
--

INSERT INTO `categories` (`id`, `local_id`, `category_name`, `category_image`, `category_description`, `active`, `sort_order`, `createdAt`, `updatedAt`) VALUES
(87, 1, '3', NULL, '', 1, 1, '2023-08-14 22:22:11', '2023-08-14 22:22:11'),
(88, 1, '4', NULL, '', 1, 2, '2023-08-14 22:22:13', '2023-08-14 22:22:13'),
(89, 1, '5', NULL, '', 1, 3, '2023-08-14 22:22:15', '2023-08-14 22:22:15');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `locals`
--

CREATE TABLE `locals` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `name_url` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `open` tinyint(1) NOT NULL DEFAULT 1,
  `location` varchar(255) NOT NULL,
  `phone` int(20) NOT NULL,
  `shipping` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`shipping`)),
  `pay_methods` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`pay_methods`)),
  `delivery_cost` int(10) DEFAULT NULL,
  `delivery_time` varchar(10) DEFAULT NULL,
  `pick_in_local` int(11) DEFAULT NULL,
  `aliascbu` varchar(30) DEFAULT NULL,
  `links` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`links`)),
  `description` varchar(255) DEFAULT NULL,
  `theme` int(10) NOT NULL,
  `schedules` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT '\'[]\'',
  `options_group` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '\'[]\'',
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `locals`
--

INSERT INTO `locals` (`id`, `name`, `name_url`, `image`, `open`, `location`, `phone`, `shipping`, `pay_methods`, `delivery_cost`, `delivery_time`, `pick_in_local`, `aliascbu`, `links`, `description`, `theme`, `schedules`, `options_group`, `createdAt`, `updatedAt`) VALUES
(1, 'Punto Pizza', 'puntopizza', 'http://res.cloudinary.com/diyorb8ka/image/upload/v1689872188/diyorb8ka/lbdkj3aeqbhcc5uk5vgn.png', 1, 'av san martin 4220', 354355778, '{\"delivery\":false,\"pick_in_local\":true,\"delivery_cost\":null,\"delivery_time\":null}', '{\"transfer\":true,\"cash\":true,\"cbu\":\"Gg\"}', 250, '10 - 45', 1, '00', '[{\"name\":\"Twitter\",\"url\":\"https://www.youtube.com/\"}]', NULL, 1, '{\"days\":[{\"name\":\"lun\",\"open\":false,\"shifts\":[]},{\"name\":\"mar\",\"open\":true,\"shifts\":[{\"start\":\"00:00\",\"end\":\"00:30\"},{\"start\":\"09:00\",\"end\":\"23:45\"}]},{\"name\":\"mie\",\"open\":true,\"shifts\":[]},{\"name\":\"jue\",\"open\":true,\"shifts\":[]},{\"name\":\"vie\",\"open\":true,\"shifts\":[]},{\"name\":\"sab\",\"open\":true,\"shifts\":[]},{\"name\":\"dom\",\"open\":true,\"shifts\":[]}]}', '[{\"nameVariation\":\"Pan\",\"typePrice\":3,\"simple\":true,\"multiple\":false,\"max\":1,\"min\":1,\"required\":false,\"sku\":\"Tipo de pan\",\"options\":[{\"nameOption\":\"Blanco\",\"price\":0,\"active\":true},{\"nameOption\":\"Salvado\",\"price\":0,\"active\":true}],\"id\":1,\"editing\":false},{\"nameVariation\":\"Presentaciones\",\"typePrice\":1,\"simple\":true,\"multiple\":false,\"max\":1,\"min\":1,\"required\":true,\"sku\":\"Pizzas porciones\",\"options\":[{\"nameOption\":\"Media\",\"price\":100,\"active\":true},{\"nameOption\":\"Completa\",\"price\":500,\"active\":true}],\"id\":2,\"editing\":false},{\"nameVariation\":\"Dsf\",\"typePrice\":1,\"simple\":false,\"multiple\":false,\"max\":1,\"min\":1,\"required\":false,\"sku\":\"ewr\",\"options\":[{\"nameOption\":\"df\",\"price\":0,\"active\":true},{\"nameOption\":\"rg\",\"price\":0,\"active\":true},{\"nameOption\":\"g\",\"price\":0,\"active\":true}],\"id\":3}]', '2023-01-27 19:43:34', '2023-01-27 19:43:34'),
(2, 'Gallo Negro', 'gallonegro', 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/fast-food-logo-design-template-5e3d4fd2fb94e028469b27c3fc842c92_screen.jpg?ts=1570593625', 1, 'Remedios de escalada 166', 3544569, NULL, NULL, 200, '20 - 30', 0, NULL, NULL, 'Hamburgesas y mas..', 2, '', '', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(4, 'Guanajuato', 'guanajuato', NULL, 1, 'Av San Martin 4535', 3544569, NULL, NULL, NULL, NULL, 0, NULL, NULL, 'Hamburgesas, Lomos y mas..', 3, '', '', '0000-00-00 00:00:00', '0000-00-00 00:00:00');

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
(35, 'Ht', 100, NULL, NULL, '[]', '[{\"nameVariation\":\"Presentaciones\",\"typePrice\":1,\"simple\":true,\"multiple\":false,\"max\":1,\"min\":1,\"required\":true,\"sku\":\"Pizzas porciones\",\"options\":[{\"nameOption\":\"Media\",\"price\":100,\"active\":true},{\"nameOption\":\"Completa\",\"price\":76,\"active\":false}],\"id\":2,\"editing\":false}]', 1, 1, 89, '2023-08-14 23:17:44'),
(36, 'As', 4, NULL, NULL, '[]', '[{\"nameVariation\":\"Dsf\",\"typePrice\":1,\"simple\":false,\"multiple\":false,\"max\":1,\"min\":1,\"required\":false,\"sku\":\"ewr\",\"options\":[{\"nameOption\":\"df\",\"price\":4,\"active\":true},{\"nameOption\":\"rg\",\"price\":4,\"active\":true},{\"nameOption\":\"g\",\"price\":4,\"active\":true}],\"id\":3}]', 1, 1, 89, '2023-08-16 20:09:10');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sales`
--

CREATE TABLE `sales` (
  `id` int(11) NOT NULL,
  `local_id` int(11) NOT NULL,
  `date` date NOT NULL,
  `amount` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `sales`
--

INSERT INTO `sales` (`id`, `local_id`, `date`, `amount`) VALUES
(21, 1, '2023-01-01', 9543),
(22, 1, '2023-01-04', 1500),
(23, 1, '2023-01-04', 15000),
(24, 1, '2023-01-05', 15000),
(25, 1, '2023-01-05', 15000),
(26, 1, '2023-01-05', 15000),
(27, 1, '2023-01-05', 15000),
(28, 1, '2023-01-05', 15000),
(29, 1, '2023-01-05', 15000),
(30, 1, '2023-01-05', 15000),
(31, 1, '2023-01-05', 15000),
(32, 1, '2023-01-05', 15000),
(33, 1, '2023-01-05', 15000),
(34, 1, '2023-01-05', 15000),
(35, 1, '2023-01-05', 15000),
(36, 1, '2023-01-05', 15000),
(37, 1, '2023-01-05', 15000),
(38, 1, '2023-01-05', 15000),
(39, 1, '2023-01-06', 15000),
(40, 1, '2023-01-06', 15000),
(41, 1, '2023-01-15', 15000),
(42, 1, '2023-01-15', 15000),
(43, 1, '2023-01-15', 15000);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `stats`
--

CREATE TABLE `stats` (
  `id` int(11) NOT NULL,
  `local_id` int(11) NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `stats`
--

INSERT INTO `stats` (`id`, `local_id`, `date`) VALUES
(435, 1, '2023-01-01'),
(436, 1, '2023-01-02'),
(437, 1, '2023-01-04');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(20) NOT NULL,
  `email` varchar(255) NOT NULL,
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

INSERT INTO `users` (`id`, `username`, `email`, `password`, `admin`, `admin_table`, `local_id`, `active`, `token`, `root`) VALUES
(1, 'amarudaicz', 'amarudaicz10@gmail.com', '$2b$15$Rxkzs8m5xeB5Amv9pyCtOerD/U4A5fXDtgn4Cs7LNxPCci4f8gIei', 1, 'puntopizza', 1, 1, '', 0),
(2, 'agustina1', 'agusaragonnx@gmail.com', '$2b$15$SmZts0pYZDsE5StomeKl.ewmZtfWy4acnMW0L5FSbFx4xREqyTnua', 1, 'gallonegro', 2, 1, '', 0),
(27, 'amdaraewaau', '', '$2b$15$nC0yV9PYMo3W.GQ16mraF.gFEG.jOiLXMu5w78GuATqHZ6NmPUl2e', 1, 'puntopizza', 1, 1, '', 0),
(28, 'root', '', '$2b$15$sdhji5/o1OQigVD6Qwycg.kxnXer7mCxIiTERs8A8XeFkVDyQHdzi', 1, NULL, NULL, 1, '', 1),
(30, 'amdaraewaaaau', '', '$2b$15$P0A2VLW19atzJxECAljhnerreQ/MtVNj71lQcx7AExOKsk97o8SlC', 1, 'puntopizza', 1, 1, NULL, 0),
(32, 'amdaraewazzaaau', '', '$2b$15$DhEcacSETdygqfxvCbicm.84TcmOJpVtQxoymWW2uxwcqQfCTHihy', 1, 'puntopizza', 1, 1, NULL, 0),
(33, 'amarudaicz10@gmail.c', '', '$2b$15$FCXfVaANEH.AMH8wW4rJY.3xqz9nlu9vhumsvtsSIy.wVObr3UGFC', 0, NULL, NULL, 1, NULL, 0);

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
-- Indices de la tabla `sales`
--
ALTER TABLE `sales`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `stats`
--
ALTER TABLE `stats`
  ADD PRIMARY KEY (`id`),
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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=90;

--
-- AUTO_INCREMENT de la tabla `locals`
--
ALTER TABLE `locals`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `puntopizza`
--
ALTER TABLE `puntopizza`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT de la tabla `sales`
--
ALTER TABLE `sales`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT de la tabla `stats`
--
ALTER TABLE `stats`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=438;

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
-- Filtros para la tabla `puntopizza`
--
ALTER TABLE `puntopizza`
  ADD CONSTRAINT `puntopizza_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `puntopizza_ibfk_2` FOREIGN KEY (`local_id`) REFERENCES `locals` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `stats`
--
ALTER TABLE `stats`
  ADD CONSTRAINT `stats_ibfk_1` FOREIGN KEY (`local_id`) REFERENCES `locals` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`local_id`) REFERENCES `locals` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
