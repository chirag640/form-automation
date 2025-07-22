import { FormConfig, FieldConfig } from '@/lib/types/form-config';

export class CodeGenerator {
  static generateFlutterCode(formConfig: FormConfig): string {
    const imports = this.generateFlutterImports();
    const mainApp = this.generateFlutterMainApp(formConfig);
    const formWidget = this.generateFlutterFormWidget(formConfig);
    
    return `${imports}\n\n${mainApp}\n\n${formWidget}`;
  }

  private static generateFlutterImports(): string {
    return `import 'package:flutter/material.dart';
import 'package:dynamic_json_form_builder/json_form_builder.dart';`;
  }

  private static generateFlutterMainApp(formConfig: FormConfig): string {
    const appTitle = formConfig.title || 'Dynamic Form App';
    const className = this.toPascalCase(formConfig.id || 'dynamic_form');
    
    return `void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: '${appTitle}',
      theme: ThemeData(
        primarySwatch: Colors.deepPurple,
        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),
      darkTheme: ThemeData.dark().copyWith(
        primaryColor: Colors.deepPurple[200],
        scaffoldBackgroundColor: Colors.grey[900],
        appBarTheme: const AppBarTheme(
          backgroundColor: Colors.deepPurple,
          foregroundColor: Colors.white,
          elevation: 0,
        ),
        elevatedButtonTheme: ElevatedButtonThemeData(
          style: ElevatedButton.styleFrom(
            backgroundColor: Colors.deepPurple,
            foregroundColor: Colors.white,
            padding: const EdgeInsets.symmetric(vertical: 16),
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(12),
            ),
          ),
        ),
        cardTheme: CardTheme(
          color: Colors.grey[850],
          elevation: 4,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(12),
          ),
        ),
      ),
      themeMode: ThemeMode.dark,
      home: const ${className}(),
    );
  }
}`;
  }

