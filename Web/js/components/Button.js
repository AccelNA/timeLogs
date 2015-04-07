var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var RButton = ReactBootstrap.Button;

var ReactPropTypes = React.PropTypes;

var BButton = React.createClass({

 propTypes: {
    bsStyle: ReactPropTypes.string,
    bsSize : ReactPropTypes.string,
    caption: ReactPropTypes.string
  },
  

  render: function() {
    return (
        <RButton
          bsStyle={this.props.bsStyle}
          bsSize={this.props.bsSize}
          onClick={this.props.submitForm}>{this.props.caption}</RButton>
    );
  }
});

module.exports = BButton;
