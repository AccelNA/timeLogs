/*
 * @Date 04-02-2015
 * @Param from actions/UserAction userDetails
 * Author Accel Frontline@Cochin 
 */ 
 

var AppDispatcher 	= 	require('../dispatcher/AppDispatcher');
var EventEmitter 	= 	require('events').EventEmitter;
var ReportConstants = 	require('../constants/ReportConstants');
var assign 			=	require('object-assign');
var fetchOp 		=   require('../RESTService/GET');
var ConfigCom			=	 	require('../config/ConfigComp');


var CHANGE_EVENT  = 'change';
var pieDataForMembers = [];
var pieDataForTask = [];

var ReportStore	=	 assign({}, EventEmitter.prototype, {

      
   reportMemberAllList :function(){
    	
          return pieDataForMembers;

    },
   reportTaskAllList  : function(){
           return pieDataForTask;
   },
    reportMemberList : function(responsereportMemberDetails){
      
	     var totalHours = 0;  
       var reportArray = [];

       for(tot in responsereportMemberDetails){
            hours = responsereportMemberDetails[tot]['tottime'];
            totalHours = totalHours + parseInt(hours);
       }
  
       for(obj in responsereportMemberDetails){
             
              
             var percentage 		=  0;
             var reportvalue 		= [];
             name  					= responsereportMemberDetails[obj]['name'];
             hours 					= parseInt(responsereportMemberDetails[obj]['tottime']);
             percentage 			=  (hours/totalHours)*100;
             reportvalue['label'] 	= name;
             reportvalue['value'] 	= Math.round(percentage); 
             reportArray.push(reportvalue);
       } 

       var pluginArrayThread = new Array();
            
       for (val in reportArray)
           		{		
    					var Thread   = new Object();
    					Thread.label = reportArray[val]['label'];
    					Thread.value = reportArray[val]['value'];
    					pluginArrayThread.push(Thread);  

           		} 
            pieDataForMembers = JSON.parse((JSON.stringify(pluginArrayThread)));
           
            return pieDataForMembers;
 },
reportTaskList  :function(reportTask){
      
      
      var totalHours = 0;  
      var reportArray = [];

      for(tot in reportTask){
            hours = reportTask[tot]['timesheet_hours'];
            totalHours = totalHours + parseInt(hours);
       }
      for(obj in reportTask){
             
              
             var percentage     =  0;
             var reportvalue    = [];
             name           = reportTask[obj]['task_name'];
             hours          = parseInt(reportTask[obj]['timesheet_hours']);
             username       = reportTask[obj]['user_first_name']; 
             percentage      =  (hours/totalHours)*100;
             reportvalue['label']       = name;
             reportvalue['value']       = Math.round(percentage); 
             reportvalue['username']    = username;
             reportvalue['hours']       = hours; 
             reportvalue['totalHours']  = totalHours;
             reportArray.push(reportvalue);
       } 
    var pluginArrayThread = new Array();
            
       for (val in reportArray)
              {   
              var Thread        = new Object();
              Thread.label      = reportArray[val]['label'];
              Thread.value      = reportArray[val]['value'];
              Thread.username   = reportArray[val]['username'];
              Thread.hours      = reportArray[val]['hours'];
              Thread.totalHours = reportArray[val]['totalHours'];
              pluginArrayThread.push(Thread);  

              } 

            pieDataForTask = JSON.parse((JSON.stringify(pluginArrayThread)));
           
            return pieDataForTask; 

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

AppDispatcher.register(function(payload){
	
	 var action = payload.action;
	 var reportMemberDetails;
	
	 switch(action.actionType) {
	 	
	 		case ReportConstants.REPORT_LIST:
	 		     responsereportMemberDetails = action.responsereportMemberDetails; 
	 		 	   ReportStore.reportMemberList(responsereportMemberDetails);
	 		 	   ReportStore.emitChange();
	 		break;  

      case ReportConstants.REPORT_TASK_LIST:
           responseMember = action.responseMember; 
           ReportStore.reportTaskList(responseMember);
           ReportStore.emitChange();
      break; 
          
           	default:
	 		
	 }
	
	 return true;
});

module.exports = ReportStore;