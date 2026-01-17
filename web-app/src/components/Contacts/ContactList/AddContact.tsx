import React, { useEffect, useState } from "react";
import {
  FormContainer,
} from "react-hook-form-mui";
import { Button, Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import { Box } from "@mui/material";
import ContactService from "../../../services/contact.service";
import HeaderWithTitle from "../../../shared/components/HeaderWithTitle";
import { useFormSubmit } from "../../../hooks";
import { CommonFields, FormSelectField, FieldWidths } from "../../../shared/components/FormFields";
import { ValidationRules } from "../../../utils/validation.util";

const AddContact = (props) => {
  const [companies, setCompanies] = useState([]);
  const [statusList] = useState(ContactService.CONST.statusList);

  const formContext = useForm({
    defaultValues: {},
    mode: "onBlur", // Validate on blur for better UX
  });
  const { reset } = formContext;

  const onCloseDrawer = () => {
    props.onCloseDrawer && props.onCloseDrawer();
  };

  const { handleSubmit } = useFormSubmit({
    onSuccess: () => {
      props.onAddSuccess && props.onAddSuccess();
      onCloseDrawer();
      reset();
    },
  });

  const handleSubmitForm = async (data) => {
    await handleSubmit(() => ContactService.create(data));
  };

  useEffect(() => {
    ContactService.getCompanies()
      .then((companies) => {
        setCompanies(companies);
      })
      .catch(() => setCompanies([]));
  }, []);

  return (
    <Box sx={{ width: 450 }} className="form-container">
      <HeaderWithTitle title="Add Contact" onCloseDrawer={onCloseDrawer} />

      <FormContainer formContext={formContext} onSuccess={handleSubmitForm}>
        <CommonFields.FirstName
          name="firstName"
          label="First Name"
          sx={{ m: 1, width: FieldWidths.DRAWER }}
        />
        
        <CommonFields.LastName
          name="lastName"
          label="Last Name"
          sx={{ m: 1, width: FieldWidths.DRAWER }}
        />
        
        <CommonFields.Email
          name="email"
          label="Email"
          sx={{ m: 1, width: FieldWidths.DRAWER }}
        />

        <FormSelectField
          name="status"
          label="Status"
          options={statusList}
          rules={ValidationRules.select(true)}
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

        <CommonFields.Department
          name="department"
          label="Department"
          sx={{ m: 1, width: FieldWidths.DRAWER }}
        />

        <CommonFields.JobTitle
          name="jobTitle"
          label="Job Title"
          sx={{ m: 1, width: FieldWidths.DRAWER }}
        />

        <CommonFields.Address1
          name="address1"
          label="Address1"
          sx={{ m: 1, width: FieldWidths.DRAWER }}
        />

        <CommonFields.Address2
          name="address2"
          label="Address2"
          sx={{ m: 1, width: FieldWidths.DRAWER }}
        />

        <CommonFields.City
          name="city"
          label="City"
          sx={{ m: 1, width: FieldWidths.DRAWER }}
        />
        
        <CommonFields.State
          name="state"
          label="State"
          sx={{ m: 1, width: FieldWidths.DRAWER }}
        />

        <CommonFields.Country
          name="country"
          label="Country"
          sx={{ m: 1, width: FieldWidths.DRAWER }}
        />

        <CommonFields.Zipcode
          name="zipcode"
          label="Zipcode"
          sx={{ m: 1, width: FieldWidths.DRAWER }}
        />

        <CommonFields.Phone
          name="phone"
          label="Phone"
          sx={{ m: 1, width: FieldWidths.DRAWER }}
        />

        <CommonFields.Extension
          name="extension"
          label="Extension"
          sx={{ m: 1, width: FieldWidths.DRAWER }}
        />

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

export default AddContact;
