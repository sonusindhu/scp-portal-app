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
import QuoteCargoDetail from "./QuoteCargoDetail";

const QuoteEdit = (props) => {  
  const defaultValues = props.quote;
  console.log(props.quote);

  const formContext = useForm({ defaultValues });

  const {
    control,
    register,
    handleSubmit,
    getValues,
    setValue,
    watch,
    reset
  } = formContext;

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

  return (
    <div className="container-fluid">
      <FormContainer formContext={formContext} defaultValues={defaultValues} onSuccess={handleSubmit(handleSubmitForm)}>
        {/* Cargo Details Start */}
        <QuoteCargoDetail 
          {...{
            control,
            watch,
            register,
            defaultValues,
            getValues,
            setValue
          }} 
        />

        {/* Cargo Details End */}

        {/* Routing Details Start */}
      
        <QuoteRoutes 
          {...{
            control,
            watch,
            register,
            defaultValues,
            getValues,
            setValue
          }} 
        />

        {/* Routing Details End */}
        
        {/* Accessorials Details Start */}
        

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
