// Inventory Service

module.exports = {
  mapInventoryPayload: (company) => {
    return {
      trackingNumber: company.trackingNumber,
      company: company.companyId,
      type: company.type,
      deviceType: company.deviceType,
      status: company.status,
      length: company.length,
      width: company.width,
      height: company.height,
      lwhType: company.lwhType,
      weight: company.weight,
      weightType: company.weightType,
      location: company.location,
      notes: company.notes,
    };
  },
};
