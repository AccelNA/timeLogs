-- phpMyAdmin SQL Dump
-- version 3.3.9
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Apr 01, 2015 at 01:12 PM
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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `client`
--

INSERT INTO `client` (`client_id`, `client_name`, `client_website`, `client_email`, `client_phone`, `client_fax`, `client_address1`, `client_address2`, `client_city`, `client_state`, `client_postcode`, `client_country`, `client_created_date`) VALUES
(1, 'First Client', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2015-03-26 10:40:41'),
(2, 'Second Client', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2015-03-26 17:28:28');

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=36 ;

--
-- Dumping data for table `project`
--

INSERT INTO `project` (`project_id`, `project_name`, `project_description`, `project_is_billable`, `project_client_id`, `project_created_date`) VALUES
(5, 'vb', 'vbvb', 'yes', 1, '2015-03-26 14:28:37'),
(6, 'rrtvv', 'rtrtvv', 'yes', 1, '2015-03-26 14:28:41'),
(9, 'dd', 'ddd', 'yes', 1, '2015-03-26 15:12:23'),
(18, 'nnnnnnn', 'nnnnn', 'Yes', 1, '2015-03-26 17:15:26'),
(19, 'fdg', 'fgfdgfd', 'Yes', 1, '2015-03-27 13:37:36'),
(20, '', 'fgfdgfd', 'Yes', 1, '2015-03-27 13:37:37'),
(21, '', 'fgfdgfd', 'Yes', 1, '2015-03-27 13:37:37'),
(22, '', 'fgfdgfd', 'Yes', 1, '2015-03-27 13:37:37'),
(23, '', 'fgfdgfd', 'Yes', 1, '2015-03-27 13:37:37'),
(24, '', 'fgfdgfd', 'Yes', 1, '2015-03-27 13:37:37'),
(25, '', 'fgfdgfd', 'Yes', 1, '2015-03-27 13:37:38'),
(26, '', 'fgfdgfd', 'Yes', 1, '2015-03-27 13:37:38'),
(27, '', 'fgfdgfd', 'Yes', 1, '2015-03-27 13:37:38'),
(28, '', 'fgfdgfd', 'Yes', 1, '2015-03-27 13:37:38'),
(29, '', 'fgfdgfd', 'Yes', 1, '2015-03-27 13:37:38'),
(30, '', 'fgfdgfd', 'Yes', 1, '2015-03-27 13:37:38'),
(31, '', 'fgfdgfd', 'Yes', 1, '2015-03-27 13:37:39'),
(32, '', 'fgfdgfd', 'Yes', 1, '2015-03-27 13:37:39'),
(33, '', 'fgfdgfd', 'Yes', 1, '2015-03-27 13:37:39'),
(34, '', 'fgfdgfd', 'Yes', 1, '2015-03-27 13:37:39'),
(35, '', 'fgfdgfd', 'Yes', 1, '2015-03-27 13:37:39');

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
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=52 ;

--
-- Dumping data for table `task`
--

INSERT INTO `task` (`task_id`, `task_name`, `task_project_id`, `task_notes`) VALUES
(12, 'Third', 5, 'Second Note'),
(7, 'Second', 5, 'Second Note'),
(10, 'First', 0, 'First Note'),
(13, 'Fourth', 0, 'Second Note'),
(14, '7000000000', 3, 'fffff'),
(15, 'Sixth', 0, 'Second Note'),
(16, 'tyty', 0, 'ty'),
(17, 'tytytytyty', 0, 'tytyty'),
(18, 'tytytytytytytyty', 0, 'tytytyty'),
(19, 'tytytytytytytyty', 0, 'tytytyty'),
(20, 'tytytytytytytyty', 0, 'tytytyty'),
(21, 'tytytytytytytyty', 0, 'tytytyty'),
(22, 'tytytytytytytyty', 0, 'tytytyty'),
(23, 'tytytytytytytyty', 0, 'tytytyty'),
(24, 'tytytytytytytyty', 0, 'tytytyty'),
(25, 'tytytytytytytyty', 0, 'tytytyty'),
(26, 'tytytytytytytyty', 0, 'tytytyty'),
(27, 'tytytytytytytyty', 0, 'tytytyty'),
(28, 'tytytytytytytyty', 0, 'tytytyty'),
(29, 'tytytytytytytyty', 0, 'tytytyty'),
(30, 'tytytytytytytyty', 0, 'tytytyty'),
(31, 'tytytytytytytyty', 0, 'tytytyty'),
(32, 'tytytytytytytyty', 0, 'tytytyty'),
(33, 'tytytytytytytyty', 0, 'tytytyty'),
(34, 'tytytytytytytyty', 0, 'tytytyty'),
(35, 'tytytytytytytyty', 0, 'tytytyty'),
(36, 'tytytytytytytyty', 0, 'tytytyty'),
(37, 'tytytytytytytyty', 0, 'tytytyty'),
(51, 'hjhgj', 2, 'hgjhgj'),
(40, 'ccccccccccccccccccccccccccccccc', 5, 'qqaaqaaq');

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=24 ;

--
-- Dumping data for table `timesheet`
--

INSERT INTO `timesheet` (`timesheet_id`, `timesheet_user_id`, `timesheet_task_id`, `timesheet_date`, `timesheet_hours`, `timesheet_status`, `timesheet_updated_date`) VALUES
(1, 5, 12, '2015-03-30', 5, 'active', '2015-03-30 10:38:23'),
(2, 5, 12, '2015-03-30', 5, 'Active', '2015-03-30 14:53:57'),
(3, 5, 12, '2015-03-30', 5, 'Active', '2015-03-30 14:54:46'),
(4, 5, 12, '2015-03-30', 5, 'Active', '2015-03-30 14:56:12'),
(5, 5, 12, '2015-03-30', 7, 'Active', '2015-03-30 14:56:50'),
(6, 5, 12, '2015-03-30', 5, 'Active', '2015-03-30 14:58:16'),
(7, 5, 12, '2015-03-29', 5, 'Active', '2015-03-30 14:58:41'),
(9, 5, 7, '2015-03-29', 5, 'Active', '2015-03-30 17:07:11'),
(10, 5, 5, '2015-03-31', 4, 'Active', '2015-03-31 10:40:54'),
(11, 5, 6, '2015-03-31', 4, 'Active', '2015-03-31 10:41:01'),
(12, 5, 6, '2015-03-31', 4, 'Active', '2015-03-31 10:41:25'),
(22, 5, 6, '2015-03-31', 6, 'Active', '2015-03-31 13:11:08'),
(23, 5, 7, '2015-03-31', 6, 'Active', '2015-03-31 13:11:14');

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
  `user_auth_token` varchar(512) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `user_first_name`, `user_last_name`, `user_employee_id`, `user_email`, `user_password`, `user_role_id`, `user_auth_token`) VALUES
(5, 'jagadeesh', 'p', '1666', 'jag@email.com', '202cb962ac59075b964b07152d234b70', 2, '435345345435435435fgdfg435');
