/*jshint esversion: 6 */

let date = ko.observable(),
	miles = ko.observable(),
	hours = ko.observable(),
	minutes = ko.observable(),
	seconds = ko.observable(),
	comments = ko.observable(),
	errorMessage = ko.observable(false),
	showModal = ko.observable(false);

function ViewModel() {

	/**
	* Helper function to produce two digit numbers (credit at bottom of file)
	* If number < 10, adds a '0' to the front, otherwise adds empty string.
	* pad2 comes from fanaur at http://stackoverflow.com/questions/8043026/javascript-format-number-to-have-2-digit
	* Longform: if (number < 10) {return '0' + number;} else {return '' + number;}
	* @function
	* @param {number} num - Passed in from other functions
	* @returns a two-digit number
	*/
	pad2 = function(number) {
		return (number < 10 ? '0' : '') + number;
	};

	/**
	* Function called directly by 'Submit' button. Checks to see if needed
	* fields are filled out. If not, flips the errorMessage observable to
	* true. Otherwise called the next function of the app, fillInData.
	* @function
	*/
	checkEntry = function() {
		if (miles() === undefined) {
			errorMessage(true);
		}	else if (hours() === undefined && minutes() === undefined) {
			errorMessage(true);
		} else {
			fillInData();
		}
	};

	/**
	* A function that fills in with zeros any optional fields left
	* blank, calls pad2 to add leading zeros to some single-digit fields,
	* then calls logMyRun;
	* @function
	*/
	fillInData = function() {
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
			minutes(pad2(minutes()));
		}
		if (seconds().length < 2) {
			seconds(pad2(seconds()));
		}
		logMyRun();
	};

	/**
	* Calculates the pace of the run and 'logs' it by adding data to the DOM.
	* Calls formReset to clear the form and toggles the observable showModal
	* to 'true' to display the previously hidden data div. Also posts the data
	* to the MongoDB.
	* @function
	*/

	logMyRun = function() {
		//parseInt because numbers from the form are delivered as strings
		var totalSeconds = parseInt(seconds()) + (parseInt(minutes()) * 60) +
			(parseInt(hours()) * 3600);
		var secPerMile = totalSeconds / parseFloat(miles());
		//Math.floor finds all the complete minutes, drops remaining seconds
		var paceMinutes = pad2(Math.floor(secPerMile / 60));
		//Finds the remaining seconds from above, rounds to the nearest sec.
		var paceSeconds = pad2(Math.round(((secPerMile / 60) - paceMinutes) * 60));
		if (paceSeconds === '60') {
			//parseInt because pad2 returns a string
			paceMinutes = parseInt(paceMinutes) + 1;
			paceSeconds = '00';
		}

		/* Make the modal */
		document.getElementById('date').innerHTML = date();
		document.getElementById('miles').innerHTML = miles();
		document.getElementById('time').innerHTML = hours() + ':' +
			minutes() + ':' + seconds();
		document.getElementById('pace').innerHTML = paceMinutes + ':' +
			paceSeconds;
		document.getElementById('comments').innerHTML = comments();

		/* Create the object for posting */
		let myAwesomeRun = {
			date: date(),
			distance: miles(),
			hours: hours(),
			minutes: minutes(),
			seconds: seconds(),
			paceminutes: paceMinutes,
			paceseconds: paceSeconds,
			comments: comments()
		};
		console.log(myAwesomeRun);

		$.ajax({
			type: "POST",
			url: "/runs",
			headers: { 'x-auth': localStorage.getItem('token') },
			dataType: 'JSON',
			data: myAwesomeRun})
			.done(function(myAwesomeRun, status){
				console.log("Data: " + myAwesomeRun + "\nStatus: " + status);
				})
			.fail(function() {
			console.log('Didnt work!');
			})

		formReset();
		showModal(true);
		setTimeout(function() { showModal(false); }, 5000);
	};
	/** End of logMyRun function --------------------------------------- */

	/**
	* Empties the form; Called when Submit button is hit
	* @function
	*/
	formReset = function() {
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
	closeModal = function() {
		showModal(false);
	};

	logData = function() {
		$.ajax({
	    type: 'GET',
	    url: '/runs',
	    headers: { 'x-auth': localStorage.getItem('token') },
	    success: (results) => {
				let data = results.runs;
					for (i = 0; i < data.length; i++) {
					var str =
						'<tr><td>' + data[i].date + '</td>' +
						'<td>' + data[i].distance + '</td>' +
						'<td>' + data[i].hours + ':' + data[i].minutes + ':' + data[i].seconds + '</td>' +
						'<td>' + data[i].paceminutes + ':' + data[i].paceseconds + '</td>' +
						'<td>' + data[i].comments + '</td></tr>'
					;
					$('#runs > tbody:last-child').append(str);
					}


				console.log(results);
			},
	    error: (req, status, error) => { console.log(error); }
	  });


		// $.get('/runs', function( data ) {
		// 	for (i = 0; i < data.length; i++) {
		// 	var str =
		// 		'<tr><td>' + data[i].date + '</td>' +
		// 		'<td>' + data[i].distance + '</td>' +
		// 		'<td>' + data[i].hours + ':' + data[i].minutes + ':' + data[i].seconds + '</td>' +
		// 		'<td>' + data[i].paceMinutes + ':' + data[i].paceSeconds + '</td></tr>'
		// 	;
		// 	$('#runs > tbody:last-child').append(str);
		// 	}
		// })
		// .done(function() {
		// 	console.log('Success!')
		// })
		// .fail(function() {
		// 	for (i = 0; i < 10; i++) {
		// 	var str =
		// 		'<tr><td>?????</td>' +
		// 		'<td>?????</td>' +
		// 		'<td>?????</td>' +
		// 		'<td>?????</td></tr>';
		// 		$('#runs > tbody:last-child').append(str);
		// 	};
		// 	var errMsg = '<p id="oh-no">Oh no! The database must be unavailable!</p>';
		// 	$('#fail-msg').append(errMsg);

		// });
	};

}
ko.applyBindings(new ViewModel());

let logOut = () => {
  $.ajax({
    type: 'DELETE',
    url: '/users/me/token',
    headers: { 'x-auth': localStorage.getItem('token') },
    success: () => { localStorage.removeItem('token'); },
    error: (req, status, error) => {
    console.log(error);
    }
  });
};
