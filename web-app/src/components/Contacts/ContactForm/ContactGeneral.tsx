import React, { useEffect, useState } from "react";
import {
  FormContainer,
} from "react-hook-form-mui";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Stack } from "@mui/material";
import { useForm } from "react-hook-form";

import ContactService from "../../../services/contact.service";
import PageHeading from "../../../shared/components/PageHeading/PageHeading";
import { useFormSubmit } from "../../../hooks";
import { CommonFields, FormSelectField, FieldWidths, FormActions } from "../../../shared/components/FormFields";
import { ValidationRules } from "../../../utils/validation.util";

const ContactGeneral = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const [companies, setCompanies] = useState<any[]>([]);
  const [statusList] = useState(ContactService.CONST.statusList);

  const formContext = useForm({
    defaultValues: {},
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
        .then(({ result }) =>  reset(result))
        .catch(() => navigate("/app/contact/list"));
    }
  }, []);

  return (
    <div className="container-fluid">
      <PageHeading title="Edit Contact" />

      <FormContainer formContext={formContext} onSuccess={handleSubmitForm}>
        <div>
          <CommonFields.FirstName
            name="firstName"
            label="First Name"
            sx={{ m: 1, width: FieldWidths.STANDARD }}
          />
          
          <CommonFields.LastName
            name="lastName"
            label="Last Name"
            sx={{ m: 1, width: FieldWidths.STANDARD }}
          />
          
          <CommonFields.Email
            name="email"
            label="Email"
            sx={{ m: 1, width: FieldWidths.STANDARD }}
          />
        </div>

        <div>
          <FormSelectField
            name="status"
            label="Status"
            options={statusList}
            rules={ValidationRules.select(true)}
            sx={{ m: 1, width: FieldWidths.STANDARD }}
          />

          <FormSelectField
            name="companyId"
            label="Company"
            options={companies}
            rules={ValidationRules.select(true)}
            labelKey="name"
            sx={{ m: 1, width: FieldWidths.STANDARD }}
          />

          <CommonFields.Department
            name="department"
            label="Department"
            sx={{ m: 1, width: FieldWidths.STANDARD }}
          />
        </div>
        <div>
          <CommonFields.JobTitle
            name="jobTitle"
            label="Job Title"
            sx={{ m: 1, width: FieldWidths.STANDARD }}
          />

          <CommonFields.Address1
            name="address1"
            label="Address1"
            sx={{ m: 1, width: FieldWidths.STANDARD }}
          />

          <CommonFields.Address2
            name="address2"
            label="Address2"
            sx={{ m: 1, width: FieldWidths.STANDARD }}
          />
        </div>
        <div>
          <CommonFields.City
            name="city"
            label="City"
            sx={{ m: 1, width: FieldWidths.STANDARD }}
          />
          
          <CommonFields.State
            name="state"
            label="State"
            sx={{ m: 1, width: FieldWidths.STANDARD }}
          />

          <CommonFields.Country
            name="country"
            label="Country"
            sx={{ m: 1, width: FieldWidths.STANDARD }}
          />
        </div>

        <div>
          <CommonFields.Zipcode
            name="zipcode"
            label="Zipcode"
            sx={{ m: 1, width: FieldWidths.STANDARD }}
          />

          <CommonFields.Phone
            name="phone"
            label="Phone"
            sx={{ m: 1, width: FieldWidths.STANDARD }}
          />

          <CommonFields.Extension
            name="extension"
            label="Extension"
            sx={{ m: 1, width: FieldWidths.STANDARD }}
          />
        </div>

        <FormActions onCancel={handleClearForm} />
      </FormContainer>
    </div>
  );
};

export default ContactGeneral;
