import React, { useEffect, useState } from "react";
import {
  FormContainer,
  TextFieldElement,
  SelectElement,
} from "react-hook-form-mui";
import { Button, Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import ContactService from "../../../services/contact.service";
import toast from "../../../utils/toast.util";
import { ResponseModel } from "../../../models/common.model";
import HeaderWithTitle from "../../../shared/components/HeaderWithTitle";

const AddContact = (props) => {
  const [companies, setCompanies] = useState([]);
  const [statusList] = useState(ContactService.CONST.statusList);

  const formContext = useForm({
    defaultValues: {},
  });
  const { reset } = formContext;
  const handleClearForm = () => reset();

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
    if (!e.email) return;
    const payload = { ...e };
    ContactService.create(payload)
      .then((response) => handleSuccess(response))
      .catch(({ response }) => toast.error(response.message));
  };

  useEffect(() => {
    ContactService.getCompanies()
      .then((companies) => {
        setCompanies(companies);
      })
      .catch(() => setCompanies([]));
  }, []);

  return (
    <Box sx={{ width: 450 }} className="form-container">
      <HeaderWithTitle title="Add Contact" onCloseDrawer={onCloseDrawer} />

      <FormContainer formContext={formContext} onSuccess={handleSubmitForm}>
        <TextFieldElement
          sx={{ m: 1, width: 410 }}
          required
          name={"firstName"}
          label="First Name"
          variant="outlined"
          margin={"dense"}
        />
        <TextFieldElement
          sx={{ m: 1, width: 410 }}
          required
          name={"lastName"}
          label="Last Name"
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
          options={statusList}
          name={"status"}
          label="Status"
          labelKey="title"
          valueKey="id"
        ></SelectElement>

        <SelectElement
          sx={{ m: 1, width: 410 }}
          required
          options={companies}
          name={"companyId"}
          label="Company"
          labelKey="name"
          valueKey="id"
        ></SelectElement>

        <TextFieldElement
          sx={{ m: 1, width: 410 }}
          required
          name={"department"}
          label="Department"
          variant="outlined"
          validation={{ maxLength: 20 }}
        />

        <TextFieldElement
          sx={{ m: 1, width: 410 }}
          required
          name={"jobTitle"}
          label="Job Title"
          variant="outlined"
          validation={{ maxLength: 50 }}
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

export default AddContact;
