var date, miles, hours, minutes, seconds = ko.observable();
function ViewModel() {
	
	this.logMyRun = function() {
		console.log('hi');
	}
}
ko.applyBindings(new ViewModel());