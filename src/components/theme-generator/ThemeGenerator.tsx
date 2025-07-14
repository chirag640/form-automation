'use client';

import { useState } from 'react';
import { useTheme } from '@/lib/contexts/ThemeProvider';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { ThemePreset, GeneratorSettings } from '@/lib/types/theme-config';
import { generateRandomTheme, generateRandomLayout } from '@/lib/utils/theme-defaults';
import { 
  Palette, 
  Layout, 
  Shuffle, 
  Save, 
  Settings, 
  Eye, 
  EyeOff, 
  RefreshCw,
  Download,
  Upload,
  History,
  Sparkles
} from 'lucide-react';

interface ThemeGeneratorProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ThemeGenerator: React.FC<ThemeGeneratorProps> = ({ isOpen, onClose }) => {
  const {
    state,
    setTheme,
    setLayout,
    previewTheme,
    previewLayout,
    applyPreview,
    cancelPreview,
    applyPreset,
    saveCustomTheme,
    saveCustomLayout,
    updateSettings,
    resetToDefault,
    getCurrentTheme,
    getCurrentLayout
  } = useTheme();

  const [activeTab, setActiveTab] = useState<'themes' | 'layouts' | 'presets' | 'settings'>('themes');
  const [customThemeName, setCustomThemeName] = useState('');
  const [customLayoutName, setCustomLayoutName] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateRandomTheme = async () => {
    setIsGenerating(true);
    try {
      const randomTheme = generateRandomTheme(state.settings.randomizationLevel);
      if (state.settings.previewMode) {
        previewTheme(randomTheme);
      } else {
        setTheme(randomTheme);
      }
    } catch (error) {
      console.error('Error generating random theme:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerateRandomLayout = async () => {
    setIsGenerating(true);
    try {
      const randomLayout = generateRandomLayout(state.settings.randomizationLevel);
      if (state.settings.previewMode) {
        previewLayout(randomLayout);
      } else {
        setLayout(randomLayout);
      }
    } catch (error) {
      console.error('Error generating random layout:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveCustomTheme = () => {
    if (customThemeName.trim()) {
      const currentTheme = getCurrentTheme();
      const customTheme = {
        ...currentTheme,
        id: `custom-${Date.now()}`,
        name: customThemeName.trim(),
        type: 'custom' as const
      };
      saveCustomTheme(customTheme);
      setCustomThemeName('');
    }
  };

  const handleSaveCustomLayout = () => {
    if (customLayoutName.trim()) {
      const currentLayout = getCurrentLayout();
      const customLayout = {
        ...currentLayout,
        id: `custom-${Date.now()}`,
        name: customLayoutName.trim()
      };
      saveCustomLayout(customLayout);
      setCustomLayoutName('');
    }
  };

  const handleSettingsUpdate = (key: keyof GeneratorSettings, value: any) => {
    updateSettings({ [key]: value });
  };

  const renderThemesTab = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          onClick={handleGenerateRandomTheme}
          disabled={isGenerating}
          className="flex items-center gap-2"
        >
          {isGenerating ? (
            <RefreshCw className="w-4 h-4 animate-spin" />
          ) : (
            <Shuffle className="w-4 h-4" />
          )}
          Generate Random Theme
        </Button>
        
        <Button
          variant="outline"
          onClick={resetToDefault}
          className="flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Reset to Default
        </Button>
      </div>

      {/* Theme Preview */}
      <Card className="p-4">
        <h3 className="font-semibold mb-3">Current Theme: {getCurrentTheme().name}</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div 
                className="w-4 h-4 rounded-full border"
                style={{ backgroundColor: getCurrentTheme().colors.primary }}
              />
              <span className="text-sm">Primary: {getCurrentTheme().colors.primary}</span>
            </div>
            <div className="flex items-center gap-2">
              <div 
                className="w-4 h-4 rounded-full border"
                style={{ backgroundColor: getCurrentTheme().colors.secondary }}
              />
              <span className="text-sm">Secondary: {getCurrentTheme().colors.secondary}</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div 
                className="w-4 h-4 rounded-full border"
                style={{ backgroundColor: getCurrentTheme().colors.background }}
              />
              <span className="text-sm">Background: {getCurrentTheme().colors.background}</span>
            </div>
            <div className="flex items-center gap-2">
              <div 
                className="w-4 h-4 rounded-full border"
                style={{ backgroundColor: getCurrentTheme().colors.surface }}
              />
              <span className="text-sm">Surface: {getCurrentTheme().colors.surface}</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Save Custom Theme */}
      <Card className="p-4">
        <h3 className="font-semibold mb-3">Save Current Theme</h3>
        <div className="flex gap-2">
          <Input
            value={customThemeName}
            onChange={(e) => setCustomThemeName(e.target.value)}
            placeholder="Enter theme name"
            className="flex-1"
          />
          <Button
            onClick={handleSaveCustomTheme}
            disabled={!customThemeName.trim()}
            className="flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            Save
          </Button>
        </div>
      </Card>

      {/* Custom Themes */}
      {state.customThemes.length > 0 && (
        <Card className="p-4">
          <h3 className="font-semibold mb-3">Custom Themes</h3>
          <div className="grid gap-2">
            {state.customThemes.map((theme) => (
              <div key={theme.id} className="flex items-center justify-between p-2 border rounded">
                <span>{theme.name}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setTheme(theme)}
                >
                  Apply
                </Button>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );

  const renderLayoutsTab = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          onClick={handleGenerateRandomLayout}
          disabled={isGenerating}
          className="flex items-center gap-2"
        >
          {isGenerating ? (
            <RefreshCw className="w-4 h-4 animate-spin" />
          ) : (
            <Layout className="w-4 h-4" />
          )}
          Generate Random Layout
        </Button>
      </div>

      {/* Layout Preview */}
      <Card className="p-4">
        <h3 className="font-semibold mb-3">Current Layout: {getCurrentLayout().name}</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p><strong>Type:</strong> {getCurrentLayout().type}</p>
            <p><strong>Max Width:</strong> {getCurrentLayout().formLayout.maxWidth}</p>
            <p><strong>Alignment:</strong> {getCurrentLayout().formLayout.alignment}</p>
          </div>
          <div>
            <p><strong>Label Position:</strong> {getCurrentLayout().fieldLayout.labelPosition}</p>
            <p><strong>Field Spacing:</strong> {getCurrentLayout().fieldLayout.fieldSpacing}</p>
            <p><strong>Section Spacing:</strong> {getCurrentLayout().fieldLayout.sectionSpacing}</p>
          </div>
        </div>
      </Card>

      {/* Save Custom Layout */}
      <Card className="p-4">
        <h3 className="font-semibold mb-3">Save Current Layout</h3>
        <div className="flex gap-2">
          <Input
            value={customLayoutName}
            onChange={(e) => setCustomLayoutName(e.target.value)}
            placeholder="Enter layout name"
            className="flex-1"
          />
          <Button
            onClick={handleSaveCustomLayout}
            disabled={!customLayoutName.trim()}
            className="flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            Save
          </Button>
        </div>
      </Card>

      {/* Custom Layouts */}
      {state.customLayouts.length > 0 && (
        <Card className="p-4">
          <h3 className="font-semibold mb-3">Custom Layouts</h3>
          <div className="grid gap-2">
            {state.customLayouts.map((layout) => (
              <div key={layout.id} className="flex items-center justify-between p-2 border rounded">
                <span>{layout.name}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setLayout(layout)}
                >
                  Apply
                </Button>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );

  const renderPresetsTab = () => (
    <div className="space-y-6">
      <div className="grid gap-4">
        {state.presets.map((preset) => (
          <Card key={preset.id} className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">{preset.name}</h3>
                <p className="text-sm text-gray-600">{preset.description}</p>
                <div className="flex gap-1 mt-2">
                  {preset.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 bg-gray-100 text-xs rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    previewTheme(preset.theme);
                    previewLayout(preset.layout);
                  }}
                  className="flex items-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  Preview
                </Button>
                <Button
                  size="sm"
                  onClick={() => applyPreset(preset)}
                  className="flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Apply
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderSettingsTab = () => (
    <div className="space-y-6">
      <Card className="p-4">
        <h3 className="font-semibold mb-4">Generator Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Auto Apply Changes</label>
            <input
              type="checkbox"
              checked={state.settings.autoApply}
              onChange={(e) => handleSettingsUpdate('autoApply', e.target.checked)}
              className="w-4 h-4"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Preview Mode</label>
            <input
              type="checkbox"
              checked={state.settings.previewMode}
              onChange={(e) => handleSettingsUpdate('previewMode', e.target.checked)}
              className="w-4 h-4"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Persist Settings</label>
            <input
              type="checkbox"
              checked={state.settings.persistSettings}
              onChange={(e) => handleSettingsUpdate('persistSettings', e.target.checked)}
              className="w-4 h-4"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">AI Suggestions</label>
            <input
              type="checkbox"
              checked={state.settings.aiSuggestions}
              onChange={(e) => handleSettingsUpdate('aiSuggestions', e.target.checked)}
              className="w-4 h-4"
            />
          </div>
          
          <div>
            <label className="text-sm font-medium block mb-2">Randomization Level</label>
            <select
              value={state.settings.randomizationLevel}
              onChange={(e) => handleSettingsUpdate('randomizationLevel', e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="conservative">Conservative</option>
              <option value="moderate">Moderate</option>
              <option value="creative">Creative</option>
            </select>
          </div>
        </div>
      </Card>
    </div>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Theme & Layout Generator">
      <div className="h-96 flex flex-col">
        {/* Tab Navigation */}
        <div className="flex border-b mb-4">
          <button
            onClick={() => setActiveTab('themes')}
            className={`px-4 py-2 font-medium ${activeTab === 'themes' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600'}`}
          >
            <Palette className="w-4 h-4 inline mr-2" />
            Themes
          </button>
          <button
            onClick={() => setActiveTab('layouts')}
            className={`px-4 py-2 font-medium ${activeTab === 'layouts' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600'}`}
          >
            <Layout className="w-4 h-4 inline mr-2" />
            Layouts
          </button>
          <button
            onClick={() => setActiveTab('presets')}
            className={`px-4 py-2 font-medium ${activeTab === 'presets' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600'}`}
          >
            <Sparkles className="w-4 h-4 inline mr-2" />
            Presets
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2 font-medium ${activeTab === 'settings' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600'}`}
          >
            <Settings className="w-4 h-4 inline mr-2" />
            Settings
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === 'themes' && renderThemesTab()}
          {activeTab === 'layouts' && renderLayoutsTab()}
          {activeTab === 'presets' && renderPresetsTab()}
          {activeTab === 'settings' && renderSettingsTab()}
        </div>

        {/* Preview Controls */}
        {(state.previewTheme || state.previewLayout) && (
          <div className="border-t pt-4 mt-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">
                {state.previewTheme && state.previewLayout 
                  ? 'Previewing theme and layout changes'
                  : state.previewTheme 
                  ? 'Previewing theme changes'
                  : 'Previewing layout changes'}
              </span>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={cancelPreview}
                  className="flex items-center gap-2"
                >
                  <EyeOff className="w-4 h-4" />
                  Cancel
                </Button>
                <Button
                  size="sm"
                  onClick={applyPreview}
                  className="flex items-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  Apply
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};
