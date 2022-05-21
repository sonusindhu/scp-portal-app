import React, { useEffect, useState } from "react";
import {
  FormContainer,
  TextFieldElement,
  SelectElement,
} from "react-hook-form-mui";
import { useNavigate } from "react-router-dom";
import { Button, Stack, Alert } from "@mui/material";
import { useForm } from "react-hook-form";

import axios from "../../utils/config.util";
import AuthService from "../../services/auth.service";

const API_URL = process.env.REACT_APP_API_ENDPOINT;

const AddContact = () => {
  const navigate = useNavigate();
  const [showError, setShowError] = useState("");
  const [companies, setCompanies] = useState([]);
  const [showSuccess, setShowSuccess] = useState("");

  const formContext = useForm({
    defaultValues: {},
  });
  const { reset } = formContext;
  const handleClearForm = () => reset();

  const handleSubmitForm = (e) => {
    const payload = { ...e };
    axios
      .post(API_URL + "contact/create", payload)
      .then(({ data }) => data)
      .then((response) => {
        console.log(response);
        if (response.status) {
          setShowSuccess(response.message);
          reset();
        } else {
          setShowError(response.message);
        }
      })
      .catch((error) => {
        console.log(error);
        setShowError(error.response);
      });
  };

  const statusList = [
    {
      id: "",
      title: "Select",
    },
    {
      id: "active",
      title: "Active",
    },
    {
      id: "inactive",
      title: "Inactive",
    },
  ];

  useEffect(() => {
    axios
      .get(API_URL + "company/listOfNames")
      .then(({ data }) => data)
      .then(({ result }) => {
        setCompanies(result);
      })
      .catch((error) => {
        setCompanies([]);
      });
  }, []);

  // check if user is authenticated, if not redirect to login page
  const user = AuthService.getCurrentUser();
  useEffect(() => {
    if (!user) navigate("/auth/login");
  }, []);
  if (!user) return <></>;

  return (
    <div className="container-fluid">
      <header className="jumbotron">
        <h3>
          <span>Add Contact</span>
        </h3>
      </header>

      <FormContainer formContext={formContext} onSuccess={handleSubmitForm}>
        <div>
          <TextFieldElement
            sx={{ m: 1, width: "52ch" }}
            required
            name={"firstName"}
            label="First Name"
            variant="outlined"
            margin={"dense"}
          />
          <TextFieldElement
            sx={{ m: 1, width: "52ch" }}
            required
            name={"lastName"}
            label="Last Name"
            variant="outlined"
            margin={"dense"}
          />
          <TextFieldElement
            sx={{ m: 1, width: "52ch" }}
            required
            type={"email"}
            name={"email"}
            label="Email"
            margin={"dense"}
            variant="outlined"
          />
        </div>

        <div>
          <SelectElement
            sx={{ m: 1, width: "52ch" }}
            required
            options={statusList}
            name={"status"}
            label="Status"
          ></SelectElement>

          <SelectElement
            sx={{ m: 1, width: "52ch" }}
            required
            options={companies}
            name={"companyId"}
            label="Company"
            labelKey="name"
          ></SelectElement>

          <TextFieldElement
            sx={{ m: 1, width: "52ch" }}
            required
            name={"department"}
            label="Department"
            variant="outlined"
            validation={{ maxLength: 20 }}
          />
        </div>
        <div>
          <TextFieldElement
            sx={{ m: 1, width: "52ch" }}
            required
            name={"jobTitle"}
            label="Job Title"
            variant="outlined"
            validation={{ maxLength: 50 }}
          />

          <TextFieldElement
            sx={{ m: 1, width: "52ch" }}
            required
            name={"address1"}
            label="Address1"
            variant="outlined"
          />

          <TextFieldElement
            sx={{ m: 1, width: "52ch" }}
            name={"address2"}
            label="Address2"
            variant="outlined"
          />
        </div>
        <div>
          <TextFieldElement
            sx={{ m: 1, width: "52ch" }}
            required
            name={"city"}
            label="City"
            variant="outlined"
          />
          <TextFieldElement
            sx={{ m: 1, width: "52ch" }}
            required
            name={"state"}
            label="State"
            variant="outlined"
          />

          <TextFieldElement
            sx={{ m: 1, width: "52ch" }}
            required
            name={"country"}
            label="Country"
            variant="outlined"
          />
        </div>

        <div>
          <TextFieldElement
            sx={{ m: 1, width: "52ch" }}
            required
            name={"zipcode"}
            label="Zipcode"
            variant="outlined"
          />

          <TextFieldElement
            sx={{ m: 1, width: "52ch" }}
            required
            name={"phone"}
            label="Phone"
            validation={{ maxLength: 15, minLength: 8 }}
            variant="outlined"
          />

          <TextFieldElement
            sx={{ m: 1, width: "52ch" }}
            name={"extension"}
            label="Extension"
            validation={{ maxLength: 6 }}
            type={"number"}
            variant="outlined"
          />
        </div>

        <div style={{ marginLeft: "12px", marginTop: "15px" }}>
          <Stack direction="row" spacing={2}>
            <Button
              type={"submit"}
              size="large"
              variant="contained"
              onClick={handleSubmitForm}
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

            {showError != "" ? (
              <Alert severity="error">{showError}</Alert>
            ) : (
              <></>
            )}

            {showSuccess != "" ? (
              <Alert severity="success">{showSuccess}</Alert>
            ) : (
              <></>
            )}
          </Stack>
        </div>
      </FormContainer>
    </div>
  );
};

export default AddContact;
