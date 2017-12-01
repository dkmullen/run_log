/*jshint esversion: 6 */

const uri = process.env.MLAB_RUNLOG_CONNECT_STR;
const uri2 = 'mongodb://localhost:27017/runlog';

module.exports = {
    jwtSecret: 'mysecret',
    jwtSession: {
      session: false
    },
    'mongoUrl' : uri2
};
// To start mongo on Windows - "C:\Program Files\MongoDB\Server\3.4\bin\mongod.exe"

//process.env.JWT_SECRET_STR
