const { login } = require("../services/adminServices");

exports.authenticateAdmin = async (req, res) => {
  try {
    const token = await login(req);
    return res.status(200).json({ admin: null, token: token });
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};
