# timeLogs 
===============

TimeLogs is a timesheet tool for managing time on perticular task which comes under different projects.

###Table of Contents  
* [Technologies Used][]
* [Features][]
* [Functionality][]
* [How to build][]

##Technologies Used

* Frontend Library: ReactJS
* Database: MySql
* Server-side: PHP
* REST API Service

##<a name="Features"></a>Features
TimeLogs is a tool which is used to track entire time for each task. TimeLogs is a way to implemet timesheet in a organisation. Timesheet is a method for recording the amount of a worker's time spent on each job. Here two different types of user interface can used for  different user role like Admin or Employee. In employee's User Interface, there are two main pages are available. One is used to time entering for one day and other link is used to enter the time for one week. Here we can see the time table for current day. The second inteface is for admin, Whch contains all the configuration part like all Create, Edit, Delete for Client, Project, Task and User etc. Here we can assign each task to any employee in the organisation. 

Timelogs is mainly focus to implement **ReactJS** and it's different **React components**. Entire application is build based on **FLUX** architecture. Here backend is **RESTful** service with **PHP** and **MySql**. Another important feature is authontication is based on **token**. So auth data treated as stateless.      

##<a name="Functionality"></a>Functionality

* Login for user
* For Admin: Create, Edit, Delete, Update, search, filter and pagination Client
* For Admin: Create, Edit, Delete, Update, search, filter and pagination Project
* For Admin: Create, Edit, Delete, Update, search, filter and pagination Task
* For Admin: Create, Edit, Delete, Update, search, filter and pagination User/Employee
* For Admin: Assign Employee to task.
* For Employee: Insert/Delete timesheet for a day.
* For Employee: Inset/Delete tomesheet for a week 

##Screenshots
* Home Page
![Home Page](https://github.com/AccelNA/aws-coe/blob/master/contents/images/timeLogsLogin.png)<br/>
<hr/>
* Login Page
![Home Page](https://github.com/AccelNA/aws-coe/blob/master/contents/images/TimeLogsLogin2.png)<br/>
<hr/>

* Admin Home Page

In this page, You can slect different navigation link. This page only for logged in as a Admin. 

![Admin Home Page](https://github.com/AccelNA/aws-coe/blob/master/contents/images/timeLogsAdminHome.png)<br/>
<hr/>
* Project Page
![Project List Page](https://github.com/AccelNA/aws-coe/blob/master/contents/images/timeLogsprojectName.png)<br/>
<hr/>
* Project Edit Page
![Project List Page](https://github.com/AccelNA/aws-coe/blob/master/contents/images/ProjectEditPage.png)<br/>
<hr/>
* Project Search Page
![Project List Page](https://github.com/AccelNA/aws-coe/blob/master/contents/images/timelogProjectSearch.png)<br/>
<hr/>

* Task page
![Project List Page](https://github.com/AccelNA/aws-coe/blob/master/contents/images/TimeLogTaskpage.png)<br/>
<hr/>

* User/Employee List Page
![Project List Page](https://github.com/AccelNA/aws-coe/blob/master/contents/images/timeLogsUserPage.png)<br/>
<hr/>

* Client Page
![Project List Page](https://github.com/AccelNA/aws-coe/blob/master/contents/images/Client Adding page.png)<br/>
<hr/>

* Assign an employee to project 
![Project List Page](https://github.com/AccelNA/aws-coe/blob/master/contents/images/TImeLogsProject-Employee-Assign.png)<br/>
<hr/>

* User/Employee Page

This is the Home page for User/Employee

![Project List Page](https://github.com/AccelNA/aws-coe/blob/master/contents/images/timeLogsEMPLOYEEPage.png)<br/>
<hr/>

* Time Entry For A Day

In this page, you can enter time for each corresponding to task. 

![Project List Page](https://github.com/AccelNA/aws-coe/blob/master/contents/images/TimeSheetEmployeeOneDay.png)<br/>
<hr/>

* Time Entry For A Week

In this page, you can enter time for each corresponding to task. 

![Project List Page](https://github.com/AccelNA/aws-coe/blob/master/contents/images/timeLogsMultiEntry.png)<br/>
<hr/>


##<a name="Build"></a>How to build
To Build this application, You need to have some configurations done in your root folder.

##Prerequisites

* First you need to install Node.js. In this application we have used different types of Node packeages. You can find [installation details from here](https://nodejs.org).
* Inserver side we are using php and databse is MySql, So you need to install [WAMP server](http://www.wampserver.com/en/) or [LAMP Server](https://help.ubuntu.com/community/ApacheMySQLPHP).
* Next set is to configure the configuration file according to your root folder. File location are showing [here](https://github.com/AccelNA/timeLogs/blob/master/Web/js/config/ConfigComp.js). 

[Technologies Used]: #Technology
[Features]: #Features
[Functionality]: #Functionality
[How to build]: #Build

