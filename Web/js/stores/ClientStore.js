/*
 * @Date 04-02-2015
 * @Param from actions/UserAction userDetails
 * Author Accel Frontline@Cochin 
 */ 
 

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var ClientConstants = require('../constants/ClientConstants');
var assign = require('object-assign');
var ConfigComp = require('../config/ConfigComp');
var fetchOp 		=   require('../RESTService/GET');


var clients=[];

var CHANGE_EVENT = 'change';

var ClientStore	=	 assign({}, EventEmitter.prototype, {
	
	
getAllClient  :function(){
  					return clients ;   
 	      		
	},
create : function(clientDetails){
		 
		 var clientAllDetail = [clientDetails];
		 indexVal	=	clients.length;
		 
		 clients[indexVal] = {
								    "SINo":indexVal+1,
								    "Client Name": clientAllDetail[0].clientName,
								    "Website": clientAllDetail[0].website,
								    "Email": clientAllDetail[0].emailId,
								    "Phone":clientAllDetail[0].Phone,
								    "Fax":clientAllDetail[0].Fax,
								    "Address 1":clientAllDetail[0].addressLine1,
								    "Address 2":clientAllDetail[0].addressLine2,
								    "City":clientAllDetail[0].City,
								    "State":clientAllDetail[0].stateCounty,
								    "Country":clientAllDetail[0].countryName,
								    "Action":indexVal+1
								  }
       fetchOp.clientCreate(clientDetails,function(data){}); 	
          
	 },
	 
clientList : function(){
	  fetchOp.clientGet(function(data){
		 return clients = data;
		 });
 	
	 return clients;
	 },
clientDelete:function(clientDetails){
	
	inVal = clientDetails.SINo;
	var arr = clients;
	
			var removeByAttr = function(arr, attr, value){
				    var i = arr.length;
				    while(i--){
				       if( arr[i] 
				           && arr[i].hasOwnProperty(attr) 
				           && (arguments.length > 2 && arr[i][attr] === value ) ){ 

				           arr.splice(i,1);

				       }
				    }
		clients=arr;
 		}
	removeByAttr(arr, 'SINo', inVal);


  },
clientEdit:function(clientDetails){
	
  			 
  			 
  				 for (var i in clients) {
  					 	
  					 	 updatedClient =clients[i];
  					 	
   							  if (updatedClient['Email'] == clientDetails.emailId) {
   							  
   							  		 updatedClient['Client Name'] = clientDetails.clientName;
      								
      		 }
      							
  		 }
		
		var removeByAttr = function(arr, attr, value){
				   								 var i = arr.length;
				  									  while(i--){
				     									  if( arr[i] 
				        									   && arr[i].hasOwnProperty(attr) 
				         										  && (arguments.length > 2 && arr[i][attr] === value ) ){ 

				          							 arr.splice(i,1);

				      							 }
				    					}
		clients=arr;
 	   	}
		
	removeByAttr(clients, 'Action', clientDetails.Action);	
	  			
  }, 
  
clientList : function(){
	 	clients= this.getAllClient(function(){
	 	});
	 	
		return clients;
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
	 var clientDetails;
	 
	 switch(action.actionType) {
	 	
	 		case ClientConstants.CLIENT_CREATE:
	 			 clientDetails = action.ClientDetails;
     	 		 ClientStore.create(clientDetails);  
     		break;
	 	
	 		case ClientConstants.CLIENT_LIST:
	 	     	 ClientStore.clientList(); 
	 		break; 
	 		case ClientConstants.CLIENT_DELETE:
	 			 ClientDetails = action.ClientDetails;	
	 	    	 ClientStore.clientDelete(ClientDetails);
	 	    	 ClientStore.emitChange();
	 	    	break; 
	 	   case ClientConstants.CLIENT_EDIT:
	 	    		 ClientDetails = action.ClientDetails;	
	 	    		 ClientStore.clientEdit(ClientDetails);
	 	    		 ClientStore.emitChange();
	 	    	break;	
	 	    	
	 	    
	 		default:
	 		break;
	 }
	
});

module.exports = ClientStore;