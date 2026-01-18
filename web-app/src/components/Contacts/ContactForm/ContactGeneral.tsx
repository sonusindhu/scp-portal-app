import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import ContactService from "../../../services/contact.service";
import PageHeading from "../../../shared/components/PageHeading/PageHeading";
import { useFormSubmit } from "../../../hooks";
import { CommonFields, FormSelectField, FieldWidths, FormActions, FormContainer } from "../../../shared/components/FormFields";
import { ValidationRules } from "../../../utils/validation.util";

const ContactGeneral = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const [companies, setCompanies] = useState<any[]>([]);
  const [statusList] = useState(ContactService.CONST.statusList);

  const formContext = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      status: "",
      companyId: "",
      department: "",
      jobTitle: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      country: "",
      zipcode: "",
      phone: "",
      extension: "",
    },
    mode: "onBlur",
  });
  const { reset } = formContext;
  const handleClearForm = () => reset();

  const { handleSubmit } = useFormSubmit({
    onSuccess: (response) => {
      if (response) {
        reset(response.result);
      }
    },
  });

  const handleSubmitForm = async (data) => {
    await handleSubmit(() => ContactService.update(data));
  };

  const getCompanies = async () => {
    const result = await ContactService.getCompanies();
    setCompanies(result);
  }

  // check if user is authenticated, if not redirect to login page
  useEffect(() => {    
    getCompanies();
    if (id) {
      ContactService.find(+id)
        .then(({ result }) =>  {
          reset({
            firstName: result?.firstName || "",
            lastName: result?.lastName || "",
            email: result?.email || "",
            status: result?.status || "",
            companyId: result?.companyId?.toString() || "",
            department: result?.department || "",
            jobTitle: result?.jobTitle || "",
            address1: result?.address1 || "",
            address2: result?.address2 || "",
            city: result?.city || "",
            state: result?.state || "",
            country: result?.country || "",
            zipcode: result?.zipcode || "",
            phone: result?.phone || "",
            extension: result?.extension || "",
          });
        })
        .catch(() => navigate("/app/contact/list"));
    }
  }, [id, navigate, reset]);

  return (
    <div className="container-fluid">
      <PageHeading title="Edit Contact" />

      <FormContainer formContext={formContext} onSuccess={handleSubmitForm}>
        <div className="grid grid-cols-4 gap-4">
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
        </div>

        <FormActions onCancel={handleClearForm} />
      </FormContainer>
    </div>
  );
};

export default ContactGeneral;
