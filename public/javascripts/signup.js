// Wha

var username = ko.observable();
var email = ko.observable();
var password = ko.observable();
var password2 = ko.observable();
var errorMessage = ko.observable(false);

function ViewModel() {
	this.validateForm = function () {
		if (password() === password2()) {
			this.createUser();
		} else {
			console.log("pw 1 = " + password() + " and pw 2 = " + password2());
			errorMessage(true);
		}
	}
	this.createUser = function() {
		/* Create the object for posting */
		var newUser = {
			name: username(),
			email: email(),
			password: password(),
		};

		$.ajax({
			type: "POST",
			url: "/users",
			dataType: 'JSON',
			data: newUser})
			.done(function(newUser, status){
				console.log("Data: " + newUser + "\nStatus: " + status);
				})
			.fail(function() {
			console.log('Didnt work!');
			})
			this.formReset();
	};

	this.signInUser = function() {
		console.log('Sign in code goes here');
	};

	this.formReset = function() {
		username('');
		email(undefined);
		password(undefined);
		password2(undefined);
		errorMessage(false);
	}
}
ko.applyBindings(new ViewModel());
