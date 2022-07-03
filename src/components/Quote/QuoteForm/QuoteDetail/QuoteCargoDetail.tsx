import React, { useMemo } from "react";
import { SelectElement, TextFieldElement } from "react-hook-form-mui";

const QuoteCargoDetail = ({ control, resetField, equipments, commodities, cargos, watch }) => { 

  console.log(equipments)

  const hazmatOptions = [{id: 1, name: 'Yes'}, {id: 2, name: 'No'}];
  const isHazmat = watch("cargoDetail.isHazmat");

  useMemo(() => {
    if(isHazmat === 2){
      resetField("cargoDetail.hazmatName");
      resetField("cargoDetail.hazmatClass");
      resetField("cargoDetail.hazmatUN");
    }
  }, [isHazmat]);


  return (
    <div className="container-fluid">  
      <h3>Cargo Details</h3>
      <div>
        <SelectElement
          sx={{ m: 1, width: "20ch" }}
          required
          options={equipments}
          name={"cargoDetail.equipmentId"}
          label="Equipment"
          labelKey="name"
          valueKey="id"
        ></SelectElement>
        <SelectElement
          sx={{ m: 1, width: "20ch" }}
          required
          options={commodities}
          name={"cargoDetail.commodityId"}
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
          name={"cargoDetail.cargoTypeId"}
          label="Cargo Type"
          labelKey="name"
          valueKey="id"
        ></SelectElement>

        <SelectElement
          sx={{ m: 1, width: "20ch" }}
          options={hazmatOptions}
          name={"cargoDetail.isHazmat"}
          label="Hazmat"
          labelKey="name"
          valueKey="id"
        ></SelectElement>


        <TextFieldElement
          sx={{ m: 1 }}
          required={isHazmat == 1}
          name={"cargoDetail.hazmatName"}
          label="Hazmat Name"
          variant="outlined"
          validation={{ maxLength: 20 }}
        />
        <TextFieldElement
          sx={{ m: 1 }}
          required={isHazmat == 1}
          name={"cargoDetail.hazmatClass"}
          label="Hazmat Class"
          variant="outlined"
          validation={{ maxLength: 20 }}
        />
        <TextFieldElement
          sx={{ m: 1 }}
          required={isHazmat == 1}
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
