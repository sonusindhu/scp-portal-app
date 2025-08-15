import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import TasksListView from "../../../../shared/components/Task/TasksListView";
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
    <div className="grid-container">
      <div className="grid-form-column">
        <TaskForm task={task} onSuccess={onSuccess} />
      </div>

      <div className="grid-list-column">
        <TasksListView tasks={tasks} />
      </div>
    </div>
  );
};

export default CompanyTasks;
