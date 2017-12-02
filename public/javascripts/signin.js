/*jshint esversion: 6 */

var email = ko.observable();
var password = ko.observable();
var errorMessage = ko.observable(false);

function ViewModel() {
	this.signInUser = function() {
		/* Create the object for posting */
		var user = {
			email: email(),
			password: password(),
		};

		$.ajax({
			type: "POST",
			url: "/users/login",
			dataType: 'JSON',
			data: user})
			.done(function(user, status){
				console.log("Data: " + user() + "\nStatus: " + status);
				})
			.fail(function() {
			console.log('Didnt work!');
			})
			this.formReset();
	};

	this.formReset = function() {
		email(undefined);
		password(undefined);
		errorMessage(false);
	}
}
ko.applyBindings(new ViewModel());
