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

// import { Task } from "../../../models/Task";
import { Chip } from "@material-ui/core";


const TasksList = (props) => {
  
  const taskSubHeader = (task: any) => {
    const formattedDate =  format(new Date(task.createdAt), "dd/MM/yyyy p");
    return <>{ formattedDate }</>
  };

  return (
    <div className="container-fluid note-list">
      <h3>Tasks({ props.tasks.length })</h3>
      { props.tasks.map( (task: any) => (

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
              title={task.subject}
              subheader={
                <div className="sub-header">
                  <span>{ taskSubHeader(task) }</span>
                  { task.isCritical && <Chip icon={<WarningOutlinedIcon color="error"  />} label="Critical" /> }                  
                  
                </div>
              }
            />
          
          <CardContent className="note-card-content">
            <Typography variant="body2" color="text.secondary">
              {task.description}
            </Typography>
          </CardContent>
          
          </Card>

      )) }
    </div>
  );
};

export default TasksList;
