'use client';

import { type ReactNode } from 'react';
import { type LucideIcon } from 'lucide-react';
import {
  type ControllerRenderProps,
  type Path,
  type FieldValues,
  type UseFormReturn,
} from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/src/shared/modules/components/ui/form';
import { Input } from '@/src/shared/modules/components/ui/input';
import { Textarea } from '@/src/shared/modules/components/ui/textarea';
import { Checkbox } from '@/src/shared/modules/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from '@/src/shared/modules/components/ui/select';
import { cn } from '@/src/shared/modules/lib/utils';
import { MultiSelect, type MultiSelectOption } from './multi-select';
import { DatePicker } from './date-picker.component';

/**
 * Factory para criar componentes de formulário tipados para um schema específico
 */
export function createFormFields<TFormData extends FieldValues>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useFormContext: () => { form: UseFormReturn<TFormData, any, TFormData> }
) {
  type FormFieldPath = Path<TFormData>;

  interface BaseFormFieldProps {
    name: FormFieldPath;
    label?: string;
    placeholder?: string;
    disabled?: boolean;
    className?: string;
  }

  interface InputFieldProps extends BaseFormFieldProps {
    variant: 'input';
    type?: 'text' | 'email' | 'number' | 'tel';
    icon?: LucideIcon;
  }

  interface TextareaFieldProps extends BaseFormFieldProps {
    variant: 'textarea';
    rows?: number;
  }

  interface SelectFieldProps extends BaseFormFieldProps {
    variant: 'select';
    children: ReactNode;
  }

  interface CheckboxFieldProps extends BaseFormFieldProps {
    variant: 'checkbox';
  }

  interface MultiSelectFieldProps extends BaseFormFieldProps {
    variant: 'multiselect';
    options: MultiSelectOption[];
  }

  interface DatePickerFieldProps extends BaseFormFieldProps {
    variant: 'datepicker';
  }

  interface CustomFieldProps extends BaseFormFieldProps {
    variant: 'custom';
    render: (
      field: ControllerRenderProps<TFormData, FormFieldPath>
    ) => ReactNode;
  }

  type FormFieldComponentProps =
    | InputFieldProps
    | TextareaFieldProps
    | SelectFieldProps
    | CheckboxFieldProps
    | MultiSelectFieldProps
    | DatePickerFieldProps
    | CustomFieldProps;

  function FormFieldComponent(props: FormFieldComponentProps) {
    const { form } = useFormContext();
    const { name, label, disabled, className } = props;

    const renderField = (
      field: ControllerRenderProps<TFormData, FormFieldPath>
    ) => {
      switch (props.variant) {
        case 'input': {
          const Icon = props.icon;
          return (
            <div className={cn('relative flex rounded-md border', className)}>
              {Icon && (
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  <Icon className="h-4 w-4" />
                </div>
              )}
              <FormControl>
                <Input
                  type={props.type ?? 'text'}
                  placeholder={props.placeholder}
                  disabled={disabled}
                  className={cn(
                    'border-0 focus-visible:ring-0',
                    Icon && 'pl-10'
                  )}
                  {...field}
                  value={(field.value as string | number | undefined) ?? ''}
                />
              </FormControl>
            </div>
          );
        }

        case 'textarea':
          return (
            <FormControl>
              <Textarea
                placeholder={props.placeholder}
                disabled={disabled}
                rows={props.rows ?? 4}
                className={className}
                {...field}
                value={(field.value as string | undefined) ?? ''}
              />
            </FormControl>
          );

        case 'select':
          return (
            <FormControl>
              <Select
                onValueChange={field.onChange}
                value={(field.value as string | undefined) ?? ''}
                disabled={disabled}
              >
                <SelectTrigger className={className}>
                  <SelectValue placeholder={props.placeholder} />
                </SelectTrigger>
                <SelectContent>{props.children}</SelectContent>
              </Select>
            </FormControl>
          );

        case 'checkbox':
          return (
            <FormControl>
              <div className="flex items-center gap-3">
                <Checkbox
                  id={name}
                  checked={(field.value as boolean | undefined) ?? false}
                  onCheckedChange={field.onChange}
                  disabled={disabled}
                />
                {label && (
                  <label
                    htmlFor={name}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    {label}
                  </label>
                )}
              </div>
            </FormControl>
          );

        case 'multiselect':
          return (
            <FormControl>
              <MultiSelect
                value={(field.value as number[] | undefined) ?? []}
                onChange={field.onChange}
                options={props.options}
                placeholder={props.placeholder}
                disabled={disabled}
                className={className}
              />
            </FormControl>
          );

        case 'datepicker':
          return (
            <FormControl>
              <DatePicker
                value={field.value as Date | undefined}
                onChange={field.onChange}
                placeholder={props.placeholder}
                disabled={disabled}
                className={className}
              />
            </FormControl>
          );

        case 'custom':
          return <FormControl>{props.render(field)}</FormControl>;

        default:
          return null;
      }
    };

    return (
      <FormField
        control={form.control as any} // eslint-disable-line @typescript-eslint/no-explicit-any
        name={name}
        render={({ field }) => (
          <FormItem className="flex-1">
            {props.variant !== 'checkbox' && label && (
              <FormLabel className="text-sm font-medium">{label}</FormLabel>
            )}
            {renderField(
              field as unknown as ControllerRenderProps<
                TFormData,
                FormFieldPath
              >
            )}
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }

  interface BaseProps {
    name: FormFieldPath;
    label?: string;
    placeholder?: string;
    disabled?: boolean;
    className?: string;
  }

  function TextField({
    icon,
    type = 'text',
    ...props
  }: BaseProps & {
    icon?: LucideIcon;
    type?: 'text' | 'email' | 'number' | 'tel';
  }) {
    return (
      <FormFieldComponent variant="input" type={type} icon={icon} {...props} />
    );
  }

  function TextareaField({ rows, ...props }: BaseProps & { rows?: number }) {
    return <FormFieldComponent variant="textarea" rows={rows} {...props} />;
  }

  function SelectField({
    children,
    ...props
  }: BaseProps & { children: ReactNode }) {
    return (
      <FormFieldComponent variant="select" {...props}>
        {children}
      </FormFieldComponent>
    );
  }

  function CheckboxField(props: Readonly<BaseProps>) {
    return <FormFieldComponent variant="checkbox" {...props} />;
  }

  function MultiSelectField({
    options,
    ...props
  }: BaseProps & { options: MultiSelectOption[] }) {
    return (
      <FormFieldComponent variant="multiselect" options={options} {...props} />
    );
  }

  function DatePickerField(props: Readonly<BaseProps>) {
    return <FormFieldComponent variant="datepicker" {...props} />;
  }

  function CustomField({
    render,
    ...props
  }: BaseProps & {
    render: (
      field: ControllerRenderProps<TFormData, FormFieldPath>
    ) => ReactNode;
  }) {
    return <FormFieldComponent variant="custom" render={render} {...props} />;
  }

  return {
    FormFieldComponent,
    TextField,
    TextareaField,
    SelectField,
    CheckboxField,
    MultiSelectField,
    DatePickerField,
    CustomField,
  };
}
