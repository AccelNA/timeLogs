/*
 * @Date 04-02-2015
 * The File is used for USER creation 
 * Dependency /components/TextInput.js  
 */
var React			=	 require('react');
var	RB				=	 require('react-bootstrap');
var TextInput		=	 require('../TextInput');
var UserAction		=	 require('../../actions/UserActions');	
var UserStore 		= 	 require('../../stores/UserStore');
var ListSection	    = 	 require('./List');


 var divStyle = {
           color: 'red'
     };   

 var mandetoryStyle = {
      color : 'red'
 };

var UserMain	=	React.createClass({
	
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
				  		case 'employee_email':
				  			 this.setState({employee_email : event.target.value});
				  		break;
				  		default:
				  }
	
		},
	addUser : function(event){
			
			firstName 	= this.state.first_name;
			lastName  	= this.state.last_name;
			employeeId	= this.state.employee_id;
			userEmail	= this.state.employee_email;

			if(firstName  ==  undefined || lastName == undefined || employeeId == undefined || userEmail == undefined){
                        this.setState({errorMessage : 'Field Cannot Be Empty!'});
                  return;
                 }

                else{
                      userDetails = {firstName:firstName,lastName:lastName,employeeId:employeeId,userEmail:userEmail}; 
					 UserAction.create(userDetails);
                }		

		
			
	},
		render	:	function(){
			       		return(
			        	<div>
			        	
			        	 <form className="well well-small" >
			        	 <RB.Row>
	        				<RB.Col xs={6}>
	        				<span style={divStyle}>{this.state.errorMessage}</span>
	        					
							    <TextInput type="text" label="* First Name" placeholder="First Name" id="first_name" 
								  name="first_name" setText={this.setTextState} first_name={this.state.first_name}  />
									  
								<TextInput type="text" label="* Last Name" placeholder="Last Name" id="last_name"
									 name="last_name" setText={this.setTextState} last_name={this.state.last_name} />		
									 	
							    <TextInput type="text" label="* Emplyee ID" placeholder="Employee ID" id="employee_id"
									 name="employee_id" setText={this.setTextState} employee_id={this.state.employee_id} />  

								<TextInput type="text" label="* User Email" placeholder="User Email" id="employee_email"
									 name="employee_email" setText={this.setTextState} employee_email={this.state.employee_email} />	 
								<span style={mandetoryStyle}>* Mandetory Field</span> <br/>	  
								<RB.Button bsStyle="primary" onClick={this.addUser}>Save</RB.Button> 
								
							 </RB.Col>		
					     </RB.Row>
					     </form>
					     <div id="modalWindow"></div>
					     <ListSection />		 
						</div>
							) 
		}
});
module.exports = UserMain;