import { Button } from "@material-ui/core";
import { Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FormContainer, SelectElement, TextFieldElement } from "react-hook-form-mui";
import { useNavigate, useParams } from "react-router-dom";
import QuoteService from "../../../services/quote.service";

import IconButton from '@mui/material/IconButton';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import RemoveCircleOutlinedIcon from '@mui/icons-material/RemoveCircleOutlined';

import toast from "../../../utils/toast.util";

const QuoteDetails = () => {  

  let { id } = useParams<any>();
  const navigate = useNavigate();
  const [companies, setCompanies] = useState([]);

  const formContext = useForm({
    defaultValues: {},
  });
  const { reset } = formContext;
  const handleClearForm = () => reset();

  const handleSubmitForm = (e) => {
    if (!e.email || !e.fullName) return;
    const payload = { ...e };
    QuoteService.update(payload)
      .then((response) => {
        if (response.status) {
          toast.success(response.message);
          reset(response.result);
        } else {
          toast.error(response.message);
        }
      })
      .catch(({ response }) => {
        toast.error(response.data);
      });
  };

  const statusList = [
    {
      id: "",
      title: "Select",
    },
    {
      id: "active",
      title: "Active",
    },
    {
      id: "inactive",
      title: "Inactive",
    },
  ];
  const hazmatList = [
    {
      id: "",
      title: "Select",
    },
    {
      id: 0,
      title: "Yes",
    },
    {
      id: 1,
      title: "No",
    },
  ];

  // check if user is authenticated, if not redirect to login page
  useEffect(() => {
    console.log(id);
    QuoteService.find(id)
      .then(({ result }) => {
        reset(result);
      })
      .catch((error) => {
        console.log(error)
        // navigate("/app/quote/list");
      });
  }, []);

  return (
    <div className="container-fluid">
      <FormContainer formContext={formContext} onSuccess={handleSubmitForm}>
        {/* Cargo Details Start */}
        <h3>Cargo Details</h3>
        <div>
          <SelectElement
            sx={{ m: 1, width: "20ch" }}
            required
            options={hazmatList}
            name={"equipmentId"}
            label="Equipment"
          ></SelectElement>
          <SelectElement
            sx={{ m: 1, width: "20ch" }}
            required
            options={hazmatList}
            name={"commodityId"}
            label="Commodity"
          ></SelectElement>

          <TextFieldElement
            sx={{ m: 1, }}
            required
            name={"weight"}
            label="Weight"
            variant="outlined"
            margin={"dense"}
          />
          <TextFieldElement
            sx={{ m: 1, }}
            required
            name={"cargoValue"}
            label="Cargo Value"
            variant="outlined"
            margin={"dense"}
          />
          <TextFieldElement
            sx={{ m: 1, }}
            name={"temperature"}
            label="Temperature"
            margin={"dense"}
            variant="outlined"
          />
          <TextFieldElement
            sx={{ m: 1, }}
            name={"pieces"}
            label="Pieces"
            margin={"dense"}
            variant="outlined"
          />
        
          <SelectElement
            sx={{ m: 1, width: "20ch" }}
            required
            options={hazmatList}
            name={"cargoTypeId"}
            label="Cargo Type"
          ></SelectElement>
          
          <SelectElement
            sx={{ m: 1, width: "20ch" }}
            required
            options={hazmatList}
            name={"isHazmat"}
            label="Hazmat"
          ></SelectElement>

          
          <TextFieldElement
            sx={{ m: 1 }}
            required
            name={"hazmatName"}
            label="Hazmat Name"
            variant="outlined"
            validation={{ maxLength: 20 }}
          />
          <TextFieldElement
            sx={{ m: 1 }}
            required
            name={"hazmatClass"}
            label="Hazmat Class"
            variant="outlined"
            validation={{ maxLength: 20 }}
          />
          <TextFieldElement
            sx={{ m: 1 }}
            required
            name={"hazmatUN"}
            label="Hazmat UN"
            variant="outlined"
            validation={{ maxLength: 20 }}
          />
        </div>
        {/* Cargo Details End */}

        {/* Routing Details Start */}
        <h3>Routing Details</h3>
        <div>
          <TextFieldElement
            sx={{ m: 0.9, }}
            name={"abc"}
            label="Origin"
            disabled={true}
            variant="outlined"
            margin={"dense"}
          />
          <TextFieldElement
            sx={{ m: 0.9, }}
            required
            name={"city"}
            label="City"
            variant="outlined"
            margin={"dense"}
          />
          <TextFieldElement
            sx={{ m: 0.9, }}
            required
            name={"zipcode"}
            label="Zipcode"
            margin={"dense"}
            variant="outlined"
          />
          <TextFieldElement
            sx={{ m: 0.9, }}
            required
            name={"state"}
            label="State"
            margin={"dense"}
            variant="outlined"
          />
          <TextFieldElement
            sx={{ m: 0.9, }}
            required
            name={"country"}
            label="Country"
            margin={"dense"}
            variant="outlined"
          />
          {/* <TextFieldElement
            sx={{ m: 0.9, }}
            name={"Miles"}
            label="Miles"
            margin={"dense"}
            variant="outlined"
          /> */}
        </div>
        <div>
          <TextFieldElement
            sx={{ m: 0.9, }}
            name={"abc"}
            label="Destination"
            disabled={true}
            variant="outlined"
            margin={"dense"}
          />
          <TextFieldElement
            sx={{ m: 0.9, }}
            required
            name={"city"}
            label="City"
            variant="outlined"
            margin={"dense"}
          />
          <TextFieldElement
            sx={{ m: 0.9, }}
            required
            name={"zipcode"}
            label="Zipcode"
            margin={"dense"}
            variant="outlined"
          />
          <TextFieldElement
            sx={{ m: 0.9, }}
            required
            name={"state"}
            label="State"
            margin={"dense"}
            variant="outlined"
          />
          <TextFieldElement
            sx={{ m: 0.9, }}
            required
            name={"country"}
            label="Country"
            margin={"dense"}
            variant="outlined"
          />
          {/* <TextFieldElement
            sx={{ m: 0.9, }}
            name={"Miles"}
            label="Miles"
            margin={"dense"}
            variant="outlined"
          /> */}
        </div>
        {/* Routing Details End */}
        
        {/* Accessorials Details Start */}
        <h3>Accessorials Details</h3>
        <div>
          <TextFieldElement
            sx={{ m: 0.9, }}
            required
            name={"name"}
            label="Name"
            variant="outlined"
            margin={"dense"}
          />
          <TextFieldElement
            sx={{ m: 0.9, }}
            required
            name={"quantity"}
            label="Quantity"
            variant="outlined"
            margin={"dense"}
          />
          <TextFieldElement
            sx={{ m: 0.9, }}
            required
            name={"rate"}
            label="Rate"
            margin={"dense"}
            variant="outlined"
          />
          <TextFieldElement
            sx={{ m: 0.9, }}
            disabled={true}
            name={"totalRate"}
            label="Total Rate"
            margin={"dense"}
            variant="outlined"
          />

          <IconButton color="primary" size="large" aria-label="Add Accessorial">
            <AddCircleOutlinedIcon fontSize="large" />
          </IconButton>
          
          <IconButton color="primary" size="large" aria-label="Add Accessorial">
            <RemoveCircleOutlinedIcon fontSize="large" />
          </IconButton>
        </div>
        
        {/* Accessorials Details End */}

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

export default QuoteDetails;
