import { FormConfig, FieldConfig } from '@/lib/types/form-config';

export class FormDebugger {
  /**
   * Validates a form configuration and identifies potential issues
   */
  static validateFormConfig(formConfig: FormConfig): ValidationResult {
    const issues: Issue[] = [];
    const warnings: Warning[] = [];

    // Check for dropdown option issues
    this.validateDropdownFields(formConfig, issues, warnings);
    
    // Check for field type consistency
    this.validateFieldTypes(formConfig, issues, warnings);
    
    // Check for missing required properties
    this.validateRequiredProperties(formConfig, issues, warnings);

    return {
      isValid: issues.length === 0,
      issues,
      warnings,
      summary: this.generateSummary(formConfig)
    };
  }

  private static validateDropdownFields(formConfig: FormConfig, issues: Issue[], warnings: Warning[]) {
    const allFields = this.extractAllFields(formConfig);
    
    allFields.forEach(field => {
      if (field.type === 'dropdown' || field.type === 'radio' || field.type === 'multi_select') {
        const options = field.extra.options || [];
        
        if (options.length === 0) {
          issues.push({
            type: 'missing_options',
            fieldKey: field.key,
            fieldType: field.type,
            message: `${field.type} field "${field.key}" has no options defined`
          });
        }
        
        if (options.length < 2) {
          warnings.push({
            type: 'insufficient_options',
            fieldKey: field.key,
            fieldType: field.type,
            message: `${field.type} field "${field.key}" has only ${options.length} option(s). Consider adding more options.`
          });
        }

        // Check for duplicate options
        const uniqueOptions = new Set(options);
        if (uniqueOptions.size !== options.length) {
          warnings.push({
            type: 'duplicate_options',
            fieldKey: field.key,
            fieldType: field.type,
            message: `${field.type} field "${field.key}" has duplicate options`
          });
        }

        // Check for empty options
        const emptyOptions = options.filter((opt: string) => !opt.trim());
        if (emptyOptions.length > 0) {
          issues.push({
            type: 'empty_options',
            fieldKey: field.key,
            fieldType: field.type,
            message: `${field.type} field "${field.key}" has ${emptyOptions.length} empty option(s)`
          });
        }
      }
    });
  }

  private static validateFieldTypes(formConfig: FormConfig, issues: Issue[], warnings: Warning[]) {
    const allFields = this.extractAllFields(formConfig);
    const validTypes = [
      'text', 'email', 'password', 'number', 'phone', 'multiline',
      'dropdown', 'radio', 'checkbox', 'multi_select', 'date',
      'slider', 'rating', 'color', 'file'
    ];

    allFields.forEach(field => {
      if (!validTypes.includes(field.type)) {
        issues.push({
          type: 'invalid_field_type',
          fieldKey: field.key,
          fieldType: field.type,
          message: `Field "${field.key}" has invalid type "${field.type}"`
        });
      }
    });
  }

  private static validateRequiredProperties(formConfig: FormConfig, issues: Issue[], warnings: Warning[]) {
    const allFields = this.extractAllFields(formConfig);

    allFields.forEach(field => {
      if (!field.key || !field.key.trim()) {
        issues.push({
          type: 'missing_key',
          fieldKey: field.key || 'undefined',
          fieldType: field.type,
          message: `Field is missing a key`
        });
      }

      if (!field.label || !field.label.trim()) {
        warnings.push({
          type: 'missing_label',
          fieldKey: field.key,
          fieldType: field.type,
          message: `Field "${field.key}" is missing a label`
        });
      }
    });
  }

  private static extractAllFields(formConfig: FormConfig): FieldConfig[] {
    const fields: FieldConfig[] = [];
    
    formConfig.sections.forEach(section => {
      if ('fields' in section) {
        fields.push(...section.fields);
      } else {
        fields.push(section as FieldConfig);
      }
    });
    
    return fields;
  }

