const jwt = require("jsonwebtoken"),
  tokenSecret = "SCP_AUTH_SECRET_KEY_10";

module.exports = {
  // Generates a token from supplied payload
  generateAuthToken(payload) {
    return jwt.sign(
      payload,
      tokenSecret, // Token Secret that we sign it with
      {
        expiresIn: "30 days", // Token Expire time
      }
    );
  },

  // Verifies token on a request
  verifyAuthToken(token, callback) {
    return jwt.verify(
      token, // The token to be verified
      tokenSecret, // Same token we used to sign
      {}, // No Option, for more see https://github.com/auth0/node-jsonwebtoken#jwtverifytoken-secretorpublickey-options-callback
      callback //Pass errors or decoded token to callback
    );
  },
};
