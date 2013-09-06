$(document).ready(function(){
	$('#myNotTab a').click(function (e) {
		  e.preventDefault();
		  $(this).tab('show');
		});
	getRequestsMade();
	getRequestsGot();
	updateNotificationStatus();
});


function updateNotificationStatus(){
	$.ajax({
		url : '/codenameDS/database/notifications.php',
		data : {
			'set_notifications_read' : true,
			'user_id' : userid
		},
		type : 'post',
		async: true,
		success : function(output) {
			console.log("done");
		}
	});
}

function getRequestsMade(){
	$.ajax({
		url : '/codenameDS/database/edit_request.php',
		data : {
			'get_request_to' : true,
			'user_id' : userid
		},
		type : 'get',
		async: false,
		success : function(output) {
			displayRequests(output, "#reqGot","from");
		}
	});
}

function getRequestsGot(){
	$.ajax({
		url : '/codenameDS/database/edit_request.php',
		data : {
			'get_request_by' : true,
			'user_id' : userid
		},
		type : 'get',
		async: false,
		success : function(output) {
			displayRequests(output, "#reqMade","to");
		}
	});
}

function displayRequests(output,container,direction) {
	var res = jQuery.parseJSON(output);
	$(container).html("");
	var content = "<ul>";
	if (output != null || output != "") {
		$.each(res, function(id,value) {
			if(direction=="from"){
				content+="<li>You have an edit request from <a href='http://localhost:8888/codenameDS/profile.php?username="+value.user_name+"'>"+value.user_name+"</a> for <a href='http://localhost:8888/codenameDS/selected_image.php?image_id="+value.request_image_id+"'>this image</a></li>";
			}
			else{
				content+="<li>You have made edit request for <a href='http://localhost:8888/codenameDS/selected_image.php?image_id="+value.request_image_id+"'>this image</a> uploaded by <a href='http://localhost:8888/codenameDS/profile.php?username="+value.user_name+"'>"+value.user_name+"</a></li>"
			}			
		}
		)
	}
	content += "</ul>";
	$(container).html(content);
}