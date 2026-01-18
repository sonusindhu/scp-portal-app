import React from "react";
import { Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { Box } from "@mui/material";

import {
  FormContainer,
} from "react-hook-form-mui";

import CompanyService from "../../services/company.service";
import HeaderWithTitle from "../../shared/components/HeaderWithTitle";
import { useFormSubmit } from "../../hooks";
import { CommonFields, FormTextField, FormSelectField, FieldWidths, FormActions } from "../../shared/components/FormFields";
import { ValidationRules } from "../../utils/validation.util";

const AddCompany = (props) => {
  const formContext = useForm({
    defaultValues: {},
    mode: "onBlur",
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
    await handleSubmit(() => CompanyService.create(data));
  };

  return (
    <Box sx={{ width: 450 }} className="form-container">
      <HeaderWithTitle title="Add Company" onCloseDrawer={onCloseDrawer} />

      <FormContainer formContext={formContext} onSuccess={handleSubmitForm}>
        <FormTextField
          name="name"
          label="Name"
          rules={ValidationRules.companyName(true)}
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
          options={[
            { id: "", title: "Select" },
            { id: "active", title: "Active" },
            { id: "inactive", title: "Inactive" },
          ]}
          rules={ValidationRules.select(true)}
          sx={{ m: 1, width: FieldWidths.DRAWER }}
        />

        <FormSelectField
          name="type"
          label="Type"
          options={[
            { id: "", title: "Select" },
            { id: "customer", title: "Customer" },
            { id: "carrier", title: "Carrier" },
          ]}
          rules={ValidationRules.select(true)}
          sx={{ m: 1, width: FieldWidths.DRAWER }}
        />

        <FormTextField
          name="revenue"
          label="Revenue"
          type="number"
          rules={ValidationRules.number(0, 9999999999, true)}
          sx={{ m: 1, width: FieldWidths.DRAWER }}
        />

        <FormTextField
          name="employeesCount"
          label="Employees Count"
          type="number"
          rules={ValidationRules.number(1, 99999, true)}
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
          <FormActions onCancel={onCloseDrawer} cancelLabel="Close" />
        </div>
      </FormContainer>
    </Box>
  );
};

export default AddCompany;
