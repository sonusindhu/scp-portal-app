import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import QuoteService from "../../../services/quote.service";
import TasksList from "../../../shared/components/Task/TasksListView";
import TaskForm from "../../../shared/components/Task/TaskForm";
import { Task } from "../../../shared/models/Task";

const QuoteTasks = () => {
  let { id } = useParams();
  let [tasks, setTasks] = useState<Task[]>([]);
  let [task, setTask] = useState<Partial<Task>>({});
  // let task: Partial<Task>;

  const onSuccess = (event) => {
    const task = [event];
    setTasks([...task, ...tasks]);
  };

  useEffect(() => {
    if(id){
      QuoteService.getTasks(id)
        .then((response) => setTasks(response));
    }
  }, []);

  return (
    <div className="grid grid-cols-12 gap-4">
      
      <div className="col-span-4">        
        <TaskForm task={task} onSuccess={onSuccess} />
      </div>

      <div className="col-span-8">
        <TasksList tasks={tasks} />
      </div>

    </div>
  );
};

export default QuoteTasks;