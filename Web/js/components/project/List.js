var React		 	      = 		require('react');
var ReactPropTypes  = 		React.PropTypes;
var ReactBootstrap  = 		require('react-bootstrap');
var Table 			    = 		ReactBootstrap.Table;
var React 			    = 		require('react');
var Griddle 		    = 		require('griddle-react');
var ProjectAction		=	 	  require('../../actions/ProjectActions');	
var ProjectStore 		= 	 	require('../../stores/ProjectStore');
var Modal           =     ReactBootstrap.Modal;
var ModalTrigger    =     ReactBootstrap.ModalTrigger;
var TextInput       =     require('../TextInput');
var ConfigCom       =     require('../../config/ConfigComp');

  var Link = React.createClass({
  	

    getInitialState: function() {
    return ({
      value: '',
      client_name_opt: [],
      client_name: 0,
      is_billable: 'No',
      checked: false
      
    });
  },
  setTextState: function(event) {

    

    switch(event.target.id){            
        case 'project_name':

           this.setState({project_name: event.target.value });
        break;
        case 'client_name':
           this.setState({client_name  : event.target.value});
        break;
        case 'description':
           this.setState({description : event.target.value});
        break;
        case 'is_billable':
           if(event.target.checked)
            this.setState({is_billable : "Yes"});
           else
            this.setState({is_billable : "No"});
        break;
        default:
    }
  },
  updateproject:function(){
            
      project_name     = (typeof this.state.project_name !== 'undefined')? this.state.project_name:projectDetails['Project Name']; 
      client_name      = (typeof this.state.client_name !== 'undefined')? this.state.client_name:projectDetails['Client Name']; 
      description      = (typeof this.state.description !== 'undefined')? this.state.description:projectDetails['Description']; 
      projectId        = projectDetails['Action']; 
      
      

     ProjectDetail = {
        project_name:project_name, 
        description:description,
        client_name:client_name,
        is_billable:this.state.is_billable,
        projectId:projectId
        }; 


     

     ProjectAction.update(ProjectDetail);
    
     document.getElementById('projectForm').style.visibility = "hidden";
            
  },

 	getEditData : function(e){

     this.state.client_name_opt.push( <option key={0} value={''}>Select</option>);
     this.state.client_name_opt.push( <option key={1} value={'1'}>{'Client1'}</option> );
     this.state.client_name_opt.push( <option key={2} value={'2'}>{'Client2'}</option> );
     this.state.client_name_opt.push( <option key={3} value={'3'}>{'Client3'}</option> );


  		  projectDetails = this.props.rowData;

        React.render(
        <form className="well well-small" id="projectForm" >
                <Modal bsStyle="primary" title="Update Project Details" animation={true} >
                    
                    <div className="modal-body">
                    
                <div className="form-group has-feedback group-class">
                  <label className="control-label label-class" htmlFor="client_name">Client Name</label>
                  <select id="client_name" label="Select" className="form-control" onChange={this.setTextState} 
                    value={this.state.client_name} id="client_name" name="client_name" autoFocus="true">                 
                      {this.state.client_name_opt}
                </select>
                </div>  

                     <TextInput type="text" label="Project Name" placeholder={projectDetails['Project Name']} id="project_name" 
                                name="project_name"  setText={this.setTextState}
                                project_name={this.state.project_name}  />
                     
                      <TextInput type="textarea" label="Description" placeholder={projectDetails['Description']} id="description"
                                          name="description"  description={this.state.description} setText={this.setTextState}/> 

                     <TextInput type="checkbox" label='Is Billable' placeholder="Is Billable" id="is_billable" name="is_billable" 
                        setText={this.setTextState} value={this.state.is_billable} />
              

                    <TextInput type="hidden"  id="SINo"
                               name="SINo" 
                               value={projectDetails['SINo']} readonly  SINo={this.state.SINo} />  
                     


                    <ReactBootstrap.Button bsStyle="primary" onClick={this.updateproject}  >Update</ReactBootstrap.Button>
                    
                    </div>
                 </Modal>
                     
                
        </form>
        
        ,document.getElementById('modalWindow')
         );  
     
      document.getElementById('projectForm').style.visibility = "visible";  
  		 
	 },
	getDeleteData : function(e){
		 
        if (confirm("Do you want to Delete this Project Details")) {
            ProjectAction.projectDelete(this.props.rowData);

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

var projectListSection	=	React.createClass({

		 getInitialState : function(){

		   return{
			           	projectData:ProjectAction.projectList()
			       }
		  },
     componentWillMount : function(){
         	         this.setState({projectData:ProjectStore.projectList()});
                   ProjectStore.removeChangeListener(this._onChange);
          	         	
			},
     componentDidMount: function() {
                 
            $.get(ConfigCom.serverUrl + 'projectlist', function(result) {
                 if (this.isMounted()) {
                          this.setState(
                                 {projectData:ProjectStore.projectList()}
                              );
                     }
               }.bind(this));

            ProjectStore.addChangeListener(this._onChange);

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
			   		   <Griddle results={this.state.projectData}  resultsPerPage={3} enableInfiniteScroll={true} bodyHeight={300}
						    tableClassName="table" columns={["SINo", "Client Name", "Project Name","Description","Is Billable","Action"]} 
							    columnMetadata={columnMeta} showSettings={true} showFilter={true}/>
				 	</div>
				); 
			}, 
       
 _onChange: function() {
     this.setState({projectData:ProjectStore.projectList()});
  }   	 
 		});
 		
 		

module.exports = projectListSection;