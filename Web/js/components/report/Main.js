var React		             =   require('react');
var ReactBootstrap       =   require('react-bootstrap');
var RButton              =   require('../Button');
var Calendar             =   require('react-input-calendar');
var ConfigCom            =   require('../../config/ConfigComp');
var jwt                  =   require('jwt-simple');
var rd3                  =   require('react-d3');
var reoprtAdminActions   =   require('../../actions/AdminReportActions');
var reportAdminStore     =   require('../../stores/reportAdminStore');
var PieChart             =   rd3.PieChart;

var project = [];
var data    = [];
var userId;
var tokenValue      =   $.cookie('tokengen');

var pieDataForMembers ={label: 'Members', value: 100};

var dropdownWidth = {width: '164px'};


if(tokenValue !== undefined){
            var secret          =   ConfigCom.secretKey; 
                decodedValue    =   jwt.decode(tokenValue, secret);
                userId          =   decodedValue.userId;
        }   
    else{
              userId         =   null;
    }


var Adminreport = React.createClass({
    
    getInitialState:function(){
            
            return({
              data:'',
              project_name:'',
              project_act_name:'',
              projectId:'',
              pieDataForMembers:[{label: 'Member', value: 100}],
              pieDataFortasks : [{label: 'Task', value: 100}],
              formatsecondDate:'',
              formatFirstDate : ''
            })

    },
    componentWillMount  :function(){
       
       /*Project List */
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
        this.setState({data: data});
        reportAdminStore.removeChangeListener(this._onChange);
    },
    componentDidMount  :function(){
        reportAdminStore.addChangeListener(this._onChange);
    },
    _selectReport:function(){

        
       var monthNames = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
    ];

        firstDate        = this.refs.firstDate.state.inputValue;
        secondDate       = this.refs.secondDate.state.inputValue;
        projectName      = this.state.project_name;
        projectNameArray = projectName.split('*');
        reoprtAdminActions.reportMemberList(projectNameArray[1],firstDate,secondDate); 
        reportAdminStore.addChangeListener(this._onChange);

   
    var fdate = new Date(firstDate);
    var fday = fdate.getDate();
    var fmonthIndex = fdate.getMonth();
    var fyear = fdate.getFullYear();
    formatFirstDate = fday+" "+monthNames[fmonthIndex]+" "+fyear;
    this.setState({formatFirstDate : formatFirstDate});
   
    var sdate = new Date(secondDate);
    var sday = sdate.getDate();
    var smonthIndex = sdate.getMonth();
    var syear = sdate.getFullYear();
    formatSecondDate = sday+" "+monthNames[smonthIndex]+" "+syear;
    this.setState({formatSecondDate : formatSecondDate}); 

    },
    setTextState : function(event){
                  
                  switch(event.target.id){

                    case 'project_name':
                             
                              this.setState({project_name  : event.target.value});
                    break;
                    default:
                  }
    },
                  
    render  :function(){

              //Project Name and Details fro drop down box 
              project.push(<option >Select One</option>);
              
              var commentNodes   =   this.state.data.map(function (com) {
                     prjtValue   =   com.projectname +"*"+ com.Action;
                     project.push(<option key={prjtValue} value={prjtValue}>{com.projectname}</option>);
              });  

             var taskDetails  =  this.state.pieDataFortasks;
             var rowTable     =  [];
             var index =1; 
             var tempVar      =  taskDetails.map(function (com) {
                   rowTable.push(<tr><td>{index}</td><td>{com.label}</td><td>{com.hours}</td></tr>);
                   index  = index + 1;
               });  
  
             index = 1; 
             taskfullDetails= [];
             totalHours = 0;
             var tempVar      =  taskDetails.map(function (com) {
                   taskfullDetails.push(<tr><td>{index}</td><td>{com.label}</td><td>{com.username}</td><td>{com.hours}</td></tr>);
                   index  = index + 1;
                   totalHours = totalHours+ com.hours
               });  

              return (
                  <div>
                     <ReactBootstrap.Grid>
                          <ReactBootstrap.Row className='show-grid'>
                           
                            <ReactBootstrap.Col xs={6} md={6}>

                                 <ReactBootstrap.Table  bordered >
                                                <tbody><tr>
                                                     <td><b>FROM DATE</b><Calendar    format="YYYY-MM-DD"  ref="firstDate"/></td>
                                                     <td><b>TO DATE</b><Calendar      format="YYYY-MM-DD"  ref="secondDate"/></td>
                                                     <td style={dropdownWidth}> 
                                                         <select id="project_name" label="Select" className="form-control" 
                                                                value={this.state.project_name} id="project_name" name="project_name" autoFocus="true" 
                                                                onChange={this.setTextState}>
                                                                {project}
                                                         </select>
                                                     </td>
                                                     <td>
                                                     <RButton bsStyle = "primary"  bsSize="small" active caption="Search" submitForm={this._selectReport}/>
                                                     
                                                     </td>
                                                    </tr>
                                                  </tbody>       
                                  </ReactBootstrap.Table>

                            </ReactBootstrap.Col>

                           </ReactBootstrap.Row>

                           <ReactBootstrap.Row className='show-grid'>
                                  <ReactBootstrap.Col xs={6} md={6}> 
                                  <ReactBootstrap.Table  striped bordered condensed hover>
                                      <tbody>
                                          <tr>
                                              <td>Period:<br/><b>{this.state.formatFirstDate}</b> - <b>{this.state.formatSecondDate}</b></td>
                                              <td>Total Time<br /><b>{totalHours}Hrs</b></td>
                                          </tr>
                                      </tbody>
                                  </ReactBootstrap.Table>  
                                  </ReactBootstrap.Col>
                           </ReactBootstrap.Row>

                          <ReactBootstrap.Row className='show-grid'>

                              <ReactBootstrap.Col xs={4} md={4}> 
                                  <ReactBootstrap.Panel>
                                              <PieChart
                                                data={this.state.pieDataForMembers}
                                                width={400}
                                                height={300}
                                                radius={100}
                                                innerRadius={20}
                                                title="Members"
                                              />
                                  </ReactBootstrap.Panel>
                              </ReactBootstrap.Col>

                              <ReactBootstrap.Col xs={4} md={4}> 
                                   <ReactBootstrap.Panel>
                                          <PieChart
                                                data={this.state.pieDataFortasks}
                                                width={400}
                                                height={300}
                                                radius={100}
                                                innerRadius={20}
                                                title="Tasks"
                                              />

                                   </ReactBootstrap.Panel> 
                              </ReactBootstrap.Col>

                              <ReactBootstrap.Col xs={4} md={4}> 

                                          <ReactBootstrap.Table striped bordered condensed hover>
                                                  <thead>
                                                    <tr>
                                                      <th>#</th>
                                                      <th>Task</th>
                                                      <th>Time</th>
                                                    </tr>
                                                  </thead>
                                                  <tbody>
                                                  {rowTable}
                                                  
                                                  </tbody>         
                                            </ReactBootstrap.Table>        

                              </ReactBootstrap.Col>

                          </ReactBootstrap.Row>

                          <ReactBootstrap.Row>
                            <ReactBootstrap.Col>
                                    
                                        <ReactBootstrap.Table striped bordered condensed hover responsive>
                                              <thead>
                                                <tr>
                                                  <th>#</th>
                                                  <th>Task</th>
                                                  <th>Employee Name</th>
                                                  <th>Hours</th>
                                                </tr>
                                              </thead>
                                              <tbody>
                                                {taskfullDetails}
                                            
                                              </tbody>
                                          </ReactBootstrap.Table>    

                            </ReactBootstrap.Col>
                          </ReactBootstrap.Row>

                   </ReactBootstrap.Grid>
                                  
                  </div>
               ) 
    },
  _onChange: function() {
     
     this.setState({pieDataForMembers:reportAdminStore.reportMemberAllList()});
     this.setState({pieDataFortasks:reportAdminStore.reportTaskAllList()});
     
  }
    
    
});


module.exports = Adminreport;