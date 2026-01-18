import React from "react";
import { TextFieldElement } from "react-hook-form-mui";
import { useFieldArray } from "react-hook-form";
import { PlusCircle, MinusCircle } from "lucide-react";
import PageHeading from "../../../../shared/components/PageHeading/PageHeading";

const QuoteAccessorials = ({ control }) => {
  const { fields, remove, insert } = useFieldArray({
    control,
    name: "accessorials",
    keyName: "key",
  });

  const onAddAcc = (index: number) => {
    insert(index + 1, {
      name: "",
      rate: null,
      quantity: null,
      totalRate: null,
      description: null,
    });
  };
  const onRemoveAcc = (index) => {
    remove(index);
  };

  return (
    <div className="container-fluid">
      <PageHeading title="Accessorials Details" />
      <div>
        {fields.map((item: any, index) => {
          return (
            <div key={item.key}>
              <TextFieldElement
                sx={{ m: 0.9 }}
                required
                name={`accessorials.${index}.name`}
                label="Name"
                variant="outlined"
                margin={"dense"}
              />
              <TextFieldElement
                sx={{ m: 0.9 }}
                required
                name={`accessorials.${index}.quantity`}
                label="Quantity"
                margin={"dense"}
                variant="outlined"
              />
              <TextFieldElement
                sx={{ m: 0.9 }}
                required
                name={`accessorials.${index}.rate`}
                label="Rate"
                margin={"dense"}
                variant="outlined"
              />
              <TextFieldElement
                sx={{ m: 0.9 }}
                name={`accessorials.${index}.totalRate`}
                label="Total Rate"
                margin={"dense"}
                disabled={true}
                variant="outlined"
              />
              <TextFieldElement
                sx={{ m: 0.9 }}
                name={`accessorials.${index}.description`}
                label="Description"
                disabled={true}
                variant="outlined"
                margin={"dense"}
              />

              <div className="add-remove-btn">
                <button
                  className="inline-flex items-center justify-center p-2 rounded-full hover:bg-gray-100 text-[#1976d2] disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Add Accessorial"
                  onClick={() => onAddAcc(index)}
                  type="button"
                >
                  <PlusCircle className="w-8 h-8" />
                </button>

                <button
                  className="inline-flex items-center justify-center p-2 rounded-full hover:bg-gray-100 text-[#1976d2] disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Remove Accessorial"
                  disabled={fields.length === 1}
                  onClick={() => onRemoveAcc(index)}
                  type="button"
                >
                  <MinusCircle className="w-8 h-8" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuoteAccessorials;