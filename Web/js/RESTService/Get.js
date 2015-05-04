var React 				= 		require('react');
var ConfigCom			=	 	require('../config/ConfigComp');
var jwt                 =       require('jwt-simple');


var secret = ConfigCom.secretKey; 


/* Authentication 
 * JSON data
 * REST API
 */
var GETDATA = {

    authGet : function(authDetails){
        
		 var authDetail = new Object();
         authDetail.username = authDetails[0].userName;
         authDetail.password = authDetails[0].password;    
         var pluginArrayAuth = new Array();
         pluginArrayAuth.push(authDetail); 
        
        
    	    $.ajax({

                     url     : ConfigCom.serverUrl + 'signin',
                     data    : JSON.stringify(pluginArrayAuth),
                     dataType: "json",
                     type    : "POST",
                     success: function(data) {
                               
                                    finalMessage    =  data.data.message;
                                    roleVal         =  data.data.role;
                                    userVal         =  data.data.userId;

                                    if(finalMessage=='fail'){
                                       
                                                 $("#loginErrorMessage").html('<div style="color:red">Please check your login details</div>');
                                                 return;
                                     }
                                    else{ 

                                            var payload = {role: roleVal,userId:userVal};
                                            var token   = jwt.encode(payload, secret);  
                                            $.cookie('tokengen',token);
                                            var redirectUrl = ConfigCom.clientBaseUrl+'dashboard';
                                            window.location = redirectUrl;

                                        }
                          }

                  });

 },

/*
 * Get All Project Details
 * return JSON
 */ 

 projectGet : function(callback){
       
        $.ajax({

                url : ConfigCom.serverUrl + 'projectlist',
                dataType : "jsonp",
                type : "GET",
                success : callback

        });
 },

/*
 * Delete Project
 * @param json projectId 
 */

projectDelete : function(projectId,callback){
         

         var projectDetail = new Object();
         projectDetail.projectId = projectId;
          
         var pluginArrayProject = new Array();
         pluginArrayProject.push(projectDetail); 


         $.ajax({

                url : ConfigCom.serverUrl + 'projectdelete',
                dataType : "jsonp",
                data    : JSON.stringify(pluginArrayProject),
                type : "POST",
                success : callback

         });
   
 },

/*
 * Create project
 * @param json data
 */
 
 projectCreate : function(projectDetails,callback){

    
    var projectDetail = new Object();
    projectDetail.projectName = projectDetails[0].project_name;
    projectDetail.description = projectDetails[0].description;
    projectDetail.is_billable = projectDetails[0].is_billable;
    projectDetail.client_name = projectDetails[0].client_name;
          
    var pluginArrayProject = new Array();
    pluginArrayProject.push(projectDetail); 

     $.ajax({

                url : ConfigCom.serverUrl + 'projectcreate',
                dataType : "jsonp",
                data    : JSON.stringify(pluginArrayProject),
                type : "POST",
                success : callback

         });


 },

/*
 * Edit Projecr Deatils
 * Data format should be JSON
 */

projectEdit : function(projectDetails,callback){
    
    var projectDetail = new Object();

    console.log(projectDetails);
    client = projectDetails.client_name;
    clientArray = client.split('*');
    projectDetail.projectName = projectDetails.project_name;
    projectDetail.description = projectDetails.description;
    projectDetail.is_billable = projectDetails.is_billable;
    projectDetail.client_name = clientArray[0];
    projectDetail.project_Id  = projectDetails.projectId;
    projectDetail.client_id   = clientArray[1];

    var pluginArrayProject = new Array();
    pluginArrayProject.push(projectDetail); 

     $.ajax({

                url : ConfigCom.serverUrl + 'projectedit',
                dataType : "jsonp",
                data    : JSON.stringify(pluginArrayProject),
                type : "POST",
                success : callback

         });
},


/*
 * Get All User Details
 * return JSON
 */ 

 userGet : function(callback){
       
        $.ajax({

                url : ConfigCom.serverUrl + 'userlist',
                dataType : "jsonp",
                type : "GET",
                success : callback

        });
 },

/*
 * Create project
 * @param json data
 */
 
 employeeCreate : function(userAllDetail,callback){

    
    var employeeDetail = new Object();
    employeeDetail.firstName = userAllDetail[0].firstName;
    employeeDetail.lastName = userAllDetail[0].lastName;
    employeeDetail.employeeId = userAllDetail[0].employeeId;
    employeeDetail.userEmail = userAllDetail[0].userEmail;
    employeeDetail.userPassword = '123';

    var pluginArrayEmployee = new Array();
    pluginArrayEmployee.push(employeeDetail); 

     $.ajax({

                url : ConfigCom.serverUrl + 'userCreate',
                dataType : "jsonp",
                data    : JSON.stringify(pluginArrayEmployee),
                type : "POST",
                success : callback

         });


 },

/* Project Delete
 * @27-03-2015
 * @param JSON Data
 */
userDelete  :function(employeeId,callback){

         var employeeDetail = new Object();
         employeeDetail.employeeId = employeeId;
          


         var pluginArrayUser = new Array();
         pluginArrayUser.push(employeeDetail); 


         $.ajax({

                url : ConfigCom.serverUrl + 'userdelete',
                dataType : "jsonp",
                data    : JSON.stringify(pluginArrayUser),
                type : "POST",
                success : callback

         });

},
/*
 * Edit Employee Deatils
 * Data format should be JSON
 */

employeeEdit : function(userDetails){

    console.log(userDetails); 
    var userDetail = new Object();
    userDetail.employeeName = userDetails.firstName;
    userDetail.lastName = userDetails.lastName;
    userDetail.empoyeeId = userDetails.employeeId;
   
    var pluginArrayUser = new Array();
    pluginArrayUser.push(userDetail); 
    

     $.ajax({

                url : ConfigCom.serverUrl + 'useredit',
                dataType : "jsonp",
                data    : JSON.stringify(pluginArrayUser),
                type : "POST"
                

         });
},



/*
 * Get All tasks Details
 * return JSON
 */ 

 taskGet : function(callback){
       
        $.ajax({

                url : ConfigCom.serverUrl + 'tasklist',
                dataType : "jsonp",
                type : "GET",
                success : callback

        });
 },

/*
 * Create Task
 * @param json data
 */
 taskCreate : function(taskAllDetails,callback){

    console.log(taskAllDetails);

   
    var taskDetail = new Object();
    taskDetail.taskName = taskAllDetails[0].taskName;
    taskDetail.projectName = taskAllDetails[0].projectName;
    taskDetail.note = taskAllDetails[0].note;
    taskDetail.projectId = taskAllDetails[0].projectId;

    var pluginArrayTask = new Array();
    pluginArrayTask.push(taskDetail); 

    
     $.ajax({

                url : ConfigCom.serverUrl + 'taskCreate',
                dataType : "jsonp",
                data    : JSON.stringify(pluginArrayTask),
                type : "POST",
                success : callback

         });

 },

/* Task Delete
 * @27-03-2015
 * @param JSON Data
 */
taskDelete  :function(taskId,callback){

         var taskDetail = new Object();
         taskDetail.taskId = taskId;
          


         var pluginArrayTask = new Array();
         pluginArrayTask.push(taskDetail); 


         $.ajax({

                url : ConfigCom.serverUrl + 'taskdelete',
                dataType : "jsonp",
                data    : JSON.stringify(pluginArrayTask),
                type : "POST",
                success : callback

         });

},

/*
 * Edit Task Details
 * Data format should be JSON
 */

taskEditAjax: function(taskDetails,callback){
    
    

    var taskDetail = new Object();
    taskDetail.TaskName = taskDetails.taskName;
    taskDetail.ProjectName = taskDetails.projectName;
    taskDetail.Descriptions = taskDetails.note;
    taskDetail.Action = taskDetails.taskId;
    taskDetail.projectId = taskDetails.projectId;

    var pluginArrayTask = new Array();
    pluginArrayTask.push(taskDetail); 

     $.ajax({

                url : ConfigCom.serverUrl + 'taskedit',
                dataType : "jsonp",
                data    : JSON.stringify(pluginArrayTask),
                type : "POST",
                success : callback

         });
},

/*
 * Get All Today Time sheet Details
 * return JSON
 */ 

todayTimesheetGet : function(userId,currentdate,callback){
      

        $.ajax({

                url : ConfigCom.serverUrl + "timelisttoday/userid/"+userId+"/currentdate/"+currentdate,
                dataType : "jsonp",
                type : "GET",
                success : callback

        });
 },

/*
 * Create project
 * @param json data
 */
 
 timesheetCreate : function(timeAllDetails,callback){

    console.log(timeAllDetails);
    var timeAllDetail        =   new Object();
    timeAllDetail.Hours      =   timeAllDetails.hours;
    timeAllDetail.Task       =   timeAllDetails.taskId;
    timeAllDetail.UserId     =   timeAllDetails.userId
    timeAllDetail.date       =   timeAllDetails.date



    var pluginArrayTimesheet = new Array();
    pluginArrayTimesheet.push(timeAllDetail); 

     $.ajax({

                url : ConfigCom.serverUrl + 'timesheetCreateOneDay',
                dataType : "jsonp",
                data    : JSON.stringify(pluginArrayTimesheet),
                type : "POST",
                success : callback

         });


 },

/* Timesheet Delete
 * @27-03-2015
 * @param JSON Data
 */
timeDelete  :function(timeId,callback){

         var timeDetail = new Object();
         timeDetail.timeId = timeId;
          


         var pluginArrayTime = new Array();
         pluginArrayTime.push(timeDetail); 


         $.ajax({

                url : ConfigCom.serverUrl + 'timesheetdelete',
                dataType : "jsonp",
                data    : JSON.stringify(pluginArrayTime),
                type : "POST",
                success : callback

         });

},
/*
 * Create project
 * @param json data
 */
 
 timesheetWeekCreate : function(timeDetails,callback){

   

     $.ajax({

                url : ConfigCom.serverUrl + 'timesheetCreateWeekDay',
                dataType : "jsonp",
                data     : timeDetails,
                type : "POST",
                success : callback

         });


 },

 /* Assign Project to User
  * @Date 09-04-2015
  */ 

  employeeProjectAssign: function(userDetails,callback){

              $.ajax({

                url : ConfigCom.serverUrl + 'projectUserAssign',
                dataType : "jsonp",
                data     : JSON.stringify(userDetails),
                type : "POST",
                success : callback

         });

  },
/*
 * Create Client
 * @param json data
 */
 
 clientCreate : function(clientDetails,callback){

    
    var clientDetail = new Object();
    console.log(clientDetails);
    clientDetail.ClientName = clientDetails.clientName;
   
    var pluginArrayClient = new Array();
    pluginArrayClient.push(clientDetail); 

     $.ajax({

                url : ConfigCom.serverUrl + 'clientcreate',
                dataType : "jsonp",
                data    : JSON.stringify(pluginArrayClient),
                type : "POST",
                success : callback

         });


 },

/*
 * Get All Client Details
 * return JSON
 */ 

clientGet : function(callback){
       
        $.ajax({

                url : ConfigCom.serverUrl + 'clientlist',
                dataType : "jsonp",
                type : "GET",
                success : callback

        });
 },


};
module.exports = GETDATA;

