var React               =       require('react');
var ConfigCom			=	 	require('./config/ConfigComp');
var jwt                 =       require('jwt-simple');

var Router = require('react-router'); // or var Router = ReactRouter; in browsers
var Route = Router.Route, DefaultRoute = Router.DefaultRoute, Link=Router.Link, RouteHandler = Router.RouteHandler;

var ReactBootstrap = require('react-bootstrap');
var Nav = ReactBootstrap.Nav;

var ReactRouterBootstrap = require('react-router-bootstrap'),
  	NavItemLink = ReactRouterBootstrap.NavItemLink, ButtonLink = ReactRouterBootstrap.ButtonLink;

var Header = require('./components/Header');
var Footer = require('./components/Footer');

var Dashboard           = require('./components/Dashboard/Main');
var Project             = require('./components/project/Main');
var Tasks 		        = require('./components/task/Main');
var User 		        = require('./components/user/Main');
var Client 		        = require('./components/client/Main');
var TimeSheetDayView    = require('./components/timesheetdayview/Main');
var Login 		        = require('./components/Login/Main');
var SignUp 		        = require('./components/Signup/Main');
var Timesheetweekview   = require('./components/timesheetweekview/Main');
var ProjectAssign       = require('./components/projectassign/Main');  
var Report              = require('./components/report/Main');  


var comSwitchRole  = [];
var comSwitchRolew = [];

var App = React.createClass({


	render: function () { 

	var tokenValue		= 	$.cookie('tokengen');
			
	var comSwitchRole;

	if(tokenValue !== undefined){
			var secret 			= 	ConfigCom.secretKey; 
			var decodedValue 	= 	jwt.decode(tokenValue, secret);
			comSwitchRole 	    = 	decodedValue.role;
		}	
	else{
			comSwitchRole 	= 	ConfigCom.ROLE_GUEST;
	}	


    switch(comSwitchRole){

    	case ConfigCom.ROLE_ADMIN:
				return (    
					<div>
						<header>
							<Header/>
							<div className="pull-right mr-10">
								<Nav bsStyle="pills" Select={this.handleSubmit}>
									<NavItemLink to="Dashboard">Dashboard</NavItemLink>
									<NavItemLink to="project">Project</NavItemLink>
									<NavItemLink to="tasks">Tasks</NavItemLink>
									<NavItemLink to="user">Users</NavItemLink>
									<NavItemLink to="client">Client</NavItemLink>
                                    <NavItemLink to="projectassign">ProjectAssign</NavItemLink>
                                    <NavItemLink to="report">Report</NavItemLink>
								</Nav>	
							</div>	
						</header>
						<div className="rootcontainer">
							<RouteHandler/> 
						</div>    
						<Footer/>
					</div>
				 );	
   break;
   case ConfigCom.ROLE_USER:
			 	return (    
				<div>
					<header>
						<Header/>
						<div className="pull-right mr-10">
							<Nav bsStyle="pills" Select={this.handleSubmit}>
								<NavItemLink to="Dashboard">Dashboard</NavItemLink>
								<NavItemLink to="timesheetdayview">TimeSheetDayView</NavItemLink>
								
								<NavItemLink to="timesheetweekview">Timesheetweekview</NavItemLink>
							</Nav>	
						</div>	
					</header>
					<div className="rootcontainer">
						<RouteHandler/> 
					</div>    
					<Footer/>
				</div>
			  );	
	 break;
	 default:
              return (    
					<div>
						<header>
							<Header/>
							<div className="pull-right mr-10">
									<Nav bsStyle="pills" Select={this.handleSubmit} id="">
										<NavItemLink to="Dashboard">Dashboard</NavItemLink>
										<NavItemLink to="Login">Login</NavItemLink>
										
									</Nav>	
							</div>	
						</header>
						<div className="rootcontainer">
							<RouteHandler/> 
						</div>    
						<Footer/>
					</div>
				 );	
  
   }
 }
});

var routes = (
    <Route name="app" path="/" handler={App}>
    <Route name="Dashboard" handler={Dashboard}/>
    <Route name="Login" handler={Login}/>
    
    <Route name="project" handler={Project}/>
    <Route name="tasks" handler={Tasks}/>
    <Route name="user" handler={User}/>
    <Route name="client" handler={Client}/>
    <Route name="timesheetdayview" handler={TimeSheetDayView}/>
    <Route name="timesheetweekview" handler={Timesheetweekview}/>
    <Route name="projectassign" handler={ProjectAssign}/>
    <Route name="report" handler={Report} />
    
    <DefaultRoute handler={Dashboard}/>
    </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.body);
});
