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
import LaneList from "./LaneList/LaneList";

const drawerWidth = 240;

const QuoteDetails = () => {
  let { id } = useParams();
  const navigate = useNavigate();

  // check if user is authenticated, if not redirect to login page
  useEffect(() => {}, []);

  return (
    <div className="container-fluid">
      <LaneList />
      {/* <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>LaneID</TableCell>
              <TableCell align="left">Equipment</TableCell>
              <TableCell align="left">Commodity</TableCell>
              <TableCell align="left">Weight(lb)</TableCell>
              <TableCell align="left">Cargo Value</TableCell>
              <TableCell align="left">Origin</TableCell>
              <TableCell align="left">Destination</TableCell>
              <TableCell align="left">Total</TableCell>
              <TableCell align="left">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow key={1}>
              <TableCell component="th" scope="row">
                LTL-2101111
              </TableCell>
              <TableCell align="left">VAN</TableCell>
              <TableCell align="left">Al</TableCell>
              <TableCell align="left">120</TableCell>
              <TableCell align="left">$12000</TableCell>
              <TableCell align="left">Miami</TableCell>
              <TableCell align="left">New York</TableCell>
              <TableCell align="left">$2100</TableCell>
              <TableCell align="left">In Progress</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer> */}
    </div>
  );
};

export default QuoteDetails;
