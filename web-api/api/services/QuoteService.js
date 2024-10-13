// Quote Service

module.exports = {
  mapPayload: (quote) => {
    return {
      id: quote.id,
      name: quote.name,
      service: quote.service,
      transportMode: quote.transportMode,
      expiryDate: quote.expiryDate,
      company: quote.companyId,
      contact: quote.contactId,
    };
  },
  mapCargoPayload: (cargo, quoteId) => {
    return {
      id: cargo.id,
      equipmentId: cargo.equipmentId,
      commodityId: cargo.commodityId,
      weight: cargo.weight,
      cargoValue: cargo.cargoValue,
      temperature: cargo.temperature,
      pieces: cargo.pieces,
      isHazmat: cargo.isHazmat,
      hazmatName: cargo.hazmatName,
      hazmatClass: cargo.hazmatClass,
      hazmatUN: cargo.hazmatUN,
      status: cargo.status,
      comments: cargo.comments,
      cargoTypeId: cargo.cargoTypeId,
      quoteId,
    };
  },
  mapStopPayload: (stop, quoteId) => {
    return {
      id: stop.id,
      type: stop.type,
      city: stop.city,
      zipcode: stop.zipcode,
      state: stop.state,
      country: stop.country,
      miles: stop.miles,
      quoteId,
    };
  },
  mapAccPayload: (accessorial, quoteId) => {
    return {
      id: accessorial.id,
      name: accessorial.name,
      quantity: accessorial.quantity,
      rate: accessorial.rate,
      totalRate: accessorial.rate * accessorial.quantity,
      isIncludeInCharges: accessorial.isIncludeInCharges,
      description: accessorial.description,
      quoteId,
    };
  },
};
