/**
 * Header
 */

var React = require('react');

var ReactPropTypes = React.PropTypes;

var Header = React.createClass({

  propTypes: {
    className: ReactPropTypes.string    
  },
  render: function() {
    return (
    	  <div>
	          <div className="top"><h3>Accel Timesheet</h3></div>          
	          <div className="navh"></div>
          </div>
	      
    );
  }

});

module.exports = Header;