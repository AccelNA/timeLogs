# Security
============

In this application, there are two types of users previlages are available.

* Admin
* Employee
 
The **Admin** is the super user and **Employee** have some resctriction to access the some modules. The react router is only showing their navigation link according to user login. THe Admin can confogure all essential items for the application. The Employee can access these items.

The authentication operation are also based on token system. When user is trying to login, then as normal it will check all essential credentials and if the credential are acceptable then it will generate the token. These token are stored temporarly and check with each request.


