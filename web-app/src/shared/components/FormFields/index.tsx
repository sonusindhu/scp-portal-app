/**
 * Reusable form field components with built-in validation
 * Wraps shadcn-ui components with react-hook-form integration
 */

import React from "react";
import { useFormContext, Controller, RegisterOptions, FormProvider } from "react-hook-form";
import { ValidationRules } from "../../../utils/validation.util";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

/**
 * Common form field props
 */
interface BaseFieldProps {
  name: string;
  label: string;
  className?: string;
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
  className?: string;
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
  className = "m-2 w-full",
  disabled = false,
  helperText,
  placeholder,
  multiline = false,
  rows,
  autoFocus = false,
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <div className={cn("space-y-2", className)}>
          <Label htmlFor={name}>{label}</Label>
          {multiline ? (
            <textarea
              {...field}
              id={name}
              placeholder={placeholder}
              disabled={disabled}
              autoFocus={autoFocus}
              rows={rows}
              className={cn(
                "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                error && "border-red-500"
              )}
            />
          ) : (
            <Input
              {...field}
              id={name}
              type={type}
              placeholder={placeholder}
              disabled={disabled}
              autoFocus={autoFocus}
              className={error ? "border-red-500" : ""}
            />
          )}
          <div className="min-h-[20px]">
            {error && <p className="text-sm text-red-500">{error.message}</p>}
            {helperText && !error && <p className="text-sm text-gray-500">{helperText}</p>}
          </div>
        </div>
      )}
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
  className = "m-2 w-full",
  disabled = false,
  labelKey = "value",
  valueKey = "id",
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <div className={cn("space-y-2", className)}>
          <Label htmlFor={name}>{label}</Label>
          <Select
            value={field.value?.toString()}
            onValueChange={(value) => {
              // Convert back to number if the original value was a number
              const option = options.find(opt => opt[valueKey]?.toString() === value);
              field.onChange(option ? option[valueKey] : value);
            }}
            disabled={disabled}
          >
            <SelectTrigger className={error ? "border-red-500" : ""}>
              <SelectValue placeholder={`Select ${label}`} />
            </SelectTrigger>
            <SelectContent>
              {options
                .filter(option => option[valueKey] !== "" && option[valueKey] != null)
                .map((option) => (
                  <SelectItem
                    key={option[valueKey]}
                    value={option[valueKey]?.toString()}
                  >
                    {option[labelKey]}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
          <div className="min-h-[20px]">
            {error && <p className="text-sm text-red-500">{error.message}</p>}
          </div>
        </div>
      )}
    />
  );
};

/**
 * Reusable checkbox field
 */
export const FormCheckboxField: React.FC<FormCheckboxFieldProps> = ({
  name,
  label,
  className = "m-2",
  disabled = false,
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className={cn("flex items-center space-x-2", className)}>
          <Checkbox
            id={name}
            checked={field.value}
            onCheckedChange={field.onChange}
            disabled={disabled}
          />
          <Label
            htmlFor={name}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {label}
          </Label>
          {error && <p className="text-sm text-red-500">{error.message}</p>}
        </div>
      )}
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
  className?: string;
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
  className = "ml-3 mt-4",
}) => {
  return (
    <div className={className}>
      <div className="flex flex-row gap-4">
        <Button 
          type="submit" 
          size="lg" 
          variant="default"
          disabled={isSubmitting}
        >
          {submitLabel}
        </Button>
        {showCancel && (
          <Button
            size="lg"
            variant="outline"
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            {cancelLabel}
          </Button>
        )}
      </div>
    </div>
  );
};

/**
 * Form container component - wraps form with FormProvider
 * Provides compatibility with react-hook-form-mui FormContainer
 */
interface FormContainerProps {
  formContext: any;
  onSuccess: (data: any) => void;
  children: React.ReactNode;
}

export const FormContainer: React.FC<FormContainerProps> = ({
  formContext,
  onSuccess,
  children,
}) => {
  const { handleSubmit, ...methods } = formContext;

  return (
    <FormProvider {...formContext}>
      <form onSubmit={handleSubmit(onSuccess)}>
        {children}
      </form>
    </FormProvider>
  );
};

/**
 * Compatibility exports - allows direct usage like react-hook-form-mui
 * These wrap our form components for drop-in replacement
 */
export const TextFieldElement = FormTextField;
export const SelectElement = FormSelectField;
export const CheckboxElement = FormCheckboxField;
