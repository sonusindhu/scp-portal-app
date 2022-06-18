import React from "react";
import { SelectElement, TextFieldElement } from "react-hook-form-mui";
import { useFieldArray } from "react-hook-form";

const QuoteCargoDetail = ({ control }) => { 

  return (
    <div className="container-fluid">  
      <h3>Cargo Details</h3>
      <div>

        <SelectElement
          sx={{ m: 1, width: "20ch" }}
          required
          options={[]}
          name={"equipmentId"}
          label="Equipment"
        ></SelectElement>
        <SelectElement
          sx={{ m: 1, width: "20ch" }}
          required
          options={[]}
          name={"commodityId"}
          label="Commodity"
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
          options={[]}
          name={"cargoTypeId"}
          label="Cargo Type"
        ></SelectElement>

        <SelectElement
          sx={{ m: 1, width: "20ch" }}
          required
          options={[]}
          name={"cargoDetail.isHazmat"}
          label="Hazmat"
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
