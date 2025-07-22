import { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { FormConfig } from '@/lib/types/form-config';
import { CodeGenerator } from '@/lib/utils/code-generator';
import { Copy, Download, Check } from 'lucide-react';

interface CodeGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  formConfig: FormConfig;
}

type Framework = 'flutter' | 'react' | 'vue' | 'html' | 'json';

export const CodeGeneratorModal = ({ isOpen, onClose, formConfig }: CodeGeneratorModalProps) => {
  const [selectedFramework, setSelectedFramework] = useState<Framework>('flutter');
  const [copied, setCopied] = useState(false);

  const frameworks = [
    { id: 'flutter', name: 'Flutter', ext: 'dart' },
    { id: 'react', name: 'React/Next.js', ext: 'jsx' },
    { id: 'vue', name: 'Vue.js', ext: 'vue' },
    { id: 'html', name: 'HTML/CSS/JS', ext: 'html' },
    { id: 'json', name: 'JSON Config', ext: 'json' }
  ];

  const generateCode = (): string => {
    switch (selectedFramework) {
      case 'flutter':
        return CodeGenerator.generateFlutterCode(formConfig);
      case 'react':
        return CodeGenerator.generateReactCode(formConfig);
      case 'vue':
        return CodeGenerator.generateVueCode(formConfig);
      case 'html':
        return CodeGenerator.generateHTMLCode(formConfig);
      case 'json':
        return CodeGenerator.generateJSONConfig(formConfig);
      default:
        return '';
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generateCode());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const downloadCode = () => {
    const code = generateCode();
    const framework = frameworks.find(f => f.id === selectedFramework);
    const filename = `${formConfig.id || 'form'}.${framework?.ext || 'txt'}`;
    
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const code = generateCode();

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Generate Form Code" size="fullscreen">
      <div className="flex h-full">
        {/* Sidebar */}
        <div className="w-80 bg-gray-800 border-r border-gray-700 p-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Framework</h3>
              <div className="space-y-2">
                {frameworks.map(framework => (
                  <button
                    key={framework.id}
                    onClick={() => setSelectedFramework(framework.id as Framework)}
                    className={`w-full text-left px-4 py-3 rounded-lg border transition-colors ${
                      selectedFramework === framework.id
                        ? 'bg-blue-600 border-blue-600 text-white'
                        : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    <div className="font-medium">{framework.name}</div>
                    <div className="text-sm text-gray-400">.{framework.ext}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Actions</h3>
              <div className="space-y-2">
                <Button
                  onClick={copyToClipboard}
                  className="w-full flex items-center justify-center space-x-2"
                  variant="outline"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copy Code</span>
                    </>
                  )}
                </Button>
                
                <Button
                  onClick={downloadCode}
                  className="w-full flex items-center justify-center space-x-2"
                  variant="outline"
                >
                  <Download className="w-4 h-4" />
                  <span>Download</span>
                </Button>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Form Info</h3>
              <div className="space-y-2 text-sm text-gray-300">
                <div>
                  <span className="font-medium text-white">Title:</span> {formConfig.title || 'Untitled'}
                </div>
                <div>
                  <span className="font-medium text-white">Fields:</span> {
                    formConfig.sections.reduce((total, section) => {
                      if ('fields' in section) {
                        return total + section.fields.length;
                      }
                      return total + 1;
                    }, 0)
                  }
                </div>
                <div>
                  <span className="font-medium text-white">Sections:</span> {
                    formConfig.sections.filter(section => 'fields' in section).length
                  }
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Code Editor */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 overflow-hidden">
            <div className="h-full">
              <CodeEditor
                value={code}
                language={getLanguage(selectedFramework)}
                readonly={true}
              />
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

// Simple code editor component (you could use Monaco Editor here)
interface CodeEditorProps {
  value: string;
  language: string;
  readonly?: boolean;
}

const CodeEditor = ({ value, language, readonly = false }: CodeEditorProps) => {
  return (
    <div className="h-full w-full">
      <pre className="h-full w-full p-4 bg-gray-900 text-gray-100 overflow-auto text-sm font-mono">
        <code>{value}</code>
      </pre>
    </div>
  );
};

const getLanguage = (framework: Framework): string => {
  switch (framework) {
    case 'flutter':
      return 'dart';
    case 'react':
      return 'jsx';
    case 'vue':
      return 'vue';
    case 'html':
      return 'html';
    case 'json':
      return 'json';
    default:
      return 'text';
  }
};
