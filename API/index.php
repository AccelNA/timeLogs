<?php

if (isset($_SERVER['HTTP_ORIGIN'])) {
        header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Max-Age: 86400');    // cache for 1 day
    }

    // Access-Control headers are received during OPTIONS requests
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
            header("Access-Control-Allow-Methods: GET, POST, OPTIONS,PUT,DELETE");         

        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
            header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

        exit(0);
    }

header('Content-type: application/json'); 

function dbconnect(){
	
/*
 * Mysql Connection
 */

$servername = "localhost";
$username = "root";
$password = "";

// Create connection
 $conn = mysql_connect($servername, $username, $password);
 mysql_select_db('accel_timesheet', $conn) or die('Server Busy');
/*
 * Mysql connection end
 */
}
include 'route.php';

$route = new Route();

$route->add('/', function() {
	echo 'HOME';
});


// signIn process 


$route->add('/signin/', function() {
	

	$jsonArray =  file_get_contents("php://input");;
	$finalArray = json_decode($jsonArray, true);
   
    
    
    $userEmail = trim($finalArray[0]['username']);
    $userPassword = md5(trim($finalArray[0]['password']));
    dbconnect();
    
    $authConnection = mysql_query("
    								SELECT * from user 
    								JOIN role ON user.user_role_id = role.role_id 
    								WHERE user_email='$userEmail' and user_password='$userPassword'");
   
    $dataRow  =  mysql_fetch_row($authConnection);
   
    if(count($dataRow)>1){
	    $finalData = array(
    	        'data'   => array(
        	    	'email'  => $dataRow[1],
            		'role'	 => $dataRow[9],
            		'token'  => $dataRow[4],
                'userId' => $dataRow[0],
            		'message'=> 'success'
            	)
   	  );
   	 }
   	else{
		 $finalData = array(
    	        			'data' =>array(
    	        			'message' =>'fail'
    	        			)
    	        );
	} 
    echo json_encode($finalData);
});

/* ProjectList
 * @ Return data is JSON. Return data Key should be same as given below.  
 * @ Date 26-03-2015
 */ 
$route->add('/projectlist/',function(){

        dbconnect();

        $jsonArray =  file_get_contents("php://input");;
        $finalArray = json_decode($jsonArray, true);

        $projectsql = mysql_query("
                                    SELECT * , client.client_name AS  'Client Name'
                                        FROM project
                                        LEFT JOIN client ON client_id = project_client_id
                                    "
                                  );
        $index = 1;
        while($dataRow = mysql_fetch_array($projectsql)){

             $finalData[] = array(
                    'SINo'           =>   $index,  
                    'Project Name'   =>   $dataRow[1],
                    'Description'    =>   $dataRow[2],
                    'Is Billable'    =>   $dataRow[3],
                    'Client Name'    =>   $dataRow[7],  
                    'Action'         =>   $dataRow[0],
                    'projectname'   =>    $dataRow[1],
            );
          $index++;   
         }
     echo json_encode($finalData);   

});



/* ProjectDelete
 * @ Return data is JSON. Return data Key should be same as given below.  
 * @ Date 26-03-2015
 */ 
$route->add('/projectdelete/',function(){


        $jsonArray =  file_get_contents("php://input");;
        $finalArray = json_decode($jsonArray, true);
        $projectId = trim($finalArray[0]['projectId']);

        dbconnect();
        $projectsql = mysql_query("
                                       DELETE FROM project WHERE project_id=$projectId
                                 ");
    
        $finalData = array(
                              'message'        =>   'success'
                         );
      echo json_encode($finalData);   

});


/* ProjectCreate
 * @ Return data is JSON. Return data Key should be same as given below.  
 * @ Date 26-03-2015
 */ 
$route->add('/projectcreate/',function(){


        $jsonArray =  file_get_contents("php://input");

        $finalArray = json_decode($jsonArray, true);
       

        $prjectName  = $finalArray[0]['projectName'];
        $discription = $finalArray[0]['description'];
        $isBillable  = $finalArray[0]['is_billable'];
        $clientName  = $finalArray[0]['client_name'];   

        dbconnect();
        $projectsql = "INSERT INTO  project (
                        
                        project_name ,
                        project_description,
                        project_is_billable,
                        project_client_id 
                            )
                        VALUES (
                                '$prjectName',
                                '$discription',
                                '$isBillable',
                                '$clientName'
                            )";
        mysql_query($projectsql);
        $finalData = array(
                              'message'        =>   'success'
                         );
      echo json_encode($finalData);   

});

/*
 * ProjectEdit
 * @ datatype is JSON
 */

$route->add('/projectedit/',function(){

            $jsonArray =  file_get_contents("php://input");
            $finalArray = json_decode($jsonArray, true);
           
            dbconnect();
            $prjectName  = $finalArray[0]['projectName'];
            $discription = $finalArray[0]['description'];
            $isBillable  = $finalArray[0]['is_billable'];
            $clientName  = $finalArray[0]['client_name'];   
            $projectId   = $finalArray[0]['project_Id']; 

            echo $projectsql = "UPDATE  project SET  project_name    =  '$prjectName',
                                                 project_description =  '$discription', 
                                                 project_is_billable =  '$isBillable',
                                                 project_client_id   =  '$clientName'   
                                                 WHERE  project_id   =   $projectId";
            mysql_query($projectsql);

             $finalData = array(
                              'message'        =>   'success'
                         );
             echo json_encode($finalData);                                       
});

/* ClientList
 * @ Return data is JSON. Return data Key should be same as given below.  
 * @ Date 26-03-2015
 */ 
$route->add('/clientlist/',function(){

        dbconnect();
        $clientsql = mysql_query("
                                    SELECT * from client"
                                  );
        
        while($dataRow = mysql_fetch_array($clientsql)){

             $finalData[] = array(
                    'Action'        =>   $dataRow[0],  
                    'Client Name'   =>   $dataRow[1],
                    'clientname'   =>   $dataRow[1]
            );
           
         }
     echo json_encode($finalData);   

});



/* UserList
 * @ Return data is JSON. Return data Key should be same as given below.  
 * @ Date 27-03-2015
 */ 
$route->add('/userlist/',function(){

        dbconnect();
        $clientsql = mysql_query("
                                    SELECT * from user"
                                  );
        
        $index  = 1;

        while($dataRow = mysql_fetch_array($clientsql)){

             $finalData[] = array(
                    'SINo'          =>   $index,
                    'Action'        =>   $dataRow[0],  
                    'First Name'    =>   $dataRow[1],
                    'Last Name'     =>   $dataRow[2],
                    'Employee ID'   =>   $dataRow[3] 
            );
           $index++;
         }
     echo json_encode($finalData);   

});

/* Create Employee
 * @ Return JSOn data. The parameter is also JSON data type.  
 * @ Date 27-03-2015 
 */

 $route->add('userCreate',function(){
     
      $jsonArray =  file_get_contents("php://input");
      $finalArray = json_decode($jsonArray, true);
     

        $firstName      = $finalArray[0]['firstName'];
        $lastName       = $finalArray[0]['lastName'];
        $employeeEmail  = $finalArray[0]['userEmail'];
        $employeeId     = $finalArray[0]['employeeId'];   
        $emploeePassword= md5($finalArray[0]['userPassword']); 

        dbconnect();
        $usersql = "INSERT INTO  user (
                        
                        user_first_name,
                        user_last_name,
                        user_employee_id,
                        user_email,
                        user_password 
                            )
                        VALUES (
                                '$firstName',
                                '$lastName',
                                '$employeeId',
                                '$employeeEmail',
                                '$emploeePassword'
                            )";

        mysql_query($usersql);

        $finalData = array(
                              'message'        =>   'success'
                         );
      echo json_encode($finalData);   

 });


