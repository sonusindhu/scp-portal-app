import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NotesList from "../../../../shared/components/Notes/NotesList";
import { Grid } from "@material-ui/core";
import NoteForm from "../../../../shared/components/Notes/NoteForm";
import { Note } from "../../../../shared/models/Note";
import NoteService from "../../../../services/note.service";

const CompanyNotes = () => {
  let { id } = useParams();
  let [notes, setNotes] = useState<Note[]>([]);
  const note = {
    type: 'company',
    companyId: id
  };

  const onSuccess = (event: Note) => {
    const note = [event];
    setNotes([...note, ...notes]);
  };

  useEffect(() => {
    if (id) {
      NoteService.get({
        companyId: +id,
        type: "company",
      }).then((response) => {
        setNotes(response.result);
      });
    }
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <NoteForm note={note} onSuccess={onSuccess} />`
      </Grid>

      <Grid item xs={8}>
        <NotesList notes={notes} />
      </Grid>
    </Grid>
  );
};

export default CompanyNotes;
