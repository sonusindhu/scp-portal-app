import React, { lazy } from "react";
import { Navigate } from "react-router-dom";
import Login from "./components/Login/Login";
import AuthWrapper from "./layouts/AuthWrapper/AuthWrapper";

const Profile = lazy(() => import("./components/Profile/Profile"));
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
const InventoryGeneral = lazy(() => import("./components/Inventory/InventoryForm/InventoryGeneral"));
const InventoryNotes = lazy(() => import("./components/Inventory/InventoryForm/InventoryNotes"));
const InventoryEmails = lazy(() => import("./components/Inventory/InventoryForm/InventoryEmails"));
const InventoryTasks = lazy(() => import("./components/Inventory/InventoryForm/InventoryTasks"));
const Home = lazy(() => import("./components/Home"));
const CompanyList = lazy(() => import("./components/CompanyList/CompanyList"));
const InventoryList = lazy(() => import("./components/Inventory/InventoryList/InventoryList"));
const ContactList = lazy(() => import("./components/Contacts/ContactList/ContactList"));
const QuoteList = lazy(() => import("./components/Quote/QuoteList/QuoteList"));

export const routesConfig = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/auth/login",
    element: <Login />,
  },
  {
    element: <AuthWrapper />,
    children: [
      {
        path: "/app/profile",
        element: <Profile />,
        children: [
          { index: true, element: <ProfileChangePassword /> },
          { path: "changepassword", element: <ProfileChangePassword /> },
          { path: "integrations", element: <ProfileIntegrations /> },
          { path: "templates", element: <ProfileTemplates /> },
          { path: "*", element: <Navigate to="changepassword" replace /> },
        ],
      },
      {
        path: "/app/inventory/list",
        element: <InventoryList />,
      },
      {
        path: "/app/inventory/:id",
        element: <InventoryForm />,
        children: [
          { path: "details", element: <InventoryGeneral /> },
          { path: "notes", element: <InventoryNotes /> },
          { path: "emails", element: <InventoryEmails /> },
          { path: "tasks", element: <InventoryTasks /> },
          { path: "*", element: <Navigate to="details" replace /> },
        ],
      },
      {
        path: "/app/company/list",
        element: <CompanyList />,
      },
      {
        path: "/app/company/:id",
        element: <CompanyForm />,
        children: [
          { path: "details", element: <EditCompany /> },
          { path: "notes", element: <CompanyNotes /> },
          { path: "emails", element: <CompanyEmails /> },
          { path: "tasks", element: <CompanyTasks /> },
          { path: "contacts", element: <CompanyContactList /> },
          { path: "*", element: <Navigate to="details" replace /> },
        ],
      },
      {
        path: "/app/contact/list",
        element: <ContactList />,
      },
      {
        path: "/app/contact/:id",
        element: <ContactForm />,
        children: [
          { path: "details", element: <EditContact /> },
          { path: "notes", element: <ContactNotes /> },
          { path: "tasks", element: <ContactTasks /> },
          { path: "*", element: <Navigate to="details" replace /> },
        ],
      },
      {
        path: "/app/quote/list",
        element: <QuoteList />,
      },
      {
        path: "/app/quote/:id",
        element: <QuoteForm />,
        children: [
          { path: "details", element: <QuoteDetails /> },
          { path: "notes", element: <QuoteNotes /> },
          { path: "emails", element: <QuoteEmails /> },
          { path: "tasks", element: <QuoteTasks /> },
          { path: "*", element: <Navigate to="details" replace /> },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <div style={{ padding: 32, textAlign: "center" }}>404 - Page Not Found</div>,
  },
];
