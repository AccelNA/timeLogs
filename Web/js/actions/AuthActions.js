/*
 * @Date : 04-02-2014
 * Params Get From /components/user/Main.js
 * Author : Accel FrontLine@Cochin
 */
 
 var  AppDispatcher =	 require('../dispatcher/AppDispatcher');
 var  AuthConstants	=	 require('../constants/AuthConstants');

 
 var  AuthActions = {
 	

   // Login operation
   signIn  :function(authDetails){

   			
		AppDispatcher.handleViewAction({
				actionType  : AuthConstants.USER_LOGIN,
				authDetails  : authDetails
			});
   },
	
};
 module.exports = AuthActions;		 