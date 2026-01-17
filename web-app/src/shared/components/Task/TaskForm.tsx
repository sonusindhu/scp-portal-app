import React from "react";
import {
  FormContainer,
  TextFieldElement,
  SelectElement,
} from "react-hook-form-mui";
import { useForm } from "react-hook-form";
import { FormActions } from "../FormFields";

import toast from "../../../utils/toast.util";
import { Task } from "../../models/Task";
import TaskService from "../../../services/task.service";
import { TASK_STATUS } from "../../../utils/constants.util";
import { ValidationRules } from "../../../utils/validation.util";
import { useFormSubmit } from "../../../hooks";

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

  // Convert TASK_STATUS to format expected by SelectElement
  const statusList = TASK_STATUS.filter(s => s.id !== "").map((status, index) => ({
    id: index + 1,
    value: status.title,
  }));

  const { reset } = formContext;

  const { handleSubmit: handleFormSubmit } = useFormSubmit({
    onSuccess: (response) => {
      reset();
      if (response?.result) {
        props.onSuccess(response.result);
      }
    },
  });

  const handleClearForm = () => reset();

  const handleSubmitForm = async (data) => {
    if (!data.subject || !data.description) return;
    await handleFormSubmit(() => TaskService.create(data));
  };

  return (
    <FormContainer
      formContext={formContext}
      onSuccess={handleSubmitForm}
    >
      <h3 style={{ marginLeft: "10px" }}>New Task</h3>
      <div>
        <TextFieldElement
          sx={{ m: 1, minWidth: "96%" }}
          name={"subject"}
          label="Subject"
          variant="outlined"
          rules={ValidationRules.text(undefined, 100, true)}
        />
      </div>
      <div>
        <TextFieldElement
          sx={{ m: 1, minWidth: "96%" }}
          name={"description"}
          label="Description"
          variant="outlined"
          rules={ValidationRules.text(undefined, 1000, true)}
          multiline={true}
          rows={4}
        />
      </div>
      <div>
        <SelectElement
          valueKey="id"
          labelKey="value"
          sx={{ m: 1, width: "45%" }}
          options={priorityList}
          name={"priority"}
          label="Priority"
          rules={ValidationRules.required()}
        ></SelectElement>
        <SelectElement
          valueKey="id"
          labelKey="value"
          sx={{ m: 1, width: "45%" }}
          options={categoryList}
          name={"category"}
          label="Category"
          rules={ValidationRules.required()}
        ></SelectElement>
      </div>
      <div>
        <SelectElement
          valueKey="id"
          labelKey="value"
          sx={{ m: 1, width: "45%" }}
          options={assignedToList}
          name={"assignedTo"}
          label="Assigned To"
          rules={ValidationRules.required()}
        ></SelectElement>
        <SelectElement
          valueKey="id"
          labelKey="value"
          sx={{ m: 1, width: "45%" }}
          options={pointOfContactList}
          name={"pointOfContact"}
          label="Point Of Contact"
          rules={ValidationRules.required()}
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
          options={statusList}
          name={"status"}
          label="Status"
          rules={ValidationRules.required()}
        ></SelectElement>
      </div>

      <FormActions onCancel={handleClearForm} />
    </FormContainer>
  );
};

export default TaskForm;
