const { createToken } = require("../authentication/getToken");
const { createUser, loginUser } = require("../services/userServices");

// endpoint register the user in the system
// validate the email of user
// validate whether email does not exists before
// validate password
// register user

exports.registerUser = async (req, res) => {
  try {
    // if user is validated successfully,
    // then
    // return the validated user
    // and jwt token

    const registrationResult = await createUser(req);

    // if user is already exists
    if (!registrationResult.success) {
      return res.status(409).json({ message: registrationResult.message });
    }

    // new user created , create jwt token and return

    const token = await createToken(registrationResult.user);
    return res.status(201).json({
      message: registrationResult.message,
      user: registrationResult.user,
      token: token,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Unable to create user",
      message: error.message,
    });
  }
};

exports.authenticateUser = async (req, res) => {
  // access the email and passWord from req
  // verify that user exists or not with that credentials
  // if not then return , status code not found
  // else return jwt token, user

  const { email, passWord } = req.body;

  try {
    // Call the loginUser function from the authService
    const { user, token } = await loginUser(email, passWord);

    // Return a success response with the user object and token
    return res.status(200).json({ user, token });
  } catch (error) {
    // Handle any errors that occur during login
    console.error("Error during login:", error);
    return res.status(401).json({ error: "Login failed: " + error.message });
  }
};
