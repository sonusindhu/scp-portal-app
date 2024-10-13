/**
 * CommonController
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

  getEquipments: async (req, res) => {
    let equipments = await Equipment.find().select(["id", "name"]);
    return res.send({
      status: true,
      message: `Equipments fetched successfully.`,
      result: equipments,
    });
  },

  getCargos: async (req, res) => {
    let cargos = await CargoType.find().select(["id", "name"]);
    return res.send({
      status: true,
      message: `Cargos fetched successfully.`,
      result: cargos,
    });
  },

  getCommodities: async (req, res) => {
    let commodities = await Commodity.find().select(["id", "name"]);
    return res.send({
      status: true,
      message: `Commodities fetched successfully.`,
      result: commodities,
    });
  },
};
