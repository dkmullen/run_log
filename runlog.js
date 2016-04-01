var miles = ko.observable();
var hours = ko.observable();
var minutes = ko.observable();
var seconds = ko.observable();
var comments = ko.observable();

function ViewModel() {
	
	this.pad2 = function(number) {
		return (number < 10 ? '0' : '') + number
	}
	
	this.logMyRun = function() {
		if (hours() == undefined) {
			hours('0');
		}
		var totalSeconds = parseInt(seconds()) + (parseInt(minutes()) * 60) + 
			(parseInt(hours()) * 3600);
		var secPerMile = totalSeconds / miles();
		var paceMinutes = Math.floor(secPerMile / 60);
		var paceSeconds = Math.round(((secPerMile / 60) - paceMinutes) * 60);
		
		document.getElementById('date').innerHTML = date;
		document.getElementById('miles').innerHTML = miles();
		document.getElementById('time').innerHTML = hours() + ':' + 
			this.pad2(minutes()) + ':' + this.pad2(seconds());
		document.getElementById('pace').innerHTML = this.pad2(paceMinutes) + 
			':' + this.pad2(paceSeconds);
		document.getElementById('comments').innerHTML = comments();
	}
}
ko.applyBindings(new ViewModel());

/** pad2 comes from fanaur at

http://stackoverflow.com/questions/8043026/javascript-format-number-to-have-2-digit

It means: 
if (number < 10) {
	return '0' + number;
	}
	else {
		return '' + number;
	}
*/