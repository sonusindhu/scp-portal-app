import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import AuthService from "./services/auth.service";
import Login from "./components/Login/Login";
import Home from "./components/Home";
import Profile from "./components/Profile";
import CompanyList from "./components/CompanyList/CompanyList";
import AddCompany from "./components/CompanyList/AddCompany";
import EditCompany from "./components/CompanyList/EditCompany";

// import AuthVerify from "./common/AuthVerify";
import EventBus from "./common/EventBus";
import ContactList from "./components/ContactList/ContactList";
import AddContact from "./components/ContactList/AddContact";
import AppHeader from "./layouts/AppHeader/AppHeader";
import InventoryList from "./components/Inventory/InventoryList";

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

      <div className="container-fluid mt-3">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/app/profile" element={<Profile />} />
          <Route path="/app/company-list" element={<CompanyList />} />
          <Route path="/app/company/create" element={<AddCompany />} />
          <Route path="/app/company/:id/edit" element={<EditCompany />} />

          <Route path="/app/contact-list" element={<ContactList />} />
          <Route path="/app/contact/create" element={<AddContact />} />
          {/* <Route path="/app/contact/:id/edit" element={<EditContact />} /> */}

          <Route path="/app/inventories" element={<InventoryList />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
