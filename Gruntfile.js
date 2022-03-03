
var request = require('request');
url="https://mocktarget.apigee.net/user"


module.exports = function(grunt){

  grunt.initConfig({
    log: {
      Batch1: {
        "startidx":0,
        "endidx":100
      },
      Batch2: {
        "startidx":101,
        "endidx":200
      },
      Batch3: {
        "startidx": 201,
        "endidx":300
      },
      Batch4: {
        "startidx":301,
        "endidx":400
      },
      Batch5: {
        "startidx":401,
        "endidx":500
      }

    }
  });

  grunt.task.registerMultiTask('log', 'Log stuff.', function() {
    var i=0
    var JSONData=JSON.parse(JSON.stringify(this.data))

    grunt.log.writeln(this.target + ': ' + JSON.stringify(this.data));

    for(i=JSONData.startidx;i<=JSONData.endidx;i++){
          var done = this.async();
        request(url, function(err, response, contents) {
          if(err) {
            done(err);
          } else if(response.statusCode !== 200) {
            done(new Error('Not OK'));
          } else {

            grunt.log.ok(i+ response.data);
            done();
          }
        });

    }
  });




};
