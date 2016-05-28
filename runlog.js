var date = ko.observable();
var miles = ko.observable();
var hours = ko.observable();
var minutes = ko.observable();
var seconds = ko.observable();
var comments = ko.observable();
var errorMessage = ko.observable(false);
var showTable = ko.observable(false);

function ViewModel() {
	
	/**
	 * Helper function to produce two digit numbers (credit at bottom of file)
	 * If number < 10, adds a '0' to the front, otherwise adds empty string
	 * @function
	 * @param {number} num - Passed in from other functions
	 * @returns a two-digit number 
	 */
	this.pad2 = function(number) {
		return (number < 10 ? '0' : '') + number;
	};

	/**
	 * Function called directly by 'Submit' button. Checks to see if needed
	 * fields are filled out. If not, flips the errorMessage observable to
	 * true. Otherwise called the next function of the app, fillInData.
	 * @function
	 */	
	this.checkEntry = function() {
		if (miles() === undefined) {
			errorMessage(true);
		}
		else if (hours() === undefined && minutes() === undefined) {
			errorMessage(true);
		}
		else {
			this.fillInData();
		}
	};

	/**
	 * A function that fills in with zeros any optional fields left
	 * blank, calls pad2 to add leading zeros to some single-digit fields,
	 * then calls logMyRun;
	 * @function
	 */	
	this.fillInData = function() {
		/** Turns off error message in case it was on from a previous attempt.*/
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
		//Checks for single digit numbers, adds a leading zero with pad2.
		if (minutes().length < 2) {
			minutes(this.pad2(minutes())); 
		}
		if (seconds().length < 2) {
			seconds(this.pad2(seconds())); 
		}
		this.logMyRun();
	};
		
		 
	/** 
	 * Calculates the pace of the run and 'logs' it by adding data to the DOM.
	 * Calls formReset to clear the form and toggles the observable showTable
	 * to 'true' to display the previously hidden data div.
	 * @function
     */
	  
	this.logMyRun = function() {
		//parseInt because numbers from the form are delivered as strings
		var totalSeconds = parseInt(seconds()) + (parseInt(minutes()) * 60) + 
			(parseInt(hours()) * 3600);
		var secPerMile = totalSeconds / parseFloat(miles());
		//Math.floor finds all the complete minutes, drops remaining seconds
		var paceMinutes = this.pad2(Math.floor(secPerMile / 60));
		//Finds the remaining seconds from above, rounds to the nearest sec.
		var paceSeconds = this.pad2(Math.round(((secPerMile / 60) - paceMinutes) * 60));
		if (paceSeconds === '60') {
			//parseInt because pad2 returns a string
			paceMinutes = parseInt(paceMinutes) + 1;
			paceSeconds = '00';
		}
		
		document.getElementById('date').innerHTML = date();
		document.getElementById('miles').innerHTML = miles();
		document.getElementById('time').innerHTML = hours() + ':' + 
			minutes() + ':' + seconds();
		document.getElementById('pace').innerHTML = paceMinutes + ':' + 
			paceSeconds;
		document.getElementById('comments').innerHTML = comments();
		
		this.formReset();
		showTable(true);
	};
	

	/**
	 * Empties the form; Called when Submit button is hit
	 * @function
	 */	
	this.formReset = function() {
		miles(undefined);
		hours(undefined);
		minutes(undefined);
		seconds(undefined);
		comments(undefined);
		errorMessage(false);
		document.getElementById('run-log-form').reset();
	};

	/**
	 * Closes the results div when Close button is hit.
	 * @function
	 */		
	this.closeTable = function() {
		showTable(false);
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