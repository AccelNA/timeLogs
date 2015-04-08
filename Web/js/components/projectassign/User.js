var React		 =   require('react');
var AutocompleteInput    =   require('react-bootstrap-async-autocomplete');
var ConfigCom            =   require('../../config/ConfigComp');
var axios                =   require('axios');


var App = React.createClass({
    
    getInitialState:function(){
      return ({
              projectname:''
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
    itemSelected: function(itm) {
                
                this.setState({username:itm.user.username});
    },
    render: function() {
      return (
          <div className="container">
            <h1>User Name</h1>
            <div className="row">
              <div className="col-md-5">
                <AutocompleteInput label="User Name" placeholder="Start typing.." onSearch={this.searchRequested} onItemSelect={this.itemSelected} value={this.state.username}/>
              </div>
            </div>
          </div>
          );
    }
  });
module.exports = App;