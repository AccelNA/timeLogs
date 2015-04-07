/*
 * @Date 04-02-2015
 * @Param from actions/UserAction userDetails
 * Author Accel Frontline@Cochin 
 */ 
 

var AppDispatcher 	= 	require('../dispatcher/AppDispatcher');
var EventEmitter 	= 	require('events').EventEmitter;
var AuthConstants 	= 	require('../constants/AuthConstants');
var assign 			=	require('object-assign');
var fetchOp 		=	require('../RESTService/GET');


var CHANGE_EVENT = 'change';


var AuthStore	=	 assign({}, EventEmitter.prototype, {
	
_signIn : function(authDetails){
		
 		 fetchOp.authGet(authDetails,function(data){});
 		
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
	 var authDetails;
	 
	 switch(action.actionType) {
	 	
	 		case AuthConstants.USER_LOGIN:
	 			 authDetails = action.authDetails;
     	 		 AuthStore._signIn(authDetails); 
     	 		 
     	 	break;
	 	
	 		default:
	 		break;
	 }
	
	 return true;
});

module.exports = AuthStore;