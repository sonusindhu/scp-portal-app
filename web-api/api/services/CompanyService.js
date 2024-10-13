// Company Service

module.exports = {
  mapCompanyPayload: (company) => {
    return {
      name: company.name,
      email: company.email,
      type: company.type,
      status: company.status,
      phone: company.phone,
      extension: company.extension,
      address1: company.address1,
      address2: company.address2,
      city: company.city,
      state: company.state,
      zipcode: company.zipcode,
      country: company.country,
      employeesCount: company.employeesCount,
      revenue: company.revenue,
    };
  },
};
