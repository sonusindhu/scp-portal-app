import React from "react";
import { TextFieldElement } from "react-hook-form-mui";
import { useFieldArray } from "react-hook-form";
import { IconButton } from "@material-ui/core";
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import RemoveCircleOutlinedIcon from '@mui/icons-material/RemoveCircleOutlined';
import PageHeading from "../../../../shared/components/PageHeading";


const QuoteAccessorials = ({ control }) => { 

  const { fields, remove, insert } = useFieldArray({
    control,
    name: "accessorials",
    keyName: 'key'
  });
  
  const onAddAcc = (index: number) => {
    insert(index + 1, {
      name: '',
      rate: null,
      quantity: null,
      totalRate: null,
      description: null
    });
  };
  const onRemoveAcc = (index) => {
    remove(index);
  };

  return (
    <div className="container-fluid">
      <PageHeading title="Accessorials Details" />
      <div>
        { fields.map((item: any, index) => {
          return (    
            <div key={item.key}>
              <TextFieldElement
                sx={{ m: 0.9, }}
                required
                name={`accessorials.${index}.name`}
                label="Name"
                variant="outlined"
                margin={"dense"}
              />
              <TextFieldElement
                sx={{ m: 0.9, }}
                required
                name={`accessorials.${index}.quantity`}
                label="Quantity"
                margin={"dense"}
                variant="outlined"
              />
              <TextFieldElement
                sx={{ m: 0.9, }}
                required
                name={`accessorials.${index}.rate`}
                label="Rate"
                margin={"dense"}
                variant="outlined"
              />
              <TextFieldElement
                sx={{ m: 0.9, }}
                required
                name={`accessorials.${index}.totalRate`}
                label="Total Rate"
                margin={"dense"}
                disabled={true}
                variant="outlined"
              />
              <TextFieldElement
                sx={{ m: 0.9, }}
                name={`accessorials.${index}.description`}
                label="Description"
                disabled={true}
                variant="outlined"
                margin={"dense"}
              />

              <IconButton color="primary" 
                aria-label="Add Accessorial"
                onClick={() => onAddAcc(index)}>
                <AddCircleOutlinedIcon fontSize="large" />
              </IconButton>
              
              <IconButton color="primary" 
                aria-label="Add Accessorial"
                disabled={fields.length === 1}
                onClick={ () => onRemoveAcc(index) }>
                <RemoveCircleOutlinedIcon fontSize="large" />
              </IconButton>

            </div> 
          );  
        })}
      </div>  
    </div>
  );
};

export default QuoteAccessorials;
