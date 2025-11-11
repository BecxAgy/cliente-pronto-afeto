'use client';
import { type ReactNode } from 'react';
import { type LucideIcon } from 'lucide-react';
import { type ControllerRenderProps, type Path } from 'react-hook-form';
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
import { useProposalFormContext } from '@/src/subdomains/proposal/contexts/proposal-form.context';
import { type ProposalFormSchemaProps } from '@/src/subdomains/proposal/schemas';

// Type helper para extrair todos os possíveis paths do formulário
type FormFieldPath = Path<ProposalFormSchemaProps>;

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

interface CustomFieldProps extends BaseFormFieldProps {
  variant: 'custom';
  render: (
    field: ControllerRenderProps<ProposalFormSchemaProps, FormFieldPath>
  ) => ReactNode;
}

type FormFieldComponentProps =
  | InputFieldProps
  | TextareaFieldProps
  | SelectFieldProps
  | CheckboxFieldProps
  | CustomFieldProps;

function FormFieldComponent(props: FormFieldComponentProps) {
  const { form } = useProposalFormContext();
  const { name, label, disabled, className } = props;

  const renderField = (
    field: ControllerRenderProps<ProposalFormSchemaProps, FormFieldPath>
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
                className={cn('border-0 focus-visible:ring-0', Icon && 'pl-10')}
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
              ProposalFormSchemaProps,
              FormFieldPath
            >
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default FormFieldComponent;

interface BaseProps {
  name: FormFieldPath;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export function TextField({
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

export function TextareaField({
  rows,
  ...props
}: BaseProps & { rows?: number }) {
  return <FormFieldComponent variant="textarea" rows={rows} {...props} />;
}

export function SelectField({
  children,
  ...props
}: BaseProps & { children: ReactNode }) {
  return (
    <FormFieldComponent variant="select" {...props}>
      {children}
    </FormFieldComponent>
  );
}

export function CheckboxField(props: Readonly<BaseProps>) {
  return <FormFieldComponent variant="checkbox" {...props} />;
}

export function CustomField({
  render,
  ...props
}: BaseProps & {
  render: (
    field: ControllerRenderProps<ProposalFormSchemaProps, FormFieldPath>
  ) => ReactNode;
}) {
  return <FormFieldComponent variant="custom" render={render} {...props} />;
}
