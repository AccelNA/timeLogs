var React = require('react');

var Router = require('react-router'); // or var Router = ReactRouter; in browsers
var Route = Router.Route, DefaultRoute = Router.DefaultRoute, Link=Router.Link, RouteHandler = Router.RouteHandler;

var ReactBootstrap = require('react-bootstrap');
var Nav = ReactBootstrap.Nav;

var ReactRouterBootstrap = require('react-router-bootstrap'),
  	NavItemLink = ReactRouterBootstrap.NavItemLink, ButtonLink = ReactRouterBootstrap.ButtonLink;

var Header = require('./components/Header');
var Footer = require('./components/Footer');

var Dashboard = require('./components/Dashboard/Main');
var Project = require('./components/project/Main');
var Tasks = require('./components/task/Main');
var User = require('./components/user/Main');
var Client = require('./components/client/Main');
var TimeSheetDayView = require('./components/timesheetdayview/Main');

var App = React.createClass({
	render: function () {  	
	return (    
		<div>
			<header>
				<Header/>
				<div className="pull-right mr-10">
					<Nav bsStyle="pills" Select={this.handleSubmit}>
						<NavItemLink to="dashboard">Dashboard</NavItemLink>
						<NavItemLink to="project">Project</NavItemLink>
						<NavItemLink to="tasks">Tasks</NavItemLink>
						<NavItemLink to="user">Users</NavItemLink>
						<NavItemLink to="client">Client</NavItemLink>
						<NavItemLink to="timesheetdayview">TimeSheetDayView</NavItemLink>
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
});

var routes = (
    <Route name="app" path="/" handler={App}>
    <Route name="dashboard" handler={Dashboard}/>
    <Route name="project" handler={Project}/>
    <Route name="tasks" handler={Tasks}/>
    <Route name="user" handler={User}/>
    <Route name="client" handler={Client}/>
    <Route name="timesheetdayview" handler={TimeSheetDayView}/>
    <DefaultRoute handler={Dashboard}/>
    </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.body);
});
