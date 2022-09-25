import React, { useEffect, useState } from "react";
import { Button, Stack } from "@mui/material";
import { useForm } from "react-hook-form";

import {
  FormContainer,
  TextFieldElement,
  SelectElement,
} from "react-hook-form-mui";
import PageHeading from "../../shared/components/PageHeading";
import toast from "../../utils/toast.util";
import InventoryService from "../../services/inventory.service";

const AddContact = () => {
  const [companies, setCompanies] = useState([]);
  const [statusList] = useState(InventoryService.data.statusList);
  const [packages] = useState(InventoryService.data.packages);

  const formContext = useForm({
    defaultValues: {},
  });
  const { reset } = formContext;

  const handleSubmitForm = (e) => {
    const payload = { ...e };
    InventoryService.create(payload)
      .then((response) => {
        if (response.status) {
          toast.success(response.message);
          reset();
        } else {
          toast.error(response.message);
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  // check if user is authenticated, if not redirect to login page
  useEffect(() => {
    InventoryService.getCompanies()
      .then(({ result }) => {
        setCompanies(result);
      })
      .catch((error) => {
        setCompanies([]);
      });
  }, []);

  return (
    <div className="container-fluid">
      <PageHeading title="Add Inventory" />

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
            multiline={true}
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
            multiline={true}
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
              onClick={reset}
            >
              Cancel
            </Button>
          </Stack>
        </div>
      </FormContainer>
    </div>
  );
};

export default AddContact;
