# Security
============

In this application, there are two types of users previlages are available.

* Admin
* Employee
 
The **Admin** is the super user and **Employee** have some resctriction to access the some modules. The react router is only showing their navigation link according to user login. THe Admin can configure all essential items for the application. The Employee can access these items.

The authentication operation are also based on token system. When user is trying to login, then as normal it will check all essential credentials and if the credential are acceptable then it will generate the token. These token are stored temporarly and check with each request.

Here In this application, we are using JSON Web Tokens system(JWT). For understanding more about JWT, You can find all details from [here](http://jwt.io/).

For implementing JWT system in this application, we are following the steps from a node package which is named as [jwt simple](https://www.npmjs.com/package/jwt-simple). First we need to install these package in to this application. 

**_npm install jwt-simple_**

Next step is, you need to login with your creadentials. In this time, authentication is checked with login details. If authentication is success then it will return success message with some user details. The login operation is carried in this [file](https://github.com/AccelNA/timeLogs/blob/master/Web/js/RESTService/Get.js). Here a function name _authGet_ handling all these operation. 

In this file we created an object for _jwt-simple_. Then we creating a object which contains user id and user role. Here the object name is **payload**. The [configuration file](https://github.com/AccelNA/timeLogs/blob/master/Web/js/config/ConfigComp.js) have a secret key. This secret key is using for encode operation.

For generating encrypted key or token, we have used **encode()** function which is inbuild function in jwt package. This function accept two parameters, First parameter is user details data. Here this information is stored in **payload** object. The second parameter is **secret** key. These key value gets from config file. The function

    var token   = jwt.encode(payload, secret);  
is generating a token, which is stored in token varable and these value are stored temporarly in cookie.  



