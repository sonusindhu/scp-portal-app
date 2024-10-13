// Company Service

module.exports = {
  mapContactPayload: (contact) => {
    return {
      firstName: contact.firstName,
      lastName: contact.lastName,
      fullName: `${contact.firstName} ${contact.lastName}`,
      email: contact.email,
      companyId: contact.companyId,
      status: contact.status,
      department: contact.department,
      jobTitle: contact.jobTitle,
      phone: contact.phone,
      extension: contact.extension,
      address1: contact.address1,
      address2: contact.address2,
      city: contact.city,
      state: contact.state,
      zipcode: contact.zipcode,
      country: contact.country,
      birthDate: contact.birthDate,
    };
  },
};
