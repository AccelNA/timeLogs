var React		 	      = 		require('react');
var ReactPropTypes  = 		React.PropTypes;
var ReactBootstrap  = 		require('react-bootstrap');
var Table 			    = 		ReactBootstrap.Table;
var Griddle 		    = 		require('griddle-react');
var TimesheetActions=	 	require('../../actions/TimesheetActions');	
var TimeStore 		  = 	 	require('../../stores/TimeSheetDayStore');
var TextInput		    =	 	require('../TextInput');
var Modal 			    = 		ReactBootstrap.Modal;
var ModalTrigger    =       ReactBootstrap.ModalTrigger;
var ConfigCom       =       require('../../config/ConfigComp');
var jwt              =    require('jwt-simple');


var comuserId;






var Link = React.createClass({
  	
  	  getInitialState: function() {
			      
						  return({
						  	value : '',
						  });				
		},
   
	  getDeleteData : function(event){
		       if (confirm("Do you want to Delete this Task")) {
            TimesheetActions.timeDelete(this.props.rowData);
            //console.log(this.props.rowData);
        }
	   },
    render: function(){
        return (
         <div>
        	   <ReactBootstrap.Button bsStyle="danger" bsSize="xsmall" onClick={this.getDeleteData}>
          	   <ReactBootstrap.Glyphicon glyph="remove" /></ReactBootstrap.Button>
         </div>   
        )
    }
  });



var today = new Date();
var currentdate = today.toISOString().substring(0, 10);
$.cookie('currentdate', currentdate);


var ListSection	=	React.createClass({

   

		 getInitialState : function(){
          
         var tokenValue      =   localStorage.tokengen ; 
            if(tokenValue !== undefined){
                var secret         =   ConfigCom.secretKey; 
                decodedValue   =   jwt.decode(tokenValue, secret);
                comuserId      =   decodedValue.userId;
              } 
            else{
                comuserId       =   null;
              }


       return{
			 	 timeData:''
        
			 }
		  },
		 componentDidMount: function() {

               
          $.get(ConfigCom.serverUrl + "timelisttoday/userid/"+comuserId+"/currentdate/"+currentdate, function(result) {
                 if (this.isMounted()) {
                            
                            this.setState({timeData:result});
                            TimeStore.init(result);
                           // console.log(TimeStore.timeList(comuserId,currentdate));
                          //  this.setState({timeData:TimeStore.timeList(comuserId,currentdate)});
                     }

               }.bind(this));

   				TimeStore.addChangeListener(this._onChange);
  			},
 		 componentWillMount : function(){
         	       //this.setState({timeData:TimeStore.timeList()});
         	       TimeStore.removeChangeListener(this._onChange); 
         	        
          },
     getTimesheet :function(){
        // this.setState({timeData:TimesheetActions.timeCustomList('2015-03-29')});
         // TimeStore.removeChangeListener(this._onChange);  

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
			   		   <Griddle results={this.state.timeData}  resultsPerPage={3} enableInfiniteScroll={true} bodyHeight={200}
						    tableClassName="table" columns={["SINo", "Client", "Project","Task","Hours","Action"]} 
							    columnMetadata={columnMeta} showSettings={true} showFilter={true}/>
				 	</div>
				); 
			},	
			 
 _onChange: function() {
      this.setState({timeData:TimeStore.timeList()});
  }		
 });
module.exports = ListSection ;