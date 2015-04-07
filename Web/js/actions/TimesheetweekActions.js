/*
 * @Date : 12-03-2015
 * Params Get From /components/user/Main.js
 * Author : Accel FrontLine@Cochin
 */
 
 var  AppDispatcher             =	 require('../dispatcher/AppDispatcher');
 var  TimesheetConstants	=	 require('../constants/TimeSheetWeekConstants');

 
 var  TimesheetActions = {
 	
 	//Create New Timesheet Action
 	create : function(timeDetails){
		
		AppDispatcher.handleViewAction({
				
				actionType  : TimesheetConstants.TIMESHEETWEEKSTORE_CREATE,
				timeDetails : timeDetails
				
			});
	 }
	
};
 module.exports = TimesheetActions;	