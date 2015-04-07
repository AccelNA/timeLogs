var React		 	= 		require('react');
var ReactPropTypes  = 		React.PropTypes;
var ReactBootstrap  = 		require('react-bootstrap');
var Table 			= 		ReactBootstrap.Table;
var React 			= 		require('react');
var Griddle 		= 		require('griddle-react');
var UserAction		=	 	require('../../actions/UserActions');	
var UserStore 		= 	 	require('../../stores/UserStore');
var TextInput		=	 	require('../TextInput');
var Modal 			= 		ReactBootstrap.Modal;
var ModalTrigger    =       ReactBootstrap.ModalTrigger;
var ConfigCom       =       require('../../config/ConfigComp');

  var Link = React.createClass({
  	
  	  getInitialState: function() {
			
						  return({
						  	value : '',
						  });				
		},
  	  setTextState : function(event){
			    
			      switch(event.target.id){
				  	
				  		case 'first_name':
				  			 this.setState({first_name  : event.target.value});
				  		break;
				  		case 'last_name':
				  			 this.setState({last_name  : event.target.value});
				  		break;
				  		case 'employee_id':
				  			 this.setState({employee_id : event.target.value});
				  		break;
				  		default:
				  }
	
		},
	 updateUser:function(){
	 	
	  	    firstName 	= (typeof this.state.first_name !== 'undefined')? this.state.first_name:userDetail['First Name']; 
			lastName  	= (typeof this.state.last_name !== 'undefined')? this.state.last_name:userDetail['Second Name']; 
			employeeId	= userDetail['Employee ID']; 
			userDetails = {firstName:firstName,lastName:lastName,employeeId:employeeId}; 
	  	    UserAction.userEdit(userDetails);
	  	    document.getElementById('userForm').style.visibility = "hidden";
	  	    
	  },
  	 getEditData : function(event){
  	 	
  		  userDetail = (this.props.rowData);
  		  this.setState({first_name  : userDetail['First Name']}); 
  		    		  
  		  React.render(
  		  <form className="well well-small" id="userForm" >
  		  				<Modal bsStyle="primary" title="Update User Details" animation={true} >
          					
          					<div className="modal-body">
          					
           							 <TextInput type="text" label="First Name" placeholder={userDetail['First Name']} id="first_name" 
								  							name="first_name" setText={this.setTextState}  
								  							first_name={this.state.first_name} />
								  							
								  	 <TextInput type="text" label="Last Name" placeholder={userDetail['Second Name']} id="last_name"
									                        name="last_name" setText={this.setTextState} />	
									                        
									 <TextInput type="text" label="Emplyee ID"  id="employee_id"
															 name="employee_id" setText={this.setTextState} 
															 value={userDetail['Employee ID']} readonly/>  
									 						 
								    <ReactBootstrap.Button bsStyle="primary" onClick={this.updateUser}  >Update</ReactBootstrap.Button>
								    
          					</div>
        			   </Modal>
  		  						 
  		  				
  		  </form>
  		  
  		  ,document.getElementById('modalWindow')
  		   );
  		 document.getElementById('userForm').style.visibility = "visible";    
	    },  
	  getDeleteData : function(event){
		   if (confirm("Do you want to Delete this user")) {
     				UserAction.userDelete(this.props.rowData);
     		}
	   },
    render: function(){
        return (
         <div>
        	  	
           <ReactBootstrap.Button bsStyle="info" bsSize="xsmall" onClick={this.getEditData}>
            <ReactBootstrap.Glyphicon glyph="edit" /></ReactBootstrap.Button>
          	&nbsp;
          	<ReactBootstrap.Button bsStyle="danger" bsSize="xsmall" onClick={this.getDeleteData}>
          	<ReactBootstrap.Glyphicon glyph="remove" /></ReactBootstrap.Button>
         </div>   
        )
    }
  });

var ListSection	=	React.createClass({

		 getInitialState : function(){
		   return{
			 	userData:UserAction.userList()
			 }
		  },
		 componentDidMount: function() {

		 	 $.get(ConfigCom.serverUrl + 'userlist', function(result) {
                 if (this.isMounted()) {
                           this.setState({userData:UserStore.userList()});
                     }
               }.bind(this));

   				 UserStore.addChangeListener(this._onChange);
  			},
 		 componentWillMount : function(){
         	        this.setState({userData:UserStore.userList()});
         	        UserStore.removeChangeListener(this._onChange);
         	        
          },
	  render  : function(){
         	
        var columnMeta = [
            {
                'columnName': 'Action',
                'locked': false,
                'visible': true,
                'customComponent': Link
            }
        ];

         	   	return(
			   		<div>
			   		   <Griddle results={this.state.userData}  resultsPerPage={3} enableInfiniteScroll={true} bodyHeight={300}
						    tableClassName="table" columns={["SINo", "First Name", "Last Name","Employee ID","Action"]} 
							    columnMetadata={columnMeta} showSettings={true} showFilter={true}/>
				 	</div>
				); 
			},	
			 
 _onChange: function() {
     this.setState({userData:UserStore.userList()});
  }		
 });
module.exports = ListSection ;