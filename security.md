# Security
============

In this application, there are two types of users previlages are available.

* Admin
* Employee
 
The **Admin** is the super user and **Employee** have some resctriction to access the some modules. The react router is only showing their navigation link according to user login. THe Admin can configure all essential items for the application. The Employee can access these items.

The authentication operation are also based on token system. When user is trying to login, then as normal it will check all essential credentials and if the credential are acceptable then it will generate the token. These token are stored temporarly and check with each request.

The tokens are generating by **hash()** method and it accept two parametres. The first parameter is **sha256** and second parameter is combinations of credentail details and server url link. These operations are done in 
    
    function createToken(data)
      {
           // Generate tokens here.
      }

Then each request in application check these generated token by 

    function checkToken(receivedToken, receivedData){
      //Token checking here 
    }
    
The above checkToken() method is accepting two parameter one already generated token and recieved data. Comparing these two values and validate each request.     

The client side essential form validations are added.
