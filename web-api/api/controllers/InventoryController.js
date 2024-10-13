/**
 * InventoryController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const InventoryService = require("../services/InventoryService");
const GridService = require("../services/GridService");

module.exports = {
  listView: async (req, res) => {
    const payload = req.body;
    const sortMap = payload.sort.join(",");
    const sort = sortMap || `createdAt desc`;
    const filterQuery = GridService.mapListFilterSql(payload.filter);
    const query = `SELECT * FROM view_inventory_list ${filterQuery} ORDER BY ${sort} LIMIT ${payload.skip}, ${payload.take}`;
    const data = await sails.sendNativeQuery(query).intercept((err) => {
      return res.send({
        status: false,
        message: err?.raw?.error?.sqlMessage || err.code,
      });
    });
    // let inventories = await Inventory.find({
    //   ...filterQuery,
    //   isDeleted: false,
    // })
    //   .populate("company")
    //   .populate("createdBy")
    //   .populate("updatedBy")
    //   .sort(sort)
    //   .skip(payload.skip)
    //   .limit(payload.take);
    // if (inventories && inventories.length) {
    // inventories = inventories.map((inventory) => {
    //   return {
    //     ...inventory,
    //     companyId: inventory.company?.id || null,
    //     company: inventory.company?.name || "",
    //     createdBy: inventory.createdBy?.fullName || "",
    //     updatedBy: inventory.updatedBy?.fullName || "",
    //     updatedAt: inventory.updatedBy?.id ? inventory.updatedAt : null,
    //   };
    // });
    // }

    // const total = await Inventory.count();
    return res.send({
      status: true,
      message: `Inventory list fetched successfully.`,
      result: data?.rows || [],
      total: data?.rows?.length,
    });
  },

  create: async (req, res) => {
    const data = req.body;
    const payload = InventoryService.mapInventoryPayload(data);
    payload.createdBy = req.token.id;

    const inventoryByEmail = await Inventory.findOne({
      trackingNumber: payload.trackingNumber,
    });
    if (inventoryByEmail) {
      return res.send({
        status: false,
        message: `Inventory tracking number is already taken.`,
      });
    }

    const lastInventory = await Inventory.find()
      .sort([{ id: "desc" }])
      .limit(1)
      .select(["id"]);

    let oldId = 1;
    if (lastInventory && lastInventory.length > 0) {
      oldId = lastInventory[0].id + 1;
    }

    const dt = new Date();
    const uniqueId =
      dt.getFullYear() + "" + (dt.getMonth() + 1) + "" + dt.getDate();

    payload.packageId = `PID${uniqueId}${oldId}`;

    Inventory.create(payload).exec(async (err) => {
      if (err) {
        let message = "Form doesn't valid";
        if (err.code == "E_UNIQUE") {
          message = "Email is already exists";
        }
        return res.send({ status: false, message, err });
      }

      const inventory = await Inventory.findOne({
        trackingNumber: payload.trackingNumber,
      });
      return res.send({
        status: true,
        message: "Inventory has been successfully created.",
        result: inventory,
      });
    });
  },

  update: async (req, res) => {
    const data = req.body;
    const payload = InventoryService.mapInventoryPayload(data);
    payload.updatedBy = req.token.id;

    const inventory = await Inventory.findOne({ id: data.id });
    if (!inventory) {
      return res.send({
        status: false,
        message: `Inventory doesn't exist or deleted.`,
      });
    }

    // Look up the user with this reset token.
    const inventoryByName = await Inventory.findOne({
      id: { "!=": data.id },
      trackingNumber: payload.trackingNumber,
    });
    // If no such user exists, or their token is expired, bail.
    if (inventoryByName) {
      return res.send({
        status: false,
        message: `Inventory tracking number is already taken.`,
      });
    }

    Inventory.updateOne({ id: data.id })
      .set(payload)
      .exec(function (err, response) {
        if (err) {
          let message = "Form is not valid";
          if (err.code == "E_UNIQUE") {
            message = "Email is already exists";
          }
          return res.send({ status: false, message, err });
        }
        return res.send({
          status: true,
          message: "Inventory has been updated successfully.",
          result: response,
        });
      });
  },

  findById: async (req, res) => {
    // Look up the user with this reset token.
    const inventory = await Inventory.findOne({ id: req.param("id") });

    // If no such user exists, or their token is expired, bail.
    if (!inventory) {
      return res.send({
        status: false,
        message: `Inventory doesn't exist or deleted.`,
      });
    }

    return res.send({
      status: true,
      message: "Inventory has been fetched successfully.",
      result: inventory,
    });
  },

  delete: async (req, res) => {
    Inventory.findOne({ id: req.param("id") }).exec(function (err) {
      return res.send({
        status: true,
        message: "Inventory has been deleted successfully.",
      });
    });
  },

  deleteRange: async (req, res) => {
    if (req.body && req.body.ids && req.body.ids.length) {
      const ids = req.body.ids;
      Inventory.find(ids).exec(() => {
        return res.send({
          status: true,
          message: "Inventory(ies) have been deleted successfully.",
        });
      });
    }

    return res.send({
      status: true,
      message: "Inventory(ies) have been deleted successfully.",
    });
  },
};
