import React from "react";
import { TextFieldElement } from "react-hook-form-mui";
import { useFieldArray } from "react-hook-form";
import PageHeading from "../../../../shared/components/PageHeading";

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
            <div key={item.key}>
              <TextFieldElement
                sx={{ m: 0.9, }}
                name={`stops.${index}.origin`}
                label="Origin"
                disabled={true}
                variant="outlined"
                margin={"dense"}
              />
              <TextFieldElement
                sx={{ m: 0.9, }}
                required
                name={`stops.${index}.city`}
                label="City"
                variant="outlined"
                margin={"dense"}
              />
              <TextFieldElement
                sx={{ m: 0.9, }}
                required
                name={`stops.${index}.zipcode`}
                label="Zipcode"
                margin={"dense"}
                variant="outlined"
              />
              <TextFieldElement
                sx={{ m: 0.9, }}
                required
                name={`stops.${index}.state`}
                label="State"
                margin={"dense"}
                variant="outlined"
              />
              <TextFieldElement
                sx={{ m: 0.9, }}
                required
                name={`stops.${index}.country`}
                label="Country"
                margin={"dense"}
                variant="outlined"
              />
              {/* <TextFieldElement
                sx={{ m: 0.9, }}
                name={"Miles"}
                label="Miles"
                margin={"dense"}
                variant="outlined"
              /> */}
            </div> 
          );  
        })}
      </div>
    </div>
  );
};

export default QuoteRoutes;
