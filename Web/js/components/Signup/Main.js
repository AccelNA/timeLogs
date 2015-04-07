/** @jsx React.DOM */
var React         =  require('react');
var UserAction		=	 require('../../actions/UserActions');	
var UserStore 		=  require('../../stores/UserStore');
var TextInput     =  require('../TextInput');
var ReactBootstrap  =    require('react-bootstrap');
var RButton       =  require('../Button');

var APP =
React.createClass({

     getInitialState:function(){
     	return({
     		data : '',
     		
     		});
     },
     componentDidMount:function(){

     

     },
   
    render:function(){
      return (
      	        <div>
                      

                       <ReactBootstrap.Row className="show-grid">
                          <ReactBootstrap.Col xs={6} md={4}></ReactBootstrap.Col><ReactBootstrap.Col xs={6} md={4}>
                          <ReactBootstrap.ListGroup>                          
                          <ReactBootstrap.ListGroupItem>
                            <form>
                            <h2>Sign in to Timesheet</h2>
                                    <TextInput type  = "text" label = "User Name"/>
                                    <TextInput type  = "password" label = "Password"/> 
                                    <RButton bsStyle = "primary" bsSize = "large" active caption="Login"/>
                            </form>
                          </ReactBootstrap.ListGroupItem> 
                          </ReactBootstrap.ListGroup> 
                          </ReactBootstrap.Col>
                          <ReactBootstrap.Col xs={6} md={4}></ReactBootstrap.Col>
                      </ReactBootstrap.Row>
                    
      				    
      			   </div>
      	)
    }
  });
module.exports = APP;