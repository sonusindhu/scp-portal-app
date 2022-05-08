import React, { useState, useReducer, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Alert,
} from "@mui/material";

import AuthService from "../../services/auth.service";

const API_URL = "http://localhost:1337/api/v1/app/company/";

const CompanyList = () => {
  const [showError, setShowError] = useState("");
  const [showSuccess, setShowSuccess] = useState("");

  const [state, setState] = useReducer((oldState, action) => {
    if (action.type == "add") {
      return {
        ...oldState,
        ...action.data,
      };
    } else if (action.type == "reset") {
      return {};
    }
  }, {});

  const handleChangeInput = (e) => {
    const { id, value } = e.target;
    const action = {
      data: { [id]: value },
      type: "add",
    };
    setState(action);
  };

  const handleClearForm = (e) => {
    setState({ type: "reset" });
  };

  const handleSubmitForm = (e) => {
    console.log(state);
    if (!state.email || !state.name) return;
    axios
      .post(API_URL + "create", state)
      .then(({ data }) => data)
      .then((response) => {
        console.log(response);
        if (response.status) {
          setState({ type: "reset" });
          setShowSuccess(response.message);
        } else {
          setShowError(response.message);
        }
      })
      .catch((error) => {
        console.log(error.response.data);
        setShowError(error.response.data);
      });
  };

  const onSelectChange = (data) => {
    const action = {
      data,
      type: "add",
    };
    setState(action);
  };

  useEffect(() => {
    console.log(state);
  }, [state]);

  const user = AuthService.getCurrentUser();
  axios.defaults.headers.common["token"] = user.token;
  axios.defaults.headers.common["allowOrigins"] = "*";

  return (
    <div className="container-fluid">
      <header className="jumbotron">
        <h3>
          <span>Add Company</span>
        </h3>
      </header>

      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 3, width: "41ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            required
            id="name"
            label="Name"
            variant="outlined"
            onChange={handleChangeInput}
          />
          <TextField
            required
            id="email"
            label="Email"
            variant="outlined"
            onChange={handleChangeInput}
          />

          <FormControl variant="outlined" sx={{ m: 3, width: "41ch" }}>
            <InputLabel>Status</InputLabel>
            <Select
              id="status"
              value={state?.status || ""}
              onChange={(event) => {
                onSelectChange({ status: event?.target?.value });
              }}
              label="Status"
            >
              <MenuItem value="">
                <em>Select</em>
              </MenuItem>
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
            </Select>
          </FormControl>
        </div>

        <div>
          <FormControl variant="outlined" sx={{ m: 3, width: "41ch" }}>
            <InputLabel>Type</InputLabel>
            <Select
              id="type"
              value={state?.type || ""}
              onChange={(event) => {
                onSelectChange({ type: event?.target?.value });
              }}
              label="Type"
            >
              <MenuItem value="">
                <em>Select</em>
              </MenuItem>
              <MenuItem value="customer">Customer</MenuItem>
              <MenuItem value="carrier">Carrier</MenuItem>
            </Select>
          </FormControl>
          <TextField
            required
            id="revenue"
            label="Revenue"
            variant="outlined"
            onChange={handleChangeInput}
          />
          <TextField
            required
            id="employeesCount"
            label="Employees Count"
            variant="outlined"
            onChange={handleChangeInput}
          />
        </div>
        <div>
          <TextField
            required
            id="address1"
            label="Address1"
            variant="outlined"
            onChange={handleChangeInput}
          />
          <TextField
            required
            id="address2"
            label="Address2"
            variant="outlined"
            onChange={handleChangeInput}
          />
          <TextField
            required
            id="city"
            label="City"
            variant="outlined"
            onChange={handleChangeInput}
          />
        </div>
        <div>
          <TextField
            required
            id="state"
            label="State"
            variant="outlined"
            onChange={handleChangeInput}
          />
          <TextField
            required
            id="country"
            label="Country"
            variant="outlined"
            onChange={handleChangeInput}
          />
          <TextField
            required
            id="zipcode"
            label="Zipcode"
            variant="outlined"
            onChange={handleChangeInput}
          />
        </div>

        <div>
          <TextField
            required
            id="phone"
            label="Phone"
            variant="outlined"
            onChange={handleChangeInput}
          />
          <TextField
            required
            id="extension"
            label="Extension"
            variant="outlined"
            onChange={handleChangeInput}
          />
        </div>

        <div style={{ marginLeft: "23px" }}>
          <Stack direction="row" spacing={2}>
            <Button variant="contained" onClick={handleSubmitForm}>
              Save
            </Button>
            <Button variant="outlined" type="button" onClick={handleClearForm}>
              Cancel
            </Button>
          </Stack>
        </div>
      </Box>

      {showError != "" ? <Alert severity="error">{showError}</Alert> : <></>}

      {showSuccess != "" ? (
        <Alert severity="success">{showSuccess}</Alert>
      ) : (
        <></>
      )}
    </div>
  );
};

export default CompanyList;
