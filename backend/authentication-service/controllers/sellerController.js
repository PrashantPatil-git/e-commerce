const sellerService = require("../services/sellerServices");

// function to register the seller
exports.registerSeller = async (req, res) => {
  try {
    const result = await sellerService.register(req);
    if (result.success) {
      return res.status(200).json({
        sellerRegistrationDto: result.seller,
        message: result.message,
      });
    } else {
      return res.status(400).json({ message: result.message });
    }
  } catch (error) {
    console.log("Error Occured : ", error);
    return res
      .status(422)
      .json({ message: "error while while registering seller" });
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
