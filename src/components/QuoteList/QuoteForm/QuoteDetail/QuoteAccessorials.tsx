import React from "react";
import { TextFieldElement } from "react-hook-form-mui";
import { useFieldArray } from "react-hook-form";
import { IconButton } from "@material-ui/core";
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import RemoveCircleOutlinedIcon from '@mui/icons-material/RemoveCircleOutlined';


const QuoteAccessorials = ({ control, register }) => { 

  const { fields, remove, insert } = useFieldArray({
    control,
    name: "accessorials"
  });
  
  const onAddAcc = (index) => {
    insert(index + 1, {});
    console.log(fields);
  };
  const onRemoveAcc = (index) => {
    remove(index);
  };

  return (
    <div className="container-fluid">  
      { fields.map((item: any, index) => {
        return (    
          <div key={item.id}>
            <TextFieldElement
              sx={{ m: 0.9, }}
              name={`accessorials.${index}.origin`}
              label="Origin"
              disabled={true}
              variant="outlined"
              margin={"dense"}
            />
            <TextFieldElement
              sx={{ m: 0.9, }}
              required
              name={`accessorials.${index}.quantity`}
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
              variant="outlined"
            />
            {/* <TextFieldElement
              sx={{ m: 0.9, }}
              name={"Miles"}
              label="Miles"
              margin={"dense"}
              variant="outlined"
            /> */}

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
  );
};

export default QuoteAccessorials;
