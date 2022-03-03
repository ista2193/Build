
  var request = require('request');
  url="https://mocktarget.apigee.net/user"


  module.exports = function(grunt){

    grunt.initConfig({
      log: {
        Batch1: {
          "startidx":0,
          "endidx":200
        }

        ,
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
      var mgmtCall=0
      var done = this.async();
      var JSONData=JSON.parse(JSON.stringify(this.data))



      for(i=JSONData.startidx;i<=JSONData.endidx;i++){
      let newVAL=i

          request(url, function(err, response, contents) {
            mgmtCall++
            if(err) {
              console.log("there is an error")
              done(err);
            } else if(response.statusCode !== 200) {
                console.log("there is an error")
              done(new Error('Not OK'));
            } else {
              grunt.log.ok(newVAL+ contents);

            }
            if(mgmtCall==JSONData.endidx-JSONData.startidx){
              done();
            }
          });

      }
    });




  };
