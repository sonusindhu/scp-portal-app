/**
 * Quote.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: "quotes",
  attributes: {
    quoteNumber: {
      type: "string",
      maxLength: 50,
    },
    name: {
      type: "string",
      maxLength: 50,
    },
    service: {
      type: "string",
      maxLength: 50,
    },
    transportMode: {
      type: "string",
      maxLength: 50,
    },
    status: {
      type: "string",
      maxLength: 10,
      allowNull: true,
    },
    totalCost: {
      type: "number",
      allowNull: true,
    },
    totalProfit: {
      type: "number",
      allowNull: true,
    },
    expiryDate: {
      type: "ref",
      columnType: "timestamp",
    },
    totalMiles: {
      type: "number",
      allowNull: true,
    },
    stops: {
      collection: "stop",
      via: "quoteId",
    },
    accessorials: {
      collection: "accessorial",
      via: "quoteId",
    },
    // relation
    company: {
      model: "company",
    },
    contact: {
      model: "contact",
    },
    createdBy: {
      model: "user",
    },
    updatedBy: {
      model: "user",
    },
    isDeleted: {
      type: "boolean",
      allowNull: true,
      defaultsTo: false,
    },
  },
};
