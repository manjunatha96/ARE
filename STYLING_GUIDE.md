# Unified Branding & Styling Implementation Guide

This document outlines the complete branding and styling system for the Dashboard and Rule Engine.

## Quick Start

### 1. Import Design Tokens

**In JavaScript/TypeScript:**
```typescript
import { COLORS, TYPOGRAPHY, SPACING, COMPONENTS } from '@/lib/branding-tokens';

// Usage
const buttonStyle = {
  background: COLORS.primary,
  color: COLORS.textPrimary,
  padding: SPACING.md,
};
```

**In CSS/Tailwind:**
```css
/* Use CSS variables defined in styles/design-tokens.css */
color: var(--text-primary);
background: var(--color-primary);
padding: var(--spacing-md);
```

### 2. Import CSS Tokens

Add to your main layout or component:
```typescript
import '@/styles/design-tokens.css';
```

---

## Color System

### Brand Colors
- **Primary**: `#0099FF` - Use for primary buttons, links, active states
- **Primary Light**: `#F0F9FF` - Use for active rows, hover backgrounds, highlights
- **Secondary**: `#0578BE` - Use for secondary buttons, icons, accents

### Text Colors
- **Primary Text**: `#1D1D1D` - Main body text
- **Secondary Text**: `#555555` - Sub-headings, secondary info
- **Tertiary Text**: `#777777` - Helper text, disabled text

### Background & Surface
- **App Background**: `#F4F4F4` - Page background
- **Surface Background**: `#FFFFFF` - Cards, inputs, modals
- **Border Default**: `#DCDCDC` - All borders and dividers
- **Hover Background**: `#EDEDED` - Table row hover, button hover

### Status Colors
| Status      | Foreground | Background |
|-------------|-----------|-----------|
| Success     | #13B544   | #E7F8EC   |
| Error       | #DA1E28   | #FBE8E9   |
| Information | #42A6CE   | #EBF6FA   |
| Warning     | #F7D21E   | #FDF5D1   |

**Always use light background** for alerts, banners, and inline messages.

---

## Typography

### Font Family
- **Font**: Open Sans
- **Letter Spacing**: 0px
- **Text Case**: Sentence case only

### Font Sizes & Weights

| Element                | Size | Weight | Color        |
|------------------------|------|--------|-------------|
| Page Heading (h1)      | 24px | Regular| #1D1D1D     |
| Sub Heading (h2)       | 14px | Regular| #555555     |
| Body Text              | 12px | Regular| #1D1D1D     |
| Button Text (Filled)   | 12px | Regular| White       |
| Button Label / CTA     | 12px | Semibold | #1D1D1D   |

---

## Components

### Input Fields
- **Height**: 32px - 40px
- **Border**: 1px solid #DCDCDC
- **Border Radius**: 4px
- **Background**: #FFFFFF
- **Padding**: 10px (left/right)
- **Font Size**: 12px

