# Run Log
Basic app for logging runs, miles, times. In this first iteration, output is only posted to the screen and the app isn't yet connected to any database. **Run Log** runs on Node Express and will soon connect to a Mongo database.


### To Install:

Clone the repository and run `npm install`, then `npm start` to run the app.

### Dependencies

- [knockout.js](http://knockoutjs.com/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)

### Credits

- Thanks to [fanaur at Stack Overflow](http://stackoverflow.com/questions/8043026/javascript-format-number-to-have-2-digit) for the function pad2

### Status
December 2, 2017
- Routes are successfully authenticated on the back end and runs are correlated with users.
- Can create a new user and log in from the front end forms
- However, token is not yet passed to the front end, which blocks runs from being logged
