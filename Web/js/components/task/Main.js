/*
 * Module Create TASK
 * @Date 10-02-2015
 * Author Accel FrontLine@Cochin
 */
 
var React			=	 require('react');
var RB				=	 require('react-bootstrap');
var TextInput		=	 require('../TextInput');
var TaskAction		=	 require('../../actions/TaskActions');	
var TaskStore 		= 	 require('../../stores/TaskStore');
var ListSection	    = 	 require('./List');
var ConfigCom       =       require('../../config/ConfigComp');


var divStyle = {color: 'red'};   
var project =[];
var data = [] ;
var mandetoryStyle = {color : 'red'}; 

var Tasks = React.createClass({
	
   getInitialState: function() {
			
						  return({
						  	value : '',
						  	project_name_opt: [],
							project_name: 0,
							data :''
						  });				
		},
   setTextState:function(event){
			 switch(event.target.id){
			 	
			 	case 'task_name':
			 		this.setState({task_name  : event.target.value});
			 	break;
			 	case 'note':
			 		this.setState({note  : event.target.value});
			 	break;
			 	case 'project_name':
			 		this.setState({project_name  : event.target.value});
			 	break;
			 	default:
			 	break;
			 }			
	},
   addTask:function(){
		
		task_name 		= this.state.task_name;
		note  			= this.state.note;
		project     	= this.state.project_name;
		
		projectArray = project.split('*');	
		

		 if(task_name  ==  undefined || note == undefined || project_name == undefined){
                        this.setState({errorMessage : 'Field Cannot Be Empty!'});
                  return;
                 }

                else{
                       taskDetails = {taskName:task_name,note:note,projectName:projectArray[0],projectId:projectArray[1]}; 
                       console.log(taskDetails);
					   TaskAction.create(taskDetails);
                }		


		
	},
	componentWillMount : function(){
				 /*Project List */
            $.ajax({
                         url: ConfigCom.serverUrl + "projectlist",
                         dataType: 'json',
                         success: function(data) {
                                  this.setState({data: data});
                                  
                         }.bind(this),
                         error: function(xhr, status, err) {
                                 console.error(this.props.url, status, err.toString());
                        }.bind(this)
                  }); 
            this.setState({data: data});

		 	
  		},
   render:function(){
   	     
     //Project Name and Details fro drop down box 
            var commentNodes = this.state.data.map(function (com) {
                   prjtValue = com.projectname +"*"+ com.Action;
                   project.push(<option key={prjtValue}  value={prjtValue}>{com.projectname}</option>);
               }); 


		return(
			<div>
        		 <form className="well well-small" >
			        <RB.Row>
	        		<RB.Col xs={6}>
	        		<span style={divStyle}>{this.state.errorMessage}</span>
	        		
	        		<div className="form-group has-feedback group-class">
	        					<label className="control-label label-class" htmlFor="project_name">* Project Name</label>

					<select id="project_name" label="Select" className="form-control" onChange={this.setTextState} 
					        value={this.state.project_name} id="project_name" name="project_name" autoFocus="true">	
					        {project}				        				         	
					</select>

					</div>


					<TextInput type="text" label="* Task Name" placeholder="Task Name" id="task_name" 
							  name="task_name" setText={this.setTextState} task_name={this.state.task_name}  />
					<TextInput type="textarea" label="* Notes" placeholder="Add Note" id="note"  
								  name="note" setText={this.setTextState} task_name={this.state.note}  />
					<span style={mandetoryStyle}>* Mandetory Field</span> <br/> 				  
					<RB.Button bsStyle="primary" onClick={this.addTask}>Save</RB.Button> 
								
					</RB.Col>		
					</RB.Row>
				</form>
				 <div id="modalWindow"></div>
				 <ListSection />	
        	</div>
		);
	}
});

module.exports = Tasks;
