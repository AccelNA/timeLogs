var React		     =   require('react');
var AutocompleteCommon =   require('./Common');

var Projectassign = React.createClass({
    
    getInitialState : function(){
            return({
                     usernameprops : ''
                   });
    },
    render  :function(){
        
         return (
                <div>
                      <AutocompleteCommon />
                                     
                </div>
               ) 
    }
    
});


module.exports = Projectassign;