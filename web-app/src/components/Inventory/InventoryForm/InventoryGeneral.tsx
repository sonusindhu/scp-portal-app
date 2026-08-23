import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import InventoryService from "../../../services/inventory.service";
import { useNavigate, useParams } from "react-router-dom";
import PageHeading from "../../../shared/components/PageHeading/PageHeading";
import { useFormSubmit } from "../../../hooks";
import { FormTextField, FormSelectField, FieldWidths, FormActions, FormContainer } from "../../../shared/components/FormFields";
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
          if (response.data) {
            const inventory = {
              ...response.data,
              companyId: (response.data as any).company || response.data.companyId
            }
            reset(inventory);
          }
        })
        .catch((error) => {
          navigate("/app/inventory/list");
        });
    }

    InventoryService.getCompanies()
      .then(({ data }) => setCompanies(data || []))
      .catch(() => setCompanies([]));
  }, []);

  return (
    <div className="container-fluid">
      <PageHeading title="Edit Inventory" />

      <FormContainer formContext={formContext} onSuccess={handleSubmitForm}>
        <div className="grid grid-cols-4 gap-4">
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
            className="m-2 w-full col-span-4"
          />
        </div>

        <FormActions onCancel={handleClearForm} />
      </FormContainer>
    </div>
  );
};

export default InventoryGeneral;
