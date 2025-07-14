# Theme + Layout Auto Generator (Future Feature)

## Overview
This feature adds a comprehensive Theme + Layout Auto Generator to the form builder application, allowing users to automatically generate and customize themes and layouts using React Context API for state management.

## Features Implemented

### 1. Theme Management
- **Theme Provider**: Context-based state management for themes and layouts
- **Theme Types**: Support for light, dark, and custom themes
- **Color Schemes**: Primary, secondary, background, surface, text, border, and status colors
- **Typography**: Font family, sizes, weights, and spacing controls
- **Spacing & Borders**: Configurable spacing scales and border radius
- **Shadows**: Multiple shadow levels for depth and elevation

### 2. Layout Management
- **Layout Types**: 
  - Single Column (default)
  - Two Column
  - Grid Layout
  - Card Layout
  - Stepper Layout
- **Field Positioning**: Top, left, right, and floating label positions
- **Responsive Design**: Breakpoint-based column configuration
- **Form Alignment**: Left, center, and right alignment options

### 3. Auto Generation Features
- **Random Theme Generator**: Creates themes based on randomization level
- **Random Layout Generator**: Generates layouts with different configurations
- **Theme Presets**: Pre-built theme and layout combinations
- **Smart Suggestions**: Foundation for AI-based theme recommendations

### 4. User Interface
- **Theme Generator Modal**: Tabbed interface for themes, layouts, presets, and settings
- **Live Preview**: Real-time preview of changes before applying
- **Custom Theme Saving**: Save and reuse custom themes and layouts
- **History Management**: Undo/redo functionality for theme changes

### 5. Persistence
- **Local Storage**: Automatic saving of user preferences
- **Settings Management**: Configurable auto-apply, preview mode, and persistence
- **Theme History**: Track and restore previous theme configurations

## File Structure

```
src/
├── lib/
│   ├── contexts/
│   │   └── ThemeProvider.tsx          # Main theme context provider
│   ├── hooks/
│   │   └── useThemeCSS.ts             # CSS variables hook
│   ├── types/
│   │   └── theme-config.ts            # Theme and layout type definitions
│   └── utils/
│       └── theme-defaults.ts          # Default themes and utilities
├── components/
│   └── theme-generator/
│       └── ThemeGenerator.tsx         # Main theme generator UI
└── styles/
    └── theme-generator.css            # Theme-aware CSS styles
```

## Usage

### 1. Basic Setup
The ThemeProvider is already integrated into the app layout:

```tsx
import { ThemeProvider } from '@/lib/contexts/ThemeProvider';

function App() {
  return (
    <ThemeProvider>
      <YourApp />
    </ThemeProvider>
  );
}
```

### 2. Using the Theme Generator
Access the theme generator through the form builder toolbar:

```tsx
import { ThemeGenerator } from '@/components/theme-generator/ThemeGenerator';

// In your component
<ThemeGenerator 
  isOpen={isOpen} 
  onClose={() => setIsOpen(false)} 
/>
```

### 3. Applying Themes in Components
Use the theme context in your components:

```tsx
import { useTheme } from '@/lib/contexts/ThemeProvider';
import { useThemeCSS } from '@/lib/hooks/useThemeCSS';

function MyComponent() {
  const { getCurrentTheme, getCurrentLayout } = useTheme();
  useThemeCSS(); // Apply CSS variables
  
  const theme = getCurrentTheme();
  const layout = getCurrentLayout();
  
  return (
    <div className="theme-generator-form">
      {/* Your themed content */}
    </div>
  );
}
```

## Configuration

### Theme Configuration
```typescript
interface ThemeConfig {
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
    fontFamily: string;
    headings: { fontSize: string; fontWeight: string; letterSpacing: string; };
    body: { fontSize: string; fontWeight: string; lineHeight: string; };
    input: { fontSize: string; fontWeight: string; };
  };
  spacing: { xs: string; sm: string; md: string; lg: string; xl: string; };
  borderRadius: { sm: string; md: string; lg: string; full: string; };
  shadows: { sm: string; md: string; lg: string; xl: string; };
}
```

### Layout Configuration
```typescript
interface LayoutConfig {
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
    breakpoints: { mobile: string; tablet: string; desktop: string; };
    columnsPerBreakpoint: { mobile: number; tablet: number; desktop: number; };
  };
}
```

## CSS Variables

The theme system uses CSS variables for dynamic styling:

```css
:root {
  --theme-primary: #3b82f6;
  --theme-secondary: #64748b;
  --theme-background: #ffffff;
  --theme-surface: #f8fafc;
  --theme-text-primary: #1e293b;
  --theme-text-secondary: #475569;
  --theme-text-muted: #94a3b8;
  --theme-border: #e2e8f0;
  /* ... and many more */
}
```

## Future Enhancements

### 1. AI-Powered Suggestions
- Content-based theme recommendations
- User behavior analysis for layout suggestions
- Smart color palette generation
- Industry-specific theme templates

### 2. Advanced Customization
- Custom CSS injection
- Advanced typography controls
- Animation and transition settings
- Accessibility theme variants

### 3. Import/Export
- Theme sharing between projects
- JSON import/export functionality
- Theme marketplace integration
- Version control for themes

### 4. Performance Optimizations
- Theme caching and lazy loading
- CSS-in-JS optimization
- Bundle size reduction
- Runtime performance improvements

## Development Notes

### Adding New Themes
1. Create theme configuration in `theme-defaults.ts`
2. Add to the presets array
3. Update CSS variables if needed
4. Test across all layout types

### Adding New Layouts
1. Define layout configuration
2. Add CSS classes for layout type
3. Update responsive breakpoints
4. Test with various field types

### Extending the Generator
1. Add new generation algorithms in `theme-defaults.ts`
2. Update the UI in `ThemeGenerator.tsx`
3. Add new state management actions
4. Include persistence support

## Testing

### Manual Testing Checklist
- [ ] Theme switching works correctly
- [ ] Layout changes apply immediately
- [ ] Preview mode functions properly
- [ ] Settings persist across sessions
- [ ] Random generation produces valid themes
- [ ] Custom themes save and load correctly
- [ ] All layout types render properly
- [ ] Responsive behavior works on all screen sizes
- [ ] Dark mode theme displays correctly
- [ ] Accessibility features function as expected

### Browser Compatibility
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Accessibility

The theme generator includes accessibility features:
- High contrast mode support
- Reduced motion preferences
- Focus indicators
- Screen reader compatibility
- Keyboard navigation support

## Performance Considerations

- CSS variables provide efficient theme switching
- Local storage prevents unnecessary re-renders
- Debounced updates for smooth interactions
- Lazy loading for theme presets
- Optimized context provider updates

## Support

For issues or feature requests related to the Theme + Layout Auto Generator:
1. Check the console for error messages
2. Verify theme configuration syntax
3. Test with default themes first
4. Review CSS variable application
5. Check browser compatibility
