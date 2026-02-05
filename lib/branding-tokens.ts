/**
 * Unified Branding & Design Tokens
 * Source of truth for all color, typography, and spacing values
 */

// Color Tokens - Primary
export const COLORS = {
  // Brand Colors
  primary: '#0099FF',
  primaryLight: '#F0F9FF',
  secondary: '#0578BE',

  // Text Colors
  textPrimary: '#1D1D1D',
  textSecondary: '#555555',
  textTertiary: '#777777',

  // Border & Surface
  borderDefault: '#DCDCDC',
  hoverBg: '#EDEDED',
  appBg: '#F4F4F4',
  surfaceBg: '#FFFFFF',

  // Status Colors with Backgrounds
  success: '#13B544',
  successBg: '#E7F8EC',
  error: '#DA1E28',
  errorBg: '#FBE8E9',
  information: '#42A6CE',
  informationBg: '#EBF6FA',
  warning: '#F7D21E',
  warningBg: '#FDF5D1',
};

// Typography
export const TYPOGRAPHY = {
  fontFamily: "'Open Sans', sans-serif",
  letterSpacing: '0px',
  
  // Font Sizes & Weights
  heading: {
    fontSize: '24px',
    fontWeight: '400', // or '700' for bold
    color: COLORS.textPrimary,
  },
  subHeading: {
    fontSize: '14px',
    fontWeight: '400',
    color: COLORS.textSecondary,
  },
  body: {
    fontSize: '12px',
    fontWeight: '400',
    color: COLORS.textPrimary,
  },
  buttonFilled: {
    fontSize: '12px',
    fontWeight: '400',
    color: '#FFFFFF',
  },
  buttonLabel: {
    fontSize: '12px',
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
};

// Spacing Scale
export const SPACING = {
  xs: '4px',
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '20px',
  '2xl': '24px',
  '3xl': '32px',
};

// Components
export const COMPONENTS = {
  // Input Container
  input: {
    height: '32px',
    borderRadius: '4px',
    border: `1px solid ${COLORS.borderDefault}`,
    background: COLORS.surfaceBg,
    padding: '10px',
  },

  // Button
  button: {
    primary: {
      background: COLORS.primary,
      color: '#FFFFFF',
      height: '32px',
      borderRadius: '4px',
    },
    secondary: {
      background: COLORS.secondary,
      color: '#FFFFFF',
      height: '32px',
      borderRadius: '4px',
    },
  },

  // Card
  card: {
    background: COLORS.surfaceBg,
    border: `1px solid #EDEDED`,
    borderRadius: '6px',
    padding: '20px',
    height: '340px',
    headerHeight: '40px',
    actionMenuWidth: '40px',
    legendSpacing: '15px',
    bottomPadding: '10px',
  },

  // Header
  header: {
    height: '70px',
    logoWidth: '210px',
    logoPadding: '15px',
    titleOffset: '30px',
    searchIconWidth: '50px',
    notificationIconWidth: '50px',
    profileWidth: '150px',
    profilePadding: '10px 15px',
  },
};

// Breakpoints
export const BREAKPOINTS = {
  mobile: '320px',
  tablet: '768px',
  desktop: '1024px',
  wide: '1280px',
};
