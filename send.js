const AWS = require('aws-sdk')
const dotenv = require('dotenv')
dotenv.config()

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

const ses = new AWS.SES({ apiVersion: '2010-12-01' });

const params = {
    Destination: {
        ToAddresses: [
            process.env.EMAIL_TO
        ]
    },
    Message: {
        Body: {
            Html: {
                Charset: 'UTF-8',
                Data: "<h1>Hany testing</h1>"
            },
            Text: {
                Charset: "UTF-8",
                Data: "Hany testing"
            }
        },
        Subject: {
            Charset: 'UTF-8',
            Data: '[AWS SES Test] Test Email'
        }
    },
    ReturnPath: process.env.EMAIL_FROM,
    Source: process.env.EMAIL_FROM,
};

ses.sendEmail(params, (err, data) => {
    if (err) {
        return console.log(err, err.stack);
    } else {
        console.log("Email sent.", data);
    }
});