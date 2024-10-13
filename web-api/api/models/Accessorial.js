/**
 * Accessorial.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: "accessorials",
  attributes: {
    name: {
      type: "string",
      maxLength: 30,
    },
    quantity: {
      type: "number",
    },
    rate: {
      type: "number",
    },
    totalRate: {
      type: "number",
    },
    isIncludeInCharges: {
      type: "boolean",
      defaultsTo: false,
      allowNull: true,
    },
    description: {
      type: "string",
      maxLength: 250,
    },
    quoteId: {
      model: "quote",
    },
  },
};
