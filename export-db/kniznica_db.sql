-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 18, 2026 at 11:47 AM
-- Server version: 10.11.16-MariaDB
-- PHP Version: 8.3.36

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `kniznica_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `knihy`
--

CREATE TABLE `knihy` (
  `id` int(11) NOT NULL,
  `nazov` varchar(200) NOT NULL,
  `autor` varchar(150) NOT NULL,
  `rok` int(11) NOT NULL,
  `cena` decimal(10,2) NOT NULL DEFAULT 0.00
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `knihy`
--

INSERT INTO `knihy` (`id`, `nazov`, `autor`, `rok`, `cena`) VALUES
(1, 'Malý princ', 'Antoine de Saint-Exupéry', 1943, 12.52),
(2, 'Pán prsteňov', 'J. R. R. Tolkien', 1954, 24.50),
(3, 'Zločin a trest', 'F. M. Dostojevskij', 1866, 14.20),
(4, 'Кобзар', 'Тарас Шевченко', 1840, 0.99),
(5, 'Успех', 'Николай Соболев', 2018, 0.00);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `knihy`
--
ALTER TABLE `knihy`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `knihy`
--
ALTER TABLE `knihy`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
