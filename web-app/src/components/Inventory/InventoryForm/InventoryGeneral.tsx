import React, { useEffect, useState } from "react";
import { Button, Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import {
  FormContainer,
} from "react-hook-form-mui";
import InventoryService from "../../../services/inventory.service";
import { useNavigate, useParams } from "react-router-dom";
import PageHeading from "../../../shared/components/PageHeading/PageHeading";
import { useFormSubmit } from "../../../hooks";
import { FormTextField, FormSelectField, FieldWidths, FormActions } from "../../../shared/components/FormFields";
import { ValidationRules } from "../../../utils/validation.util";

const InventoryGeneral = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const [companies, setCompanies] = useState<any[]>([]);
  const [statusList] = useState(InventoryService.data.statusList);
  const [packages] = useState(InventoryService.data.packages);

  const formContext = useForm({
    defaultValues: {},
    mode: "onBlur",
  });
  const { reset } = formContext;
  const handleClearForm = () => reset();

  const { handleSubmit } = useFormSubmit({
    onSuccess: () => {
      reset();
    },
  });

  const handleSubmitForm = async (data) => {
    await handleSubmit(() => InventoryService.update(data));
  };

  // check if user is authenticated, if not redirect to login page
  useEffect(() => {
    if (id) {
      InventoryService.find(+id)
        .then((response) => {
          if (response.result) {
            const inventory = {
              ...response.result,
              companyId: (response.result as any).company || response.result.companyId
            }
            reset(inventory);
          }
        })
        .catch((error) => {
          navigate("/app/inventory/list");
        });
    }

    InventoryService.getCompanies()
      .then(({ result }) => setCompanies(result || []))
      .catch(() => setCompanies([]));
  }, []);

  return (
    <div className="container-fluid">
      <PageHeading title="Edit Inventory" />

      <FormContainer formContext={formContext} onSuccess={handleSubmitForm}>
        <FormTextField
          name="trackingNumber"
          label="Tracking Number"
          rules={ValidationRules.text(undefined, 100, true)}
          sx={{ m: 1, width: 375 }}
        />
        
        <FormSelectField
          name="status"
          label="Status"
          options={statusList}
          rules={ValidationRules.select(true)}
          sx={{ m: 1, width: 375 }}
        />
        
        <FormSelectField
          name="type"
          label="Type"
          options={packages}
          rules={ValidationRules.select(true)}
          sx={{ m: 1, width: 375 }}
        />

        <FormSelectField
          name="companyId"
          label="Company"
          options={companies}
          rules={ValidationRules.select(true)}
          labelKey="name"
          sx={{ m: 1, width: 375 }}
        />
        
        <FormTextField
          name="location"
          label="Location"
          rules={ValidationRules.text(undefined, 50, false)}
          multiline
          sx={{ m: 1, width: 375 }}
        />
        
        <FormTextField
          name="length"
          label="Length"
          type="number"
          rules={ValidationRules.number(0, 9999, true)}
          sx={{ m: 1, width: 375 }}
        />

        <FormTextField
          name="width"
          label="Width"
          type="number"
          rules={ValidationRules.number(0, 9999, true)}
          sx={{ m: 1, width: 375 }}
        />

        <FormTextField
          name="height"
          label="Height"
          type="number"
          rules={ValidationRules.number(0, 9999, true)}
          sx={{ m: 1, width: 375 }}
        />

        <FormTextField
          name="weight"
          label="Weight"
          type="number"
          rules={ValidationRules.number(0, 99999, true)}
          sx={{ m: 1, width: 375 }}
        />

        <FormTextField
          name="notes"
          label="Notes"
          rules={ValidationRules.text(undefined, 254, false)}
          multiline
          rows={4}
          sx={{ m: 1, width: 375 }}
        />

        <FormActions onCancel={handleClearForm} />
      </FormContainer>
    </div>
  );
};

export default InventoryGeneral;
