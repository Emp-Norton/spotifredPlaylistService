var aws = require('aws-sdk');
var queueUrl = "https://sqs.us-west-1.amazonaws.com/276347759228/spotifredEventsQueue";

aws.config.loadFromPath(__dirname + '/../config.json');
let sqs = new aws.SQS();

let sendMessage = (message) => {


	  var params = {
	    MessageBody: JSON.stringify(message),
	    QueueUrl: queueUrl, 
	    DelaySeconds: 0
	  };

	  sqs.sendMessage(params, function(err, data) {
	    if(err) {
	      console.log(err)
	    } else {
	      console.log('sent: ' + data)
	    } 
	  });
	

}


module.exports = {
	sendMessage
}