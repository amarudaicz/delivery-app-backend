-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 29-09-2023 a las 00:50:41
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;


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
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categories`
--

INSERT INTO `categories` (`id`, `local_id`, `category_name`, `category_image`, `category_description`, `active`, `sort_order`, `createdAt`, `updatedAt`) VALUES
(95, 1, 'Pizzas', NULL, '', 1, 2, NULL, NULL),
(96, 1, 'Hamburgesas', NULL, '', 1, 0, NULL, NULL),
(97, 4, 'Pizzas', NULL, '', 1, 0, NULL, NULL);

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
  `cords` varchar(50) DEFAULT NULL,
  `phone` varchar(20) NOT NULL,
  `shipping` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`shipping`)),
  `pay_methods` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`pay_methods`)),
  `links` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`links`)),
  `description` varchar(255) DEFAULT NULL,
  `theme` int(10) NOT NULL DEFAULT 1,
  `schedules` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `options_group` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `locals`
--

INSERT INTO `locals` (`id`, `name`, `name_url`, `image`, `open`, `location`, `cords`, `phone`, `shipping`, `pay_methods`, `links`, `description`, `theme`, `schedules`, `options_group`, `createdAt`, `updatedAt`) VALUES
(1, 'Punto Pizza', 'puntopizza', NULL, 1, 'Alem 89, Rio Ceballos, Cordoba', '-64.31458244427404,-31.156547974641235', '3543655547', '{\"delivery\":{\"method\":\"delivery\",\"description\":\"Envio a domicilio\",\"delivery_time\":\"20-30\",\"delivery_cost\":150,\"shipping_costs\":[{\"distance\":0.5,\"cost\":200},{\"distance\":1,\"cost\":300},{\"distance\":2,\"cost\":400}]},\"pick_in_local\":{\"method\":\"pick_in_local\",\"description\":\"Buscar en el local\"}}', '{\"cash\":{\"method\":\"cash\",\"description\":\"Efectivo\"}}', '[{\"name\":\"Facebook\",\"url\":\"https://www.youtube.com/\"},{\"name\":\"Sitio web\",\"url\":\"asdsa\"}]', NULL, 1, '{\"days\":[{\"name\":\"lun\",\"open\":false,\"shifts\":[]},{\"name\":\"mar\",\"open\":false,\"shifts\":[]},{\"name\":\"mie\",\"open\":false,\"shifts\":[]},{\"name\":\"jue\",\"open\":false,\"shifts\":[]},{\"name\":\"vie\",\"open\":false,\"shifts\":[]},{\"name\":\"sab\",\"open\":true,\"shifts\":[{\"start\":\"00:00\",\"end\":\"01:00\"},{\"start\":\"09:00\",\"end\":\"16:00\"}]},{\"name\":\"dom\",\"open\":true,\"shifts\":[{\"start\":\"00:00\",\"end\":\"04:00\"}]}]}', '[{\"nameVariation\":\"Presentacion\",\"typePrice\":1,\"simple\":true,\"multiple\":false,\"max\":1,\"min\":1,\"required\":false,\"sku\":\"Pizzas\",\"options\":[{\"nameOption\":\"Media\",\"price\":300,\"active\":true},{\"nameOption\":\"Completa\",\"price\":650,\"active\":false}],\"id\":1,\"editing\":false},{\"nameVariation\":\"Agrega una bebida\",\"typePrice\":2,\"simple\":false,\"multiple\":true,\"max\":0,\"min\":0,\"required\":false,\"sku\":\"Gaseosas\",\"options\":[{\"nameOption\":\"Cocacola\",\"price\":150,\"active\":true},{\"nameOption\":\"Sprite\",\"price\":150,\"active\":false}],\"id\":2,\"editing\":false},{\"nameVariation\":\"Salsas\",\"typePrice\":3,\"simple\":false,\"multiple\":true,\"max\":0,\"min\":0,\"required\":false,\"sku\":\"Hamburgesas\",\"options\":[{\"nameOption\":\"Mayonesa con chimi\",\"price\":0,\"active\":true},{\"nameOption\":\"Salsa criolla\",\"price\":0,\"active\":true}],\"id\":3,\"editing\":false}]', '2023-01-27 19:43:34', '2023-01-27 19:43:34'),
(2, 'Gallo Negro', 'gallonegro', 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/fast-food-logo-design-template-5e3d4fd2fb94e028469b27c3fc842c92_screen.jpg?ts=1570593625', 1, 'Remedios de escalada 166', NULL, '3544569', NULL, NULL, NULL, 'Hamburgesas y mas..', 2, '', '', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(20, 'asda', 'asda', NULL, 1, '', NULL, '3545454544', NULL, NULL, NULL, NULL, 1, NULL, NULL, '2023-09-26 23:42:14', '2023-09-26 23:42:14'),
(21, 'asd', 'asdaa', NULL, 1, '', NULL, '3545454544', NULL, NULL, NULL, NULL, 1, NULL, NULL, '2023-09-27 00:05:20', '2023-09-27 00:05:20'),
(22, 'asd', 'puntopizzaa', NULL, 1, '', NULL, '3543545454', NULL, NULL, NULL, NULL, 1, NULL, NULL, '2023-09-27 23:15:01', '2023-09-27 23:15:01'),
(23, 'asd', 'asd', NULL, 1, '', NULL, '3545454544', NULL, NULL, NULL, NULL, 1, NULL, NULL, '2023-09-27 23:16:11', '2023-09-27 23:16:11'),
(24, 'asd', 'asd', NULL, 1, '', NULL, '3545454544', NULL, NULL, NULL, NULL, 1, NULL, NULL, '2023-09-27 23:18:36', '2023-09-27 23:18:36'),
(25, 'asd', 'asdaaa', NULL, 1, '', NULL, '3545454544', NULL, NULL, NULL, NULL, 1, NULL, NULL, '2023-09-27 23:20:06', '2023-09-27 23:20:06'),
(26, 'asd', 'asd', NULL, 1, '', NULL, '3545454544', NULL, NULL, NULL, NULL, 1, NULL, NULL, '2023-09-27 23:25:57', '2023-09-27 23:25:57');

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
  `name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` int(11) NOT NULL,
  `password` varchar(200) NOT NULL,
  `admin` tinyint(1) NOT NULL DEFAULT 0,
  `admin_table` varchar(20) DEFAULT NULL,
  `local_id` int(11) DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT 1,
  `sub_id` varchar(100) NOT NULL,
  `token` varchar(255) DEFAULT NULL,
  `root` tinyint(1) NOT NULL DEFAULT 0,
  `register_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `username`, `name`, `last_name`, `email`, `phone`, `password`, `admin`, `admin_table`, `local_id`, `active`, `sub_id`, `token`, `root`, `register_date`) VALUES
