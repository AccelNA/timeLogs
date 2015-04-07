/*
 * @Date : 04-02-2014
 * Params Get From /components/user/Main.js
 * Author : Accel FrontLine@Cochin
 */
 
 var  AppDispatcher     =	 require('../dispatcher/AppDispatcher');
 var  ProjectConstants	=	 require('../constants/ProjectConstants');

 
 var  ProjectActions = {
 	
 	//Create New Client Action
 	create : function(ProjectDetails){
		
		AppDispatcher.handleViewAction({
				actionType  : ProjectConstants.PROJECT_CREATE,
				ProjectDetails  : ProjectDetails
			});
	 },
	//List entire Client details 
	projectList  : function(){
		
		 AppDispatcher.handleViewAction({
				actionType  : ProjectConstants.PROJECT_LIST,
			});
	},//Delete User 
	projectDelete : function(ProjectDetails){
		AppDispatcher.handleViewAction({
				actionType : ProjectConstants.PROJECT_DELETE,
				ProjectDetails:ProjectDetails	
		});
	},
	update : function(ProjectDetails){
		
		AppDispatcher.handleViewAction({
				actionType  : ProjectConstants.PROJECT_EDIT,
				ProjectDetails : ProjectDetails	
		});
	}
	
};
 module.exports = ProjectActions;		 