
var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var DashboardConstants = require('../constants/DashboardConstants');
var assign = require('object-assign');
var CHANGE_EVENT = 'change';
var rowCount = 1;

var DashboardStore	=	 assign({}, EventEmitter.prototype, {
	
	
	addMoreRow : function(cnt){	 	
	 	rowCount = cnt;
	 },
	 getCount: function() {
	    return rowCount;
	    
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
	 switch(action.actionType) {
	 	
	 		case DashboardConstants.ADDMOREROW:
	 	     	 DashboardStore.addMoreRow(action.dashboardData); 
	 		break;  
	 	    
	 		default:
	 		break;
	 }
	 DashboardStore.emitChange();
	 return true;
});

module.exports = DashboardStore;