(49, 'asda', 'asd', 'asd', 'asd@asd.com', 2147483647, '$2b$10$GSUFx6/kzSP5w8RKWUpPreLLBsBhLuYL9RkWBr9Q.KNUnr9JZ/yEi', 1, 'asda', 20, 1, '2c9380848acb749a018ad483fb9906b1', NULL, 0, NULL),
(50, 'asdaa', 'asd', 'asd', 'asd@asd.com', 2147483647, '$2b$10$Y.356sTUbjzB0yViJgvxhOgDq28FT0kdVb8gd51Qz7eNyikRM3h0S', 1, 'asdaa', 21, 1, '2c9380848acb7492018ad4991f2106b6', NULL, 0, NULL),
(51, 'puntopizzaa', 'asd', 'asd', 'asd@asd.com', 2147483647, '$2b$10$95vcKu9Hikvu7nuy9B1QIOiu4I2p/poT0..9.87QUtAEypRRCWc5a', 1, 'puntopizzaa', 22, 1, '2c9380848ad9387e018ad9916e62003b', NULL, 0, NULL),
(52, 'asd', 'asd', 'asd', 'asd@asd.com', 2147483647, '$2b$10$3Igk2wWr11jNT2rwGfg2y.hZzwfgZ8xH6yyfpWlOcNNsibwsnPwfm', 1, 'asd', 23, 1, '2c9380848ad945b3018ad9927672002b', NULL, 0, NULL),
(53, 'asdaaa', 'asd', 'asd', 'asd@asd.com', 2147483647, '$2b$10$qVSaqRwaHaZBJRbvkjP8FeXfSd0DjxK/h/y4QG/2tTiNaDvvm7wOm', 1, 'asdaaa', 25, 1, '2c9380848ad9387e018ad99615db003d', NULL, 0, NULL);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=99;

--
-- AUTO_INCREMENT de la tabla `locals`
--
ALTER TABLE `locals`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `categories`
--
ALTER TABLE `categories`
  ADD CONSTRAINT `categories_ibfk_1` FOREIGN KEY (`local_id`) REFERENCES `locals` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

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
