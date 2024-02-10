require("dotenv").config();
// import module to encrypt the user passwords
const bcrypt = require("bcrypt"); // For password hashing

async function hashPassword(password) {
  const saltRounds = parseInt(process.env.SALT_ROUNDS);

  return new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        reject(err);
      } else {
        resolve(hash);
      }
    });
  });
}

module.exports = { hashPassword };
