var React = require('react');
var RB = require('react-bootstrap');
var TextInput = require('../TextInput');
var DashboardStore = require('../../stores/DashboardStore');
var DashboardActions = require('../../actions/DashboardActions');
var ReactPropTypes = React.PropTypes;
	
var DashboardRow = React.createClass({
	
	getInitialState: function() {	
		return ({
			tasks_opt: [],
			proj_opt: [],
			tasks: 0,
			projects: 0,
			checked: false,
			rowCnt:1,
			totHrs:0
		});
	},
	componentDidMount: function() {
	    DashboardStore.addChangeListener(this._onChange);
	  },
	  
	/*setTxtState: function(event) {
		console.log(event.target.id);
		ele_id = event.target.id;
		dept_id = eval(ele_id);
		this.setState({dept_id: event.target.value });
		if(event.target.id=='tasks0'){
			console.log(event.target.id)
			this.setState({tasks0: event.target.value });
		}
	},*/
	setTothrs: function(e){
		this.state.totHrs = parseInt(this.state.totHrs) + parseInt(e.target.value);
	},
	render:function(){
	 this.state.tasks_opt.push( <option key={0} value={0}>Select Task</option>);
     this.state.tasks_opt.push( <option key={1} value={'Task1'}>{'Task1'}</option> );
     this.state.tasks_opt.push( <option key={2} value={'Task2'}>{'Task2'}</option> );
     this.state.tasks_opt.push( <option key={3} value={'Task3'}>{'Task3'}</option> );
     
     this.state.proj_opt.push( <option key={0} value={0}>Select Project</option>);
     this.state.proj_opt.push( <option key={1} value={'Project1'}>{'Project1'}</option> );
     this.state.proj_opt.push( <option key={2} value={'Project2'}>{'Project2'}</option> );
     this.state.proj_opt.push( <option key={3} value={'Project3'}>{'Project3'}</option> );
     
    
     rowCnt = this.state.rowCnt;
     var timesheetRow = [];
     
     for (i=0;i<rowCnt;++i) {
    	var projRowId = "projects"+i;
    	var taskRowId = "tasks"+i;
    	var descRowId = "description"+i;
    	var timeRowId = "takentime"+i;
		txtArea = <tr>	          
	          <td>
	          	<select id={projRowId} label="Select" className="form-control" name={projRowId} >					        
		         	{this.state.proj_opt}
		        </select>
	          </td>
	          <td>
	          	<select id={taskRowId} label="Select" className="form-control" name={taskRowId} >					        
		         	{this.state.tasks_opt}
		        </select>
	          </td>
	          <td>
	          	<RB.Input type="textarea" placeholder="Enter Description" id={descRowId} name={descRowId} groupClassName="" wrapperClassName="" labelClassName="" className=""/>
	          </td>
	          <td>
	          	<RB.Input type="text" placeholder="HH:MM" id={timeRowId} name={timeRowId} onChange={this.setTothrs}/>
	          </td>
	        </tr>
		timesheetRow.push(txtArea);
	 }
	
		return(
		
		<RB.Table bordered>
	      <thead>
	        <tr>
	          <th>Projects</th>
	          <th>Tasks</th>
	          <th>Description</th>
	          <th>Hrs taken</th>
	        </tr>
	      </thead>
	      <tbody>
		  	
		  {timesheetRow}
			  
	        <tr>	 
	          <td colSpan="3"></td>        
	          <td>Total <b>{this.state.totHrs} hrs</b></td>
	         </tr>
	      
	      <tr>    
	          <td colSpan="4">
	          	<RB.Button bsStyle="info" onClick={this.addMoreRow}>Add More</RB.Button>&nbsp;
				<RB.Button bsStyle="primary" onClick={this.saveTimeSheet}>Save</RB.Button>
	          </td>
	     </tr>
	     </tbody>
	    </RB.Table>    
		
		);
	
	},
	saveTimeSheet: function() {
		var timesheetArr = {};
		for(i=0;i<this.state.rowCnt;++i){				  
			  timesheetArr[i] =  
								 {
								    "id": i,
								    "projects": $('#projects'+i).val(),
								    "tasks": $('#tasks'+i).val(),
								    "escription": $('#description'+i).val(),
								    "takentime":$('#takentime'+i).val()
								  }
			;
		}
		if(Object.keys(timesheetArr).length){
			$('#timesheetFrm')[0].reset();			
		}
	    
	},
	addMoreRow : function(){
		rowCnt++;		
		DashboardActions.addMoreRow(rowCnt);
	},
	 _onChange : function(){
		this.setState({
			rowCnt: DashboardStore.getCount()
			});	
	  }
});

module.exports = DashboardRow;
