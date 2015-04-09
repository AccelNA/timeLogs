/*
 * @Date 04-02-2015
 * @Param from actions/UserAction userDetails
 * Author Accel Frontline@Cochin 
 */ 
 

var AppDispatcher 	= 	require('../dispatcher/AppDispatcher');
var EventEmitter 	= 	require('events').EventEmitter;
var UserConstants 	= 	require('../constants/UserConstants');
var assign 			=	require('object-assign');
var fetchOp 		=   require('../RESTService/GET');

var users=[];
var CHANGE_EVENT = 'change';


var UserStore	=	 assign({}, EventEmitter.prototype, {
	

create : function(userDetails){
	
			var userAllDetail = [userDetails];
			var indexVal = users.length;
	 		users[indexVal] = {
								    "SINo": indexVal+1,
								    "First Name": userAllDetail[0].firstName,
								    "Last Name": userAllDetail[0].lastName,
								    "Employee ID": userAllDetail[0].employeeId,
								    "Employee Email": userAllDetail[0].userEmail,
								    "Action": userAllDetail[0].firstName
							  }	
	 		
	fetchOp.employeeCreate(userAllDetail,function(data){}); 							  
	  		
	 },
userList : function(){
	  fetchOp.userGet(function(data){
		 return users = data;
		 });
 	
	 return users;
	 },
userDelete:function(userDetails){
	
	userId = userDetails.Action;

	var arr = users;
	
			var removeByAttr = function(arr, attr, value){
				    var i = arr.length;
				    while(i--){
				       if( arr[i] 
				           && arr[i].hasOwnProperty(attr) 
				           && (arguments.length > 2 && arr[i][attr] === value ) ){ 

				           arr.splice(i,1);

				       }
				    }
		users=arr;
 		}

	removeByAttr(arr, 'Action', userId);
	fetchOp.projectDelete(userId,function(data){
 			users = data ;  
     });


  },
userEdit:function(userDetails){
  			
  				 for (var i in users) {
  					 	
  					 	 updatedUser =users[i];
   							  if (updatedUser['Employee ID'] == userDetails.employeeId) {
   							  
   							  		 updatedUser['First Name'] = userDetails.firstName;
      								 updatedUser['Second Name']= userDetails.lastName;
      								 
      		 }
      							
  		 }
		
	 fetchOp.employeeEdit(userDetails); 	
	  			
  },
userProjectAssign:function(userDetails){

		fetchOp.employeeProjectAssign(userDetails,function(data){}); 			

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
	 var userDetails;
	 
	 switch(action.actionType) {
	 	
	 		case UserConstants.USER_CREATE:
	 			 userDetails = action.UserDetails;
     	 		 UserStore.create(userDetails); 
     	 		 UserStore.emitChange();
     	 	break;
	 	
	 		case UserConstants.USER_LIST:
	 	     	 UserStore.userList(); 
	 		break;  
	 		
	 		case UserConstants.USER_DELETE:
	 			 userDetails = action.userDetails;	
	 	    	 UserStore.userDelete(userDetails);
	 	    	 UserStore.emitChange();
	 	    	break;
	 	    	
	 	    case UserConstants.USER_EDIT:
	 	    		 userDetails = action.userDetails;	
	 	    		 UserStore.userEdit(userDetails);
	 	    		 UserStore.emitChange();
	 	    	break;	
	 	    case UserConstants.USER_PROJECT_ASSIGN:
	 	    		 userDetails = action.userDetails;	
	 	    		 UserStore.userProjectAssign(userDetails);
	 	    		 UserStore.emitChange();
	 	    	break;		
	 		default:
	 		break;
	 }
	
	 return true;
});

module.exports = UserStore;