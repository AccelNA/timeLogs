# timeLogs 
===============

TimeLogs is a timesheet tool for managing time on perticular task which comes under different projects.

###Table of Contents  
* [Technologies Used][]
* [Features][]
* [Functionality][]
* [How to build][]
* [Application Work Flow][]
* [Application architecture](https://github.com/AccelNA/timeLogs/blob/master/application_flux_architecture.md)
* [Security](https://github.com/AccelNA/timeLogs/blob/master/security.md)

##Technologies Used

* Frontend Library: ReactJS
* Database: MySql
* Server-side: PHP


##<a name="Features"></a>Features
TimeLogs is a tool which is used to track entire time for each task. TimeLogs is a way to implemet timesheet in a organisation. Timesheet is a method for recording the amount of a worker's time spent on each job. Here two different types of user interface can used for  different user role like Admin or Employee. In employee's User Interface, there are two main pages are available. One is used to time entering for one day and other link is used to enter the time for one week. Here we can see the time table for current day. The second inteface is for admin, Whch contains all the configuration part like all Create, Edit, Delete for Client, Project, Task and User etc. Here we can assign each task to any employee in the organisation. 

Timelogs is mainly focus to implement **ReactJS** and it's different **React components**. Entire application is build based on **FLUX** architecture. Here backend is **RESTful** service with **PHP** and **MySql**. Another important feature is authontication is based on **token**. So auth data treated as stateless.      

The general idea of FLUX architecture pattern can find [here](https://facebook.github.io/flux/docs/overview.html)

The FLUX architecture of this application will find [here](https://github.com/AccelNA/timeLogs/blob/master/application_flux_architecture.md)

The security details of this application can find [here](https://github.com/AccelNA/timeLogs/blob/master/security.md)


##<a name="Functionality"></a>Functionality

* Login for user
* For Admin: Create, Edit, Delete, Update, search, filter and pagination Client
* For Admin: Create, Edit, Delete, Update, search, filter and pagination Project
* For Admin: Create, Edit, Delete, Update, search, filter and pagination Task
* For Admin: Create, Edit, Delete, Update, search, filter and pagination User/Employee
* For Admin: Assign Employee to task.
* For Employee: Insert/Delete timesheet for a day.
* For Employee: Inset/Delete tomesheet for a week 
* TimeLogs Report

##Screenshots

* Home Page
![Home Page](https://github.com/AccelNA/aws-coe/blob/master/contents/images/timeLogsLogin.png)<br/>
<hr/>
* Login Page
![Home Page](https://github.com/AccelNA/aws-coe/blob/master/contents/images/TimeLogsLogin2.png)<br/>
<hr/>

* Admin Home Page

In this page, You can slect different navigation link. This page only for logged in as a Admin. 

![Admin Home Page](https://github.com/AccelNA/aws-coe/blob/master/contents/images/timeLogsAdminHome.png)<br/>
<hr/>
* Project Page
![Project List Page](https://github.com/AccelNA/aws-coe/blob/master/contents/images/timeLogsprojectName.png)<br/>
<hr/>
* Project Edit Page
![Project List Page](https://github.com/AccelNA/aws-coe/blob/master/contents/images/ProjectEditPage.png)<br/>
<hr/>
* Project Search Page
![Project List Page](https://github.com/AccelNA/aws-coe/blob/master/contents/images/timelogProjectSearch.png)<br/>
<hr/>

* Task page
![TASK Page](https://github.com/AccelNA/aws-coe/blob/master/contents/images/TimeLogTaskpage.png)<br/>
<hr/>

* User/Employee List Page
![Project List Page](https://github.com/AccelNA/aws-coe/blob/master/contents/images/timeLogsUserPage.png)<br/>
<hr/>

* Client Page
![Project List Page](https://github.com/AccelNA/aws-coe/blob/master/contents/images/Client Adding page.png)<br/>
<hr/>

* Assign an employee to project 
![Project List Page](https://github.com/AccelNA/aws-coe/blob/master/contents/images/TImeLogsProject-Employee-Assign.png)<br/>
<hr/>

* User/Employee Page

This is the Home page for User/Employee

![Project List Page](https://github.com/AccelNA/aws-coe/blob/master/contents/images/timeLogsEMPLOYEEPage.png)<br/>
<hr/>

* Time Entry For A Day

In this page, you can enter time for each corresponding to task. 

![Project List Page](https://github.com/AccelNA/aws-coe/blob/master/contents/images/TimeSheetEmployeeOneDay.png)<br/>
<hr/>

* Time Entry For A Week

In this page, you can enter time for each corresponding to task. 

![Project List Page](https://github.com/AccelNA/aws-coe/blob/master/contents/images/timeLogsMultiEntry.png)<br/>
<hr/>


* Report

The entire time logs report is showing in this page

![Project List Page](https://github.com/AccelNA/aws-coe/blob/master/contents/images/ReportPageAdmin.png)<br/>
<hr/>

##<a name="Build"></a>How to build

###Prerequisites

* First you need to install Node.js. In this application we have used different types of Node packeages. You can find [installation details from here](https://nodejs.org).
* In server side, we are using php and databse is MySql, So you need to install [WAMP server](http://www.wampserver.com/en/) or [LAMP Server](https://help.ubuntu.com/community/ApacheMySQLPHP).

To Build this application, You need to have some configurations done in your root folder. The entire source [code avalibale here](https://github.com/AccelNA/timeLogs). In the root folder **_timeLogs_** have two subfolder which named as **_WEB_** and **_API_**. 

The API folder contains entire server side scripting files. **_Index.php_** is used to manage all server side operation. The file [location is here](https://github.com/AccelNA/timeLogs/blob/master/API/index.php). You can edit Username, Password and Database name from this file for your database configuration. No other changes required in this folder. All other files can use in the API folder as [given here](https://github.com/AccelNA/timeLogs/tree/master/API). In this API folder have a file _*timesheet.sql*_, this is the schema of database. You can import into your MySql database.  

The WEB folder have entire frontend part of this application. You need to configure  the file [located here](https://github.com/AccelNA/timeLogs/blob/master/Web/js/config/ConfigComp.js). You can change Server URL and Client URL. In this [location](https://github.com/AccelNA/timeLogs/tree/master/Web), You can find **_package.json_** file. In this file you need to change some corresponding to your root folder.

_**Line Number 5: Change your root location**_

_**Line Number 30: Change root location here also**_

Keep all other as it is.

Next step is to run entire application. For this purpose you can follow thse steps

**Step 1** : In Windows OS start command prompt. 

**Step 2** : Then Navigate to [folder here](https://github.com/AccelNA/timeLogs/tree/master/Web).

**Step 3** : Then type command 'npm install'. This will install essential node modules in node_module folder. If any node packages are missing just copy all node folder from [here](https://github.com/AccelNA/timeLogs/tree/master/Web/node_modules)  and paste into your node_module folder.

**Step 3** : Then type command 'npm start'.

**Step 4** : Navigate to [this folder location](https://github.com/AccelNA/timeLogs/blob/master/Web/index.html). Then click and run this file in your browser.

## <a name="Application-Work-Flow">Application Work Flow</a> 

In this section we are explaining work flow of this application with one module.
Here we consider the module **tasks**. In this module mainly ADD,EDIT,DELETE and LIST operations are performing. The below image showing page of **Tasks**.

<hr/>
![TASK Page](https://github.com/AccelNA/aws-coe/blob/master/contents/images/TimeLogTaskpage.png)<br/>
<hr/>

After the routing operation from **app.js**, you can see the above page. In this page some HTML components and task list view is also showing. So we are first focus on HTML components and HTML forms.
This is the folder [location](https://github.com/AccelNA/timeLogs/tree/master/Web/js/components/task).

Inside this folder we have two files

* List.js
* Main.js

Application will first routing to **Main.js**. Inside this we include essentail node packages and after that creating a class named as **Tasks**. 

    var Tasks = React.createClass({
    });

In this class, we have one essential function **render** and that function is rendering all HTML component to web pages.

    var Tasks = React.createClass({
        render : function(){
         // Render HTML component here
        }
    });
    
Here we have different HTML components like textField, Dropdown Box and textArea. Each form element treated as React component. The text Input field treated as common component for entire application. First include that component in this page and invoke that object.

    var TextInput		=	 require('../TextInput');
    
    var Tasks = React.createClass({
        render : function(){
        
        <TextInput type="text" label="* Task Name" placeholder="Task Name" id="task_name" 
				   name="task_name" setText={this.setTextState} task_name={this.state.task_name}  />
        
        }
    });
In the above code <TextInput /> is react component, Which contains different properties. These **props**(properties) included as atributes in normal HTML elemnts. These props is declared in **TextInput** class. In the above code _setText_ is function for _onChange_ . This setText function calling **setTextState**, this function set value in the input textfield as shown below.

    var TextInput		=	 require('../TextInput');
    
    var Tasks = React.createClass({
        setTextState:function(event){
        	switch(event.target.id){
		 	case 'task_name':
		 		this.setState({task_name  : event.target.value});
		 	break;
		 	default:
        },
        render : function(){
        <TextInput type="text" label="* Task Name" placeholder="Task Name" id="task_name" 
		   name="task_name" setText={this.setTextState} task_name={this.state.task_name}  />
        }
    });  

In the above code _setState()_ function is used to set value in variable. The same procedure is using to add all other components. 

All these React components wrap inside <form></form> HTML element. When we click on button the form element value will get to variable. For getting value from React components, we are using **addTask()**. In this function, we have used **this.state.elementName** for getting value of elements then called function with arguments **create**. This create function is defined in ACTION file. Here this function is in taskAction. The **taskAction** file location is [here](https://github.com/AccelNA/timeLogs/blob/master/Web/js/actions/TaskActions.js). 

In this file we create an object **TaskActions** and this this object contain function **create**. The central hub of FLUX architecture is _Dispatcher_ file, that file is included in taskAction file. In this **create** function we are calling handleviewAction() method for register function call and argument passing to store. So it automatically invoke corresponding store files in the application. Here **TaskStore** is the file and it's location is [here](https://github.com/AccelNA/timeLogs/blob/master/Web/js/stores/TaskStore.js).

Inside the taskStore file, we can call all registered function and it makes different operation. For calling registered function 

    AppDispatcher.register(function(playload){
    });	
Which contains different **payloads** and these payloads call corresponding functions in stores. After any database operation peforms we will call **emitChange()** function. This **emitChange()** calling **this.emit()** function with parameter **change**. We have node package eventEmitter and that package contains different function. One function which is named as **EvenEmitter** is invoked by calling this.emit() function. The other operation like EDIT and DELETE are also perforemed in this way.      
    
The task page loading time all previous tasks are showing in React Grid. This dynamic data are loading from database  before components are rendering. we are using **componentWillMount()** function. In this function we used to call ajax function. **$.ajax()**.this function are bound with **bind()** function and that data are pass into React Griddle for viewing data as Grid with different inbuild grid features like search and sort.

We will explaine another module **Timesheet Week view**. In this module we can insert entire times used for each task. Here we are using Grid view for entering times. First we select a date from datepicker and that day should be Friday otherwise validation error will thrown. When we select a date from a week then entire remaining date will calculate by application. That dates will showing on grid. The images are showing below.

![Grid Dynamic Date Page](https://github.com/AccelNA/aws-coe/blob/master/contents/images/Grid-Dynamic-Date.png)<br/>
<hr/>

Then we will select **PROJECT** and **TASK**, After that we will eneter time to spend in each tasks. In each grid value entered you can click **_+_** button for generating next grid value. When you click on **_+_** button it will automatically save all data previous grid row value. The delete button available for deleting a row from grid. Only few project will show in project drop down box. That project should be assigned to each employee by _Admin_ user in admin configuration page. In React date picker have facility to choose both months and day without regular navigation. The React grid which is showing data have the facilty to sort and search funcionality. 

Tha another module with unique feature is project assign to employee from Admin part. In this module we are using auto complete facility to add an employee to project. Both projects and employees are showing as autocomplete and after click on **assign** button the data are save into database and showing in the below table. The image is showing below. The two auto complete input fields are shown in read mark.

![Grid Dynamic Date Page](https://github.com/AccelNA/aws-coe/blob/master/contents/images/TimeLog-Auto.png)<br/>
<hr/>

[Technologies Used]: #Technology
[Features]: #Features
[Functionality]: #Functionality
[How to build]: #Build
[Application Work Flow]: #Application-Work-Flow
