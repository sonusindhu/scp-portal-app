import React from "react";
import {
  FormContainer,
  TextFieldElement,
  CheckboxElement,
  SelectElement,
  DatePickerElement,
} from "react-hook-form-mui";
import { useParams } from "react-router-dom";
import { Button, Stack } from "@mui/material";
import { useForm } from "react-hook-form";

import QuoteService from "../../../../services/quote.service";
import toast from "../../../../utils/toast.util";
import DateFnsProvider from "../../../../utils/DateFnsProvider";

const TaskForm = (props) => {
  let { id } = useParams();
  const task = props.task || {};
  const formContext = useForm({ defaultValues: task });

  const priorityList = [
    { name: 1, title: 'High' },
    { name: 2, title: 'Medium' },
    { name: 3, title: 'Low' },
  ];
  
  const categoryList = [
    { name: 1, title: 'Call' },
    { name: 2, title: 'Email' },
    { name: 3, title: 'Reminder' },
  ];

  const assignedToList = [
    { name: 1, title: 'Sonu Sindhu' },
    { name: 2, title: 'Pulkit Kumawat' },
    { name: 3, title: 'Tushar' },
  ];
  const pointOfContactList = [
    { name: 1, title: 'Sonu Sindhu' },
    { name: 2, title: 'Pulkit Kumawat' },
    { name: 3, title: 'Tushar' },
  ];
  
  const statusList = [
    { name: 1, title: 'New' },
    { name: 2, title: 'In Progress' },
    { name: 2, title: 'Canceled' },
    { name: 3, title: 'Completed' },
  ];

  const {
    control,
    register,
    handleSubmit,
    getValues,
    setValue,
    watch,
    reset,
    resetField
  } = formContext;

  const handleClearForm = () => reset();

  const handleSubmitForm = (e) => {
    if (!e.subject || !e.description) return;
    const payload = { 
      ...e,
      quoteId: id,
      id: props.id || 0
    };
    QuoteService.createTask(payload)
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
    <FormContainer formContext={formContext} onSuccess={handleSubmit(handleSubmitForm)}>  
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
          sx={{ m: 1, width: "46%" }}
          required
          options={priorityList}
          name={"priority"}
          label="Priority"
        ></SelectElement>
        <SelectElement
          sx={{ m: 1, width: "47%" }}
          required
          options={categoryList}
          name={"category"}
          label="Category"
        ></SelectElement>
      </div>
      <div>        
        <SelectElement
          sx={{ m: 1, width: "46%" }}
          required
          options={assignedToList}
          name={"assignedTo"}
          label="Assigned To"
        ></SelectElement>
        <SelectElement
          sx={{ m: 1, width: "47%" }}
          required
          options={pointOfContactList}
          name={"pointOfContact"}
          label="Point Of Contact"
        ></SelectElement>
      </div>

      <div className="quote-task-datepicker">
        <div className="due-date">
          <DateFnsProvider>
            <DatePickerElement label="Due Date" name={"dueDateTime"} />
          </DateFnsProvider>
        </div>
        <div className="reminder-date">
          <DateFnsProvider>
            <DatePickerElement label="Reminder Date" name={"reminderDateTime"} />
          </DateFnsProvider>
        </div>
      </div>

      <div>        
        <SelectElement
          sx={{ m: 1, width: "46%" }}
          required
          options={statusList}
          name={"status"}
          label="Status"
        ></SelectElement>
      </div>
      

      <div style={{ marginLeft: "12px", marginTop: "15px" }}>
        <Stack direction="row" spacing={2}>
          <Button
            type={"submit"}
            size="large"
            variant="contained"
          >
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
