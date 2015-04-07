/*
 * @Date 04-02-2015
 * @Param from actions/UserAction userDetails
 * Author Accel Frontline@Cochin 
 */ 
 

var AppDispatcher 	= require('../dispatcher/AppDispatcher');
var EventEmitter 	= require('events').EventEmitter;
var ProjectConstants= require('../constants/ProjectConstants');
var assign 			= require('object-assign');
var ConfigComp 		= require('../config/ConfigComp');
var fetchOp 		= require('../RESTService/GET');


var projects=[];


var CHANGE_EVENT = 'change';

var ProjectStore	=	 assign({}, EventEmitter.prototype, {
	

Delete:function(ProjectDetails){
	
	
	projectId = ProjectDetails.Action;

    var arr = projects;
	
			var removeByAttr = function(arr, attr, value){
				    var i = arr.length;
				    while(i--){
				       if( arr[i] 
				           && arr[i].hasOwnProperty(attr) 
				           && (arguments.length > 2 && arr[i][attr] === value ) ){ 

				           arr.splice(i,1);

				       }
				    }
		projects=arr;
 		}
	
	removeByAttr(arr, 'Action', projectId);


    fetchOp.projectDelete(projectId,function(data){

 			projects = data ;  
     });
    

  },
create : function(ProjectDetails){
		 
		 var projectAllDetail = [ProjectDetails];
		 indexVal = projects.length;
		 projects[indexVal]	=	{
		 							"SINo": indexVal+1,
								    "Client Name": projectAllDetail[0].client_id,
								    "Project Name": projectAllDetail[0].project_name,
								    "clientId" : projectAllDetail[0].client_name,
								    "Description":  projectAllDetail[0].description,
								    "Is Billable":  projectAllDetail[0].is_billable,
								    "Action":indexVal+1
		 						}
		fetchOp.projectCreate(projectAllDetail,function(data){}); 							
		 						
	 },
projectList : function(){
	 	
	  fetchOp.projectGet(function(data){
		 return projects = data;
		 });
 	
	 return projects;
},

projectEdit:function(ProjectDetails){
  			
  		
  				 for (var i in projects) {
  					 	
  					 	 updatedProject =projects[i];
  					 	   if (updatedProject['Action'] == ProjectDetails.projectId) {
   							  
   							  		 updatedProject['Client Name'] 	= 	ProjectDetails.client_name;
      								 updatedProject['Project Name']	= 	ProjectDetails.project_name;
      								 updatedProject['Description']	= 	ProjectDetails.description;
      		 }
      	 }

   fetchOp.projectEdit(ProjectDetails); 							 
      		 
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
});

AppDispatcher.register(function(playload){
	
	 var action = playload.action;
	 var ProjectDetails;
	 
	 switch(action.actionType) {
	 	
	 		case ProjectConstants.PROJECT_CREATE:
	 			 ProjectDetails = action.ProjectDetails;
	 			 ProjectStore.create(ProjectDetails);  
	 			 ProjectStore.emitChange();
     		break;
	 	
	 		case ProjectConstants.PROJECT_LIST:
	 	     	 ProjectStore.projectList(); 

	 		break;  
	 	    case ProjectConstants.PROJECT_DELETE:
	 	    	 	
	 			 ProjectDetails = action.ProjectDetails;
	 			 ProjectStore.Delete(ProjectDetails);
	 	    	 ProjectStore.emitChange();
	 	    	break;
	 	     case ProjectConstants.PROJECT_EDIT:
	 	    		 ProjectDetails = action.ProjectDetails;	
	 	    		 ProjectStore.projectEdit(ProjectDetails);
	 	    		 ProjectStore.emitChange();
	 	    	break;		
	 		default:
	 		break;
	 }
	
});

module.exports = ProjectStore;