/* EmployeeDelete
 * @ Return data is JSON. Return data Key should be same as given below.  
 * @ Date 27-03-2015
 */ 
$route->add('/userdelete/',function(){


        $jsonArray =  file_get_contents("php://input");;
        $finalArray = json_decode($jsonArray, true);
        $employeeId = trim($finalArray[0]['employeeId']);

        dbconnect();
        $usersql = mysql_query("
                                       DELETE FROM user WHERE user_id=$employeeId
                                 ");
    
        $finalData = array(
                              'message'        =>   'success'
                         );
      echo json_encode($finalData);   

});


/*
 * UsertEdit
 * @ datatype is JSON
 */

$route->add('/useredit/',function(){

            $jsonArray =  file_get_contents("php://input");
            $finalArray = json_decode($jsonArray, true);
           
            dbconnect();
            $employeeName  = $finalArray[0]['employeeName'];
            $lastName = $finalArray[0]['lastName'];
            $employeeId  = $finalArray[0]['empoyeeId'];
           

            $usersql = "UPDATE  user SET  user_first_name  =  '$employeeName',
                                                  user_last_name            =  '$lastName' 
                                                  WHERE  user_employee_id   =   $employeeId";
            mysql_query($usersql);

            $finalData = array(
                              'message'        =>   'success'
                         );
            echo json_encode($finalData);                                       
});


/* TaskList
 * @ Return data is JSON. Return data Key should be same as given below.  
 * @ Date 27-03-2015
 */ 
$route->add('/tasklist/',function(){

        dbconnect();
        $tasksql = mysql_query("
                                    SELECT *,project.project_name as ProjectName from task LEFT JOIN project ON 
                                    project.project_id = task.task_project_id"
                                  );
        
        $index  = 1;

        while($dataRow = mysql_fetch_array($tasksql)){

             $finalData[] = array(
                    'SINo'          =>   $index,
                    'Action'        =>   $dataRow[0],  
                    'TaskName'    =>   $dataRow[1],
                    'ProjectName'     =>   $dataRow['ProjectName'],
                    'Descriptions'   =>   $dataRow[3] 
            );
           $index++;
         }
     echo json_encode($finalData);   

});


/* Create Task
 * @ Return JSOn data. The parameter is also JSON data type.  
 * @ Date 27-03-2015 
 */

 $route->add('taskCreate',function(){
     
      $jsonArray =  file_get_contents("php://input");
      $finalArray = json_decode($jsonArray, true);
     

        $taskName     =   $finalArray[0]['taskName'];
        $projectName  =   $finalArray[0]['projectName'];
        $note         =   $finalArray[0]['note'];
      

        dbconnect();
        $tasksql = "INSERT INTO  task (
                        
                        task_name,
                        task_project_id,
                        task_notes
                            )
                        VALUES (
                                '$taskName',
                                '$projectName',
                                '$note'
                            )";

        mysql_query($tasksql);

        $finalData = array(
                              'message'        =>   'success'
                         );
        echo json_encode($finalData);   

 });


