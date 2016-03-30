var date, miles, hours, minutes, seconds, comments = ko.observable();

function ViewModel() {
	
	this.logMyRun = function() {
		if (hours == undefined) {
			hours = 0;
		}
		var totalSeconds = seconds + (minutes * 60) + (hours * 3600);
		console.log(seconds, (minutes * 60), hours);
		console.log(totalSeconds);
		var secPerMile = totalSeconds / miles;
		console.log(secPerMile);
		var paceMinutes = Math.floor(secPerMile / 60);
		console.log(paceMinutes);
		var paceSeconds = ((secPerMile / 60) - paceMinutes) * 60;
		
		document.getElementById('date').innerHTML = date;
		document.getElementById('miles').innerHTML = miles;
		document.getElementById('time').innerHTML = hours + ':' + minutes +
			':' + seconds;
		document.getElementById('pace').innerHTML = paceMinutes + ':' + paceSeconds;
	}
}
ko.applyBindings(new ViewModel());