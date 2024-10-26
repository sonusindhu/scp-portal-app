import React, { useEffect, useState } from "react";
import {
  FormContainer,
  TextFieldElement,
  SelectElement,
} from "react-hook-form-mui";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Stack } from "@mui/material";
import { useForm } from "react-hook-form";

import ContactService from "../../../../services/contact.service";
import PageHeading from "../../../../shared/components/PageHeading/PageHeading";
import toast from "../../../../utils/toast.util";
import { ResponseModel } from "../../../../models/common.model";

const ContactGeneral = () => {
  let { id } = useParams();
  const navigate = useNavigate();
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
      reset(response.result);
    } else {
      toast.error(response.message);
    }
  }

  const handleSubmitForm = (e) => {
    if (!e.email || !e.fullName) return;
    const payload = { ...e };
    ContactService.update(payload)
      .then((response) => handleSuccess(response))
      .catch(({ response }) => {
        toast.error(response.data);
      });
  };

  const getCompanies = async () => {
    const result = await ContactService.getCompanies();
    setCompanies(result);
  }

  // check if user is authenticated, if not redirect to login page
  useEffect(() => {    
    getCompanies();
    if (id) {
      ContactService.find(+id)
        .then(({ result }) =>  reset(result))
        .catch(() => navigate("/app/contact/list"));
    }
  }, []);

  return (
    <div className="container-fluid">
      <PageHeading title="Edit Contact" />

      <FormContainer formContext={formContext} onSuccess={handleSubmitForm}>
        <div>
          <TextFieldElement
            sx={{ m: 1, width: "31%" }}
            required
            name={"firstName"}
            label="First Name"
            variant="outlined"
            margin={"dense"}
          />
          <TextFieldElement
            sx={{ m: 1, width: "31%" }}
            required
            name={"lastName"}
            label="Last Name"
            variant="outlined"
            margin={"dense"}
          />
          <TextFieldElement
            sx={{ m: 1, width: "31%" }}
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
            sx={{ m: 1, width: "31%" }}
            required
            options={statusList}
            name={"status"}
            label="Status"
          ></SelectElement>

          <SelectElement
            sx={{ m: 1, width: "31%" }}
            required
            options={companies}
            name={"companyId"}
            label="Company"
            labelKey="name"
          ></SelectElement>

          <TextFieldElement
            sx={{ m: 1, width: "31%" }}
            required
            name={"department"}
            label="Department"
            variant="outlined"
            validation={{ maxLength: 20 }}
          />
        </div>
        <div>
          <TextFieldElement
            sx={{ m: 1, width: "31%" }}
            required
            name={"jobTitle"}
            label="Job Title"
            variant="outlined"
            validation={{ maxLength: 50 }}
          />

          <TextFieldElement
            sx={{ m: 1, width: "31%" }}
            required
            name={"address1"}
            label="Address1"
            variant="outlined"
          />

          <TextFieldElement
            sx={{ m: 1, width: "31%" }}
            name={"address2"}
            label="Address2"
            variant="outlined"
          />
        </div>
        <div>
          <TextFieldElement
            sx={{ m: 1, width: "31%" }}
            required
            name={"city"}
            label="City"
            variant="outlined"
          />
          <TextFieldElement
            sx={{ m: 1, width: "31%" }}
            required
            name={"state"}
            label="State"
            variant="outlined"
          />

          <TextFieldElement
            sx={{ m: 1, width: "31%" }}
            required
            name={"country"}
            label="Country"
            variant="outlined"
          />
        </div>

        <div>
          <TextFieldElement
            sx={{ m: 1, width: "31%" }}
            required
            name={"zipcode"}
            label="Zipcode"
            variant="outlined"
          />

          <TextFieldElement
            sx={{ m: 1, width: "31%" }}
            required
            name={"phone"}
            label="Phone"
            validation={{ maxLength: 15, minLength: 8 }}
            variant="outlined"
          />

          <TextFieldElement
            sx={{ m: 1, width: "31%" }}
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

export default ContactGeneral;
