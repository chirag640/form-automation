import { ThemeConfig, LayoutConfig, ThemePreset, GeneratorSettings } from '@/lib/types/theme-config';

export const getDefaultTheme = (): ThemeConfig => ({
  id: 'default-dark',
  name: 'Default Dark Theme',
  type: 'dark',
  colors: {
    primary: '#60a5fa',
    secondary: '#94a3b8',
    background: '#111827',
    surface: '#1f2937',
    text: {
      primary: '#f9fafb',
      secondary: '#d1d5db',
      muted: '#6b7280'
    },
    border: '#374151',
    error: '#f87171',
    success: '#34d399',
    warning: '#fbbf24',
    info: '#60a5fa'
  },
  typography: {
    headings: {
      fontSize: '1.5rem',
      fontWeight: '600',
      letterSpacing: '-0.025em'
    },
    body: {
      fontSize: '1rem',
      fontWeight: '400',
      lineHeight: '1.5'
    },
    input: {
      fontSize: '1rem',
      fontWeight: '400'
    },
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem'
  },
  borderRadius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '0.75rem',
    full: '9999px'
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
  }
});

export const getDefaultLayout = (): LayoutConfig => ({
  id: 'default',
  name: 'Default Layout',
  type: 'single-column',
  formLayout: {
    maxWidth: '100%',
    padding: '2rem',
    spacing: '1.5rem',
    alignment: 'center'
  },
  fieldLayout: {
    labelPosition: 'top',
    fieldSpacing: '1rem',
    groupSpacing: '1.5rem',
    sectionSpacing: '2rem'
  },
  responsive: {
    breakpoints: {
      mobile: '640px',
      tablet: '768px',
      desktop: '1024px'
    },
    columnsPerBreakpoint: {
      mobile: 1,
      tablet: 1,
      desktop: 1
    }
  }
});

export const getDarkTheme = (): ThemeConfig => ({
  id: 'dark',
  name: 'Dark Theme',
  type: 'dark',
  colors: {
    primary: '#60a5fa',
    secondary: '#94a3b8',
    background: '#111827',
    surface: '#1f2937',
    text: {
      primary: '#f9fafb',
      secondary: '#d1d5db',
      muted: '#6b7280'
    },
    border: '#374151',
    error: '#f87171',
    success: '#34d399',
    warning: '#fbbf24',
    info: '#60a5fa'
  },
  typography: {
    headings: {
      fontSize: '1.5rem',
      fontWeight: '600',
      letterSpacing: '-0.025em'
    },
    body: {
      fontSize: '1rem',
      fontWeight: '400',
      lineHeight: '1.5'
    },
    input: {
      fontSize: '1rem',
      fontWeight: '400'
    },
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem'
  },
  borderRadius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '0.75rem',
    full: '9999px'
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.2)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)'
  }
});

export const getModernTheme = (): ThemeConfig => ({
  id: 'modern',
  name: 'Modern Theme',
  type: 'light',
  colors: {
    primary: '#8b5cf6',
    secondary: '#6b7280',
    background: '#fafafa',
    surface: '#ffffff',
    text: {
      primary: '#111827',
      secondary: '#374151',
      muted: '#9ca3af'
    },
    border: '#e5e7eb',
    error: '#ef4444',
    success: '#10b981',
    warning: '#f59e0b',
    info: '#8b5cf6'
  },
  typography: {
    headings: {
      fontSize: '1.5rem',
      fontWeight: '700',
      letterSpacing: '-0.025em'
    },
    body: {
      fontSize: '1rem',
      fontWeight: '400',
      lineHeight: '1.6'
    },
    input: {
      fontSize: '1rem',
      fontWeight: '500'
    },
    fontFamily: 'Poppins, Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem'
  },
  borderRadius: {
    sm: '0.5rem',
    md: '0.75rem',
    lg: '1rem',
    full: '9999px'
  },
  shadows: {
    sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.15), 0 2px 4px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.15), 0 4px 6px -2px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.15), 0 10px 10px -5px rgba(0, 0, 0, 0.1)'
  }
});

