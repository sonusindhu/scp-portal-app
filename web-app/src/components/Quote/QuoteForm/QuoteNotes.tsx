import React from "react";
import { useParams } from "react-router-dom";
import NotesCardView from "../../../shared/components/Notes/NotesCardView";
import { Grid } from "@mui/material";

const QuoteNotes = () => {
  let { id } = useParams();
  const options = {
    type: "quote",
    quoteId: id,
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <NotesCardView options={options} />
      </Grid>
    </Grid>
  );
};

export default QuoteNotes;
