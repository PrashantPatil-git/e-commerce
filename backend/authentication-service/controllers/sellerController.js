const sellerService = require("../services/sellerServices");

// function to register the seller
exports.registerSeller = async (req, res) => {
  try {
    const result = await sellerService.register(req);
    if (result.success) {
      return res.status(200).json({ message: result.message });
    } else {
      return res.status(400).json({ error: result.message });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.authenticateSeller = async (req, res) => {
  try {
    const { email, passWord } = req.body;
    const { token, seller } = await sellerService.login(email, passWord);
    res.status(200).json({ token, seller });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};
