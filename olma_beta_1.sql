-- MySQL dump 10.13  Distrib 5.6.21, for linux-glibc2.5 (x86_64)
--
-- Host: localhost    Database: olma_beta_1
-- ------------------------------------------------------
-- Server version	5.6.21-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `tbl_banner`
--

DROP TABLE IF EXISTS `tbl_banner`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_banner` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `banner_title_eng` varchar(100) NOT NULL,
  `banner_title_chi` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `banner_image_eng` varchar(100) NOT NULL,
  `banner_image_chi` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `banner_mobile_image` varchar(50) NOT NULL,
  `banner_mobile_image_chi` varchar(100) NOT NULL,
  `banner_alt_title_eng` varchar(100) NOT NULL,
  `banner_alt_title_chi` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `product_page` int(11) NOT NULL,
  `category_page` int(11) NOT NULL,
  `order_by` int(11) NOT NULL,
  `status` enum('1','0') NOT NULL DEFAULT '1',
  `is_delete` enum('n','y') NOT NULL,
  `created_date` datetime NOT NULL,
  `updated_date` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_banner`
--

LOCK TABLES `tbl_banner` WRITE;
/*!40000 ALTER TABLE `tbl_banner` DISABLE KEYS */;
INSERT INTO `tbl_banner` VALUES (3,'Innovation since 1906','创新始于百年传承','1465354137-1463641693-feature-general-en.jpg','1464912794-feature-general-cn.jpg','1465354137-1464161109-watch33.png','1464911482-feature-general-m-cn.jpg','Innovation since 1906','创新始于百年传承',12,1,4,'0','n','2016-04-07 11:11:47','2016-06-08 10:48:57'),(6,'Caravelle Collection','扬帆系列','1465353995-1463641737-feature-caravelle-en.jpg','1465354317-1463641737-feature-caravelle-cn.jpg','1465353995-1464161144-watch11.png','1465353954-feature-caravelle-m-cn.jpg','Caravelle Collection','扬帆系列',0,2,1,'1','n','2016-04-07 14:32:06','2016-06-08 10:51:57'),(7,'Sea Cup Collection','海杯系列','1467673161-feature-seacup-en.jpg','1464911576-feature-seacup-cn.jpg','1467673292-m-feature-seacup-en.jpg','1464911576-feature-seacup-m-cn.jpg','Sea Cup Collection','海杯系列',0,1,2,'1','n','2016-04-07 14:32:52','2016-07-05 07:01:32'),(8,'Starlet Collection','星钻系列','1465354110-1463641984-feature-starlet-en.jpg','1464913014-feature-starlet-cn.jpg','1465354093-feature-starlet-m-en.jpg','1464913014-feature-starlet-m-cn.jpg','Starlet Collection','星钻系列',0,3,3,'1','n','0000-00-00 00:00:00','2016-06-08 10:48:30');
/*!40000 ALTER TABLE `tbl_banner` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_category`
--

DROP TABLE IF EXISTS `tbl_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category_title_eng` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `category_title_chi` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `category_name_eng` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `category_name_chi` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `cate_image` varchar(100) NOT NULL,
  `status` enum('0','1') NOT NULL DEFAULT '1',
  `category_slug` varchar(100) NOT NULL,
  `order_by` int(11) NOT NULL,
  `is_delete` enum('n','y') NOT NULL,
  `created_date` datetime NOT NULL,
  `updated_date` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_category`
--

LOCK TABLES `tbl_category` WRITE;
/*!40000 ALTER TABLE `tbl_category` DISABLE KEYS */;
INSERT INTO `tbl_category` VALUES (1,'SEA CUP','海杯系列','SEA CUP','海杯系列','1464926615-B301-1102-107.png','1','sea-cup',2,'n','2016-05-18 11:57:58','2016-06-03 12:03:36'),(2,'CARAVELLE','扬帆系列','CARAVELLE','扬帆系列','1465879433-K102-0103-111.png','1','caravelle',1,'n','2016-05-18 11:59:46','2016-06-14 12:43:53'),(3,'STARLET','星钻系列','Starlet Collection','星钻系列','1464926732-D401-0815-111.png','1','starlet',3,'n','2016-05-18 12:01:51','2016-06-03 12:05:32'),(5,'Classic Collection','经典系列','Classic Collection','经典系列','1465352683-C101-0103-001.png','0','classic-collection',4,'n','2016-06-08 10:24:43','2016-06-08 10:24:43');
/*!40000 ALTER TABLE `tbl_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_contact`
--

DROP TABLE IF EXISTS `tbl_contact`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_contact` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `mobile` varchar(20) NOT NULL,
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `message` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `status` enum('1','0') NOT NULL,
  `type` enum('CHI','ENG') NOT NULL,
  `created_date` datetime NOT NULL,
  `updated_date` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_contact`
--

LOCK TABLES `tbl_contact` WRITE;
/*!40000 ALTER TABLE `tbl_contact` DISABLE KEYS */;
INSERT INTO `tbl_contact` VALUES (1,'Demo','1212121212','demo@demo.com','test data please ignore','1','CHI','2016-06-14 13:03:37','2016-06-14 13:03:37'),(9,'陈宁','13833523296','tank211682@sina.com','在香港买一款k09.276.1  33963能在国内维保么','1','CHI','2016-06-20 07:23:29','2016-06-20 07:23:29'),(15,'刘继德','15109361011','921088922@qq.com','怎么维修，手表坏了，在香港买的','1','CHI','2016-06-20 18:30:37','2016-06-20 18:30:37'),(16,'海彬','15990996753','87827356@qq.com','我现在在济南，之前在香港买的一个奥尔马表坏了，去哪修','1','CHI','2016-07-01 17:03:17','2016-07-01 17:03:17'),(17,'孔祥伟','13852214295','jshykxw@163.com','我有一款olma男款表，是我父母三十年前结婚所购。因多年不戴，已停！现想修复后给我父亲佩带，其实表不一定值钱，但是意义很重要。不知道是否能修复！','1','CHI','2016-07-13 08:48:17','2016-07-13 08:48:17'),(18,'杨淑婉','18353621327','1046206429@qq.com','购买的sea cup系列手表，后盖上的玻璃遮罩脱落，并非人为破坏','1','CHI','2016-07-14 10:08:31','2016-07-14 10:08:31'),(19,'江海滨','15170388808','45321837@qq.com','UC03.272.3是不是真品，在香港买的。为什么每天快一两分钟，是否右方法调校。谢谢！','1','CHI','2016-07-19 23:25:47','2016-07-19 23:25:47'),(20,'刘宁','15333120618','52579181@qq.com','表经常停歇。','1','CHI','2016-07-21 16:46:29','2016-07-21 16:46:29'),(21,'马','13304951819','511281555@QQ.COM','看好了一款 杨帆系列K202.0309.003','1','CHI','2016-07-21 22:33:14','2016-07-21 22:33:14'),(22,'董磊','13785568676','dlld211@sina.com','产品信息及专卖店地址','1','CHI','2016-07-24 12:05:24','2016-07-24 12:05:24');
/*!40000 ALTER TABLE `tbl_contact` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_content`
--

DROP TABLE IF EXISTS `tbl_content`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_content` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content_title_E` varchar(255) NOT NULL,
  `content_title_C` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `content_E` text NOT NULL,
  `content_C` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `slug` varchar(25) NOT NULL,
  `status` enum('1','0') NOT NULL DEFAULT '1',
  `created_date` datetime NOT NULL,
  `updated_date` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_content`
--

LOCK TABLES `tbl_content` WRITE;
/*!40000 ALTER TABLE `tbl_content` DISABLE KEYS */;
INSERT INTO `tbl_content` VALUES (1,'Contact Us','联系我们','<h3>OLMA Service Center</h3>\r\n\r\n<p>Name: Shanghai Jin Zhong Customer Service Center<br />\r\nAddress: Shanghai,&nbsp;<span style=\"line-height: 20.8px;\">98&nbsp;</span>Huaihai Road, Jin Zhong Guang Chang, Room 1409<br />\r\nZip Code: 200021</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<h3 class=\"phone\">400-6700-168</h3>\r\n','<h3>全国特约维修中心</h3>\r\n\r\n<p>名称：上海金钟客户维修中心<br />\r\n地址：上海市淮海中路98号金钟广场1409室<br />\r\n邮编：200021</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<h3 class=\"phone\">400-6700-168</h3>\r\n','contact-us','1','0000-00-00 00:00:00','2016-06-03 13:50:38');
/*!40000 ALTER TABLE `tbl_content` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_news`
--

DROP TABLE IF EXISTS `tbl_news`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_news` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `news_title_E` varchar(255) NOT NULL,
  `news_title_C` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `news_header_E` varchar(255) NOT NULL,
  `news_header_C` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `news_year` date NOT NULL,
  `news_desc_E` text NOT NULL,
  `news_desc_C` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `news_long_desc_E` text NOT NULL,
  `news_long_desc_C` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `news_image` varchar(255) NOT NULL,
  `news_resize_image` varchar(255) NOT NULL,
  `status` enum('1','0') NOT NULL,
  `is_deleted` enum('n','y') NOT NULL,
  `created_date` datetime NOT NULL,
  `updated_date` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_news`
--

LOCK TABLES `tbl_news` WRITE;
/*!40000 ALTER TABLE `tbl_news` DISABLE KEYS */;
INSERT INTO `tbl_news` VALUES (3,'OLMA','洗手间在哪里','OLMA Brands','“奥尔马传承百年经典”媒体品鉴下午茶','2014-12-23','The idea is to understand the customer so well that you know what motivates them to make a purchase and develop content to guide them toward that destination.','2013年10月16日,瑞士奥尔马OLMA腕表在北京郡王府内古色古香的黔香阁会所举办了“奥尔马传承百年经典”媒体品鉴下午茶,品牌中国区代表矫玫小姐和品牌公关顾问杨靖先生同在座的媒体伙伴们分享了源自瑞士侏罗山谷的经典传承,现场展示的Classical经典系列腕表代表的正是奥尔马源远流长、与时俱进的时代符号，在场的媒体来宾在追溯奥尔马腕表品牌旅程中度过了一个优雅的午后品鉴时光。','The idea is to understand the customer so well that you know what motivates them to make a purchase and develop content to guide them toward that destination.\r\nThe idea is to understand the customer so well that you know what motivates them to make a purchase and develop content to guide them toward that destination.','对于中国的大部分人而言，奥尔马这个品牌是新鲜的，但是当你走进他，当你开始了解奥尔马，你一定会被他所蕴含的气质所打动，追溯奥尔马的足迹你可以感受到他与中国不解的情缘。目前奥尔马品牌在中国内地、香港、澳门、台湾地区总共拥有约200家零售门店，并拥有完善的售后服务体系。 同时，根据市场需求，奥尔马制作出符合市场高、中、低三个层次消费者的腕表。我们很荣幸将奥尔马这样一个高级腕表品牌介绍给北京的大众和媒体伙伴，希望为北京、上海乃至全国的钟表爱好者带去品质卓越的奥尔马腕表臻品。','1460528300-slide-2ipad.jpg','1460528301.jpg','0','n','2016-04-13 11:30:17','2016-05-20 21:53:40');
/*!40000 ALTER TABLE `tbl_news` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_product`
--

DROP TABLE IF EXISTS `tbl_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category_id` int(11) NOT NULL,
  `product_title_eng` varchar(100) NOT NULL,
  `product_title_chi` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `product_model_eng` varchar(50) NOT NULL,
  `product_model_chi` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `product_mrp` varchar(50) NOT NULL,
  `product_image` varchar(100) NOT NULL,
  `product_image_resize` varchar(100) NOT NULL,
  `status` enum('0','1') NOT NULL DEFAULT '1',
  `is_delete` enum('n','y') NOT NULL,
  `created_date` datetime NOT NULL,
  `updated_date` datetime NOT NULL,
  `case_diameter_E` varchar(100) NOT NULL,
  `case_diameter_C` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `case_E` varchar(100) NOT NULL,
  `case_C` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dial_color_E` varchar(100) NOT NULL,
  `dial_color_C` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `water_resistent_E` varchar(100) NOT NULL,
  `order_by` int(11) NOT NULL,
  `water_resistent_C` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_product`
--

LOCK TABLES `tbl_product` WRITE;
/*!40000 ALTER TABLE `tbl_product` DISABLE KEYS */;
INSERT INTO `tbl_product` VALUES (1,2,'Swiss Automatic Watch','瑞士自动机械腕表','K103.0107.001','K103.0107.001','12,600','1463555266-K103-0107-001.png','1463555266.png','1','n','2016-05-18 12:30:11','2016-07-05 05:53:50','40.5MM','直径40.5MM','Stainless Steel','精钢','Silver White','银白','50M',1,'50M'),(2,2,'Swiss Automatic Watch','瑞士自动机械腕表','K103.0103.001','K103.0103.001','12,600','1463555442-K103-0103-001.png','1463555442.png','1','n','2016-05-18 12:33:07','2016-07-05 05:54:51','40.5MM','直径40.5MM','Stainless Steel','精钢','Grey','灰色','50M',2,'50M'),(3,2,'Swiss Automatic Watch',' 瑞士自动机械腕表','K103.0105.001','K103.0105.001','12,600','1463560737-K103-0105-001.png','1463560737.png','1','n','2016-05-18 14:01:22','2016-07-05 05:55:51','40.5MM','直径40.5MM','Stainless Steel','精钢','Blue','蓝色','50M',3,'50M'),(4,1,'Swiss Chronograph Quartz Watch','瑞士计时码石英腕表','B301.1107.107','B301.1107.107','8,300','1463560777-B301-1107-107.png','1463560777.png','1','n','2016-05-18 14:02:02','2016-06-03 12:54:10','42MM','直径42MM','Stainless steel with PVD black coating','精钢/PVD镀黑','Silver','银色','100M',1,' 100M'),(5,2,'Swiss Automatic Watch','瑞士自动机械腕表','K103.0307.001','K103.0307.001','13,000','1463560923-K103-0307-001.png','1463560924.png','1','n','2016-05-18 14:04:29','2016-07-05 05:56:17','40.5MM','直径40.5MM','Stainless Steel with Rose Gold PVD Coating','精钢/PVD镀玫瑰金','Silver White','银白','50M',4,'50M'),(6,1,'Swiss Chronograph Quartz Watch','瑞士计时码石英腕表','B301.0103.111','B301.0103.111','8,300','1463561008-B301-0103-111.png','1463561008.png','1','n','2016-05-18 14:05:53','2016-06-03 12:55:37','42MM','直径42MM','Stainless steel','精钢','Grey','灰色','100M',2,'100M'),(7,2,'Swiss Automatic Watch','瑞士自动机械腕表','K103.0307.003','K103.0307.003','13,600','1463561127-K103-0307-003.png','1463561127.png','1','n','2016-05-18 14:07:52','2016-07-05 05:56:34','40.5MM','直径40.5MM','Stainless Steel with Rose Gold PVD Coating','精钢/PVD镀玫瑰金','Silver White','银白','50M',5,'50M'),(8,1,'Swiss Chronograph Quartz Watch','瑞士计时码石英腕表','B301.1102.107','B301.1102.107','8,300','1463561175-B301-1102-107.png','1463561175.png','1','n','2016-05-18 14:08:40','2016-06-03 12:54:56','42MM','直径42MM','Stainless steel with PVD black coating','精钢/PVD镀黑','Black','黑色','100M',3,'100M'),(9,1,'Swiss Chronograph Quartz Watch','瑞士计时码石英腕表','B301.0107.001','B301.0107.001','8,800','1463561370-B301-0107-001.png','1463561370.png','1','n','2016-05-18 14:11:55','2016-06-03 12:56:03','42MM','直径42MM','Stainless steel','精钢','Silver','银色','100M',4,'100M'),(10,2,'Swiss Automatic Watch','瑞士自动机械腕表','K101.0107.001','K101.0107.001','13,900','1463561560-K101-0107-001.png','1463561561.png','1','n','2016-05-18 14:15:06','2016-07-05 05:57:25','40.5MM','直径40.5MM','Stainless Steel','精钢','Silver White, with 8 pcs of diamond','银白，饰以8颗钻石','50M',6,'50M'),(11,1,'Swiss Chronograph Quartz Watch','瑞士计时码石英腕表','B301.1102.001','B301.1102.001','8,800','1463561664-B301-1102-001.png','1463561665.png','1','n','2016-05-18 14:16:50','2016-06-03 12:56:31','42MM','直径42MM','Stainless steel with PVD black coating','精钢/PVD镀黑',' Black','黑色','100M',5,'100M'),(12,2,'Swiss Automatic Watch','瑞士自动机械腕表','K101.0103.001','K101.0103.001','13,900','1463561708-K101-0103-001.png','1463561708.png','1','n','2016-05-18 14:17:33','2016-07-05 05:58:50','40.5MM','直径40.5MM','Stainless Steel','精钢','Grey, with 8 pcs of diamond','灰色，饰以8颗钻石','50M',7,'50M'),(13,2,'Swiss Automatic Watch','瑞士自动机械腕表','K101.0105.001','K101.0105.001','13,900','1463561857-K101-0105-001.png','1463561858.png','1','n','2016-05-18 14:20:02','2016-07-05 05:59:14','40.5MM','直径40.5MM','Stainless Steel','精钢','Blue, with 8 pcs of diamond','蓝色，饰以8颗钻石','50M',8,'50M'),(14,2,'Swiss Automatic Watch','瑞士自动机械腕表','K101.0307.003','K101.0307.003','14,900','1463561995-K101-0307-003.png','1463561996.png','1','n','2016-05-18 14:22:21','2016-07-05 05:59:39','40.5MM','直径40.5MM','Stainless Steel with Rose Gold PVD Coating','精钢/PVD镀玫瑰金','Silver White, with 8 pcs of diamond','银白，饰以8颗钻石','50M',9,'50M'),(15,2,'Swiss Quartz Watch','瑞士石英腕表','K401.0109.001','K401.0109.001','8,280','1463562147-K401-0109-001.png','1463562148.png','1','n','2016-05-18 14:24:52','2016-07-05 06:00:29','28MM','直径28MM','Stainless Steel with 6 pcs of diamond','精钢，饰以6颗钻石','White MOP','白色贝母','50M',10,'50M'),(16,2,'Swiss Quartz Watch','瑞士石英腕表','K401.0309.001','K401.0309.001','8,980','1463562306-K401-0309-001.png','1463562306.png','1','n','2016-05-18 14:27:31','2016-07-05 06:01:35','28MM','直径28MM','Stainless Steel with Rose Gold PVD Coating and 6 pcs of diamond','精钢，饰以6颗钻石','White MOP','白色贝母','50M',11,'50M'),(17,2,'Swiss Quartz Watch','瑞士石英腕表','K401.0309.003','K401.0309.003','9,280','1463562450-K401-0309-003.png','1463562450.png','1','n','2016-05-18 14:29:55','2016-07-05 06:02:21','28MM','直径28MM','Stainless Steel with Rose Gold PVD Coating and 6 pcs of diamond','精钢，饰以6颗钻石','White MOP','白色贝母','50M',12,'50M'),(18,2,'Swiss Quartz Watch','瑞士石英腕表','K403.0115.001','K403.0115.001','9,380','1463562645-K403-0115-001.png','1463562645.png','1','n','2016-05-18 14:33:10','2016-07-05 06:02:53','31MM','直径31MM','Stainless Steel with 6 pcs of diamond','精钢，饰以6颗钻石','Black MOP, with 10 pcs of diamond','黑色贝母，饰以10颗钻石','50M',13,'50M'),(19,2,'Swiss Quartz Watch','瑞士石英腕表','K403.0309.001','K403.0309.001','9,880','1463562786-K403-0309-001.png','1463562786.png','1','n','2016-05-18 14:35:31','2016-07-05 06:03:13','31MM','直径31MM','Stainless Steel with Rose Gold PVD Coating and 6 pcs of diamond','精钢/PVD镀玫瑰金， 饰以6颗钻石','White MOP, with 10 pcs of diamond','白色贝母，饰以10颗钻石','50M',14,'50M'),(20,3,'Swiss Quartz Watch','瑞士石英腕表','D401.0609.001','D401.0609.001','6,180','1463562849-D401-0609-001.png','1463562849.png','1','n','2016-05-18 14:36:34','2016-07-05 06:10:59','29MM','直径29MM','Stainless Steel, with 19 pcs of diamond','精钢，饰以19颗钻石','White MOP, with 10 pcs of diamond','白色贝母，饰以10颗钻石','50M',1,'50M'),(21,2,'Swiss Quartz Watch','瑞士石英腕表','K403.0309.003','K403.0309.003','10,380','1463562922-K403-0309-003.png','1463562922.png','1','n','2016-05-18 14:37:47','2016-07-05 06:03:37','31MM','直径31MM','Stainless Steel with Rose Gold PVD Coating and 6 pcs of diamond','精钢/PVD镀玫瑰金， 饰以6颗钻石','White MOP, with 10 pcs of diamond','白色贝母，饰以10颗钻石','50M',15,'50M'),(22,3,'Swiss Quartz Watch','瑞士石英腕表','D401.0814.001','D401.0814.001','6,280','1463563038-D401-0814-001.png','1463563038.png','1','n','2016-05-18 14:39:43','2016-07-05 06:11:18','29MM','直径29MM','Stainless Steel with Rose Gold PVD Coating and 19 pcs of diamond','精钢/PVD镀玫瑰金，饰以19颗钻石','Grey MOP, with 10 pcs of diamond','灰色贝母，饰以10颗钻石','50M',2,'50M'),(23,2,'Swiss Automatic Watch','瑞士自动机械腕表','K201.0109.001','K201.0109.001','14,200','1463563058-K201-0109-001.png','1463563058.png','1','n','2016-05-18 14:40:03','2016-07-05 06:04:57','30MM','直径30MM','Stainless Steel with 6 pcs of diamond','精钢，饰以6颗钻石','White MOP, with 11 pcs of diamond','白色贝母，饰以11颗钻石','50M',16,'50M'),(24,2,'Swiss Automatic Watch','瑞士自动机械腕表','K201.0309.001','K201.0309.001','14,600','1463563189-K201-0309-001.png','1463563189.png','1','n','2016-05-18 14:42:14','2016-07-05 06:05:13','30MM','直径30MM','Stainless Steel with Rose Gold PVD Coating and 6 pcs of diamond','精钢/PVD镀玫瑰金， 饰以6颗钻石','White MOP, with 11 pcs of diamond','白色贝母，饰以11颗钻石','50M',16,'50M'),(25,2,'Swiss Automatic Watch','瑞士自动机械腕表','K201.0516.005','K201.0516.005','16,200','1463563359-K201-0516-005.png','1463563359.png','1','n','2016-05-18 14:45:04','2016-07-05 06:05:40','30MM','直径30MM','Stainless Steel with Rose Gold PVD Coating and 6 pcs of diamond','精钢/PVD镀玫瑰金， 饰以6颗钻石','Brown MOP, with 11 pcs of diamond','啡色贝母，饰以11颗钻石','50M',17,'50M'),(26,3,'Swiss Quartz Watch','瑞士石英腕表','D401.0809.003','D401.0809.003','6,580','1463563379-D401-0809-003.png','1463563379.png','1','n','2016-05-18 14:45:24','2016-07-05 06:10:33','29MM','直径29MM','Stainless Steel with Rose Gold PVD Coating and 19 pcs of diamond','精钢/PVD镀玫瑰金，饰以19颗钻石','White MOP, with 10 pcs of diamond','白色贝母，饰以10颗钻石','50M',3,'50M'),(27,2,'Swiss Automatic Watch','瑞士自动机械腕表','K202.0109.107','K202.0109.107','13,500','1463563557-K202-0109-107.png','1463563557.png','1','n','2016-05-18 14:48:22','2016-07-05 06:06:00','30MM','直径30MM','Stainless Steel with 6 pcs of diamond','精钢，饰以6颗钻石','White MOP, with 8 pcs of diamond','白色贝母，饰以8颗钻石','50M',18,'50M'),(28,3,'Swiss Quartz Watch','瑞士石英腕表','D401.0816.003','D401.0816.003','6,580','1463563641-D401-0816-003.png','1463563641.png','1','n','2016-05-18 14:49:46','2016-07-05 06:11:55','29MM','直径29MM','Stainless Steel with Rose Gold PVD Coating and 19 pcs of diamond','精钢/PVD镀玫瑰金，饰以19颗钻石','Brown MOP, with 10 pcs of diamond','啡色贝母，饰以10颗钻石','50M',4,'50M'),(29,2,'Swiss Automatic Watch','瑞士自动机械腕表','K202.0516.108','K202.0516.108','14,500','1463563686-K202-0516-108.png','1463563686.png','1','n','2016-05-18 14:50:31','2016-07-05 06:06:19','30MM','直径30MM','Stainless Steel with Rose Gold PVD Coating and 6 pcs of diamond','精钢/PVD镀玫瑰金， 饰以6颗钻石','Brown MOP, with 8 pcs of diamond','白色贝母，饰以8颗钻石','50M',19,'50M'),(30,2,'Swiss Automatic Watch','瑞士自动机械腕表','K202.0309.003','K202.0309.003','15,200','1463563809-K202-0309-003.png','1463563809.png','1','n','2016-05-18 14:52:34','2016-07-05 06:06:39','30MM','直径30MM','Stainless Steel with Rose Gold PVD Coating and 6 pcs of diamond','精钢/PVD镀玫瑰金， 饰以6颗钻石','White MOP, with 8 pcs of diamond','白色贝母，饰以8颗钻石','50M',20,'50M'),(31,3,'Swiss Quartz Watch','瑞士石英腕表','D401.0609.107','D401.0609.107','5,880','1463563918-D401-0609-107.png','1463563918.png','1','n','2016-05-18 14:54:23','2016-07-05 06:12:08','29MM','直径29MM','Stainless Steel, with 19 pcs of diamond','精钢，饰以19颗钻石','White MOP, with 10 pcs of diamond','白色贝母，饰以10颗钻石','50M',5,'50M'),(32,2,'Swiss Automatic Watch','瑞士自动机械腕表','K104.0107.107','K104.0107.107','11,700','1463564003-K104-0107-107.png','1463564003.png','1','n','2016-05-18 14:55:48','2016-07-05 06:06:55','40.5MM','直径40.5MM','Stainless Steel','精钢','Silver White','银白','50M',21,'50M'),(33,3,'Swiss Quartz Watch','瑞士石英腕表','D401.0809.109','D401.0809.109','6,080','1463564171-D401-0809-109.png','1463564171.png','1','n','2016-05-18 14:58:36','2016-07-05 06:12:46','29MM','直径29MM','Stainless Steel with Rose Gold PVD Coating and 19 pcs of diamond','精钢/PVD镀玫瑰金，饰以19颗钻石','White MOP, with 10 pcs of diamond','白色贝母，饰以10颗钻石','50M',6,'50M'),(34,2,'Swiss Automatic Watch','瑞士自动机械腕表','K104.0103.111','K104.0103.111','11,700','1463564206-K104-0103-111.png','1463564206.png','1','n','2016-05-18 14:59:11','2016-07-05 06:07:11','40.5MM','直径40.5MM','Stainless Steel','精钢','Grey','灰色','50M',22,'50M'),(35,2,'Swiss Automatic Watch','瑞士自动机械腕表','K104.0507.108','K104.0507.108','12,700','1463564421-K104-0507-108.png','1463564421.png','1','n','2016-05-18 15:02:46','2016-07-05 06:07:24','40.5MM','直径40.5MM','Stainless Steel with Rose Gold PVD Coating','精钢/PVD镀玫瑰金','Silver White','银白','50M',23,'50M'),(36,3,'Swiss Quartz Watch','瑞士石英腕表','D401.0815.111','D401.0815.111','6,080','1463564520-D401-0815-111.png','1463564520.png','1','n','2016-05-18 15:04:25','2016-07-05 06:13:05','29MM','直径29MM','Stainless Steel with Rose Gold PVD Coating and 19 pcs of diamond','精钢/PVD镀玫瑰金，饰以19颗钻石','Black MOP, with 10 pcs of diamond','黑色贝母，饰以10颗钻石','50M',7,'50M'),(37,2,'Swiss Automatic Watch','瑞士自动机械腕表','K102.0107.107','K102.0107.107','13,000','1463564565-K102-0107-107.png','1463564565.png','1','n','2016-05-18 15:05:10','2016-07-05 06:07:41','40.5MM','直径40.5MM','Stainless Steel','精钢','Silver White, with 5 pcs of diamond','银白，饰以5颗钻石','50M',24,'50M'),(38,2,'Swiss Automatic Watch','瑞士自动机械腕表','K102.0103.111','K102.0103.111','13,000','1463564724-K102-0103-111.png','1463564724.png','1','n','2016-05-18 15:07:49','2016-07-05 06:07:54','40.5MM','直径40.5MM','Stainless Steel','精钢','Grey, with 5 pcs of diamond','灰色，饰以5颗钻石','50M',25,'50M'),(39,3,'Swiss Quartz Watch','瑞士石英腕表','D401.1009.110','D401.1009.110','6,280','1463564787-D401-1009-110.png','1463564787.png','1','n','2016-05-18 15:08:52','2016-07-05 06:13:22','29MM','直径29MM','Stainless Steel with Rose Gold PVD Coating and 19 pcs of diamond','精钢/PVD镀玫瑰金，饰以19颗钻石','White MOP, with 10 pcs of diamond','白色贝母，饰以10颗钻石','50M',8,'50M'),(40,2,'Swiss Automatic Watch','瑞士自动机械腕表','K102.0507.108','K102.0507.108','14,000','1463564844-K102-0507-108.png','1463564845.png','1','n','2016-05-18 15:09:49','2016-07-05 06:08:08','40.5MM','直径40.5MM','Stainless Steel with Rose Gold PVD Coating','精钢/PVD镀玫瑰金','Silver White, with 5 pcs of diamond','银白，饰以5颗钻石','50M',26,'50M'),(41,2,'Swiss Quartz Watch','瑞士石英腕表','K402.0109.107','K402.0109.107','8,580','1463565008-K402-0109-107.png','1463565008.png','1','n','2016-05-18 15:12:33','2016-07-05 06:08:38','28MM','直径28MM','Stainless Steel with 6 pcs of diamond','精钢，饰以6颗钻石','White MOP, with 2 pcs of diamond','白色贝母，饰以2颗钻石','50M',27,'50M'),(42,3,'Swiss Quartz Watch','瑞士石英腕表','D402.0609.001','D402.0609.001','10,580','1463565037-D402-0609-001.png','1463565037.png','1','n','2016-05-18 15:13:02','2016-07-05 06:13:37','29MM','直径29MM','Stainless Steel, with 79 pcs of diamond','精钢，饰以79颗钻石','White MOP, with 10 pcs of diamond','白色贝母，饰以10颗钻石','50M',9,'50M'),(43,2,'Swiss Quartz Watch','瑞士石英腕表','K402.0312.112','K402.0312.112','9,080','1463565169-K402-0312-112.png','1463565169.png','1','n','2016-05-18 15:15:14','2016-07-05 06:09:02','28MM','直径28MM','Stainless Steel with Rose Gold PVD Coating and 6 pcs of diamond','精钢/PVD镀玫瑰金， 饰以6颗钻石','Pink MOP, with 2 pcs of diamond','粉红色贝母，饰以2颗钻石','50M',28,'50M'),(44,2,'Swiss Quartz Watch','瑞士石英腕表','K402.0513.114','K402.0513.114','9,580','1463565324-K402-0513-114.png','1463565324.png','1','n','2016-05-18 15:17:49','2016-07-05 06:09:18','28MM','直径28MM','Stainless Steel with Rose Gold PVD Coating and 6 pcs of diamond','精钢/PVD镀玫瑰金， 饰以6颗钻石','Beige MOP, with 2 pcs of diamond','杏色贝母，饰以2颗钻石','50M',29,'50M'),(45,3,'Swiss Quartz Watch','瑞士石英腕表','D402.0609.003','D402.0609.003','10,880','1463565383-D402-0609-003.png','1463565383.png','1','n','2016-05-18 15:18:48','2016-07-05 06:13:51','29MM','直径29MM','Stainless Steel with Rose Gold PVD Coating and 79 pcs of diamond','精钢/PVD镀玫瑰金，饰以79颗钻石','White MOP, with 10 pcs of diamond','白色贝母，饰以10颗钻石','50M',10,'50M'),(46,2,'Swiss Quartz Watch','瑞士石英腕表','K402.0511.113','K402.0511.113','9,580','1463565473-K402-0511-113.png','1463565474.png','1','n','2016-05-18 15:20:18','2016-07-05 06:09:40','28MM','直径28MM','Stainless Steel with Rose Gold PVD Coating and 6 pcs of diamond','精钢/PVD镀玫瑰金， 饰以6颗钻石','Purple MOP, with 2 pcs of diamond','紫色贝母，饰以2颗钻石','50M',30,'50M'),(47,2,'Swiss Quartz Watch','瑞士石英腕表','K403.0109.107','K403.0109.107','8,580','1463565592-K403-0109-107.png','1463565593.png','1','n','2016-05-18 15:22:17','2016-07-05 06:09:57','31MM','直径31MM','Stainless Steel with 6 pcs of diamond','精钢，饰以6颗钻石','White MOP, with 10 pcs of diamond','白色贝母，饰以10颗钻石','50M',31,'50M'),(48,2,'Swiss Quartz Watch','瑞士石英腕表','K403.0509.113','K403.0509.113','9,580','1463565707-K403-0509-113.png','1463565707.png','1','n','2016-05-18 15:24:12','2016-07-05 06:10:10','31MM','直径31MM','Stainless Steel with Rose Gold PVD Coating and 6 pcs of diamond','精钢/PVD镀玫瑰金， 饰以6颗钻石','White MOP, with 10 pcs of diamond','白色贝母，饰以10颗钻石','50M',32,'50M');
/*!40000 ALTER TABLE `tbl_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_setting`
--

DROP TABLE IF EXISTS `tbl_setting`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_setting` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `status` enum('1','0') NOT NULL DEFAULT '1',
  `created_date` datetime NOT NULL,
  `update_date` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_setting`
--

LOCK TABLES `tbl_setting` WRITE;
/*!40000 ALTER TABLE `tbl_setting` DISABLE KEYS */;
INSERT INTO `tbl_setting` VALUES (1,'language','0','2016-05-18 09:34:52','0000-00-00 00:00:00'),(2,'news','0','2016-05-18 09:35:46','0000-00-00 00:00:00');
/*!40000 ALTER TABLE `tbl_setting` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_store`
--

DROP TABLE IF EXISTS `tbl_store`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_store` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `city_eng` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `city_chi` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `shop_name_eng` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `shop_name_chi` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `address_eng` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `address_chi` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `status` enum('1','0') NOT NULL DEFAULT '1',
  `is_delete` enum('n','y') NOT NULL,
  `created_date` datetime NOT NULL,
  `updated_date` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_store`
--

LOCK TABLES `tbl_store` WRITE;
/*!40000 ALTER TABLE `tbl_store` DISABLE KEYS */;
INSERT INTO `tbl_store` VALUES (9,'Beijing','北京','Olma Service center','新宇三宝北京翠微大厦店','<ul>\r\n	<li class=\"b\">新宇三宝北京翠微大厦店</li>\r\n	<li>北京市海淀区复兴路33号翠微大厦一层</li>\r\n	<li>邮编<span>100036</span></li>\r\n	<li>&nbsp;</li>\r\n	<li>联系电话：<span class=\"b\">010-68282228</span></li>\r\n</ul>\r\n','<ul>\r\n	<li class=\"b\">新宇三宝北京翠微大厦店</li>\r\n	<li>北京市海淀区复兴路33号翠微大厦一层</li>\r\n	<li>邮编<span>100036</span></li>\r\n	<li>&nbsp;</li>\r\n	<li>联系电话：<span class=\"b\">010-68282228</span></li>\r\n</ul>\r\n','1','n','2016-05-09 17:36:26','2016-07-05 19:29:17'),(10,'Beijing','北京','Olma Service center','盛时表行北京城乡贸易中心店','<p>Olma Service center</p>','<ul>\r\n	<li class=\"b\">盛时表行北京城乡贸易中心店</li>\r\n	<li>北京市海淀区复兴路甲23号城乡购物中心一层</li>\r\n	<li>邮编 <span>100036</span></li>\r\n	<li>&nbsp;</li>\r\n	<li>联系电话：<span class=\"b\">010-68296609</span></li>\r\n</ul>\r\n\r\n \r\n','1','n','2016-05-09 17:36:26','2016-05-09 17:36:26'),(11,'Beijing','北京','Olma Service center','盛时表行北京王府井百货大楼店','<p>Olma Service center</p>\r\n','<ul>\r\n	<li class=\"b\">盛时表行北京王府井百货大楼店</li>\r\n	<li>北京市东城区王府井大街255号百货大楼一层</li>\r\n	<li>邮编 100006</li>\r\n	<li>&nbsp;</li>\r\n	<li>联系电话：<span class=\"b\">010-85115758</span></li>\r\n</ul>\r\n\r\n \r\n','1','n','2016-05-09 17:36:26','2016-05-09 17:36:26'),(12,'Beijing','北京','Olma Service center','盛时表行北京翠微龙德店','<p>Olma Service center</p>','<ul>\r\n	<li class=\"b\">盛时表行北京翠微龙德店</li>\r\n	<li>北京市昌平区立水桥立汤路186号翠微百货</li>\r\n	<li>邮编 <span>102218</span></li>\r\n	<li>&nbsp;</li>\r\n	<li>联系电话：<span class=\"b\">010-84818170</span></li>\r\n</ul>\r\n\r\n ','1','n','2016-05-09 17:36:26','2016-05-09 17:36:30'),(13,'Beijing','北京','Olma Service center','盛时表行北京市王府井百货大兴店','<p>Olma Service center</p>','<ul>\r\n	<li class=\"b\">盛时表行北京市王府井百货大兴店</li>\r\n	<li>北京市大兴区黄村东大街1号王府井百货一层</li>\r\n	<li>邮编 <span>102699</span></li>\r\n	<li>&nbsp;</li>\r\n	<li>联系电话：<span class=\"b\">010-81290432</span></li>\r\n</ul>\r\n\r\n ','1','n','2016-05-09 17:36:26','2016-05-09 17:36:30'),(14,'Beijing','北京','Olma Service center','新宇三宝北京亨得利王府井旗舰店','<p>Olma Service center</p>','<ul>\r\n	<li class=\"b\">新宇三宝北京亨得利王府井旗舰店</li>\r\n	<li>北京市东城区王府井大街176号丹耀大厦一层</li>\r\n	<li>邮编 <span>100005</span></li>\r\n	<li>&nbsp;</li>\r\n	<li>联系电话：<span class=\"b\">010-65253490</span></li>\r\n</ul>\r\n\r\n ','1','n','2016-05-09 17:36:26','2016-05-09 17:36:30'),(15,'Tianjin','天津','Olma Service center','天津亨得利滨江道店','<p>Olma Service center</p>','<ul>\r\n	<li class=\"b\">天津亨得利滨江道店</li>\r\n	<li>天津市和平区滨江道145号</li>\r\n	<li>邮编 <span>300022</span></li>\r\n	<li>&nbsp;</li>\r\n	<li>联系电话：<span class=\"b\">022-27113295</span></li>\r\n</ul>\r\n\r\n ','1','n','2016-05-09 17:36:26','2016-05-09 17:36:30'),(16,'taiyuan','太原','Olma Service center','盛时表行太原王府井百货店','<p>Olma Service center</p>','<ul>\r\n	<li class=\"b\">盛时表行太原王府井百货店</li>\r\n	<li>山西省太原市小店区亲贤街99号王府井百货一层</li>\r\n	<li>邮编 <span>030006</span></li>\r\n	<li>&nbsp;</li>\r\n	<li>联系电话：<span class=\"b\">0351-7887127</span></li>\r\n</ul>\r\n\r\n ','1','n','2016-05-09 17:36:26','2016-05-09 17:36:30'),(17,'taiyuan','太原','Olma Service center','盛时表行太原华宇购物中心店','<p>Olma Service center</p>','<ul>\r\n	<li class=\"b\">盛时表行太原华宇购物中心店</li>\r\n	<li>山西省太原市迎泽区开化寺街87号华宇购物中心一层</li>\r\n	<li>邮编 <span>030002</span></li>\r\n	<li>&nbsp;</li>\r\n	<li>联系电话：<span class=\"b\">0351-8308326</span></li>\r\n</ul>\r\n\r\n ','1','n','2016-05-09 17:36:26','2016-05-09 17:36:30'),(18,'shenyang','沈阳','Olma Service center','新宇三宝沈阳秋林店','<p>Olma Service center</p>','<ul>\r\n	<li class=\"b\">新宇三宝沈阳秋林店</li>\r\n	<li>辽宁省沈阳市和平区中山路90号秋林公司一层</li>\r\n	<li>邮编 <span>110011</span></li>\r\n	<li>&nbsp;</li>\r\n	<li>联系电话：<span class=\"b\">024-23834888</span></li>\r\n</ul>\r\n\r\n ','1','n','2016-05-09 17:36:26','2016-05-09 17:36:30'),(19,'shenyang','沈阳','Olma Service center','新宇三宝沈阳中兴商场店','<p>Olma Service center</p>','<ul>\r\n	<li class=\"b\">新宇三宝沈阳中兴商场店</li>\r\n	<li>辽宁省沈阳市和平区太原北街86号中兴商厦二层</li>\r\n	<li>邮编 <span>110011</span></li>\r\n	<li>&nbsp;</li>\r\n	<li>联系电话：<span class=\"b\">024-23410898</span></li>\r\n</ul>\r\n\r\n ','1','n','2016-05-09 17:36:26','2016-05-09 17:36:30'),(20,'harbin','哈尔滨','Olma Service center','盛时表行哈尔滨新一百购物广场店','<p>Olma Service center</p>','<ul>\r\n	<li class=\"b\">盛时表行哈尔滨新一百购物广场店</li>\r\n	<li>黑龙江省哈尔滨市道里区石头道街118号新一百购物广场一层</li>\r\n	<li>邮编 <span>150001</span></li>\r\n	<li>&nbsp;</li>\r\n	<li>联系电话：<span class=\"b\">0451-87127296</span></li>\r\n</ul>\r\n\r\n ','1','n','2016-05-09 17:36:26','2016-05-09 17:36:30'),(21,'harbin','哈尔滨','Olma Service center','新宇三宝哈尔滨邮局店','<p>Olma Service center</p>','<ul>\r\n	<li class=\"b\">新宇三宝哈尔滨邮局店</li>\r\n	<li>黑龙江省哈尔滨市南岗区建设街51号</li>\r\n	<li>邮编 <span>150001</span></li>\r\n	<li>&nbsp;</li>\r\n	<li>联系电话：<span class=\"b\">0451-53656199</span></li>\r\n</ul>\r\n\r\n ','1','n','2016-05-09 17:36:26','2016-05-09 17:36:30'),(22,'korla','库尔勒','Olma Service center','盛时表行库尔勒汇嘉时代二店','<p>Olma Service center</p>','<ul>\r\n	<li class=\"b\">盛时表行库尔勒汇嘉时代二店</li>\r\n	<li>新疆维吾尔自治区库尔勒市南市区朝阳路9号汇嘉时代广场一层 </li>\r\n	<li>邮编 <span>841000</span></li>\r\n	<li>&nbsp;</li>\r\n	<li>联系电话：<span class=\"b\">0996-8690958</span></li>\r\n</ul>\r\n\r\n ','1','n','2016-05-09 17:36:26','2016-05-09 17:36:30'),(23,'urumqi','乌鲁木齐','Olma Service center','盛时表行乌鲁木齐汇嘉时代北京路店','<p>Olma Service center</p>','<ul>\r\n	<li class=\"b\">盛时表行乌鲁木齐汇嘉时代北京路店</li>\r\n	<li>新疆维吾尔自治区乌鲁木齐市新市区北京中路147号汇嘉时代一层 </li>\r\n	<li>邮编 <span>830000</span></li>\r\n	<li>&nbsp;</li>\r\n	<li>联系电话：<span class=\"b\">0991-3685178</span></li>\r\n</ul>\r\n\r\n ','1','n','2016-05-09 17:36:26','2016-05-09 17:36:30'),(24,'urumqi','乌鲁木齐','Olma Service center','新宇三宝乌鲁木齐中山路店','<p>Olma Service center</p>','<ul>\r\n	<li class=\"b\">新宇三宝乌鲁木齐中山路店</li>\r\n	<li>新疆维吾尔自治区乌鲁木齐市天山区中山路299号世纪名表二层 </li>\r\n	<li>邮编 <span>830000</span></li>\r\n	<li>&nbsp;</li>\r\n	<li>联系电话：<span class=\"b\">0991-2819621</span></li>\r\n</ul>\r\n\r\n ','1','n','2016-05-09 17:36:26','2016-05-09 17:36:30'),(25,'chengdu','成都','Olma Service center','新宇三宝成都航天大厦店','<p>Olma Service center</p>','<ul>\r\n	<li class=\"b\">新宇三宝成都航天大厦店</li>\r\n	<li>四川省成都市锦江区新光华街7号航天科技大厦一层 </li>\r\n	<li>邮编 <span>610020</span></li>\r\n	<li>&nbsp;</li>\r\n	<li>联系电话：<span class=\"b\">028-86757082</span></li>\r\n</ul>\r\n\r\n ','1','n','2016-05-09 17:36:26','2016-05-09 17:36:30'),(26,'chongqing','重庆','Olma Service center','盛时表行重庆南坪百盛店','<p>Olma Service center</p>','<ul>\r\n	<li class=\"b\">盛时表行重庆南坪百盛店</li>\r\n	<li>重庆市南岸区南坪西路2号浪高百盛商场一层 </li>\r\n	<li>邮编 <span>400060</span></li>\r\n	<li>&nbsp;</li>\r\n	<li>联系电话：<span class=\"b\">023-89022140</span></li>\r\n</ul>\r\n\r\n ','1','n','2016-05-09 17:36:26','2016-05-09 17:36:30'),(27,'nanning','南宁','Olma Service center','盛时表行南宁万达百盛购物广场店','<p>Olma Service center</p>','<ul>\r\n	<li class=\"b\">盛时表行南宁万达百盛购物广场店</li>\r\n	<li>广西南宁市朝阳路青云街18号悦荟广场盛时表行百盛购物中心一层 </li>\r\n	<li>邮编 <span>530028</span></li>\r\n	<li>&nbsp;</li>\r\n	<li>联系电话：<span class=\"b\">0771-2639505</span></li>\r\n</ul>\r\n\r\n ','1','n','2016-05-09 17:36:26','2016-05-09 17:36:30'),(28,'liuzhou','柳州','Olma Service center','盛时表行柳州五星商业大厦店','<p>Olma Service center</p>','<ul>\r\n	<li class=\"b\">盛时表行柳州五星商业大厦店</li>\r\n	<li>广西省柳州市中山中路1号五星商业大厦一层 </li>\r\n	<li>邮编 <span>545001</span></li>\r\n	<li>&nbsp;</li>\r\n	<li>联系电话：<span class=\"b\">0772-2096306</span></li>\r\n</ul>\r\n\r\n ','1','n','2016-05-09 17:36:26','2016-05-09 17:36:30'),(29,'guiyang','贵阳','Olma Service center','盛时表行贵阳星力百货店','<p>Olma Service center</p>','<ul>\r\n	<li class=\"b\">盛时表行贵阳星力百货店</li>\r\n	<li>贵州省贵阳市瑞金中路50号星力百货瑞金店一层 </li>\r\n	<li>邮编 <span>550003</span></li>\r\n	<li>&nbsp;</li>\r\n	<li>联系电话：<span class=\"b\">0851-85280165</span></li>\r\n</ul>\r\n\r\n ','0','n','2016-05-09 17:36:26','2016-05-09 17:36:30'),(30,'guiyang','贵阳','Olma Service center','盛时表行贵阳国贸金阳店','<p>Olma Service center</p>','<ul>\r\n	<li class=\"b\">盛时表行贵阳国贸金阳店</li>\r\n	<li>贵州省贵阳市金阳新区金阳南路6号金源世纪购物中心A座国贸一层 </li>\r\n	<li>邮编 <span>550081</span></li>\r\n	<li>&nbsp;</li>\r\n	<li>联系电话：<span class=\"b\">0851-84776413</span></li>\r\n</ul>\r\n\r\n ','1','n','2016-05-09 17:36:26','2016-05-09 17:36:30'),(31,'kunming','昆明','Olma Service center','盛时表行昆明顺城王府井店','<p>Olma Service center</p>','<ul>\r\n	<li class=\"b\">盛时表行昆明顺城王府井店</li>\r\n	<li>云南省昆明市沿河路7号王府井百货一层 </li>\r\n	<li>邮编 <span>650021</span></li>\r\n	<li>&nbsp;</li>\r\n	<li>联系电话：<span class=\"b\">0871-63613500</span></li>\r\n</ul>\r\n\r\n ','1','n','2016-05-09 17:36:26','2016-05-09 17:36:30'),(32,'fuzhou','福州','Olma Service center','盛时表行福州东百店','<p>Olma Service center</p>','<ul>\r\n	<li class=\"b\">盛时表行福州东百店</li>\r\n	<li>福建省福州市八一七北路84号一层 </li>\r\n	<li>邮编 <span>350025</span></li>\r\n	<li>&nbsp;</li>\r\n	<li>联系电话：<span class=\"b\">0591-87554706</span></li>\r\n</ul>\r\n\r\n ','1','n','2016-05-09 17:36:26','2016-05-09 17:36:30'),(33,'shenzhen','深圳','Olma Service center','盛时表行深圳华强茂业店','<p>Olma Service center</p>','<ul>\r\n	<li class=\"b\">盛时表行深圳华强茂业店</li>\r\n	<li>广州省深圳市福田区华强北茂业百货一层</li>\r\n	<li>邮编 <span>518031</span></li>\r\n	<li>&nbsp;</li>\r\n	<li>联系电话：<span class=\"b\">0755-83019368</span></li>\r\n</ul>\r\n\r\n ','1','n','2016-05-09 17:36:26','2016-05-09 17:36:30'),(34,'zhengzhou','郑州','Olma Service center','盛时表行郑州丹尼斯百货人民路店','<p>Olma Service center</p>','<ul>\r\n	<li class=\"b\">盛时表行郑州丹尼斯百货人民路店</li>\r\n	<li>河南省郑州市金水区人民路2号丹尼斯百货一层</li>\r\n	<li>邮编 <span>450000</span></li>\r\n	<li>&nbsp;</li>\r\n	<li>联系电话：<span class=\"b\">0371-66202669</span></li>\r\n</ul>\r\n\r\n ','1','n','2016-05-09 17:36:26','2016-05-09 17:36:30'),(35,'zhengzhou','郑州','Olma Service center','盛时表行郑州大商新玛特金博大店','<p>Olma Service center</p>','<ul>\r\n	<li class=\"b\">盛时表行郑州大商新玛特金博大店</li>\r\n	<li>河南省郑州市二七区二七路200号一层</li>\r\n	<li>邮编 <span>450000</span></li>\r\n	<li>&nbsp;</li>\r\n	<li>联系电话：<span class=\"b\">0371-67010682</span></li>\r\n</ul>\r\n\r\n ','1','n','2016-05-09 17:36:26','2016-05-09 17:36:30'),(36,'luoyang','洛阳','Olma Service center','盛时表行洛阳王府井二店','<p>Olma Service center</p>','<ul>\r\n	<li class=\"b\">盛时表行洛阳王府井二店</li>\r\n	<li>河南省洛阳市涧西区南昌路王府井购物中心一层</li>\r\n	<li>邮编 <span>471000</span></li>\r\n	<li>&nbsp;</li>\r\n	<li>联系电话：<span class=\"b\">0379-80873228</span></li>\r\n</ul>\r\n\r\n ','1','n','2016-05-09 17:36:26','2016-05-09 17:36:30'),(37,'shanghai','上海','Olma Service center','456三联亨得利总店','<p>Olma Service center</p>','<ul>\r\n	<li class=\"b\">456三联亨得利总店</li>\r\n	<li>上海市黄浦区南京东路456号亨得利钟表店</li>\r\n	<li>邮编 <span>200001</span></li>\r\n	<li>&nbsp;</li>\r\n	<li>联系电话：<span class=\"b\">021-63522500</span></li>\r\n</ul>\r\n\r\n ','1','n','2016-05-09 17:36:26','2016-05-09 17:36:30'),(38,'suzhou','苏州','Olma Service center','盛时表行苏州石路国际商城店','<p>Olma Service center</p>','<ul>\r\n	<li class=\"b\">盛时表行苏州石路国际商城店</li>\r\n	<li>江苏省苏州市石路18号</li>\r\n	<li>邮编 <span>215008</span></li>\r\n	<li>&nbsp;</li>\r\n	<li>联系电话：<span class=\"b\">0512-65090568</span></li>\r\n</ul>\r\n\r\n ','1','n','2016-05-09 17:36:26','2016-05-09 17:36:30'),(39,'suzhou','苏州','Olma Service center','盛时表行苏州世家名表店','<p>Olma Service center</p>','<ul>\r\n	<li class=\"b\">盛时表行苏州世家名表店</li>\r\n	<li>江苏省苏州市邵磨针巷88号</li>\r\n	<li>邮编 <span>215005</span></li>\r\n	<li>&nbsp;</li>\r\n	<li>联系电话：<span class=\"b\">0512-65155557</span></li>\r\n</ul>\r\n\r\n ','1','n','2016-05-09 17:36:26','2016-05-09 17:36:30'),(40,'hangzhou','杭州','Olma Service center','新宇三宝杭州大厦店','<p>Olma Service center</p>','<ul>\r\n	<li class=\"b\">新宇三宝杭州大厦店</li>\r\n	<li>浙江省杭州市拱墅区杭州大厦购物城D座一层</li>\r\n	<li>邮编 <span>310014</span></li>\r\n	<li>&nbsp;</li>\r\n	<li>联系电话：<span class=\"b\">0576-81726825</span></li>\r\n</ul>\r\n\r\n ','1','n','2016-05-09 17:36:26','2016-05-09 17:36:30'),(41,'yancheng','盐城','Olma Service center','盛时表行盐城金鹰国际购物中心店','<p>Olma Service center</p>','<ul>\r\n	<li class=\"b\">盛时表行盐城金鹰国际购物中心店</li>\r\n	<li>江苏省盐城市建军中路169号盐城金鹰购物中心一层</li>\r\n	<li>邮编 <span>224000</span></li>\r\n	<li>&nbsp;</li>\r\n	<li>联系电话：<span class=\"b\">0515-83078168</span></li>\r\n</ul>\r\n\r\n ','1','n','2016-05-09 17:36:26','2016-05-09 17:36:30'),(42,'yancheng','盐城','Olma Service center','盛时表行盐城金鹰购物中心聚龙湖店','<p>Olma Service center</p>','<ul>\r\n	<li class=\"b\">盛时表行盐城金鹰购物中心聚龙湖店</li>\r\n	<li>江苏省盐城市亭湖区解放南路268号聚龙湖金鹰购物中心一层</li>\r\n	<li>邮编 <span>224000</span></li>\r\n	<li>&nbsp;</li>\r\n	<li>联系电话：<span class=\"b\">0515-68606698</span></li>\r\n</ul>\r\n\r\n ','1','n','2016-05-09 17:36:26','2016-05-09 17:36:30'),(43,'taizhou','泰州','Olma Service center','盛时表行泰州金鹰国际购物中心店','<p>Olma Service center</p>','<ul>\r\n	<li class=\"b\">盛时表行泰州金鹰国际购物中心店</li>\r\n	<li>江苏省泰州市海陵区东进东路18号金鹰国际购物中心一层</li>\r\n	<li>邮编 <span>225300</span></li>\r\n	<li>&nbsp;</li>\r\n	<li>联系电话：<span class=\"b\">0523-86224005</span></li>\r\n</ul>\r\n\r\n ','1','n','2016-05-09 17:36:26','2016-05-09 17:36:30'),(44,'nanchang','南昌','Olma Service center','盛时表行南昌亨得利店','<p>Olma Service center</p>','<ul>\r\n	<li class=\"b\">盛时表行南昌亨得利店</li>\r\n	<li>江西省南昌市胜利路28号</li>\r\n	<li>邮编 <span>330008</span></li>\r\n	<li>&nbsp;</li>\r\n	<li>联系电话：<span class=\"b\">0791-86537006</span></li>\r\n</ul>\r\n\r\n ','1','n','2016-05-09 17:36:26','2016-05-09 17:36:30'),(45,'hongkong','香港','Olma Service center','三宝钟表珠宝','<p>Olma Service center</p>','<ul>\r\n	<li class=\"b\">三宝钟表珠宝</li>\r\n	<li>香港沙田新城市广场一期318-319铺</li>\r\n	<li>邮编 <span>999077</span></li>\r\n	<li>&nbsp;</li>\r\n	<li>联系电话：<span class=\"b\">00852-34285620</span></li>\r\n</ul>\r\n\r\n ','1','n','2016-05-09 17:36:26','2016-05-09 17:36:30'),(46,'Shenyang','沈阳','OLMA Service','时 全饰美沈阳今旅名表坊','<p>olma service</p>\r\n','<ul>\r\n	<li class=\"b\">时全饰美沈阳今旅名表坊</li>\r\n	<li>沈阳市和平区中华路68号今旅酒店一层</li>\r\n	<li>邮编 <span>110011</span></li>\r\n	<li>&nbsp;</li>\r\n	<li>联系电话：<span class=\"b\">024-24537777</span></li>\r\n</ul>\r\n','1','n','2016-06-08 14:24:27','2016-06-08 15:05:41'),(48,'Wuhan','武汉','Xinyu Elegant, Old Hengdali Store','新宇三宝武汉老亨达利名表','<ul style=\"line-height: 20.8px;\">\r\n	<li class=\"b\">Xinyu Elegant, Old Hengdali Store</li>\r\n	<li>Pufa Bank Tower, No.218 Xinhua Street, Wuhan, Hubei Province, PRC</li>\r\n	<li>Postal Code&nbsp;430022</li>\r\n	<li>&nbsp;</li>\r\n	<li>Tel：027-82840799</li>\r\n</ul>\r\n','<ul style=\"line-height: 20.8px;\">\r\n	<li class=\"b\">新宇三宝武汉老亨达利名表</li>\r\n	<li style=\"box-sizing: border-box; outline: none; margin: 0px; padding: 0px;\">湖北省武汉市新华路218号浦发银行大厦</li>\r\n	<li>邮编&nbsp;<span style=\"line-height: 20.8px;\">430022</span></li>\r\n	<li>&nbsp;</li>\r\n	<li>联系电话：027-82840799</li>\r\n</ul>\r\n','1','n','2016-08-03 14:10:39','2016-08-03 14:10:39');
/*!40000 ALTER TABLE `tbl_store` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_user`
--

DROP TABLE IF EXISTS `tbl_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(128) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(128) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(128) COLLATE utf8_unicode_ci NOT NULL,
  `roleType` enum('A','U') COLLATE utf8_unicode_ci NOT NULL COMMENT 'A=>Admin,U=> User',
  `profile` text COLLATE utf8_unicode_ci,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_user`
--

LOCK TABLES `tbl_user` WRITE;
/*!40000 ALTER TABLE `tbl_user` DISABLE KEYS */;
INSERT INTO `tbl_user` VALUES (1,'admin','$2a$10$JTJf6/XqC94rrOtzuF397OHa4mbmZrVTBOQCmYD9U.obZRUut4BoC','webmaster@example.com','A',NULL);
/*!40000 ALTER TABLE `tbl_user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-08-03 15:36:23
