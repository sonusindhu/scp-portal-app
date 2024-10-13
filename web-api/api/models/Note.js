/**
 * Stop.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: "notes",
  attributes: {
    type: {
      type: "string",
      maxLength: 10,
    },
    title: {
      type: "string",
      maxLength: 100,
    },
    message: {
      type: "string",
      maxLength: 5000,
      columnType: "longtext",
    },
    isCritical: {
      type: "boolean",
      defaultsTo: false,
      allowNull: true,
    },
    quoteId: {
      model: "quote",
    },
    contactId: {
      model: "contact",
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
