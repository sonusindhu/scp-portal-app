import React from "react";
import {
  FormContainer,
  TextFieldElement,
  CheckboxElement,
} from "react-hook-form-mui";
import { useForm } from "react-hook-form";
import { FormActions } from "../FormFields";
import toast from "../../../utils/toast.util";
import { Note } from "../../models/Note";
import NoteService from "../../../services/note.service";

import HeaderWithTitle from "../HeaderWithTitle";
import { ValidationRules } from "../../../utils/validation.util";
import { useFormSubmit } from "../../../hooks";

interface NoteProps {
  id?: number;
  note: Note | any;
  onSuccess: Function;
  onCloseDrawer: Function;
}

const NoteForm = (props: NoteProps) => {
  const note: Note = props.note;
  const formContext = useForm({ defaultValues: note });

  const { reset } = formContext;

  const onCloseDrawer = () => {
    props.onCloseDrawer && props.onCloseDrawer();
  };

  const { handleSubmit: handleFormSubmit } = useFormSubmit({
    onSuccess: (response) => {
      reset({
        isCritical: false,
        title: "",
        message: "",
        type: note?.type,
        companyId: note?.companyId,
      });
      props.onSuccess(response?.result);
    },
  });

  const handleClearForm = () => {
    reset();
    onCloseDrawer();
  };

  const handleSubmitForm = async (data) => {
    if (!data.title || !data.message) return;
    const payload = {
      ...data,
      isCritical: data.isCritical || false,
      id: props.id,
      type: note?.type,
      companyId: note?.companyId,
    };
    await handleFormSubmit(() => NoteService.create(payload));
  };

  return (
    <div style={{ width: 400 }}>
      <HeaderWithTitle title="Add Note" onCloseDrawer={onCloseDrawer} />

      <FormContainer
        formContext={formContext}
        onSuccess={handleSubmitForm}
      >
        <h3 style={{ marginLeft: "10px" }}>New Note</h3>
        <div>
          <TextFieldElement
            className="m-2 w-[96%]"
            name={"title"}
            label="Note Title"
            variant="outlined"
            rules={ValidationRules.text(undefined, 100, true)}
          />
        </div>
        <div>
          <TextFieldElement
            className="m-2 w-[96%]"
            name={"message"}
            label="Note Description"
            variant="outlined"
            rules={ValidationRules.text(undefined, 1000, true)}
            multiline={true}
            rows={7}
          />
        </div>
        <div style={{ marginLeft: "10px" }}>
          <CheckboxElement
            className="m-2"
            name={"isCritical"}
            label="Mark Critical"
          />
        </div>

        <FormActions onCancel={handleClearForm} />
      </FormContainer>
    </div>
  );
};

export default NoteForm;
