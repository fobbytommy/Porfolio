$(document).ready( function() {
	// establishing web socket connection
	var socket = io.connect();

	var user_name;
	var label;
	var login_status = false;

	// for purpose of scrolling to the bottom
	var scrollDiv = document.getElementById("chatting-zone");

	$('#myModal').modal('show'); // to show a user name form upon load.

	// step 2
	$('#user_name_form').submit( function() {
		user_name = $('#user_name').val();
		$('#myModal').modal('hide');
		// step 3
		socket.emit('got_a_new_user', { user_name: user_name });
		login_status = true;
		return false;
	});

	// step 4.2.1
	socket.on('existing_users', function(data) {
		for (var user_id in data) {
			var sliced_id = user_id.slice(2, user_id.length);
			// console.log(sliced_id, data[user_id][0], data[user_id][1]);
			var html_str = "<p id='" + sliced_id + "'><span class='label label-" + data[user_id][1] + "'>" + data[user_id][0] + "</span></p>"
			// console.log(html_str);
			$('.users_list').append(html_str);
		}
	});

	// step 4.2.1 existing_messages
	socket.on('existing_messages', function(data) {
		for (var i = 0, j = data.messages.length; i < j; i++) {
			var html_str_update_chat = "<p><span class='label label-" + data.messages[i][1] + "'>" + data.messages[i][2] + "</span> " + data.messages[i][3] + "</p>"

			$('.chat-log').append(html_str_update_chat);
		}
		scrollDiv.scrollTop = scrollDiv.scrollHeight;
	});

	// step 5
	socket.on('new_user_join', function(data) {
		if (login_status) {
			// step 5.1
			var sliced_id = data.user_id.slice(2, data.user_id.length);
			var html_str_user_add = "<p id='" + sliced_id + "'><span class='label label-" + data.label + "'>" + data.user_name + "</span></p>"
			$('.users_list').append(html_str_user_add);
			label = data.label;
			//step 5.2
			var html_str_joined_chat = "<p><span class='label label-" + data.label + "'>" + data.user_name + "</span> <strong> has joined the chatroom!</strong></p>"
			$('.chat-log').append(html_str_joined_chat);
			scrollDiv.scrollTop = scrollDiv.scrollHeight;
		}
	});

	// step 6
	$('#message_form').submit(function(){
		var message = $('#message').val();
		$('#message').val("");
		socket.emit("new_message", { user_name: user_name, message: message })
		return false;
	});

	// step 8
	socket.on('add_a_message', function(data) {
		var html_str_update_chat = "<p><span class='label label-" + data.message[1] + "'>" + data.message[2] + "</span> " + data.message[3] + "</p>"

		$('.chat-log').append(html_str_update_chat);
		scrollDiv.scrollTop = scrollDiv.scrollHeight;
	});

	// step 9 - "disconnect"
	$(window).bind('beforeunload', function(){
		if (login_status) {
			socket.emit('disconnect');
		}
	});

	// step 11 - "disconnect_user"
	socket.on('disconnect_user', function(data) {
		var sliced_id = data.user_id.slice(2, data.user_id.length);
		// remove user name from the list
		$('#' + sliced_id).remove();

		// add message that the user left
		var html_str_left_chat = "<p><span class='label label-" + data.user_label + "'>" + data.user_name + "</span> <strong> has left the chatroom!</strong></p>"
		$('.chat-log').append(html_str_left_chat);
		scrollDiv.scrollTop = scrollDiv.scrollHeight;

	});

});
