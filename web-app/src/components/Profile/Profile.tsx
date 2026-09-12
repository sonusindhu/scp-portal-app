import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import AuthService from "../../services/auth.service";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserForm from "./UserForm";
import { useLoading } from "../../hooks/useLoading";
import { LoadingContainer } from "../../shared/components/Loading";

const QuoteForm = (props) => {
  const { isLoading, startLoading, stopLoading } = useLoading({ initialState: true });
  let [selectedTab, setSelectedTab] = useState<string>("updatepassword");
  let [user, setUser] = useState<any>({});
  const navigate = useNavigate();

  const handleChangeTab = (value: string) => {
    setSelectedTab(value);
    navigate(value);
  };

  // check if user is authenticated, if not redirect to login page
  useEffect(() => {
    startLoading();
    AuthService.getUserDetail()
      .then((response) => {
        if (response.status) {
          setUser(response.data)
        }
        stopLoading();
      })
      .catch(() => {
        stopLoading();
      });
  }, []);

  return (
    <div className="container-fluid">
      <div className="grid grid-cols-12 gap-4">        
        <div className="col-span-3 left-user-form">
          <LoadingContainer loading={isLoading}>
            <UserForm user={user}/>
          </LoadingContainer>
        </div>

        <div className="col-span-9">
          <Tabs
            value={selectedTab}
            onValueChange={handleChangeTab}
          >
            <TabsList>
              <TabsTrigger value="updatepassword">Update Password</TabsTrigger>
              <TabsTrigger value="integrations">Integrations</TabsTrigger>
              <TabsTrigger value="templates">Templates</TabsTrigger>
            </TabsList>
          </Tabs>
          <Outlet />
        </div>

      </div>
    </div>
  );
};

export default QuoteForm;