/*jshint esversion: 6 */

let username = ko.observable(),
	email = ko.observable(),
	password = ko.observable(),
	password2 = ko.observable(),
	errorMessage = ko.observable(false),
	errorMessage2 = ko.observable(false),
	errorMessage3 = ko.observable(false);

function ViewModel() {

	validateForm = function () {
		errorMessage(false); // reset on new attempt
		errorMessage2(false);
		errorMessage3(false);
		if (password().length < 5 || password2().length < 5) {
			errorMessage2(true);
		} else if (password() !== password2()) {
			errorMessage(true);
		} else {
			createUser();
		}
	}

	createUser = function() {
		let newUser = {
			name: username(),
			email: email(),
			password: password(),
		};

		$.ajax({
			type: "POST",
			url: "/users",
			dataType: 'JSON',
			data: newUser})
			.done((newUser, status) => {
				console.log("Data: " + newUser + "\nStatus: " + status);
				formReset(); // probably should redirect to sign in
			})
			.fail((err) => {
				errorMessage3(true);
				console.log(err);
			})

	};

	formReset = function() {
		username('');
		email(undefined);
		password(undefined);
		password2(undefined);
		errorMessage(false);
		errorMessage2(false);
		errorMessage3(false);
	}
}

ko.applyBindings(new ViewModel());
