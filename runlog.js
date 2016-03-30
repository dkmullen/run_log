var date, miles, hours, minutes, seconds, comments = ko.observable();

function ViewModel() {
	
	this.logMyRun = function() {
		if (hours == undefined) {
			hours = 0;
		}
		var totalSeconds = parseInt(seconds) + (parseInt(minutes) * 60) + 
			(parseInt(hours) * 3600);
		var secPerMile = totalSeconds / miles;
		var paceMinutes = Math.floor(secPerMile / 60);
		var paceSeconds = Math.round(((secPerMile / 60) - paceMinutes) * 60);
		
		document.getElementById('date').innerHTML = date;
		document.getElementById('miles').innerHTML = miles;
		document.getElementById('time').innerHTML = hours + ':' + minutes +
			':' + seconds;
		document.getElementById('pace').innerHTML = paceMinutes + ':' + paceSeconds;
		document.getElementById('comments').innerHTML = comments();
	}
}
ko.applyBindings(new ViewModel());