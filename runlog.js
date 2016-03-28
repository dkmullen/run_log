var date, miles, hours, minutes, seconds, comments = ko.observable();

function ViewModel() {
	
	this.logMyRun = function() {
		if (hours == undefined) {
			hours = 0;
		}
		console.log(date, miles, hours, minutes, seconds, comments());
	}
}
ko.applyBindings(new ViewModel());