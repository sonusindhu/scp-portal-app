import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import QuoteService from "../../../../services/quote.service";
import EmailList from "../../../../shared/components/Emails/EmailList";
import { Grid } from "@material-ui/core";
import EmailForm from "../../../../shared/components/Emails/EmailForm";

const QuoteEmails = () => {
  let { id } = useParams();
  let [emails, setEmails] = useState<any[]>([]);
  const email = {};

  const onSuccess = (event) => {
    const email = [event];
    setEmails([...email, ...emails]);
  };

  useEffect(() => {
    QuoteService.getEmails(id)
      .then((response) => {
        setEmails(response);
      });
  }, []);

  return (
    <Grid container spacing={2}>
      
      <Grid item xs={4}>        
        <EmailForm email={email} onSuccess={onSuccess} />
      `</Grid>

      <Grid item xs={8}>
        <EmailList emails={emails} />
      </Grid>

    </Grid>
  );
};

export default QuoteEmails;
