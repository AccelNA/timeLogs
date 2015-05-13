/*
 * @Date 04-02-2015
 * @Param from actions/UserAction userDetails
 * Author Accel Frontline@Cochin 
 */ 
 

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var TaskConstants = require('../constants/TaskConstants');
var assign = require('object-assign');
var ConfigComp = require('../config/ConfigComp');
var fetchOp 		=   require('../RESTService/GET');


var tasks=[];
var CHANGE_EVENT = 'change';


var TaskStore	=	 assign({}, EventEmitter.prototype, {
	
init : function(initialData){
   tasks = initialData ; 
},
create : function(taskDetails){
		
		var taskAllDetail = [taskDetails];
		indexVal	=	tasks.length;
		tasks[indexVal]	=	 {
								    "SINo": indexVal+1,
								    "TaskName": taskAllDetail[0].taskName,
								    "ProjectName": taskAllDetail[0].projectName,
								    "projectId"  : taskAllDetail[0].projectId,
								    "Descriptions": taskAllDetail[0].note,
								    "Action":indexVal+1
								  };

		fetchOp.taskCreate(taskAllDetail,function(data){}); 							  
  },
taskDelete:function(taskDetails){
	
	taskId = taskDetails.Action;

	var arr = tasks;
	
			var removeByAttr = function(arr, attr, value){
				    var i = arr.length;
				    while(i--){
				       if( arr[i] 
				           && arr[i].hasOwnProperty(attr) 
				           && (arguments.length > 2 && arr[i][attr] === value ) ){ 

				           arr.splice(i,1);

				       }
				    }
		tasks = arr;
 		}
	removeByAttr(arr, 'Action', taskId);
	
	fetchOp.taskDelete(taskId,function(data){
 			tasks = data ;  
     });
 },
taskEdit:function(taskDetails){
  			
  				 for (var i in tasks) {
  					 	
  					 	 updatedtask =tasks[i];
  					 	
   							  if (updatedtask['Action'] == taskDetails.taskId) {
   							  
   							  		 updatedtask['TaskName'] = taskDetails.taskName;
      								 updatedtask['ProjectName']= taskDetails.projectName;
      								 updatedtask['Descriptions']= taskDetails.note;
      								 
      		 }
      							
  		 }
		console.log(taskDetails);
	fetchOp.taskEditAjax(taskDetails,function(data){}); 
	  			
  },  
  
  
emitChange: function() {
			    this.emit(CHANGE_EVENT);
  },
addChangeListener: function(callback) {
			    this.on(CHANGE_EVENT, callback);
  },
removeChangeListener: function(callback) {
			    this.removeListener(CHANGE_EVENT, callback);
  },	   
	   
taskList : function(){
	 fetchOp.taskGet(function(data){
		 return tasks = data;
		 });
 	
	 return tasks;
}
});

AppDispatcher.register(function(playload){
	
	 var action = playload.action;
	 var taskDetails;
	 
	 switch(action.actionType) {
	 	
	 		case TaskConstants.TASK_CREATE:
	 			 taskDetails = action.taskDetails;
     	 		 TaskStore.create(taskDetails);
     	 		 TaskStore.emitChange();  
     		break;
	 	
	 		case TaskConstants.TASK_LIST:
	 	     	 TaskStore.taskList(); 
	 		break;  
	 	    case TaskConstants.TASK_DELETE:
	 			 taskDetails = action.taskDetails;	
	 	    	 TaskStore.taskDelete(taskDetails);
	 	    	 TaskStore.emitChange();
	 	    	break;
	 	    case TaskConstants.TASK_EDIT:
	 	    		 taskDetails = action.taskDetails;		
	 	    		 TaskStore.taskEdit(taskDetails);
	 	    		 TaskStore.emitChange();
	 	    	break;	 	
	 	    	 
	 		default:
	 		break;
	 }
	
});

module.exports = TaskStore;