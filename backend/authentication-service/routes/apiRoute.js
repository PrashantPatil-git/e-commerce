const router = require("express").Router();
const userController = require("../controllers/userController");
// const { verifyJWT } = require("../authentication/verifyToken");

// endpoints under user controller
// all the endpoints which are come under user route

router.post("/user/signup", userController.registerUser);

router.post("/user/login", userController.authenticateUser);

// export the express router
module.exports = router;
