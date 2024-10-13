/**
 * QuoteController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const QuoteService = require("../services/QuoteService");
const GridService = require("../services/GridService");

module.exports = {
  getCompanies: async (req, res) => {
    let companies = await Company.find().select(["id", "name"]);
    return res.send({
      status: true,
      message: `Companies fetched successfully.`,
      result: companies,
    });
  },

  getContactsByCompany: async (req, res) => {
    let contacts = await Contact.find({ companyId: req.param("id") }).select([
      "id",
      "fullName",
    ]);
    return res.send({
      status: true,
      message: `Contacts fetched successfully.`,
      result: contacts,
    });
  },

  listView: async (req, res) => {
    const payload = req.body;
    const sortMap = payload.sort.join(",");
    const sort = sortMap || `createdAt desc`;
    const filterQuery = GridService.mapListFilterSql(payload.filter);
    const query = `SELECT * FROM view_quote_list ${filterQuery} ORDER BY ${sort} LIMIT ${payload.skip}, ${payload.take}`;
    const data = await sails.sendNativeQuery(query).intercept((err) => {
      return res.send({
        status: false,
        message: err?.raw?.error?.sqlMessage || err.code,
      });
    });
    return res.send({
      status: true,
      message: `Quote list fetched successfully.`,
      result: data?.rows || [],
      total: data?.rows?.length,
    });
  },

  create: async (req, res) => {
    const data = req.body;
    const payload = QuoteService.mapPayload(data);
    payload.createdBy = req.token.id;

    const lastQuote = await Quote.find({ isDeleted: false })
      .sort([{ id: "desc" }])
      .limit(1)
      .select(["id"]);

    let oldId = 1;
    if (lastQuote && lastQuote.length > 0) {
      oldId = lastQuote[0].id + 1;
    }
    const dt = new Date();
    const uniqueId =
      dt.getFullYear() + "" + (dt.getMonth() + 1) + "" + dt.getDate();

    payload.quoteNumber = `Q${uniqueId}${oldId}`;

    let quote = await Quote.create(payload).fetch();
    const accessorials = await Accessorial.create({
      quoteId: quote.id,
    }).fetch();
    const origin = await Stop.create({
      quoteId: quote.id,
      type: "Shipper",
    }).fetch();
    const desination = await Stop.create({
      quoteId: quote.id,
      type: "Consignee",
    }).fetch();
    const cargoDetail = await CargoDetail.create({ quoteId: quote.id }).fetch();
    return res.send({
      status: true,
      message: "Quote has been successfully created.",
      result: {
        ...quote,
        accessorials: [accessorials],
        stops: [origin, desination],
        cargoDetail,
      },
    });
  },

  update: async (req, res) => {
    const data = req.body;
    const payload = QuoteService.mapPayload(data);
    payload.updatedBy = req.token.id;

    // Look up the user with this reset token.
    const quote = await Quote.findOne({ id: data.id });

    // If no such user exists, or their token is expired, bail.
    if (!quote) {
      return res.send({
        status: false,
        message: `Quote doesn't exist or deleted.`,
      });
    }

    const cargoPayload = QuoteService.mapCargoPayload(
      data.cargoDetail,
      data.id
    );
    await CargoDetail.updateOne({ id: data.id }).set(cargoPayload);

    if (data.stops?.length > 0) {
      for (let stop of data.stops) {
        const stopPayload = QuoteService.mapStopPayload(stop, data.id);
        if (stop.id) {
          await Stop.updateOne({ id: stop.id }).set(stopPayload);
        }
      }
    }

    if (data.accessorials?.length > 0) {
      for (let accessorial of data.accessorials) {
        const accPayload = QuoteService.mapAccPayload(accessorial, data.id);
        if (accessorial.id) {
          await Accessorial.updateOne({ id: stop.id }).set(accPayload);
        } else {
          await Accessorial.create(accPayload);
        }
      }
    }

    return res.send({
      status: true,
      message: "Quote has been updated successfully.",
      result: response,
    });

    // Quote.updateOne({ id: data.id })
    //   .set(payload)
    //   .exec(function (err, response) {
    //     if (err) {
    //       let message = "Form is not valid";
    //       return res.send({ status: false, message, err });
    //     }
    //     return res.send({
    //       status: true,
    //       message: "Quote has been updated successfully.",
    //       result: response,
    //     });
    //   });
  },

  getQuoteDetails: async (req, res) => {
    // Look up the user with this reset token.
    const quote = await Quote.findOne({ id: req.param("id") });

    // If no such user exists, or their token is expired, bail.
    if (!quote) {
      return res.send({
        status: false,
        message: `Quote doesn't exist or deleted.`,
      });
    }

    return res.send({
      status: true,
      message: "Quote has been fetched successfully.",
      result: quote,
    });
  },

  findById: async (req, res) => {
    // Look up the user with this reset token.
    let quote = await Quote.findOne({ id: req.param("id") })
      .populate("stops")
      .populate("accessorials");

    // If no such user exists, or their token is expired, bail.
    if (!quote) {
      return res.send({
        status: false,
        message: `Quote doesn't exist or deleted.`,
      });
    }

    const cargoDetail = await CargoDetail.findOne({ quoteId: req.param("id") });
    quote.cargoDetail = cargoDetail || {};

    return res.send({
      status: true,
      message: "Quote has been fetched successfully.",
      result: quote,
    });
  },

  delete: async (req, res) => {
    Quote.destroyOne({ id: req.param("id") }).exec(function (err) {
      return res.send({
        status: true,
        message: "Quote has been deleted successfully.",
      });
    });
  },

  deleteRange: async (req, res) => {
    if (req.body && req.body.ids && req.body.ids.length) {
      const ids = req.body.ids;
      Quote.destroy(ids).exec(() => {
        return res.send({
          status: true,
          message: "Quote(s) have been deleted successfully.",
        });
      });
    }

    return res.send({
      status: true,
      message: "Quote(s) have been deleted successfully.",
    });
  },

  createNote: async (req, res) => {
    const data = req.body;
    let quote = await Quote.findOne({ id: data.quoteId });

    const payload = {
      title: data.title,
      message: data.message,
      isCritical: data.isCritical,
      quoteId: data.quoteId,
      createdBy: req.token.id,
      companyId: quote.company,
      contactId: quote.contact,
      type: "quote",
    };

    const note = await Note.create(payload).fetch();
    return res.send({
      status: true,
      message: "Note has been successfully created.",
      result: note,
    });
  },

  notes: async (req, res) => {
    let notes = await Note.find({ quoteId: req.param("id") }).sort([
      {
        id: "desc",
      },
    ]);
    return res.send({
      status: true,
      message: "Notes has been fetched successfully.",
      result: notes,
    });
  },

  deleteNotes: async (req, res) => {
    if (req.body && req.body.ids && req.body.ids.length) {
      const ids = req.body.ids;
      const payload = {
        id: { in: ids },
        quoteId: req.body.quoteId,
        userId: req.token.id,
      };
      const notes = await Note.destroy(payload).fetch();

      return res.send({
        status: true,
        message: "Note(s) have been deleted successfully.",
        result: notes,
      });
    }

    return res.send({
      status: false,
      message: "Errors while deleting the note(s).",
    });
  },

  createTask: async (req, res) => {
    const data = req.body;
    const quote = await Quote.findOne({ id: data.quoteId });
    const payload = {
      subject: data.subject,
      description: data.description,
      priority: data.priority,
      quoteId: data.quoteId,
      assignedTo: data.assignedTo,
      dueDateTime: data.dueDateTime,
      reminderDateTime: data.reminderDateTime,
      category: data.category,
      status: data.status,
      createdBy: req.token.id,
      pointOfContact: data.pointOfContact,
      companyId: quote.company,
      type: "quote",
    };
    const task = await Task.create(payload).fetch();
    return res.send({
      status: true,
      message: "Task has been successfully created.",
      result: task,
    });
  },

  tasks: async (req, res) => {
    let tasks = await Task.find({ quoteId: req.param("id") }).sort([
      {
        id: "desc",
      },
    ]);
    return res.send({
      status: true,
      message: "Tasks has been fetched successfully.",
      result: tasks,
    });
  },
};
