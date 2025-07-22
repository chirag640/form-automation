import { useState } from 'react';
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Button } from '@/components/ui/Button';
import { FormConfig, FieldConfig, SectionConfig } from '@/lib/types/form-config';
import { SortableField } from './SortableField';
import { SortableSection } from './SortableSection';
import { useTheme } from '@/lib/contexts/ThemeProvider';
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
  const { getCurrentTheme, getCurrentLayout } = useTheme();
  
  const theme = getCurrentTheme();
  const layout = getCurrentLayout();

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { over } = event;
    
    if (!over) return;
    
    // Handle drag and drop logic here
    // This would involve reordering fields within sections or between sections
    
    setActiveId(null);
  };

  const renderSection = (section: SectionConfig) => (
    <SortableSection
      key={section.id}
      section={section}
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
        {section.fields.map((field) => (
          <SortableField
            key={field.key}
            field={field}
            onSelect={() => onFieldSelect(field.key)}
            isSelected={selectedFieldId === field.key}
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

  const renderField = (field: FieldConfig) => (
    <SortableField
      key={field.key}
      field={field}
      onSelect={() => onFieldSelect(field.key)}
      isSelected={selectedFieldId === field.key}
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
    <div 
      className="flex-1 overflow-y-auto theme-generator-form w-full h-full"
      style={{
        backgroundColor: theme.colors.background,
        color: theme.colors.text.primary,
        fontFamily: theme.typography.fontFamily,
        minHeight: '100vh'
      }}
    >
      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div className="p-6 w-full min-h-full">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 
                className="text-2xl font-bold"
                style={{
                  color: theme.colors.text.primary,
                  fontSize: theme.typography.headings.fontSize,
                  fontWeight: theme.typography.headings.fontWeight
                }}
              >
                {config.title || 'Untitled Form'}
              </h1>
              {config.description && (
                <p 
                  className="mt-1"
                  style={{
                    color: theme.colors.text.secondary,
                    fontSize: theme.typography.body.fontSize
                  }}
                >
                  {config.description}
                </p>
              )}
            </div>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                onClick={onPreviewToggle}
                className="flex items-center space-x-2 border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                <Eye className="w-4 h-4" />
                <span>{isPreviewMode ? 'Edit' : 'Preview'}</span>
              </Button>
            </div>
          </div>

          {/* Form Builder */}
          <div 
            className="space-y-6 w-full"
            style={{
              maxWidth: layout.formLayout.maxWidth,
              margin: layout.formLayout.alignment === 'center' ? '0 auto' : 
                      layout.formLayout.alignment === 'right' ? '0 0 0 auto' : '0',
              padding: layout.formLayout.padding
            }}
          >
            {config.sections.length === 0 ? (
              <div 
                className="py-12 rounded-lg border"
                style={{ 
                  backgroundColor: theme.colors.surface, 
                  borderColor: theme.colors.border 
                }}
              >
                <div className="text-center">
                  <p 
                    className="mb-4"
                    style={{ color: theme.colors.text.secondary }}
                  >
                    No fields added yet. Start by adding fields from the library.
                  </p>
                  <Button 
                    onClick={onAddSection} 
                    className="flex items-center space-x-2"
                    style={{
                      backgroundColor: theme.colors.primary,
                      color: 'white'
                    }}
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Section</span>
                  </Button>
                </div>
              </div>
            ) : (
              <SortableContext 
                items={config.sections.map(s => 'id' in s ? s.id : (s as FieldConfig).key)}
                strategy={verticalListSortingStrategy}
              >
                <div 
                  className={`
                    ${layout.type === 'two-column' ? 'grid grid-cols-1 md:grid-cols-2' : ''}
                    ${layout.type === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : ''}
                    ${layout.type === 'card' ? 'space-y-8' : 'space-y-6'}
                  `}
                  style={{
                    gap: layout.fieldLayout.groupSpacing
                  }}
                >
                  {config.sections.map((section) => {
                    if ('fields' in section) {
                      return renderSection(section as SectionConfig);
                    } else {
                      return renderField(section as FieldConfig);
                    }
                  })}
                </div>
              </SortableContext>
            )}

            {/* Add Section Button */}
            <div className="flex justify-center">
              <Button
                variant="outline"
                onClick={onAddSection}
                className="flex items-center space-x-2 border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                <Plus className="w-4 h-4" />
                <span>Add Section</span>
              </Button>
            </div>
          </div>
        </div>

        <DragOverlay>
          {activeId ? (
            <div 
              className="p-4 border rounded-lg"
              style={{
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.primary,
                color: theme.colors.text.primary
              }}
            >
              <p>Dragging item...</p>
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};
