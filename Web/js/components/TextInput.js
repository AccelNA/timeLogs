var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var Input = ReactBootstrap.Input;

var ReactPropTypes = React.PropTypes;

var TextInput = React.createClass({

 propTypes: {
    type: ReactPropTypes.string,
    className: ReactPropTypes.string,
    label: ReactPropTypes.string,
    id: ReactPropTypes.string,
    name: ReactPropTypes.string,
    placeholder: ReactPropTypes.string,
    value: ReactPropTypes.string,
    focus: ReactPropTypes.string,
    customval: ReactPropTypes.string,
  },
  

  render: function() {
    return (
        <Input
          type={this.props.type}
          value={this.props.value}
          label={this.props.label}
          className={this.props.className}
	        id={this.props.id}
	        name={this.props.name}
          customval={this.props.customval}
	        placeholder={this.props.placeholder}
          hasFeedback
          groupClassName="group-class"
          wrapperClassName="wrapper-class"
          labelClassName="label-class"
          autoFocus={this.props.focus}
          onChange={this.props.setText} />
    );
  }
});

module.exports = TextInput;
