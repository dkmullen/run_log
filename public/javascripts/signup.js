/*jshint esversion: 6 */

let username = ko.observable(),
	email = ko.observable(),
	password = ko.observable(),
	password2 = ko.observable(),
	errorMessage = ko.observable(false);

function ViewModel() {

	validateForm = function () {
		if (password() === password2()) {
			createUser();
		} else {
			console.log("pw 1 = " + password() + " and pw 2 = " + password2());
		errorMessage(true);
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
			})
			.fail(() => {
				console.log('Didnt work!');
			})
		formReset(); // probably should redirect to sign in
	};

	formReset = function() {
		username('');
		email(undefined);
		password(undefined);
		password2(undefined);
		errorMessage(false);
	}
}

ko.applyBindings(new ViewModel());
