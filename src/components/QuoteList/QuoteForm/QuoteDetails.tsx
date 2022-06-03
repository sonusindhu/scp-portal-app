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
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import EditQuote from "../EditQuote";

const drawerWidth = 240;

const QuoteDetails = () => {
  let { id } = useParams();
  const navigate = useNavigate();

  // check if user is authenticated, if not redirect to login page
  useEffect(() => {}, []);

  return (
    <div className="container-fluid">
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>LaneID</TableCell>
              <TableCell align="right">Equipment</TableCell>
              <TableCell align="right">Commodity</TableCell>
              <TableCell align="right">Weight(lb)</TableCell>
              <TableCell align="right">Cargo Value</TableCell>
              <TableCell align="right">Origin</TableCell>
              <TableCell align="right">Destination</TableCell>
              <TableCell align="right">Total</TableCell>
              <TableCell align="right">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow key={1}>
              <TableCell component="th" scope="row">
                Test
              </TableCell>
              <TableCell align="right">LTL-2101111</TableCell>
              <TableCell align="right">VAN</TableCell>
              <TableCell align="right">Al</TableCell>
              <TableCell align="right">120</TableCell>
              <TableCell align="right">Miami</TableCell>
              <TableCell align="right">New York</TableCell>
              <TableCell align="right">$2100</TableCell>
              <TableCell align="right">In Progress</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default QuoteDetails;
