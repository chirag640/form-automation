'use client';

import { useState } from 'react';
import { useTheme } from '@/lib/contexts/ThemeProvider';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { GeneratorSettings } from '@/lib/types/theme-config';
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
  History,
  Sparkles,
  Clock
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
    generateRandomTheme,
    generateRandomLayout,
    updateSettings,
    resetToDefault,
    getCurrentTheme,
    getCurrentLayout
  } = useTheme();

  const [activeTab, setActiveTab] = useState<'themes' | 'layouts' | 'presets' | 'history' | 'settings'>('themes');
  const [customThemeName, setCustomThemeName] = useState('');
  const [customLayoutName, setCustomLayoutName] = useState('');
  const [isGenerating] = useState(false);

  const handleGenerateRandomTheme = () => {
    generateRandomTheme();
  };

  const handleGenerateRandomLayout = () => {
    generateRandomLayout();
  };

  const handleGenerateRandomBoth = () => {
    generateRandomTheme();
    // Small delay between theme and layout generation
    setTimeout(() => {
      generateRandomLayout();
    }, 200);
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

  const handleSettingsUpdate = (key: keyof GeneratorSettings, value: unknown) => {
    updateSettings({ [key]: value });
  };

  const renderThemesTab = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-4 flex-wrap">
        <Button
          onClick={handleGenerateRandomTheme}
          disabled={isGenerating || state.isGenerating}
          className="flex items-center gap-2"
        >
          {isGenerating || state.isGenerating ? (
            <RefreshCw className="w-4 h-4 animate-spin" />
          ) : (
            <Shuffle className="w-4 h-4" />
          )}
          Generate Random Theme
        </Button>
        
        <Button
          onClick={handleGenerateRandomBoth}
          disabled={isGenerating || state.isGenerating}
          className="flex items-center gap-2 bg-[#9c27b0] hover:bg-[#7b1fa2] text-white"
        >
          {isGenerating || state.isGenerating ? (
            <RefreshCw className="w-4 h-4 animate-spin" />
          ) : (
            <Sparkles className="w-4 h-4" />
          )}
          Generate Both
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

      {/* Randomization Level Control */}
      <Card className="p-4">
        <h3 className="font-semibold mb-3 text-[#cccccc]">Randomization Level</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-4">
            {(['conservative', 'moderate', 'creative'] as const).map((level) => (
              <label key={level} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="randomizationLevel"
                  value={level}
                  checked={state.settings.randomizationLevel === level}
                  onChange={(e) => handleSettingsUpdate('randomizationLevel', e.target.value)}
                  className="w-4 h-4 accent-[#007acc]"
                />
                <span className="text-sm capitalize text-[#cccccc]">{level}</span>
              </label>
            ))}
          </div>
          <p className="text-xs text-[#858585]">
            {state.settings.randomizationLevel === 'conservative' && 'Safe, professional color schemes and layouts'}
            {state.settings.randomizationLevel === 'moderate' && 'Balanced mix of traditional and modern styles'}
            {state.settings.randomizationLevel === 'creative' && 'Bold, experimental designs and color combinations'}
          </p>
        </div>
      </Card>

      {/* Theme Preview */}
      <Card className="p-4">
        <h3 className="font-semibold mb-3 text-[#cccccc]">Current Theme: {getCurrentTheme().name}</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div 
                className="w-4 h-4 rounded-full border border-[#3e3e42]"
                style={{ backgroundColor: getCurrentTheme().colors.primary }}
              />
              <span className="text-sm text-[#cccccc]">Primary: {getCurrentTheme().colors.primary}</span>
            </div>
            <div className="flex items-center gap-2">
              <div 
                className="w-4 h-4 rounded-full border border-[#3e3e42]"
                style={{ backgroundColor: getCurrentTheme().colors.secondary }}
              />
              <span className="text-sm text-[#cccccc]">Secondary: {getCurrentTheme().colors.secondary}</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div 
                className="w-4 h-4 rounded-full border border-[#3e3e42]"
                style={{ backgroundColor: getCurrentTheme().colors.background }}
              />
              <span className="text-sm text-[#cccccc]">Background: {getCurrentTheme().colors.background}</span>
            </div>
            <div className="flex items-center gap-2">
              <div 
                className="w-4 h-4 rounded-full border border-[#3e3e42]"
                style={{ backgroundColor: getCurrentTheme().colors.surface }}
              />
              <span className="text-sm text-[#cccccc]">Surface: {getCurrentTheme().colors.surface}</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Save Custom Theme */}
      <Card className="p-4">
        <h3 className="font-semibold mb-3 text-[#cccccc]">Save Current Theme</h3>
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
          <h3 className="font-semibold mb-3 text-[#cccccc]">Custom Themes</h3>
          <div className="grid gap-2 max-h-[30vh] overflow-y-auto custom-scrollbar pr-2">
            {state.customThemes.map((theme) => (
              <div key={theme.id} className="flex items-center justify-between p-3 border border-[#3e3e42] rounded bg-[#2d2d30]">
                <span className="text-[#cccccc]">{theme.name}</span>
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
      <div className="flex items-center gap-4 flex-wrap">
        <Button
          onClick={handleGenerateRandomLayout}
          disabled={isGenerating || state.isGenerating}
          className="flex items-center gap-2"
        >
          {isGenerating || state.isGenerating ? (
            <RefreshCw className="w-4 h-4 animate-spin" />
          ) : (
            <Layout className="w-4 h-4" />
          )}
          Generate Random Layout
        </Button>
        
        <Button
          onClick={handleGenerateRandomBoth}
          disabled={isGenerating || state.isGenerating}
          className="flex items-center gap-2 bg-[#9c27b0] hover:bg-[#7b1fa2] text-white"
        >
          {isGenerating || state.isGenerating ? (
            <RefreshCw className="w-4 h-4 animate-spin" />
          ) : (
            <Sparkles className="w-4 h-4" />
          )}
          Generate Both
        </Button>
      </div>

      {/* Layout Preview */}
      <Card className="p-4">
        <h3 className="font-semibold mb-3 text-[#cccccc]">Current Layout: {getCurrentLayout().name}</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="space-y-1">
            <p className="text-[#cccccc]"><strong className="text-[#4fc3f7]">Type:</strong> {getCurrentLayout().type}</p>
            <p className="text-[#cccccc]"><strong className="text-[#4fc3f7]">Max Width:</strong> {getCurrentLayout().formLayout.maxWidth}</p>
            <p className="text-[#cccccc]"><strong className="text-[#4fc3f7]">Alignment:</strong> {getCurrentLayout().formLayout.alignment}</p>
          </div>
          <div className="space-y-1">
            <p className="text-[#cccccc]"><strong className="text-[#4fc3f7]">Label Position:</strong> {getCurrentLayout().fieldLayout.labelPosition}</p>
            <p className="text-[#cccccc]"><strong className="text-[#4fc3f7]">Field Spacing:</strong> {getCurrentLayout().fieldLayout.fieldSpacing}</p>
            <p className="text-[#cccccc]"><strong className="text-[#4fc3f7]">Section Spacing:</strong> {getCurrentLayout().fieldLayout.sectionSpacing}</p>
          </div>
        </div>
      </Card>

      {/* Save Custom Layout */}
      <Card className="p-4">
        <h3 className="font-semibold mb-3 text-[#cccccc]">Save Current Layout</h3>
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
          <h3 className="font-semibold mb-3 text-[#cccccc]">Custom Layouts</h3>
          <div className="space-y-2 max-h-[30vh] overflow-y-auto custom-scrollbar pr-2">
            {state.customLayouts.map((layout) => (
              <div key={layout.id} className="flex items-center justify-between p-3 border border-[#3e3e42] rounded bg-[#2d2d30]">
                <span className="text-[#cccccc]">{layout.name}</span>
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
      <div className="space-y-4 max-h-[70vh] overflow-y-auto custom-scrollbar pr-2">
        {state.presets.map((preset) => (
          <Card key={preset.id} className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-[#cccccc] mb-1">{preset.name}</h3>
                <p className="text-sm text-[#858585] mb-2">{preset.description}</p>
                <div className="flex gap-1 flex-wrap">
                  {preset.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 bg-[#37373d] text-[#cccccc] text-xs rounded border border-[#3e3e42]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex gap-2 ml-4">
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
        <h3 className="font-semibold mb-4 text-[#cccccc]">Generator Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-[#cccccc]">Auto Apply Changes</label>
            <input
              type="checkbox"
              checked={state.settings.autoApply}
              onChange={(e) => handleSettingsUpdate('autoApply', e.target.checked)}
              className="w-4 h-4 accent-[#007acc] bg-[#3c3c3c] border border-[#3e3e42] rounded"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-[#cccccc]">Preview Mode</label>
            <input
              type="checkbox"
              checked={state.settings.previewMode}
              onChange={(e) => handleSettingsUpdate('previewMode', e.target.checked)}
              className="w-4 h-4 accent-[#007acc] bg-[#3c3c3c] border border-[#3e3e42] rounded"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-[#cccccc]">Persist Settings</label>
            <input
              type="checkbox"
              checked={state.settings.persistSettings}
              onChange={(e) => handleSettingsUpdate('persistSettings', e.target.checked)}
              className="w-4 h-4 accent-[#007acc] bg-[#3c3c3c] border border-[#3e3e42] rounded"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-[#cccccc]">AI Suggestions</label>
            <input
              type="checkbox"
              checked={state.settings.aiSuggestions}
              onChange={(e) => handleSettingsUpdate('aiSuggestions', e.target.checked)}
              className="w-4 h-4 accent-[#007acc] bg-[#3c3c3c] border border-[#3e3e42] rounded"
            />
          </div>
          
          <div>
            <label className="text-sm font-medium block mb-2 text-[#cccccc]">Randomization Level</label>
            <select
              value={state.settings.randomizationLevel}
              onChange={(e) => handleSettingsUpdate('randomizationLevel', e.target.value)}
              className="w-full p-2 bg-[#3c3c3c] border border-[#3e3e42] rounded text-[#cccccc] focus:outline-none focus:ring-1 focus:ring-[#007acc] focus:border-[#007acc]"
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

  const renderHistoryTab = () => (
    <div className="space-y-6">
      {state.history.length === 0 ? (
        <div className="text-center py-12">
          <Clock className="w-16 h-16 text-[#858585] mx-auto mb-4" />
          <p className="text-[#cccccc] text-lg mb-2">No theme history yet</p>
          <p className="text-sm text-[#858585]">Generate or apply themes to build your history</p>
        </div>
      ) : (
        <div className="space-y-4">
          <h3 className="font-semibold text-[#cccccc]">Theme History ({state.history.length})</h3>
          <div className="space-y-3 max-h-[60vh] overflow-y-auto custom-scrollbar pr-2">
            {state.history.slice().reverse().map((item) => (
              <Card key={item.timestamp} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <div className="flex gap-1">
                        <div 
                          className="w-4 h-4 rounded-full border border-[#3e3e42]"
                          style={{ backgroundColor: item.theme.colors.primary }}
                        />
                        <div 
                          className="w-4 h-4 rounded-full border border-[#3e3e42]"
                          style={{ backgroundColor: item.theme.colors.surface }}
                        />
                      </div>
                      <div>
                        <p className="font-medium text-sm text-[#cccccc]">{item.theme.name}</p>
                        <p className="text-xs text-[#858585]">
                          {item.layout.name} • {new Date(item.timestamp).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setTheme(item.theme);
                      setLayout(item.layout);
                    }}
                    className="flex items-center gap-1"
                  >
                    <RefreshCw className="w-3 h-3" />
                    Restore
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Theme & Layout Generator" size="fullscreen">
      <div className="h-full flex flex-col bg-[#1e1e1e]">
        {/* Tab Navigation */}
        <div className="flex border-b border-[#3e3e42] bg-[#2d2d30] flex-shrink-0">
          <button
            onClick={() => setActiveTab('themes')}
            className={`px-4 py-3 font-medium text-sm flex items-center gap-2 transition-colors ${
              activeTab === 'themes' 
                ? 'border-b-2 border-[#007acc] text-[#007acc] bg-[#1e1e1e]' 
                : 'text-[#cccccc] hover:text-white hover:bg-[#37373d]'
            }`}
          >
            <Palette className="w-4 h-4" />
            Themes
          </button>
          <button
            onClick={() => setActiveTab('layouts')}
            className={`px-4 py-3 font-medium text-sm flex items-center gap-2 transition-colors ${
              activeTab === 'layouts' 
                ? 'border-b-2 border-[#007acc] text-[#007acc] bg-[#1e1e1e]' 
                : 'text-[#cccccc] hover:text-white hover:bg-[#37373d]'
            }`}
          >
            <Layout className="w-4 h-4" />
            Layouts
          </button>
          <button
            onClick={() => setActiveTab('presets')}
            className={`px-4 py-3 font-medium text-sm flex items-center gap-2 transition-colors ${
              activeTab === 'presets' 
                ? 'border-b-2 border-[#007acc] text-[#007acc] bg-[#1e1e1e]' 
                : 'text-[#cccccc] hover:text-white hover:bg-[#37373d]'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            Presets
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-4 py-3 font-medium text-sm flex items-center gap-2 transition-colors ${
              activeTab === 'history' 
                ? 'border-b-2 border-[#007acc] text-[#007acc] bg-[#1e1e1e]' 
                : 'text-[#cccccc] hover:text-white hover:bg-[#37373d]'
            }`}
          >
            <History className="w-4 h-4" />
            History
            {state.history.length > 0 && (
              <span className="ml-1 bg-[#007acc] text-white text-xs rounded-full px-1.5 py-0.5 min-w-[1.25rem] text-center">
                {state.history.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-3 font-medium text-sm flex items-center gap-2 transition-colors ${
              activeTab === 'settings' 
                ? 'border-b-2 border-[#007acc] text-[#007acc] bg-[#1e1e1e]' 
                : 'text-[#cccccc] hover:text-white hover:bg-[#37373d]'
            }`}
          >
            <Settings className="w-4 h-4" />
            Settings
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-hidden">
          <div className="h-full overflow-y-auto custom-scrollbar">
            <div className="p-6">
              {activeTab === 'themes' && renderThemesTab()}
              {activeTab === 'layouts' && renderLayoutsTab()}
              {activeTab === 'presets' && renderPresetsTab()}
              {activeTab === 'history' && renderHistoryTab()}
              {activeTab === 'settings' && renderSettingsTab()}
            </div>
          </div>
        </div>

        {/* Preview Controls */}
        {(state.previewTheme || state.previewLayout) && (
          <div className="border-t border-[#3e3e42] bg-[#2d2d30] p-4 flex-shrink-0">
            <div className="flex justify-between items-center">
              <span className="text-sm text-[#cccccc]">
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
                  className="flex items-center gap-2 bg-transparent border-[#3e3e42] text-[#cccccc] hover:bg-[#37373d] hover:border-[#007acc]"
                >
                  <EyeOff className="w-4 h-4" />
                  Cancel
                </Button>
                <Button
                  size="sm"
                  onClick={applyPreview}
                  className="flex items-center gap-2 bg-[#007acc] hover:bg-[#1177bb] text-white"
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
