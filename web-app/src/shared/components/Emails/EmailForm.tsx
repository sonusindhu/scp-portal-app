import React from "react";
import {
  FormContainer,
  TextFieldElement,
  CheckboxElement,
} from "react-hook-form-mui";

import { useForm } from "react-hook-form";

import toast from "../../../utils/toast.util";
import { Email, EmailFormProps } from "../../models/Email";
import PageHeading from "../PageHeading/PageHeading";
import { ResponseModel } from "../../../models/common.model";
import EmailService from "../../../services/email.service";
import { ValidationRules } from "../../../utils/validation.util";
import { FormTextField, FormActions } from "../FormFields";

const EmailForm = (props: EmailFormProps) => {
  const email: Partial<Email> = props.email || {};
  const formContext = useForm({ 
    defaultValues: email,
    mode: "onBlur"
  });

  const { reset } = formContext;

  const handleClearForm = () => reset();

  const handleSuccess = (response: ResponseModel) => {
    if (response.status) {
      toast.success(response.message);
      reset({ ...email, isCritical: false, title: "", message: "" });
      props.onSuccess(response.result);
    } else {
      toast.error(response.message);
    }
  };

  const handleSubmitForm = (e) => {
    const payload = {
      ...e,
      isCritical: e.isCritical || false,
      id: props.id,
    };
    EmailService.create(payload)
      .then((response) => handleSuccess(response))
      .catch(({ response }) => toast.error(response.message));
  };

  return (
    <FormContainer
      formContext={formContext}
      onSuccess={handleSubmitForm}
    >
      <PageHeading title="New Email" />
      <div>
        <FormTextField
          sx={{ m: 1, minWidth: "96%" }}
          name="title"
          label="Email Title"
          rules={ValidationRules.text(undefined, 100, true)}
        />
      </div>
      <div>
        <FormTextField
          sx={{ m: 1, minWidth: "96%" }}
          name="message"
          label="Email Description"
          rules={ValidationRules.text(undefined, 1000, true)}
          multiline={true}
          rows={7}
        />
      </div>
      <div style={{ marginLeft: "10px" }}>
        <CheckboxElement
          sx={{ m: 1 }}
          name={"isCritical"}
          label="Mark Critical"
        />
      </div>

      <FormActions onCancel={handleClearForm} />
    </FormContainer>
  );
};

export default EmailForm;
