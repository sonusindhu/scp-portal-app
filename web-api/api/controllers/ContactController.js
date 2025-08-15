/**
 * ContactController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const ContactService = require("../services/ContactService");
const GridService = require("../services/GridService");

module.exports = {
  listView: async (req, res) => {
    const { sort: payloadSort = [], filter, take, skip } = req.body;
    
    // Default sort
    const sort = payloadSort.length ? payloadSort : [{ id: "asc" }];

    // Build filter query for the view
    let filterQuery;
    if (filter?.filters?.length) {
      filterQuery = GridService.prepareWaterlineFilter(filter);
    }

    // Query the view instead of Company
    let contacts = await ViewContactList.find(filterQuery ? { where: filterQuery } : {})
      .sort(sort)
      .limit(take)
      .skip(skip);

    // Total count
    const total = filterQuery
      ? await ViewContactList.count({ where: filterQuery })
      : await ViewContactList.count();

    // Send response
    return res.send({
      status: true,
      message: "Contact list fetched successfully.",
      result: contacts,
      total,
    });
  },

  create: async (req, res) => {
    const data = req.body;
    const payload = ContactService.mapContactPayload(data);
    payload.createdBy = req.token.id;

    // Look up the user with this reset token.
    const contactByEmail = await Contact.findOne({ email: data.email });
    // If no such user exists, or their token is expired, bail.
    if (contactByEmail) {
      return res.send({
        status: false,
        message: `Contact email is already taken.`,
      });
    }

    Contact.create(payload).exec(async (err) => {
      if (err) {
        let message = "Form doesn't valid";
        if (err.code == "E_UNIQUE") {
          message = "Email is already exists";
        }
        return res.send({ status: false, message, err });
      }
      const contact = await Contact.findOne({ email: payload.email });
      return res.send({
        status: true,
        message: "Contact has been successfully created.",
        result: contact,
      });
    });
  },

  update: async (req, res) => {
    const data = req.body;
    const payload = ContactService.mapContactPayload(data);
    payload.updatedBy = req.token.id;

    // Look up the user with this reset token.
    const contact = await Contact.findOne({ id: data.id });

    // If no such user exists, or their token is expired, bail.
    if (!contact) {
      return res.send({
        status: false,
        message: `Contact doesn't exist or deleted.`,
      });
    }

    // Look up the user with this reset token.
    const contactByEmail = await Contact.findOne({
      id: { "!=": data.id },
      email: data.email,
    });
    // If no such user exists, or their token is expired, bail.
    if (contactByEmail) {
      return res.send({
        status: false,
        message: `Contact email is already taken.`,
      });
    }

    Contact.updateOne({ id: data.id })
      .set(payload)
      .exec(function (err, response) {
        if (err) {
          let message = "Form is not valid";
          if (err.code == "E_UNIQUE") {
            message = "Email is already exists";
          }
          return res.send({ status: false, message, err });
        }
        return res.send({
          status: true,
          message: "Contact has been updated successfully.",
          result: response,
        });
      });
  },

  findById: async (req, res) => {
    // Look up the user with this reset token.
    const contact = await Contact.findOne({ id: req.param("id") });

    // If no such user exists, or their token is expired, bail.
    if (!contact) {
      return res.send({
        status: false,
        message: `Contact doesn't exist or deleted.`,
      });
    }

    return res.send({
      status: true,
      message: "Contact has been fetched successfully.",
      result: contact,
    });
  },

  delete: async (req, res) => {
    Contact.destroyOne({ id: req.param("id") }).exec(function (err) {
      return res.send({
        status: true,
        message: "Contact has been deleted successfully.",
      });
    });
  },

  deleteRange: async (req, res) => {
    if (req.body && req.body.ids && req.body.ids.length) {
      const ids = req.body.ids;
      Contact.destroy(ids).exec(() => {
        return res.send({
          status: true,
          message: "Contact(s) have been deleted successfully.",
        });
      });
    }

    return res.send({
      status: true,
      message: "Contact(s) have been deleted successfully.",
    });
  },
};
