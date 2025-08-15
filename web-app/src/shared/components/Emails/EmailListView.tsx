import React from "react";
import { format } from "date-fns";

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import WarningOutlinedIcon from '@mui/icons-material/WarningOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { Email, EmailListProps } from "../../models/Email";
import { Chip } from "@mui/material";

const EmailListView = (props: EmailListProps) => {
  
  const emailSubHeader = (email: Email) => {
    const formattedDate =  format(new Date(email.createdAt), "dd/MM/yyyy p");
    return <>{ formattedDate }</>
  };

  return (
    <div className="container-fluid note-list">
      <h3>Emails({ props.emails.length })</h3>
      { props.emails.map( (email: Email) => (

        <Card className="note-card">
            <CardHeader
              className="note-card-header"
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="User Name">
                  R
                </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title={email.title}
              subheader={
                <div className="sub-header">
                  <span>{ emailSubHeader(email) }</span>

                  { email.isCritical && <Chip icon={<WarningOutlinedIcon color="error"  />} label="Critical" /> }
                                    
                </div>
              }
            />
          
          <CardContent className="note-card-content">
            <Typography variant="body2" color="text.secondary">
              {email.message}
            </Typography>
          </CardContent>
          </Card>
      )) }
    </div>
  );
};

export default EmailListView;
