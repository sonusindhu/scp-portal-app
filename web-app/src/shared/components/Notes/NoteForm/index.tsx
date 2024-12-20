import React from "react";
import {
  FormContainer,
  TextFieldElement,
  CheckboxElement,
} from "react-hook-form-mui";
import { useParams } from "react-router-dom";
import { Button, Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import CancelIcon from "@mui/icons-material/Cancel";
import toast from "../../../../utils/toast.util";
import { Note } from "../../../models/Note";
import NoteService from "../../../../services/note.service";
import { AppBar, Box, Toolbar, Typography } from "@material-ui/core";

interface NoteProps {
  id?: number;
  note: Note | any;
  onSuccess: Function;
  onCloseDrawer: Function;
}

const NoteForm = (props: NoteProps) => {
  let { id } = useParams();
  const note: Note = props.note;
  const formContext = useForm({ defaultValues: note });

  const { handleSubmit, reset } = formContext;

  const handleClearForm = () => {
    reset();
    onCloseDrawer();
  };

  const handleSubmitForm = (e) => {
    if (!e.title || !e.message) return;
    const payload = {
      ...e,
      isCritical: e.isCritical || false,
      id: props.id,
      type: note?.type,
      companyId: note?.companyId,
    };
    NoteService.create(payload)
      .then((response) => {
        if (response.status) {
          toast.success(response.message);
          reset({
            isCritical: false,
            title: "",
            message: "",
            type: note?.type,
            companyId: note?.companyId,
          });
          props.onSuccess(response.result);
        } else {
          toast.error(response.message);
        }
      })
      .catch(({ response }) => {
        toast.error(response.message);
      });
  };

  const onCloseDrawer = () => {
    props.onCloseDrawer && props.onCloseDrawer();
  };

  return (
    <Box sx={{ width: 400 }}>
      <AppBar position="absolute" className="drawer-header">
        <Toolbar>
          <Box sx={{ width: 335 }}>
            <Typography variant="inherit" color="inherit" noWrap>
              Add Quote
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 0 }} className="close-icon">
            <CancelIcon onClick={onCloseDrawer} />
          </Box>
        </Toolbar>
      </AppBar>
      <FormContainer
        formContext={formContext}
        onSuccess={handleSubmit(handleSubmitForm)}
      >
        <h3 style={{ marginLeft: "10px" }}>New Note</h3>
        <div>
          <TextFieldElement
            sx={{ m: 1, minWidth: "96%" }}
            required={true}
            name={"title"}
            label="Note Title"
            variant="outlined"
            validation={{ maxLength: 100 }}
          />
        </div>
        <div>
          <TextFieldElement
            sx={{ m: 1, minWidth: "96%" }}
            required={true}
            name={"message"}
            label="Note Description"
            variant="outlined"
            validation={{ maxLength: 1000 }}
            multiline={true}
            rows={7}
          />
        </div>
        <div style={{ marginLeft: "10px" }}>
          <CheckboxElement
            sx={{ m: 1 }}
            name={"isCritical"}
            label="Mark Critical"
          />
        </div>

        <div style={{ marginLeft: "12px", marginTop: "15px" }}>
          <Stack direction="row" spacing={2}>
            <Button type={"submit"} size="large" variant="contained">
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
    </Box>
  );
};

export default NoteForm;
