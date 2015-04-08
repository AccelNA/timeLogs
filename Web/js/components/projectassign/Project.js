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
             axios.get(ConfigCom.serverUrl + 'projectlistautocomplete').then(function(resp) {
                   cb(resp.data.projects.filter(function(one) {
                      
                       return one.project.Projectname.toLowerCase().indexOf(key.toLowerCase()) > -1;
           }));
         });
       }, 1000);
                
       
            
                
            },
    itemSelected: function(itm) {
                
                this.setState({projectname:itm.project.Projectname});
    },
    render: function() {
      return (
          <div className="container">
            <h1>Project Name</h1>
            <div className="row">
              <div className="col-md-5">
                <AutocompleteInput label="Project Name" placeholder="Start typing.." onSearch={this.searchRequested} onItemSelect={this.itemSelected} value={this.state.projectname}/>
              </div>
            </div>
          </div>
          );
    }
  });
module.exports = App;