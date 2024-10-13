/**
 * NoteController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  findById: async (req, res) => {
    // Look up the user with this reset token.
    let note = await Note.findOne({ id: req.param("id") });
    // If no such user exists, or their token is expired, bail.
    if (!note) {
      return res.send({
        status: false,
        message: `Note doesn't exist or deleted.`,
      });
    }

    return res.send({
      status: true,
      message: "Note has been fetched successfully.",
      result: note,
    });
  },

  delete: async (req, res) => {
    Note.destroyOne({ id: req.param("id") }).exec(function (err) {
      return res.send({
        status: true,
        message: "Note has been deleted successfully.",
      });
    });
  },

  deleteRange: async (req, res) => {
    if (req.body && req.body.ids && req.body.ids.length) {
      const ids = req.body.ids;
      Note.destroy(ids).exec(() => {
        return res.send({
          status: true,
          message: "Note(s) have been deleted successfully.",
        });
      });
    }

    return res.send({
      status: true,
      message: "Note(s) have been deleted successfully.",
    });
  },

  create: async (req, res) => {
    const payload = req.body;
    if (payload.type == "quote") {
      const quote = await Quote.findOne({ id: payload.quoteId });
      payload.companyId = quote.company;
    }
    payload.createdBy = req.token.id;
    const note = await Note.create(payload).fetch();
    return res.send({
      status: true,
      message: "Note has been successfully created.",
      result: note,
    });
  },

  list: async (req, res) => {
    const payload = req.body;
    let notes = await Note.find({
      ...payload,
    }).sort([
      {
        id: "desc",
      },
    ]);
    return res.send({
      status: true,
      message: "Note(s) has been fetched successfully.",
      result: notes,
    });
  },
};
