import React, { useEffect, useState } from "react";
import {
  FormContainer,
  TextFieldElement,
  SelectElement,
} from "react-hook-form-mui";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { Button, Stack } from "@mui/material";
import { useForm } from "react-hook-form";

import axios from "../../../utils/config.util";
import AuthService from "../../../services/auth.service";
import QuoteService from "../../../services/quote.service";
import PageHeading from "../../../shared/components/PageHeading/PageHeading";

import toast from "../../../utils/toast.util";
import {
  Box,
  CircularProgress,
  Drawer,
  Grid,
  Tab,
  Tabs,
  Typography,
} from "@material-ui/core";
import EditQuote from "./QuoteDetail/QuoteEdit";

const QuoteForm = (props) => {
  let { id } = useParams();
  let [isLoading, setIsLoading] = useState<boolean>(true);
  let [selectedTab, setSelectedTab] = useState<string>("details");
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
        {/* <Grid item xs={3}>
          {isLoading ? (
            <Box sx={{ display: "flex" }}>
              <CircularProgress />
            </Box>
          ) : (
            <EditQuote quote={quote} />
          )}
        </Grid> */}
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
