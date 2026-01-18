import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import {
  FormContainer,
} from "react-hook-form-mui";

import CompanyService from "../../services/company.service";
import PageHeading from "../../shared/components/PageHeading/PageHeading";
import { useFormSubmit } from "../../hooks";
import { ValidationRules } from "../../utils/validation.util";
import { CommonFields, FormTextField, FormSelectField, FieldWidths, FormActions } from "../../shared/components/FormFields";

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
            sx={{ m: 1.1, width: FieldWidths.STANDARD }}
          />
          
          <CommonFields.Email
            name="email"
            label="Email"
            sx={{ m: 1.1, width: FieldWidths.STANDARD }}
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
            sx={{ m: 1.1, width: FieldWidths.STANDARD }}
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
            sx={{ m: 1.1, width: FieldWidths.STANDARD }}
            valueKey="id"
            labelKey="title"
          />

          <FormTextField
            name="revenue"
            label="Revenue"
            type="number"
            rules={ValidationRules.number(0, 9999999999, true)}
            sx={{ m: 1.1, width: FieldWidths.STANDARD }}
          />

          <FormTextField
            name="employeesCount"
            label="Employees Count"
            type="number"
            rules={ValidationRules.number(1, 99999, true)}
            sx={{ m: 1.1, width: FieldWidths.STANDARD }}
          />
        </div>
        <div>
          <CommonFields.Address1
            name="address1"
            label="Address1"
            sx={{ m: 1.1, width: FieldWidths.STANDARD }}
          />

          <CommonFields.Address2
            name="address2"
            label="Address2"
            sx={{ m: 1.1, width: FieldWidths.STANDARD }}
          />

          <CommonFields.City
            name="city"
            label="City"
            sx={{ m: 1.1, width: FieldWidths.STANDARD }}
          />
        </div>
        <div>
          <CommonFields.State
            name="state"
            label="State"
            sx={{ m: 1.1, width: FieldWidths.STANDARD }}
          />

          <CommonFields.Country
            name="country"
            label="Country"
            sx={{ m: 1.1, width: FieldWidths.STANDARD }}
          />

          <CommonFields.Zipcode
            name="zipcode"
            label="Zipcode"
            sx={{ m: 1.1, width: FieldWidths.STANDARD }}
          />
        </div>

        <div>
          <CommonFields.Phone
            name="phone"
            label="Phone"
            sx={{ m: 1.1, width: FieldWidths.STANDARD }}
          />

          <CommonFields.Extension
            name="extension"
            label="Extension"
            sx={{ m: 1.1, width: FieldWidths.STANDARD }}
          />
        </div>

        <FormActions onCancel={handleClearForm} />
      </FormContainer>
    </div>
  );
};

export default EditCompany;
