import React, { useEffect, useState } from "react";
import {
  FormContainer,
  TextFieldElement,
  CheckboxElement,
} from "react-hook-form-mui";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Stack } from "@mui/material";
import { useForm } from "react-hook-form";

import QuoteService from "../../../../services/quote.service";
import toast from "../../../../utils/toast.util";

const QuoteNotes = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const formContext = useForm({ defaultValues: {} });

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
    if (!e.title || !e.message) return;
    const payload = { 
      ...e,
      isCritical: e.isCritical || false,
      quoteId: id
    };
    QuoteService.createNote(payload)
      .then((response) => {
        if (response.status) {
          toast.success(response.message);
          reset({ isCritical: false, title: '', message: '' });
        } else {
          toast.error(response.message);
        }
      })
      .catch(({ response }) => {
        toast.error(response.message);
      });
  };


  useEffect(() => {
    // QuoteService.getNotes(payload)
    //   .then((response) => {
    //     if (response.status) {
    //       toast.success(response.message);
    //       reset({ isCritical: false, title: '', message: '' });
    //     } else {
    //       toast.error(response.message);
    //     }
    //   })
    //   .catch(({ response }) => {
    //     toast.error(response.message);
    //   });
  }, []);

  return (
    <div className="container-fluid">
      <FormContainer formContext={formContext} onSuccess={handleSubmit(handleSubmitForm)}>
        
      <div>        
        <TextFieldElement
          sx={{ m: 1, width: "100ch" }}
          required={true}
          name={"title"}
          label="Note Title"
          variant="outlined"
          validation={{ maxLength: 100 }}
        />      
      </div>
      <div>        
        <TextFieldElement
          sx={{ m: 1, width: "180ch" }}
          required={true}
          name={"message"}
          label="Note Description"
          variant="outlined"
          validation={{ maxLength: 1000 }}
          multiline={true}
          rows={4}
        />      
      </div>
      <div>
        <CheckboxElement 
          sx={{ m: 1 }}
          name={"isCritical"} label="Mark Critical"/>
      </div>

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

export default QuoteNotes;
