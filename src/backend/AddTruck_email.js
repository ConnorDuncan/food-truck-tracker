// /*
// goals:
// -install node.js (servide side tech that lets you write a server w/ JS)
// to set up a backend service 
// -import nodemailer, write email sending logic (get business ID and send that info to admin)
// -BACKEND API ENDPOINT: create an API endpoint that's called when you click "submit"
// -FRONTEND INTEGRATION: on FE, use lib like Axios to make a HTTP POST request to that 
// endpoint when button is clicked
// -handle email confirmation

// */

// // node.js uses CommonJS as its JS module system (the way node.js handles importing modules like nodemailer) and ES 
// const express = require('express');
// const bodyParser = require('body-parser');
// const serviceAccount = require('src/backend/food-truck-tracker-8ee55-firebase-adminsdk-2yy9i-51cae5a991.js');
// import nodemailer from 'nodemailer';
// import * as admin from 'firebase-admin'

// const app = express();
// app.use(bodyParser.json());

// // Initialize Firebase Admin SDK (SW Dev Kit)
// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     // Replace 'your-project-id' with your actual Firebase project ID
//     databaseURL: 'https://food-truck-tracker-8ee55.firebaseio.com',
//   });

// // Get a reference to the Firestore database
// const db = admin.firestore();

// // Endpoint to fetch Firestore business data and send email
// app.get('/api/send-email/:foodTruckID', async (req, res) => {
//   try {
//     // Read data from Firestore document
//     const snapshot = await db.collection('food-trucks').doc(foodTruckID).get();
//     const data = snapshot.data();

//     // Create nodemailer transporter
//     const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: 'vendorVistaMichael@gmail.com',
//         pass: 'vendorVistaMichael123',
//       },
//     });

//     // Email content
//     const mailOptions = {
//       from: 'vendorVistaMichael@gmail.com',
//       to: 'vendorVistaMichael@gmail.com',
//       subject: 'Firestore Data',
//       text: JSON.stringify(data), // Convert data to JSON string for email body
//     };

//     // Send email
//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         console.error('Error sending email:', error);
//         res.status(500).send('Error sending email');
//       } else {
//         console.log('Email sent:', info.response);
//         res.send('Email sent successfully');
//       }
//     });
//   } catch (error) {
//     console.error('Error reading Firestore data:', error);
//     res.status(500).send('Error reading Firestore data');
//   }
// });

// module.exports = {
//   sendEmail,
// };



// // // Function to fetch data from Firestore and send email
// // async function sendFirestoreDataByEmail(foodTruckID) {
// //     try {
// //       // Retrieve data from Firestore (example query, replace with your actual query)
// //       const snapshot = await db.collection('food-trucks').doc(foodTruckID).get();
// //       const data = snapshot.data();
  
// //       // Format the Firestore data into HTML content for the email
// //       const htmlContent = `
// //         <h1>Food Truck Business Information</h1>
// //         <ul>
// //             <li>
// //               <strong>business_name:</strong> ${data.business_name}<br>
// //               <strong>food_type:</strong> ${data.food_type}<br>
// //               <strong>license:</strong> ${data.license}<br>
// //               <strong>logo:</strong> ${data.logo}<br>
// //               <strong>max_capacity:</strong> ${data.max_capacity}<br>
// //               <strong>menu:</strong> ${data.menu}<br>
// //               <strong>open:</strong> ${data.open ? 'Yes' : 'No'}<br>
// //               <strong>verified:</strong> ${data.verified ? 'Yes' : 'No'}<br>
// //             </li>
// //         </ul>
// //       `;
  
// //       // Create a Nodemailer transporter
// //       const transporter = nodemailer.createTransport({
// //         service: 'gmail',
// //         auth: {
// //           user: 'vendorVistaMichael@gmail.com',
// //           pass: 'vendorVistaMichael123',
// //         },
// //       });
// //       // Define the email options
// //   const mailOptions = {
// //     from: 'vendorVistaMichael@gmail.com', // Sender email address
// //     to: 'vendorVistaMichael@gmail.com', // Recipient email address
// //     subject: 'VendorVista - Verify Business',
// //     text: 'Content of your email', // Plain text body
// //     html: htmlContent, // HTML body (optional)
// //   };
  
// //       // Send the email
// //       const info = await transporter.sendMail(mailOptions);
// //       console.log('Email sent:', info.response);
// //     } catch (error) {
// //       console.error('Error sending email:', error);
// //     }
// //   }

// // export default sendFirestoreDataByEmail;




  
  
  
  