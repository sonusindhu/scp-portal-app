import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import CompanyService from "../../services/company.service";
import PageHeading from "../../shared/components/PageHeading/PageHeading";
import { useFormSubmit } from "../../hooks";
import { ValidationRules } from "../../utils/validation.util";
import { CommonFields, FormTextField, FormSelectField, FieldWidths, FormActions, FormContainer } from "../../shared/components/FormFields";

const EditCompany = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const formContext = useForm({
    defaultValues: {},
    mode: "onBlur",
  });
  const { reset } = formContext;
  const handleClearForm = () => reset();

  const { handleSubmit } = useFormSubmit({
    onSuccess: () => {
      reset();
    },
  });

  const handleSubmitForm = async (data) => {
    await handleSubmit(() => CompanyService.update(data));
  };

  useEffect(() => {
    const loadCompany = async () => {
      try {
        const response = await CompanyService.find(Number(id));
        if (response.status && response.result) {
          reset(response.result);
        }
      } catch (error) {
        // Error toast already shown by BaseService
        console.error("Failed to load company:", error);
        navigate("/app/company/list");
      }
    };
    
    loadCompany();
  }, [id, navigate, reset]);

  return (
    <div className="container-fluid">
      <PageHeading title="Edit Company" />

      <FormContainer formContext={formContext} onSuccess={handleSubmitForm}>
        <div>
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
              { id: "", title: "Select" },
              { id: "active", title: "Active" },
              { id: "inactive", title: "Inactive" },
            ]}
            rules={ValidationRules.select(true)}
            className="m-2 w-full"
            valueKey="id"
            labelKey="title"
          />
        </div>

        <div>
          <FormSelectField
            name="type"
            label="Type"
            options={[
              { id: "", title: "Select" },
              { id: "customer", title: "Customer" },
              { id: "carrier", title: "Carrier" },
            ]}
            rules={ValidationRules.select(true)}
            className="m-2 w-full"
            valueKey="id"
            labelKey="title"
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
        </div>
        <div>
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
        </div>
        <div>
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
        </div>

        <div>
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

export default EditCompany;
