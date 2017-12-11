/*jshint esversion: 6 */

function ViewModel() {
  listRuns = function() {
    $.ajax({
      type: 'GET',
      url: '/runs',
      headers: { 'x-auth': localStorage.getItem('token') },
      success: (results) => {
        let data = results.runs;
        data.forEach((run) => {
          let str =
            '<tr><td>' + run.date + '</td>' +
            '<td>' + run.distance + '</td>' +
            '<td>' + run.hours + ':' + run.minutes + ':' + run.seconds + '</td>' +
            '<td>' + run.paceminutes + ':' + run.paceseconds + '</td>' +
            '<td>' + run.comments + '</td></tr>'
          ;
          $('#runs > tbody:last-child').append(str);
        });
      },
      error: (req, status, error) => { console.log(error); }
    });
  };
}

ko.applyBindings(new ViewModel());
