import React from "react";
import { TextFieldElement } from "@/shared/components/FormFields";
import { useFieldArray } from "react-hook-form";
import PageHeading from "../../../../shared/components/PageHeading/PageHeading";

const QuoteRoutes = ({ control }) => { 

  const { fields } = useFieldArray({
    control,
    name: "stops",
    keyName: 'key'
  });

  return (
    <div className="container-fluid">
      <PageHeading title="Routing Details" />
      <div>
        { fields.map((item, index) => {
          return (    
            <div key={item.key} className="flex items-end gap-2 mb-4">
              <TextFieldElement
                className="m-2 flex-1"
                name={`stops.${index}.origin`}
                label="Origin"
                disabled={true}
              />
              <TextFieldElement
                className="m-2 flex-1"
                name={`stops.${index}.city`}
                label="City"
                rules={{ required: "City is required" }}
              />
              <TextFieldElement
                className="m-2 flex-1"
                name={`stops.${index}.zipcode`}
                label="Zipcode"
                rules={{ required: "Zipcode is required" }}
              />
              <TextFieldElement
                className="m-2 flex-1"
                name={`stops.${index}.state`}
                label="State"
                rules={{ required: "State is required" }}
              />
              <TextFieldElement
                className="m-2 flex-1"
                name={`stops.${index}.country`}
                label="Country"
                rules={{ required: "Country is required" }}
              />
            </div> 
          );  
        })}
      </div>
    </div>
  );
};

export default QuoteRoutes;