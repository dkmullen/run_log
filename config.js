/*jshint esversion: 6 */

const uri = process.env.MLAB_RUNLOG_CONNECT_STR;
const uri2 = 'mongodb://localhost:27017/runlog';

module.exports = {
    jwtSsecret: process.env.JWT_SECRET_STR,
    jwtSession: {
      session: false
    },
    'mongoUrl' : uri
};
// To start mongo on Windows - "C:\Program Files\MongoDB\Server\3.4\bin\mongod.exe"
