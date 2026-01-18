import React, { useMemo } from "react";
import { SelectElement, TextFieldElement } from "@/shared/components/FormFields";
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
      <div className="grid grid-cols-4 gap-4">
        <SelectElement
          className="m-2 w-full"
          options={equipments}
          name={"cargoDetail.equipmentId"}
          label="Equipment"
          labelKey="name"
          valueKey="id"
          rules={{ required: "Equipment is required" }}
        ></SelectElement>
        <SelectElement
          className="m-2 w-full"
          options={commodities}
          name={"cargoDetail.commodityId"}
          label="Commodity"
          labelKey="name"
          valueKey="id"
          rules={{ required: "Commodity is required" }}
        ></SelectElement>

        <TextFieldElement
          className="m-2 w-full"
          name={"cargoDetail.weight"}
          label="Weight"
          rules={{ required: "Weight is required" }}
        />
        <TextFieldElement
          className="m-2 w-full"
          name={"cargoDetail.cargoValue"}
          label="Cargo Value"
          rules={{ required: "Cargo Value is required" }}
        />
        <TextFieldElement
          className="m-2 w-full"
          name={"cargoDetail.temperature"}
          label="Temperature"
        />
        <TextFieldElement
          className="m-2 w-full"
          name={"cargoDetail.pieces"}
          label="Pieces"
        />

        <SelectElement
          className="m-2 w-full"
          options={cargos}
          name={"cargoDetail.cargoTypeId"}
          label="Cargo Type"
          labelKey="name"
          valueKey="id"
          rules={{ required: "Cargo Type is required" }}
        ></SelectElement>

        <SelectElement
          className="m-2 w-full"
          options={YES_NO_OPTIONS}
          name={"cargoDetail.isHazmat"}
          label="Hazmat"
          labelKey="value"
          valueKey="id"
        ></SelectElement>


        <TextFieldElement
          className="m-2 w-full"
          name={"cargoDetail.hazmatName"}
          label="Hazmat Name"
          rules={{ 
            maxLength: 20,
            required: isHazmat === "1" ? "Hazmat Name is required" : false 
          }}
        />
        <TextFieldElement
          className="m-2 w-full"
          name={"cargoDetail.hazmatClass"}
          label="Hazmat Class"
          rules={{ 
            maxLength: 20,
            required: isHazmat === "1" ? "Hazmat Class is required" : false 
          }}
        />
        <TextFieldElement
          className="m-2 w-full"
          name={"cargoDetail.hazmatUN"}
          label="Hazmat UN"
          rules={{ 
            maxLength: 20,
            required: isHazmat === "1" ? "Hazmat UN is required" : false 
          }}
        />
      </div>

    </div>
  );
};

export default QuoteCargoDetail;