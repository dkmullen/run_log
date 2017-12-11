/*jshint esversion: 6 */

let email = ko.observable(),
	password = ko.observable(),
	errorMessage = ko.observable(false),
	errorMessage2 = ko.observable(false);

function ViewModel() {

	validateForm = function () {
		errorMessage(false); // reset on new attempt
		errorMessage2(false);
		if (password().length < 5 ) {
			errorMessage2(true);
		} else {
			signInUser();
		}
	}

	signInUser = function ()  {
		let xhr = new XMLHttpRequest(),
			user = { email: email(), password: password() };

		xhr.onreadystatechange = () => {
	    if (xhr.readyState==4 && xhr.status==200) {
	      let response = xhr.responseText,
	        token = xhr.getResponseHeader('x-auth');

	      localStorage.setItem('token', token);
				window.location.href = 'runlog.html';
	    }
	    if(xhr.readyState==4 && xhr.status==403){
	      errorMessage(true);
	    }
	  };
	  xhr.open('POST', '/users/login', true);
	  xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
	  xhr.send(JSON.stringify(user));


	};

	formReset = function() {
		email(undefined);
		password(undefined);
		errorMessage(false);
	};
}
ko.applyBindings(new ViewModel());
