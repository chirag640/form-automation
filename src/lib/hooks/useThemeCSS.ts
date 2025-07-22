import { useEffect } from 'react';
import { useTheme } from '@/lib/contexts/ThemeProvider';

export const useThemeCSS = () => {
  const { getCurrentTheme, getCurrentLayout } = useTheme();

  useEffect(() => {
    const theme = getCurrentTheme();
    const layout = getCurrentLayout();
    
    // Apply theme CSS variables to the root element
    const root = document.documentElement;
    
    // Color variables
    root.style.setProperty('--theme-primary', theme.colors.primary);
    root.style.setProperty('--theme-secondary', theme.colors.secondary);
    root.style.setProperty('--theme-background', theme.colors.background);
    root.style.setProperty('--theme-surface', theme.colors.surface);
    root.style.setProperty('--theme-text-primary', theme.colors.text.primary);
    root.style.setProperty('--theme-text-secondary', theme.colors.text.secondary);
    root.style.setProperty('--theme-text-muted', theme.colors.text.muted);
    root.style.setProperty('--theme-border', theme.colors.border);
    root.style.setProperty('--theme-error', theme.colors.error);
    root.style.setProperty('--theme-success', theme.colors.success);
    root.style.setProperty('--theme-warning', theme.colors.warning);
    root.style.setProperty('--theme-info', theme.colors.info);
    
    // Typography variables
    root.style.setProperty('--theme-font-family', theme.typography.fontFamily);
    root.style.setProperty('--theme-heading-font-size', theme.typography.headings.fontSize);
    root.style.setProperty('--theme-heading-font-weight', theme.typography.headings.fontWeight);
    root.style.setProperty('--theme-heading-letter-spacing', theme.typography.headings.letterSpacing);
    root.style.setProperty('--theme-body-font-size', theme.typography.body.fontSize);
    root.style.setProperty('--theme-body-font-weight', theme.typography.body.fontWeight);
    root.style.setProperty('--theme-body-line-height', theme.typography.body.lineHeight);
    root.style.setProperty('--theme-input-font-size', theme.typography.input.fontSize);
    root.style.setProperty('--theme-input-font-weight', theme.typography.input.fontWeight);
    
    // Spacing variables
    root.style.setProperty('--theme-spacing-xs', theme.spacing.xs);
    root.style.setProperty('--theme-spacing-sm', theme.spacing.sm);
    root.style.setProperty('--theme-spacing-md', theme.spacing.md);
    root.style.setProperty('--theme-spacing-lg', theme.spacing.lg);
    root.style.setProperty('--theme-spacing-xl', theme.spacing.xl);
    
    // Border radius variables
    root.style.setProperty('--theme-radius-sm', theme.borderRadius.sm);
    root.style.setProperty('--theme-radius-md', theme.borderRadius.md);
    root.style.setProperty('--theme-radius-lg', theme.borderRadius.lg);
    root.style.setProperty('--theme-radius-full', theme.borderRadius.full);
    
    // Shadow variables
    root.style.setProperty('--theme-shadow-sm', theme.shadows.sm);
    root.style.setProperty('--theme-shadow-md', theme.shadows.md);
    root.style.setProperty('--theme-shadow-lg', theme.shadows.lg);
    root.style.setProperty('--theme-shadow-xl', theme.shadows.xl);
    
    // Layout variables
    root.style.setProperty('--layout-max-width', layout.formLayout.maxWidth);
    root.style.setProperty('--layout-padding', layout.formLayout.padding);
    root.style.setProperty('--layout-spacing', layout.formLayout.spacing);
    root.style.setProperty('--layout-field-spacing', layout.fieldLayout.fieldSpacing);
    root.style.setProperty('--layout-group-spacing', layout.fieldLayout.groupSpacing);
    root.style.setProperty('--layout-section-spacing', layout.fieldLayout.sectionSpacing);
    
    // Layout type classes
    root.classList.remove('layout-single-column', 'layout-two-column', 'layout-grid', 'layout-card', 'layout-stepper');
    root.classList.add(`layout-${layout.type}`);
    
    // Label position classes
    root.classList.remove('label-top', 'label-left', 'label-right', 'label-floating');
    root.classList.add(`label-${layout.fieldLayout.labelPosition}`);
    
    // Form alignment classes
    root.classList.remove('form-align-left', 'form-align-center', 'form-align-right');
    root.classList.add(`form-align-${layout.formLayout.alignment}`);
    
    // Theme type classes
    root.classList.remove('theme-light', 'theme-dark', 'theme-custom');
    root.classList.add(`theme-${theme.type}`);
    
  }, [getCurrentTheme, getCurrentLayout]);
};

