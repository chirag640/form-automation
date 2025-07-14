import { useState } from 'react';
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { FormConfig, FieldConfig, SectionConfig } from '@/lib/types/form-config';
import { SortableField } from './SortableField';
import { SortableSection } from './SortableSection';
import { Plus, Eye } from 'lucide-react';

interface FormCanvasProps {
  config: FormConfig;
  onConfigChange: (config: FormConfig) => void;
  selectedFieldId: string | null;
  onFieldSelect: (fieldId: string) => void;
  onAddSection: () => void;
  onPreviewToggle: () => void;
  isPreviewMode: boolean;
}

export const FormCanvas = ({
  config,
  onConfigChange,
  selectedFieldId,
  onFieldSelect,
  onAddSection,
  onPreviewToggle,
  isPreviewMode
}: FormCanvasProps) => {
  const [activeId, setActiveId] = useState<string | null>(null);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over) return;
    
    // Handle drag and drop logic here
    // This would involve reordering fields within sections or between sections
    
    setActiveId(null);
  };

  const renderSection = (section: SectionConfig, index: number) => (
    <SortableSection
      key={section.id}
      section={section}
      index={index}
      onSelect={() => onFieldSelect(section.id)}
      isSelected={selectedFieldId === section.id}
      onUpdateSection={(updates) => {
        const newConfig = { ...config };
        const sectionIndex = newConfig.sections.findIndex(s => 
          'id' in s && s.id === section.id
        );
        if (sectionIndex !== -1) {
          newConfig.sections[sectionIndex] = { ...section, ...updates };
          onConfigChange(newConfig);
        }
      }}
      onRemoveSection={() => {
        const newConfig = { ...config };
        newConfig.sections = newConfig.sections.filter(s => 
          !('id' in s) || s.id !== section.id
        );
        onConfigChange(newConfig);
      }}
    >
      <div className="space-y-3">
        {section.fields.map((field, fieldIndex) => (
          <SortableField
            key={field.key}
            field={field}
            index={fieldIndex}
            onSelect={() => onFieldSelect(field.key)}
            isSelected={selectedFieldId === field.key}
            onUpdateField={(updates) => {
              const newConfig = { ...config };
              const sectionIndex = newConfig.sections.findIndex(s => 
                'id' in s && s.id === section.id
              );
              if (sectionIndex !== -1) {
                const sectionConfig = newConfig.sections[sectionIndex] as SectionConfig;
                const fieldIndex = sectionConfig.fields.findIndex(f => f.key === field.key);
                if (fieldIndex !== -1) {
                  sectionConfig.fields[fieldIndex] = { ...field, ...updates };
                  onConfigChange(newConfig);
                }
              }
            }}
            onRemoveField={() => {
              const newConfig = { ...config };
              const sectionIndex = newConfig.sections.findIndex(s => 
                'id' in s && s.id === section.id
              );
              if (sectionIndex !== -1) {
                const sectionConfig = newConfig.sections[sectionIndex] as SectionConfig;
                sectionConfig.fields = sectionConfig.fields.filter(f => f.key !== field.key);
                onConfigChange(newConfig);
              }
            }}
          />
        ))}
      </div>
    </SortableSection>
  );

  const renderField = (field: FieldConfig, index: number) => (
    <SortableField
      key={field.key}
      field={field}
      index={index}
      onSelect={() => onFieldSelect(field.key)}
      isSelected={selectedFieldId === field.key}
      onUpdateField={(updates) => {
        const newConfig = { ...config };
        const fieldIndex = newConfig.sections.findIndex(s => 
          !('fields' in s) && (s as FieldConfig).key === field.key
        );
        if (fieldIndex !== -1) {
          newConfig.sections[fieldIndex] = { ...field, ...updates };
          onConfigChange(newConfig);
        }
      }}
      onRemoveField={() => {
        const newConfig = { ...config };
        newConfig.sections = newConfig.sections.filter(s => 
          ('fields' in s) || (s as FieldConfig).key !== field.key
        );
        onConfigChange(newConfig);
      }}
    />
  );

  return (
    <div className="flex-1 bg-gray-900 overflow-y-auto">
      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-white">
                {config.title || 'Untitled Form'}
              </h1>
              {config.description && (
                <p className="text-gray-400 mt-1">{config.description}</p>
              )}
            </div>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                onClick={onPreviewToggle}
                className="flex items-center space-x-2"
              >
                <Eye className="w-4 h-4" />
                <span>{isPreviewMode ? 'Edit' : 'Preview'}</span>
              </Button>
            </div>
          </div>

          {/* Form Builder */}
          <div className="space-y-6">
            {config.sections.length === 0 ? (
              <Card>
                <CardContent className="py-12">
                  <div className="text-center">
                    <p className="text-gray-400 mb-4">
                      No fields added yet. Start by adding fields from the library.
                    </p>
                    <Button onClick={onAddSection} className="flex items-center space-x-2">
                      <Plus className="w-4 h-4" />
                      <span>Add Section</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <SortableContext 
                items={config.sections.map(s => 'id' in s ? s.id : (s as FieldConfig).key)}
                strategy={verticalListSortingStrategy}
              >
                {config.sections.map((section, index) => {
                  if ('fields' in section) {
                    return renderSection(section as SectionConfig, index);
                  } else {
                    return renderField(section as FieldConfig, index);
                  }
                })}
              </SortableContext>
            )}

            {/* Add Section Button */}
            <div className="flex justify-center">
              <Button
                variant="outline"
                onClick={onAddSection}
                className="flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Section</span>
              </Button>
            </div>
          </div>
        </div>

        <DragOverlay>
          {activeId ? (
            <div className="p-4 bg-blue-900 border border-blue-700 rounded-lg">
              <p className="text-blue-200">Dragging item...</p>
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};
