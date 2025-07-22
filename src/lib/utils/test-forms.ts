import { FormConfig } from '@/lib/types/form-config';

// Test forms that demonstrate common issues
export const problematicForms: Record<string, FormConfig> = {
  // Form with missing dropdown options
  missingDropdownOptions: {
    id: 'test-missing-options',
    title: 'Form with Missing Dropdown Options',
    description: 'This form has dropdown fields with insufficient options',
    sections: [
      {
        id: 'section-1',
        title: 'Test Section',
        description: 'Section with problematic fields',
        collapsible: false,
        initiallyExpanded: true,
        fields: [
          {
            key: 'dropdown_with_3_options',
            type: 'dropdown',
            label: 'Dropdown (Should have 3 options)',
            required: true,
            placeholder: 'Select an option',
            helperText: 'This should show 3 options in JSON',
            extra: {
              options: ['Option 1', 'Option 2', 'Option 3']
            },
            validation: []
          },
          {
            key: 'dropdown_missing_options',
            type: 'dropdown',
            label: 'Dropdown (No options defined)',
            required: false,
            placeholder: 'This will have no options',
            helperText: 'This dropdown has no options',
            extra: {},
            validation: []
          }
        ]
      }
    ]
  },

  // Form with incorrect field types
  incorrectFieldTypes: {
    id: 'test-incorrect-types',
    title: 'Form with Type Confusion',
    description: 'This form has fields that might be confused between radio and dropdown',
    sections: [
      {
        id: 'section-1',
        title: 'Type Confusion Section',
        description: 'Fields that demonstrate type issues',
        collapsible: false,
        initiallyExpanded: true,
        fields: [
          {
            key: 'should_be_dropdown',
            type: 'dropdown',
            label: 'This should be a dropdown',
            required: true,
            placeholder: 'Select from dropdown',
            helperText: 'This field should render as dropdown, not radio',
            extra: {
              options: ['Choice A', 'Choice B', 'Choice C', 'Choice D']
            },
            validation: []
          },
          {
            key: 'should_be_radio',
            type: 'radio',
            label: 'This should be radio buttons',
            required: true,
            placeholder: 'Choose one',
            helperText: 'This field should render as radio buttons, not dropdown',
            extra: {
              options: ['Option X', 'Option Y', 'Option Z']
            },
            validation: []
          }
        ]
      }
    ]
  },

  // Form with various edge cases
  edgeCases: {
    id: 'test-edge-cases',
    title: 'Form with Edge Cases',
    description: 'This form contains various edge cases that might cause issues',
    sections: [
      {
        id: 'section-1',
        title: 'Edge Cases',
        description: 'Various problematic scenarios',
        collapsible: false,
        initiallyExpanded: true,
        fields: [
          {
            key: 'empty_options',
            type: 'dropdown',
            label: 'Dropdown with empty options',
            required: false,
            placeholder: 'Has empty options',
            helperText: 'This dropdown contains empty options',
            extra: {
              options: ['Valid Option', '', 'Another Valid', '  ', 'Last Valid']
            },
            validation: []
          },
          {
            key: 'duplicate_options',
            type: 'radio',
            label: 'Radio with duplicate options',
            required: false,
            placeholder: 'Has duplicates',
            helperText: 'This radio group has duplicate options',
            extra: {
              options: ['Option A', 'Option B', 'Option A', 'Option C', 'Option B']
            },
            validation: []
          },
          {
            key: 'single_option',
            type: 'dropdown',
            label: 'Dropdown with single option',
            required: false,
            placeholder: 'Only one choice',
            helperText: 'This dropdown has only one option',
            extra: {
              options: ['Only Choice']
            },
            validation: []
          }
        ]
      }
    ]
  }
};

// Utility to load test forms
export const loadTestForm = (formName: keyof typeof problematicForms): FormConfig => {
  return JSON.parse(JSON.stringify(problematicForms[formName]));
};

// Generate a comprehensive test form
export const generateComprehensiveTestForm = (): FormConfig => {
  return {
    id: 'comprehensive-test-form',
    title: 'Comprehensive Test Form',
    description: 'A form that tests all field types and edge cases',
    sections: [
      {
        id: 'text-fields',
        title: 'Text Fields',
        description: 'Various text input types',
        collapsible: true,
        initiallyExpanded: true,
        fields: [
          {
            key: 'text_field',
            type: 'text',
            label: 'Text Field',
            required: true,
            placeholder: 'Enter text',
            helperText: 'Basic text input',
            extra: {},
            validation: [{ type: 'required', message: 'This field is required' }]
          },
          {
            key: 'email_field',
            type: 'email',
            label: 'Email Field',
            required: true,
            placeholder: 'Enter email',
            helperText: 'Email validation',
            extra: {},
            validation: [{ type: 'required', message: 'Email is required' }]
          }
        ]
      },
      {
        id: 'selection-fields',
        title: 'Selection Fields',
        description: 'Dropdown, radio, and checkbox fields',
        collapsible: true,
        initiallyExpanded: true,
        fields: [
          {
            key: 'dropdown_3_options',
            type: 'dropdown',
            label: 'Dropdown (3 Options)',
            required: true,
            placeholder: 'Select one',
            helperText: 'Should show exactly 3 options',
            extra: {
              options: ['First Option', 'Second Option', 'Third Option']
            },
            validation: [{ type: 'required', message: 'Please select an option' }]
          },
          {
            key: 'radio_4_options',
            type: 'radio',
            label: 'Radio Buttons (4 Options)',
            required: true,
            placeholder: 'Choose one',
            helperText: 'Should show as radio buttons, not dropdown',
            extra: {
              options: ['Choice 1', 'Choice 2', 'Choice 3', 'Choice 4']
            },
            validation: [{ type: 'required', message: 'Please select an option' }]
          },
          {
            key: 'multi_select_5_options',
            type: 'multi_select',
            label: 'Multi-Select (5 Options)',
            required: false,
            placeholder: 'Select multiple',
            helperText: 'Can select multiple options',
            extra: {
              options: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5']
            },
            validation: []
          }
        ]
      }
    ]
  };
};
