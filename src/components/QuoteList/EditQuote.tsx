import React, { useEffect, useState } from "react";
import { Button, Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import CancelIcon from "@mui/icons-material/Cancel";

import toast from "../../utils/toast.util";

import {
  FormContainer,
  TextFieldElement,
  SelectElement,
  MultiSelectElement,
  DatePickerElement,
} from "react-hook-form-mui";
import { AppBar, Box, Toolbar, Typography } from "@material-ui/core";
import QuoteService from "../../services/quote.service";
import DateFnsProvider from "../../utils/DateFnsProvider";

const EditQuote = (props) => {
  const [companies, setCompanies] = useState([]);
  const [contacts, setContacts] = useState([]);

  const formContext = useForm({
    defaultValues: props.quote || {},
  });

  const handleSubmitForm = (e) => {
    const payload = {
      ...e,
      id: props.quote.id,
    };
    QuoteService.create(payload)
      .then((response) => {
        if (response.status) {
          toast.success(response.message);
        } else {
          toast.error(response.message);
        }
      })
      .catch(({ response }) => {
        toast.error(response.message);
      });
  };

  const serviceList = [{ id: "transportation", name: "Transportation" }];
  const transportModes = ["FTL", "LTL", "IM"];

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
      .catch(({ response }) => setCompanies([]));
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
    <Box>
      <FormContainer formContext={formContext} onSuccess={handleSubmitForm}>
        <TextFieldElement
          sx={{ m: 1, width: 375 }}
          name={"name"}
          label="Quote Name"
          variant="outlined"
          margin={"dense"}
        />
        <SelectElement
          sx={{ m: 1, width: 375 }}
          required
          options={serviceList}
          name={"service"}
          label="Service"
          valueKey="id"
          labelKey="name"
        ></SelectElement>
        <MultiSelectElement
          sx={{ m: 1, width: 375 }}
          required
          menuItems={transportModes}
          name={"transportMode"}
          label="Transport Mode"
          showCheckbox={true}
        ></MultiSelectElement>

        <SelectElement
          sx={{ m: 1, width: 375 }}
          required
          options={companies}
          name={"company"}
          label="Company"
          valueKey="id"
          labelKey="name"
          onChange={onChangeCompany}
        ></SelectElement>

        <SelectElement
          sx={{ m: 1, width: 375 }}
          required
          options={contacts}
          name={"contact"}
          label="Contact"
          valueKey="id"
          labelKey="fullName"
        ></SelectElement>

        <div className="quote-datepicker">
          <DateFnsProvider>
            <DatePickerElement label="Date Picker" name={"expiryDate"} />
          </DateFnsProvider>
        </div>
      </FormContainer>
    </Box>
  );
};

export default EditQuote;
