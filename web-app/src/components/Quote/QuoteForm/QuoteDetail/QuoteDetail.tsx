import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import QuoteService from "../../../../services/quote.service";
import QuoteEdit from "./QuoteEdit";

const QuoteDetails = () => {  

  let { id } = useParams();
  const navigate = useNavigate();
  const [quote, setQuote] = useState<any>({});
  const [equipments, setEquipments] = useState<any[]>([]);
  const [commodities, setCommodities] = useState<any[]>([]);
  const [cargos, setCargos] = useState<any[]>([]);

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
    
      QuoteService.getEquipments()
        .then(({ result }) =>  setEquipments(result));
      QuoteService.getCommodities()
        .then(({ result }) => setCommodities(result));
      QuoteService.getCargos()
        .then(({ result }) => setCargos(result));

      return () => { isMounted = false };
  }, []);

  return (
    <div className="container-fluid">
      { quote && quote.id ? <QuoteEdit 
        cargos={cargos} 
        commodities={commodities} 
        equipments={equipments} 
        quote={quote} /> : (
          <div className="loading-spinner">
            <div className="spinner"></div>
          </div>
        ) }      
    </div>
  );
};

export default QuoteDetails;