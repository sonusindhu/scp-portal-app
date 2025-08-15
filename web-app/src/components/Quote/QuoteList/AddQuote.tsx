import React, { useEffect, useState } from "react";
import { Button, Stack } from "@mui/material";
import { useForm } from "react-hook-form";

import toast from "../../../utils/toast.util";

import {
  FormContainer,
  TextFieldElement,
  SelectElement,
} from "react-hook-form-mui";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import QuoteService from "../../../services/quote.service";
import { ResponseModel } from "../../../models/common.model";
import HeaderWithTitle from "../../../shared/components/HeaderWithTitle";

const AddQuote = (props) => {
  const [companies, setCompanies] = useState([]);
  const [contacts, setContacts] = useState([]);

  const formContext = useForm({
    defaultValues: {},
  });
  const onCloseDrawer = () => {
    props.onCloseDrawer && props.onCloseDrawer();
  };

  const handleSuccess = (response: ResponseModel) => {
    if (response.status) {
      toast.success(response.message);
      props.onAddSuccess && props.onAddSuccess();
      onCloseDrawer();
    } else {
      toast.error(response.message);
    }
  }

  const handleSubmitForm = (e) => {
    debugger
    const payload = { ...e };
    QuoteService.create(payload)
      .then((response) => handleSuccess(response))
      .catch(({ response }) => toast.error(response.message));
  };

  const serviceList = [{ id: "transportation", name: "Transportation" }];
  const transportModes = [{ id: "FTL", name: "FTL" }, { id: "LTL", name: "LTL" }];

  // check if user is authenticated, if not redirect to login page
  useEffect(() => {
    QuoteService.getCompanies()
      .then((response) => {
        if (response.status) {
          setCompanies(response.result);
        } else {
          setCompanies([]);
        }
      })
      .catch(() => setCompanies([]));
  }, []);

  const onChangeCompany = (e: number) => {
    QuoteService.getContactsByCompany(e)
      .then((response) => {
        if (response.status) {
          setContacts(response.result);
        } else {
          setContacts([]);
        }
      })
      .catch(() => setContacts([]));
  };

  return (
    <Box className="quote-form" sx={{ width: 450 }}>
      <HeaderWithTitle title="Add Quote" onCloseDrawer={onCloseDrawer} />
      
      <FormContainer formContext={formContext} onSuccess={handleSubmitForm}>
        <div className="drawer-content">
          <TextFieldElement
            sx={{ m: 1, width: 410 }}
            name={"name"}
            label="Quote Name"
            variant="outlined"
            margin={"dense"}
          />
          <SelectElement
            sx={{ m: 1, width: 410 }}
            required
            options={serviceList}
            name={"service"}
            label="Service"
            valueKey="id"
            labelKey="name"
          ></SelectElement>
          
          <SelectElement
            sx={{ m: 1, width: 410 }}
            required
            options={transportModes}
            name={"transportMode"}
            label="Transport Mode"
            valueKey="id"
            labelKey="name"
          ></SelectElement>

          <SelectElement
            sx={{ m: 1, width: 410 }}
            required
            options={companies}
            name={"companyId"}
            label="Company"
            valueKey="id"
            labelKey="name"
            onChange={onChangeCompany}
          ></SelectElement>

          <SelectElement
            sx={{ m: 1, width: 410 }}
            required
            options={contacts}
            name={"contactId"}
            label="Contact"
            valueKey="id"
            labelKey="fullName"
          ></SelectElement>

          <TextFieldElement
              sx={{ m: 1, minWidth: 410 }}
              name={"expiryDate"}
              variant="outlined"
              type="date"
            />
        </div>

        <div className="drawer-footer">
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
                onClick={onCloseDrawer}
              >
                Close
              </Button>
            </Stack>
          </div>
        </div>
      </FormContainer>
    </Box>
  );
};

export default AddQuote;
