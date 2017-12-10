/*jshint esversion: 6 */

let email = ko.observable(),
	password = ko.observable(),
	errorMessage = ko.observable(false);

function ViewModel() {

	signInUser = function ()  {
		let xhr = new XMLHttpRequest(),
			user = { email: email(), password: password() };

		xhr.onreadystatechange = () => {
	    if (xhr.readyState==4 && xhr.status==200) {
	      let response = xhr.responseText,
	        token = xhr.getResponseHeader('x-auth');

	      localStorage.setItem('token', token);
	    }
	    if(xhr.readyState==4 && xhr.status==403){
	      console.log(message);
	    }
	  };
	  xhr.open('POST', '/users/login', true);
	  xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
	  xhr.send(JSON.stringify(user));

		window.location.href = 'index.html';
		// formReset(); // really should load runs, not clear the form
	};

	formReset = function() {
		email(undefined);
		password(undefined);
		errorMessage(false);
	};
}
ko.applyBindings(new ViewModel());
