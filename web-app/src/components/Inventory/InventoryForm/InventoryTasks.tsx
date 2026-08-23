import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import TasksListView from "../../../shared/components/Task/TasksListView";
import TaskForm from "../../../shared/components/Task/TaskForm";
import { Task } from "../../../shared/models/Task";
import TaskService from "../../../services/task.service";

const InventoryTasks = () => {
  let { id } = useParams();
  let [tasks, setTasks] = useState<Task[]>([]);
  let [task, setTask] = useState<Partial<Task>>({
    type: "inventory",
    inventoryId: +`${id}`,
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
      TaskService.list(payload).then((response) => setTasks(response.data || []));
    }
  }, []);

  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-4">
        <TaskForm task={task} onSuccess={onSuccess} />
      </div>

      <div className="col-span-8">
        <TasksListView tasks={tasks} />
      </div>
    </div>
  );
};

export default InventoryTasks;
