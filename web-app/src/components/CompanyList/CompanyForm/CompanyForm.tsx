import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "../../../hooks";

const CompanyForm = (props) => {
  const location = useLocation();
  const pathname = location.pathname.split('/').pop();
  let { id } = useParams();
  let [selectedTab, setSelectedTab] = useState<string>(pathname ?? 'details');
  const navigate = useNavigate();

  const handleChangeTab = (value: string) => {
    setSelectedTab(value);
    navigate(value);
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
      <div className="company-form-container">
        <div className="company-form-content">
          <Tabs
            value={selectedTab}
            onValueChange={handleChangeTab}
          >
            <TabsList>
              <TabsTrigger value="details">General</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
              <TabsTrigger value="emails">Emails</TabsTrigger>
              <TabsTrigger value="tasks">Tasks</TabsTrigger>
              <TabsTrigger value="contacts">Contacts</TabsTrigger>
            </TabsList>
          </Tabs>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default CompanyForm;
