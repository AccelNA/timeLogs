'use strict';

var React = require('react');

module.exports = React.createClass({displayName: "exports",

  propTypes: {
    fill: React.PropTypes.string,
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    offset: React.PropTypes.number
  },

  getDefaultProps:function() {
    return {
      offset: 0
    };
  },

  render:function() {
    return (
      React.createElement("rect", {
        fill: this.props.fill, 
        width: this.props.width, 
        height: this.props.height, 
        x: this.props.offset, 
        y: this.props.availableHeight  - this.props.height, 
        className: "rd3-barchart-bar"}
      )
    );
  }
});
