import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EmailListView from "../../../shared/components/Emails/EmailListView";
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
      EmailService.list({ quoteId: id }).then((response) =>
        setEmails(response.result || [])
      );
    }
  }, []);

  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-4">
        <EmailForm email={email} onSuccess={onSuccess} />
      </div>

      <div className="col-span-8">
        <EmailListView emails={emails} />
      </div>
    </div>
  );
};

export default QuoteEmails;
