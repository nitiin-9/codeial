const kue = require('kue');

const queue = kue.createQueue(); 

// process.on('uncaughtException', function (err) {
//     console.log(err);
// });

module.exports = queue;