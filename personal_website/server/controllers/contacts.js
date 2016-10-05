// require nodemailer module which will help me send email to me
var nodemailer = require('nodemailer');

function ContactController() {

	this.send_email = function(req, res) {

		// create reusable transporter object using the default SMTP transport
		var smtpTransport = nodemailer.createTransport('smtps://to.nodemailer@gmail.com:adgsfhqetwry@smtp.gmail.com');

		// setup e-mail data with unicode symbols
		var mailData = {
				    		to: 'tommyhyungjinoh@gmail.com', // list of receivers
							cc: req.body.from,
				    		subject: req.body.subject, // Subject line
				    		text: req.body.text // plaintext body
				    	};

		// send mail with defined transport object
		smtpTransport.sendMail(mailData, function(error, response){
		    if(error){
				console.log("[sendMail: ERROR] failed to send an email to Tommy");
				res.json({ error: "Failed to send an email... Please let me know that it is not working!"});
		    }
			else {
				console.log("[sendMail: SUCCESS] successfully send an email to Tommy!");
				res.json({ success: "Thank you for sending me an email! I will get back to you as soon as possible!"});
			}
		});
	};

}

module.exports = new ContactController();
