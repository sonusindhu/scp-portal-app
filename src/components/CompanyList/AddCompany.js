import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Stack, Alert } from "@mui/material";
import { useForm } from "react-hook-form";
import {
  FormContainer,
  TextFieldElement,
  SelectElement,
} from "react-hook-form-mui";

import axios from "../../config";
import AuthService from "../../services/auth.service";

const API_URL = process.env.REACT_APP_API_ENDPOINT;

const AddCompany = () => {
  const navigate = useNavigate();
  const [showError, setShowError] = useState("");
  const [showSuccess, setShowSuccess] = useState("");

  const formContext = useForm({
    defaultValues: {},
  });
  const { reset } = formContext;
  const handleClearForm = () => {
    reset();
  };

  const handleSubmitForm = (e) => {
    if (!e.email || !e.name) return;
    const payload = { ...e };
    axios
      .post(API_URL + "company/create", payload)
      .then(({ data }) => data)
      .then((response) => {
        if (response.status) {
          setShowSuccess(response.message);
          reset();
        } else {
          setShowError(response.message);
        }
      })
      .catch((error) => {
        setShowError(error.response.data);
      });
  };

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
          <span>Add Company</span>
        </h3>
      </header>

      <FormContainer formContext={formContext} onSuccess={handleSubmitForm}>
        <div>
          <TextFieldElement
            sx={{ m: 1.1, width: "41ch" }}
            required
            name={"name"}
            label="Name"
            variant="outlined"
            margin={"dense"}
          />
          <TextFieldElement
            sx={{ m: 1.1, width: "41ch" }}
            required
            type={"email"}
            name={"email"}
            label="Email"
            margin={"dense"}
            variant="outlined"
          />

          <SelectElement
            sx={{ m: 1.1, width: "41ch" }}
            required
            options={[
              {
                id: "",
                title: "Select",
              },
              {
                id: "active",
                title: "active",
              },
              {
                id: "active",
                title: "Inactive",
              },
            ]}
            name={"status"}
            label="Status"
          ></SelectElement>
        </div>

        <div>
          <SelectElement
            sx={{ m: 1.1, width: "41ch" }}
            required
            options={[
              {
                id: "",
                title: "Select",
              },
              {
                id: "customer",
                title: "Customer",
              },
              {
                id: "carrier",
                title: "Carrier",
              },
            ]}
            name={"type"}
            label="Type"
          ></SelectElement>

          <TextFieldElement
            sx={{ m: 1.1, width: "41ch" }}
            required
            name={"revenue"}
            label="Revenue"
            variant="outlined"
            validation={{ maxLength: 10 }}
            type={"number"}
          />

          <TextFieldElement
            sx={{ m: 1.1, width: "41ch" }}
            required
            name={"employeesCount"}
            label="Employees Count"
            variant="outlined"
            validation={{ maxLength: 5 }}
            type={"number"}
          />
        </div>
        <div>
          <TextFieldElement
            sx={{ m: 1.1, width: "41ch" }}
            required
            name={"address1"}
            label="Address1"
            variant="outlined"
          />

          <TextFieldElement
            sx={{ m: 1.1, width: "41ch" }}
            name={"address2"}
            label="Address2"
            variant="outlined"
          />

          <TextFieldElement
            sx={{ m: 1.1, width: "41ch" }}
            required
            name={"city"}
            label="City"
            variant="outlined"
          />
        </div>
        <div>
          <TextFieldElement
            sx={{ m: 1.1, width: "41ch" }}
            required
            name={"state"}
            label="State"
            variant="outlined"
          />

          <TextFieldElement
            sx={{ m: 1.1, width: "41ch" }}
            required
            name={"country"}
            label="Country"
            variant="outlined"
          />

          <TextFieldElement
            sx={{ m: 1.1, width: "41ch" }}
            required
            name={"zipcode"}
            label="Zipcode"
            variant="outlined"
          />
        </div>

        <div>
          <TextFieldElement
            sx={{ m: 1.1, width: "41ch" }}
            required
            name={"phone"}
            label="Phone"
            validation={{ maxLength: 15, minLength: 8 }}
            variant="outlined"
          />

          <TextFieldElement
            sx={{ m: 1.1, width: "41ch" }}
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

export default AddCompany;
