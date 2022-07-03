import React from "react";
import { format } from "date-fns";

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import WarningOutlinedIcon from '@mui/icons-material/WarningOutlined';

import { Note } from "../../../models/Note";
import { Chip } from "@material-ui/core";


const NotesList = (props) => {
  
  const noteSubHeader = (note: Note) => {
    const formattedDate =  format(new Date(note.createdAt), "dd/MM/yyyy p");
    console.log(formattedDate);
    return <>{ formattedDate }</>
  };

  return (
    <div className="container-fluid note-list">
      <h3>Notes({ props.notes.length })</h3>
      { props.notes.map( (note: Note) => (

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
              title={note.title}
              subheader={
                <div className="sub-header">
                  <span>{ noteSubHeader(note) }</span>

                  { note.isCritical && <Chip icon={<WarningOutlinedIcon color="error"  />} label="Critical" /> }
                  
                  
                </div>
              }
            />
          
          <CardContent className="note-card-content">
            <Typography variant="body2" color="text.secondary">
              {note.message}
            </Typography>
          </CardContent>
          {/* <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
          </CardActions> */}
          
          </Card>

      )) }
    </div>
  );
};

export default NotesList;
