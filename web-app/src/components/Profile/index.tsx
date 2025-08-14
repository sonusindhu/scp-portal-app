import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";

import AuthService from "../../services/auth.service";
import toast from "../../utils/toast.util";
import {
  Box,
  Drawer,
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
      <div className="grid-layout-sidebar">        
        <div className="grid-sidebar-left left-user-form">
          { isLoading ? (
            <div className="loading-spinner">
              <div className="spinner"></div>
            </div>
          ) : <UserForm user={user}/> }          
        </div>

        <div className="grid-main-content">
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
        </div>

      </div>
    </div>
  );
};

export default QuoteForm;
