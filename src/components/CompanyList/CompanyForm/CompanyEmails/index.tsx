import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import QuoteService from "../../../../services/quote.service";
import EmailList from "../../../../shared/components/Emails/EmailList";
import { Grid } from "@material-ui/core";
import EmailForm from "../../../../shared/components/Emails/EmailForm";
import { Email } from "../../../../shared/models/Email";

const CompanyEmails = () => {
  let { id } = useParams();
  let [emails, setEmails] = useState<Email[]>([]);
  let [email, setEmail] = useState<Partial<Email>>({});

  const onSuccess = (event: Email) => {
    const email = [event];
    setEmails([...email, ...emails]);
  };

  useEffect(() => {
    if(id){
      QuoteService.getEmails(+id).then((response: Email[]) => setEmails(response));
    }
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

export default CompanyEmails;
