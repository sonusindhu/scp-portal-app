"use strict";

const AuthService = require("../services/AuthService");

module.exports = {
  signup: async (req, res) => {
    const data = req.body;
    const userPayload = {
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
      fullName: `${data.firstName} ${data.lastName}`,
    };

    if (data.password !== data.confirmPassword) {
      return res.send({
        status: false,
        message: "Password/confirm password doesn't matched",
      });
    }

    User.create(userPayload).exec(function (err, user) {
      if (err) {
        let message = "Form is not valid";
        if (err.code == "E_UNIQUE") {
          message = "Email is already exists";
        }
        res.send({ status: false, message, err });
      }
      return res.send({
        status: false,
        message: "User is successfully created.",
      });
    });
  },

  login: async (req, res) => {
    const data = req.body;
    if (!data.email || !data.password) {
      return res.send({
        status: false,
        message: "Please enter valid email/password",
      });
    }
    const user = await User.findOne({ email: data.email }).intercept(
      ({ message }) => res.send({ status: false, message })
    );

    if (user) {
      User.comparePassword(data.password, user.password)
        .then(() => {
          res.send({
            result: {
              token: AuthService.generateAuthToken({ id: user.id }),
              fullName: user.fullName,
            },
            status: true,
            message: "User loggedin successfully.",
          });
        })
        .catch((error) => {
          res.send({
            status: false,
            message: "Please enter valid email/password",
          });
        });
    } else {
      res.send({
        status: false,
        message: "Please enter valid email/password",
      });
    }
  },

  logout: (req, res) => {
    res.send({ status: true, message: "logged-out successfully." });
  },

  sendpassword: async (req, res) => {
    // Find the record for this user.
    // (Even if no such user exists, pretend it worked to discourage sniffing.)

    if (!req.body.email) {
      return res.send({
        status: false,
        message: "Please enter an email address.",
      });
    }

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.send({
        status: true,
        message: "Please check your email for the password reset link.",
      });
    }

    // Come up with a pseudorandom, probabilistically-unique token for use
    // in our password recovery email.
    const token = await sails.helpers.strings.random("url-friendly");

    // Store the token on the user record
    // (This allows us to look up the user when the link from the email is clicked.)
    await User.updateOne({ id: user.id }).set({
      passwordResetToken: token,
      passwordResetTokenExpiresAt:
        Date.now() + sails.config.custom.passwordResetTokenTTL,
    });

    // Send recovery email
    await sails.helpers.sendTemplateEmail.with({
      to: req.body.email,
      subject: "Password reset instructions",
      template: "email-reset-password",
      templateData: {
        fullName: user.fullName,
        token: token,
      },
    });

    return res.send({
      status: true,
      message: "Please check your email for the password reset link.",
    });
  },

  updatePassword: async (req, res) => {
    const { password, confirmPassword, token } = req.body;

    if (!token) {
      return res.send({
        status: false,
        message: "Invalid password token.",
      });
    }

    if (password != confirmPassword) {
      return res.send({
        status: false,
        message: "Password/confirm password doesn't matched.",
      });
    }

    // Look up the user with this reset token.
    const user = await User.findOne({ passwordResetToken: token });

    // If no such user exists, or their token is expired, bail.
    if (!user || user.passwordResetTokenExpiresAt <= Date.now()) {
      return res.send({
        status: false,
        message: "Password token has been invalid/expired.",
      });
    }

    // Hash the new password.
    const hashed = await sails.helpers.passwords.hashPassword(password);

    // Store the user's new password and clear their reset token so it can't be used again.
    await User.updateOne({ id: user.id }).set({
      password: hashed,
      passwordResetToken: "",
      passwordResetTokenExpiresAt: 0,
    });

    // In case there was an existing session, broadcast a message that we can
    // display in other open tabs.
    // if (sails.hooks.sockets) {
    //   await sails.helpers.broadcastSessionChange(this.req);
    // }

    return res.send({
      status: true,
      message: "Password has been reset successfully.",
    });
  },
};
