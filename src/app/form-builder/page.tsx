'use client';

import { useState } from 'react';
import { useFormBuilder } from '@/lib/hooks/useFormBuilder';
import { useThemeCSS } from '@/lib/hooks/useThemeCSS';
import { FieldLibrary } from '@/components/form-builder/FieldLibrary';
import { FormCanvas } from '@/components/form-builder/FormCanvas';
import { PropertyPanel } from '@/components/form-builder/PropertyPanel';
import { CodeGeneratorModal } from '@/components/form-builder/CodeGeneratorModal';
import { FormPreview } from '@/components/preview/FormPreview';
import { ThemeGenerator } from '@/components/theme-generator/ThemeGenerator';
import { FormDebugger } from '@/lib/utils/form-debugger';
import { problematicForms, loadTestForm, generateComprehensiveTestForm } from '@/lib/utils/test-forms';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { FieldType } from '@/lib/types/form-config';
import { Code, Save, Settings, Palette, Bug } from 'lucide-react';

export default function FormBuilderPage() {
  const {
    formConfig,
    setFormConfig,
    selectedFieldId,
    setSelectedFieldId,
    addField,
    updateField,
    addSection,
    getSelectedField
  } = useFormBuilder();

  // Apply theme CSS variables
  useThemeCSS();

  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isThemeGeneratorOpen, setIsThemeGeneratorOpen] = useState(false);
  const [showTestForms, setShowTestForms] = useState(false);

  const handleAddField = (fieldType: FieldType) => {
    addField(fieldType);
  };

  const handleUpdateField = (updates: Partial<import('@/lib/types/form-config').FieldConfig>) => {
    if (selectedFieldId) {
      updateField(selectedFieldId, updates);
    }
  };

  const handleFormSettingsUpdate = (key: string, value: any) => {
    setFormConfig({
      ...formConfig,
      [key]: value
    });
  };

  const handleDebugForm = () => {
    console.log('🔍 Debugging Form Configuration...');
    FormDebugger.debugFormConfig(formConfig);
    
    // Also log the raw JSON for inspection
    console.log('📄 Raw Form JSON:', JSON.stringify(formConfig, null, 2));
  };

  const handleLoadTestForm = (formName: keyof typeof problematicForms) => {
    const testForm = loadTestForm(formName);
    setFormConfig(testForm);
    setSelectedFieldId(null);
    setShowTestForms(false);
    
    // Automatically debug the loaded form
    setTimeout(() => {
      console.log(`🧪 Loaded test form: ${formName}`);
      FormDebugger.debugFormConfig(testForm);
    }, 100);
  };

  const handleLoadComprehensiveTest = () => {
    const testForm = generateComprehensiveTestForm();
    setFormConfig(testForm);
    setSelectedFieldId(null);
    setShowTestForms(false);
    
    // Automatically debug the loaded form
    setTimeout(() => {
      console.log('🧪 Loaded comprehensive test form');
      FormDebugger.debugFormConfig(testForm);
    }, 100);
  };

  const selectedField = getSelectedField();

  if (isPreviewMode) {
    return (
      <div className="h-screen w-full flex flex-col bg-gray-900 overflow-hidden">
        <div className="bg-gray-800 border-b border-gray-700 px-6 py-4 flex-shrink-0">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-white">Form Preview</h1>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                onClick={() => setIsPreviewMode(false)}
                className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                Back to Builder
              </Button>
              <Button
                onClick={() => setIsCodeModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white flex items-center space-x-2"
              >
                <Code className="w-4 h-4" />
                <span>Generate Code</span>
              </Button>
            </div>
          </div>
        </div>
        <div className="flex-1 overflow-hidden bg-gray-900 w-full h-full">
          <FormPreview config={formConfig} />
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-full flex flex-col bg-gray-900 overflow-hidden">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 px-6 py-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-semibold text-white">🚀 Dynamic Form Builder</h1>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                className="text-gray-300 hover:text-white hover:bg-gray-700"
              >
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              onClick={() => setShowTestForms(!showTestForms)}
              className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white flex items-center space-x-2"
            >
              <Bug className="w-4 h-4" />
              <span>Test Forms</span>
            </Button>
            <Button
              variant="outline"
              onClick={handleDebugForm}
              className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white flex items-center space-x-2"
            >
              <Bug className="w-4 h-4" />
              <span>Debug Form</span>
            </Button>
            <Button
              variant="outline"
              onClick={() => setIsThemeGeneratorOpen(true)}
              className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white flex items-center space-x-2"
            >
              <Palette className="w-4 h-4" />
              <span>Theme & Layout</span>
            </Button>
            <Button
              variant="outline"
              onClick={() => setIsPreviewMode(true)}
              className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              Preview
            </Button>
            <Button
              onClick={() => setIsCodeModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white flex items-center space-x-2"
            >
              <Code className="w-4 h-4" />
              <span>Generate Code</span>
            </Button>
          </div>
        </div>

        {/* Form Settings */}
        {isSettingsOpen && (
          <div className="mt-4 p-4 bg-gray-750 rounded-lg border border-gray-600">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Form Title</label>
                <input
                  type="text"
                  value={formConfig.title || ''}
                  onChange={(e) => handleFormSettingsUpdate('title', e.target.value)}
                  placeholder="Enter form title"
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Form ID</label>
                <input
                  type="text"
                  value={formConfig.id}
                  onChange={(e) => handleFormSettingsUpdate('id', e.target.value)}
                  placeholder="form-id"
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">Form Description</label>
                <textarea
                  value={formConfig.description || ''}
                  onChange={(e) => handleFormSettingsUpdate('description', e.target.value)}
                  placeholder="Enter form description"
                  rows={3}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* Test Forms Menu */}
        {showTestForms && (
          <div className="mt-4 p-4 bg-gray-750 rounded-lg border border-gray-600">
            <h3 className="text-lg font-semibold text-white mb-4">🧪 Load Test Forms for Debugging</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-gray-300 mb-3">Problematic Forms</h4>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    onClick={() => handleLoadTestForm('missingDropdownOptions')}
                    className="w-full text-left border-gray-600 text-gray-300 hover:bg-gray-700"
                  >
                    Missing Dropdown Options
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleLoadTestForm('incorrectFieldTypes')}
                    className="w-full text-left border-gray-600 text-gray-300 hover:bg-gray-700"
                  >
                    Incorrect Field Types
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleLoadTestForm('edgeCases')}
                    className="w-full text-left border-gray-600 text-gray-300 hover:bg-gray-700"
                  >
                    Edge Cases
                  </Button>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-300 mb-3">Comprehensive Tests</h4>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    onClick={handleLoadComprehensiveTest}
                    className="w-full text-left border-gray-600 text-gray-300 hover:bg-gray-700"
                  >
                    Comprehensive Test Form
                  </Button>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-600">
              <p className="text-sm text-gray-400">
                💡 Load a test form, then click "Debug Form" to see detailed analysis in the console.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden w-full h-full">
        {/* Field Library */}
        <FieldLibrary onAddField={handleAddField} />

        {/* Form Canvas */}
        <FormCanvas
          config={formConfig}
          onConfigChange={setFormConfig}
          selectedFieldId={selectedFieldId}
          onFieldSelect={setSelectedFieldId}
          onAddSection={addSection}
          onPreviewToggle={() => setIsPreviewMode(true)}
          isPreviewMode={isPreviewMode}
        />

        {/* Property Panel */}
        <PropertyPanel
          field={selectedField}
          onUpdateField={handleUpdateField}
        />
      </div>

      {/* Code Generator Modal */}
      <CodeGeneratorModal
        isOpen={isCodeModalOpen}
        onClose={() => setIsCodeModalOpen(false)}
        formConfig={formConfig}
      />

      {/* Theme Generator Modal */}
      <ThemeGenerator
        isOpen={isThemeGeneratorOpen}
        onClose={() => setIsThemeGeneratorOpen(false)}
      />
    </div>
  );
}
