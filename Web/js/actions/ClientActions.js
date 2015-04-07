/*
 * @Date : 04-02-2014
 * Params Get From /components/user/Main.js
 * Author : Accel FrontLine@Cochin
 */
 
 var  AppDispatcher     =	 require('../dispatcher/AppDispatcher');
 var ClientConstants	=	 require('../constants/ClientConstants');

 
 var  ClientActions = {
 	
 	//Create New Client Action
 	create : function(ClientDetails){
		
		AppDispatcher.handleViewAction({
				actionType  : ClientConstants.CLIENT_CREATE,
				ClientDetails  : ClientDetails
			});
	 },
	//Delete User 
	clientDelete : function(ClientDetails){
		AppDispatcher.handleViewAction({
				actionType : ClientConstants.CLIENT_DELETE,
				ClientDetails:ClientDetails	
		});
	},
	//Edit User Details
	clientEdit : function(ClientDetails){
		
		AppDispatcher.handleViewAction({
				actionType  : ClientConstants.CLIENT_EDIT,
				ClientDetails : ClientDetails	
		});
	},
	//List entire Client details 
	clientList  : function(){
		
		 AppDispatcher.handleViewAction({
				actionType  : ClientConstants.CLIENT_LIST,
			});
	}
	
};
 module.exports = ClientActions;		 