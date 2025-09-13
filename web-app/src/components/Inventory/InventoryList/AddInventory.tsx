import React, { useEffect, useState } from "react";
import { Button, Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import { Box } from "@mui/material";
import {
  FormContainer,
  TextFieldElement,
  SelectElement,
} from "react-hook-form-mui";
import toast from "../../../utils/toast.util";
import InventoryService from "../../../services/inventory.service";
import { ResponseModel } from "../../../models/common.model";
import HeaderWithTitle from "../../../shared/components/HeaderWithTitle";

const AddInventory = (props) => {
  const [companies, setCompanies] = useState([]);
  const [statusList] = useState(InventoryService.data.statusList);
  const [packages] = useState(InventoryService.data.packages);

  const formContext = useForm({
    defaultValues: {},
  });
  const { reset } = formContext;

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

  const handleSubmitForm = async (e) => {
    const valid = await formContext.trigger();
    const errorFields = Object.keys(formContext.formState.errors);
    if (!valid) {
      if (errorFields.length > 0) {
        const errorMessages = errorFields
          .map((field) => {
            const err = formContext.formState.errors[field];
            return `${field}: ${err?.message || "Invalid value"}`;
          })
          .join("\n");
        toast.error(`Please correct the following fields:\n${errorMessages}`);
      } else {
        toast.error("Form is invalid. Please check your input.");
      }
      return;
    }
    const payload = { ...e };
    InventoryService.create(payload)
      .then((response) => handleSuccess(response))
      .catch(({ message }) => toast.error(message));
  };

  // check if user is authenticated, if not redirect to login page
  useEffect(() => {
    InventoryService.getCompanies()
      .then(({ result }) => setCompanies(result))
      .catch(() => setCompanies([]));
  }, []);

  return (
    <Box sx={{ width: 450 }} className="form-container">
      <HeaderWithTitle title="Add Inventory" onCloseDrawer={onCloseDrawer} />

      <FormContainer
        formContext={formContext}
        onSuccess={handleSubmitForm}
      >
        <TextFieldElement
          sx={{ m: 1, width: 410 }}
          required
          name={"trackingNumber"}
          label="Tracking Number"
          variant="outlined"
          margin={"dense"}
        />
        <SelectElement
          sx={{ m: 1, width: 410 }}
          required
          options={statusList}
          name={"status"}
          label="Status"
          valueKey="id"
          labelKey="title"
        ></SelectElement>
        <SelectElement
          sx={{ m: 1, width: 410 }}
          required
          options={packages}
          name={"type"}
          label="Type"
          valueKey="id"
          labelKey="title"
        ></SelectElement>

        <SelectElement
          sx={{ m: 1, width: 410 }}
          required
          options={companies}
          name={"companyId"}
          label="Company"
          labelKey="name"
        ></SelectElement>
        <TextFieldElement
          sx={{ m: 1, width: 410 }}
          name={"location"}
          label="Location"
          variant="outlined"
          rules={{ maxLength: 50 }}
          multiline={true}
        />
        <TextFieldElement
          sx={{ m: 1, width: 410 }}
          required
          name={"length"}
          label="Length"
          variant="outlined"
          rules={{ maxLength: 7 }}
        />

        <TextFieldElement
          sx={{ m: 1, width: 410 }}
          required
          name={"width"}
          label="Width"
          variant="outlined"
          rules={{ maxLength: 7 }}
        />

        <TextFieldElement
          sx={{ m: 1, width: 410 }}
          required
          name={"height"}
          label="Height"
          variant="outlined"
          rules={{ maxLength: 7 }}
        />

        <TextFieldElement
          required
          sx={{ m: 1, width: 410 }}
          name={"weight"}
          label="Weight"
          variant="outlined"
          rules={{ maxLength: 8 }}
        />

        <TextFieldElement
          sx={{ m: 1, width: 410 }}
          name={"notes"}
          label="Notes"
          variant="outlined"
          rules={{ maxLength: 254 }}
          multiline={true}
          rows={4}
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

export default AddInventory;
