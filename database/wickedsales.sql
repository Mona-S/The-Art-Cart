-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Dec 20, 2019 at 05:23 AM
-- Server version: 5.7.27-0ubuntu0.18.04.1
-- PHP Version: 7.2.19-0ubuntu0.18.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `wickedsales`
--

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
CREATE TABLE `cart` (
  `id` mediumint(8) UNSIGNED NOT NULL,
  `created` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`id`, `created`) VALUES
(7, '2019-11-13 16:30:45'),
(8, '2019-11-13 16:32:03'),
(9, '2019-11-15 22:22:22'),
(10, '2019-11-20 22:41:05'),
(11, '2019-12-06 04:16:16');

-- --------------------------------------------------------

--
-- Table structure for table `cartItems`
--

DROP TABLE IF EXISTS `cartItems`;
CREATE TABLE `cartItems` (
  `id` mediumint(8) UNSIGNED NOT NULL,
  `productID` mediumint(8) UNSIGNED NOT NULL,
  `count` smallint(5) UNSIGNED NOT NULL,
  `price` mediumint(8) UNSIGNED NOT NULL,
  `added` datetime NOT NULL,
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `cartID` mediumint(8) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `cartItems`
--

INSERT INTO `cartItems` (`id`, `productID`, `count`, `price`, `added`, `updated`, `cartID`) VALUES
(702, 2, 1, 2595, '2019-12-20 04:36:12', '2019-12-20 04:36:12', 11);

-- --------------------------------------------------------

--
-- Table structure for table `images`
--

DROP TABLE IF EXISTS `images`;
CREATE TABLE `images` (
  `id` tinyint(11) NOT NULL,
  `product_id` tinyint(11) NOT NULL,
  `image` varchar(100) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `images`
--

INSERT INTO `images` (`id`, `product_id`, `image`) VALUES
(1, 1, '/images/theme-image1.jpg'),
(2, 2, '/images/theme-image2.jpg'),
(4, 3, '/images/theme-image3.jpg'),
(5, 4, '/images/theme-image4.jpg'),
(6, 5, '/images/theme-image5.jpg'),
(7, 6, '/images/theme-image6.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
CREATE TABLE `products` (
  `id` mediumint(8) UNSIGNED NOT NULL,
  `name` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `price` mediumint(8) UNSIGNED NOT NULL,
  `image` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `short_description` varchar(200) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `price`, `image`, `short_description`) VALUES
(1, 'The Flower Farm', 2999, 'https://bit.ly/2JtVNE6', 'ART-Canvas Prints Tulip Lavender Field Wall Art Colorful Flowers Artworks on Canvas Landscape Painting Framed for Modern Home Decoration (30x30cmx4pcs)'),
(2, 'Orchid Waterlily ', 2595, 'https://bit.ly/2w9C3Nm', 'Canvas Wall Art Zen Canvas Prints Stone Green Bamboo Pink Waterlily and Frangipani Picture - 4 Pieces Framed Canvas Art Modern Artwork Canvas Painting for Home, Office, Kitchen Decoration'),
(3, 'Sunset Sea', 2900, ' https://bit.ly/2LVHYAk', 'Sunset Sea Beach Modern Seascape Pictures Paintings on Canvas Wall Art 4 Panels Stretched and Framed Canvas Prints Artwork for Living Room Bedroom Home Office Decorations'),
(4, 'Modern Art', 2000, ' https://bit.ly/2EjCU2a', 'Canvas Wall Art Painting Landscape Picture Printings on Canvas Contemporary Artwork Stretched and Framed Ready to Hang for Home Living Room Decoration (Various Transparent Flowers(12 x 12 inchx4pcs))'),
(5, 'Spa Bamboo Zen', 1999, '', 'Canvas Prints Relaxing Spa Energy Stones Bamboo Green in Garden with Flow Water Orchid Flowers Wall Art Modern Home Decor Printing Ready to Hang for Bathroom Decor 12x12inx4pcs'),
(6, 'Peacock Flower', 3000, '', 'Modern Salon Theme Black and White Peacock Blue Vase Flower Abstract Painting. Canvas Wall Art for Home Decor 12x12inches 4pcs/Set');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cartItems`
--
ALTER TABLE `cartItems`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `idxidproductid` (`productID`,`cartID`);

--
-- Indexes for table `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `id` mediumint(8) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT for table `cartItems`
--
ALTER TABLE `cartItems`
  MODIFY `id` mediumint(8) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=703;
--
-- AUTO_INCREMENT for table `images`
--
ALTER TABLE `images`
  MODIFY `id` tinyint(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` mediumint(8) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
