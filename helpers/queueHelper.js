let aws = require('aws-sdk');

aws.config.loadFromPath(__dirname + '/../config.json');
let sqs = new aws.SQS();

let sendMessage = (message) => {

  var params = {
    MessageBody: message,
    QueueUrl: "https://sqs.us-west-1.amazonaws.com/276347759228/spotifredEventsQueue",
    DelaySeconds: 0
  };

  sqs.sendMessage(params, function(err, data) {
    if(err) {
      res.send(err);
    } else {
      res.send(data);
    } 
  });

}


module.exports = {
	sendMessage
}