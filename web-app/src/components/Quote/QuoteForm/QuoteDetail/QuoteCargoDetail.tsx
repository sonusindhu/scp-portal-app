import React, { useMemo } from "react";
import { SelectElement, TextFieldElement } from "react-hook-form-mui";
import PageHeading from "../../../../shared/components/PageHeading/PageHeading";
import { YES_NO_OPTIONS } from "../../../../utils/constants.util";

const QuoteCargoDetail = ({ resetField, equipments, commodities, cargos, watch }) => { 

  const isHazmat = watch("cargoDetail.isHazmat");

  useMemo(() => {
    if(isHazmat === "2"){
      resetField("cargoDetail.hazmatName");
      resetField("cargoDetail.hazmatClass");
      resetField("cargoDetail.hazmatUN");
    }
  }, [isHazmat]);


  return (
    <div className="container-fluid">
      <PageHeading title="Cargo Details" />
      <div>
        <SelectElement
          className="m-2 w-[15%]"
          required
          options={equipments}
          name={"cargoDetail.equipmentId"}
          label="Equipment"
          labelKey="name"
          valueKey="id"
        ></SelectElement>
        <SelectElement
          className="m-2 w-[15%]"
          required
          options={commodities}
          name={"cargoDetail.commodityId"}
          label="Commodity"
          labelKey="name"
          valueKey="id"
        ></SelectElement>

        <TextFieldElement
          className="m-2 w-[15%]"
          required
          name={"cargoDetail.weight"}
          label="Weight"
          variant="outlined"
          margin={"dense"}
        />
        <TextFieldElement
          className="m-2 w-[15%]"
          required
          name={"cargoDetail.cargoValue"}
          label="Cargo Value"
          variant="outlined"
          margin={"dense"}
        />
        <TextFieldElement
          className="m-2 w-[15%]"
          name={"cargoDetail.temperature"}
          label="Temperature"
          margin={"dense"}
          variant="outlined"
        />
        <TextFieldElement
          className="m-2 w-[15%]"
          name={"cargoDetail.pieces"}
          label="Pieces"
          margin={"dense"}
          variant="outlined"
        />

        <SelectElement
          className="m-2 w-[15%]"
          required
          options={cargos}
          name={"cargoDetail.cargoTypeId"}
          label="Cargo Type"
          labelKey="name"
          valueKey="id"
        ></SelectElement>

        <SelectElement
          className="m-2 w-[15%]"
          options={YES_NO_OPTIONS}
          name={"cargoDetail.isHazmat"}
          label="Hazmat"
          labelKey="value"
          valueKey="id"
        ></SelectElement>


        <TextFieldElement
          className="m-2 w-[15%]"
          required={isHazmat === "1"}
          name={"cargoDetail.hazmatName"}
          label="Hazmat Name"
          variant="outlined"
          rules={{ maxLength: 20 }}
        />
        <TextFieldElement
          className="m-2 w-[15%]"
          required={isHazmat === "1"}
          name={"cargoDetail.hazmatClass"}
          label="Hazmat Class"
          variant="outlined"
          rules={{ maxLength: 20 }}
        />
        <TextFieldElement
          className="m-2 w-[15%]"
          required={isHazmat === "1"}
          name={"cargoDetail.hazmatUN"}
          label="Hazmat UN"
          variant="outlined"
          rules={{ maxLength: 20 }}
        />
      </div>

    </div>
  );
};

export default QuoteCargoDetail;