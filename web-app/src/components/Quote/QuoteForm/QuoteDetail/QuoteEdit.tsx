import { Button } from "@mui/material";

import React from "react";
import { useForm } from "react-hook-form";
import { FormContainer } from "react-hook-form-mui";
import QuoteService from "../../../../services/quote.service";
import { ValidationRules } from "../../../../utils/validation.util";
import { CommonFields, FormTextField, FormActions } from "../../../../shared/components/FormFields";

import QuoteAccessorials from "./QuoteAccessorials";
import QuoteRoutes from "./QuoteRoutes";
import QuoteCargoDetail from "./QuoteCargoDetail";
import { Quote } from "../../../../shared/models/Quote";
import { useFormSubmit } from "../../../../hooks";

interface QuoteEditProps{
  quote: Quote[],
  commodities: any[],
  equipments: any[],
  cargos: any[],
}

const QuoteEdit = (props: QuoteEditProps) => {  
  const defaultValues = props.quote;
  const commodities = props.commodities;
  const equipments = props.equipments;
  const cargos = props.cargos;
  const formContext = useForm({ 
    defaultValues,
    mode: "onBlur"
  });

  const {
    control,
    register,
    handleSubmit,
    getValues,
    setValue,
    watch,
    reset,
    resetField
  } = formContext;

  const handleClearForm = () => reset();

  const { handleSubmit: submitForm } = useFormSubmit({
    onSuccess: (response) => {
      if (response) {
        reset(response.result);
      }
    },
  });

  const handleSubmitForm = async (data) => {
    await submitForm(() => QuoteService.update(data));
  };

  return (
    <div className="container-fluid">
      <FormContainer formContext={formContext} defaultValues={defaultValues} onSuccess={handleSubmitForm}>
        {/* Cargo Details Start */}
        <QuoteCargoDetail 
          {...{
            control,
            watch,
            register,
            defaultValues,
            getValues,
            setValue,
            equipments,
            commodities,
            cargos,
            resetField
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

        <FormActions onCancel={handleClearForm} />
      </FormContainer>
    </div>
  );
};

export default QuoteEdit;