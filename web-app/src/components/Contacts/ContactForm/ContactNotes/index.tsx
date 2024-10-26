import React from "react";
import { useParams } from "react-router-dom";
import NotesCardView from "../../../../shared/components/Notes/NotesList/NotesCardView";
import { Grid } from "@material-ui/core";

const ContactNotes = () => {
  let { id } = useParams();
  const options = {
    type: "contact",
    contactId: id,
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <NotesCardView options={options} />
      </Grid>
    </Grid>
  );
};

export default ContactNotes;