/* TaskDelete
 * @ Return data is JSON. Return data Key should be same as given below.  
 * @ Date 27-03-2015
 */ 
$route->add('/taskdelete/',function(){


        $jsonArray =  file_get_contents("php://input");;
        $finalArray = json_decode($jsonArray, true);
        $taskId = trim($finalArray[0]['taskId']);

        dbconnect();
        $tasksql = mysql_query("
                                       DELETE FROM task WHERE task_id=$taskId
                                 ");
    
        $finalData = array(
                              'message'        =>   'success'
                         );
      echo json_encode($finalData);   

});

/*
 * TaskEdit
 * @ datatype is JSON
 */

$route->add('/taskedit/',function(){

            $jsonArray =  file_get_contents("php://input");
            $finalArray = json_decode($jsonArray, true);
           
            dbconnect();
            $TaskName = $finalArray[0]['TaskName'];
            $ProjectName     = $finalArray[0]['ProjectName'];
            $Descriptions   = $finalArray[0]['Descriptions'];
            $Action   = $finalArray[0]['Action'];


            $tasksql = "UPDATE  task SET  task_name  =  '$TaskName',
                                                  task_project_id            =  $ProjectName,
                                                  task_notes  =  '$Descriptions'
                                                  WHERE  task_id   =   $Action";
            mysql_query($tasksql);

            $finalData = array(
                              'message'        =>   'success'
                         );
            echo json_encode($finalData);                                       
});

/* TimesheetView List for a day.
 * @ Return data is JSON. Return data Key should be same as given below.  
 * @ Date 30-03-2015
 */ 

$route->add('/timelisttoday/userid/.+/currentdate/.+',function($userId,$currentdate){

      
      dbconnect();
      $currentDate = isset($currentdate)?$currentdate:date('Y-m-d');
      $timeSheet = mysql_query("SELECT *,
                    timesheet.timesheet_hours as Hours,task.task_name as Task,
                    project.project_name as Project,timesheet.timesheet_id as Action, client_name as Client 
                                FROM timesheet 
                                LEFT JOIN task ON task.task_id =  timesheet.timesheet_task_id  
                                LEFT JOIN project ON project.project_id = task.task_project_id  
                                LEFT JOIN client ON client.client_id = project.project_client_id
                                WHERE timesheet_user_id=$userId and timesheet_date = '$currentDate'");

       $index  = 1;

        while($dataRow = mysql_fetch_array($timeSheet)){

             $finalData[] = array(
                    'SINo'          =>   $index,
                    'Hours'         =>   $dataRow['Hours'],
                    'Client'        =>   $dataRow['Client'],
                    'Task'          =>   $dataRow['Task'],
                    'Project'       =>   $dataRow['Project'],
                    'Action'        =>   $dataRow['Action'] 
            );
           $index++;
         }
     echo json_encode($finalData);   
});


/* Create Timesheet
 * @ Return JSOn data. The parameter is also JSON data type.  
 * @ Date 30-03-2015 
 */

 $route->add('timesheetCreateOneDay',function(){
     
      $jsonArray =  file_get_contents("php://input");
      $finalArray = json_decode($jsonArray, true);
    
        $Client     =   $finalArray[0]['Client'];
        $Hours      =   $finalArray[0]['Hours'];
        $project    =   $finalArray[0]['Project'];
        $task       =   $finalArray[0]['Task'];
        $userId     =   $finalArray[0]['UserId'];
        $date       =   $finalArray[0]['date'];

        dbconnect();
        $tasksql = "INSERT INTO  timesheet (
                        
                        timesheet_user_id,
                        timesheet_task_id,
                        timesheet_date,
                        timesheet_hours,
                        timesheet_status
                            )
                        VALUES (
                                '$userId',
                                '$task',
                                 '$date',
                                 $Hours,
                                 'Active' 
                            )";

        mysql_query($tasksql);

        $finalData = array(
                              'message'        =>   'success'
                         );
        echo json_encode($finalData);  

 });



/* TimeDelete
 * @ Return data is JSON. Return data Key should be same as given below.  
 * @ Date 30-03-2015
 */ 
$route->add('/timesheetdelete/',function(){


        $jsonArray =  file_get_contents("php://input");;
        $finalArray = json_decode($jsonArray, true);
        $timeId = trim($finalArray[0]['timeId']);

        dbconnect();
        $timesql = mysql_query("
                                       DELETE FROM timesheet WHERE timesheet_id=$timeId
                                 ");
    
        $finalData = array(
                              'message'        =>   'success'
                         );
      echo json_encode($finalData);   

});



/* Create TimesheetWeekCreate
 * @ Return JSOn data. The parameter is also JSON data type.  
 * @ Date 30-03-2015 
 */

 $route->add('timesheetCreateWeekDay',function(){
     
      $jsonArray =  file_get_contents("php://input");
      $finalArray = json_decode($jsonArray, true);
    
     // var_dump($finalArray);
      dbconnect();
      for($i=0;$i<7;$i++){
          
            $date   = $finalArray[$i]["date1"];
            $time   = explode(" ",$date);
            
            $day   = rtrim($time[0], ",");
            $month = $time[1];
            $year  = $time[2];
            $month = date("m",strtotime($month));
            
            $date = $year."-".$month."-".$day;
            
            $Hours  = $finalArray[$i]['hours1'] ; 
            $task   = $finalArray['task'];
            $userId = $finalArray['user'];
            $tasksql = "INSERT INTO  timesheet (
                        
                        timesheet_user_id,
                        timesheet_task_id,
                        timesheet_date,
                        timesheet_hours,
                        timesheet_status
                            )
                        VALUES (
                                '$userId',
                                '$task',
                                '$date',
                                 $Hours,
                                 'Active' 
                            )";

        mysql_query($tasksql);
      }
       $finalData = array(
                              'message'        =>   'success'
                         );
        echo json_encode($finalData);  

 });

/* ProjectList
 * @ Return data is JSON. Return data Key should be same as given below.  
 * @ Date 08-04-2015
 */ 
$route->add('/projectlistautocomplete/',function(){

        dbconnect();
        $projectsql = mysql_query("
                                    SELECT * FROM project"
                                 );
        $index = 1;
        while($dataRow = mysql_fetch_array($projectsql)){

             $finalData = array(
                   
                    'Projectname'    =>   $dataRow[0]."-".$dataRow[1]
            );
          $project[]=array('project' => $finalData);   
          $index++;   
         }
        $projects = array('projects'=>$project) ;  
     echo json_encode($projects);   

});

/* UserList
 * @ Return data is JSON. Return data Key should be same as given below.  
 * @ Date 08-04-2015
 */ 
$route->add('/userlistautocomplete/',function(){

        dbconnect();
        $usersql = mysql_query("
                                    SELECT * FROM user"
                                  );
       
        while($dataRow = mysql_fetch_array($usersql)){

             $finalData = array(
                   
                    'username'    =>   $dataRow[0]."-".$dataRow[1]
            );
          $user[]=array('user' => $finalData);   
            
         }
        $users = array('users'=>$user) ;  
        echo json_encode($users);   

});

/*
 * Project User assign
 * @Date 09-04-2015
 * @JSON data param 
 */

$route->add('/projectUserAssign/',function(){

        dbconnect();
        $jsonArray =  file_get_contents("php://input");
        $finalArray = json_decode($jsonArray, true);
        print_r($finalArray);

        $user     =   $finalArray['user'];
        $project  =   $finalArray['project'];
       

        
        $tasksql = "INSERT INTO  project_assign_user (
                        
                        project_id,
                        user_id
                            )
                        VALUES (
                                '$user',
                                '$project'
                            )";

        mysql_query($tasksql);

        $finalData = array(
                              'message'        =>   'success'
                         );
        echo json_encode($finalData);   
});



/* ProjectList for perticular user
 * @ Return data is JSON. Return data Key should be same as given below.  
 * @ Date 26-03-2015
 */ 
$route->add('/projectlistuser/user/.+',function($user){

        dbconnect();

        $projectsql = mysql_query("
                                        select * from project JOIN 
                                        project_assign_user ON project_assign_user.project_id = project.project_id 
                                        where project_assign_user.user_id=$user    
                                  "
                                  );
        $index = 1;
        while($dataRow = mysql_fetch_array($projectsql)){

             $finalData[] = array(
                    'SINo'           =>   $index,  
                    'Project Name'   =>   $dataRow[1],
                    'Action'         =>   $dataRow[0],
                    'projectname'    =>   $dataRow[1],
            );
          $index++;   
         }
     echo json_encode($finalData);   

});

$route->add('/name/.+', function($name) {
	echo jason_encode("Name $name");
});


$route->add('/this/is/the/.+/story/of/.+', function($first, $second) {
	echo "This is the $first story of $second";
});


$route->add('/name/.+/address/.+', function($name,$address) {
	echo "Name $name and address $address";
});

$route->add('/posttest',function(){

		$result =  json_decode(file_get_contents("php://input"));
		print_r($result);

});


$route->submit();