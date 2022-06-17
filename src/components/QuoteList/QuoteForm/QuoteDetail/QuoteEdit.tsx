import { Button } from "@material-ui/core";
import { Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { FormContainer, SelectElement, TextFieldElement } from "react-hook-form-mui";
import { useNavigate, useParams } from "react-router-dom";
import QuoteService from "../../../../services/quote.service";

import IconButton from '@mui/material/IconButton';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import RemoveCircleOutlinedIcon from '@mui/icons-material/RemoveCircleOutlined';

import toast from "../../../../utils/toast.util";
import QuoteAccessorials from "./QuoteAccessorials";
import QuoteRoutes from "./QuoteRoutes";

const QuoteEdit = (props) => {  
  const defaultValues = props.quote;
  const {
    control,
    register,
    handleSubmit,
    getValues,
    setValue,
    watch,
    reset
  } = useForm({
    defaultValues
  });

  // const formContext = useForm<any>({
  //   defaultValues: props.quote,
  // });
  // const { reset, control, getValues } = formContext;

  // const { 
  //   fields: accesorials, 
  //   append: appendAcc, 
  //   prepend: prependAcc, 
  //   remove: removeAcc, 
  //   swap: swapAcc, 
  //   move: moveAcc, 
  //   insert: insertAcc,
  //   replace: replaceAcc
  // } = useFieldArray({
  //   control,
  //   name: "accesorials", // unique name for your Field Array
  // });

  const handleClearForm = () => reset();

  const handleSubmitForm = (e) => {
    if (!e.email || !e.fullName) return;
    const payload = { ...e };
    QuoteService.update(payload)
      .then((response) => {
        if (response.status) {
          toast.success(response.message);
          reset(response.result);

        } else {
          toast.error(response.message);
        }
      })
      .catch(({ response }) => {
        toast.error(response.data);
      });
  };

  const onAddAcc = (index) => {

  };
  const onRemoveAcc = (index) => {
    const acc = getValues('accessorils')
    console.log(acc);
  };

  const onUpdateRateQuanity = ($event, index) => {
    console.log($event, index);
    const acc = getValues('accessorils');
    console.log(acc);    
  }

  const handleChange = ($event) => {
    console.log($event);
  }

  return (
    <div className="container-fluid">
      <FormContainer defaultValues={defaultValues} onSuccess={handleSubmit(handleSubmitForm)}>
        {/* Cargo Details Start */}
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
            name={"weight"}
            label="Weight"
            variant="outlined"
            margin={"dense"}
          />
          <TextFieldElement
            sx={{ m: 1, }}
            required
            name={"cargoValue"}
            label="Cargo Value"
            variant="outlined"
            margin={"dense"}
          />
          <TextFieldElement
            sx={{ m: 1, }}
            name={"temperature"}
            label="Temperature"
            margin={"dense"}
            variant="outlined"
          />
          <TextFieldElement
            sx={{ m: 1, }}
            name={"pieces"}
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
            name={"isHazmat"}
            label="Hazmat"
          ></SelectElement>

          
          <TextFieldElement
            sx={{ m: 1 }}
            required
            name={"hazmatName"}
            label="Hazmat Name"
            variant="outlined"
            validation={{ maxLength: 20 }}
          />
          <TextFieldElement
            sx={{ m: 1 }}
            required
            name={"hazmatClass"}
            label="Hazmat Class"
            variant="outlined"
            validation={{ maxLength: 20 }}
          />
          <TextFieldElement
            sx={{ m: 1 }}
            required
            name={"hazmatUN"}
            label="Hazmat UN"
            variant="outlined"
            validation={{ maxLength: 20 }}
          />
        </div>
        {/* Cargo Details End */}

        {/* Routing Details Start */}
        {/* <h3>Routing Details</h3>
          <QuoteRoutes 
            {...{
              control,
              watch,
              register,
              defaultValues,
              getValues,
              setValue
            }} 
          /> */}

        {/* Routing Details End */}
        
        {/* Accessorials Details Start */}
        <h3>Accessorials Details</h3>

          <QuoteAccessorials 
            {...{
              control,
              watch,
              register,
              defaultValues,
              getValues,
              setValue
            }} 
          />

        
        {/* Accessorials Details End */}

        <div style={{ marginLeft: "12px", marginTop: "15px" }}>
          <Stack direction="row" spacing={2}>
            <Button
              type={"submit"}
              size="large"
              variant="contained"
              onClick={handleSubmitForm}
            >
              Save
            </Button>
            <Button
              size="large"
              variant="outlined"
              type="button"
              onClick={handleClearForm}
            >
              Cancel
            </Button>
          </Stack>
        </div>
      </FormContainer>
    </div>
  );
};

export default QuoteEdit;
