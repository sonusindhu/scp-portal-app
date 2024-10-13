"use strict";

const AuthService = require("../services/AuthService");
const request = require("fs");

module.exports = {
  updatePassword: async (req, res) => {
    const { currentPassword, password, confirmPassword } = req.body;

    if (password != confirmPassword) {
      return res.send({
        status: false,
        message: "Password/confirm password doesn't matched.",
      });
    }

    // Look up the user with this reset token.
    const user = await User.findOne({ id: req.token.id });

    // If no such user exists, or their token is expired, bail.
    if (!user) {
      return res.send({
        status: false,
        message: "User's token has been invalid/expired.",
      });
    }

    User.comparePassword(currentPassword, user.password)
      .then(async () => {
        // Hash the new password.
        const hashed = await sails.helpers.passwords.hashPassword(password);

        // Store the user's new password and clear their reset token so it can't be used again.
        await User.updateOne({ id: req.token.id }).set({
          password: hashed,
          passwordResetToken: "",
          passwordResetTokenExpiresAt: 0,
        });

        return res.send({
          status: true,
          message: "Password has been changed successfully.",
        });
      })
      .catch((error) => {
        return res.send({
          status: false,
          message: "Please enter a valid current password",
        });
      });
  },

  updateProfile: async (req, res) => {
    const data = req.body;
    const userPayload = {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      fullName: `${data.firstName} ${data.lastName}`,
      jobTitle: data.jobTitle,
      department: data.department,
      location: data.location,
      phoneNumber: data.phoneNumber,
      extension: data.extension,
    };
    User.updateOne({ id: req.token.id })
      .set(userPayload)
      .exec(function (err, user) {
        if (err) {
          let message = "Form is not valid";
          if (err.code == "E_UNIQUE") {
            message = "Email is already exists";
          }
          res.send({ status: false, message, err });
        }
        return res.send({
          status: true,
          message: "User is successfully updated.",
          result: { ...userPayload, id: user.id },
        });
      });
  },

  getUserDetail: async (req, res) => {
    const user = await User.findOne({ id: req.token.id }).select([
      "email",
      "firstName",
      "lastName",
      "fullName",
      "jobTitle",
      "department",
      "location",
      "phoneNumber",
      "extension",
      "userImage",
    ]);
    return res.send({
      status: true,
      message: "User detail fetched successfully.",
      result: user,
    });
  },

  uploadProfileImage: async (req, res) => {
    const data = req.body;
    const user = await User.findOne({ id: req.token.id });
    if (user) {
      const base64Data = data.preview.replace(/^data:image\/png;base64,/, "");
      const userImg = `user-${user.id}-${Date.now()}.png`;
      request.writeFile(
        `./assets/user-images/${userImg}`,
        base64Data,
        "base64",
        async (err) => {
          if (err) {
            return res.send({
              status: false,
              message: "User image uploaded successfully.",
              result: err,
            });
          }
          const userPayload = {
            userImage: userImg,
          };
          const userDetails = await User.updateOne({ id: user.id }).set(
            userPayload
          );

          if (user.userImage) {
            // path of your file
            const path = `./assets/user-images/${user.userImage}`;
            // fs.access will check if file is available or not
            request.access(path, request.F_OK, (err) => {
              console.log(err);
              request.unlink(path, (err1) => {
                console.log(err1);
              });
            });
          }

          return res.send({
            status: true,
            message: "User image uploaded successfully.",
            result: { ...userPayload, id: user.id },
          });
        }
      );
    } else {
      return res.send({
        status: false,
        message: "Uploading user image failed.",
        result: user,
      });
    }
  },
};
