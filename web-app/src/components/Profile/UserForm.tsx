import React from "react";
import {
  FormContainer,
  TextFieldElement
} from "react-hook-form-mui";
import { Button, Stack } from "@mui/material";
import { useForm } from "react-hook-form";

import toast from "../../utils/toast.util";
import AuthService from "../../services/auth.service";
import UserProfileImage from "./UserProfileImage";
import { ResponseModel } from "../../models/common.model";

const UserForm = (props) => {
  const user = props.user || {};
  const formContext = useForm({ defaultValues: user });
  const {
    reset
  } = formContext;

  const handleClearForm = () => reset();


  const handleSuccess = (response: ResponseModel) => {
    if (response.status) {
      toast.success(response.message);
      reset({ ...response.result })
    } else {
      toast.error(response.message);
    }
  }

  const handleSubmitForm = (e) => {
    if (!e.firstName || !e.lastName || !e.email) return;
    const payload = { ...e };
    AuthService.updateProfile(payload)
      .then((response) => handleSuccess(response))
      .catch(({ response }) => toast.error(response.message));
  };

  return (
    <FormContainer formContext={formContext} onSuccess={handleSubmitForm}>
      
      <UserProfileImage user={user}/>

      <div className="user-form">  
        <div>
          <TextFieldElement
            sx={{ m: 1, minWidth: "90%" }}
            required={true}
            name={"firstName"}
            label="First Name"
            variant="outlined"
            validation={{ maxLength: 100 }}
          />
        </div>
        <div>
          <TextFieldElement
            sx={{ m: 1, minWidth: "90%" }}
            required={true}
            name={"lastName"}
            label="Last Name"
            variant="outlined"
            validation={{ maxLength: 100 }}
          />
        </div>
        <div>        
          <TextFieldElement
            sx={{ m: 1, minWidth: "90%" }}
            required={true}
            name={"email"}
            label="Email"
            variant="outlined"
            validation={{ maxLength: 100 }}
          />      
        </div>      
        <div>        
          <TextFieldElement
            sx={{ m: 1, minWidth: "90%" }}
            required={true}
            name={"jobTitle"}
            label="Job Title"
            variant="outlined"
            validation={{ maxLength: 100 }}
          />      
        </div>      
        <div>        
          <TextFieldElement
            sx={{ m: 1, minWidth: "90%" }}
            required={true}
            name={"department"}
            label="Department"
            variant="outlined"
            validation={{ maxLength: 100 }}
          />      
        </div>      
        <div>        
          <TextFieldElement
            sx={{ m: 1, minWidth: "90%" }}
            required={true}
            name={"location"}
            label="Location"
            variant="outlined"
            validation={{ maxLength: 100 }}
          />      
        </div>      
        <div>        
          <TextFieldElement
            sx={{ m: 1, minWidth: "90%" }}
            required={true}
            name={"phoneNumber"}
            label="Phone Number"
            variant="outlined"
            validation={{ maxLength: 100 }}
          />
        </div>
        <div>
          <TextFieldElement
            sx={{ m: 1, minWidth: "90%" }}
            required={true}
            name={"extension"}
            label="Extension"
            variant="outlined"
            validation={{ maxLength: 100 }}
          />      
        </div>      
      </div>


      <div style={{ marginLeft: "12px", marginTop: "15px" }}>
        <Stack direction="row" spacing={2}>
          <Button
            type={"submit"}
            size="large"
            variant="contained"
          >
            Save
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

export default UserForm;
