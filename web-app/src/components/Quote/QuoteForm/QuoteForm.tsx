import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";

import QuoteService from "../../../services/quote.service";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "../../../hooks";

const QuoteForm = () => {
  const location = useLocation();
  const pathname = location.pathname.split("/").pop();
  let { id } = useParams();
  let [, setIsLoading] = useState<boolean>(true);
  let [selectedTab, setSelectedTab] = useState<string>(pathname ?? "details");
  let [, setQuote] = useState<any>({});
  const navigate = useNavigate();

  const handleChangeTab = (value: string) => {
    setSelectedTab(value);
    navigate(value);
  };

  // check if user is authenticated, if not redirect to login page
  const { isAuthenticated } = useAuth();
  useEffect(() => {
    if (isAuthenticated && id) {
      QuoteService.find(+id)
        .then((response) => {
          if (response.status && response.data) {
            const updatedResult = {
              ...response.data,
              transportMode: response.data.transportMode?.split(",") || []
            };
            setQuote(updatedResult);
          } else {
            navigate("/app/quote/list");
          }
        })
        .catch(() => {
          navigate("/app/quote/list");
        });
    } else if (!isAuthenticated) {
      navigate("/auth/login");
    }
  }, [isAuthenticated, id, navigate]);
  
  if (!isAuthenticated) return <></>;

  return (
    <div className="container-fluid">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12">
          <Tabs
            value={selectedTab}
            onValueChange={handleChangeTab}
          >
            <TabsList>
              <TabsTrigger value="details">Quote</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
              <TabsTrigger value="emails">Emails</TabsTrigger>
              <TabsTrigger value="tasks">Tasks</TabsTrigger>
            </TabsList>
          </Tabs>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default QuoteForm;
