var React     =     require('react');
var ReactPropTypes  =     React.PropTypes;
var ReactBootstrap  =     require('react-bootstrap');
var Table       =     ReactBootstrap.Table;
var React       =     require('react');
var Griddle     =     require('griddle-react');
var TimesheetActions = require('../../actions/TimesheetDayViewActions');
var TimeSheetStore    =     require('../../stores/TimeSheetDayStore');



  var Link = React.createClass({
    
  getEditData : function(e){
        console.log(this.props.rowData);
       
   },
  getDeleteData : function(e){
      console.log(this.props.rowData);
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

var ListSection  = React.createClass({

     getInitialState : function(){
       return{
        timeData:TimesheetActions.timeList()
       }
      },
      componentWillMount : function(){
                   this.setState({timeData:TimesheetActions.timeList()});
                   TimeSheetStore.removeChangeListener(this._onChange); 
                      
      },
     componentDidMount: function() {
          TimeSheetStore.addChangeListener(this._onChange);
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
               <Griddle results={this.state.timeData}  
                tableClassName="table" columns={["SINo", "Client", "projectName","Task","Hours","Action"]} 
                  columnMetadata={columnMeta} showSettings={true} showFilter={true}/>
          </div>
        ); 
      },  
       
 _onChange: function() {
      this.setState({timeData:TimesheetActions.timeList()});
  }   
    });
module.exports = ListSection;