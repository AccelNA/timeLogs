/*
 * @Date : 07-05-2014
 * Params Get From /components/report/Main.js
 * Author : Accel FrontLine@Cochin(jagadeesh puthukkudi)
 */
 
 var  AppDispatcher     =	 require('../dispatcher/AppDispatcher');
 var  ReportConstants	=	 require('../constants/ReportConstants');
 var ConfigCom			=	 require('../config/ConfigComp');
 
 var  AdminReportActions = {
 	
 	
	reportMemberList  : function(reportMemberDetails,firstDate,secondDate){
		 
         
            var report        = new Object();
    		report.project    = reportMemberDetails;
            report.firstDate  = firstDate;
            report.secondDate = secondDate;
    
    		var pluginArrayProject = new Array();
    		pluginArrayProject.push(report);  

            $.ajax({
                        url : ConfigCom.serverUrl +'projectreportonmember',
                        dataType : "json",
                        data    : JSON.stringify(pluginArrayProject),
                        type : "POST",
                   success : function(responsereportMemberDetails){
                            
                      $.ajax({
                        url : ConfigCom.serverUrl +'projectreportotask',
                        dataType : "json",
                        data    : JSON.stringify(pluginArrayProject),
                        type : "POST",
                        success : function(responseMember){
                            
                            AppDispatcher.handleViewAction({
                                    actionType  : ReportConstants.REPORT_LIST,
                                    responsereportMemberDetails:responsereportMemberDetails
                            });
                            AppDispatcher.handleViewAction({
                                    actionType  : ReportConstants.REPORT_TASK_LIST,
                                    responseMember:responseMember
                            });
                     }
               });
                     }
               });    

       		/*$.ajax({
					    url : ConfigCom.serverUrl +'projectreportonmember',
                		dataType : "json",
                		data    : JSON.stringify(pluginArrayProject),
                		type : "POST",
                		success : function(responsereportMemberDetails){
                			
                	    	AppDispatcher.handleViewAction({
									actionType  : ReportConstants.REPORT_LIST,
									responsereportMemberDetails:responsereportMemberDetails
							});
                            AppDispatcher.handleViewAction({
                                    actionType  : ReportConstants.REPORT_TASK_LIST,
                                    responsereportMemberDetails:responsereportMemberDetails
                            });
                     }
               });*/

         
        
	 }
};
module.exports = AdminReportActions;