import React from "react";
import { useForm } from "react-hook-form";

import CompanyService from "../../services/company.service";
import HeaderWithTitle from "../../shared/components/HeaderWithTitle";
import { useFormSubmit } from "../../hooks";
import { CommonFields, FormTextField, FormSelectField, FieldWidths, FormActions, FormContainer } from "../../shared/components/FormFields";
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
    <div className="form-container">
      <HeaderWithTitle title="Add Company" onCloseDrawer={onCloseDrawer} />

      <FormContainer formContext={formContext} onSuccess={handleSubmitForm}>
        <FormTextField
          name="name"
          label="Name"
          rules={ValidationRules.companyName(true)}
          className="m-2 w-full"
        />
        
        <CommonFields.Email
          name="email"
          label="Email"
          className="m-2 w-full"
        />

        <FormSelectField
          name="status"
          label="Status"
          options={[
            { id: "active", value: "Active" },
            { id: "inactive", value: "Inactive" },
          ]}
          rules={ValidationRules.select(true)}
          className="m-2 w-full"
        />

        <FormSelectField
          name="type"
          label="Type"
          options={[
            { id: "customer", value: "Customer" },
            { id: "carrier", value: "Carrier" },
          ]}
          rules={ValidationRules.select(true)}
          className="m-2 w-full"
        />

        <FormTextField
          name="revenue"
          label="Revenue"
          type="number"
          rules={ValidationRules.number(0, 9999999999, true)}
          className="m-2 w-full"
        />

        <FormTextField
          name="employeesCount"
          label="Employees Count"
          type="number"
          rules={ValidationRules.number(1, 99999, true)}
          className="m-2 w-full"
        />

        <CommonFields.Address1
          name="address1"
          label="Address1"
          className="m-2 w-full"
        />

        <CommonFields.Address2
          name="address2"
          label="Address2"
          className="m-2 w-full"
        />

        <CommonFields.City
          name="city"
          label="City"
          className="m-2 w-full"
        />

        <CommonFields.State
          name="state"
          label="State"
          className="m-2 w-full"
        />

        <CommonFields.Country
          name="country"
          label="Country"
          className="m-2 w-full"
        />

        <CommonFields.Zipcode
          name="zipcode"
          label="Zipcode"
          className="m-2 w-full"
        />

        <CommonFields.Phone
          name="phone"
          label="Phone"
          className="m-2 w-full"
        />

        <CommonFields.Extension
          name="extension"
          label="Extension"
          className="m-2 w-full"
        />
        <div className="drawer-footer">
          <FormActions onCancel={onCloseDrawer} cancelLabel="Close" />
        </div>
      </FormContainer>
    </div>
  );
};

export default AddCompany;
