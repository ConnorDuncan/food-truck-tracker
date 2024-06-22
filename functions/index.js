const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");
require("dotenv").config();

const app = express();
app.use(cors({
  origin: "http://localhost:3000", // Allow only your frontend origin
}));
app.use(express.json());

const EMAIL = process.env.EMAIL;
const PASSWORD = process.env.PASSWORD;

// Set up Nodemailer transport
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL,
    pass: PASSWORD,
  },
});

// Define the email sending function
app.post("/send-email", (req, res) => {
  const {truckId,
    businessName,
    selectedFoodType,
    maxCapacity,
    foodLicenseURL,
    menuURL,
    logoURL} = req.body;

  const MailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Mailgen",
      link: "https://mailgen.js/",
    },
  });

  const response = {
    body: {
      name: "Admin",
      intro: "Verify this business",
      table: {
        data: [
          {
            truckId: truckId,
            businessName: businessName,
            selectedFoodType: selectedFoodType,
            maxCapacity: maxCapacity,
            foodLicenseURL: foodLicenseURL,
            menuURL: menuURL,
            logoURL: logoURL,
          },
        ],
      },
    },
  };

  const mail = MailGenerator.generate(response);

  const message = {
    from: EMAIL,
    to: EMAIL,
    subject: "Verify new business - ID:" + truckId,
    html: mail,
  };

  transporter.sendMail(message)
      .then(() => {
        return res.status(201).json({
          msg: "You should receive an email",
        });
      })
      .catch((error) => {
        return res.status(500).json({error});
      });
});

// Export the Express app as a Cloud Function
exports.api = functions.https.onRequest(app);
