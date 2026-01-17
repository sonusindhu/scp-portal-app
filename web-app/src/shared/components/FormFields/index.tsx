/**
 * Reusable form field components with built-in validation
 * Wraps react-hook-form-mui components with standardized styling and validation
 */

import React from "react";
import { TextFieldElement, SelectElement, CheckboxElement } from "react-hook-form-mui";
import { SxProps, Theme, Button, Stack } from "@mui/material";
import { RegisterOptions } from "react-hook-form";
import { ValidationRules } from "../../../utils/validation.util";

/**
 * Common form field props
 */
interface BaseFieldProps {
  name: string;
  label: string;
  sx?: SxProps<Theme>;
  disabled?: boolean;
  helperText?: string;
}

/**
 * Text field props
 */
interface FormTextFieldProps extends BaseFieldProps {
  type?: "text" | "email" | "password" | "number" | "tel" | "url" | "date";
  rules?: RegisterOptions;
  placeholder?: string;
  multiline?: boolean;
  rows?: number;
  autoFocus?: boolean;
  InputLabelProps?: any;
}

/**
 * Select field props
 */
interface FormSelectFieldProps extends BaseFieldProps {
  options: any[];
  rules?: RegisterOptions;
  labelKey?: string;
  valueKey?: string;
}

/**
 * Checkbox field props
 */
interface FormCheckboxFieldProps {
  name: string;
  label: string;
  sx?: SxProps<Theme>;
  disabled?: boolean;
}

/**
 * Standard form field width configuration
 */
export const FieldWidths = {
  FULL: "100%",
  DRAWER: 410,
  STANDARD: "31%",
  HALF: "48%",
} as const;

/**
 * Standard form field margin
 */
export const FieldMargin = { m: 1 } as const;

/**
 * Reusable validated text field
 */
export const FormTextField: React.FC<FormTextFieldProps> = ({
  name,
  label,
  type = "text",
  rules,
  sx = { m: 1, width: FieldWidths.FULL },
  disabled = false,
  helperText,
  placeholder,
  multiline = false,
  rows,
  autoFocus = false,
  InputLabelProps,
}) => {
  return (
    <TextFieldElement
      name={name}
      label={label}
      type={type}
      rules={rules}
      sx={sx}
      disabled={disabled}
      helperText={helperText}
      placeholder={placeholder}
      multiline={multiline}
      rows={rows}
      autoFocus={autoFocus}
      InputLabelProps={InputLabelProps}
      variant="outlined"
      margin="dense"
    />
  );
};

/**
 * Reusable validated select field
 */
export const FormSelectField: React.FC<FormSelectFieldProps> = ({
  name,
  label,
  options,
  rules,
  sx = { m: 1, width: FieldWidths.FULL },
  disabled = false,
  labelKey = "title",
  valueKey = "id",
}) => {
  return (
    <SelectElement
      name={name}
      label={label}
      options={options}
      rules={rules}
      sx={sx}
      disabled={disabled}
      labelKey={labelKey}
      valueKey={valueKey}
    />
  );
};

/**
 * Reusable checkbox field
 */
export const FormCheckboxField: React.FC<FormCheckboxFieldProps> = ({
  name,
  label,
  sx = { m: 1 },
  disabled = false,
}) => {
  return (
    <CheckboxElement
      name={name}
      label={label}
      sx={sx}
      disabled={disabled}
    />
  );
};

/**
 * Pre-configured common form fields with validation
 */
