import React from "react";
import { Button, Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";

import {
  FormContainer,
  TextFieldElement,
  SelectElement,
} from "react-hook-form-mui";

import CompanyService from "../../services/company.service";
import toast from "../../utils/toast.util";
import { ResponseModel } from "../../models/common.model";
import HeaderWithTitle from "../../shared/components/HeaderWithTitle";

const AddCompany = (props) => {
  const formContext = useForm({
    defaultValues: {},
  });
  const { reset } = formContext;
  const handleClearForm = () => {
    reset();
  };

  const onCloseDrawer = () => {
    props.onCloseDrawer && props.onCloseDrawer();
  };

  const handleSuccess = (response: ResponseModel) => {
    if (response.status) {
      toast.success(response.message);
      props.onAddSuccess && props.onAddSuccess();
      onCloseDrawer();
      reset();
    } else {
      toast.error(response.message);
    }
  };

  const handleSubmitForm = (e) => {
    if (!e.email || !e.name) return;
    debugger
    const payload = { ...e };
    CompanyService.create(payload)
      .then((response) => handleSuccess(response))
      .catch(({ response, error }) => toast.error(response?.message ?? error?.message ?? "An error occurred while creating the company"));
  };

  return (
    <Box sx={{ width: 450 }} className="form-container">
      <HeaderWithTitle title="Add Company" onCloseDrawer={onCloseDrawer} />

      <FormContainer formContext={formContext} onSuccess={handleSubmitForm}>
        <TextFieldElement
          sx={{ m: 1, width: 410 }}
          required
          name={"name"}
          label="Name"
          variant="outlined"
          margin={"dense"}
        />
        <TextFieldElement
          sx={{ m: 1, width: 410 }}
          required
          type={"email"}
          name={"email"}
          label="Email"
          margin={"dense"}
          variant="outlined"
        />

        <SelectElement
          sx={{ m: 1, width: 410 }}
          required
          options={[
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
          ]}
          name={"status"}
          label="Status"
          valueKey="id"
          labelKey="title"
        ></SelectElement>

        <SelectElement
          sx={{ m: 1, width: 410 }}
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
          valueKey="id"
          labelKey="title"
        ></SelectElement>

        <TextFieldElement
          sx={{ m: 1, width: 410 }}
          required
          name={"revenue"}
          label="Revenue"
          variant="outlined"
          validation={{ maxLength: 10 }}
          type={"number"}
        />

        <TextFieldElement
          sx={{ m: 1, width: 410 }}
          required
          name={"employeesCount"}
          label="Employees Count"
          variant="outlined"
          validation={{ maxLength: 5 }}
          type={"number"}
        />

        <TextFieldElement
          sx={{ m: 1, width: 410 }}
          required
          name={"address1"}
          label="Address1"
          variant="outlined"
        />

        <TextFieldElement
          sx={{ m: 1, width: 410 }}
          name={"address2"}
          label="Address2"
          variant="outlined"
        />

        <TextFieldElement
          sx={{ m: 1, width: 410 }}
          required
          name={"city"}
          label="City"
          variant="outlined"
        />

        <TextFieldElement
          sx={{ m: 1, width: 410 }}
          required
          name={"state"}
          label="State"
          variant="outlined"
        />

        <TextFieldElement
          sx={{ m: 1, width: 410 }}
          required
          name={"country"}
          label="Country"
          variant="outlined"
        />

        <TextFieldElement
          sx={{ m: 1, width: 410 }}
          required
          name={"zipcode"}
          label="Zipcode"
          variant="outlined"
        />

        <TextFieldElement
          sx={{ m: 1, width: 410 }}
          required
          name={"phone"}
          label="Phone"
          validation={{ maxLength: 15, minLength: 8 }}
          variant="outlined"
        />

        <TextFieldElement
          sx={{ m: 1, width: 410 }}
          name={"extension"}
          label="Extension"
          validation={{ maxLength: 6 }}
          type={"number"}
          variant="outlined"
        />
        <div className="drawer-footer">
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
                onClick={onCloseDrawer}
              >
                Close
              </Button>
            </Stack>
          </div>
        </div>
      </FormContainer>
    </Box>
  );
};

export default AddCompany;
