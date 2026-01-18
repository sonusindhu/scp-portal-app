import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import ContactService from "../../../services/contact.service";
import HeaderWithTitle from "../../../shared/components/HeaderWithTitle";
import { useFormSubmit } from "../../../hooks";
import { CommonFields, FormSelectField, FieldWidths, FormActions, FormContainer } from "../../../shared/components/FormFields";
import { ValidationRules } from "../../../utils/validation.util";

const AddContact = (props) => {
  const [companies, setCompanies] = useState<any[]>([]);
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
    <div className="form-container">
      <HeaderWithTitle title="Add Contact" onCloseDrawer={onCloseDrawer} />

      <FormContainer formContext={formContext} onSuccess={handleSubmitForm}>
        <CommonFields.FirstName
          name="firstName"
          label="First Name"
          className="m-2 w-full"
        />
        
        <CommonFields.LastName
          name="lastName"
          label="Last Name"
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
          options={statusList}
          rules={ValidationRules.select(true)}
          className="m-2 w-full"
        />

        <FormSelectField
          name="companyId"
          label="Company"
          options={companies}
          rules={ValidationRules.select(true)}
          labelKey="name"
          className="m-2 w-full"
        />

        <CommonFields.Department
          name="department"
          label="Department"
          className="m-2 w-full"
        />

        <CommonFields.JobTitle
          name="jobTitle"
          label="Job Title"
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

export default AddContact;
