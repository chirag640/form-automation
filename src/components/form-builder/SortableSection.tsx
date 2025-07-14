import { ReactNode } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { SectionConfig } from '@/lib/types/form-config';
import { GripVertical, Trash2, ChevronDown, ChevronUp } from 'lucide-react';

interface SortableSectionProps {
  section: SectionConfig;
  index: number;
  children: ReactNode;
  onSelect: () => void;
  isSelected: boolean;
  onUpdateSection: (updates: Partial<SectionConfig>) => void;
  onRemoveSection: () => void;
}

export const SortableSection = ({
  section,
  index,
  children,
  onSelect,
  isSelected,
  onUpdateSection,
  onRemoveSection
}: SortableSectionProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: section.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`mb-4 ${isDragging ? 'opacity-50' : ''}`}
    >
      <Card className={`${isSelected ? 'ring-2 ring-blue-500' : ''}`}>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div
                {...attributes}
                {...listeners}
                className="cursor-grab hover:bg-gray-700 p-1 rounded"
              >
                <GripVertical className="w-4 h-4 text-gray-400" />
              </div>
              <div className="flex-1" onClick={onSelect}>
                <CardTitle className="text-lg text-white">
                  {section.title || 'Untitled Section'}
                </CardTitle>
                {section.description && (
                  <p className="text-sm text-gray-400 mt-1">{section.description}</p>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {section.collapsible && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onUpdateSection({ initiallyExpanded: !section.initiallyExpanded })}
                  className="text-gray-400 hover:text-white"
                >
                  {section.initiallyExpanded ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={onRemoveSection}
                className="text-red-400 hover:text-red-300"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {(!section.collapsible || section.initiallyExpanded) && (
            <div className="space-y-3">
              {children}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
