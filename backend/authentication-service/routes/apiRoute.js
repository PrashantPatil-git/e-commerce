const router = require("express").Router();
const userController = require("../controllers/userController");
const adminController = require("../controllers/adminController");
const sellerController = require("../controllers/sellerController");
// user routes

router.post("/user/signup", userController.registerUser);

router.post("/user/login", userController.authenticateUser);

// admin related routes

router.post("/admin/login", adminController.authenticateAdmin);

// seller related routes

router.post("/seller/register", sellerController.registerSeller);

router.post("/seller/login", sellerController.authenticateSeller);

// export the express router
module.exports = router;
