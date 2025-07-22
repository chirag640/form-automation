import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { FieldConfig, ValidationRule } from '@/lib/types/form-config';
import { Plus, Trash2, Settings } from 'lucide-react';

interface PropertyPanelProps {
  field: FieldConfig | null;
  onUpdateField: (updates: Partial<FieldConfig>) => void;
}

export const PropertyPanel = ({ field, onUpdateField }: PropertyPanelProps) => {
  const [newOption, setNewOption] = useState('');

  if (!field) {
    return (
      <div className="w-80 bg-gray-800 border-l border-gray-700 p-4">
        <div className="text-center text-gray-400 mt-8">
          <Settings className="w-12 h-12 mx-auto mb-4 text-gray-600" />
          <p>Select a field to edit its properties</p>
        </div>
      </div>
    );
  }

  const handleBasicUpdate = (key: keyof FieldConfig, value: unknown) => {
    onUpdateField({ [key]: value });
  };

  const handleExtraUpdate = (key: string, value: unknown) => {
    onUpdateField({
      extra: {
        ...field.extra,
        [key]: value
      }
    });
  };

  const addOption = () => {
    if (!newOption.trim()) return;
    
    let currentOptions: string[] = [];
    if (Array.isArray(field.extra.options)) {
      currentOptions = field.extra.options.filter(opt => typeof opt === 'string');
    }
    handleExtraUpdate('options', [...currentOptions, newOption.trim()]);
    setNewOption('');
  };

  const removeOption = (index: number) => {
    let currentOptions: string[] = [];
    if (Array.isArray(field.extra.options)) {
      currentOptions = field.extra.options.filter(opt => typeof opt === 'string');
    }
    handleExtraUpdate('options', currentOptions.filter((_, i) => i !== index));
  };

  const addValidationRule = () => {
    const currentRules = field.validation || [];
    const newRule: ValidationRule = {
      type: 'required',
      message: 'This field is required'
    };
    onUpdateField({
      validation: [...currentRules, newRule]
    });
  };

  const updateValidationRule = (index: number, updates: Partial<ValidationRule>) => {
    const currentRules = field.validation || [];
    const newRules = currentRules.map((rule, i) => 
      i === index ? { ...rule, ...updates } : rule
    );
    onUpdateField({ validation: newRules });
  };

  const removeValidationRule = (index: number) => {
    const currentRules = field.validation || [];
    onUpdateField({
      validation: currentRules.filter((_, i) => i !== index)
    });
  };

  return (
    <div className="w-80 bg-gray-800 border-l border-gray-700 overflow-y-auto">
      <div className="p-4 space-y-6">
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">⚙️ Field Properties</h2>
          <div className="text-sm text-gray-400 mb-4">
            Field Type: <span className="font-medium text-blue-400">{field.type}</span>
          </div>
        </div>

        {/* Basic Properties */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Basic Properties</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              label="Field Key"
              value={field.key}
              onChange={(e) => handleBasicUpdate('key', e.target.value)}
              placeholder="field_key"
            />
            
            <Input
              label="Label"
              value={field.label || ''}
              onChange={(e) => handleBasicUpdate('label', e.target.value)}
              placeholder="Field label"
            />
            
            <Input
              label="Placeholder"
              value={field.placeholder || ''}
              onChange={(e) => handleBasicUpdate('placeholder', e.target.value)}
              placeholder="Placeholder text"
            />
            
            <Input
              label="Helper Text"
              value={field.helperText || ''}
              onChange={(e) => handleBasicUpdate('helperText', e.target.value)}
              placeholder="Helper text"
            />
            
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={field.required}
                onChange={(e) => handleBasicUpdate('required', e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Required field</span>
            </label>
          </CardContent>
        </Card>

        {/* Field-specific Properties */}
        {(field.type === 'dropdown' || field.type === 'radio' || field.type === 'multi_select') && (
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                {(Array.isArray(field.extra.options) ? field.extra.options.filter(opt => typeof opt === 'string') : []).map((option: string, index: number) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input
                      value={option}
                      onChange={(e) => {
                        let newOptions: string[] = [];
                        if (Array.isArray(field.extra.options)) {
                          newOptions = field.extra.options.filter(opt => typeof opt === 'string');
                        }
                        newOptions[index] = e.target.value;
                        handleExtraUpdate('options', newOptions);
                      }}
                      className="flex-1"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeOption(index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
              
              <div className="flex items-center space-x-2">
                <Input
                  value={newOption}
                  onChange={(e) => setNewOption(e.target.value)}
                  placeholder="Add new option"
                  className="flex-1"
                  onKeyPress={(e) => e.key === 'Enter' && addOption()}
                />
                <Button onClick={addOption} size="sm">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Number field properties */}
        {field.type === 'number' && (
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Number Properties</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                label="Minimum Value"
                type="number"
                value={typeof field.extra.min === 'number' ? field.extra.min : ''}
                onChange={(e) => handleExtraUpdate('min', e.target.value ? Number(e.target.value) : undefined)}
                placeholder="Minimum value"
              />
              
              <Input
                label="Maximum Value"
                type="number"
                value={typeof field.extra.max === 'number' ? field.extra.max : ''}
                onChange={(e) => handleExtraUpdate('max', e.target.value ? Number(e.target.value) : undefined)}
                placeholder="Maximum value"
              />
              
              <Input
                label="Step"
                type="number"
                value={typeof field.extra.step === 'number' ? field.extra.step : ''}
                onChange={(e) => handleExtraUpdate('step', e.target.value ? Number(e.target.value) : undefined)}
                placeholder="Step value"
              />
            </CardContent>
          </Card>
        )}

        {/* Text field properties */}
        {(field.type === 'text' || field.type === 'multiline') && (
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Text Properties</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                label="Min Length"
                type="number"
                value={typeof field.extra.minLength === 'number' ? field.extra.minLength : ''}
                onChange={(e) => handleExtraUpdate('minLength', e.target.value ? Number(e.target.value) : undefined)}
                placeholder="Minimum length"
              />
              
              <Input
                label="Max Length"
                type="number"
                value={typeof field.extra.maxLength === 'number' ? field.extra.maxLength : ''}
                onChange={(e) => handleExtraUpdate('maxLength', e.target.value ? Number(e.target.value) : undefined)}
                placeholder="Maximum length"
              />
              
              <Input
                label="Pattern (RegEx)"
                value={typeof field.extra.pattern === 'string' ? field.extra.pattern : ''}
                onChange={(e) => handleExtraUpdate('pattern', e.target.value)}
                placeholder="Regular expression pattern"
              />
            </CardContent>
          </Card>
        )}

        {/* Slider properties */}
        {field.type === 'slider' && (
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Slider Properties</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                label="Minimum Value"
                type="number"
                value={typeof field.extra.min === 'number' ? field.extra.min : 0}
                onChange={(e) => handleExtraUpdate('min', Number(e.target.value))}
              />
              
              <Input
                label="Maximum Value"
                type="number"
                value={typeof field.extra.max === 'number' ? field.extra.max : 100}
                onChange={(e) => handleExtraUpdate('max', Number(e.target.value))}
              />
              
              <Input
                label="Step"
                type="number"
                value={typeof field.extra.step === 'number' ? field.extra.step : 1}
                onChange={(e) => handleExtraUpdate('step', Number(e.target.value))}
              />
              
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={typeof field.extra.showLabels === 'boolean' ? field.extra.showLabels : false}
                  onChange={(e) => handleExtraUpdate('showLabels', e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Show labels</span>
              </label>
            </CardContent>
          </Card>
        )}

        {/* Rating properties */}
        {field.type === 'rating' && (
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Rating Properties</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                label="Max Rating"
                type="number"
                value={typeof field.extra.maxRating === 'number' ? field.extra.maxRating : 5}
                onChange={(e) => handleExtraUpdate('maxRating', Number(e.target.value))}
              />
              
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={typeof field.extra.allowHalfRating === 'boolean' ? field.extra.allowHalfRating : false}
                  onChange={(e) => handleExtraUpdate('allowHalfRating', e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Allow half ratings</span>
              </label>
            </CardContent>
          </Card>
        )}

        {/* Validation Rules */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center justify-between">
              Validation Rules
              <Button onClick={addValidationRule} size="sm">
                <Plus className="w-4 h-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {(field.validation || []).map((rule, index) => (
              <div key={index} className="p-3 border border-gray-200 rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <select
                    value={rule.type}
                    onChange={(e) => updateValidationRule(index, { type: e.target.value as ValidationRule['type'] })}
                    className="px-2 py-1 border border-gray-300 rounded text-sm"
                  >
                    <option value="required">Required</option>
                    <option value="minLength">Min Length</option>
                    <option value="maxLength">Max Length</option>
                    <option value="pattern">Pattern</option>
                    <option value="min">Min Value</option>
                    <option value="max">Max Value</option>
                  </select>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeValidationRule(index)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                
                {rule.type !== 'required' && (
                  <Input
                    label="Value"
                    value={typeof rule.value === 'string' || typeof rule.value === 'number' ? rule.value : ''}
                    onChange={(e) => updateValidationRule(index, { value: e.target.value })}
                    placeholder="Validation value"
                  />
                )}
                
                <Input
                  label="Error Message"
                  value={rule.message}
                  onChange={(e) => updateValidationRule(index, { message: e.target.value })}
                  placeholder="Error message"
                />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