export const CommonFields = {
  /**
   * Email field with validation
   */
  Email: (props: Omit<FormTextFieldProps, "type" | "rules">) => (
    <FormTextField
      {...props}
      type="email"
      rules={ValidationRules.email(true)}
    />
  ),

  /**
   * Phone field with validation
   */
  Phone: (props: Omit<FormTextFieldProps, "type" | "rules">) => (
    <FormTextField
      {...props}
      type="tel"
      rules={ValidationRules.phone(true)}
    />
  ),

  /**
   * First name field with validation
   */
  FirstName: (props: Omit<FormTextFieldProps, "rules">) => (
    <FormTextField
      {...props}
      rules={ValidationRules.name(120, true)}
    />
  ),

  /**
   * Last name field with validation
   */
  LastName: (props: Omit<FormTextFieldProps, "rules">) => (
    <FormTextField
      {...props}
      rules={ValidationRules.name(120, true)}
    />
  ),

  /**
   * Address line 1 field with validation
   */
  Address1: (props: Omit<FormTextFieldProps, "rules">) => (
    <FormTextField
      {...props}
      rules={ValidationRules.address(true)}
    />
  ),

  /**
   * Address line 2 field (optional)
   */
  Address2: (props: Omit<FormTextFieldProps, "rules">) => (
    <FormTextField
      {...props}
      rules={ValidationRules.address(false)}
    />
  ),

  /**
   * City field with validation
   */
  City: (props: Omit<FormTextFieldProps, "rules">) => (
    <FormTextField
      {...props}
      rules={ValidationRules.city(true)}
    />
  ),

  /**
   * State field with validation
   */
  State: (props: Omit<FormTextFieldProps, "rules">) => (
    <FormTextField
      {...props}
      rules={ValidationRules.state(true)}
    />
  ),

  /**
   * Country field with validation
   */
  Country: (props: Omit<FormTextFieldProps, "rules">) => (
    <FormTextField
      {...props}
      rules={ValidationRules.country(true)}
    />
  ),

  /**
   * Zipcode field with validation
   */
  Zipcode: (props: Omit<FormTextFieldProps, "rules">) => (
    <FormTextField
      {...props}
      rules={ValidationRules.zipcode(true)}
    />
  ),

  /**
   * Extension field with validation (optional numeric)
   */
  Extension: (props: Omit<FormTextFieldProps, "type" | "rules">) => (
    <FormTextField
      {...props}
      type="number"
      rules={ValidationRules.extension(false)}
    />
  ),

  /**
   * Department field with validation
   */
  Department: (props: Omit<FormTextFieldProps, "rules">) => (
    <FormTextField
      {...props}
      rules={ValidationRules.department(true)}
    />
  ),

  /**
   * Job title field with validation
   */
  JobTitle: (props: Omit<FormTextFieldProps, "rules">) => (
    <FormTextField
      {...props}
      rules={ValidationRules.jobTitle(true)}
    />
  ),

  /**
   * Password field with validation
   */
  Password: (props: Omit<FormTextFieldProps, "type" | "rules">) => (
    <FormTextField
      {...props}
      type="password"
      rules={ValidationRules.password(8, 100)}
    />
  ),

  /**
   * Status select field
   */
  Status: (props: Omit<FormSelectFieldProps, "rules">) => (
    <FormSelectField
      {...props}
      rules={ValidationRules.select(true)}
    />
  ),
} as const;

/**
 * Form action buttons props
 */
interface FormActionsProps {
  onCancel?: () => void;
  submitLabel?: string;
  cancelLabel?: string;
  isSubmitting?: boolean;
  showCancel?: boolean;
  sx?: SxProps<Theme>;
}

/**
 * Reusable form action buttons (Submit/Cancel)
 */
export const FormActions: React.FC<FormActionsProps> = ({
  onCancel,
  submitLabel = "Save",
  cancelLabel = "Cancel",
  isSubmitting = false,
  showCancel = true,
  sx = { marginLeft: "12px", marginTop: "15px" },
}) => {
  return (
    <div style={sx as any}>
      <Stack direction="row" spacing={2}>
        <Button 
          type="submit" 
          size="large" 
          variant="contained"
          disabled={isSubmitting}
        >
          {submitLabel}
        </Button>
        {showCancel && (
          <Button
            size="large"
            variant="outlined"
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            {cancelLabel}
          </Button>
        )}
      </Stack>
    </div>
  );
};
