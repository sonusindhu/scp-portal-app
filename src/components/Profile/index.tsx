import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";

import AuthService from "../../services/auth.service";
import toast from "../../utils/toast.util";
import {
  Box,
  CircularProgress,
  Drawer,
  Grid,
  Tab,
  Tabs,
  Typography,
} from "@material-ui/core";
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
        <Grid item xs={4} className="left-user-form">
          { isLoading ? <CircularProgress /> : <UserForm user={user}/> }          
        </Grid>

        <Grid item xs={8}>
          <Tabs
            value={selectedTab}
            onChange={handleChangeTab}
            aria-label="User Profile Tab"
          >
            <Tab value="updatepassword" label="updatepassword" />
            <Tab value="integrations" label="integrations" />
            <Tab value="templates" label="templates" />
          </Tabs>
          <Outlet />
        </Grid>

      </Grid>
    </div>
  );
};

export default QuoteForm;