export const getThemeStyles = (theme: unknown, layout: unknown) => {
  const themeObj = theme as { 
    colors: { 
      primary: string; 
      secondary: string; 
      background: string; 
      surface: string; 
      text?: { primary?: string; secondary?: string; muted?: string }; 
      border: string; 
      error: string; 
      success: string; 
      warning: string; 
      info: string; 
    };
    typography?: {
      fontFamily?: string;
      headings?: { fontSize?: string; fontWeight?: string; letterSpacing?: string };
      body?: { fontSize?: string; fontWeight?: string; lineHeight?: string };
      input?: { fontSize?: string; fontWeight?: string };
    };
    spacing?: { xs?: string; sm?: string; md?: string; lg?: string; xl?: string };
    borderRadius?: { sm?: string; md?: string; lg?: string; full?: string };
    shadows?: { sm?: string; md?: string; lg?: string; xl?: string };
  };
  
  const layoutObj = layout as {
    formLayout?: { maxWidth?: string; padding?: string; spacing?: string };
    fieldLayout?: { fieldSpacing?: string; groupSpacing?: string; sectionSpacing?: string };
  };
  
  return {
    '--theme-primary': themeObj.colors.primary,
    '--theme-secondary': themeObj.colors.secondary,
    '--theme-background': themeObj.colors.background,
    '--theme-surface': themeObj.colors.surface,
    '--theme-text-primary': themeObj.colors.text?.primary,
    '--theme-text-secondary': themeObj.colors.text?.secondary,
    '--theme-text-muted': themeObj.colors.text?.muted,
    '--theme-border': themeObj.colors.border,
    '--theme-error': themeObj.colors.error,
    '--theme-success': themeObj.colors.success,
    '--theme-warning': themeObj.colors.warning,
    '--theme-info': themeObj.colors.info,
    '--theme-font-family': themeObj.typography?.fontFamily,
    '--theme-heading-font-size': themeObj.typography?.headings?.fontSize,
    '--theme-heading-font-weight': themeObj.typography?.headings?.fontWeight,
    '--theme-heading-letter-spacing': themeObj.typography?.headings?.letterSpacing,
    '--theme-body-font-size': themeObj.typography?.body?.fontSize,
    '--theme-body-font-weight': themeObj.typography?.body?.fontWeight,
    '--theme-body-line-height': themeObj.typography?.body?.lineHeight,
    '--theme-input-font-size': themeObj.typography?.input?.fontSize,
    '--theme-input-font-weight': themeObj.typography?.input?.fontWeight,
    '--theme-spacing-xs': themeObj.spacing?.xs,
    '--theme-spacing-sm': themeObj.spacing?.sm,
    '--theme-spacing-md': themeObj.spacing?.md,
    '--theme-spacing-lg': themeObj.spacing?.lg,
    '--theme-spacing-xl': themeObj.spacing?.xl,
    '--theme-radius-sm': themeObj.borderRadius?.sm,
    '--theme-radius-md': themeObj.borderRadius?.md,
    '--theme-radius-lg': themeObj.borderRadius?.lg,
    '--theme-radius-full': themeObj.borderRadius?.full,
    '--theme-shadow-sm': themeObj.shadows?.sm,
    '--theme-shadow-md': themeObj.shadows?.md,
    '--theme-shadow-lg': themeObj.shadows?.lg,
    '--theme-shadow-xl': themeObj.shadows?.xl,
    '--layout-max-width': layoutObj.formLayout?.maxWidth,
    '--layout-padding': layoutObj.formLayout?.padding,
    '--layout-spacing': layoutObj.formLayout?.spacing,
    '--layout-field-spacing': layoutObj.fieldLayout?.fieldSpacing,
    '--layout-group-spacing': layoutObj.fieldLayout?.groupSpacing,
    '--layout-section-spacing': layoutObj.fieldLayout?.sectionSpacing,
  } as React.CSSProperties;
};
