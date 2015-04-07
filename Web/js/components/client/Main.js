/*
 * @Date 04-02-2015
 * The File is used for USER creation 
 * Dependency /components/TextInput.js  
 */
var React			=	 require('react');
var	RB				=	 require('react-bootstrap');
var TextInput		=	 require('../TextInput');
var ClientAction	=	 require('../../actions/ClientActions');	
var ClientStore 	= 	 require('../../stores/ClientStore');
var ListSection	    = 	 require('./List');


 var divStyle = {
           color: 'red'
     };   

 var mandetoryStyle = {
      color : 'red'
 };

var ClientMain	=	React.createClass({
	
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
		addClient : function(){
			
		    client_name = this.state.client_name;
			website = this.state.website;
			email_id = this.state.email_id;
			phone = this.state.phone;
			fax = this.state.fax;
			address_line1 = this.state.address_line1;
			address_line2 = this.state.address_line2;
			city = this.state.city;
			state_county = this.state.state_county;
			zip_postcode = this.state.zip_postcode;
			country_name = this.state.country_name;
			    
	       clientDetails={clientName:client_name,website:website,emailId:email_id,Phone:phone,Fax:fax,addressLine1:address_line1,
	           addressLine2:address_line2,City:city,stateCounty:state_county,zipPostcode:zip_postcode,countryName:country_name};
			

				if(client_name  ==  undefined ){
                        this.setState({errorMessage : 'Field Cannot Be Empty!'});
                  		return;
                 }

                else{
                    		ClientAction.create(clientDetails);
						    this.setState({client_name  : ''});
                }	

			
		},
		render	:	function(){
			
			
			 this.state.country_name_opt.push(<option key={0} value={0}>Select</option>);
     		 this.state.country_name_opt.push(<option key={1} value={'Austria'}>{'Austria'}</option> );
    		 this.state.country_name_opt.push(<option key={2} value={'India'}>{'India'}</option> );
     		 this.state.country_name_opt.push(<option key={3} value={'United Kingdom'}>{'United Kingdom'}</option> );
			
			
			       		return(
			        	<div>
			        	
			        	 <form className="well well-small" >
			        	  <RB.Row>
	        				<RB.Col xs={6}>
	        				    <span style={divStyle}>{this.state.errorMessage}</span>
							    <TextInput type="text" label="* Client Name" placeholder="Client Name" id="client_name" 
								  name="client_name" setText={this.setTextState} client_name={this.state.client_name} 
								  autoFocus="true" />
									  
								<TextInput type="text" label="Website" placeholder="Website" id="website"
									 name="website" setText={this.setTextState} website={this.state.website} />		
									 	
							    <TextInput type="text" label="Email" placeholder="Email" id="email_id"
									 name="email_id" setText={this.setTextState} email_id={this.state.email_id} />  
									 
								<TextInput type="text" label="Phone" placeholder="Phone" id="phone"
									 name="phone" setText={this.setTextState} phone={this.state.phone} />
									 
								<TextInput type="text" label="Fax" placeholder="fax" id="fax"
									 name="fax" setText={this.setTextState} phone={this.state.phone} />	   	  
								
							 </RB.Col>	
							 <RB.Col xs={6}>
	        				
							    <TextInput type="text" label="Address Line 1" placeholder="Address Line 1" id="address_line1" 
								  name="address_line1" setText={this.setTextState} address_line1={this.state.address_line1}  />
									  
								<TextInput type="text" label="Address Line 2" placeholder="Address Line 2" id="address_line2"
									 name="address_line2" setText={this.setTextState} last_name={this.state.address_line2} />		
							    <TextInput type="text" label="City" placeholder="City" id="city"
									 name="city" setText={this.setTextState} city={this.state.city}  />  
									 
								<TextInput type="text" label="State/County" placeholder="State/County" id="state_county"
									 name="state_county" setText={this.setTextState} city={this.state.state_county} /> 
									  	 
								<TextInput type="text" label="Zip/Post Code" placeholder="Zip/Post Code" id="zip_postcode"
									 name="zip_postcode" setText={this.setTextState} city={this.state.zip_postcode} />
									 
								<div className="form-group has-feedback group-class">
	        					<label className="control-label label-class" htmlFor="country_name">Country Name</label>
								<select id="country_name" label="Select" className="form-control" onChange={this.setTextState} 
					        			value={this.state.country_name} id="country_name" name="country_name" >					        				         	{this.state.country_name_opt}
								</select>
								</div>	   
								<span style={mandetoryStyle}>* Mandetory Field</span> <br/>	  	  
								<RB.Button bsStyle="primary" onClick={this.addClient}>Save</RB.Button> 
								
							 </RB.Col>	
					     </RB.Row>
					     </form>
					     <div id="modalWindow"></div>
					     <ListSection />		 
						 </div>
							) 
		}
		
});

module.exports = ClientMain;