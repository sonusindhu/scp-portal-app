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
      columnType: "longtext",
    },
    priority: {
      type: "string",
    },
    dueDateTime: {
      type: "ref",
      columnType: "datetime",
    },
    reminderDateTime: {
      type: "ref",
      columnType: "datetime",
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
