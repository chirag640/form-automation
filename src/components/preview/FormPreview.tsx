import { useState } from 'react';
import { FormConfig, FieldConfig, SectionConfig, FormData } from '@/lib/types/form-config';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { FormValidator } from '@/lib/utils/validation';

interface FormPreviewProps {
  config: FormConfig;
}

export const FormPreview = ({ config }: FormPreviewProps) => {
  const [formData, setFormData] = useState<FormData>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleFieldChange = (key: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [key]: value
    }));

    // Clear error when user starts typing
    if (errors[key]) {
      setErrors(prev => ({
        ...prev,
        [key]: ''
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    const validateField = (field: FieldConfig) => {
      const value = formData[field.key];
      const rules = field.validation || [];
      
      if (field.required) {
        rules.unshift({ type: 'required', message: `${field.label || field.key} is required` });
      }

      const error = FormValidator.validateField(value, rules);
      if (error) {
        newErrors[field.key] = error;
        isValid = false;
      }
    };

    // Validate all fields
    config.sections.forEach(section => {
      if ('fields' in section) {
        section.fields.forEach(validateField);
      } else {
        validateField(section as FieldConfig);
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted:', formData);
      alert('Form submitted successfully! Check console for data.');
    }
  };

  const renderField = (field: FieldConfig) => {
    const value = formData[field.key] || '';
    const error = errors[field.key];

    const commonProps = {
      key: field.key,
      label: field.label,
      value,
      onChange: (e: any) => handleFieldChange(field.key, e.target.value),
      error,
      required: field.required,
      placeholder: field.placeholder
    };

    switch (field.type) {
      case 'text':
      case 'email':
      case 'password':
      case 'number':
      case 'phone':
        return (
          <Input
            {...commonProps}
            type={field.type === 'number' ? 'number' : field.type}
            helperText={field.helperText}
          />
        );

      case 'multiline':
        return (
          <div key={field.key} className="space-y-1">
            <label className="block text-sm font-medium text-gray-300">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <textarea
              value={value}
              onChange={(e) => handleFieldChange(field.key, e.target.value)}
              placeholder={field.placeholder}
              rows={4}
              className={`w-full px-3 py-2 bg-gray-800 border rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                error ? 'border-red-500' : 'border-gray-600'
              }`}
            />
            {error && <p className="text-sm text-red-600">{error}</p>}
            {field.helperText && !error && (
              <p className="text-sm text-gray-500">{field.helperText}</p>
            )}
          </div>
        );

      case 'dropdown':
        return (
          <div key={field.key} className="space-y-1">
            <label className="block text-sm font-medium text-gray-300">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <select
              value={value}
              onChange={(e) => handleFieldChange(field.key, e.target.value)}
              className={`w-full px-3 py-2 bg-gray-800 border rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                error ? 'border-red-500' : 'border-gray-600'
              }`}
            >
              <option value="">{field.placeholder || 'Select an option'}</option>
              {(field.extra.options || []).map((option: string) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {error && <p className="text-sm text-red-600">{error}</p>}
            {field.helperText && !error && (
              <p className="text-sm text-gray-500">{field.helperText}</p>
            )}
          </div>
        );

      case 'radio':
        return (
          <div key={field.key} className="space-y-1">
            <label className="block text-sm font-medium text-gray-300">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <div className="space-y-2">
              {(field.extra.options || []).map((option: string) => (
                <label key={option} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name={field.key}
                    value={option}
                    checked={value === option}
                    onChange={(e) => handleFieldChange(field.key, e.target.value)}
                    className="w-4 h-4 text-blue-600 border-gray-600 bg-gray-800 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-300">{option}</span>
                </label>
              ))}
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            {field.helperText && !error && (
              <p className="text-sm text-gray-500">{field.helperText}</p>
            )}
          </div>
        );

      case 'checkbox':
        return (
          <div key={field.key} className="space-y-1">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={!!value}
                onChange={(e) => handleFieldChange(field.key, e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </span>
            </label>
            {error && <p className="text-sm text-red-600">{error}</p>}
            {field.helperText && !error && (
              <p className="text-sm text-gray-500">{field.helperText}</p>
            )}
          </div>
        );

      case 'multi_select':
        return (
          <div key={field.key} className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <div className="space-y-2">
              {(field.extra.options || []).map((option: string) => (
                <label key={option} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={(value || []).includes(option)}
                    onChange={(e) => {
                      const currentValues = value || [];
                      if (e.target.checked) {
                        handleFieldChange(field.key, [...currentValues, option]);
                      } else {
                        handleFieldChange(field.key, currentValues.filter((v: string) => v !== option));
                      }
                    }}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{option}</span>
                </label>
              ))}
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            {field.helperText && !error && (
              <p className="text-sm text-gray-500">{field.helperText}</p>
            )}
          </div>
        );

      case 'date':
        return (
          <Input
            {...commonProps}
            type="date"
            helperText={field.helperText}
          />
        );

      case 'slider':
        return (
          <div key={field.key} className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <div className="space-y-2">
              <input
                type="range"
                min={field.extra.min || 0}
                max={field.extra.max || 100}
                step={field.extra.step || 1}
                value={value || field.extra.min || 0}
                onChange={(e) => handleFieldChange(field.key, Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-600">
                <span>{field.extra.min || 0}</span>
                <span className="font-medium">{value || field.extra.min || 0}</span>
                <span>{field.extra.max || 100}</span>
              </div>
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            {field.helperText && !error && (
              <p className="text-sm text-gray-500">{field.helperText}</p>
            )}
          </div>
        );

      case 'rating':
        const maxRating = field.extra.maxRating || 5;
        return (
          <div key={field.key} className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <div className="flex items-center space-x-1">
              {[...Array(maxRating)].map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleFieldChange(field.key, index + 1)}
                  className={`w-8 h-8 ${
                    index < (value || 0) ? 'text-yellow-400' : 'text-gray-300'
                  } hover:text-yellow-400 transition-colors`}
                >
                  ⭐
                </button>
              ))}
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            {field.helperText && !error && (
              <p className="text-sm text-gray-500">{field.helperText}</p>
            )}
          </div>
        );

      case 'color':
        return (
          <div key={field.key} className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <input
              type="color"
              value={value || '#000000'}
              onChange={(e) => handleFieldChange(field.key, e.target.value)}
              className="w-16 h-10 border border-gray-300 rounded cursor-pointer"
            />
            {error && <p className="text-sm text-red-600">{error}</p>}
            {field.helperText && !error && (
              <p className="text-sm text-gray-500">{field.helperText}</p>
            )}
          </div>
        );

      case 'file':
        return (
          <div key={field.key} className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <input
              type="file"
              onChange={(e) => handleFieldChange(field.key, e.target.files?.[0]?.name || '')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {error && <p className="text-sm text-red-600">{error}</p>}
            {field.helperText && !error && (
              <p className="text-sm text-gray-500">{field.helperText}</p>
            )}
          </div>
        );

      default:
        return (
          <Input
            {...commonProps}
            helperText={field.helperText}
          />
        );
    }
  };

  const renderSection = (section: SectionConfig) => {
    return (
      <Card key={section.id} className="mb-6">
        <CardHeader>
          <CardTitle>{section.title}</CardTitle>
          {section.description && (
            <p className="text-sm text-gray-600">{section.description}</p>
          )}
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {section.fields.map(renderField)}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {config.title || 'Form Preview'}
        </h1>
        {config.description && (
          <p className="text-gray-600">{config.description}</p>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {config.sections.map(section => {
          if ('fields' in section) {
            return renderSection(section as SectionConfig);
          } else {
            return (
              <Card key={(section as FieldConfig).key} className="mb-6">
                <CardContent className="pt-6">
                  {renderField(section as FieldConfig)}
                </CardContent>
              </Card>
            );
          }
        })}

        <div className="flex justify-end">
          <Button type="submit" size="lg">
            Submit Form
          </Button>
        </div>
      </form>
    </div>
  );
};
