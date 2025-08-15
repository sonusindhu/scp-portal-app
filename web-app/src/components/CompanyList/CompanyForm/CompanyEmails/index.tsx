import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EmailListView from "../../../../shared/components/Emails/EmailListView";
import EmailForm from "../../../../shared/components/Emails/EmailForm";
import { Email } from "../../../../shared/models/Email";
import EmailService from "../../../../services/email.service";

const CompanyEmails = () => {
  let { id } = useParams();
  let [emails, setEmails] = useState<Email[]>([]);
  let [email, setEmail] = useState<Partial<Email>>({
    type: "company",
    companyId: id ? +id : undefined,
  });

  const onSuccess = (event: Email) => {
    const email = [event];
    setEmails([...email, ...emails]);
  };

  useEffect(() => {
    if (id) {
      EmailService.get({
        companyId: id,
        // type: "company",
      }).then((response) => setEmails(response.result));
    }
  }, []);

  return (
    <div className="grid-container">
      <div className="grid-form-column">
        <EmailForm email={email} onSuccess={onSuccess} />
      </div>

      <div className="grid-list-column">
        <EmailListView emails={emails} />
      </div>
    </div>
  );
};

export default CompanyEmails;
