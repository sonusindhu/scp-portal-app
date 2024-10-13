/**
 * CargoDetail.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: "cargo_details",
  attributes: {
    equipmentId: {
      model: "equipment",
    },
    commodityId: {
      model: "commodity",
    },
    weight: {
      type: "number",
    },
    cargoValue: {
      type: "number",
    },
    temperature: {
      type: "number",
    },
    pieces: {
      type: "number",
    },
    isHazmat: {
      type: "boolean",
      allowNull: true,
      defaultsTo: false,
    },
    hazmatName: {
      type: "string",
      allowNull: true,
    },
    hazmatClass: {
      type: "string",
      allowNull: true,
    },
    hazmatUN: {
      type: "string",
      allowNull: true,
    },
    status: {
      type: "string",
      maxLength: 10,
      allowNull: true,
    },
    comments: {
      type: "string",
      maxLength: 250,
      allowNull: true,
    },
    cargoTypeId: {
      model: "cargoType",
    },
    quoteId: {
      model: "quote",
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
