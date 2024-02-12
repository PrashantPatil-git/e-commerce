require("dotenv").config();
const nodemailer = require("nodemailer");
const axios = require("axios");

// send welcome email to the user, when user registerd on to the system

const sendWelcomeEmail = async (userEmail, userFirstName, userLastName) => {
  // transporter is a object, which holds the SMTP connection info for email communication
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL,
      pass: process.env.GMAIL_PASSWORD,
    },
  });

  // mailData holds the, meta data and information need to be shared in the email

  const mailData = {
    from: process.env.GMAIL, // sender address
    to: userEmail, // list of receivers
    subject: "Welcome To BookCharm",
    html: `
      <h3>Hey 👋, ${userFirstName} ${userLastName}</h3>
      <p>Welcome to Our Platform!</p>
      <p>Thank you for signing up. We're excited to have you on board!</p>
      <button><a href="${process.env.WEBAPP_URL}">View Platform</a></button>
    `,
  };

  try {
    // send email to the user using transporter object
    // mailInfor contains the information about the sended mail
    const mailInfo = await transporter.sendMail(mailData);
    return {
      success: true,
      message: "email send successfully",
    };
  } catch (error) {
    console.log(error);
    throw new Error("Error while Sending email to the user");
  }
};

// function to verify the user email whether it is valid email or not
// returns boolean
const validateEmail = async (userEmail) => {
  // verify whether email is valid or not, and return status accordingly

  // use abstract api to verify email valid or not

  /*
  it returns json data inside 
  deliverability as

  'DELIVERABLE' means it is valid 
  'UNDELIVERABLE' means it is not valid
  'UNKNOWN' means it is not valid


  deliverability: 'DELIVERABLE',
  */

  try {
    const response = await axios.get(
      `https://emailvalidation.abstractapi.com/v1/?api_key=${process.env.ABSTRACTAPI_API_KEY}&email=${userEmail}`
    );

    if (response.data.deliverability === "DELIVERABLE") {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    throw new Error("error while validating email");
  }
};

module.exports = {
  validateEmail,
  sendWelcomeEmail,
};
