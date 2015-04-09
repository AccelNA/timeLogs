var React		             =   require('react');
var AutocompleteInput    =   require('react-bootstrap-async-autocomplete');
var ConfigCom            =   require('../../config/ConfigComp');
var axios                =   require('axios');
var ReactBootstrap       =   require('react-bootstrap');
var userActions          =   require('../../actions/UserActions');

var buttonStyle = { marginLeft: '16px' };
var tableStyle = { left: '301px' };
var tableRow = [] ;

var Table = React.createClass({
            
            getDeleteData : function(){

            },
            content :function(){

               return [
                         <td>{this.props.project}</td>,
                         <td>{this.props.user}</td>,
                         <td><ReactBootstrap.Button bsStyle="danger" bsSize="xsmall" onClick={this.getDeleteData}>
                            <ReactBootstrap.Glyphicon glyph="remove" /></ReactBootstrap.Button></td>
                      ]
             },
            render: function(){
              return(<tr>{this.content()}</tr>)
            }

            });

var App = React.createClass({
    
    getInitialState:function(){
      return ({
              projectname:'',
              gridTab:''
              })  
    },
    searchRequested : function(key, cb) {
            setTimeout(function() { //Emulate async 
             axios.get(ConfigCom.serverUrl + 'userlistautocomplete').then(function(resp) {
                   cb(resp.data.users.filter(function(one) {
                      
                       return one.user.username.toLowerCase().indexOf(key.toLowerCase()) > -1;
           }));
         });
       }, 1000);
    },
   searchRequestedProject : function(key, cb) {
            setTimeout(function() { //Emulate async 
             axios.get(ConfigCom.serverUrl + 'projectlistautocomplete').then(function(resp) {
                   cb(resp.data.projects.filter(function(one) {
                      
                       return one.project.Projectname.toLowerCase().indexOf(key.toLowerCase()) > -1;
           }));
         });
       }, 1000);
      },
    itemSelected: function(itm) {
                
                this.setState({username:itm.user.username});
    },
    itemSelectedProject: function(itm) {
                
                this.setState({projectname:itm.project.Projectname});
    },
    getValue:function(){

          tableRow.push(<Table user={this.state.username} project={this.state.projectname}/>);
          this.setState({gridTab:tableRow});
          this.setState({username:''});
          this.setState({projectname:''});

          userFirstArray = this.state.username;
          userSecondArray = [];
          userSecondArray = userFirstArray.split("-");
          userId=userSecondArray[0];

          projectFirstArray = this.state.projectname;
          projectSecondArray = [];
          projectSecondArray = userFirstArray.split("-");
          projectId=projectSecondArray[0];
          
          userDetails={"user":userId,"project":projectId};
          userActions.userProjectAssign(userDetails);
    },
    render: function() {
      return (
     <div>

        <ReactBootstrap.Grid>
               <ReactBootstrap.Row className="show-grid">
                          <ReactBootstrap.Col xs={6} md={6}>
                            <div className="container">
                               <h1>Project Name</h1>
                                <div className="row">
                                 <div className="col-md-5">
                                       <AutocompleteInput label="Project Name" 
                                          placeholder="Start typing.." 
                                          onSearch={this.searchRequestedProject} 
                                          onItemSelect={this.itemSelectedProject} value={this.state.projectname}
                                       />
                                 </div>
                                </div>
                            </div>                 
                     </ReactBootstrap.Col>
                     
                     <ReactBootstrap.Col xs={6} md={6}>
                            <div className="container">
                                  <h1>Employee Name</h1>
                                        <div className="row">
                                            <div className="col-md-5">
                                                 <AutocompleteInput label="Employee Name" 
                                                  placeholder="Start typing.." onSearch={this.searchRequested} 
                                                  onItemSelect={this.itemSelected} value={this.state.username} addUserItem={this.addUserItemt} />
                                             </div>
                                            </div>
                                        </div>
                    </ReactBootstrap.Col>
            </ReactBootstrap.Row>
                   
              <ReactBootstrap.Row className="show-grid">
                  <ReactBootstrap.Col xs={6} md={6}>
                     <input type="button" value="Add" onClick={this.getValue} style={buttonStyle}/> 
                  </ReactBootstrap.Col>
                <ReactBootstrap.Col xs={6} md={6}></ReactBootstrap.Col>
              </ReactBootstrap.Row>

              <ReactBootstrap.Row className="show-grid">
              <ReactBootstrap.Col xs={6} md={6}><br /></ReactBootstrap.Col>
              </ReactBootstrap.Row>              

              <ReactBootstrap.Row className="show-grid" >
                  <ReactBootstrap.Col xs={6} md={6}  style={tableStyle}>
                   
                  <ReactBootstrap.Table  striped bordered condensed hover>
                     <thead>
                       <th>Project</th>
                       <th>Employee</th>
                       <th>Action</th>

                     </thead>
                     <tbody>
                          {this.state.gridTab}
                     </tbody>
                   </ReactBootstrap.Table>  

                  </ReactBootstrap.Col>
                <ReactBootstrap.Col xs={6} md={6}></ReactBootstrap.Col>
              </ReactBootstrap.Row>


    </ReactBootstrap.Grid>   
  </div>
  );
 }
});
module.exports = App;

     