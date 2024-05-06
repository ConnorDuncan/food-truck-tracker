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
   
    // const message = {
    //     from: 'vendorVistaMichael@gmail.com',
    //     to: 'vendorVistaMichael@gmail.com',
    //     subject: 'New Food Truck Submission - Verification Required',
    //     html: `
    //         <p>Food Truck ID: \${truckId}</p>
    //         <p>Business Name: \${businessName}</p>
    //         <p>Food Type: \${selectedFoodType}</p>
    //         <p>Max Capacity: \${maxCapacity}</p>
    //         <p>Food License: <a href="\${foodLicenseURL}">View License</a></p>
    //         <p>Menu: <a href="\${menuURL}">View Menu</a></p>
    //         <p>Logo: <img src="\${logoURL}" alt="Truck Logo" style="max-width: 200px;"></p>
    //         <p>Click the button below to verify:</p>
    //         <a href="http://your-domain.com/verify/\${truckId}" target="_blank">
    //             <button style="padding: 10px; background-color: #007bff; color: #fff; border: none; border-radius: 5px;">Verify Truck</button>
    //         </a>
    //     `,
    // };
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

    // try {
    //     const info = await transporter.sendMail(message);
    //     console.log('Email sent:', info.response);
    // } catch (error) {
    //     console.error('Error sending email:', error);
    // }
// }
}

module.exports = {
    email
}