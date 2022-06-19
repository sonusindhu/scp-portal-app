import React from "react";
import { SelectElement, TextFieldElement } from "react-hook-form-mui";

const QuoteCargoDetail = ({ control, equipments, commodities, cargos }) => { 

  console.log(equipments)

  const hazmatOptions = [{id: 1, name: 'Yes'}, {id: 2, name: 'No'}];

  return (
    <div className="container-fluid">  
      <h3>Cargo Details</h3>
      <div>
        <SelectElement
          sx={{ m: 1, width: "20ch" }}
          required
          options={equipments}
          name={"equipmentId"}
          label="Equipment"
          labelKey="name"
          valueKey="id"
        ></SelectElement>
        <SelectElement
          sx={{ m: 1, width: "20ch" }}
          required
          options={commodities}
          name={"commodityId"}
          label="Commodity"
          labelKey="name"
          valueKey="id"
        ></SelectElement>

        <TextFieldElement
          sx={{ m: 1, }}
          required
          name={"cargoDetail.weight"}
          label="Weight"
          variant="outlined"
          margin={"dense"}
        />
        <TextFieldElement
          sx={{ m: 1, }}
          required
          name={"cargoDetail.cargoValue"}
          label="Cargo Value"
          variant="outlined"
          margin={"dense"}
        />
        <TextFieldElement
          sx={{ m: 1, }}
          name={"cargoDetail.temperature"}
          label="Temperature"
          margin={"dense"}
          variant="outlined"
        />
        <TextFieldElement
          sx={{ m: 1, }}
          name={"cargoDetail.pieces"}
          label="Pieces"
          margin={"dense"}
          variant="outlined"
        />

        <SelectElement
          sx={{ m: 1, width: "20ch" }}
          required
          options={cargos}
          name={"cargoTypeId"}
          label="Cargo Type"
          labelKey="name"
          valueKey="id"
        ></SelectElement>

        <SelectElement
          sx={{ m: 1, width: "20ch" }}
          required
          options={hazmatOptions}
          name={"cargoDetail.isHazmat"}
          label="Hazmat"
          labelKey="name"
          valueKey="id"
        ></SelectElement>


        <TextFieldElement
          sx={{ m: 1 }}
          required
          name={"cargoDetail.hazmatName"}
          label="Hazmat Name"
          variant="outlined"
          validation={{ maxLength: 20 }}
        />
        <TextFieldElement
          sx={{ m: 1 }}
          required
          name={"cargoDetail.hazmatClass"}
          label="Hazmat Class"
          variant="outlined"
          validation={{ maxLength: 20 }}
        />
        <TextFieldElement
          sx={{ m: 1 }}
          required
          name={"cargoDetail.hazmatUN"}
          label="Hazmat UN"
          variant="outlined"
          validation={{ maxLength: 20 }}
        />
      </div>

    </div>
  );
};

export default QuoteCargoDetail;
