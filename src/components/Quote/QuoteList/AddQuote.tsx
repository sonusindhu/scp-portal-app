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

const AddQuote = (props) => {
  const [companies, setCompanies] = useState([]);
  const [contacts, setContacts] = useState([]);

  const formContext = useForm({
    defaultValues: {},
  });
  const onCloseDrawer = () => {
    props.onCloseDrawer && props.onCloseDrawer();
  };

  const handleSubmitForm = (e) => {
    const payload = { ...e };
    QuoteService.create(payload)
      .then((response) => {
        if (response.status) {
          toast.success(response.message);
          props.onAddSuccess && props.onAddSuccess();
          onCloseDrawer();
        } else {
          toast.error(response.message);
        }
      })
      .catch(({ response }) => {
        toast.error(response.message);
      });
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
    <Box sx={{ width: 400 }}>
      <AppBar position="absolute" className="drawer-header">
        <Toolbar>
          <Box sx={{ width: 335 }}>
            <Typography variant="inherit" color="inherit" noWrap>
              Add Quote
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 0 }} className="close-icon">
            <CancelIcon onClick={onCloseDrawer} />
          </Box>
        </Toolbar>
      </AppBar>

      <FormContainer formContext={formContext} onSuccess={handleSubmitForm}>
        <div className="drawer-content">
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
          
          <SelectElement
            sx={{ m: 1, width: 375 }}
            required
            options={transportModes}
            name={"transportMode"}
            label="Transport Mode"
            valueKey="id"
            labelKey="name"
          ></SelectElement>
          {/* <MultiSelectElement
            sx={{ m: 1, width: 375 }}
            required
            menuItems={transportModes}
            name={"transportMode"}
            label="Transport Mode"
            showCheckbox={true}
          ></MultiSelectElement> */}

          <SelectElement
            sx={{ m: 1, width: 375 }}
            required
            options={companies}
            name={"companyId"}
            label="Company"
            valueKey="id"
            labelKey="name"
            onChange={onChangeCompany}
          ></SelectElement>

          <SelectElement
            sx={{ m: 1, width: 375 }}
            required
            options={contacts}
            name={"contactId"}
            label="Contact"
            valueKey="id"
            labelKey="fullName"
          ></SelectElement>

          <div className="quote-datepicker">
            <DateFnsProvider>
              <DatePickerElement label="Date Picker" name={"expiryDate"} />
            </DateFnsProvider>
          </div>
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
