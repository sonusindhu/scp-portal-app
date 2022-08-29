import { Button } from "@material-ui/core";
import { Stack } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { FormContainer } from "react-hook-form-mui";
import QuoteService from "../../../../services/quote.service";

import toast from "../../../../utils/toast.util";
import QuoteAccessorials from "./QuoteAccessorials";
import QuoteRoutes from "./QuoteRoutes";
import QuoteCargoDetail from "./QuoteCargoDetail";

interface QuoteEditProps{
  quote: any[],
  commodities: any[],
  equipments: any[],
  cargos: any[],
}

const QuoteEdit = (props: QuoteEditProps) => {  
  const defaultValues = props.quote;
  const commodities = props.commodities;
  const equipments = props.equipments;
  const cargos = props.cargos;
  const formContext = useForm({ defaultValues });

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
