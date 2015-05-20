-- phpMyAdmin SQL Dump
-- version 3.3.9
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: May 20, 2015 at 07:53 AM
-- Server version: 5.1.53
-- PHP Version: 5.3.4

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `accel_timesheet`
--

-- --------------------------------------------------------

--
-- Table structure for table `client`
--

CREATE TABLE IF NOT EXISTS `client` (
  `client_id` int(11) NOT NULL AUTO_INCREMENT,
  `client_name` varchar(512) NOT NULL,
  `client_website` varchar(512) DEFAULT NULL,
  `client_email` varchar(256) DEFAULT NULL,
  `client_phone` int(11) DEFAULT NULL,
  `client_fax` int(11) DEFAULT NULL,
  `client_address1` varchar(512) DEFAULT NULL,
  `client_address2` varchar(512) DEFAULT NULL,
  `client_city` varchar(512) DEFAULT NULL,
  `client_state` varchar(512) DEFAULT NULL,
  `client_postcode` int(11) DEFAULT NULL,
  `client_country` varchar(512) DEFAULT NULL,
  `client_created_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`client_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

--
-- Dumping data for table `client`
--

INSERT INTO `client` (`client_id`, `client_name`, `client_website`, `client_email`, `client_phone`, `client_fax`, `client_address1`, `client_address2`, `client_city`, `client_state`, `client_postcode`, `client_country`, `client_created_date`) VALUES
(1, 'HP', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2015-04-06 16:20:07'),
(2, 'GE', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2015-04-06 16:20:07'),
(3, 'FaceBook', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2015-04-06 16:20:28'),
(4, 'Amazon', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2015-04-06 16:20:28');

-- --------------------------------------------------------

--
-- Table structure for table `project`
--

CREATE TABLE IF NOT EXISTS `project` (
  `project_id` int(11) NOT NULL AUTO_INCREMENT,
  `project_name` varchar(512) NOT NULL,
  `project_description` text NOT NULL,
  `project_is_billable` char(3) NOT NULL DEFAULT 'yes',
  `project_client_id` int(11) NOT NULL,
  `project_created_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`project_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=26 ;

--
-- Dumping data for table `project`
--

INSERT INTO `project` (`project_id`, `project_name`, `project_description`, `project_is_billable`, `project_client_id`, `project_created_date`) VALUES
(20, 'New GE Project', 'New GE', 'Yes', 2, '2015-04-27 12:17:35'),
(22, 'Cloud Project', 'New Cloud Project', 'Yes', 4, '2015-04-27 12:18:13'),
(23, 'New FB Project', 'New FB', 'Yes', 3, '2015-04-27 12:17:49'),
(24, 'Native React', 'IOS', 'Yes', 3, '2015-05-13 10:33:16'),
(25, 'React work', 'Small App', 'Yes', 3, '2015-05-13 10:40:38');

-- --------------------------------------------------------

--
-- Table structure for table `project_assign_user`
--

CREATE TABLE IF NOT EXISTS `project_assign_user` (
  `project_assign_user_id` int(11) NOT NULL AUTO_INCREMENT,
  `project_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`project_assign_user_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=118 ;

--
-- Dumping data for table `project_assign_user`
--

INSERT INTO `project_assign_user` (`project_assign_user_id`, `project_id`, `user_id`) VALUES
(2, 22, 8),
(3, 20, 8),
(70, 20, 5),
(69, 22, 5),
(68, 23, 5),
(56, 23, 8),
(55, 22, 8),
(54, 20, 5),
(109, 24, 11),
(110, 24, 5),
(117, 0, 0),
(116, 0, 0),
(115, 24, 5);

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE IF NOT EXISTS `role` (
  `role_id` int(11) NOT NULL AUTO_INCREMENT,
  `role_name` varchar(512) NOT NULL,
  PRIMARY KEY (`role_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`role_id`, `role_name`) VALUES
(1, 'ADMIN'),
(2, 'USER'),
(3, 'GUEST');

-- --------------------------------------------------------

--
-- Table structure for table `task`
--

CREATE TABLE IF NOT EXISTS `task` (
  `task_id` int(11) NOT NULL AUTO_INCREMENT,
  `task_name` varchar(264) NOT NULL,
  `task_project_id` int(11) NOT NULL,
  `task_notes` text NOT NULL,
  PRIMARY KEY (`task_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=23 ;

--
-- Dumping data for table `task`
--

INSERT INTO `task` (`task_id`, `task_name`, `task_project_id`, `task_notes`) VALUES
(1, 'React js', 23, 'This is Demo application'),
(12, 'EC2', 23, 'New EC2 project'),
(13, ' Network ', 23, 'Network Project'),
(22, 'React Storm', 23, 'New React'),
(21, 'React Rocks', 23, 'New React ');

-- --------------------------------------------------------

--
-- Table structure for table `timesheet`
--

CREATE TABLE IF NOT EXISTS `timesheet` (
  `timesheet_id` int(11) NOT NULL AUTO_INCREMENT,
  `timesheet_user_id` int(11) NOT NULL,
  `timesheet_task_id` int(11) NOT NULL,
  `timesheet_date` date NOT NULL,
  `timesheet_hours` int(11) NOT NULL,
  `timesheet_status` varchar(128) NOT NULL,
  `timesheet_updated_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`timesheet_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=85 ;

--
-- Dumping data for table `timesheet`
--

INSERT INTO `timesheet` (`timesheet_id`, `timesheet_user_id`, `timesheet_task_id`, `timesheet_date`, `timesheet_hours`, `timesheet_status`, `timesheet_updated_date`) VALUES
(79, 5, 13, '2015-05-20', 1, 'Active', '2015-05-20 11:58:50'),
(80, 5, 12, '2015-05-19', 2, 'Active', '2015-05-20 11:59:19'),
(81, 5, 1, '2015-05-20', 2, 'Active', '2015-05-20 11:59:48'),
(82, 8, 22, '2015-05-20', 1, 'Active', '2015-05-20 12:02:10'),
(83, 8, 21, '2015-05-20', 5, 'Active', '2015-05-20 12:02:16'),
(84, 5, 13, '2015-05-15', 10, 'Active', '2015-05-20 12:04:27');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_first_name` varchar(512) NOT NULL,
  `user_last_name` varchar(512) NOT NULL,
  `user_employee_id` varchar(512) NOT NULL,
  `user_email` varchar(256) NOT NULL,
  `user_password` varchar(512) NOT NULL,
  `user_role_id` int(11) NOT NULL,
  `user_auth_token` varchar(2048) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=9 ;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `user_first_name`, `user_last_name`, `user_employee_id`, `user_email`, `user_password`, `user_role_id`, `user_auth_token`) VALUES
(5, 'jag', 'p', '1666', 'jag@email.com', '202cb962ac59075b964b07152d234b70', 2, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiVVNFUiIsInVzZXJJZCI6IjUifQ.O_P4Zkd9AOTpvQt7wecUsx9yH2xh3A3Q6jdpyVJWcQ0'),
(8, 'admin', 'ad', '1', 'admin@email.com', '202cb962ac59075b964b07152d234b70', 1, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiQURNSU4iLCJ1c2VySWQiOiI4In0.VATRaJfLGKmtdMZahSy9Hi8yoIqAYQ0cyawus1J-ENE');