export const getTwoColumnLayout = (): LayoutConfig => ({
  id: 'two-column',
  name: 'Two Column Layout',
  type: 'two-column',
  formLayout: {
    maxWidth: '900px',
    padding: '2rem',
    spacing: '1.5rem',
    alignment: 'center'
  },
  fieldLayout: {
    labelPosition: 'top',
    fieldSpacing: '1rem',
    groupSpacing: '1.5rem',
    sectionSpacing: '2rem'
  },
  responsive: {
    breakpoints: {
      mobile: '640px',
      tablet: '768px',
      desktop: '1024px'
    },
    columnsPerBreakpoint: {
      mobile: 1,
      tablet: 2,
      desktop: 2
    }
  }
});

export const getCardLayout = (): LayoutConfig => ({
  id: 'card',
  name: 'Card Layout',
  type: 'card',
  formLayout: {
    maxWidth: '700px',
    padding: '3rem',
    spacing: '2rem',
    alignment: 'center'
  },
  fieldLayout: {
    labelPosition: 'top',
    fieldSpacing: '1.5rem',
    groupSpacing: '2rem',
    sectionSpacing: '2.5rem'
  },
  responsive: {
    breakpoints: {
      mobile: '640px',
      tablet: '768px',
      desktop: '1024px'
    },
    columnsPerBreakpoint: {
      mobile: 1,
      tablet: 1,
      desktop: 1
    }
  }
});

export const getDefaultPresets = (): ThemePreset[] => [
  {
    id: 'default-preset',
    name: 'Default',
    description: 'Clean and professional default theme',
    theme: getDefaultTheme(),
    layout: getDefaultLayout(),
    category: 'modern',
    tags: ['clean', 'professional', 'default']
  },
  {
    id: 'dark-preset',
    name: 'Dark Mode',
    description: 'Dark theme for better focus',
    theme: getDarkTheme(),
    layout: getDefaultLayout(),
    category: 'dark',
    tags: ['dark', 'focus', 'modern']
  },
  {
    id: 'modern-preset',
    name: 'Modern Purple',
    description: 'Modern theme with purple accents',
    theme: getModernTheme(),
    layout: getDefaultLayout(),
    category: 'modern',
    tags: ['modern', 'purple', 'stylish']
  },
  {
    id: 'two-column-preset',
    name: 'Two Column',
    description: 'Efficient two-column layout',
    theme: getDefaultTheme(),
    layout: getTwoColumnLayout(),
    category: 'modern',
    tags: ['two-column', 'efficient', 'wide']
  },
  {
    id: 'card-preset',
    name: 'Card Style',
    description: 'Elegant card-based layout',
    theme: getDefaultTheme(),
    layout: getCardLayout(),
    category: 'modern',
    tags: ['card', 'elegant', 'spacious']
  }
];

export const getDefaultSettings = (): GeneratorSettings => ({
  autoApply: false,
  previewMode: true,
  persistSettings: true,
  aiSuggestions: false,
  randomizationLevel: 'moderate'
});

// Theme generation utilities
export const generateRandomColors = (level: 'conservative' | 'moderate' | 'creative') => {
  const colorPalettes = {
    conservative: [
      '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'
    ],
    moderate: [
      '#06b6d4', '#84cc16', '#f97316', '#ec4899', '#6366f1'
    ],
    creative: [
      '#14b8a6', '#a3e635', '#fb7185', '#fbbf24', '#8b5cf6'
    ]
  };
  
  const colors = colorPalettes[level];
  return colors[Math.floor(Math.random() * colors.length)];
};

export const generateRandomTheme = (level: 'conservative' | 'moderate' | 'creative'): ThemeConfig => {
  const baseTheme = getDefaultTheme();
  const primaryColor = generateRandomColors(level);
  
  return {
    ...baseTheme,
    id: `random-${Date.now()}`,
    name: `Random Theme ${Date.now()}`,
    colors: {
      ...baseTheme.colors,
      primary: primaryColor
    }
  };
};

export const generateRandomLayout = (level: 'conservative' | 'moderate' | 'creative'): LayoutConfig => {
  const layouts = ['single-column', 'two-column', 'card'];
  const randomType = layouts[Math.floor(Math.random() * layouts.length)] as LayoutConfig['type'];
  
  const baseLayout = getDefaultLayout();
  
  return {
    ...baseLayout,
    id: `random-${Date.now()}`,
    name: `Random Layout ${Date.now()}`,
    type: randomType,
    formLayout: {
      ...baseLayout.formLayout,
      maxWidth: level === 'creative' ? '800px' : '600px'
    }
  };
};
