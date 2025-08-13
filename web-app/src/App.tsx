import React, { useState, useEffect, Suspense, lazy } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { CircularProgress, Container } from "@material-ui/core";

import "./App.css";

import AuthService from "./services/auth.service";
import Login from "./components/Login/Login";

import EventBus from "./common/EventBus";
import AppHeader from "./layouts/AppHeader/AppHeader";
import AuthWrapper from "./layouts/AuthWrapper/AuthWrapper";

// Lazy load form components for better code splitting
const Profile = lazy(() => import("./components/Profile"));
const EditCompany = lazy(() => import("./components/CompanyList/EditCompany"));
const EditContact = lazy(() => import("./components/Contacts/ContactForm/ContactGeneral"));
const QuoteDetails = lazy(() => import("./components/Quote/QuoteForm/QuoteDetail"));
const QuoteForm = lazy(() => import("./components/Quote/QuoteForm/QuoteForm"));
const QuoteNotes = lazy(() => import("./components/Quote/QuoteForm/QuoteNotes"));
const QuoteEmails = lazy(() => import("./components/Quote/QuoteForm/QuoteEmails"));
const QuoteTasks = lazy(() => import("./components/Quote/QuoteForm/QuoteTasks"));
const ProfileChangePassword = lazy(() => import("./components/Profile/ProfileChangePassword"));
const ProfileIntegrations = lazy(() => import("./components/Profile/ProfileIntegrations"));
const ProfileTemplates = lazy(() => import("./components/Profile/ProfileTemplates"));
const CompanyForm = lazy(() => import("./components/CompanyList/CompanyForm/CompanyForm"));
const CompanyNotes = lazy(() => import("./components/CompanyList/CompanyForm/CompanyNotes"));
const CompanyEmails = lazy(() => import("./components/CompanyList/CompanyForm/CompanyEmails"));
const CompanyTasks = lazy(() => import("./components/CompanyList/CompanyForm/CompanyTasks"));
const CompanyContactList = lazy(() => import("./components/CompanyList/CompanyForm/CompanyContacts"));
const ContactNotes = lazy(() => import("./components/Contacts/ContactForm/ContactNotes"));
const ContactTasks = lazy(() => import("./components/Contacts/ContactForm/ContactTasks"));
const ContactForm = lazy(() => import("./components/Contacts/ContactForm/ContactForm"));
const InventoryForm = lazy(() => import("./components/Inventory/InventoryForm/InventoryForm"));
const InventoryGeneral = lazy(() => import("./components/Inventory/InventoryForm/InventoryGeneral/InventoryGeneral"));
const InventoryNotes = lazy(() => import("./components/Inventory/InventoryForm/InventoryNotes/InventoryNotes"));
const InventoryEmails = lazy(() => import("./components/Inventory/InventoryForm/InventoryEmails/InventoryEmails"));
const InventoryTasks = lazy(() => import("./components/Inventory/InventoryForm/InventoryTasks/InventoryTasks"));

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
    if (user) setCurrentUser(user);

    const handleLogout = () => logOut();
    EventBus.on("logout", handleLogout);

    return () => EventBus.remove("logout", handleLogout);
  }, [navigate]); // Add navigate to dependency array

  const logOut = () => {
    AuthService.logout();
    setCurrentUser(undefined);
    navigate("/auth/login");
  };

  return (
    <div>
      {currentUser ? <AppHeader onLogout={logOut} /> : <></>}
      <Container maxWidth="xl">
        <Suspense 
          fallback={
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              height: '50vh' 
            }}>
              <CircularProgress size={60} />
            </div>
          }
        >
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
            
              {/* Inventory Form Routings */}
              <Route path="/app/inventory/list" element={<InventoryList />} />
              <Route path="/app/inventory/:id" element={<InventoryForm />}>
                <Route path="details" element={<InventoryGeneral />} />
                <Route path="notes" element={<InventoryNotes />} />
                <Route path="emails" element={<InventoryEmails />} />
                <Route path="tasks" element={<InventoryTasks />} />
                <Route path="*" element={<Navigate to="details" replace />} />
              </Route>

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
