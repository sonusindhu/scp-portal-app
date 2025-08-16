import React from "react";
import { FormContainer, TextFieldElement } from "react-hook-form-mui";
import { Button, Stack } from "@mui/material";
import { useForm } from "react-hook-form";

import toast from "../../utils/toast.util";
import AuthService from "../../services/auth.service";
import { ResponseModel } from "../../models/common.model";

const ProfileChangePassword = () => {
  const formContext = useForm({ defaultValues: {} });
  const { reset } = formContext;

  const handleResponse = (response: ResponseModel) => {
    if (response.status) {
      toast.success(response.message);
      reset({
        currentPassword: '',
        password: '',
        confirmPassword: '',
      })
    } else {
      toast.error(response.message);
    }
  }

  const handleClearForm = () => reset();

  const handleSubmitForm = (e) => {
    if (!e.currentPassword || !e.password || !e.confirmPassword) return;
    const payload = { ...e };
    AuthService.updatePassword(payload)
      .then((response) => handleResponse(response))
      .catch(({ response }) => toast.error(response.message));
  };

  return (
    <FormContainer formContext={formContext} onSuccess={handleSubmitForm}>  
      <h3 style={{ marginLeft: "10px" }}>Change Password</h3>         

      <div>
        <TextFieldElement
          sx={{ m: 1, minWidth: "46%" }}
          type='password'
          required={true}
          name={"currentPassword"}
          label="Current Password"
          variant="outlined"
          validation={{ maxLength: 100 }}
        />
      </div>
      <div>
        <TextFieldElement
          sx={{ m: 1, minWidth: "46%" }}
          type='password'
          required={true}
          name={"password"}
          label="New Password"
          variant="outlined"
          validation={{ maxLength: 100 }}
        />
      </div>
      <div>
        <TextFieldElement
          sx={{ m: 1, minWidth: "46%" }}
          type='password'
          required={true}
          name={"confirmPassword"}
          label="Confirm Password"
          variant="outlined"
          validation={{ maxLength: 100 }}
        />
      </div>
           
      <div style={{ marginLeft: "12px", marginTop: "15px" }}>
        <Stack direction="row" spacing={2}>
          <Button
            type={"submit"}
            size="large"
            variant="contained"
          >
            Update Password
          </Button>
          <Button
            size="large"
            variant="outlined"
            type="button"
            onClick={handleClearForm}
          >
            Cancel
          </Button>
        </Stack>
      </div>
    </FormContainer>        
  );
};

export default ProfileChangePassword;
