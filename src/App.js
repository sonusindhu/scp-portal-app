import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

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

const App = () => {
  const [currentUser, setCurrentUser] = useState(undefined);

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
  };

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        {currentUser ? (
          <div className="navbar-nav ml-auto">
            {/* <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {currentUser.fullName}
              </Link>
            </li> */}
            <li className="nav-item">
              <Link to={"/app/company-list"} className="nav-link">
                Companies
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/app/contact-list"} className="nav-link">
                Contacts
              </Link>
            </li>
            <li className="nav-item">
              <a href="/auth/login" className="nav-link" onClick={logOut}>
                LogOut
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto"></div>
        )}
      </nav>

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
        </Routes>
      </div>
    </div>
  );
};

export default App;
