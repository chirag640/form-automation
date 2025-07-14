export interface ThemeConfig {
  id: string;
  name: string;
  type: 'light' | 'dark' | 'custom';
  colors: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    text: {
      primary: string;
      secondary: string;
      muted: string;
    };
    border: string;
    error: string;
    success: string;
    warning: string;
    info: string;
  };
  typography: {
    headings: {
      fontSize: string;
      fontWeight: string;
      letterSpacing: string;
    };
    body: {
      fontSize: string;
      fontWeight: string;
      lineHeight: string;
    };
    input: {
      fontSize: string;
      fontWeight: string;
    };
    fontFamily: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
    full: string;
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
}

export interface LayoutConfig {
  id: string;
  name: string;
  type: 'single-column' | 'two-column' | 'grid' | 'card' | 'stepper';
  formLayout: {
    maxWidth: string;
    padding: string;
    spacing: string;
    alignment: 'left' | 'center' | 'right';
  };
  fieldLayout: {
    labelPosition: 'top' | 'left' | 'right' | 'floating';
    fieldSpacing: string;
    groupSpacing: string;
    sectionSpacing: string;
  };
  responsive: {
    breakpoints: {
      mobile: string;
      tablet: string;
      desktop: string;
    };
    columnsPerBreakpoint: {
      mobile: number;
      tablet: number;
      desktop: number;
    };
  };
}

export interface ThemePreset {
  id: string;
  name: string;
  description: string;
  theme: ThemeConfig;
  layout: LayoutConfig;
  category: 'modern' | 'classic' | 'minimal' | 'bold' | 'dark';
  tags: string[];
}

export interface GeneratorSettings {
  autoApply: boolean;
  previewMode: boolean;
  persistSettings: boolean;
  aiSuggestions: boolean;
  randomizationLevel: 'conservative' | 'moderate' | 'creative';
}

export interface ThemeGeneratorState {
  currentTheme: ThemeConfig;
  currentLayout: LayoutConfig;
  presets: ThemePreset[];
  customThemes: ThemeConfig[];
  customLayouts: LayoutConfig[];
  history: Array<{
    theme: ThemeConfig;
    layout: LayoutConfig;
    timestamp: number;
  }>;
  settings: GeneratorSettings;
  isGenerating: boolean;
  previewTheme?: ThemeConfig;
  previewLayout?: LayoutConfig;
}
