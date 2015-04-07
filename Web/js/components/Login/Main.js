/** @jsx React.DOM */
var React         =  require('react');
var AuthAction		=	 require('../../actions/AuthActions');	
var AuthStore 		=  require('../../stores/AuthStore');
var TextInput     =  require('../TextInput');
var ReactBootstrap  =    require('react-bootstrap');
var RButton       =  require('../Button');


 var divStyle = {
           color: 'red'
     };   

 var mandetoryStyle = {
      color : 'red'
 };    

var APP =
React.createClass({

   
     getInitialState:function(){
     	return({
     		data : '',
     		
     		});
     },
  componentDidMount:function(){
     },

     _login:function(){
               var authDetails = [];
               authDetails.push({'userName':this.state.userName,'password':this.state.userPassword});
               
                if(this.state.userName  ==  undefined || this.state.userPassword == undefined){
                        this.setState({errorMessage : 'Field Cannot Be Empty!'});
                  return;
                 }

                else{
                   this.setState({errorMessage : ' '});
                   AuthAction.signIn(authDetails);
                }

              

     },
    setTextState : function(event){
          
            switch(event.target.id){
            
              case 'userName':
                 this.setState({userName  : event.target.value});
              break;
              case 'userPassword':
                 this.setState({userPassword  : event.target.value});
              break;
              default:
          }
  
    },
    render:function(){
      return (
      	        <div>
                      

                       <ReactBootstrap.Row className="show-grid">
                          <ReactBootstrap.Col xs={6} md={4}></ReactBootstrap.Col><ReactBootstrap.Col xs={6} md={4}>
                          <ReactBootstrap.ListGroup>                          
                          <ReactBootstrap.ListGroupItem>
                            <form name="logiForm" method="post">
                            <h2>Sign in to Timesheet</h2>
                             <span style={divStyle}>{this.state.errorMessage}</span>
                           
                            <div id='loginErrorMessage'></div>
                                     <TextInput type ="email" label ="* User Email" name="userName" id ="userName" userName ={this.state.userName} 
                                               setText={this.setTextState}/>
                                    

 
                                     <TextInput type  = "password" label = "* Password" name="userPassword" id="userPassword"
                                               userPassword= {this.state.userPassword} setText={this.setTextState}/> 

                                     <span style={mandetoryStyle}>* Mandetory Field</span> <br/>         
                                    <RButton bsStyle = "primary" bsSize = "large" active caption="Login" submitForm={this._login}/>


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