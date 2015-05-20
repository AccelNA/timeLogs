var React = require('react');
var RB = require('react-bootstrap');
var TextInput = require('../TextInput');
var ProjectActions = require('../../actions/ProjectActions');
var ProjectStore = require('../../stores/ProjectStore');
var ListSection = require('./List');
var ConfigCom       =     require('../../config/ConfigComp');

var ReactPropTypes = React.PropTypes;
var divStyle = { color: 'red'};   
var mandetoryStyle = {color : 'red'};  
var client = [];
//var clientdata =[];
	
var ProjectMain = React.createClass({
	
	getInitialState: function() {
		return ({
			value: '',
			client_name_opt: [],
			client_name: 0,
			is_billable: 'No',
			checked: false,
			data :'',
			clientdata:[]
			
		});
	},
	
	setTxtState: function(event) {
		
		switch(event.target.id){				  	
	  		case 'project_name':
	  			 this.setState({project_name: event.target.value });
	  		break;
	  		case 'client_name':
	  			 this.setState({client_name  : event.target.value});
	  		break;
	  		case 'description':
	  			 this.setState({description : event.target.value});
	  		break;
	  		case 'is_billable':
	  		 	 if(event.target.checked)
	  			 	this.setState({is_billable : "Yes"});
	  			 else
	  			 	this.setState({is_billable : "No"});
	  		break;
	  		default:
	  }
	},
	addProject: function() {

         clientDetails = this.state.client_name;
         clientArray = clientDetails.split('*');

	   ProjectDetails = {
	   		project_name:this.state.project_name,
	   		description:this.state.description,
	   		client_name:clientArray[1],
	   		client_id:clientArray[0],
	   		is_billable:this.state.is_billable,
	   		}; 

	    if(this.state.project_name  ==  undefined || this.state.description == undefined || this.state.client_name== undefined){
                        this.setState({errorMessage : 'Field Cannot Be Empty!'});
                  return;
                 }

                else{
                       ProjectActions.create(ProjectDetails);
		               
                }		

	    
	},
	componentDidMount : function(){
		
             /*Client List */
            $.ajax({
                         url: ConfigCom.serverUrl + "clientlist",
                         dataType: 'json',
                         success: function(clientdata) {
                                  this.setState({clientdata: clientdata});
                                  
                         }.bind(this),
                         error: function(xhr, status, err) {
                                 console.error(this.props.url, status, err.toString());
                        }.bind(this)
                  }); 
          // this.setState({clientdata: clientdata});
			

	},
	render:function(){
	    
      	  //Change Client name from here
            var commentNodes = this.state.clientdata.map(function (clnt) {
                   clientValue = clnt.clientname +"*"+ clnt.Action;
                   client.push(<option key={clientValue} value={clientValue}>{clnt.clientname}</option>);
               }); 


		return(
			<div>
				<form className="well well-small">
					<RB.Row>
					
	        			<RB.Col xs={6}>
	        			<span style={divStyle}>{this.state.errorMessage}</span>
	        				<div className="form-group has-feedback group-class">
	        				<label className="control-label label-class" htmlFor="client_name">* Client Name</label>
					        <select id="client_name" label="Select" className="form-control" onChange={this.setTxtState} value={this.state.client_name} id="client_name" name="client_name" autoFocus="true">					        
						         	{client}
						    </select>
						    </div>
						    
							<TextInput type="text" label=' * Project Name' placeholder="Enter Project Name" id="project_name" name="project_name" setText={this.setTxtState} value={this.state.project_name}/>
							
							<TextInput type="textarea" label='* Description' placeholder="Enter Description" id="description" name="description" setText={this.setTxtState} value={this.state.description}/>
							
							<TextInput type="checkbox" label='Is Billable' placeholder="Is Billable" id="is_billable" name="is_billable" setText={this.setTxtState} value={this.state.is_billable} />
							 <span style={mandetoryStyle}>* Mandetory Field</span> <br/> 
							<RB.Button bsStyle="primary" onClick={this.addProject}>Save</RB.Button>
						</RB.Col>		
					</RB.Row>		
				</form>	
				<div id="modalWindow"></div>	
				<ListSection /> 
			</div>
		);
	
	}
});

module.exports = ProjectMain;
