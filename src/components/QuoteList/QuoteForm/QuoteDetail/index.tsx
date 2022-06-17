import { CircularProgress } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import QuoteService from "../../../../services/quote.service";
import QuoteEdit from "./QuoteEdit";

const QuoteDetails = () => {  

  let { id } = useParams<any>();
  const navigate = useNavigate();
  const [quote, setQuote] = useState<any>({});

  // check if user is authenticated, if not redirect to login page
  useEffect(() => {
    let isMounted = true;
    QuoteService.find(id)
      .then(({ result }) => {
        if (isMounted) {
          setQuote(result);
        }
      })
      .catch((error) => {
        navigate("/app/quote/list");
      });

      return () => { isMounted = false };
  }, []);

  return (
    <div className="container-fluid">
      { quote && quote.id ? <QuoteEdit quote={quote} /> : <CircularProgress /> }      
    </div>
  );
};

export default QuoteDetails;