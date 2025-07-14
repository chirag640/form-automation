'use client';

import { useState } from 'react';
import { useFormBuilder } from '@/lib/hooks/useFormBuilder';
import { FieldLibrary } from '@/components/form-builder/FieldLibrary';
import { FormCanvas } from '@/components/form-builder/FormCanvas';
import { PropertyPanel } from '@/components/form-builder/PropertyPanel';
import { CodeGeneratorModal } from '@/components/form-builder/CodeGeneratorModal';
import { FormPreview } from '@/components/preview/FormPreview';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { FieldType } from '@/lib/types/form-config';
import { Code, Save, Settings } from 'lucide-react';

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

  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

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

  const selectedField = getSelectedField();

  if (isPreviewMode) {
    return (
      <div className="h-screen flex flex-col">
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold">Form Preview</h1>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                onClick={() => setIsPreviewMode(false)}
              >
                Back to Builder
              </Button>
              <Button
                onClick={() => setIsCodeModalOpen(true)}
                className="flex items-center space-x-2"
              >
                <Code className="w-4 h-4" />
                <span>Generate Code</span>
              </Button>
            </div>
          </div>
        </div>
        <div className="flex-1 overflow-hidden">
          <FormPreview config={formConfig} />
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gray-900">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 px-6 py-4">
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
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
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
    </div>
  );
}
