import React from "react";
import { FormContainer } from "react-hook-form-mui";

import { useForm } from "react-hook-form";

import AuthService from "../../services/auth.service";
import { useFormSubmit } from "../../hooks";
import { CommonFields, FormActions } from "../../shared/components/FormFields";
import { ValidationRules } from "../../utils/validation.util";

const ProfileChangePassword = () => {
  const formContext = useForm({ 
    defaultValues: {},
    mode: "onBlur", // Validate on blur for better UX
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
    await handleSubmit(() => AuthService.updatePassword(data));
  };

  return (
    <FormContainer formContext={formContext} onSuccess={handleSubmitForm}>  
      <h3 style={{ marginLeft: "10px" }}>Change Password</h3>         

      <div>
        <CommonFields.Password
          name="currentPassword"
          label="Current Password"
          sx={{ m: 1, minWidth: "46%" }}
        />
      </div>
      <div>
        <CommonFields.Password
          name="password"
          label="New Password"
          sx={{ m: 1, minWidth: "46%" }}
        />
      </div>
      <div>
        <CommonFields.Password
          name="confirmPassword"
          label="Confirm Password"
          sx={{ m: 1, minWidth: "46%" }}
          rules={ValidationRules.confirmPassword(passwordValue)}
        />
      </div>
           
      <FormActions onCancel={handleClearForm} submitLabel="Update Password" />
    </FormContainer>        
  );
};

export default ProfileChangePassword;
