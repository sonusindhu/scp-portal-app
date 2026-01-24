import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import InventoryService from "../../../services/inventory.service";
import HeaderWithTitle from "../../../shared/components/HeaderWithTitle";
import { useFormSubmit } from "../../../hooks";
import { Button } from "@/components/ui/button";
import { FormTextField, FormSelectField, FieldWidths, FormActions, FormContainer } from "../../../shared/components/FormFields";
import { ValidationRules } from "../../../utils/validation.util";

const AddInventory = (props) => {
  const [companies, setCompanies] = useState<any[]>([]);
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
      .then(({ result }) => setCompanies(result || []))
      .catch(() => setCompanies([]));
  }, []);

  return (
    <div className="form-container">
      <HeaderWithTitle title="Add Inventory" onCloseDrawer={onCloseDrawer} />

      <FormContainer
        formContext={formContext}
        onSuccess={handleSubmitForm}
      >
        <FormTextField
          name="trackingNumber"
          label="Tracking Number"
          rules={ValidationRules.text(undefined, 100, true)}
          className="m-2 w-full"
        />
        
        <FormSelectField
          name="status"
          label="Status"
          options={statusList}
          rules={ValidationRules.select(true)}
          className="m-2 w-full"
        />
        
        <FormSelectField
          name="type"
          label="Type"
          options={packages}
          rules={ValidationRules.select(true)}
          className="m-2 w-full"
        />

        <FormSelectField
          name="companyId"
          label="Company"
          options={companies}
          rules={ValidationRules.select(true)}
          labelKey="name"
          className="m-2 w-full"
        />
        
        <FormTextField
          name="location"
          label="Location"
          rules={ValidationRules.text(undefined, 50, false)}
          multiline
          className="m-2 w-full"
        />
        
        <FormTextField
          name="length"
          label="Length"
          type="number"
          rules={ValidationRules.number(0, 9999, true)}
          className="m-2 w-full"
        />

        <FormTextField
          name="width"
          label="Width"
          type="number"
          rules={ValidationRules.number(0, 9999, true)}
          className="m-2 w-full"
        />

        <FormTextField
          name="height"
          label="Height"
          type="number"
          rules={ValidationRules.number(0, 9999, true)}
          className="m-2 w-full"
        />

        <FormTextField
          name="weight"
          label="Weight"
          type="number"
          rules={ValidationRules.number(0, 99999, true)}
          className="m-2 w-full"
        />

        <FormTextField
          name="notes"
          label="Notes"
          rules={ValidationRules.text(undefined, 254, false)}
          multiline
          rows={4}
          className="m-2 w-full"
        />

        <div className="drawer-footer">
          <div style={{ marginLeft: "12px", marginTop: "15px" }}>
            <div className="flex flex-row gap-4">
              <Button
                type="submit"
                size="lg"
                variant="default"
              >
                Save
              </Button>
              <Button
                size="lg"
                variant="outline"
                type="button"
                onClick={onCloseDrawer}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      </FormContainer>
    </div>
  );
};

export default AddInventory;
