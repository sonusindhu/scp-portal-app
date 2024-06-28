import React, { useEffect, useState } from "react";
import {
  FormContainer,
  TextFieldElement,
  SelectElement,
} from "react-hook-form-mui";
import { Button, Stack } from "@mui/material";
import { useForm } from "react-hook-form";

import ContactService from "../../services/contact.service";
import PageHeading from "../../shared/components/PageHeading/PageHeading";
import toast from "../../utils/toast.util";
import { ResponseModel } from "../../models/common.model";

const AddContact = () => {
  const [companies, setCompanies] = useState([]);
  const [statusList] = useState(ContactService.CONST.statusList);

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
  }

  const handleSubmitForm = (e) => {
    if (!e.email) return;
    const payload = { ...e };
    ContactService.create(payload)
      .then((response) => handleSuccess(response))
      .catch(({ response }) => toast.error(response.message));
  };

  useEffect(() => {
    ContactService.getCompanies()
      .then(({ result }) => setCompanies(result))
      .catch(() => setCompanies([]));
  }, []);

  return (
    <div className="container-fluid">
      <PageHeading title="Add Contact" />

      <FormContainer formContext={formContext} onSuccess={handleSubmitForm}>
        <div>
          <TextFieldElement
            sx={{ m: 1, width: "52ch" }}
            required
            name={"firstName"}
            label="First Name"
            variant="outlined"
            margin={"dense"}
          />
          <TextFieldElement
            sx={{ m: 1, width: "52ch" }}
            required
            name={"lastName"}
            label="Last Name"
            variant="outlined"
            margin={"dense"}
          />
          <TextFieldElement
            sx={{ m: 1, width: "52ch" }}
            required
            type={"email"}
            name={"email"}
            label="Email"
            margin={"dense"}
            variant="outlined"
          />
        </div>

        <div>
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
            options={companies}
            name={"companyId"}
            label="Company"
            labelKey="name"
          ></SelectElement>

          <TextFieldElement
            sx={{ m: 1, width: "52ch" }}
            required
            name={"department"}
            label="Department"
            variant="outlined"
            validation={{ maxLength: 20 }}
          />
        </div>
        <div>
          <TextFieldElement
            sx={{ m: 1, width: "52ch" }}
            required
            name={"jobTitle"}
            label="Job Title"
            variant="outlined"
            validation={{ maxLength: 50 }}
          />

          <TextFieldElement
            sx={{ m: 1, width: "52ch" }}
            required
            name={"address1"}
            label="Address1"
            variant="outlined"
          />

          <TextFieldElement
            sx={{ m: 1, width: "52ch" }}
            name={"address2"}
            label="Address2"
            variant="outlined"
          />
        </div>
        <div>
          <TextFieldElement
            sx={{ m: 1, width: "52ch" }}
            required
            name={"city"}
            label="City"
            variant="outlined"
          />
          <TextFieldElement
            sx={{ m: 1, width: "52ch" }}
            required
            name={"state"}
            label="State"
            variant="outlined"
          />

          <TextFieldElement
            sx={{ m: 1, width: "52ch" }}
            required
            name={"country"}
            label="Country"
            variant="outlined"
          />
        </div>

        <div>
          <TextFieldElement
            sx={{ m: 1, width: "52ch" }}
            required
            name={"zipcode"}
            label="Zipcode"
            variant="outlined"
          />

          <TextFieldElement
            sx={{ m: 1, width: "52ch" }}
            required
            name={"phone"}
            label="Phone"
            validation={{ maxLength: 15, minLength: 8 }}
            variant="outlined"
          />

          <TextFieldElement
            sx={{ m: 1, width: "52ch" }}
            name={"extension"}
            label="Extension"
            validation={{ maxLength: 6 }}
            type={"number"}
            variant="outlined"
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
          </Stack>
        </div>
      </FormContainer>
    </div>
  );
};

export default AddContact;
