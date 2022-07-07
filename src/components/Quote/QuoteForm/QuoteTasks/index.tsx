import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Grid } from "@material-ui/core";

import QuoteService from "../../../../services/quote.service";
import TasksList from "../../../../shared/components/Task/TasksList";
import TaskForm from "../../../../shared/components/Task/TaskForm";

const QuoteTasks = () => {
  let { id } = useParams();
  let [tasks, setTasks] = useState<any[]>([]);
  const task = {};

  const onSuccess = (event) => {
    const task = [event];
    setTasks([...task, ...tasks]);
  };

  useEffect(() => {
    QuoteService.getTasks(id)
      .then((response) => {
        setTasks(response);
      });
  }, []);

  return (
    <Grid container spacing={2}>
      
      <Grid item xs={4}>        
        <TaskForm task={task} onSuccess={onSuccess} />
      `</Grid>

      <Grid item xs={8}>
        <TasksList tasks={tasks} />
      </Grid>

    </Grid>
  );
};

export default QuoteTasks;