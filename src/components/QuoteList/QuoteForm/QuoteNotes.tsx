import React, { useEffect, useState } from "react";
import {
  FormContainer,
  TextFieldElement,
  SelectElement,
} from "react-hook-form-mui";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Stack } from "@mui/material";
import { useForm } from "react-hook-form";

import axios from "../../../utils/config.util";
import AuthService from "../../../services/auth.service";
import QuoteService from "../../../services/quote.service";
import PageHeading from "../../../shared/components/PageHeading";

import toast from "../../../utils/toast.util";
import { Box, Drawer, Typography } from "@material-ui/core";
import EditQuote from "../EditQuote";

const drawerWidth = 240;

const QuoteNotes = () => {
  let { id } = useParams();
  const navigate = useNavigate();

  // check if user is authenticated, if not redirect to login page
  const user = AuthService.getCurrentUser();
  useEffect(() => {
    if (user && id) {
    } else {
      navigate("/auth/login");
    }
  }, []);
  if (!user) return <></>;

  return (
    <div className="container-fluid">
      <Typography paragraph>Notes</Typography>
    </div>
  );
};

export default QuoteNotes;
