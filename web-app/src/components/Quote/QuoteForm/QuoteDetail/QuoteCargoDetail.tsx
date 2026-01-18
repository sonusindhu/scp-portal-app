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
      <div>
        <SelectElement
          className="m-2 w-[15%]"
          options={equipments}
          name={"cargoDetail.equipmentId"}
          label="Equipment"
          labelKey="name"
          valueKey="id"
          rules={{ required: "Equipment is required" }}
        ></SelectElement>
        <SelectElement
          className="m-2 w-[15%]"
          options={commodities}
          name={"cargoDetail.commodityId"}
          label="Commodity"
          labelKey="name"
          valueKey="id"
          rules={{ required: "Commodity is required" }}
        ></SelectElement>

        <TextFieldElement
          className="m-2 w-[15%]"
          name={"cargoDetail.weight"}
          label="Weight"
          rules={{ required: "Weight is required" }}
        />
        <TextFieldElement
          className="m-2 w-[15%]"
          name={"cargoDetail.cargoValue"}
          label="Cargo Value"
          rules={{ required: "Cargo Value is required" }}
        />
        <TextFieldElement
          className="m-2 w-[15%]"
          name={"cargoDetail.temperature"}
          label="Temperature"
        />
        <TextFieldElement
          className="m-2 w-[15%]"
          name={"cargoDetail.pieces"}
          label="Pieces"
        />

        <SelectElement
          className="m-2 w-[15%]"
          options={cargos}
          name={"cargoDetail.cargoTypeId"}
          label="Cargo Type"
          labelKey="name"
          valueKey="id"
          rules={{ required: "Cargo Type is required" }}
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
          name={"cargoDetail.hazmatName"}
          label="Hazmat Name"
          rules={{ 
            maxLength: 20,
            required: isHazmat === "1" ? "Hazmat Name is required" : false 
          }}
        />
        <TextFieldElement
          className="m-2 w-[15%]"
          name={"cargoDetail.hazmatClass"}
          label="Hazmat Class"
          rules={{ 
            maxLength: 20,
            required: isHazmat === "1" ? "Hazmat Class is required" : false 
          }}
        />
        <TextFieldElement
          className="m-2 w-[15%]"
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