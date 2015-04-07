/** @jsx React.DOM */
var React = require('react');
var UserAction		=	 require('../../actions/UserActions');	
var UserStore 		= 	 require('../../stores/UserStore');

var LIST = React.createClass ( {


       getInsitialState:function(){
            users = UserAction.list();
        }, 
       componentDidMount:function(){
           UserStore.addChangeListener(this._onChange);
        },
       componentWillMount : function(){
                  userData = UserStore.getAllUser();
                  this.setState({ userData : userData });
                  UserStore.removeChangeListener(this._onChange);
         },   
       render:function(){
            return(

                  <div>
                      <ul><li>{this.state.userData}</li></ul>
                  </div>

              )
        },  
       
 _onChange: function() {
     this.setState({userData:UserStore.getAllUser()});
  } 
    
  });
module.exports = LIST;