**Mandatory Field**: 2px solid red (#DA1E28) on the left edge

**Error State**:
- Border: #DA1E28
- Error text: 11-12px, red, below field

**Disabled State**:
- Background: #F4F4F4
- Opacity: 40%

### Buttons

#### Primary Button
```css
background: #0099FF;
color: white;
height: 32px - 40px;
border-radius: 4px;
```

#### Secondary Button
```css
background: #0578BE;
color: white;
height: 32px - 40px;
border-radius: 4px;
```

#### Text Button
```css
color: #0099FF;
background: transparent;
/* Hover: underline or subtle bg */
```

### Cards
- **Background**: #FFFFFF
- **Border**: 1px solid #EDEDED
- **Border Radius**: 6px
- **Padding**: 20px (horizontal)
- **Height**: 340px (for dashboard widgets)
- **Header Height**: 40px
- **Action Menu**: 40px width

### Header
- **Total Height**: 70px
- **Logo Section**: 210px width, 15px padding
- **Title Offset**: 30px from logo divider
- **Search Icon**: 50px width
- **Notification Icon**: 50px width
- **Profile Section**: 150px width
- **Profile Padding**: 10px (L/R), 15px (T/B)

---

## Spacing Scale

Use these consistent spacing values throughout the application:

- **XS**: 4px
- **SM**: 8px
- **MD**: 12px
- **LG**: 16px
- **XL**: 20px
- **2XL**: 24px
- **3XL**: 32px

---

## Layout Rules

### Non-Negotiable
1. **Left-aligned** layouts
2. **Strong whitespace** between elements
3. **No visual clutter**
4. **Grid-based spacing** (use spacing scale)
5. **Blue used only** for interaction & emphasis
6. **Grey dominates** base UI

### Flexbox vs Grid
- Use **Flexbox** for most layouts
- Use **Grid** for complex 2D layouts
- Never use floats or absolute positioning

---

## Data Visualization

### Qualitative Palette (Categories)
```
#0099FF, #FF8A23, #882EFF, #FFC007, #00CEEC, #FD4C4C
```

### Sequential Palette (Trends, Intensity)
- Dark blue → Light blue scale

### Diverging Palette (Positive vs Negative)
- Blue → Neutral → Orange

---

## Implementation Examples

### React Component with Branding

```typescript
import { COLORS, SPACING, TYPOGRAPHY } from '@/lib/branding-tokens';

export function MyComponent() {
  return (
    <div style={{ padding: SPACING.lg, backgroundColor: COLORS.appBg }}>
      <h1 style={TYPOGRAPHY.heading}>Dashboard</h1>
      <button style={{
        background: COLORS.primary,
        color: '#FFFFFF',
        padding: `${SPACING.md} ${SPACING.lg}`,
        borderRadius: '4px',
        border: 'none',
        cursor: 'pointer'
      }}>
        Click Me
      </button>
    </div>
  );
}
```

### Tailwind with CSS Variables

```html
<div class="p-[var(--spacing-lg)] bg-[var(--app-bg)]">
  <h1 class="text-2xl font-semibold text-[var(--text-primary)]">Dashboard</h1>
  <button class="bg-[var(--color-primary)] text-white px-[var(--spacing-lg)] py-[var(--spacing-md)] rounded">
    Click Me
  </button>
</div>
```

### Alert Messages

```html
<!-- Success Alert -->
<div class="alert-success">
  ✓ Rule approved successfully
</div>

<!-- Error Alert -->
<div class="alert-error">
  ✗ Failed to create rule
</div>

<!-- Warning Alert -->
<div class="alert-warning">
  ⚠ Rule is pending approval
</div>
```

---

## Dashboard Implementation

### Stats Cards
- **Background**: #FFFFFF
- **Border**: 1px solid #EDEDED
- **Padding**: 20px
- **Text Color**: Use TYPOGRAPHY tokens
- **Icon Color**: Use COLORS.primary

### Tables
- **Header Background**: #F4F4F4
- **Row Hover**: #EDEDED
- **Text**: COLORS.textPrimary (12px)
- **Border**: 1px solid #DCDCDC

### Charts
- Use qualitative palette for categories
- Use sequential palette for trends
- Keep aspect ratio consistent

---

## Rule Engine Implementation

### Rule Cards
- **Title**: 24px, #1D1D1D
- **Description**: 12px, #555555
- **Status Badge**: Use status colors
- **Action Buttons**: Primary/Secondary buttons

### Form Inputs
- **Label**: 14px, #555555
- **Input**: 32px height, 10px padding
- **Helper Text**: 11px, #777777
- **Error Text**: 11px, #DA1E28

### Approval Section
- **Background**: Use status color background
- **Border Left**: 2px solid status color
- **Text**: Status color

---

## Testing Checklist

- [ ] All text uses Open Sans font
- [ ] All headings are 24px regular weight
- [ ] All body text is 12px regular weight
- [ ] All buttons have proper hover states
- [ ] All inputs have proper focus states
- [ ] All alerts use correct status color backgrounds
- [ ] All spacing uses the spacing scale
- [ ] All colors match the master tokens
- [ ] No inline hex colors - use tokens only
- [ ] Responsive design tested on mobile/tablet/desktop

---

## Files Reference

- **Tokens**: `/lib/branding-tokens.ts` - JavaScript/TypeScript tokens
- **CSS**: `/styles/design-tokens.css` - CSS variables and global styles
- **This Guide**: `/STYLING_GUIDE.md` - Implementation documentation
