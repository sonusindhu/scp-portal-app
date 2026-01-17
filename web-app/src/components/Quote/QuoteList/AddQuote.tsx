import React, { useEffect, useState } from "react";
import { Button, Stack } from "@mui/material";
import { useForm } from "react-hook-form";

import {
  FormContainer,
} from "react-hook-form-mui";
import { Box } from "@mui/material";
import QuoteService from "../../../services/quote.service";
import HeaderWithTitle from "../../../shared/components/HeaderWithTitle";
import { useFormSubmit } from "../../../hooks";
import { FormTextField, FormSelectField, FieldWidths, FormActions } from "../../../shared/components/FormFields";
import { ValidationRules } from "../../../utils/validation.util";

interface AddQuoteFormData {
  quoteName: string;
  serviceTypeId: string;
  transportMode: string;
  companyId: number;
  contactId: number | string;
  quotePickUpDate: string;
}

const AddQuote = (props) => {
  const [companies, setCompanies] = useState([]);
  const [contacts, setContacts] = useState([]);

  const formContext = useForm<AddQuoteFormData>({
    defaultValues: {
      quoteName: "",
      serviceTypeId: "",
      transportMode: "",
      companyId: 0,
      contactId: "",
      quotePickUpDate: "",
    },
    mode: "onBlur",
  });
  
  const companyId = formContext.watch("companyId");
  
  const onCloseDrawer = () => {
    props.onCloseDrawer && props.onCloseDrawer();
  };

  const { handleSubmit } = useFormSubmit({
    onSuccess: () => {
      props.onAddSuccess && props.onAddSuccess();
      onCloseDrawer();
    },
  });

  const handleSubmitForm = async (data) => {
    await handleSubmit(() => QuoteService.create(data));
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

  useEffect(() => {
    if (companyId) {
      QuoteService.getContactsByCompany(companyId)
        .then((response) => {
          if (response.status) {
            setContacts(response.result);
          } else {
            setContacts([]);
          }
        })
        .catch(() => setContacts([]));
    }
  }, [companyId]);

  const onChangeCompany = (e: number) => {
    formContext.setValue("contactId", "");
    setContacts([]);
  };

  return (
    <Box className="quote-form" sx={{ width: 450 }}>
      <HeaderWithTitle title="Add Quote" onCloseDrawer={onCloseDrawer} />
      
      <FormContainer formContext={formContext} onSuccess={handleSubmitForm}>
        <div className="drawer-content">
          <FormTextField
            name="name"
            label="Quote Name"
            rules={ValidationRules.text(undefined, 200, false)}
            sx={{ m: 1, width: FieldWidths.DRAWER }}
          />
          
          <FormSelectField
            name="service"
            label="Service"
            options={serviceList}
            rules={ValidationRules.select(true)}
            labelKey="name"
            sx={{ m: 1, width: FieldWidths.DRAWER }}
          />
          
          <FormSelectField
            name="transportMode"
            label="Transport Mode"
            options={transportModes}
            rules={ValidationRules.select(true)}
            labelKey="name"
            sx={{ m: 1, width: FieldWidths.DRAWER }}
          />

          <FormSelectField
            name="companyId"
            label="Company"
            options={companies}
            rules={ValidationRules.select(true)}
            labelKey="name"
            sx={{ m: 1, width: FieldWidths.DRAWER }}
          />

          <FormSelectField
            name="contactId"
            label="Contact"
            options={contacts}
            rules={ValidationRules.select(true)}
            labelKey="fullName"
            sx={{ m: 1, width: FieldWidths.DRAWER }}
          />

          <FormTextField
            name="expiryDate"
            type="date"
            label="Expiry Date"
            sx={{ m: 1, minWidth: FieldWidths.DRAWER }}
            InputLabelProps={{ shrink: true }}
          />
        </div>

        <div className="drawer-footer">
          <div style={{ marginLeft: "12px", marginTop: "15px" }}>
            <Stack direction="row" spacing={2}>
              <Button
                type="submit"
                size="large"
                variant="contained"
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
