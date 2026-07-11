import nodemailer from 'nodemailer';

function request ({sql}) {

    this.req_path = '/send_email';
    this.req_type = 'post';
    this.callbacks = ['send_email'];

    this.req = (req,res) => {

        let {email, mail_message, response_msg} = req.body;

        let transporter = nodemailer.createTransport({
            service: process.env.MAIL_HOST,
            auth: {
                user: process.env.GOOGLE_EMAIL,
                pass: process.env.GOOGLE_EMAIL_PASSWORD
            }
        });

        let mailOptions = {
            from: process.env.GOOGLE_EMAIL,
            to: email,
            subject: 'Cosmo Verification Code',
            text: mail_message,
            html: `<pre>${mail_message}</pre>`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);

                res.json({message: "Error sending email", failed: true});

            } else {
                console.log('Email sent: ' + info.response, response_msg);

                res.json({message: response_msg, failed: false});
            }
        });
    };

}

export default request;