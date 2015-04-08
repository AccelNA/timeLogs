var React		 =   require('react');
var ReactBootstrap	 =   require('react-bootstrap');
var Autocomplete         =   require('./Project');
var AutocompleteUser         =   require('./User');

var Projectassign = React.createClass({
    
    addUserItem  :function(){
             console.log('asdd');    
        },
    render  :function(){
        
         return (
                <div>
                      
                      <ReactBootstrap.Grid>
			  <ReactBootstrap.Row className="show-grid">
			        	  		
			        	<ReactBootstrap.Col xs={6} md={6}>
                                            <Autocomplete />
                                       </ReactBootstrap.Col>
         						 
                                        <ReactBootstrap.Col xs={6} md={6}>
                                           <AutocompleteUser />
                                        </ReactBootstrap.Col>
          		 </ReactBootstrap.Row>
                   
                    <ReactBootstrap.Row className="show-grid">
                        <ReactBootstrap.Col xs={6} md={6}>
                            <input type="button" value="+" onClick={this.addUserItem}/> 
                        </ReactBootstrap.Col>
                        <ReactBootstrap.Col xs={6} md={6}>
                        </ReactBootstrap.Col>
                        </ReactBootstrap.Row>
                    </ReactBootstrap.Grid>                                  
                </div>
               ) 
    }
    
});


module.exports = Projectassign;