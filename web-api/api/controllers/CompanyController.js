/**
 * CompanyController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const CompanyService = require("../services/CompanyService");
const GridService = require("../services/GridService");

module.exports = {
  listOfNames: async (req, res) => {
    let companies = await Company.find().select(["id", "name"]);
    return res.send({
      status: true,
      message: `Company list fetched successfully.`,
      result: companies,
    });
  },

  listView: async (req, res) => {
    const payload = req.body;

    // const sort = payload.sort.length > 0 ? payload.sort : [{ id: "asc" }];
    // const filter = payload.filter;
    // let filterQuery;
    // if (filter?.filters?.length) {
    //   filterQuery = GridService.createQueryFromFilter(
    //     filter.filters,
    //     filter.logic
    //   );
    // }

    // let companies;
    // if (filterQuery) {
    //   companies = await Company.find({
    //     where: filterQuery,
    //   })
    //     .sort(sort)
    //     .limit(payload.take)
    //     .skip(payload.skip)
    //     .populate("createdBy")
    //     .populate("updatedBy");
    // } else {
    //   companies = await Company.find()
    //     .sort(sort)
    //     .limit(payload.take)
    //     .skip(payload.skip)
    //     .populate("createdBy")
    //     .populate("updatedBy");
    // }

    // if (companies && companies.length) {
    //   companies = companies.map((company) => {
    //     return {
    //       ...company,
    //       createdBy: company.createdBy?.fullName || "",
    //       updatedBy: company.updatedBy?.fullName || "",
    //       updatedAt: company.updatedBy?.id ? company.updatedAt : null,
    //     };
    //   });
    // }
    // const total = await Company.count();

    // return res.send({
    //   status: true,
    //   message: `Company list fetched successfully.`,
    //   result: companies,
    //   total,
    // });

    const sortMap = payload.sort.join(",");
    const sort = sortMap || `createdAt desc`;
    const filterQuery = GridService.mapListFilterSql(payload.filter);
    const query = `SELECT * FROM view_company_list ${filterQuery} ORDER BY ${sort} LIMIT ${payload.skip}, ${payload.take}`;
    const data = await sails.sendNativeQuery(query).intercept((err) => {
      return res.send({
        status: false,
        message: err?.raw?.error?.sqlMessage || err.code,
      });
    });
    return res.send({
      status: true,
      message: `Company list fetched successfully.`,
      result: data?.rows || [],
      total: data?.rows?.length,
    });
  },

  create: async (req, res) => {
    const data = req.body;
    const payload = CompanyService.mapCompanyPayload(data);
    payload.createdBy = req.token.id;

    // Look up the user with this reset token.
    const companyByName = await Company.findOne({ name: data.name });
    // If no such user exists, or their token is expired, bail.
    if (companyByName) {
      return res.send({
        status: false,
        message: `Company name is already taken.`,
      });
    }

    // Look up the user with this reset token.
    const companyByEmail = await Company.findOne({ email: data.email });
    // If no such user exists, or their token is expired, bail.
    if (companyByEmail) {
      return res.send({
        status: false,
        message: `Company email is already taken.`,
      });
    }

    Company.create(payload).exec(async (err) => {
      if (err) {
        let message = "Form doesn't valid";
        if (err.code == "E_UNIQUE") {
          message = "Email is already exists";
        }
        return res.send({ status: false, message, err });
      }

      const company = await Company.findOne({ email: payload.email });
      return res.send({
        status: true,
        message: "Company has been successfully created.",
        result: company,
      });
    });
  },

  update: async (req, res) => {
    const data = req.body;
    const payload = CompanyService.mapCompanyPayload(data);
    payload.updatedBy = req.token.id;

    // Look up the user with this reset token.
    const company = await Company.findOne({ id: data.id });

    // If no such user exists, or their token is expired, bail.
    if (!company) {
      return res.send({
        status: false,
        message: `Company doesn't exist or deleted.`,
      });
    }

    // Look up the user with this reset token.
    const companyByName = await Company.findOne({
      id: { "!=": data.id },
      name: data.name,
    });
    // If no such user exists, or their token is expired, bail.
    if (companyByName) {
      return res.send({
        status: false,
        message: `Company name is already taken.`,
      });
    }

    // Look up the user with this reset token.
    const companyByEmail = await Company.findOne({
      id: { "!=": data.id },
      email: data.email,
    });
    // If no such user exists, or their token is expired, bail.
    if (companyByEmail) {
      return res.send({
        status: false,
        message: `Company email is already taken.`,
      });
    }

    Company.updateOne({ id: data.id })
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
          message: "Company has been updated successfully.",
          result: response,
        });
      });
  },

  findById: async (req, res) => {
    // Look up the user with this reset token.
    const company = await Company.findOne({ id: req.param("id") });

    // If no such user exists, or their token is expired, bail.
    if (!company) {
      return res.send({
        status: false,
        message: `Company doesn't exist or deleted.`,
      });
    }

    return res.send({
      status: true,
      message: "Company has been fetched successfully.",
      result: company,
    });
  },

  delete: async (req, res) => {
    Company.destroyOne({ id: req.param("id") }).exec(function (err) {
      return res.send({
        status: true,
        message: "Company has been deleted successfully.",
      });
    });
  },

  deleteRange: async (req, res) => {
    if (req.body && req.body.ids && req.body.ids.length) {
      const ids = req.body.ids;
      Company.destroy(ids).exec(() => {
        return res.send({
          status: true,
          message: "Company(ies) have been deleted successfully.",
        });
      });
    }

    return res.send({
      status: true,
      message: "Company(ies) have been deleted successfully.",
    });
  },
};
