import { ThemeConfig, LayoutConfig, ThemePreset, GeneratorSettings } from '@/lib/types/theme-config';

export const getDefaultTheme = (): ThemeConfig => ({
  id: 'default-dark',
  name: 'Default Dark Theme',
  type: 'dark',
  colors: {
    primary: '#60a5fa',
    secondary: '#94a3b8',
    background: '#0a0a0a',
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
    conservative: {
      primaries: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#84cc16'],
      backgrounds: ['#ffffff', '#f8fafc', '#fafafa'],
      surfaces: ['#f1f5f9', '#f8fafc', '#ffffff'],
      texts: {
        primary: ['#1e293b', '#111827', '#374151'],
        secondary: ['#475569', '#6b7280', '#9ca3af'],
        muted: ['#94a3b8', '#d1d5db', '#e5e7eb']
      }
    },
    moderate: {
      primaries: ['#06b6d4', '#84cc16', '#f97316', '#ec4899', '#6366f1', '#14b8a6', '#a3e635'],
      backgrounds: ['#ffffff', '#fafafa', '#f9fafb'],
      surfaces: ['#f1f5f9', '#f3f4f6', '#ffffff'],
      texts: {
        primary: ['#111827', '#1f2937', '#374151'],
        secondary: ['#4b5563', '#6b7280', '#9ca3af'],
        muted: ['#9ca3af', '#d1d5db', '#e5e7eb']
      }
    },
    creative: {
      primaries: ['#14b8a6', '#a3e635', '#fb7185', '#fbbf24', '#8b5cf6', '#f472b6', '#06b6d4'],
      backgrounds: ['#fefefe', '#fdfdfd', '#fcfcfc'],
      surfaces: ['#f0f9ff', '#f0fdf4', '#fef2f2'],
      texts: {
        primary: ['#0f172a', '#111827', '#1f2937'],
        secondary: ['#334155', '#4b5563', '#6b7280'],
        muted: ['#64748b', '#9ca3af', '#d1d5db']
      }
    }
  };
  
  const palette = colorPalettes[level];
  return {
    primary: palette.primaries[Math.floor(Math.random() * palette.primaries.length)],
    background: palette.backgrounds[Math.floor(Math.random() * palette.backgrounds.length)],
    surface: palette.surfaces[Math.floor(Math.random() * palette.surfaces.length)],
    textPrimary: palette.texts.primary[Math.floor(Math.random() * palette.texts.primary.length)],
    textSecondary: palette.texts.secondary[Math.floor(Math.random() * palette.texts.secondary.length)],
    textMuted: palette.texts.muted[Math.floor(Math.random() * palette.texts.muted.length)]
  };
};

export const generateRandomTypography = (level: 'conservative' | 'moderate' | 'creative') => {
  const fonts = {
    conservative: ['Inter', 'Roboto', 'Open Sans'],
    moderate: ['Poppins', 'Nunito', 'Source Sans Pro'],
    creative: ['Montserrat', 'Playfair Display', 'Oswald']
  };
  
  const fontSizes = {
    conservative: ['1.25rem', '1.5rem', '1.75rem'],
    moderate: ['1.5rem', '1.75rem', '2rem'],
    creative: ['1.75rem', '2rem', '2.25rem']
  };
  
  const fontWeights = {
    conservative: ['500', '600'],
    moderate: ['600', '700'],
    creative: ['700', '800']
  };
  
  return {
    fontFamily: fonts[level][Math.floor(Math.random() * fonts[level].length)],
    headingFontSize: fontSizes[level][Math.floor(Math.random() * fontSizes[level].length)],
    headingFontWeight: fontWeights[level][Math.floor(Math.random() * fontWeights[level].length)]
  };
};

export const generateRandomSpacing = (level: 'conservative' | 'moderate' | 'creative') => {
  const spacingMultipliers = {
    conservative: [0.8, 1.0, 1.2],
    moderate: [0.6, 1.0, 1.4],
    creative: [0.5, 1.0, 1.6]
  };
  
  const multiplier = spacingMultipliers[level][Math.floor(Math.random() * spacingMultipliers[level].length)];
  
  return {
    xs: `${0.25 * multiplier}rem`,
    sm: `${0.5 * multiplier}rem`,
    md: `${1 * multiplier}rem`,
    lg: `${1.5 * multiplier}rem`,
    xl: `${2 * multiplier}rem`
  };
};

export const generateRandomBorderRadius = (level: 'conservative' | 'moderate' | 'creative') => {
  const radiusStyles = {
    conservative: [
      { sm: '0.25rem', md: '0.5rem', lg: '0.75rem', full: '9999px' },
      { sm: '0.125rem', md: '0.25rem', lg: '0.5rem', full: '9999px' }
    ],
    moderate: [
      { sm: '0.5rem', md: '0.75rem', lg: '1rem', full: '9999px' },
      { sm: '0.25rem', md: '0.5rem', lg: '0.75rem', full: '9999px' },
      { sm: '0.125rem', md: '0.25rem', lg: '0.5rem', full: '9999px' }
    ],
    creative: [
      { sm: '0.75rem', md: '1rem', lg: '1.5rem', full: '9999px' },
      { sm: '0rem', md: '0rem', lg: '0rem', full: '0rem' },
      { sm: '0.5rem', md: '1rem', lg: '2rem', full: '9999px' }
    ]
  };
  
  const styles = radiusStyles[level];
  return styles[Math.floor(Math.random() * styles.length)];
};

export const generateRandomTheme = (level: 'conservative' | 'moderate' | 'creative'): ThemeConfig => {
  const colors = generateRandomColors(level);
  const typography = generateRandomTypography(level);
  const spacing = generateRandomSpacing(level);
  const borderRadius = generateRandomBorderRadius(level);
  
  // Generate complementary colors based on primary
  const primaryHue = parseInt(colors.primary.slice(1), 16);
  const secondary = `hsl(${(primaryHue + 120) % 360}, 50%, 50%)`;
  
  return {
    id: `random-theme-${Date.now()}`,
    name: `Random ${level.charAt(0).toUpperCase() + level.slice(1)} Theme`,
    type: Math.random() > 0.3 ? 'light' : 'dark',
    colors: {
      primary: colors.primary,
      secondary: secondary,
      background: colors.background,
      surface: colors.surface,
      text: {
        primary: colors.textPrimary,
        secondary: colors.textSecondary,
        muted: colors.textMuted
      },
      border: '#e2e8f0',
      error: '#ef4444',
      success: '#10b981',
      warning: '#f59e0b',
      info: colors.primary
    },
    typography: {
      headings: {
        fontSize: typography.headingFontSize,
        fontWeight: typography.headingFontWeight,
        letterSpacing: '-0.025em'
      },
      body: {
        fontSize: '1rem',
        fontWeight: '400',
        lineHeight: '1.6'
      },
      input: {
        fontSize: '1rem',
        fontWeight: '400'
      },
      fontFamily: `${typography.fontFamily}, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`
    },
    spacing,
    borderRadius,
    shadows: {
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
    }
  };
};

export const generateRandomLayout = (level: 'conservative' | 'moderate' | 'creative'): LayoutConfig => {
  const layoutTypes: LayoutConfig['type'][] = ['single-column', 'two-column', 'grid', 'card', 'stepper'];
  const labelPositions: LayoutConfig['fieldLayout']['labelPosition'][] = ['top', 'left', 'right', 'floating'];
  const alignments: LayoutConfig['formLayout']['alignment'][] = ['left', 'center', 'right'];
  
  const constraints = {
    conservative: {
      types: ['single-column', 'two-column'],
      labelPositions: ['top', 'left'],
      alignments: ['center'],
      maxWidths: ['600px', '700px', '800px']
    },
    moderate: {
      types: ['single-column', 'two-column', 'grid', 'card'],
      labelPositions: ['top', 'left', 'floating'],
      alignments: ['left', 'center'],
      maxWidths: ['100%', '800px', '900px', '1000px']
    },
    creative: {
      types: layoutTypes,
      labelPositions: labelPositions,
      alignments: alignments,
      maxWidths: ['100%', '90vw', '80vw', '1200px']
    }
  };
  
  const constraint = constraints[level];
  const selectedType = constraint.types[Math.floor(Math.random() * constraint.types.length)] as LayoutConfig['type'];
  const selectedLabelPosition = constraint.labelPositions[Math.floor(Math.random() * constraint.labelPositions.length)] as LayoutConfig['fieldLayout']['labelPosition'];
  const selectedAlignment = constraint.alignments[Math.floor(Math.random() * constraint.alignments.length)] as LayoutConfig['formLayout']['alignment'];
  const selectedMaxWidth = constraint.maxWidths[Math.floor(Math.random() * constraint.maxWidths.length)];
  
  const spacingMultiplier = Math.random() * 0.5 + 0.75; // 0.75x to 1.25x
  
  return {
    id: `random-layout-${Date.now()}`,
    name: `Random ${level.charAt(0).toUpperCase() + level.slice(1)} Layout`,
    type: selectedType,
    formLayout: {
      maxWidth: selectedMaxWidth,
      padding: `${2 * spacingMultiplier}rem`,
      spacing: `${1.5 * spacingMultiplier}rem`,
      alignment: selectedAlignment
    },
    fieldLayout: {
      labelPosition: selectedLabelPosition,
      fieldSpacing: `${1 * spacingMultiplier}rem`,
      groupSpacing: `${1.5 * spacingMultiplier}rem`,
      sectionSpacing: `${2 * spacingMultiplier}rem`
    },
    responsive: {
      breakpoints: {
        mobile: '640px',
        tablet: '768px',
        desktop: '1024px'
      },
      columnsPerBreakpoint: {
        mobile: 1,
        tablet: selectedType === 'two-column' || selectedType === 'grid' ? 2 : 1,
        desktop: selectedType === 'grid' ? 3 : selectedType === 'two-column' ? 2 : 1
      }
    }
  };
};
