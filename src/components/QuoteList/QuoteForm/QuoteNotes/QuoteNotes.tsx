import React, { useEffect, useState } from "react";
import {
  FormContainer,
  TextFieldElement,
  SelectElement,
  CheckboxElement,
} from "react-hook-form-mui";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Stack } from "@mui/material";
import { useForm } from "react-hook-form";

import axios from "../../../../utils/config.util";
import AuthService from "../../../../services/auth.service";
import QuoteService from "../../../../services/quote.service";
import PageHeading from "../../../../shared/components/PageHeading";

import toast from "../../../../utils/toast.util";
import { Box, Drawer, Typography } from "@material-ui/core";

const drawerWidth = 240;

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
    if (!e.email || !e.fullName) return;
    const payload = { ...e };
  };

  // check if user is authenticated, if not redirect to login page
  const user = AuthService.getCurrentUser();
  useEffect(() => {
    if (user && id) {
    } else {
      navigate("/auth/login");
    }
  }, []);
  if (!user) return <></>;

  return (
    <div className="container-fluid">
      <FormContainer formContext={formContext} onSuccess={handleSubmit(handleSubmitForm)}>
        
      <div>        
        <TextFieldElement
          sx={{ m: 1, width: "180ch" }}
          name={"note"}
          label="Note"
          variant="outlined"
          validation={{ maxLength: 1000 }}
          multiline={true}
          rows={4}
        />      
      </div>
      <div>
        <CheckboxElement 
          sx={{ m: 1 }}
          name={"notes"} label="Mark"/>
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