  private static generateFlutterFormWidget(formConfig: FormConfig): string {
    const className = this.toPascalCase(formConfig.id || 'dynamic_form');
    const formConfigJson = JSON.stringify(formConfig, null, 4);
    
    return `class ${className} extends StatefulWidget {
  const ${className}({super.key});

  @override
  State<${className}> createState() => _${className}State();
}

class _${className}State extends State<${className}> {
  final Map<String, dynamic> _formData = {};
  final Map<String, String?> _validationErrors = {};
  bool _isDarkMode = true;

  // Form configuration
  final Map<String, dynamic> formConfig = ${formConfigJson};

  FormTheme getFormTheme() {
    return _isDarkMode ? FormTheme.dark() : FormTheme.light();
  }

  void _handleFormChanged(Map<String, dynamic> data) {
    setState(() {
      _formData.clear();
      _formData.addAll(data);
    });
    print('📝 Form data changed: \${data.keys.length} fields updated');
  }

  void _handleValidationChanged(Map<String, String?> errors) {
    setState(() {
      _validationErrors.clear();
      _validationErrors.addAll(errors);
    });
    final errorCount = errors.values.where((e) => e != null && e.isNotEmpty).length;
    if (errorCount > 0) {
      print('❌ Validation errors: \$errorCount fields have errors');
    }
  }

  void _handleFormSubmit(Map<String, dynamic> data) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        backgroundColor: Colors.grey[850],
        title: const Row(
          children: [
            Icon(Icons.check_circle, color: Colors.green),
            SizedBox(width: 8),
            Text('Form Submitted Successfully!', style: TextStyle(color: Colors.white)),
          ],
        ),
        content: SingleChildScrollView(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisSize: MainAxisSize.min,
            children: [
              Text('✅ Form submitted with \${data.keys.length} fields',
                style: const TextStyle(color: Colors.white)),
              const SizedBox(height: 16),
              const Text('📊 Form Data Summary:', 
                style: TextStyle(fontWeight: FontWeight.bold, color: Colors.white)),
              const SizedBox(height: 8),
              ...data.entries.take(10).map((entry) => Padding(
                padding: const EdgeInsets.only(bottom: 4),
                child: RichText(
                  text: TextSpan(
                    style: const TextStyle(color: Colors.white),
                    children: [
                      TextSpan(
                        text: '\${entry.key}: ',
                        style: const TextStyle(fontWeight: FontWeight.w600),
                      ),
                      TextSpan(
                        text: entry.value?.toString() ?? 'null',
                        style: const TextStyle(color: Colors.grey),
                      ),
                    ],
                  ),
                ),
              )),
              if (data.keys.length > 10)
                Text('... and \${data.keys.length - 10} more fields',
                  style: const TextStyle(color: Colors.white)),
            ],
          ),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Close', style: TextStyle(color: Colors.deepPurple)),
          ),
          ElevatedButton(
            onPressed: () {
              Navigator.pop(context);
              print('💾 Complete form data: \$data');
            },
            style: ElevatedButton.styleFrom(
              backgroundColor: Colors.deepPurple,
              foregroundColor: Colors.white,
            ),
            child: const Text('View Full Data in Console'),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final errorCount = _validationErrors.values.where((e) => e != null && e.isNotEmpty).length;
    final filledFields = _formData.values.where((v) => v != null && v.toString().isNotEmpty).length;
    
    return Scaffold(
      backgroundColor: Colors.grey[900],
      appBar: AppBar(
        title: Text('${formConfig.title || 'Dynamic Form'}'),
        backgroundColor: Colors.deepPurple,
        foregroundColor: Colors.white,
        elevation: 0,
        actions: [
          IconButton(
            icon: Icon(_isDarkMode ? Icons.light_mode : Icons.dark_mode),
            onPressed: () {
              setState(() {
                _isDarkMode = !_isDarkMode;
              });
            },
            tooltip: 'Toggle theme',
          ),
          IconButton(
            icon: const Icon(Icons.info_outline),
            onPressed: () {
              showDialog(
                context: context,
                builder: (context) => AlertDialog(
                  backgroundColor: Colors.grey[850],
                  title: const Text('📚 Form Information', style: TextStyle(color: Colors.white)),
                  content: SingleChildScrollView(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Text('${formConfig.description ?? 'Dynamic form built with JSON configuration'}',
                          style: const TextStyle(color: Colors.white)),
                        const SizedBox(height: 12),
                        Text('📊 Total Fields: \${${this.getTotalFieldsCount()}}',
                          style: const TextStyle(color: Colors.grey)),
                        Text('📋 Sections: \${${this.getSectionsCount()}}',
                          style: const TextStyle(color: Colors.grey)),
                      ],
                    ),
                  ),
                  actions: [
                    TextButton(
                      onPressed: () => Navigator.pop(context),
                      child: const Text('Got it!', style: TextStyle(color: Colors.deepPurple)),
                    ),
                  ],
                ),
              );
            },
            tooltip: 'Show form info',
          ),
        ],
      ),
      body: Column(
        children: [
          // Status bar
          Container(
            width: double.infinity,
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: Colors.grey[850],
              border: Border(
                bottom: BorderSide(color: Colors.grey[700]!, width: 1),
              ),
            ),
            child: Row(
              children: [
                Expanded(
                  child: Text(
                    '📊 Status: \$filledFields fields filled',
                    style: const TextStyle(
                      fontWeight: FontWeight.w600,
                      color: Colors.white,
                    ),
                  ),
                ),
                if (errorCount > 0)
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                    decoration: BoxDecoration(
                      color: Colors.red[900],
                      borderRadius: BorderRadius.circular(12),
                      border: Border.all(color: Colors.red[700]!),
                    ),
                    child: Text(
                      '❌ \$errorCount errors',
                      style: const TextStyle(
                        color: Colors.red,
                        fontWeight: FontWeight.w600,
                        fontSize: 12,
                      ),
                    ),
                  ),
                if (errorCount == 0 && filledFields > 0)
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                    decoration: BoxDecoration(
                      color: Colors.green[900],
                      borderRadius: BorderRadius.circular(12),
                      border: Border.all(color: Colors.green[700]!),
                    ),
                    child: const Text(
                      '✅ All valid',
                      style: TextStyle(
                        color: Colors.green,
                        fontWeight: FontWeight.w600,
                        fontSize: 12,
                      ),
                    ),
                  ),
              ],
            ),
          ),
          // Form
          Expanded(
            child: SingleChildScrollView(
              padding: const EdgeInsets.all(16),
              child: JsonFormBuilder(
                config: formConfig,
                theme: getFormTheme(),
                onChanged: _handleFormChanged,
                onValidation: _handleValidationChanged,
                onSubmit: _handleFormSubmit,
              ),
            ),
          ),
          // Submit button
          Container(
            width: double.infinity,
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: Colors.grey[850],
              border: Border(
                top: BorderSide(color: Colors.grey[700]!, width: 1),
              ),
            ),
            child: ElevatedButton(
              style: ElevatedButton.styleFrom(
                backgroundColor: Colors.deepPurple,
                foregroundColor: Colors.white,
                padding: const EdgeInsets.symmetric(vertical: 16),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(12),
                ),
                elevation: 0,
              ),
              onPressed: errorCount == 0 && filledFields > 0
                  ? () => _handleFormSubmit(_formData)
                  : null,
              child: Text(
                errorCount > 0
                    ? '❌ Fix \$errorCount errors to submit'
                    : filledFields == 0
                        ? '📝 Fill out the form to submit'
                        : '🚀 Submit Form (\$filledFields fields)',
                style: const TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}`;
  }

