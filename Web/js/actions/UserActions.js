/*
 * @Date : 04-02-2014
 * Params Get From /components/user/Main.js
 * Author : Accel FrontLine@Cochin
 */
 
 var  AppDispatcher =	 require('../dispatcher/AppDispatcher');
 var  UserConstants	=	 require('../constants/UserConstants');

 
 var  UserActions = {
 	
 	//Create New User Action
 	create : function(UserDetails){
		
		AppDispatcher.handleViewAction({
				actionType  : UserConstants.USER_CREATE,
				UserDetails  : UserDetails
			});
	 },
	//List entire User details 
	userList  : function(){
		
		 AppDispatcher.handleViewAction({
				actionType  : UserConstants.USER_LIST,
			});
	 },
	//Delete User 
	userDelete : function(userDetails){
		AppDispatcher.handleViewAction({
				actionType : UserConstants.USER_DELETE,
				userDetails:userDetails	
		});
	},
	//Edit User Details
	userEdit : function(userDetails){
		
		AppDispatcher.handleViewAction({
				actionType  : UserConstants.USER_EDIT,
				userDetails : userDetails	
		});
	}
	
};
 module.exports = UserActions;		 