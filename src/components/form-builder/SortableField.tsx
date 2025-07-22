import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { FieldConfig } from '@/lib/types/form-config';
import { GripVertical, Trash2, Copy, Settings } from 'lucide-react';

interface SortableFieldProps {
  field: FieldConfig;
  onSelect: () => void;
  isSelected: boolean;
  // onUpdateField removed (was unused)
  onRemoveField: () => void;
}

export const SortableField = ({
  field,
  onSelect,
  isSelected,
  onRemoveField
}: SortableFieldProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: field.key });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const getFieldIcon = () => {
    switch (field.type) {
      case 'text':
        return '📝';
      case 'email':
        return '✉️';
      case 'password':
        return '🔒';
      case 'number':
        return '🔢';
      case 'phone':
        return '📞';
      case 'multiline':
        return '📄';
      case 'dropdown':
        return '⬇️';
      case 'radio':
        return '⚪';
      case 'checkbox':
        return '☑️';
      case 'multi_select':
        return '📋';
      case 'date':
        return '📅';
      case 'slider':
        return '🎚️';
      case 'rating':
        return '⭐';
      case 'color':
        return '🎨';
      case 'file':
        return '📁';
      default:
        return '📝';
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`mb-3 ${isDragging ? 'opacity-50' : ''}`}
    >
      <Card className={`${isSelected ? 'ring-2 ring-blue-500' : ''} hover:shadow-md transition-shadow`}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 flex-1">
              <div
                {...attributes}
                {...listeners}
                className="cursor-grab hover:bg-gray-700 p-1 rounded"
              >
                <GripVertical className="w-4 h-4 text-gray-400" />
              </div>
              
              <div className="flex items-center space-x-2 flex-1" onClick={onSelect}>
                <span className="text-lg">{getFieldIcon()}</span>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-white">
                      {field.label || field.key}
                    </span>
                    <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">
                      {field.type}
                    </span>
                    {field.required && (
                      <span className="text-xs bg-red-900 text-red-300 px-2 py-1 rounded">
                        Required
                      </span>
                    )}
                  </div>
                  {field.placeholder && (
                    <p className="text-sm text-gray-400 mt-1">
                      Placeholder: {field.placeholder}
                    </p>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={onSelect}
                className="text-gray-400 hover:text-white"
              >
                <Settings className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  // Duplicate field logic would go here
                  console.log('Duplicate field:', field.key);
                }}
                className="text-gray-400 hover:text-white"
              >
                <Copy className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onRemoveField}
                className="text-red-400 hover:text-red-300"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
