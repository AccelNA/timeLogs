 
var  AppDispatcher     =	 require('../dispatcher/AppDispatcher');
var  DashboardConstants	=	 require('../constants/DashboardConstants');
 
var  DashboardActions = {
 	
 	addMoreRow : function(dashboardData){
		
		AppDispatcher.handleViewAction({
				actionType  : DashboardConstants.ADDMOREROW,
				dashboardData  : dashboardData
			});
	 },
	
};
 module.exports = DashboardActions;		 