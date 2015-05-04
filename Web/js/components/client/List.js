var React		 	= 		require('react');
var ReactPropTypes  = 		React.PropTypes;
var ReactBootstrap  = 		require('react-bootstrap');
var Table 			= 		ReactBootstrap.Table;
var Griddle 		= 		require('griddle-react');
var ClientAction	=	 	require('../../actions/ClientActions');	
var ClientStore 	= 	 	require('../../stores/ClientStore');
var TextInput		=	 	require('../TextInput');
var Modal 			= 		ReactBootstrap.Modal;
var ModalTrigger    =       ReactBootstrap.ModalTrigger;
var ConfigCom       =     require('../../config/ConfigComp');

var clientData = [];

var Link = React.createClass({
  	
  	
  	getInitialState: function() {
			
						  return({
						  	value : '',
						  	country_name_opt: [],
							country_name: 0,
						  });				
		},
	  setTextState : function(event){
			     
			      switch(event.target.id){
				  	case 'client_name':
				  		this.setState({client_name  : event.target.value});
				  	break;
				  	case 'website':
				  		this.setState({website  : event.target.value});
				  	break;
				  	case 'email_id':
				  		this.setState({email_id  : event.target.value});
				  	break;
				  	case 'phone':
				  		this.setState({phone  : event.target.value});
				  	break;
				  	case 'fax':
				  		this.setState({fax  : event.target.value});
				  	break;
				  	case 'address_line1':
				  		this.setState({address_line1  : event.target.value});
				  	break;
				  	case 'address_line2':
				  		this.setState({address_line2  : event.target.value});
				  	break;
				  	case 'city':
				  		this.setState({city  : event.target.value});
				  	break;
				  	case 'state_county':
				  		this.setState({state_county  : event.target.value});
				  	break;
				  	case 'zip_postcode':
				  		this.setState({zip_postcode  : event.target.value});
				  	break;
				  	case 'country_name':
				  		this.setState({country_name  : event.target.value});
				  	break;
				  	default:
				  	break;
				  }
	
		},
		
	 updateClient:function(){
	 	
	  	    
			client_name 	=	(typeof this.state.client_name !== 'undefined')? this.state.client_name:clientDetail['Client Name']; 
			website 		=	(typeof this.state.website !== 'undefined')? this.state.website:clientDetail['Website']; 
			email_id		= 	(typeof this.state.email_id !== 'undefined')? this.state.email_id:clientDetail['Email']; 
			phone 			=	(typeof this.state.phone !== 'undefined')? this.state.phone:clientDetail['Phone']; 
			fax 			= 	(typeof this.state.fax !== 'undefined')? this.state.fax:clientDetail['Fax']; 
			address_line1 	= 	(typeof this.state.address_line1 !== 'undefined')? this.state.address_line1:clientDetail['Address 1']; 
			address_line2 	= 	(typeof this.state.address_line2 !== 'undefined')? this.state.address_line2:clientDetail['Address 2']; 
			city			=	(typeof this.state.city !== 'undefined')? this.state.city:clientDetail['City']; 
			state_county 	= 	(typeof this.state.state_county !== 'undefined')? this.state.state_county:clientDetail['Country']; 
			zip_postcode	= 	(typeof this.state.zip_postcode !== 'undefined')? this.state.zip_postcode:clientDetail['State']; 
						
			
			 
			clientId		=	 clientDetail['Action']; 
			
			clientDetails	=	{clientName:client_name,website:website,emailId:email_id,Phone:phone,Fax:fax,addressLine1:address_line1,
	           			         addressLine2:address_line2,City:city,stateCounty:state_county,zipPostcode:zip_postcode,countryName:country_name};
	           			
	        ClientAction.clientEdit(clientDetails);
	  	    
	  	    document.getElementById('clientForm').style.visibility = "hidden";
	  	    
	  },
  	getEditData : function(e){
  		  
  		     clientDetail = (this.props.rowData);
  		  
  		     this.state.country_name_opt.push(<option key={0} value={0}>Select</option>);
     		 this.state.country_name_opt.push(<option key={1} value={'Austria'}>{'Austria'}</option> );
    		 this.state.country_name_opt.push(<option key={2} value={'India'}>{'India'}</option> );
     		 this.state.country_name_opt.push(<option key={3} value={'United Kingdom'}>{'United Kingdom'}</option> );
  		 
  		React.render(
  		  <form className="well well-small" id="clientForm" >
  		  				<Modal bsStyle="primary" title="Update Client Details" animation={true}  style="width: 500px;">
          					 <ReactBootstrap.Row>
          					 
          					  <ReactBootstrap.Col xs={6}>
          					 	
          					 	<TextInput type="text" label="Client Name" placeholder={clientDetail['Client Name']} id="client_name" 
								  name="client_name" setText={this.setTextState} client_name={this.state.client_name} 
								   autoFocus="true" />
								 							  
									  
								<TextInput type="text" label="Website" placeholder={clientDetail['Website']} id="website"
									 name="website" setText={this.setTextState} website={this.state.website} />		
									 	
							    <TextInput type="text" label="Email" placeholder={clientDetail['Email']} id="email_id"
									 name="email_id" setText={this.setTextState} email_id={this.state.email_id} />  
									 
								<TextInput type="text" label="Phone" placeholder={clientDetail['Phone']} id="phone"
									 name="phone" setText={this.setTextState} phone={this.state.phone} />
									 
								<TextInput type="text" label="Fax" placeholder={clientDetail['Fax']} id="fax"
									 name="fax" setText={this.setTextState} phone={this.state.fax} />	
          					 	
          					 	
          					   </ReactBootstrap.Col>	
							   <ReactBootstrap.Col xs={6}>
							   	<TextInput type="text" label="Address Line 1" placeholder={clientDetail['Address 1']} id="address_line1" 
								  name="address_line1" setText={this.setTextState} address_line1={this.state.address_line1}  />
									  
								<TextInput type="text" label="Address Line 2" placeholder={clientDetail['Address 2']} id="address_line2"
									 name="address_line2" setText={this.setTextState} last_name={this.state.address_line2} />
									 		
							    <TextInput type="text" label="City" placeholder={clientDetail['City']} id="city"
									 name="city" setText={this.setTextState} city={this.state.city}  />  
									 
								<TextInput type="text" label="State/County" placeholder={clientDetail['Country']} id="state_county"
									 name="state_county" setText={this.setTextState} city={this.state.state_county} /> 
									  	 
								<TextInput type="text" label="Zip/Post Code" placeholder={clientDetail['State']} id="zip_postcode"
									 name="zip_postcode" setText={this.setTextState} city={this.state.zip_postcode} />
									 
								<div className="form-group has-feedback group-class">
	        						<label className="control-label label-class" htmlFor="country_name">Country Name</label>
									<select id="country_name" label="Select" className="form-control" onChange={this.setTextState} 
					        			value={this.state.country_name} id="country_name" name="country_name" >					        				         										{this.state.country_name_opt}
									</select>
								</div>	 
								<ReactBootstrap.Button bsStyle="primary" onClick={this.updateClient} >Update</ReactBootstrap.Button> 			 
          					   </ReactBootstrap.Col>
          					 	  
          					 </ReactBootstrap.Row>
        			   </Modal>
  		   </form>,document.getElementById('modalWindow')
  		  
  		  );
  		 document.getElementById('clientForm').style.visibility = "visible";  
	 },
	getDeleteData : function(e){
		  console.log(this.props.rowData);
		   if (confirm("Do you want to Delete this Client Details")) {
     				ClientAction.clientDelete(this.props.rowData);
     		}
	},
    render: function(){
        return (
         <div>
        	   	
            <ReactBootstrap.Button bsStyle="info" bsSize="xsmall" onClick={this.getEditData}>
            <ReactBootstrap.Glyphicon glyph="edit" /></ReactBootstrap.Button>
          	&nbsp;
          	<ReactBootstrap.Button bsStyle="danger" bsSize="xsmall" onClick={this.getDeleteData}>
          	<ReactBootstrap.Glyphicon glyph="remove" /></ReactBootstrap.Button>
         </div>   
        )
    }
  });

