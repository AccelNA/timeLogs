/*
 * @Date : 12-03-2015
 * Params Get From /components/user/Main.js
 * Author : Accel FrontLine@Cochin
 */
 
 var  AppDispatcher =	 require('../dispatcher/AppDispatcher');
 var  TimesheetConstants	=	 require('../constants/TimeSheetDayConstants');

 
 var  TimesheetActions = {
 	
 	//Create New Timesheet Action
 	create : function(timeDetails){
		
		AppDispatcher.handleViewAction({
				
				actionType  : TimesheetConstants.TIMESHEETDAYSTORE_CREATE,
				timeDetails : timeDetails
				
			});
	 },
	//List All timesheet action
	timeList  : function(){
		 AppDispatcher.handleViewAction({
				actionType  : TimesheetConstants.TIMESHEETDAYSTORE_LIST				
			});
	 },
	 //List All timesheet action
	timeCustomList  : function(timeDetails){
		
		 AppDispatcher.handleViewAction({

				actionType  : TimesheetConstants.TIMESHEETDAYSTORE_CUSTOMLIST,
				timeDetails : timeDetails					
			});
	 },
	 //Delete time 
	timeDelete : function(timeDetails){
		AppDispatcher.handleViewAction({
				actionType : TimesheetConstants.TIMESHEETDAYSTORE_DELETE,
				timeDetails : timeDetails	
		});
	},  
	
};
 module.exports = TimesheetActions;	