  private static generateSummary(formConfig: FormConfig): FormSummary {
    const allFields = this.extractAllFields(formConfig);
    const fieldTypeCount: Record<string, number> = {};
    
    allFields.forEach(field => {
      fieldTypeCount[field.type] = (fieldTypeCount[field.type] || 0) + 1;
    });

    const dropdownFields = allFields.filter(f => f.type === 'dropdown');
    const radioFields = allFields.filter(f => f.type === 'radio');
    const optionFields = allFields.filter(f => 
      ['dropdown', 'radio', 'multi_select'].includes(f.type)
    );

    return {
      totalFields: allFields.length,
      totalSections: formConfig.sections.filter(s => 'fields' in s).length,
      fieldTypeCount,
      dropdownFieldCount: dropdownFields.length,
      radioFieldCount: radioFields.length,
      fieldsWithOptions: optionFields.length,
      averageOptionsPerField: optionFields.length > 0 
        ? optionFields.reduce((sum, field) => sum + (field.extra.options?.length || 0), 0) / optionFields.length 
        : 0
    };
  }

  /**
   * Logs detailed information about form configuration
   */
  static debugFormConfig(formConfig: FormConfig): void {
    console.group('🐛 Form Configuration Debug');
    
    const validation = this.validateFormConfig(formConfig);
    
    console.log('📊 Form Summary:', validation.summary);
    
    if (validation.issues.length > 0) {
      console.group('❌ Issues Found:');
      validation.issues.forEach(issue => {
        console.error(`${issue.type}: ${issue.message}`, issue);
      });
      console.groupEnd();
    }
    
    if (validation.warnings.length > 0) {
      console.group('⚠️ Warnings:');
      validation.warnings.forEach(warning => {
        console.warn(`${warning.type}: ${warning.message}`, warning);
      });
      console.groupEnd();
    }
    
    // Log all dropdown/radio fields with their options
    const optionFields = this.extractAllFields(formConfig).filter(f => 
      ['dropdown', 'radio', 'multi_select'].includes(f.type)
    );
    
    if (optionFields.length > 0) {
      console.group('📋 Fields with Options:');
      optionFields.forEach(field => {
        console.log(`${field.type} "${field.key}":`, {
          label: field.label,
          options: field.extra.options || [],
          optionCount: (field.extra.options || []).length
        });
      });
      console.groupEnd();
    }
    
    console.groupEnd();
  }

  /**
   * Creates a sanitized version of form config for debugging
   */
  static sanitizeFormConfig(formConfig: FormConfig): FormConfig {
    const sanitized = JSON.parse(JSON.stringify(formConfig));
    
    // Fix common issues
    const allFields = this.extractAllFields(sanitized);
    allFields.forEach(field => {
      // Ensure options array exists for option-based fields
      if (['dropdown', 'radio', 'multi_select'].includes(field.type)) {
        if (!field.extra.options) {
          field.extra.options = [];
        }
        
        // Remove empty options
        field.extra.options = field.extra.options.filter((opt: string) => opt && opt.trim());
        
        // Remove duplicates
        field.extra.options = [...new Set(field.extra.options)];
      }
      
      // Ensure required properties
      if (!field.key) {
        field.key = `field_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      }
      
      if (!field.label) {
        field.label = field.key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      }
    });
    
    return sanitized;
  }
}

interface ValidationResult {
  isValid: boolean;
  issues: Issue[];
  warnings: Warning[];
  summary: FormSummary;
}

interface Issue {
  type: string;
  fieldKey: string;
  fieldType: string;
  message: string;
}

interface Warning {
  type: string;
  fieldKey: string;
  fieldType: string;
  message: string;
}

interface FormSummary {
  totalFields: number;
  totalSections: number;
  fieldTypeCount: Record<string, number>;
  dropdownFieldCount: number;
  radioFieldCount: number;
  fieldsWithOptions: number;
  averageOptionsPerField: number;
}
