const { login } = require("../services/adminServices");

exports.authenticateAdmin = async (req, res) => {
  const { userName, passWord } = req.body;

  try {
    const token = await login(userName, passWord);
    res.json({ token });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};
