import React, { useState, useEffect, Suspense, lazy } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { CircularProgress, Container } from "@material-ui/core";

import "./App.css";

import AuthService from "./services/auth.service";
import Login from "./components/Login/Login";

import Profile from "./components/Profile";
import EditCompany from "./components/CompanyList/EditCompany";

import EventBus from "./common/EventBus";
import EditContact from "./components/Contacts/ContactForm/ContactGeneral";
import AppHeader from "./layouts/AppHeader/AppHeader";

import QuoteDetails from "./components/Quote/QuoteForm/QuoteDetail";
import QuoteForm from "./components/Quote/QuoteForm/QuoteForm";
import QuoteNotes from "./components/Quote/QuoteForm/QuoteNotes";
import QuoteEmails from "./components/Quote/QuoteForm/QuoteEmails";
import QuoteTasks from "./components/Quote/QuoteForm/QuoteTasks";
import AuthWrapper from "./layouts/AuthWrapper/AuthWrapper";
import ProfileChangePassword from "./components/Profile/ProfileChangePassword";
import ProfileIntegrations from "./components/Profile/ProfileIntegrations";
import ProfileTemplates from "./components/Profile/ProfileTemplates";
import CompanyForm from "./components/CompanyList/CompanyForm/CompanyForm";
import CompanyNotes from "./components/CompanyList/CompanyForm/CompanyNotes";
import CompanyEmails from "./components/CompanyList/CompanyForm/CompanyEmails";
import CompanyTasks from "./components/CompanyList/CompanyForm/CompanyTasks";
import CompanyContactList from "./components/CompanyList/CompanyForm/CompanyContacts";
import ContactNotes from "./components/Contacts/ContactForm/ContactNotes";
import ContactTasks from "./components/Contacts/ContactForm/ContactTasks";
import ContactForm from "./components/Contacts/ContactForm/ContactForm";

const Home = lazy(() => import("./components/Home"));
const CompanyList = lazy(() => import("./components/CompanyList/CompanyList"));
const InventoryList = lazy(
  () => import("./components/Inventory/InventoryList/InventoryList")
);
const ContactList = lazy(() => import("./components/Contacts/ContactList/ContactList"));
const QuoteList = lazy(() => import("./components/Quote/QuoteList/QuoteList"));

const App = () => {
  const [currentUser, setCurrentUser] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) setCurrentUser(user)

    EventBus.on("logout", () => logOut());

    return () => EventBus.remove("logout");
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

            <Route element={<AuthWrapper />}>
              <Route path="/app/profile" element={<Profile />}>
                <Route index element={<ProfileChangePassword />} />
                <Route path="changepassword" element={<ProfileChangePassword />} />
                <Route path="integrations" element={<ProfileIntegrations />} />
                <Route path="templates" element={<ProfileTemplates />} />
                <Route path="*" element={<Navigate to="changepassword" replace />} />
              </Route>
            
              <Route path="/app/inventory/list" element={<InventoryList />} />

              {/* Company Form Routings */}
              <Route path="/app/company/list" element={<CompanyList />} />
              <Route path="/app/company/:id" element={<CompanyForm />}>
                <Route path="details" element={<EditCompany />} />
                <Route path="notes" element={<CompanyNotes />} />
                <Route path="emails" element={<CompanyEmails />} />
                <Route path="tasks" element={<CompanyTasks />} />
                <Route path="contacts" element={<CompanyContactList />} />
                <Route path="*" element={<Navigate to="details" replace />} />
              </Route>
              
              {/* Contact Form Routings */}
              <Route path="/app/contact/list" element={<ContactList />} />
              <Route path="/app/contact/:id" element={<ContactForm />}>
                <Route path="details" element={<EditContact />} />
                <Route path="notes" element={<ContactNotes />} />
                <Route path="tasks" element={<ContactTasks />} />
                <Route path="*" element={<Navigate to="details" replace />} />
              </Route>

              {/* Quote Form Routings */}
              <Route path="/app/quote/list" element={<QuoteList />} />
              <Route path="/app/quote/:id" element={<QuoteForm />}>
                <Route path="details" element={<QuoteDetails />} />
                <Route path="notes" element={<QuoteNotes />} />
                <Route path="emails" element={<QuoteEmails />} />
                <Route path="tasks" element={<QuoteTasks />} />
                <Route path="*" element={<Navigate to="details" replace />} />
              </Route>
            </Route>
          </Routes>
        </Suspense>
      </Container>
    </div>
  );
};

export default App;
