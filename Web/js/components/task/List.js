var React		 	= 		require('react');
var ReactPropTypes  = 		React.PropTypes;
var ReactBootstrap  = 		require('react-bootstrap');
var Table 			= 		ReactBootstrap.Table;
var React 			= 		require('react');
var Griddle 		= 		require('griddle-react');
var TaskAction		=	 	require('../../actions/TaskActions');	
var TaskStore 		= 	 	require('../../stores/TaskStore');
var Modal 			= 		ReactBootstrap.Modal;
var ModalTrigger 	= 		ReactBootstrap.ModalTrigger;
var TextInput		=	    require('../TextInput');
var ConfigCom       =       require('../../config/ConfigComp');


var data = [] ;
var project =[];

var Link = React.createClass({
  	
  	getInitialState: function() {
			
						 return({
						  	value : '',
						  	project_name_opt: [],
							project_name: 0,
							data :''
						  });					
		},
   setTextState:function(event){

   			console.log(event.target.id);
   			

			 switch(event.target.id){
			 	
			 	case 'task_name':
			 		this.setState({task_name  : event.target.value});
			 	break;
			 	case 'note':
			 		this.setState({note  : event.target.value});
			 	break;
			 	case 'project_name':
			 	    console.log(event.target.value);
			 		this.setState({project_name  : event.target.value});
			 	break;
			 	default:
			 	break;
			 }			
	},
  	
   updateTask:function(){
						
						
	  	    task_name 		= (typeof this.state.task_name !== 'undefined')? this.state.task_name:taskDetails['TaskName']; 
			note    		= (typeof this.state.note !== 'undefined')? this.state.note:taskDetails['Descriptions']; 
			project_name	= (typeof this.state.project_name !== 'undefined')? this.state.project_name:taskDetails['ProjectName']; 
			taskId		    = taskDetails['Action']; 
			
			projectArray = project_name.split('*');		

			taskDetails = {taskName:task_name,note:note,projectName:projectArray[0],taskId:taskId,projectId:projectArray[1]}; 
			
			
	  	    TaskAction.taskEdit(taskDetails);
	  	    document.getElementById('taskForm').style.visibility = "hidden";
						
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
   getEditData : function(e){
  		   taskDetails = this.props.rowData;
  		   
  		    //Project Name and Details fro drop down box 
            var commentNodes = this.state.data.map(function (com) {
                   prjtValue = com.projectname +"*"+ com.Action;
                   project.push(<option key={prjtValue}  value={prjtValue}>{com.projectname}</option>);
               }); 
  		  
  		   React.render(
  		  			<form className="well well-small" id="taskForm" >
  		  				<Modal bsStyle="primary" title="Update Task Details" animation={true}  style="width: 500px;">
  		  						<div className="modal-body">
  		  						   <ReactBootstrap.Row>
	        					   	<ReactBootstrap.Col xs={6}>
	        					   		
	        	<div className="form-group has-feedback group-class">
	        					<label className="control-label label-class" htmlFor="project_name">* Project Name</label>

					<select id="project_name" label="Select" className="form-control" onChange={this.setTextState} 
					        value={this.state.project_name} id="project_name" name="project_name" autoFocus="true">	
					        {project}				        				         	
					</select>

				</div>
	        					   		
	        					   		<TextInput type="text" label="Task Name" placeholder={taskDetails['TaskName']} id="task_name" 
							 				 name="task_name" setText={this.setTextState} task_name={this.state.task_name}  />
							 				 
							 			<TextInput type="textarea" label="Notes" placeholder={taskDetails['Descriptions']} id="note"  
								 					 name="note" setText={this.setTextState} task_name={this.state.note}  />
									  
										<ReactBootstrap.Button bsStyle="primary" onClick={this.updateTask}>Save</ReactBootstrap.Button> 	 
	        					   		
  		  						   	</ReactBootstrap.Col>		
								   </ReactBootstrap.Row>		
  		  						
  		  						</div>
  		  				</Modal>
  		  			</form> 	
  		   ,document.getElementById('modalWindow')
  		  
  		  );
  		document.getElementById('taskForm').style.visibility = "visible";  
	 },
	getDeleteData : function(event){
		   if (confirm("Do you want to Delete this Task")) {
     				TaskAction.taskDelete(this.props.rowData);
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

var TaskListSection	=	React.createClass({

		 getInitialState : function(){
		   return{
			 	taskData:TaskAction.taskList()
			 }
		  },
		 componentDidMount: function() {

		 	  $.get(ConfigCom.serverUrl + 'tasklist', function(result) {
                 if (this.isMounted()) {
                           this.setState({taskData:TaskStore.taskList()});
                     }
               }.bind(this));

   				 TaskStore.addChangeListener(this._onChange);
  		 },
         componentWillMount : function(){
         	          this.setState({taskData:TaskStore.taskList()});
         	          TaskStore.removeChangeListener(this._onChange);
          	         	
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
			   		   <Griddle results={this.state.taskData}  resultsPerPage={3} enableInfiniteScroll={true} bodyHeight={300}
						    tableClassName="table" columns={["SINo", "TaskName", "ProjectName","Descriptions","Action"]} 
							    columnMetadata={columnMeta} showSettings={true} showFilter={true}/>
				 	</div>
				); 
			},	
			 
 _onChange: function() {
      this.setState({taskData:TaskStore.taskList()});
  }	 
 		});
 		
 		

module.exports = TaskListSection ;