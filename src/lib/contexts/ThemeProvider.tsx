'use client';

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { ThemeConfig, LayoutConfig, ThemePreset, GeneratorSettings, ThemeGeneratorState } from '@/lib/types/theme-config';
import { getDefaultTheme, getDefaultLayout, getDefaultPresets, getDefaultSettings } from '@/lib/utils/theme-defaults';

type ThemeAction = 
  | { type: 'SET_THEME'; payload: ThemeConfig }
  | { type: 'SET_LAYOUT'; payload: LayoutConfig }
  | { type: 'SET_PREVIEW_THEME'; payload: ThemeConfig | undefined }
  | { type: 'SET_PREVIEW_LAYOUT'; payload: LayoutConfig | undefined }
  | { type: 'ADD_CUSTOM_THEME'; payload: ThemeConfig }
  | { type: 'ADD_CUSTOM_LAYOUT'; payload: LayoutConfig }
  | { type: 'UPDATE_SETTINGS'; payload: Partial<GeneratorSettings> }
  | { type: 'SET_GENERATING'; payload: boolean }
  | { type: 'APPLY_PRESET'; payload: ThemePreset }
  | { type: 'SAVE_TO_HISTORY' }
  | { type: 'RESTORE_FROM_HISTORY'; payload: number }
  | { type: 'LOAD_FROM_STORAGE'; payload: Partial<ThemeGeneratorState> }
  | { type: 'RANDOMIZE_THEME' }
  | { type: 'RANDOMIZE_LAYOUT' }
  | { type: 'RESET_TO_DEFAULT' };

const themeReducer = (state: ThemeGeneratorState, action: ThemeAction): ThemeGeneratorState => {
  switch (action.type) {
    case 'SET_THEME':
      return {
        ...state,
        currentTheme: action.payload,
        previewTheme: undefined
      };
    
    case 'SET_LAYOUT':
      return {
        ...state,
        currentLayout: action.payload,
        previewLayout: undefined
      };
    
    case 'SET_PREVIEW_THEME':
      return {
        ...state,
        previewTheme: action.payload
      };
    
    case 'SET_PREVIEW_LAYOUT':
      return {
        ...state,
        previewLayout: action.payload
      };
    
    case 'ADD_CUSTOM_THEME':
      return {
        ...state,
        customThemes: [...state.customThemes, action.payload]
      };
    
    case 'ADD_CUSTOM_LAYOUT':
      return {
        ...state,
        customLayouts: [...state.customLayouts, action.payload]
      };
    
    case 'UPDATE_SETTINGS':
      return {
        ...state,
        settings: { ...state.settings, ...action.payload }
      };
    
    case 'SET_GENERATING':
      return {
        ...state,
        isGenerating: action.payload
      };
    
    case 'APPLY_PRESET':
      return {
        ...state,
        currentTheme: action.payload.theme,
        currentLayout: action.payload.layout,
        previewTheme: undefined,
        previewLayout: undefined
      };
    
    case 'SAVE_TO_HISTORY':
      return {
        ...state,
        history: [
          ...state.history.slice(-9), // Keep last 9 entries
          {
            theme: state.currentTheme,
            layout: state.currentLayout,
            timestamp: Date.now()
          }
        ]
      };
    
    case 'RESTORE_FROM_HISTORY':
      const historyItem = state.history[action.payload];
      if (historyItem) {
        return {
          ...state,
          currentTheme: historyItem.theme,
          currentLayout: historyItem.layout,
          previewTheme: undefined,
          previewLayout: undefined
        };
      }
      return state;
    
    case 'LOAD_FROM_STORAGE':
      return {
        ...state,
        ...action.payload
      };
    
    case 'RANDOMIZE_THEME':
      // This will be implemented with actual randomization logic
      return state;
    
    case 'RANDOMIZE_LAYOUT':
      // This will be implemented with actual randomization logic
      return state;
    
    case 'RESET_TO_DEFAULT':
      return {
        ...state,
        currentTheme: getDefaultTheme(),
        currentLayout: getDefaultLayout(),
        previewTheme: undefined,
        previewLayout: undefined
      };
    
    default:
      return state;
  }
};

const initialState: ThemeGeneratorState = {
  currentTheme: getDefaultTheme(),
  currentLayout: getDefaultLayout(),
  presets: getDefaultPresets(),
  customThemes: [],
  customLayouts: [],
  history: [],
  settings: getDefaultSettings(),
  isGenerating: false
};

