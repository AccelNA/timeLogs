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

For generating encrypted key or token, we have used **encode()** function which is inbuild function in jwt package. This function accept two parameters, First parameter is user details data. Here this information is stored in **payload** object. The second parameter is **secret** key. 

The secrete key available in config.js file is as follows

    ConfigComp = {
          secretKey : 'AnySecretKeyyouCan@Use'
    }
    module.exports = ConfigComp;

These key value gets from config file and encoding function is

    var token   = jwt.encode(payload, secret);  
    
    
is generating a token, which is stored in token variable and these value are stored temporarly in **local storage**. The code is as shown below.

    var payload = {role: roleVal,userId:userVal};
    var token   = jwt.encode(payload, secret); 
    localStorage.tokengen = token;

In **_app.js_** is handling all the routing operation. As already described, In this application have two types of views are rendering.First is ADMIN and second is Employee. In **app.js** file, first accept localstorage value which is named as **tokengen**. This varable contains a encrypted data. Then decode these value by 

    var decodedValue 	= 	jwt.decode(tokenValue, secret);
 Here we can decode these token value. After this decoding operation we will get role and user id. In configuration file contains 
 
    ROLE_ADMIN :'ADMIN',
    ROLE_USER  :'USER',
    ROLE_GUEST :'GUEST' 
    
Compare above code and decode value and findout the Role. These Role value is determines which template is need to render in view part. 

    var App = React.createClass({
     	render: function () { 
              var tokenValue      = localStorage.tokengen ;
          	var comSwitchRole;
          	if(tokenValue !== undefined){
			             var secret 	= 	ConfigCom.secretKey; 
			             var decodedValue 	= 	jwt.decode(tokenValue, secret);
			             comSwitchRole 	= 	decodedValue.role;
		          }	
	         else{
			            comSwitchRole 	= 	ConfigCom.ROLE_GUEST;
	            }	
    switch(comSwitchRole){
     	case ConfigCom.ROLE_ADMIN:
            //Render Here
        break;   
      default:     
    }
    
The next step we need to use user id or role in different part of this application. For this pupose we just call **decode** function from JWT object and pass token into this function. This will provide decoded data. The default algorithm for data encryption is **HS256**. But we have some other algorithm to support in encrypt operation that are _**HS384, HS512 and RS256**_. This is treated as third parameter and syntax is as follows.

    jwt.encode(payload, secret, 'HS512');
    
In each API call these encoded value will be sent through header. In ajax call we are using parameter 

     headers: {"Authorization": "Bearer " + tokenValue}
The request header is as follows     
![Autherization](https://github.com/AccelNA/aws-coe/blob/master/contents/images/autherization-timelogs.png)<br/>
<hr/>     
