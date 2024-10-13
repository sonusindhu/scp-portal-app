/**
 * EmailController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  findById: async (req, res) => {
    // Look up the user with this reset token.
    let email = await Email.findOne({ id: req.param("id") });
    // If no such user exists, or their token is expired, bail.
    if (!email) {
      return res.send({
        status: false,
        message: `Email doesn't exist or deleted.`,
      });
    }

    return res.send({
      status: true,
      message: "Email has been fetched successfully.",
      result: email,
    });
  },

  delete: async (req, res) => {
    Email.destroyOne({ id: req.param("id") }).exec(function (err) {
      return res.send({
        status: true,
        message: "Email has been deleted successfully.",
      });
    });
  },

  deleteRange: async (req, res) => {
    if (req.body && req.body.ids && req.body.ids.length) {
      const ids = req.body.ids;
      Email.destroy(ids).exec(() => {
        return res.send({
          status: true,
          message: "Email(s) have been deleted successfully.",
        });
      });
    }

    return res.send({
      status: true,
      message: "Email(s) have been deleted successfully.",
    });
  },

  create: async (req, res) => {
    const payload = req.body;
    if (payload.type == "quote") {
      const quote = await Quote.findOne({ id: payload.quoteId });
      payload.companyId = quote.company;
    }
    payload.createdBy = req.token.id;
    const email = await Email.create(payload).fetch();
    return res.send({
      status: true,
      message: "Email has been successfully created.",
      result: email,
    });
  },

  list: async (req, res) => {
    const payload = req.body;
    let emails = await Email.find({
      ...payload,
    }).sort([
      {
        id: "desc",
      },
    ]);
    return res.send({
      status: true,
      message: "Email(s) has been fetched successfully.",
      result: emails,
    });
  },
};
