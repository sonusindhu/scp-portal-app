import React from "react";
import {
  FormContainer,
  TextFieldElement,
  SelectElement,
} from "react-hook-form-mui";
import { Button, Stack } from "@mui/material";
import { useForm } from "react-hook-form";

import toast from "../../../../utils/toast.util";
import { Task } from "../../../models/Task";
import TaskService from "../../../../services/task.service";
type TaskProps = { task: Partial<Task>; onSuccess: Function; id?: number };
const TaskForm = (props: TaskProps) => {
  // let { id } = useParams();
  const task: Partial<Task> = props.task;
  const formContext = useForm({ defaultValues: task });

  const priorityList = [
    { id: 1, value: "High" },
    { id: 2, value: "Medium" },
    { id: 3, value: "Low" },
  ];

  const categoryList = [
    { id: 1, value: "Call" },
    { id: 2, value: "Email" },
    { id: 3, value: "Reminder" },
  ];

  const assignedToList = [
    { id: 1, value: "Sonu Sindhu" },
    { id: 2, value: "Pulkit Kumawat" },
    { id: 3, value: "Tushar" },
  ];
  const pointOfContactList = [
    { id: 1, value: "Sonu Sindhu" },
    { id: 2, value: "Pulkit Kumawat" },
    { id: 3, value: "Tushar" },
  ];

  const statusList = [
    { id: 1, value: "New" },
    { id: 2, value: "In Progress" },
    { id: 2, value: "Canceled" },
    { id: 3, value: "Completed" },
  ];

  const {
    control,
    register,
    handleSubmit,
    getValues,
    setValue,
    watch,
    reset,
    resetField,
  } = formContext;

  const handleClearForm = () => reset();

  const handleSubmitForm = (e) => {
    if (!e.subject || !e.description) return;
    TaskService.create(e)
      .then((response) => {
        if (response.status) {
          toast.success(response.message);
          reset();
          props.onSuccess(response.result);
        } else {
          toast.error(response.message);
        }
      })
      .catch(({ response }) => {
        toast.error(response.message);
      });
  };

  return (
    <FormContainer
      formContext={formContext}
      onSuccess={() => handleSubmit(handleSubmitForm)}
    >
      <h3 style={{ marginLeft: "10px" }}>New Task</h3>
      <div>
        <TextFieldElement
          sx={{ m: 1, minWidth: "96%" }}
          required={true}
          name={"subject"}
          label="Subject"
          variant="outlined"
          validation={{ maxLength: 100 }}
        />
      </div>
      <div>
        <TextFieldElement
          sx={{ m: 1, minWidth: "96%" }}
          required={true}
          name={"description"}
          label="Description"
          variant="outlined"
          validation={{ maxLength: 1000 }}
          multiline={true}
          rows={4}
        />
      </div>
      <div>
        <SelectElement
          valueKey="id"
          labelKey="value"
          sx={{ m: 1, width: "45%" }}
          required
          options={priorityList}
          name={"priority"}
          label="Priority"
        ></SelectElement>
        <SelectElement
          valueKey="id"
          labelKey="value"
          sx={{ m: 1, width: "45%" }}
          required
          options={categoryList}
          name={"category"}
          label="Category"
        ></SelectElement>
      </div>
      <div>
        <SelectElement
          valueKey="id"
          labelKey="value"
          sx={{ m: 1, width: "45%" }}
          required
          options={assignedToList}
          name={"assignedTo"}
          label="Assigned To"
        ></SelectElement>
        <SelectElement
          valueKey="id"
          labelKey="value"
          sx={{ m: 1, width: "45%" }}
          required
          options={pointOfContactList}
          name={"pointOfContact"}
          label="Point Of Contact"
        ></SelectElement>
      </div>

      <div className="quote-task-datepicker">
        <div className="due-date">
          <TextFieldElement
            sx={{ m: 1, minWidth: "96%" }}
            name={"dueDateTime"}
            label="Due Date"
            variant="outlined"
            type="date"
          />
        </div>
        <div className="reminder-date">
          <TextFieldElement
            sx={{ m: 1, minWidth: "96%" }}
            name={"reminderDateTime"}
            label="Reminder Date"
            variant="outlined"
            type="date"
          />

        </div>
      </div>

      <div>
        <SelectElement
          valueKey="id"
          labelKey="value"
          sx={{ m: 1, width: "46%" }}
          required
          options={statusList}
          name={"status"}
          label="Status"
        ></SelectElement>
      </div>

      <div style={{ marginLeft: "12px", marginTop: "15px" }}>
        <Stack direction="row" spacing={2}>
          <Button type={"submit"} size="large" variant="contained">
            Save
          </Button>
          <Button
            size="large"
            variant="outlined"
            type="button"
            onClick={handleClearForm}
          >
            Cancel
          </Button>
        </Stack>
      </div>
    </FormContainer>
  );
};

export default TaskForm;
