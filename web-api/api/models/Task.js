/**
 * Stop.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: "tasks",
  attributes: {
    type: {
      type: "string",
      maxLength: 10,
    },
    subject: {
      type: "string",
      maxLength: 100,
    },
    description: {
      type: "string",
      maxLength: 5000,
      columnType: "text",
    },
    priority: {
      type: "string",
    },
    dueDateTime: {
      type: "ref",
      columnType: "timestamp",
    },
    reminderDateTime: {
      type: "ref",
      columnType: "timestamp",
    },
    category: {
      type: "string",
    },
    status: {
      type: "string",
    },
    assignedTo: {
      model: "user",
    },
    pointOfContact: {
      model: "contact",
    },
    quoteId: {
      model: "quote",
    },
    companyId: {
      model: "company",
    },
    inventoryId: {
      model: "inventory",
    },
    userId: {
      model: "user",
    },
  },
};
