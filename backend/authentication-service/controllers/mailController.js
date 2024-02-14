const { sendWelcomeEmail } = require("../services/mailServices");


exports.sendWelcomeMailToNewUser = async (req, res) => {

  const { email, firstName, lastName } = req.body;

  console.log(email, firstName, lastName);
  await sendWelcomeEmail(email, firstName, lastName);

  return res.status(200);
};
