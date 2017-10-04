// Wha

var username = ko.observable();
var email = ko.observable();
var password = ko.observable();
var errorMessage = ko.observable(false);

function ViewModel() {
	this.createUser = function() {
		console.log('Create new user code goes here');
	};
	this.signInUser = function() {
		console.log('Sign in code goes here');
	};
	this.formReset = function() {
		username('');
		email(undefined);
		password(undefined);
		errorMessage(false);
	}
}
ko.applyBindings(new ViewModel());
