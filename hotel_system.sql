-- MySQL dump 10.13  Distrib 8.0.20, for Win64 (x86_64)
--
-- Host: localhost    Database: hotel_system
-- ------------------------------------------------------
-- Server version	8.0.20

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES UTF8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customers` (
  `email` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `birth` date NOT NULL,
  `nationality` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`email`),
  KEY `nationality` (`nationality`),
  CONSTRAINT `customers_ibfk_1` FOREIGN KEY (`nationality`) REFERENCES `nation` (`name`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
INSERT INTO `customers` VALUES ('alsrud606@hanyang.ac.kr','신민경','1999-11-25','USA'),('test1@naver.com','홍길동','1900-02-27','SouthKorea'),('test10@gmail.com','사암바','1990-08-20','Brazil'),('test2@gmail.com','박준성','2000-11-22','China'),('test3@gmail.com','하현우','2000-01-01','Japan'),('test4@gmail.com','스핑크스','2005-01-01','Egypt'),('test5@gmail.com','모차르트','2005-01-01','Austria'),('test6@gmail.com','카르에','2005-01-01','India'),('test7@gmail.com','소련여자','1993-01-01','Russia'),('test8@gmail.com','헨리','1993-01-01','Canada'),('test9@gmail.com','가으앙시','1900-01-01','HongKong');
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `department`
--

DROP TABLE IF EXISTS `department`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `department` (
  `name` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `department`
--

LOCK TABLES `department` WRITE;
/*!40000 ALTER TABLE `department` DISABLE KEYS */;
INSERT INTO `department` VALUES ('기획부'),('시설안전부'),('식음료부'),('인사부'),('재무부'),('프론트');
/*!40000 ALTER TABLE `department` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `language`
--

DROP TABLE IF EXISTS `language`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `language` (
  `language` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`language`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `language`
--

LOCK TABLES `language` WRITE;
/*!40000 ALTER TABLE `language` DISABLE KEYS */;
INSERT INTO `language` VALUES ('독일어'),('러시아어'),('스페인어'),('아랍어'),('영어'),('이탈리아어'),('일본어'),('중국어'),('터키어'),('포르투칼어'),('프랑스어'),('핀란드어'),('한국어'),('힌디어');
/*!40000 ALTER TABLE `language` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `multilingual`
--

DROP TABLE IF EXISTS `multilingual`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `multilingual` (
  `id` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `language` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`,`language`),
  KEY `language` (`language`),
  CONSTRAINT `multilingual_ibfk_1` FOREIGN KEY (`id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `multilingual_ibfk_2` FOREIGN KEY (`language`) REFERENCES `language` (`language`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `multilingual`
--

LOCK TABLES `multilingual` WRITE;
/*!40000 ALTER TABLE `multilingual` DISABLE KEYS */;
INSERT INTO `multilingual` VALUES ('2019037129','영어'),('2017013390','일본어'),('1234567890','중국어'),('2019083436','프랑스어');
/*!40000 ALTER TABLE `multilingual` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nation`
--

DROP TABLE IF EXISTS `nation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nation` (
  `name` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `language` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  KEY `language` (`language`),
  CONSTRAINT `nation_ibfk_1` FOREIGN KEY (`language`) REFERENCES `language` (`language`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nation`
--

LOCK TABLES `nation` WRITE;
/*!40000 ALTER TABLE `nation` DISABLE KEYS */;
INSERT INTO `nation` VALUES ('Austria','독일어'),('Germany','독일어'),('Russia','러시아어'),('Argentina','스페인어'),('Mexico','스페인어'),('Spain','스페인어'),('Egypt','아랍어'),('Australia','영어'),('Canada','영어'),('UK','영어'),('USA','영어'),('Italy','이탈리아어'),('Japan','일본어'),('China','중국어'),('HongKong','중국어'),('Turkey','터키어'),('Brazil','포르투칼어'),('France','프랑스어'),('Finland','핀란드어'),('SouthKorea','한국어'),('India','힌디어');
/*!40000 ALTER TABLE `nation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `off_work`
--

DROP TABLE IF EXISTS `off_work`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `off_work` (
  `id` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `off_time` datetime NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `off_work_ibfk_1` FOREIGN KEY (`id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `off_work`
--

LOCK TABLES `off_work` WRITE;
/*!40000 ALTER TABLE `off_work` DISABLE KEYS */;
/*!40000 ALTER TABLE `off_work` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `on_work`
--

DROP TABLE IF EXISTS `on_work`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `on_work` (
  `id` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `on_time` datetime NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `on_work_ibfk_1` FOREIGN KEY (`id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `on_work`
--

LOCK TABLES `on_work` WRITE;
/*!40000 ALTER TABLE `on_work` DISABLE KEYS */;
/*!40000 ALTER TABLE `on_work` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `receipt_service`
--

DROP TABLE IF EXISTS `receipt_service`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `receipt_service` (
  `room` int NOT NULL,
  `service` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `order_time` datetime NOT NULL,
  `paid` tinyint(1) NOT NULL,
  PRIMARY KEY (`room`,`service`,`order_time`),
  KEY `service` (`service`),
  CONSTRAINT `receipt_service_ibfk_1` FOREIGN KEY (`room`) REFERENCES `stay` (`room`) ON UPDATE CASCADE,
  CONSTRAINT `receipt_service_ibfk_2` FOREIGN KEY (`service`) REFERENCES `room_service` (`service`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `receipt_service`
--

LOCK TABLES `receipt_service` WRITE;
/*!40000 ALTER TABLE `receipt_service` DISABLE KEYS */;
INSERT INTO `receipt_service` VALUES (301,'apple juice','2020-11-25 11:02:00',0),(301,'extra towel','2020-11-23 12:42:00',0);
/*!40000 ALTER TABLE `receipt_service` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reservation`
--

DROP TABLE IF EXISTS `reservation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reservation` (
  `email` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `reservation_time` datetime NOT NULL,
  `checkin` datetime NOT NULL,
  `checkout` datetime NOT NULL,
  `password` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `room_type` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `personnel` int NOT NULL,
  `breakfast` tinyint(1) NOT NULL,
  PRIMARY KEY (`email`,`reservation_time`),
  KEY `room_type` (`room_type`),
  CONSTRAINT `reservation_ibfk_1` FOREIGN KEY (`room_type`) REFERENCES `room_type` (`type`) ON UPDATE CASCADE,
  CONSTRAINT `reservation_ibfk_2` FOREIGN KEY (`email`) REFERENCES `customers` (`email`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservation`
--

LOCK TABLES `reservation` WRITE;
/*!40000 ALTER TABLE `reservation` DISABLE KEYS */;
INSERT INTO `reservation` VALUES ('alsrud606@hanyang.ac.kr','2020-11-22 22:48:12','2020-11-24 14:00:00','2020-11-29 11:00:00','c0d5d09aaab80397d7dd4c00ea92dc4a259ae853eeb8b533042e999583a4467e277d0874eb76c1598e73261a0e821338f05388ac64a66ce27f8609e7eae33f6d','Double',2,0),('test1@naver.com','2020-11-23 22:48:12','2020-11-25 14:00:00','2020-11-30 11:00:00','d404559f602eab6fd602ac7680dacbfaadd13630335e951f097af3900e9de176b6db28512f2e000b9d04fba5133e8b1c6e8df59db3a8ab9d60be4b97cc9e81db','Double',3,1),('test2@gmail.com','2020-11-19 01:48:12','2020-11-22 15:00:00','2020-12-01 11:00:00','d404559f602eab6fd602ac7680dacbfaadd13630335e951f097af3900e9de176b6db28512f2e000b9d04fba5133e8b1c6e8df59db3a8ab9d60be4b97cc9e81db','family',4,1),('test3@gmail.com','2020-11-19 12:48:12','2020-11-25 15:00:00','2020-12-08 11:00:00','d404559f602eab6fd602ac7680dacbfaadd13630335e951f097af3900e9de176b6db28512f2e000b9d04fba5133e8b1c6e8df59db3a8ab9d60be4b97cc9e81db','Twin',2,0),('test4@gmail.com','2021-11-01 18:48:12','2021-11-25 13:00:00','2021-01-01 11:00:00','d404559f602eab6fd602ac7680dacbfaadd13630335e951f097af3900e9de176b6db28512f2e000b9d04fba5133e8b1c6e8df59db3a8ab9d60be4b97cc9e81db','Family',2,1),('test4@gmail.com','2021-11-23 12:48:12','2021-11-26 13:00:00','2021-01-12 11:00:00','d404559f602eab6fd602ac7680dacbfaadd13630335e951f097af3900e9de176b6db28512f2e000b9d04fba5133e8b1c6e8df59db3a8ab9d60be4b97cc9e81db','Twin',2,0),('test5@gmail.com','2021-11-01 18:48:12','2021-11-25 15:00:00','2021-12-01 11:00:00','d404559f602eab6fd602ac7680dacbfaadd13630335e951f097af3900e9de176b6db28512f2e000b9d04fba5133e8b1c6e8df59db3a8ab9d60be4b97cc9e81db','Double',3,0),('test7@gmail.com','2020-11-10 18:48:12','2020-12-01 13:00:00','2020-12-02 11:00:00','d404559f602eab6fd602ac7680dacbfaadd13630335e951f097af3900e9de176b6db28512f2e000b9d04fba5133e8b1c6e8df59db3a8ab9d60be4b97cc9e81db','Double',3,0),('test9@gmail.com','2021-11-09 12:48:12','2021-01-06 13:00:00','2021-01-12 11:00:00','d404559f602eab6fd602ac7680dacbfaadd13630335e951f097af3900e9de176b6db28512f2e000b9d04fba5133e8b1c6e8df59db3a8ab9d60be4b97cc9e81db','single',1,0);
/*!40000 ALTER TABLE `reservation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `responsibility`
--

DROP TABLE IF EXISTS `responsibility`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `responsibility` (
  `id` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `room` int NOT NULL,
  PRIMARY KEY (`id`,`room`),
  KEY `room` (`room`),
  CONSTRAINT `responsibility_ibfk_1` FOREIGN KEY (`id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `responsibility_ibfk_2` FOREIGN KEY (`room`) REFERENCES `stay` (`room`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `responsibility`
--

LOCK TABLES `responsibility` WRITE;
/*!40000 ALTER TABLE `responsibility` DISABLE KEYS */;
INSERT INTO `responsibility` VALUES ('2019037129',301),('2019037129',303),('6666666666',411),('3333333333',502),('2222222222',509);
/*!40000 ALTER TABLE `responsibility` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `room`
--

DROP TABLE IF EXISTS `room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `room` (
  `number` int NOT NULL,
  `type` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`number`),
  KEY `type` (`type`),
  CONSTRAINT `room_ibfk_1` FOREIGN KEY (`type`) REFERENCES `room_type` (`type`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room`
--

LOCK TABLES `room` WRITE;
/*!40000 ALTER TABLE `room` DISABLE KEYS */;
INSERT INTO `room` VALUES (301,'Double'),(302,'Double'),(303,'Double'),(304,'Double'),(305,'Double'),(405,'Double'),(505,'Double'),(506,'Double'),(507,'Double'),(508,'Double'),(608,'Double'),(609,'Double'),(610,'Double'),(709,'Double'),(710,'Double'),(807,'Double'),(808,'Double'),(809,'Double'),(903,'Double'),(904,'Double'),(905,'Double'),(906,'Double'),(1004,'Double'),(1005,'Double'),(1006,'Double'),(1007,'Double'),(1107,'Double'),(1108,'Double'),(1109,'Double'),(1110,'Double'),(1203,'Double'),(1204,'Double'),(1205,'Double'),(1206,'Double'),(1207,'Double'),(1208,'Double'),(310,'Family'),(311,'Family'),(410,'Family'),(411,'Family'),(412,'Family'),(501,'Family'),(502,'Family'),(611,'Family'),(612,'Family'),(701,'Family'),(702,'Family'),(703,'Family'),(810,'Family'),(811,'Family'),(912,'Family'),(1001,'Family'),(1002,'Family'),(1003,'Family'),(1101,'Family'),(1102,'Family'),(1103,'Family'),(1201,'Family'),(1202,'Family'),(306,'Single'),(307,'Single'),(408,'Single'),(409,'Single'),(511,'Single'),(512,'Single'),(601,'Single'),(602,'Single'),(711,'Single'),(712,'Single'),(801,'Single'),(802,'Single'),(803,'Single'),(1010,'Single'),(1011,'Single'),(308,'Triple'),(309,'Triple'),(406,'Triple'),(407,'Triple'),(503,'Triple'),(504,'Triple'),(704,'Triple'),(705,'Triple'),(706,'Triple'),(812,'Triple'),(901,'Triple'),(902,'Triple'),(910,'Triple'),(911,'Triple'),(1012,'Triple'),(1111,'Triple'),(1112,'Triple'),(312,'Twin'),(401,'Twin'),(402,'Twin'),(403,'Twin'),(404,'Twin'),(509,'Twin'),(510,'Twin'),(603,'Twin'),(604,'Twin'),(605,'Twin'),(606,'Twin'),(607,'Twin'),(707,'Twin'),(708,'Twin'),(804,'Twin'),(805,'Twin'),(806,'Twin'),(907,'Twin'),(908,'Twin'),(909,'Twin'),(1008,'Twin'),(1009,'Twin'),(1104,'Twin'),(1105,'Twin'),(1106,'Twin'),(1209,'Twin'),(1210,'Twin'),(1211,'Twin'),(1212,'Twin');
/*!40000 ALTER TABLE `room` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `room_service`
--

DROP TABLE IF EXISTS `room_service`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `room_service` (
  `service` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` int NOT NULL,
  PRIMARY KEY (`service`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room_service`
--

LOCK TABLES `room_service` WRITE;
/*!40000 ALTER TABLE `room_service` DISABLE KEYS */;
INSERT INTO `room_service` VALUES ('apple juice',5000),('Bagel',13000),('Beef steak',32000),('Caesar salad',10000),('Champagne',49000),('coffee',5000),('Coke',3500),('Cream soup',7000),('extra towel',1000),('French Toast',9500),('Fresh Fruit',11000),('green tea',4000),('mint tea',4000),('Mushroom soup',7500),('Omelette',15000),('orange juice',5000),('Pancakes',9000),('plain yogurt',6000),('Red wine',53000),('Salmon salad',13000),('tomato juice',5000),('Wagyu Ribeye',35000),('White wine',31000),('갈비탕',12000),('곰탕',12000),('북어 해장국',15000),('전복죽',16000);
/*!40000 ALTER TABLE `room_service` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `room_type`
--

DROP TABLE IF EXISTS `room_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `room_type` (
  `type` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `info` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `capacity` int NOT NULL,
  `rate` int NOT NULL,
  `extra` int NOT NULL,
  `personnel` int NOT NULL,
  PRIMARY KEY (`type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room_type`
--

LOCK TABLES `room_type` WRITE;
/*!40000 ALTER TABLE `room_type` DISABLE KEYS */;
INSERT INTO `room_type` VALUES ('Double','더블 베드x1, 와이파이',3,50000,12000,2),('Family','싱글 베드x2, 더블베드x1, 와이파이',5,85000,12000,4),('Single','싱글 베드x1, 와이파이',1,38000,0,1),('Triple','싱글 베드x3, 와이파이',3,70000,0,3),('Twin','싱글 베드x2, 와이파이',3,50000,12000,2);
/*!40000 ALTER TABLE `room_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stay`
--

DROP TABLE IF EXISTS `stay`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stay` (
  `room` int NOT NULL,
  `email` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `reservation_time` datetime NOT NULL,
  `cardkey` tinyint(1) NOT NULL,
  `request` text COLLATE utf8mb4_unicode_ci,
  `cleaning` tinyint(1) NOT NULL,
  `personnel` int NOT NULL,
  PRIMARY KEY (`room`),
  KEY `email` (`email`,`reservation_time`),
  CONSTRAINT `stay_ibfk_1` FOREIGN KEY (`email`, `reservation_time`) REFERENCES `reservation` (`email`, `reservation_time`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stay`
--

LOCK TABLES `stay` WRITE;
/*!40000 ALTER TABLE `stay` DISABLE KEYS */;
INSERT INTO `stay` VALUES (301,'alsrud606@hanyang.ac.kr','2020-11-22 22:48:12',1,'영어 가능 직원 요망.',0,2),(303,'test1@naver.com','2020-11-23 22:48:12',0,'의자 하나만 더 주세요',1,1),(411,'test2@gmail.com','2020-11-19 01:48:12',0,'',0,4),(502,'test4@gmail.com','2021-11-01 18:48:12',1,'',0,2),(509,'test3@gmail.com','2020-11-19 12:48:12',1,'',0,2);
/*!40000 ALTER TABLE `stay` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `test`
--

DROP TABLE IF EXISTS `test`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `test` (
  `TXT` text COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `test`
--

LOCK TABLES `test` WRITE;
/*!40000 ALTER TABLE `test` DISABLE KEYS */;
INSERT INTO `test` VALUES ('왜안돼');
/*!40000 ALTER TABLE `test` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `gender` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone_number` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `department` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `birth` date NOT NULL,
  PRIMARY KEY (`id`),
  KEY `department` (`department`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`department`) REFERENCES `department` (`name`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('1111111111','d404559f602eab6fd602ac7680dacbfaadd13630335e951f097af3900e9de176b6db28512f2e000b9d04fba5133e8b1c6e8df59db3a8ab9d60be4b97cc9e81db','장금이','female','010-3333-4444','식음료부','1900-01-22'),('1234567890','73941847d9611927275d93139981ee78316de50bc51bf398f8ccdd778c7723f370cb252c5293c085ec3c6a3d185246837ed71d651a679cb680793581ad77ac24','HHW','male','010-1234-5678','프론트','2000-01-01'),('2017013390','d404559f602eab6fd602ac7680dacbfaadd13630335e951f097af3900e9de176b6db28512f2e000b9d04fba5133e8b1c6e8df59db3a8ab9d60be4b97cc9e81db','KSY','female','010-1234-1234','인사부','1999-01-22'),('2019037129','d404559f602eab6fd602ac7680dacbfaadd13630335e951f097af3900e9de176b6db28512f2e000b9d04fba5133e8b1c6e8df59db3a8ab9d60be4b97cc9e81db','SMK','female','010-4086-6441','프론트','1999-11-25'),('2019083436','d404559f602eab6fd602ac7680dacbfaadd13630335e951f097af3900e9de176b6db28512f2e000b9d04fba5133e8b1c6e8df59db3a8ab9d60be4b97cc9e81db','KYR','female','010-5678-5678','기획부','1999-01-22'),('2030103842','b9707ed5bdaf6351d8e96654a2f886fbd30ecb4989ed5650a37b7e9f226649068e84a8424b7877f513fd97da124c14d88d065ee756369cfd743223aaf7bee9ca','PJS','male','010-1234-5678','재무부','2000-11-22'),('2222222222','d404559f602eab6fd602ac7680dacbfaadd13630335e951f097af3900e9de176b6db28512f2e000b9d04fba5133e8b1c6e8df59db3a8ab9d60be4b97cc9e81db','짱구','male','010-5555-6666','프론트','2000-01-22'),('3333333333','d404559f602eab6fd602ac7680dacbfaadd13630335e951f097af3900e9de176b6db28512f2e000b9d04fba5133e8b1c6e8df59db3a8ab9d60be4b97cc9e81db','신형만','male','010-5556-6665','프론트','1972-01-22'),('6666666666','d404559f602eab6fd602ac7680dacbfaadd13630335e951f097af3900e9de176b6db28512f2e000b9d04fba5133e8b1c6e8df59db3a8ab9d60be4b97cc9e81db','도라에몽','male','010-1156-2225','프론트','2000-06-22'),('9876543210','d404559f602eab6fd602ac7680dacbfaadd13630335e951f097af3900e9de176b6db28512f2e000b9d04fba5133e8b1c6e8df59db3a8ab9d60be4b97cc9e81db','홍길동','male','010-1111-2222','시설안전부','1999-01-22');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-11-27 13:18:49