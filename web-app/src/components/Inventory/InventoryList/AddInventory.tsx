import React, { useEffect, useState } from "react";
import { Button, Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import { Box } from "@mui/material";
import {
  FormContainer,
} from "react-hook-form-mui";
import InventoryService from "../../../services/inventory.service";
import HeaderWithTitle from "../../../shared/components/HeaderWithTitle";
import { useFormSubmit } from "../../../hooks";
import { FormTextField, FormSelectField, FieldWidths } from "../../../shared/components/FormFields";
import { ValidationRules } from "../../../utils/validation.util";

const AddInventory = (props) => {
  const [companies, setCompanies] = useState([]);
  const [statusList] = useState(InventoryService.data.statusList);
  const [packages] = useState(InventoryService.data.packages);

  const formContext = useForm({
    defaultValues: {},
    mode: "onBlur",
  });
  const { reset } = formContext;

  const onCloseDrawer = () => {
    props.onCloseDrawer && props.onCloseDrawer();
  };

  const { handleSubmit } = useFormSubmit({
    onSuccess: () => {
      props.onAddSuccess && props.onAddSuccess();
      onCloseDrawer();
      reset();
    },
  });

  const handleSubmitForm = async (data) => {
    await handleSubmit(() => InventoryService.create(data));
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
        <FormTextField
          name="trackingNumber"
          label="Tracking Number"
          rules={ValidationRules.text(undefined, 100, true)}
          sx={{ m: 1, width: FieldWidths.DRAWER }}
        />
        
        <FormSelectField
          name="status"
          label="Status"
          options={statusList}
          rules={ValidationRules.select(true)}
          sx={{ m: 1, width: FieldWidths.DRAWER }}
        />
        
        <FormSelectField
          name="type"
          label="Type"
          options={packages}
          rules={ValidationRules.select(true)}
          sx={{ m: 1, width: FieldWidths.DRAWER }}
        />

        <FormSelectField
          name="companyId"
          label="Company"
          options={companies}
          rules={ValidationRules.select(true)}
          labelKey="name"
          sx={{ m: 1, width: FieldWidths.DRAWER }}
        />
        
        <FormTextField
          name="location"
          label="Location"
          rules={ValidationRules.text(undefined, 50, false)}
          multiline
          sx={{ m: 1, width: FieldWidths.DRAWER }}
        />
        
        <FormTextField
          name="length"
          label="Length"
          type="number"
          rules={ValidationRules.number(0, 9999, true)}
          sx={{ m: 1, width: FieldWidths.DRAWER }}
        />

        <FormTextField
          name="width"
          label="Width"
          type="number"
          rules={ValidationRules.number(0, 9999, true)}
          sx={{ m: 1, width: FieldWidths.DRAWER }}
        />

        <FormTextField
          name="height"
          label="Height"
          type="number"
          rules={ValidationRules.number(0, 9999, true)}
          sx={{ m: 1, width: FieldWidths.DRAWER }}
        />

        <FormTextField
          name="weight"
          label="Weight"
          type="number"
          rules={ValidationRules.number(0, 99999, true)}
          sx={{ m: 1, width: FieldWidths.DRAWER }}
        />

        <FormTextField
          name="notes"
          label="Notes"
          rules={ValidationRules.text(undefined, 254, false)}
          multiline
          rows={4}
          sx={{ m: 1, width: FieldWidths.DRAWER }}
        />

        <div className="drawer-footer">
          <div style={{ marginLeft: "12px", marginTop: "15px" }}>
            <Stack direction="row" spacing={2}>
              <Button
                type="submit"
                size="large"
                variant="contained"
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
