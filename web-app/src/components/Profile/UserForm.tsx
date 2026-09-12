import React from "react";
import { useForm } from "react-hook-form";

import AuthService from "../../services/auth.service";
import UserProfileImage from "./UserProfileImage";
import { useFormSubmit } from "../../hooks";
import { CommonFields, FormTextField, FormActions, FormContainer } from "../../shared/components/FormFields";
import { ValidationRules } from "../../utils/validation.util";

const UserForm = (props) => {
  const user = props.user || {};
  const formContext = useForm({ 
    defaultValues: user,
    mode: "onBlur",
  });
  const {
    reset
  } = formContext;

  const handleClearForm = () => reset();

  const { handleSubmit } = useFormSubmit({
    onSuccess: (response) => {
      if (response) {
        reset({ ...(response.data ?? {}) });
      }
    },
  });

  const handleSubmitForm = async (data) => {
    await handleSubmit(() => AuthService.updateProfile(data));
  };

  return (
    <FormContainer formContext={formContext} onSuccess={handleSubmitForm}>
      
      <UserProfileImage user={user}/>

      <div className="user-form">  
        <div>
          <CommonFields.FirstName
            name="firstName"
            label="First Name"
            className="m-2 w-[90%]"
          />
        </div>
        <div>
          <CommonFields.LastName
            name="lastName"
            label="Last Name"
            className="m-2 w-[90%]"
          />
        </div>
        <div>        
          <CommonFields.Email
            name="email"
            label="Email"
            className="m-2 w-[90%]"
          />      
        </div>      
        <div>        
          <CommonFields.JobTitle
            name="jobTitle"
            label="Job Title"
            className="m-2 w-[90%]"
          />      
        </div>      
        <div>        
          <CommonFields.Department
            name="department"
            label="Department"
            className="m-2 w-[90%]"
          />      
        </div>      
        <div>        
          <FormTextField
            name="location"
            label="Location"
            rules={ValidationRules.text(undefined, 100, true)}
            className="m-2 w-[90%]"
          />      
        </div>      
        <div>        
          <FormTextField
            name="phoneNumber"
            label="Phone Number"
            rules={ValidationRules.phone(true)}
            className="m-2 w-[90%]"
          />
        </div>
        <div>
          <CommonFields.Extension
            name="extension"
            label="Extension"
            className="m-2 w-[90%]"
          />      
        </div>      
      </div>

      <FormActions onCancel={handleClearForm} />
    </FormContainer>        
  );
};

export default UserForm;
