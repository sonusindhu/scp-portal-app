import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import {
  FormContainer,
  TextFieldElement,
  SelectElement,
} from "react-hook-form-mui";

import CompanyService from "../../services/company.service";
import toast from "../../utils/toast.util";
import PageHeading from "../../shared/components/PageHeading/PageHeading";
import { ResponseModel } from "../../models/common.model";

const EditCompany = () => {
  let { id } = useParams();
  const navigate = useNavigate();
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
    if (!e.email || !e.name) return;
    const payload = { ...e };
    CompanyService.update(payload)
      .then((response) => handleSuccess(response))
      .catch(({ response }) => toast.error(response.data));
  };

  useEffect(() => {
    CompanyService.find(id)
      .then((response) => {
        reset(response.result);
      })
      .catch((error) => {
        navigate("/app/company/list");
      });
  }, []);

  return (
    <div className="container-fluid">
      <PageHeading title="Edit Company" />

      <FormContainer formContext={formContext} onSuccess={handleSubmitForm}>
        <div>
          <TextFieldElement
            sx={{ m: 1.1, width: "31%" }}
            required
            name={"name"}
            label="Name"
            variant="outlined"
            margin={"dense"}
          />
          <TextFieldElement
            sx={{ m: 1.1, width: "31%" }}
            required
            type={"email"}
            name={"email"}
            label="Email"
            margin={"dense"}
            variant="outlined"
          />

          <SelectElement
            sx={{ m: 1.1, width: "31%" }}
            required
            options={[
              {
                id: "",
                title: "Select",
              },
              {
                id: "active",
                title: "active",
              },
              {
                id: "active",
                title: "Inactive",
              },
            ]}
            name={"status"}
            label="Status"
          ></SelectElement>
        </div>

        <div>
          <SelectElement
            sx={{ m: 1.1, width: "31%" }}
            required
            options={[
              {
                id: "",
                title: "Select",
              },
              {
                id: "customer",
                title: "Customer",
              },
              {
                id: "carrier",
                title: "Carrier",
              },
            ]}
            name={"type"}
            label="Type"
          ></SelectElement>

          <TextFieldElement
            sx={{ m: 1.1, width: "31%" }}
            required
            name={"revenue"}
            label="Revenue"
            variant="outlined"
            validation={{ maxLength: 10 }}
            type={"number"}
          />

          <TextFieldElement
            sx={{ m: 1.1, width: "31%" }}
            required
            name={"employeesCount"}
            label="Employees Count"
            variant="outlined"
            validation={{ maxLength: 5 }}
            type={"number"}
          />
        </div>
        <div>
          <TextFieldElement
            sx={{ m: 1.1, width: "31%" }}
            required
            name={"address1"}
            label="Address1"
            variant="outlined"
          />

          <TextFieldElement
            sx={{ m: 1.1, width: "31%" }}
            name={"address2"}
            label="Address2"
            variant="outlined"
          />

          <TextFieldElement
            sx={{ m: 1.1, width: "31%" }}
            required
            name={"city"}
            label="City"
            variant="outlined"
          />
        </div>
        <div>
          <TextFieldElement
            sx={{ m: 1.1, width: "31%" }}
            required
            name={"state"}
            label="State"
            variant="outlined"
          />

          <TextFieldElement
            sx={{ m: 1.1, width: "31%" }}
            required
            name={"country"}
            label="Country"
            variant="outlined"
          />

          <TextFieldElement
            sx={{ m: 1.1, width: "31%" }}
            required
            name={"zipcode"}
            label="Zipcode"
            variant="outlined"
          />
        </div>

        <div>
          <TextFieldElement
            sx={{ m: 1.1, width: "31%" }}
            required
            name={"phone"}
            label="Phone"
            validation={{ maxLength: 15, minLength: 8 }}
            variant="outlined"
          />

          <TextFieldElement
            sx={{ m: 1.1, width: "31%" }}
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

export default EditCompany;