interface ThemeContextType {
  state: ThemeGeneratorState;
  dispatch: React.Dispatch<ThemeAction>;
  // Helper functions
  setTheme: (theme: ThemeConfig) => void;
  setLayout: (layout: LayoutConfig) => void;
  previewTheme: (theme: ThemeConfig) => void;
  previewLayout: (layout: LayoutConfig) => void;
  applyPreview: () => void;
  cancelPreview: () => void;
  applyPreset: (preset: ThemePreset) => void;
  saveCustomTheme: (theme: ThemeConfig) => void;
  saveCustomLayout: (layout: LayoutConfig) => void;
  generateRandomTheme: () => void;
  generateRandomLayout: () => void;
  updateSettings: (settings: Partial<GeneratorSettings>) => void;
  resetToDefault: () => void;
  getCurrentTheme: () => ThemeConfig;
  getCurrentLayout: () => LayoutConfig;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(themeReducer, initialState);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedState = localStorage.getItem('theme-generator-state');
      if (savedState) {
        const parsed = JSON.parse(savedState);
        dispatch({ type: 'LOAD_FROM_STORAGE', payload: parsed });
      }
    } catch (error) {
      console.error('Failed to load theme state from localStorage:', error);
    }
  }, []);

  // Save to localStorage when state changes
  useEffect(() => {
    if (state.settings.persistSettings) {
      try {
        localStorage.setItem('theme-generator-state', JSON.stringify({
          currentTheme: state.currentTheme,
          currentLayout: state.currentLayout,
          customThemes: state.customThemes,
          customLayouts: state.customLayouts,
          history: state.history,
          settings: state.settings
        }));
      } catch (error) {
        console.error('Failed to save theme state to localStorage:', error);
      }
    }
  }, [state.currentTheme, state.currentLayout, state.customThemes, state.customLayouts, state.history, state.settings]);

  // Helper functions
  const setTheme = (theme: ThemeConfig) => {
    dispatch({ type: 'SAVE_TO_HISTORY' });
    dispatch({ type: 'SET_THEME', payload: theme });
  };

  const setLayout = (layout: LayoutConfig) => {
    dispatch({ type: 'SAVE_TO_HISTORY' });
    dispatch({ type: 'SET_LAYOUT', payload: layout });
  };

  const previewTheme = (theme: ThemeConfig) => {
    dispatch({ type: 'SET_PREVIEW_THEME', payload: theme });
  };

  const previewLayout = (layout: LayoutConfig) => {
    dispatch({ type: 'SET_PREVIEW_LAYOUT', payload: layout });
  };

  const applyPreview = () => {
    if (state.previewTheme) {
      dispatch({ type: 'SAVE_TO_HISTORY' });
      dispatch({ type: 'SET_THEME', payload: state.previewTheme });
    }
    if (state.previewLayout) {
      dispatch({ type: 'SET_LAYOUT', payload: state.previewLayout });
    }
  };

  const cancelPreview = () => {
    dispatch({ type: 'SET_PREVIEW_THEME', payload: undefined });
    dispatch({ type: 'SET_PREVIEW_LAYOUT', payload: undefined });
  };

  const applyPreset = (preset: ThemePreset) => {
    dispatch({ type: 'SAVE_TO_HISTORY' });
    dispatch({ type: 'APPLY_PRESET', payload: preset });
  };

  const saveCustomTheme = (theme: ThemeConfig) => {
    dispatch({ type: 'ADD_CUSTOM_THEME', payload: theme });
  };

  const saveCustomLayout = (layout: LayoutConfig) => {
    dispatch({ type: 'ADD_CUSTOM_LAYOUT', payload: layout });
  };

  const generateRandomTheme = () => {
    dispatch({ type: 'SET_GENERATING', payload: true });
    // Implement actual randomization logic
    setTimeout(() => {
      dispatch({ type: 'RANDOMIZE_THEME' });
      dispatch({ type: 'SET_GENERATING', payload: false });
    }, 1000);
  };

  const generateRandomLayout = () => {
    dispatch({ type: 'SET_GENERATING', payload: true });
    // Implement actual randomization logic
    setTimeout(() => {
      dispatch({ type: 'RANDOMIZE_LAYOUT' });
      dispatch({ type: 'SET_GENERATING', payload: false });
    }, 1000);
  };

  const updateSettings = (settings: Partial<GeneratorSettings>) => {
    dispatch({ type: 'UPDATE_SETTINGS', payload: settings });
  };

  const resetToDefault = () => {
    dispatch({ type: 'SAVE_TO_HISTORY' });
    dispatch({ type: 'RESET_TO_DEFAULT' });
  };

  const getCurrentTheme = () => state.previewTheme || state.currentTheme;
  const getCurrentLayout = () => state.previewLayout || state.currentLayout;

  const value: ThemeContextType = {
    state,
    dispatch,
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
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
