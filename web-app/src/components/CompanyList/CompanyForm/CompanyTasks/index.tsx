import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Grid } from "@material-ui/core";

import TasksListView from "../../../../shared/components/Task/TasksList/TasksListView";
import TaskForm from "../../../../shared/components/Task/TaskForm";
import { Task } from "../../../../shared/models/Task";
import TaskService from "../../../../services/task.service";

const CompanyTasks = () => {
  let { id } = useParams();
  let [tasks, setTasks] = useState<Task[]>([]);
  let [task, setTask] = useState<Partial<Task>>({
    type: "company",
    companyId: +`${id}`,
  });
  // let task: Partial<Task>;

  const onSuccess = (event) => {
    const task = [event];
    setTasks([...task, ...tasks]);
  };

  useEffect(() => {
    if (id) {
      const payload = {
        companyId: id,
      };
      TaskService.get(payload).then((response) => setTasks(response.result));
    }
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <TaskForm task={task} onSuccess={onSuccess} />
      </Grid>

      <Grid item xs={8}>
        <TasksListView tasks={tasks} />
      </Grid>
    </Grid>
  );
};

export default CompanyTasks;