var ListSection	=	React.createClass({

		getInitialState : function(){
		   return{
			 	clientData:ClientAction.clientList()
			 }
		  },
        componentWillMount : function(){
         	         this.setState({clientData:ClientStore.clientList()});
         	          ClientStore.removeChangeListener(this._onChange);
          	         	
			},
		componentDidMount: function() {
                 
            $.get(ConfigCom.serverUrl + 'clientlist', function(result) {
                 if (this.isMounted()) {
                          this.setState(
                                 {clientData:ClientStore.clientList()}

                              );
                          	
                     }
               }.bind(this));

            ClientStore.addChangeListener(this._onChange);

         },
		render  : function(){
         	
        var columnMeta = [
            {
                'columnName': 'Action',
                'locked': false,
                'visible': true,
                'customComponent': Link
            }
        ];

         	   	return(
			   		<div>
			   		   <Griddle results={this.state.clientData}  resultsPerPage={3} enableInfiniteScroll={true} bodyHeight={300}
						    tableClassName="table" 
columns={["SINo", "Client Name","Website","Email","Phone","Fax","Address 1","Address 2","City","State","Country","Action"]} 
							    columnMetadata={columnMeta} showSettings={true} showFilter={true}/>
				 	</div>
				); 
			},	
			 
 _onChange: function() {
     this.setState({clientData:ClientStore.clientList()});
  }		
 });
module.exports = ListSection ;