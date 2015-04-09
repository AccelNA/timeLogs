/*
 * @Date 10-03-2015
 * The File is used for USER creation 
 * Dependency /components/TextInput.js 
 * Dependency /components/Calender.js 
 */
var React		     =   require('react');
var DatePicker 		 =   require('react-date-picker');
var TextInput		 =   require('../TextInput');
var DynamicRow		 =   require('./List');
var ReactBootstrap	 =   require('react-bootstrap');
var TimesheetStore       =   require('../../stores/TimeSheetWeekStore');
var TimesheetActions     =   require('../../actions/TimesheetweekActions');
var ConfigCom            =   require('../../config/ConfigComp');
var RButton              =   require('../Button');
var Calendar             =   require('react-input-calendar');


var date = new Date();
var divStyle = {color: 'red'};   
var mandetoryStyle = {left: '227px',width: '695px'};
var errorCol = {'column-span': 'all'};
var tableDetails   = []; 
var taskIdArray = [];
var finalGridDetails = [];
var rowindex=0 ; 
var dropdownWidth = {width: '134px'};
var data =[];
var project = [];
var task  = [];
var taskdata= [];

var GridView = React.createClass({
   
   getDeleteData : function(){
       console.log('Delete Row Here');
   },
    content : function(){
        projectArray = [];
        taskName    = this.props.taskPassParam;
        projectName = this.props.projectPassParam;
        hoursValue  = this.props.hoursPassParam;
        rowindexPassArg = this.props.rowindexPass; //use this number as row index
        projectPassActNameArg = this.props.projectPassActName;
        projectArray = projectName.split('*');
        taskArray = taskName.split('*');
       // rowGetIndex = {'data-row-no'= rowindexPassArg};
              return [
                            <td>{projectArray[0]}</td>,
                            <td>{taskArray[0]}</td>,
                            <td>{hoursValue[0]}</td>,
                            <td>{hoursValue[1]}</td>,
                            <td>{hoursValue[2]}</td>,
                            <td>{hoursValue[3]}</td>,
                            <td>{hoursValue[4]}</td>,
                            <td>{hoursValue[5]}</td>,
                            <td>{hoursValue[6]}</td>,
                            <td><ReactBootstrap.Button bsStyle="danger" bsSize="xsmall" onClick={this.getDeleteData}>
          	                <ReactBootstrap.Glyphicon glyph="remove" /></ReactBootstrap.Button>
                            </td>
                     ]    
    },
    render : function(){
        
        return (<tr>{this.content()}</tr>)
        
    }
    
});



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
				task_name: 0,
                rowindex:0,
                data:'',
                taskdata:''           
			}
		  )
	  },

   _isDate : function(dateArg) {
           var t = (dateArg instanceof Date) ? dateArg : (new Date(dateArg));
            return !isNaN(t.valueOf());
      },
   _isValidRange : function(minDate, maxDate) {
            return (new Date(minDate) <= new Date(maxDate));
    },
   _betweenDate :  function (startDt, endDt) {
    var error = ((this._isDate(endDt)) && (this._isDate(startDt)) && this._isValidRange(startDt, endDt)) ? false : true;
    if (error) {

        this.setState({error:"Error Occured!!!... Please Enter Valid Dates"});
        return;
    }

    else {
        var currentDate = new Date(startDt),
            end = new Date(endDt);
            var between =[];
        while (currentDate <= end) {
            
            mdfyDate = new Date(currentDate);

            locale  =  "en-us",
            month   =  mdfyDate.toLocaleString(locale, { month: "long" });

            fullDateYear = mdfyDate.getDate()+", "+month+" "+mdfyDate.getFullYear();
            between.push(fullDateYear);
           
            currentDate.setDate(currentDate.getDate() + 1);
          }
       return between;
    }
     
   },
     _daySelect:function(){
         startDate  = (this.refs.firstDate.state.inputValue);
         endDate    = (this.refs.secondDate.state.inputValue);
         dayDetails = this._betweenDate(startDate,endDate);
         this.setState({dayDetailsPass:dayDetails});
         this.setState({day1:dayDetails[0]});
         this.setState({day2:dayDetails[1]});
         this.setState({day3:dayDetails[2]});
         this.setState({day4:dayDetails[3]});
         this.setState({day5:dayDetails[4]});
         this.setState({day6:dayDetails[5]});
         this.setState({day7:dayDetails[6]});
      },
    setTextState : function(event){
                
                  switch(event.target.id){
                    
                        case 'hours1':
                             this.setState({hours1  : event.target.value});
                        break;
                         case 'hours2':
                             this.setState({hours2  : event.target.value});
                        break;
                        case 'hours3':
                             this.setState({hours3  : event.target.value});
                        break;
                        case 'hours4':
                             this.setState({hours4  : event.target.value});
                        break;
                        case 'hours5':
                             this.setState({hours5  : event.target.value});
                        break;
                        case 'hours6':
                             this.setState({hours6  : event.target.value});
                        break;
                        case 'hours7':
                             this.setState({hours7  : event.target.value});
                        break;
                        case 'project_name':
                              this.setState({project_name  : event.target.value});
                              this.setState({project_act_name  : event.target.aname});
                        break;
                        case 'task_name':
                             this.setState({task_name  : event.target.value});
                        break;
                        default:
                  }
    
        },          
    gridView : function(){
        
        var taskName    = this.state.task_name;
        var projectName = this.state.project_name;
        var projectActName = this.state.project_act_name;
        var hoursValue = [];
        taskArray = taskName.split('*');
       
        var date1 = this.state.day1;
        var date2 = this.state.day2;
        var date3 = this.state.day3;
        var date4 = this.state.day4;
        var date5 = this.state.day5;
        var date6 = this.state.day6;
        var date7 = this.state.day7;
        
        hoursValue.push(this.state.hours1);
        hoursValue.push(this.state.hours2);
        hoursValue.push(this.state.hours3);
        hoursValue.push(this.state.hours4);
        hoursValue.push(this.state.hours5);
        hoursValue.push(this.state.hours6);
        hoursValue.push(this.state.hours7);
        
        GridJsonData = {
                        "0": {
                                     "date1": date1,
                                     "hours1": hoursValue[0]
                                 },
                         "1": {
                                     "date1": date2,
                                     "hours1": hoursValue[1]
                                },
                        "2": {
                                     "date1": date3,
                                     "hours1": hoursValue[2]
                                },
                        "3": {
                                     "date1": date4,
                                     "hours1": hoursValue[3]
                                },
                        "4": {
                                     "date1": date5,
                                     "hours1": hoursValue[4]
                                },
                        "5": {
                                     "date1": date6,
                                     "hours1": hoursValue[5]
                                },  
                        "6": {
                                     "date1": date7,
                                     "hours1": hoursValue[6]
                                },
                         "task" : taskArray[1],
                         "user" : $.cookie('userId')
                };
                
        taskDetails = (JSON.stringify(GridJsonData));        
        
        this.setState({hours1:''});
        this.setState({hours2:''});
        this.setState({hours3:''});
        this.setState({hours4:''});
        this.setState({hours5:''});
        this.setState({hours6:''});
        this.setState({hours7:''});
        
        finalGridDetails.push(<GridView taskPassParam={taskName} 
                              projectPassParam={projectName} hoursPassParam={hoursValue} projectPassActName={projectActName} rowindexPass={rowindex}/>);
        this.setState({gridTab:finalGridDetails});
        TimesheetActions.create(taskDetails);
    },
    componentWillMount  :function(){

          
            /*Project List */

            userId = $.cookie('userId');

            $.ajax({
                         url      : ConfigCom.serverUrl + "projectlistuser/user/"+userId,
                         dataType : 'json',
                         success  : function(data) {
                                    this.setState({data: data});
                                   }.bind(this),
                         error    : function(xhr, status, err) {
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
    },          
    render:function(){


             var dayDetailsPassArg = this.state.dayDetailsPass; 

              //Project Name and Details fro drop down box 
              project.push(<option key={0} value={0}>Select One</option>);
              var commentNodes = this.state.data.map(function (com) {
                   prjtValue = com.projectname +"*"+ com.Action;
                   project.push(<option key={prjtValue} value={prjtValue}>{com.projectname}</option>);
               });  
 
             //Task List and Details fro drop down box 
             task.push(<option key={0}  value={0}>Select One</option>);
              var commentNodes = this.state.taskdata.map(function (com) {
                   taskValue = com.TaskName +"*"+ com.Action;
                   task.push(<option key={taskValue}  value={taskValue}>{com.TaskName}</option>);
               });  



      	 return(
			<div>
			 <ReactBootstrap.Grid>
			   	  <ReactBootstrap.Row className="show-grid">
			      	  	<ReactBootstrap.Col xs={4} md={3}>
                                                <ReactBootstrap.Table  striped bordered condensed hover>
                                                    <tbody>
                                             
                                                    <tr>
                                                        <td><b>FROM</b> <Calendar    format="YYYY/MM/DD"  ref="firstDate"/></td>
                                                        <td><b>TO</b> <Calendar    format="YYYY/MM/DD"  ref="secondDate" /></td>
                                                        <td><RButton bsStyle = "primary"  bsSize="small" active caption="Click Here" submitForm={this._daySelect}/></td>
                                                    </tr> 
                                                  </tbody>    
                                                </ReactBootstrap.Table>
                                          </ReactBootstrap.Col>
         			     <ReactBootstrap.Col xs={12} md={8} style={mandetoryStyle}>
                                    <div style={divStyle}> {this.state.error} </div>
                                     </ReactBootstrap.Col>
          			</ReactBootstrap.Row>
                        
			        <ReactBootstrap.Row className="show-grid">
			          <ReactBootstrap.Col xs={6} md={12} >
			        	   <ReactBootstrap.Table responsive striped bordered condensed hover id="mstrTable">
                                              
                                                     <thead>
                                                     
                                                            <tr>
                                                                <th>PROJECT</th>
                                                                <th>TASK</th>
                                                                <th>{this.state.day1}</th>
                                                                <th>{this.state.day2}</th>
                                                                <th>{this.state.day3}</th>
                                                                <th>{this.state.day4}</th>
                                                                <th>{this.state.day5}</th>
                                                                <th>{this.state.day6}</th>
                                                                <th>{this.state.day7}</th>
                                                                <th></th>
                                                            </tr>
                                                            <tr>
                                                             <td style={dropdownWidth}> <select id="project_name" label="Select" className="form-control" 
                                                                        value={this.state.project_name} id="project_name" name="project_name" autoFocus="true" onChange={this.setTextState} >
                                                                        {project}</select>
                                                             </td>
                                                             <td style={dropdownWidth}> <select id="task_name" label="Select" className="form-control" 
                                                                       value={this.state.task_name} id="task_name" name="task_name" autoFocus="true" onChange={this.setTextState} >
                                                                        {task}</select>  
                                                             </td>
                                                             <td> <TextInput type="text"  setText={this.setTextState} name="hours1" id="hours1" value={this.state.hours1} /></td>
                                                             <td> <TextInput type="text"  setText={this.setTextState} name="hours2" id="hours2" value={this.state.hours2}/></td>
                                                             <td> <TextInput type="text"  setText={this.setTextState} name="hours3" id="hours3" value={this.state.hours3}/></td> 
                                                             <td> <TextInput type="text"  setText={this.setTextState} name="hours4" id="hours4" value={this.state.hours4}/></td>
                                                             <td> <TextInput type="text"  setText={this.setTextState} name="hours5" id="hours5" value={this.state.hours5}/></td>
                                                             <td> <TextInput type="text"  setText={this.setTextState} name="hours6" id="hours6" value={this.state.hours6}/></td>       
                                                             <td> <TextInput type="text"  setText={this.setTextState} name="hours7" id="hours7" value={this.state.hours7}/></td>
                                                             
                                                             <td> <input type="button" onClick={this.gridView} value="+"/></td>
                                                             
                                                            </tr>
                                                            {this.state.gridTab}
                                                            
                                                     </thead>
                                                 </ReactBootstrap.Table>             
            	        	  		 </ReactBootstrap.Col>
			                         </ReactBootstrap.Row>
                         </ReactBootstrap.Grid>	 
		       </div>
		) 
	   }
});
module.exports = TimeSheetDayViewMain;