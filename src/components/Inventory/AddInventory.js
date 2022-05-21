import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../config";
import { Button, Stack, Alert } from "@mui/material";
import { useForm } from "react-hook-form";

import AuthService from "../../services/auth.service";
import {
  FormContainer,
  TextFieldElement,
  SelectElement,
} from "react-hook-form-mui";

const API_URL = process.env.REACT_APP_API_ENDPOINT;

const AddContact = () => {
  const navigate = useNavigate();
  const [showError, setShowError] = useState("");
  const [showSuccess, setShowSuccess] = useState("");
  const [companies, setCompanies] = useState([]);

  const formContext = useForm({
    defaultValues: {},
  });
  const { reset } = formContext;
  const handleClearForm = () => {
    reset();
  };

  const handleSubmitForm = (e) => {
    const payload = { ...e };
    axios
      .post(API_URL + "inventory/create", payload)
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
  const packages = [
    {
      id: "",
      title: "Select",
    },
    {
      id: "parcel",
      title: "Parcel",
    },
    {
      id: "pallet",
      title: "Pallet",
    },
    {
      id: "bale",
      title: "bale",
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
        <h3>Add Inventory</h3>
      </header>

      <FormContainer formContext={formContext} onSuccess={handleSubmitForm}>
        <div>
          <TextFieldElement
            sx={{ m: 1, width: "52ch" }}
            required
            name={"trackingNumber"}
            label="Tracking Number"
            variant="outlined"
            margin={"dense"}
          />
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
            options={packages}
            name={"type"}
            label="Type"
          ></SelectElement>
        </div>

        <div>
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
            name={"location"}
            label="Location"
            variant="outlined"
            validation={{ maxLength: 50 }}
            multiline="true"
          />
          <TextFieldElement
            sx={{ m: 1, width: "52ch" }}
            required
            name={"length"}
            label="Length"
            variant="outlined"
            validation={{ maxLength: 7 }}
          />
        </div>
        <div>
          <TextFieldElement
            sx={{ m: 1, width: "52ch" }}
            required
            name={"width"}
            label="Width"
            variant="outlined"
            validation={{ maxLength: 7 }}
          />

          <TextFieldElement
            sx={{ m: 1, width: "52ch" }}
            required
            name={"height"}
            label="Height"
            variant="outlined"
            validation={{ maxLength: 7 }}
          />

          <TextFieldElement
            required
            sx={{ m: 1, width: "52ch" }}
            name={"weight"}
            label="Weight"
            variant="outlined"
            validation={{ maxLength: 8 }}
          />
        </div>
        <div>
          <TextFieldElement
            sx={{ m: 1, width: "160ch" }}
            name={"notes"}
            label="Notes"
            variant="outlined"
            validation={{ maxLength: 254 }}
            multiline="true"
            rows={4}
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

            {showError ? <Alert severity="error">{showError}</Alert> : <></>}

            {showSuccess ? (
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
