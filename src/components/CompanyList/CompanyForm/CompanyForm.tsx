import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";

import AuthService from "../../../services/auth.service";
import { Grid, Tab, Tabs } from "@material-ui/core";

const CompanyForm = (props) => {
  const location = useLocation();
  const pathname = location.pathname.split('/').pop();
  console.log(pathname)
  let { id } = useParams();
  let [selectedTab, setSelectedTab] = useState<string>(pathname ?? 'details');
  const navigate = useNavigate();

  const handleChangeTab = (event, tab: string) => {
    setSelectedTab(tab);
    navigate(tab);
  };

  // check if user is authenticated, if not redirect to login page
  const user = AuthService.getCurrentUser();
  useEffect(() => {
    if (user && id) {
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
            <Tab value="details" label="General" />
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

export default CompanyForm;
