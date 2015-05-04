/*
 * @Date 04-02-2015
 * @Param from actions/UserAction userDetails
 * Author Accel Frontline@Cochin 
 */ 
 

var AppDispatcher 			=	 require('../dispatcher/AppDispatcher');
var EventEmitter 			=	 require('events').EventEmitter;
var TimesheetConstants 		=	 require('../constants/TimeSheetDayConstants');
var assign 					= 	 require('object-assign');
var fetchOp 		        =    require('../RESTService/GET');
var jwt                     =    require('jwt-simple');
var ConfigCom			    =	 require('../config/ConfigComp');

var timesheets=[];
var CHANGE_EVENT    = 'change';

var tokenValue		= 	$.cookie('tokengen');
var secret ; 
var decodedValue;
var comuserId;


if(tokenValue !== undefined){
			var secret 			= 	ConfigCom.secretKey; 
			    decodedValue 	= 	jwt.decode(tokenValue, secret);
			    comuserId 	    = 	decodedValue.userId;
		}	
	else{
			  comuserId 	    = 	null;
	}


var TimesheetDayStore	=	 assign({}, EventEmitter.prototype, {

create : function(timeDetails){
			
	var timeAllDetail = [timeDetails];
		
	var indexVal = timesheets.length;
	timesheets[indexVal] = {
								    "SINo": indexVal+1,
								    "Client": timeAllDetail[0].clientName,
								    "Project": timeAllDetail[0].projectName,
								    "Task": timeAllDetail[0].taskName,
								    "Hours": timeAllDetail[0].hours,
								    "Action" : indexVal+1,
								    "userId" : timeAllDetail[0].userId,
								    "date" : timeAllDetail[0].date,
								    'taskId': timeAllDetail[0].taskId
							  }	;

		
	fetchOp.timesheetCreate(timeDetails,function(data){}); 

	 		
 },
 timeDelete:function(userDetails){
	
	timeId = userDetails.Action;

	var arr = timesheets;
	
			var removeByAttr = function(arr, attr, value){
				    var i = arr.length;
				    while(i--){
				       if( arr[i] 
				           && arr[i].hasOwnProperty(attr) 
				           && (arguments.length > 2 && arr[i][attr] === value ) ){ 

				           arr.splice(i,1);

				       }
				    }
		timesheets=arr;
 		}

	removeByAttr(arr, 'Action', timeId);
	fetchOp.timeDelete(timeId,function(data){
 			timesheets = data ;  
     });


  },
timeList : function(comuserId,currentdate){

	  currentdate =   $.cookie('currentdate');
			
	  fetchOp.todayTimesheetGet(comuserId,currentdate,function(data){
		 return timesheets = data;
		 });
 	
	 return timesheets;
	 },
timeCustomList : function(currentdate){

	fetchOp.todayTimesheetGet(comuserId,currentdate,function(data){
		 return timesheets = data;
		 });
 	
	 return timesheets;
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
	 	
	 		case TimesheetConstants.TIMESHEETDAYSTORE_CREATE:
	 			 timeDetails = action.timeDetails;
	 			 TimesheetDayStore.create(timeDetails);
	 			 TimesheetDayStore.emitChange();
     		break;
     		case TimesheetConstants.TIMESHEETDAYSTORE_LIST:
     			 TimesheetDayStore.timeList(); 	
     			 
     		break;
     		case TimesheetConstants.TIMESHEETDAYSTORE_CUSTOMLIST:
     		     timeDetails = action.timeDetails; 
     			 TimesheetDayStore.timeCustomList(timeDetails); 
     			 TimesheetDayStore.emitChange();
	 			 
     		break;
     		case TimesheetConstants.TIMESHEETDAYSTORE_DELETE:
	 			 timeDetails = action.timeDetails;
	 	    	 TimesheetDayStore.timeDelete(timeDetails);
	 	    	 TimesheetDayStore.emitChange();
	 	    	break;


	 	   
	 		default:
	 		break;
	 }
	 return true;
});

module.exports = TimesheetDayStore;