// Wha

var username = ko.observable();
var email = ko.observable();
var password = ko.observable();
var errorMessage = ko.observable(false);

function ViewModel() {
	this.createUser = function() {
		console.log('Create new user code goes here');
	};
	this.formReset = function() {
		console.log('Reset form code...');
	}
}
ko.applyBindings(new ViewModel());
