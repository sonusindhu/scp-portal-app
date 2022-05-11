import React, { useState, useRef } from "react";
import axios from "axios";
import { format } from "date-fns";
import { Button, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";

import AuthService from "../../services/auth.service";

const API_URL = process.env.REACT_APP_API_ENDPOINT;

const style = makeStyles({
  btnRight: {
    float: "right",
  },
});

const CompanyList = () => {
  const classes = style();

  const user = AuthService.getCurrentUser();
  axios.defaults.headers.common["token"] = user.token;
  axios.defaults.headers.common["allowOrigins"] = "*";

  return (
    <div className="container-fluid">
      <header className="jumbotron">
        <h3>
          <span>Edit Company</span>
        </h3>
      </header>

      <div className="container-fluid"></div>
    </div>
  );
};

export default CompanyList;
