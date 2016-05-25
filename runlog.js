var date = ko.observable();
var miles = ko.observable();
var hours = ko.observable();
var minutes = ko.observable();
var seconds = ko.observable();
var comments = ko.observable();
var errorMessage = ko.observable(false);

function ViewModel() {
	
	this.pad2 = function(number) {
		return (number < 10 ? '0' : '') + number;
	};
	
	this.checkEntry = function() {
		if (miles() === undefined) {
			errorMessage(true);
		}
		else if (hours() === undefined && minutes() === undefined) {
			errorMessage(true);
		}
		else {
			this.logMyRun();
		}
	};
	
	this.logMyRun = function() {
		errorMessage(false);
		if (date() === undefined) {
			date('');
		}
		if (hours() !== undefined && minutes() === undefined) {
			minutes('00');
		}
		if (hours() === undefined && minutes() !== undefined) {
			hours('0');
		}
		if (seconds() === undefined) {
			seconds('00');
		}
		if (comments() === undefined) {
			comments('');
		}
		if (minutes().length < 2) {
			minutes(this.pad2(minutes())) 
		}
		if (seconds().length < 2) {
			seconds(this.pad2(seconds())) 
		}
		var totalSeconds = parseInt(seconds()) + (parseInt(minutes()) * 60) + 
			(parseInt(hours()) * 3600);
		var secPerMile = totalSeconds / miles();
		var paceMinutes = Math.floor(secPerMile / 60);
		var paceSeconds = Math.round(((secPerMile / 60) - paceMinutes) * 60);
		
		document.getElementById('date').innerHTML = date();
		document.getElementById('miles').innerHTML = miles();
		document.getElementById('time').innerHTML = hours() + ':' + 
			minutes() + ':' + seconds();
		document.getElementById('pace').innerHTML = this.pad2(paceMinutes) + 
			':' + this.pad2(paceSeconds);
		document.getElementById('comments').innerHTML = comments();
	};
	
	this.formReset = function() {
		miles(undefined);
		hours(undefined);
		minutes(undefined);
		seconds(undefined);
		comments(undefined);
		errorMessage(false);
		document.getElementById('run-log-form').reset();
	};
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