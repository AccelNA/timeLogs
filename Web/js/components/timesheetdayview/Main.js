/*
 * @Date 10-03-2015
 * The File is used for USER creation 
 * Dependency /components/TextInput.js 
 * Dependency /components/Calender.js 
 */
var React			 =	 require('react');
var DatePicker 		 = 	 require('react-date-picker');
var TextInput		 =	 require('../TextInput');
var DynamicRow		 =   require('./List');
var	ReactBootstrap	 =	 require('react-bootstrap');
var TimesheetStore   =   require('../../stores/ProjectStore');
var TimesheetActions =   require('../../actions/TimesheetActions');
var ConfigCom        =   require('../../config/ConfigComp');

var data =[];
var project = [];
var task  = [];
var taskdata= [];
var client = [];
var clientdata =[];

var date = new Date();
var divStyle = {color: 'red'};   
var mandetoryStyle = {color : 'red'};
var workDetails   = []; 
var projectResult = [];


var TimeSheetDayViewMain	=	React.createClass({
	  
	  getInitialState:function(){
	  	  return(
		  	{
				value:'',
				project_name_opt: [],
				project_name: 0,
				client_name_opt: [],
				client_name: 0,
				task_name_opt: [],
				taskt_name: 0,
                data:'',
                taskdata:''
                
			}
		  )
	  },
	  setTextState : function(event){
                
                  switch(event.target.id){
                    
                        case 'hours_id':
                             this.setState({hours_id  : event.target.value});
                        break;
                        case 'client_name':
                             this.setState({client_name  : event.target.value});
                        break;
                        case 'project_name':
                             this.setState({project_name  : event.target.value});
                        break;
                        case 'task_name':
                             this.setState({task_name  : event.target.value});
                        break;
                        default:
                  }
    
        },
   addMore:function(){
        clientName     =    this.state.client_name;
        clientArray    =    clientName.split('*');  

        projectName    =    this.state.project_name;
        projectArray   =    projectName.split('*');

        taskName       =    this.state.task_name;
        taskArray      =    taskName.split('*');

        console.log(projectArray);
        console.log(taskArray);
        console.log(clientArray);

        hours          =    this.state.hours_id;
        userId         =    $.cookie('userId'),
        date           =    this.state.choose_date 
        timeDetails    =    {
                             clientName:clientArray[0],
                             clientId : clientArray[1],
                             projectId:projectArray[1],
                             projectName:projectArray[0],
                             taskId:taskArray[1],
                             taskName:taskArray[0],
                             hours:hours,
                             date:date,
                             userId:userId
                         }; 

                if(date  ==  undefined ){
                               this.setState({errorMessage : 'Date Cannot Be Empty!'});
                               return;
                }
                else if(clientName == undefined || projectName == undefined || taskName == undefined || hours == undefined){
                   this.setState({errorMessage : 'Fields Cannot Be Empty!'});
                        return;      
                }   
                else{
                         TimesheetActions.create(timeDetails);
                }   
	  },
	  onChange: function(moment, dateString){
 			
 			this.setState({choose_date  : dateString});
           // this.refs.changeTimesheet.getTimesheet();    
       },
      componentWillMount  :function(){

         

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

         /*Project List */
           
            userId = $.cookie('userId');

            $.ajax({
                         url      : ConfigCom.serverUrl + "projectlistuser/user/"+userId,
                         dataType: 'json',
                         success: function(data) {
                                  this.setState({data: data});
                                  
                         }.bind(this),
                         error: function(xhr, status, err) {
                                 console.error(this.props.url, status, err.toString());
                        }.bind(this)
                  }); 
        /* Task List */
            $.ajax({
                         url: ConfigCom.serverUrl + "tasklist",
                         dataType: 'json',
                         success: function(taskdata) {
                                  this.setState({taskdata: taskdata});
                                  
                         }.bind(this),
                         error: function(xhr, status, err) {
                                 console.error(this.props.url, status, err.toString());
                        }.bind(this)
                  }); 
         
            this.setState({data: data});
            this.setState({taskdata: taskdata});
            this.setState({clientdata: clientdata});
            

      }, 
      render	:	function(){
      	
           //Change Client name from here
            var commentNodes = this.state.clientdata.map(function (clnt) {
                   clientValue = clnt.clientname +"*"+ clnt.Action;
                   client.push(<option key={clientValue}  value={clientValue}>{clnt.clientname}</option>);
               }); 


      	    //Project Name and Details fro drop down box 
            var commentNodes = this.state.data.map(function (com) {
                   prjtValue = com.projectname +"*"+ com.Action;
                   project.push(<option key={prjtValue} value={prjtValue}>{com.projectname}</option>);
               });  
 
           //Task List and Details fro drop down box 
            var commentNodes = this.state.taskdata.map(function (com) {
                   taskValue = com.TaskName +"*"+ com.Action;
                   task.push(<option  key={taskValue} value={taskValue}>{com.TaskName}</option>);
               });  

      		
      	     return(
			      	<div>
			        	 <ReactBootstrap.Grid>
			        	  <ReactBootstrap.Row className="show-grid">
			        	  		
			        	  		 <ReactBootstrap.Col xs={4} md={3}>
			        	  		 			<TextInput type="text"  placeholder="Choose a Date" value={this.state.choose_date}/>
			        	  		 </ReactBootstrap.Col>
         						 <ReactBootstrap.Col xs={12} md={8}></ReactBootstrap.Col>
          				  		
					      </ReactBootstrap.Row>
			        	 
			        	 
			        	  <ReactBootstrap.Row className="show-grid">
			        	  		
			        	  		 <ReactBootstrap.Col xs={6} md={4}>
			        	  		 			<DatePicker date={date} onChange={this.onChange}/>
                                            <span style={mandetoryStyle}>* Mandetory Field</span> <br/>   
			        	  		 </ReactBootstrap.Col>
			        	  		 
         						 <ReactBootstrap.Col xs={12} md={8}>
                                 <span style={divStyle}>{this.state.errorMessage}</span>
         						 					<ReactBootstrap.Table responsive striped bordered condensed hover>
         						 					<thead>
        													<tr>
        														<th> * Client</th>
        														<th> * Project</th>
        														<th> * Task</th>
        														<th> * Hours</th>
        														<th></th>
        													</tr>
        											<tbody>
        													<tr>
        														<td>
        															
        			<select id="client_name" label="Select" className="form-control" 
					       		 value={this.state.client_name} id="client_name" name="client_name" autoFocus="true" onChange={this.setTextState}>
                                 {client}
					</select>

        														</td>
        														<td>
	        									
					<select id="project_name" label="Select" className="form-control" 
					       		value={this.state.project_name} id="project_name" name="project_name" autoFocus="true" onChange={this.setTextState} >
                                    {project}
                              
					</select>
					
																</td>
        														<td>
        			<select id="task_name" label="Select" className="form-control" 
					       		value={this.state.task_name} id="task_name" name="task_name" autoFocus="true" onChange={this.setTextState} >
                                {task}
					</select>									
        															
        															
        														</td>
        						
        														<td className="col-xs-2">
                                                              
        						<TextInput type="text"   id="hours_id"
                                     name="hours_id" setText={this.setTextState} employee_id={this.state.hours_id} />  								
        														</td>
                                                                
        														<td>
        						 <ReactBootstrap.ButtonToolbar>
        						 <ReactBootstrap.Button bsStyle="primary" bsSize="small" onClick={this.addMore}>Add</ReactBootstrap.Button>
        						 </ReactBootstrap.ButtonToolbar>
        														</td>
        													</tr>
        											</tbody>		
     												</thead>
         						 					</ReactBootstrap.Table>
         						 
         						
         						 	 <DynamicRow ref="changeTimesheet"/>
         										
         							 					
         						 </ReactBootstrap.Col>
          				  		
					      </ReactBootstrap.Row>
					      
					      </ReactBootstrap.Grid>	 
						</div>
							) 
		}
});
module.exports = TimeSheetDayViewMain;