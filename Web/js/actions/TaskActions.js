/*
 * @Date : 04-02-2014
 * Params Get From /components/user/Main.js
 * Author : Accel FrontLine@Cochin
 */
 
 var  AppDispatcher =	 require('../dispatcher/AppDispatcher');
 var  TaskConstants	=	 require('../constants/TaskConstants');

 
 var  TaskActions = {
 	
 	//Create New User Action
 	create : function(taskDetails){
		
		AppDispatcher.handleViewAction({
				actionType  : TaskConstants.TASK_CREATE,
				taskDetails  : taskDetails
			});
	 },
	 //Delete User 
	taskDelete : function(taskDetails){
		AppDispatcher.handleViewAction({
				actionType : TaskConstants.TASK_DELETE,
				taskDetails:taskDetails	
		});
	},//Edit User Details
	taskEdit : function(taskDetails){
		
		AppDispatcher.handleViewAction({
				actionType  : TaskConstants.TASK_EDIT,
				taskDetails : taskDetails	
		});
	},
	//List entire User details 
	taskList  : function(){
		
		 AppDispatcher.handleViewAction({
				actionType  : TaskConstants.TASK_LIST,
			});
	}
	
};
 module.exports = TaskActions;		 