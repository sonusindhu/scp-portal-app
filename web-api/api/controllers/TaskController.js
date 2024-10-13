/**
 * TaskController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
  findById: async (req, res) => {
    // Look up the user with this reset token.
    let task = await Task.findOne({ id: req.param("id") });
    // If no such user exists, or their token is expired, bail.
    if (!task) {
      return res.send({
        status: false,
        message: `Task doesn't exist or deleted.`,
      });
    }

    return res.send({
      status: true,
      message: "Task has been fetched successfully.",
      result: task,
    });
  },

  delete: async (req, res) => {
    Task.destroyOne({ id: req.param("id") }).exec(function (err) {
      return res.send({
        status: true,
        message: "Task has been deleted successfully.",
      });
    });
  },

  deleteRange: async (req, res) => {
    if (req.body && req.body.ids && req.body.ids.length) {
      const ids = req.body.ids;
      Task.destroy(ids).exec(() => {
        return res.send({
          status: true,
          message: "Task(s) have been deleted successfully.",
        });
      });
    }

    return res.send({
      status: true,
      message: "Task(s) have been deleted successfully.",
    });
  },

  create: async (req, res) => {
    const payload = req.body;
    if(payload.type == 'quote'){
      const quote = await Quote.findOne({ id: payload.quoteId });
      payload.companyId = quote.company;
    }
    payload.createdBy = req.token.id;
    // const payload = {
    //   ...data,
    //   // subject: data.subject,
    //   // description: data.description,
    //   // priority: data.priority,
    //   // quoteId: data.quoteId,
    //   // assignedTo: data.assignedTo,
    //   // dueDateTime: data.dueDateTime,
    //   // reminderDateTime: data.reminderDateTime,
    //   // category: data.category,
    //   // status: data.status,
    //   createdBy: req.token.id,
    //   // pointOfContact: data.pointOfContact,
    //   // companyId: quote.company,
    //   // type: "quote",
    // };
    const task = await Task.create(payload).fetch();
    return res.send({
      status: true,
      message: "Task has been successfully created.",
      result: task,
    });
  },

  list: async (req, res) => {
    const payload = req.body;
    let tasks = await Task.find({ 
      ...payload 
    }).sort([
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
