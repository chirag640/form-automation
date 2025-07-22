export interface FormConfig {
  id: string;
  title?: string;
  description?: string;
  sections: (SectionConfig | FieldConfig)[];
  theme?: FormTheme;
}

export interface SectionConfig {
  id: string;
  title?: string;
  description?: string;
  collapsible: boolean;
  initiallyExpanded: boolean;
  fields: FieldConfig[];
}

export interface FieldConfig {
  key: string;
  type: FieldType;
  label?: string;
  required: boolean;
  placeholder?: string;
  helperText?: string;
  extra: Record<string, unknown>;
  validation?: ValidationRule[];
  visibleIf?: Record<string, unknown>;
}

export type FieldType = 
  | 'text'
  | 'email'
  | 'password'
  | 'number'
  | 'phone'
  | 'multiline'
  | 'dropdown'
  | 'radio'
  | 'checkbox'
  | 'multi_select'
  | 'date'
  | 'slider'
  | 'rating'
  | 'color'
  | 'file';

export interface ValidationRule {
  type: 'required' | 'minLength' | 'maxLength' | 'pattern' | 'min' | 'max' | 'custom';
  value?: unknown;
  message: string;
}

export interface FormTheme {
  primaryColor?: string;
  backgroundColor?: string;
  errorColor?: string;
  labelStyle?: {
    fontSize?: string;
    fontWeight?: string;
    color?: string;
  };
  inputStyle?: {
    fontSize?: string;
    padding?: string;
    borderRadius?: string;
    borderColor?: string;
  };
  labelAboveField?: boolean;
  labelSpacing?: number;
}

export interface FormData {
  [key: string]: unknown;
}

export interface FormErrors {
  [key: string]: string | null;
}
