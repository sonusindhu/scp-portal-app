import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";

import { Grid, Tab, Tabs } from "@mui/material";
import { useAuth } from "../../../hooks";

const InventoryForm = (props) => {
  const location = useLocation();
  const pathname = location.pathname.split('/').pop();
  let { id } = useParams();
  let [selectedTab, setSelectedTab] = useState<string>(pathname ?? 'details');
  const navigate = useNavigate();

  const handleChangeTab = (event, tab: string) => {
    setSelectedTab(tab);
    navigate(tab);
  };

  // check if user is authenticated, if not redirect to login page
  const { isAuthenticated } = useAuth();
  useEffect(() => {
    if (!isAuthenticated || !id) {
      navigate("/auth/login");
    }
  }, [isAuthenticated, id, navigate]);
  
  if (!isAuthenticated) return <></>;

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

export default InventoryForm;
