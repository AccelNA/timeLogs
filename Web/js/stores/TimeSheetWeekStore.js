/*
 * @Date 04-02-2015
 * @Param from actions/UserAction userDetails
 * Author Accel Frontline@Cochin 
 */ 
 

var AppDispatcher 			=	 require('../dispatcher/AppDispatcher');
var EventEmitter 			=	 require('events').EventEmitter;
var TimesheetConstants 		        =	 require('../constants/TimeSheetWeekConstants');
var assign 				= 	 require('object-assign');
var fetchOp 		                =    require('../RESTService/GET');

var timesheets=[];
var CHANGE_EVENT = 'change';

var TimesheetWeekStore	=	 assign({}, EventEmitter.prototype, {
	
 

create : function(timeDetails){
			
	var timeAllDetail = [timeDetails];
		
	fetchOp.timesheetWeekCreate(timeDetails,function(data){}); 

	 		
 },	 
emitChange: function() {
			    this.emit(CHANGE_EVENT);
  },
addChangeListener: function(callback) {
			    this.on(CHANGE_EVENT, callback);
  },
removeChangeListener: function(callback) {
			    this.removeListener(CHANGE_EVENT, callback);
  }      
});

AppDispatcher.register(function(playload){
	
	 var action = playload.action;
	 var timeDetails;
	
	 switch(action.actionType) {
	 	
	 	case TimesheetConstants.TIMESHEETWEEKSTORE_CREATE:
	 			 timeDetails = action.timeDetails;
	 			 TimesheetWeekStore.create(timeDetails);
	 			 TimesheetWeekStore.emitChange();
     		break;
     		default:
	 		break;
	 }
	 return true;
});

module.exports = TimesheetWeekStore;