const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');
require('dotenv').config();


const EMAIL = process.env.EMAIL;
const PASSWORD = process.env.PASSWORD;

const email = (req, res) => {
    const { truckId, businessName, selectedFoodType, maxCapacity, foodLicenseURL, menuURL, logoURL } = req.body;
    const transporter = nodemailer.createTransport({
        // host: "smtp.gmail.com", // SMTP server address (usually mail.your-domain.com)
        // port: 465, // Port for SMTP (usually 465)
        // secure: true, // Usually true if connecting to port 465
        service: 'gmail',
        auth: {
          user: EMAIL,
          pass: PASSWORD,
        },
    });

    let MailGenerator = new Mailgen({
        theme: "default",
        product : {
            name: "Mailgen",
            link : 'https://mailgen.js/'
        }
    })

    let response = {
        body: {
            name : "Admin",
            intro: "Verify this business",
            table : {
                data : [
                    {
                        truckId: truckId,
                        businessName: businessName,
                        selectedFoodType: selectedFoodType,
                        maxCapacity: maxCapacity,
                        foodLicenseURL: foodLicenseURL,
                        menuURL: menuURL,
                        logoURL: logoURL
                    }
                ]
            },
        }
    }

    let mail = MailGenerator.generate(response)

    let message = {
        from : "vendorVistaMichael@gmail.com",
        to : "vendorVistaMichael@gmail.com",
        subject: "Verify new business - ID:" + truckId ,
        html: mail
    }
    transporter.sendMail(message).then(() => {
        return res.status(201).json({
            msg: "you should receive an email"
        })
    }).catch(error => {
        return res.status(500).json({ error })
    })


}

module.exports = {
    email
}