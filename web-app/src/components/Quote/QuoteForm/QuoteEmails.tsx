import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EmailListView from "../../../shared/components/Emails/EmailListView";
import { Grid } from "@material-ui/core";
import EmailForm from "../../../shared/components/Emails/EmailForm";
import { Email } from "../../../shared/models/Email";
import EmailService from "../../../services/email.service";

const QuoteEmails = () => {
  let { id } = useParams();
  let [emails, setEmails] = useState<Email[]>([]);
  let [email, setEmail] = useState<Partial<Email>>({
    type: "quote",
    quoteId: id ? +id : undefined,
  });

  const onSuccess = (event: Email) => {
    const email = [event];
    setEmails([...email, ...emails]);
  };

  useEffect(() => {
    if (id) {
      EmailService.get({ quoteId: id }).then((response) =>
        setEmails(response.result)
      );
    }
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <EmailForm email={email} onSuccess={onSuccess} />`
      </Grid>

      <Grid item xs={8}>
        <EmailListView emails={emails} />
      </Grid>
    </Grid>
  );
};

export default QuoteEmails;
