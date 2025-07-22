import { 
  Type, 
  Mail, 
  Lock, 
  Hash, 
  Phone, 
  AlignLeft, 
  ChevronDown, 
  Circle, 
  CheckSquare, 
  List, 
  Calendar, 
  Sliders, 
  Star, 
  Palette, 
  Upload 
} from 'lucide-react';
import { FieldType } from '@/lib/types/form-config';

interface FieldLibraryProps {
  onAddField: (fieldType: FieldType) => void;
}

interface FieldTypeConfig {
  type: FieldType;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  category: string;
}

const fieldTypes: FieldTypeConfig[] = [
  {
    type: 'text',
    label: 'Text Field',
    icon: Type,
    description: 'Single line text input',
    category: 'Text'
  },
  {
    type: 'email',
    label: 'Email Field',
    icon: Mail,
    description: 'Email input with validation',
    category: 'Text'
  },
  {
    type: 'password',
    label: 'Password Field',
    icon: Lock,
    description: 'Password input field',
    category: 'Text'
  },
  {
    type: 'number',
    label: 'Number Field',
    icon: Hash,
    description: 'Numeric input field',
    category: 'Text'
  },
  {
    type: 'phone',
    label: 'Phone Field',
    icon: Phone,
    description: 'Phone number input',
    category: 'Text'
  },
  {
    type: 'multiline',
    label: 'Textarea',
    icon: AlignLeft,
    description: 'Multi-line text input',
    category: 'Text'
  },
  {
    type: 'dropdown',
    label: 'Dropdown',
    icon: ChevronDown,
    description: 'Select from options',
    category: 'Selection'
  },
  {
    type: 'radio',
    label: 'Radio Button',
    icon: Circle,
    description: 'Single choice from options',
    category: 'Selection'
  },
  {
    type: 'checkbox',
    label: 'Checkbox',
    icon: CheckSquare,
    description: 'Boolean input field',
    category: 'Selection'
  },
  {
    type: 'multi_select',
    label: 'Multi Select',
    icon: List,
    description: 'Multiple choice selection',
    category: 'Selection'
  },
  {
    type: 'date',
    label: 'Date Picker',
    icon: Calendar,
    description: 'Date selection input',
    category: 'Date & Time'
  },
  {
    type: 'slider',
    label: 'Slider',
    icon: Sliders,
    description: 'Range slider input',
    category: 'Interactive'
  },
  {
    type: 'rating',
    label: 'Rating',
    icon: Star,
    description: 'Star rating input',
    category: 'Interactive'
  },
  {
    type: 'color',
    label: 'Color Picker',
    icon: Palette,
    description: 'Color selection input',
    category: 'Interactive'
  },
  {
    type: 'file',
    label: 'File Upload',
    icon: Upload,
    description: 'File upload input',
    category: 'Media'
  }
];

const categories = [...new Set(fieldTypes.map(field => field.category))];

export const FieldLibrary = ({ onAddField }: FieldLibraryProps) => {
  return (
    <div className="w-80 bg-gray-800 border-r border-gray-700 overflow-y-auto">
      <div className="p-4">
        <h2 className="text-lg font-semibold text-white mb-4">🎨 Field Library</h2>
        
        {categories.map(category => (
          <div key={category} className="mb-6">
            <h3 className="text-sm font-medium text-gray-300 mb-3">{category}</h3>
            <div className="space-y-2">
              {fieldTypes
                .filter(field => field.category === category)
                .map(field => (
                  <div
                    key={field.type}
                    className="p-3 bg-gray-700 border border-gray-600 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-gray-600 transition-colors group"
                    onClick={() => onAddField(field.type)}
                  >
                    <div className="flex items-center space-x-3">
                      <field.icon className="w-5 h-5 text-gray-400 group-hover:text-blue-400" />
                      <div>
                        <div className="text-sm font-medium text-white group-hover:text-blue-200">
                          {field.label}
                        </div>
                        <div className="text-xs text-gray-400 group-hover:text-blue-300">
                          {field.description}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
