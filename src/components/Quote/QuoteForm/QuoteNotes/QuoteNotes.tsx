import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import QuoteService from "../../../../services/quote.service";
import NotesList from "../../../../shared/components/NotesList";
import { Grid } from "@material-ui/core";
import NoteForm from "../../../../shared/components/NoteForm";

const QuoteNotes = () => {
  let { id } = useParams();
  let [notes, setNotes] = useState<any[]>([]);
  const note = {};

  const onSuccess = (event) => {
    const note = [event];
    setNotes([...note, ...notes]);
  };

  useEffect(() => {
    QuoteService.getNotes(id)
      .then((response) => {
        setNotes(response);
      });
  }, []);

  return (
    <Grid container spacing={2}>
      
      <Grid item xs={4}>        
        <NoteForm note={note} onSuccess={onSuccess} />
      `</Grid>

      <Grid item xs={8}>
        <NotesList notes={notes} />
      </Grid>

    </Grid>
  );
};

export default QuoteNotes;