  private static getTotalFieldsCount(): string {
    return `formConfig['sections'].fold(0, (count, section) => count + (section['fields']?.length ?? 0))`;
  }

  private static getSectionsCount(): string {
    return `formConfig['sections'].where((section) => section['fields'] != null).length`;
  }

  private static toPascalCase(str: string): string {
    return str
      .split(/[-_\s]+/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join('');
  }

  static generateReactCode(formConfig: FormConfig): string {
    const imports = this.generateReactImports();
    const component = this.generateReactComponent(formConfig);
    const exports = this.generateReactExports(formConfig);
    
    return `${imports}\n\n${component}\n\n${exports}`;
  }

  private static generateReactImports(): string {
    return `import React, { useState } from 'react';
import { useForm } from 'react-hook-form';`;
  }

  private static generateReactComponent(formConfig: FormConfig): string {
    const fields = this.extractAllFields(formConfig);
    const formFields = fields.map(field => this.generateReactField(field)).join('\n\n');
    
    return `export default function DynamicForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const onSubmit = (data) => {
    console.log('Form data:', data);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-900 text-white min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-white">${formConfig.title || 'Dynamic Form'}</h1>
      ${formConfig.description ? `<p className="text-gray-300 mb-6">${formConfig.description}</p>` : ''}
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        ${formFields}
        
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          Submit
        </button>
      </form>
    </div>
  );
}`;
  }

  private static generateReactField(field: FieldConfig): string {
    const labelClass = 'block text-sm font-medium text-gray-300 mb-2';
    const inputClass = 'w-full px-3 py-2 bg-gray-800 border border-gray-600 text-white placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500';
    const errorClass = 'mt-1 text-sm text-red-600';

    switch (field.type) {
      case 'text':
      case 'email':
      case 'password':
        return `<div>
          <label className="${labelClass}">${field.label || field.key}</label>
          <input
            type="${field.type}"
            {...register('${field.key}', { required: ${field.required} })}
            placeholder="${field.placeholder || ''}"
            className="${inputClass}"
          />
          {errors.${field.key} && <p className="${errorClass}">This field is required</p>}
        </div>`;

      case 'number':
        return `<div>
          <label className="${labelClass}">${field.label || field.key}</label>
          <input
            type="number"
            {...register('${field.key}', { required: ${field.required} })}
            placeholder="${field.placeholder || ''}"
            className="${inputClass}"
          />
          {errors.${field.key} && <p className="${errorClass}">This field is required</p>}
        </div>`;

      case 'dropdown':
        const options = Array.isArray(field.extra.options) ? field.extra.options.filter(opt => typeof opt === 'string') : [];
        return `<div>
          <label className="${labelClass}">${field.label || field.key}</label>
          <select
            {...register('${field.key}', { required: ${field.required} })}
            className="${inputClass}"
          >
            <option value="">${field.placeholder || 'Select an option'}</option>
            ${options.map((option: string) => `<option value="${option}">${option}</option>`).join('\n            ')}
          </select>
          {errors.${field.key} && <p className="${errorClass}">This field is required</p>}
        </div>`;

      case 'checkbox':
        return `<div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              {...register('${field.key}', { required: ${field.required} })}
              className="w-4 h-4 text-blue-600 border-gray-600 bg-gray-800 rounded focus:ring-blue-500"
            />
            <span className="text-sm text-gray-300">${field.label || field.key}</span>
          </label>
          {errors.${field.key} && <p className="${errorClass}">This field is required</p>}
        </div>`;

      case 'multiline':
        return `<div>
          <label className="${labelClass}">${field.label || field.key}</label>
          <textarea
            {...register('${field.key}', { required: ${field.required} })}
            placeholder="${field.placeholder || ''}"
            rows={4}
            className="${inputClass}"
          />
          {errors.${field.key} && <p className="${errorClass}">This field is required</p>}
        </div>`;

      default:
        return `<div>
          <label className="${labelClass}">${field.label || field.key}</label>
          <input
            type="text"
            {...register('${field.key}', { required: ${field.required} })}
            placeholder="${field.placeholder || ''}"
            className="${inputClass}"
          />
          {errors.${field.key} && <p className="${errorClass}">This field is required</p>}
        </div>`;
    }
  }

  private static generateReactExports(formConfig: FormConfig): string {
    return `// Form configuration
export const formConfig = ${JSON.stringify(formConfig, null, 2)};`;
  }

  private static extractAllFields(formConfig: FormConfig): FieldConfig[] {
    const fields: FieldConfig[] = [];
    
    for (const section of formConfig.sections) {
      if ('fields' in section) {
        // It's a SectionConfig
        fields.push(...section.fields);
      } else {
        // It's a FieldConfig
        fields.push(section as FieldConfig);
      }
    }
    
    return fields;
  }

  static generateVueCode(formConfig: FormConfig): string {
    return `<template>
  <div class="max-w-2xl mx-auto p-6 bg-gray-900 text-white min-h-screen">
    <h1 class="text-2xl font-bold mb-4 text-white">${formConfig.title || 'Dynamic Form'}</h1>
    ${formConfig.description ? `<p class="text-gray-300 mb-6">${formConfig.description}</p>` : ''}
    
    <form @submit.prevent="onSubmit" class="space-y-6">
      <!-- Form fields would be generated here -->
      <button
        type="submit"
        class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
      >
        Submit
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const formData = ref({});

const onSubmit = () => {
  console.log('Form data:', formData.value);
};
</script>`;
  }

  static generateHTMLCode(formConfig: FormConfig): string {
    const fields = this.extractAllFields(formConfig);
    const formFields = fields.map(field => this.generateHTMLField(field)).join('\n\n');
    
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${formConfig.title || 'Dynamic Form'}</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; }
        .form-group { margin-bottom: 20px; }
        label { display: block; margin-bottom: 5px; font-weight: bold; }
        input, select, textarea { width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; }
        button { background-color: #007bff; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; }
        button:hover { background-color: #0056b3; }
    </style>
</head>
<body>
    <h1>${formConfig.title || 'Dynamic Form'}</h1>
    ${formConfig.description ? `<p>${formConfig.description}</p>` : ''}
    
    <form id="dynamicForm">
        ${formFields}
        
        <button type="submit">Submit</button>
    </form>

    <script>
        document.getElementById('dynamicForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData);
            console.log('Form data:', data);
        });
    </script>
</body>
</html>`;
  }

  private static generateHTMLField(field: FieldConfig): string {
    const required = field.required ? 'required' : '';
    
    switch (field.type) {
      case 'text':
      case 'email':
      case 'password':
        return `<div class="form-group">
          <label for="${field.key}">${field.label || field.key}</label>
          <input type="${field.type}" id="${field.key}" name="${field.key}" placeholder="${field.placeholder || ''}" ${required}>
        </div>`;

      case 'dropdown':
        const options = Array.isArray(field.extra.options) ? field.extra.options.filter(opt => typeof opt === 'string') : [];
        return `<div class="form-group">
          <label for="${field.key}">${field.label || field.key}</label>
          <select id="${field.key}" name="${field.key}" ${required}>
            <option value="">${field.placeholder || 'Select an option'}</option>
            ${options.map((option: string) => `<option value="${option}">${option}</option>`).join('\n            ')}
          </select>
        </div>`;

      case 'multiline':
        return `<div class="form-group">
          <label for="${field.key}">${field.label || field.key}</label>
          <textarea id="${field.key}" name="${field.key}" placeholder="${field.placeholder || ''}" rows="4" ${required}></textarea>
        </div>`;

      default:
        return `<div class="form-group">
          <label for="${field.key}">${field.label || field.key}</label>
          <input type="text" id="${field.key}" name="${field.key}" placeholder="${field.placeholder || ''}" ${required}>
        </div>`;
    }
  }

  static generateJSONConfig(formConfig: FormConfig): string {
    return JSON.stringify(formConfig, null, 2);
  }
}
