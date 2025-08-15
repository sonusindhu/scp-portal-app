import React, { useEffect, useState } from "react";
import { Button, Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import {
  FormContainer,
  TextFieldElement,
  SelectElement,
} from "react-hook-form-mui";
import toast from "../../../utils/toast.util";
import InventoryService from "../../../services/inventory.service";
import { ResponseModel } from "../../../models/common.model";
import { useNavigate, useParams } from "react-router-dom";
import PageHeading from "../../../shared/components/PageHeading/PageHeading";

const InventoryGeneral = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const [companies, setCompanies] = useState([]);
  const [statusList] = useState(InventoryService.data.statusList);
  const [packages] = useState(InventoryService.data.packages);

  const formContext = useForm({
    defaultValues: {},
  });
  const { reset } = formContext;
  const handleClearForm = () => reset();

  const handleSuccess = (response: ResponseModel) => {
    if (response.status) {
      toast.success(response.message);
      reset();
    } else {
      toast.error(response.message);
    }
  };

  const handleSubmitForm = (e) => {
    if (!formContext.formState.isValid) return;

    const payload = { ...e };
    InventoryService.update(payload)
      .then((response) => handleSuccess(response))
      .catch(({ message }) => toast.error(message));
  };

  // check if user is authenticated, if not redirect to login page
  useEffect(() => {
    if (id) {
      InventoryService.find(+id)
        .then((response) => {
          const inventory = {
            ...response.result,
            companyId: response.result.company
          }
          reset(inventory);
        })
        .catch((error) => {
          navigate("/app/inventory/list");
        });
    }

    InventoryService.getCompanies()
      .then(({ result }) => setCompanies(result))
      .catch(() => setCompanies([]));
  }, []);

  return (
    <div className="container-fluid">
      <PageHeading title="Edit Inventory" />

      <FormContainer formContext={formContext} onSuccess={handleSubmitForm}>
        <TextFieldElement
          sx={{ m: 1, width: 375 }}
          required
          name={"trackingNumber"}
          label="Tracking Number"
          variant="outlined"
          margin={"dense"}
        />
        <SelectElement
          sx={{ m: 1, width: 375 }}
          required
          options={statusList}
          name={"status"}
          label="Status"
        ></SelectElement>
        <SelectElement
          sx={{ m: 1, width: 375 }}
          required
          options={packages}
          name={"type"}
          label="Type"
        ></SelectElement>

        <SelectElement
          sx={{ m: 1, width: 375 }}
          required
          options={companies}
          name={"companyId"}
          label="Company"
          labelKey="name"
        ></SelectElement>
        <TextFieldElement
          sx={{ m: 1, width: 375 }}
          name={"location"}
          label="Location"
          variant="outlined"
          validation={{ maxLength: 50 }}
          multiline={true}
        />
        <TextFieldElement
          sx={{ m: 1, width: 375 }}
          required
          name={"length"}
          label="Length"
          variant="outlined"
          validation={{ maxLength: 7 }}
        />

        <TextFieldElement
          sx={{ m: 1, width: 375 }}
          required
          name={"width"}
          label="Width"
          variant="outlined"
          validation={{ maxLength: 7 }}
        />

        <TextFieldElement
          sx={{ m: 1, width: 375 }}
          required
          name={"height"}
          label="Height"
          variant="outlined"
          validation={{ maxLength: 7 }}
        />

        <TextFieldElement
          required
          sx={{ m: 1, width: 375 }}
          name={"weight"}
          label="Weight"
          variant="outlined"
          validation={{ maxLength: 8 }}
        />

        <TextFieldElement
          sx={{ m: 1, width: 375 }}
          name={"notes"}
          label="Notes"
          variant="outlined"
          validation={{ maxLength: 254 }}
          multiline={true}
          rows={4}
        />

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
          </Stack>
        </div>
      </FormContainer>
    </div>
  );
};

export default InventoryGeneral;
