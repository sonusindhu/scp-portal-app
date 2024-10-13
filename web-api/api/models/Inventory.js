/**
 * Company.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

const AuthService = require("../services/AuthService");

module.exports = {
  tableName: "inventories",
  attributes: {
    packageId: {
      type: "string",
      maxLength: 50,
    },
    trackingNumber: {
      type: "string",
      required: true,
      maxLength: 50,
    },
    company: {
      model: "company",
    },
    type: {
      type: "string",
      maxLength: 50,
    },
    deviceType: {
      type: "string",
      maxLength: 15,
    },
    status: {
      type: "string",
      maxLength: 10,
      allowNull: true,
    },
    length: {
      type: "number",
      allowNull: true,
    },
    width: {
      type: "number",
      allowNull: true,
    },
    height: {
      type: "number",
      allowNull: true,
    },
    lwhType: {
      type: "string",
      defaultsTo: "in",
      maxLength: 10,
    },
    weight: {
      type: "number",
      allowNull: true,
    },
    weightType: {
      type: "string",
      defaultsTo: "lb",
      maxLength: 10,
    },
    location: {
      type: "string",
      maxLength: 254,
    },
    notes: {
      type: "string",
      maxLength: 254,
    },
    createdBy: {
      model: "user",
    },
    updatedBy: {
      model: "user",
    },
    isDeleted: {
      type: "boolean",
      defaultsTo: false,
      allowNull: true,
    },
  },
};
