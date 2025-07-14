import { useState, useCallback } from 'react';
import { FormConfig, FieldConfig, SectionConfig, FormData, FormErrors } from '@/lib/types/form-config';
import { FormValidator } from '@/lib/utils/validation';

export interface UseFormBuilderOptions {
  initialConfig?: FormConfig;
  onConfigChange?: (config: FormConfig) => void;
}

export const useFormBuilder = (options: UseFormBuilderOptions = {}) => {
  const [formConfig, setFormConfig] = useState<FormConfig>(
    options.initialConfig || {
      id: 'form-' + Date.now(),
      title: 'New Form',
      description: '',
      sections: []
    }
  );

  const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({});
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const updateConfig = useCallback((newConfig: FormConfig) => {
    setFormConfig(newConfig);
    options.onConfigChange?.(newConfig);
  }, [options]);

  const addField = useCallback((fieldType: string, sectionId?: string) => {
    const newField: FieldConfig = {
      key: `field_${Date.now()}`,
      type: fieldType as any,
      label: `New ${fieldType} Field`,
      required: false,
      extra: {}
    };

    if (sectionId) {
      // Add to specific section
      const newConfig = { ...formConfig };
      const section = newConfig.sections.find(s => 'id' in s && s.id === sectionId) as SectionConfig;
      if (section) {
        section.fields.push(newField);
        updateConfig(newConfig);
      }
    } else {
      // Add as standalone field
      updateConfig({
        ...formConfig,
        sections: [...formConfig.sections, newField]
      });
    }

    setSelectedFieldId(newField.key);
  }, [formConfig, updateConfig]);

  const removeField = useCallback((fieldKey: string) => {
    const newConfig = { ...formConfig };
    
    // Remove from sections
    newConfig.sections = newConfig.sections.filter(section => {
      if ('fields' in section) {
        section.fields = section.fields.filter(field => field.key !== fieldKey);
        return true;
      }
      return (section as FieldConfig).key !== fieldKey;
    });

    updateConfig(newConfig);
    
    if (selectedFieldId === fieldKey) {
      setSelectedFieldId(null);
    }
  }, [formConfig, updateConfig, selectedFieldId]);

  const updateField = useCallback((fieldKey: string, updates: Partial<FieldConfig>) => {
    const newConfig = { ...formConfig };
    
    // Update field in sections
    newConfig.sections = newConfig.sections.map(section => {
      if ('fields' in section) {
        return {
          ...section,
          fields: section.fields.map(field => 
            field.key === fieldKey ? { ...field, ...updates } : field
          )
        };
      }
      
      if ((section as FieldConfig).key === fieldKey) {
        return { ...section, ...updates };
      }
      
      return section;
    });

    updateConfig(newConfig);
  }, [formConfig, updateConfig]);

  const addSection = useCallback(() => {
    const newSection: SectionConfig = {
      id: `section_${Date.now()}`,
      title: 'New Section',
      description: '',
      collapsible: false,
      initiallyExpanded: true,
      fields: []
    };

    updateConfig({
      ...formConfig,
      sections: [...formConfig.sections, newSection]
    });
  }, [formConfig, updateConfig]);

  const removeSection = useCallback((sectionId: string) => {
    updateConfig({
      ...formConfig,
      sections: formConfig.sections.filter(section => 
        !('id' in section) || section.id !== sectionId
      )
    });
  }, [formConfig, updateConfig]);

  const updateSection = useCallback((sectionId: string, updates: Partial<SectionConfig>) => {
    const newConfig = { ...formConfig };
    
    newConfig.sections = newConfig.sections.map(section => {
      if ('id' in section && section.id === sectionId) {
        return { ...section, ...updates };
      }
      return section;
    });

    updateConfig(newConfig);
  }, [formConfig, updateConfig]);

  const validateForm = useCallback((): boolean => {
    const errors: FormErrors = {};
    let isValid = true;

    const validateField = (field: FieldConfig) => {
      const value = formData[field.key];
      const rules = field.validation || [];
      
      if (field.required) {
        rules.unshift({ type: 'required', message: `${field.label || field.key} is required` });
      }

      const error = FormValidator.validateField(value, rules);
      if (error) {
        errors[field.key] = error;
        isValid = false;
      }
    };

    // Validate all fields
    formConfig.sections.forEach(section => {
      if ('fields' in section) {
        section.fields.forEach(validateField);
      } else {
        validateField(section as FieldConfig);
      }
    });

    setFormErrors(errors);
    return isValid;
  }, [formConfig, formData]);

  const updateFormData = useCallback((fieldKey: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [fieldKey]: value
    }));

    // Clear error for this field
    if (formErrors[fieldKey]) {
      setFormErrors(prev => ({
        ...prev,
        [fieldKey]: null
      }));
    }
  }, [formErrors]);

  const getSelectedField = useCallback((): FieldConfig | null => {
    if (!selectedFieldId) return null;

    for (const section of formConfig.sections) {
      if ('fields' in section) {
        const field = section.fields.find(f => f.key === selectedFieldId);
        if (field) return field;
      } else if ((section as FieldConfig).key === selectedFieldId) {
        return section as FieldConfig;
      }
    }

    return null;
  }, [selectedFieldId, formConfig]);

  const duplicateField = useCallback((fieldKey: string) => {
    const fieldToDuplicate = getSelectedField();
    if (!fieldToDuplicate) return;

    const newField: FieldConfig = {
      ...fieldToDuplicate,
      key: `field_${Date.now()}`,
      label: `${fieldToDuplicate.label} (Copy)`
    };

    // Find the section containing the original field and add the duplicate
    const newConfig = { ...formConfig };
    let added = false;

    newConfig.sections = newConfig.sections.map(section => {
      if ('fields' in section) {
        const fieldIndex = section.fields.findIndex(f => f.key === fieldKey);
        if (fieldIndex !== -1) {
          section.fields.splice(fieldIndex + 1, 0, newField);
          added = true;
        }
        return section;
      }
      return section;
    });

    if (!added) {
      // If it's a standalone field, add after it
      const fieldIndex = newConfig.sections.findIndex(s => 
        !('fields' in s) && (s as FieldConfig).key === fieldKey
      );
      if (fieldIndex !== -1) {
        newConfig.sections.splice(fieldIndex + 1, 0, newField);
      }
    }

    updateConfig(newConfig);
    setSelectedFieldId(newField.key);
  }, [formConfig, updateConfig, getSelectedField]);

  return {
    formConfig,
    setFormConfig: updateConfig,
    selectedFieldId,
    setSelectedFieldId,
    formData,
    formErrors,
    
    // Field operations
    addField,
    removeField,
    updateField,
    duplicateField,
    getSelectedField,
    
    // Section operations
    addSection,
    removeSection,
    updateSection,
    
    // Form data operations
    updateFormData,
    validateForm,
    
    // Utility
    getAllFields: () => {
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
  };
};
