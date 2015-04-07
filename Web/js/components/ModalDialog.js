var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var Modal = ReactBootstrap.Modal;
var ModalTrigger=ReactBootstrap.Modal;
var Button=ReactBootstrap.Button;



var MyModal = React.createClass({
	
	
  render: function() {
    return (
        <Modal {...this.props} bsStyle="primary" title="Update User Details" animation={false}>
          <div className="modal-body">
           
          </div>
        </Modal>
      );
  }
});




module.exports = MyModal;