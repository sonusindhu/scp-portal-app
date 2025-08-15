import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";

import AuthService from "../../../services/auth.service";
import QuoteService from "../../../services/quote.service";

import { Grid, Tab, Tabs } from "@mui/material";

const QuoteForm = (props) => {
  const location = useLocation();
  const pathname = location.pathname.split("/").pop();
  let { id } = useParams();
  let [isLoading, setIsLoading] = useState<boolean>(true);
  let [selectedTab, setSelectedTab] = useState<string>(pathname ?? "details");
  let [quote, setQuote] = useState<any>({});
  const navigate = useNavigate();

  const handleChangeTab = (event, tab: string) => {
    setSelectedTab(tab);
    navigate(tab);
  };

  // check if user is authenticated, if not redirect to login page
  const user = AuthService.getCurrentUser();
  useEffect(() => {
    if (user && id) {
      setIsLoading(true);
      QuoteService.find(+id)
        .then((response) => {
          if (response.status) {
            response.result.transportMode =
              response.result.transportMode.split(",");
            setQuote(response.result);
          } else {
            navigate("/app/quote/list");
          }
          setIsLoading(false);
        })
        .catch(() => {
          navigate("/app/quote/list");
          setIsLoading(false);
        });
    } else {
      navigate("/auth/login");
    }
  }, []);
  if (!user) return <></>;

  return (
    <div className="container-fluid">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Tabs
            value={selectedTab}
            onChange={handleChangeTab}
            aria-label="Vertical tabs example"
          >
            <Tab value="details" label="Quote" />
            <Tab value="notes" label="Notes" />
            <Tab value="emails" label="Emails" />
            <Tab value="tasks" label="Tasks" />
          </Tabs>
          <Outlet />
        </Grid>
      </Grid>
    </div>
  );
};

export default QuoteForm;
