/**
 * User.js
 *
 * A user who can log in to this application.
 */

const bcrypt = require("bcrypt");

module.exports = {
  tableName: "users",
  attributes: {
    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝

    email: {
      type: "string",
      required: true,
      unique: true,
      isEmail: true,
      maxLength: 200,
    },

    password: {
      type: "string",
      required: true,
      protect: true,
    },

    firstName: {
      type: "string",
      required: true,
      maxLength: 120,
    },

    lastName: {
      type: "string",
      required: true,
      maxLength: 120,
    },

    fullName: {
      type: "string",
      maxLength: 255,
    },

    isSuperAdmin: {
      type: "boolean",
    },

    isAdmin: {
      type: "boolean",
    },

    passwordResetToken: {
      type: "string",
    },

    passwordResetTokenExpiresAt: {
      type: "number",
      example: 1502844074211,
    },

    emailProofToken: {
      type: "string",
    },

    emailProofTokenExpiresAt: {
      type: "number",
    },

    userImage: {
      type: "string",
      maxLength: 255,
    },
    jobTitle: {
      type: "string",
      maxLength: 100,
    },
    department: {
      type: "string",
      maxLength: 100,
    },
    location: {
      type: "string",
      maxLength: 100,
    },
    phoneNumber: {
      type: "string",
      maxLength: 50,
    },
    extension: {
      type: "string",
      maxLength: 10,
    },

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝
    // n/a

    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
    // n/a
  },

  details: {
    email: "Email is required",
  },

  validationMessages: {
    email: {
      required: "Please enter an email address.",
      email: "Please enter a valid email address",
      unique: "Email address is already taken",
    },
    password: {
      required: "Please enter a password.",
    },
    confirmPassword: {
      required: "Please enter a confirm password",
    },
    firstName: {
      required: "Please enter a first name",
    },
    lastName: {
      required: "Please enter a last name",
    },
  },

  // Here we encrypt password before creating a User
  beforeCreate(values, next) {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        sails.log.error(err);
        return next();
      }

      bcrypt.hash(values.password, salt, (err, hash) => {
        if (err) {
          sails.log.error(err);
          return next();
        }
        values.password = hash; // Here is our encrypted password
        return next();
      });
    });
  },

  comparePassword(password, encryptedPassword) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, encryptedPassword, (err, match) => {
        if (err) {
          return reject(err);
        }
        if (match) return resolve();
        return reject("Mismatch passwords");
      });
    });
  },
};
