import React, { useState, useEffect, Suspense, lazy } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { CircularProgress, Container } from "@material-ui/core";

import "./App.css";

import AuthService from "./services/auth.service";
import Login from "./components/Login/Login";

import Profile from "./components/Profile";
import AddCompany from "./components/CompanyList/AddCompany";
import EditCompany from "./components/CompanyList/EditCompany";

import EventBus from "./common/EventBus";
import AddContact from "./components/ContactList/AddContact";
import EditContact from "./components/ContactList/EditContact";
import AppHeader from "./layouts/AppHeader/AppHeader";
import AddInventory from "./components/Inventory/AddInventory";

import AddQuote from "./components/QuoteList/AddQuote";

const Home = lazy(() => import("./components/Home"));
const CompanyList = lazy(() => import("./components/CompanyList/CompanyList"));
const InventoryList = lazy(
  () => import("./components/Inventory/InventoryList")
);
const ContactList = lazy(() => import("./components/ContactList/ContactList"));
const QuoteList = lazy(() => import("./components/QuoteList/QuoteList"));

const App = () => {
  const [currentUser, setCurrentUser] = useState(undefined);
  let navigate = useNavigate();

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, []);

  const logOut = () => {
    AuthService.logout();
    setCurrentUser(undefined);
    navigate("/auth/login");
  };

  return (
    <div>
      {currentUser ? <AppHeader onLogout={logOut} /> : <></>}
      <Container maxWidth="xl">
        <Suspense fallback={<CircularProgress />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/app/profile" element={<Profile />} />
            <Route path="/app/company/list" element={<CompanyList />} />
            <Route path="/app/company/create" element={<AddCompany />} />
            <Route path="/app/company/:id/edit" element={<EditCompany />} />

            <Route path="/app/contact/list" element={<ContactList />} />
            <Route path="/app/contact/create" element={<AddContact />} />
            <Route path="/app/contact/:id/edit" element={<EditContact />} />

            <Route path="/app/inventory/list" element={<InventoryList />} />
            <Route path="/app/inventory/create" element={<AddInventory />} />

            <Route path="/app/quote/list" element={<QuoteList />} />
            <Route path="/app/quote/create" element={<AddQuote />} />
          </Routes>
        </Suspense>
      </Container>
    </div>
  );
};

export default App;
