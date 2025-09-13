import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import AuthService from "../../services/auth.service";
import {
  CircularProgress,
  Grid,
  Tab,
  Tabs,
} from "@mui/material";
import UserForm from "./UserForm";

const QuoteForm = (props) => {
  let [isLoading, setIsLoading] = useState<boolean>(true);
  let [selectedTab, setSelectedTab] = useState<string>("updatepassword");
  let [user, setUser] = useState<any>({});
  const navigate = useNavigate();

  const handleChangeTab = (event, tab: string) => {
    setSelectedTab(tab);
    navigate(tab);
  };

  // check if user is authenticated, if not redirect to login page
  useEffect(() => {
    debugger
    setIsLoading(true);
    AuthService.getUserDetail()
      .then((response) => {
        if (response.status) {
          setUser(response.result)
        }
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="container-fluid">
      <Grid container spacing={2}>        
        <Grid item xs={3} className="left-user-form">
          { isLoading ? <CircularProgress /> : <UserForm user={user}/> }          
        </Grid>

        <Grid item xs={9}>
          <Tabs
            value={selectedTab}
            onChange={handleChangeTab}
            aria-label="User Profile Tab"
          >
            <Tab value="updatepassword" label="Update Password" />
            <Tab value="integrations" label="Integrations" />
            <Tab value="templates" label="Templates" />
          </Tabs>
          <Outlet />
        </Grid>

      </Grid>
    </div>
  );
};

export default QuoteForm;