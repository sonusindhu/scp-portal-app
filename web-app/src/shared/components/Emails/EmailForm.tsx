import React from "react";
import {
  FormContainer,
  TextFieldElement,
  CheckboxElement,
} from "../FormFields";

import { useForm } from "react-hook-form";

import toast from "../../../utils/toast.util";
import { Email, EmailFormProps } from "../../models/Email";
import PageHeading from "../PageHeading/PageHeading";
import { ResponseModel } from "../../../models/common.model";
import EmailService from "../../../services/email.service";
import { ValidationRules } from "../../../utils/validation.util";
import { FormTextField, FormActions } from "../FormFields";
import { ApiResponse } from "@/services/BaseService";

const EmailForm = (props: EmailFormProps) => {
  const email: Partial<Email> = props.email || {};
  const formContext = useForm({ 
    defaultValues: email,
    mode: "onBlur"
  });

  const { reset } = formContext;

  const handleClearForm = () => reset();

  const handleSuccess = (response: ApiResponse<Email>) => {
    if (response.status) {
      toast.success(response.message);
      reset({ ...email, isCritical: false, title: "", message: "" });
      props.onSuccess(response.data);
    } else {
      toast.error(response.message);
    }
  };

  const handleSubmitForm = (e) => {
    const payload = {
      ...e,
      isCritical: Boolean(e.isCritical),
      id: props.id,
      companyId:
        e.companyId === "" || e.companyId === undefined
          ? undefined
          : Number(e.companyId),
      contactId:
        e.contactId === "" || e.contactId === undefined
          ? undefined
          : Number(e.contactId),
      inventoryId:
        e.inventoryId === "" || e.inventoryId === undefined
          ? undefined
          : Number(e.inventoryId),
      quoteId:
        e.quoteId === "" || e.quoteId === undefined
          ? undefined
          : Number(e.quoteId),
      userId:
        e.userId === "" || e.userId === undefined
          ? undefined
          : Number(e.userId),
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
          className="m-2 w-[96%]"
          name="title"
          label="Email Title"
          rules={ValidationRules.text(undefined, 100, true)}
        />
      </div>
      <div>
        <FormTextField
          className="m-2 w-[96%]"
          name="message"
          label="Email Description"
          rules={ValidationRules.text(undefined, 1000, true)}
          multiline={true}
          rows={7}
        />
      </div>
      <div style={{ marginLeft: "10px" }}>
        <CheckboxElement
          className="m-2"
          name={"isCritical"}
          label="Mark Critical"
        />
      </div>

      <FormActions onCancel={handleClearForm} />
    </FormContainer>
  );
};

export default EmailForm;
