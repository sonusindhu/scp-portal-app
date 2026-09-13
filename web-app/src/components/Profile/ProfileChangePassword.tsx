import React from "react";
import { useForm } from "react-hook-form";

import AuthService from "../../services/auth.service";
import { useFormSubmit } from "../../hooks";
import { CommonFields, FormActions, FormContainer } from "../../shared/components/FormFields";
import { ValidationRules } from "../../utils/validation.util";

const ProfileChangePassword = () => {
  const formContext = useForm<{
    currentPassword: string;
    password: string;
    confirmPassword: string;
  }>({
    defaultValues: {
      currentPassword: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onBlur",
  });
  const { reset, watch } = formContext;
  const passwordValue = watch("password");

  const { handleSubmit } = useFormSubmit({
    onSuccess: () => {
      reset({
        currentPassword: '',
        password: '',
        confirmPassword: '',
      });
    },
  });

  const handleClearForm = () => reset();

  const handleSubmitForm = async (data) => {
    await handleSubmit(() => AuthService.updatePassword({
      ...data,
      password: data.password,
      confirmPassword: data.confirmPassword,
    }));
  };

  return (
    <FormContainer formContext={formContext} onSuccess={handleSubmitForm}>  
      <h3 style={{ marginLeft: "10px" }}>Change Password</h3>         

      <div>
        <CommonFields.Password
          name="currentPassword"
          label="Current Password"
          className="m-2 w-[46%]"
        />
      </div>
      <div>
        <CommonFields.Password
          name="password"
          label="New Password"
          className="m-2 w-[46%]"
        />
      </div>
      <div>
        <CommonFields.Password
          name="confirmPassword"
          label="Confirm Password"
          className="m-2 w-[46%]"
        />
      </div>
           
      <FormActions onCancel={handleClearForm} submitLabel="Update Password" />
    </FormContainer>        
  );
};

export default ProfileChangePassword;
