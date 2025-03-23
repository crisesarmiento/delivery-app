import { createTheme, MantineTheme } from '@mantine/core';

export const theme = createTheme({
  colors: {
    primary: [
      '#FFECEE',
      '#FFD8DB',
      '#FFBDC1',
      '#FF9EA3',
      '#FF7C83',
      '#FF5A5F',
      '#CC484C',
      '#993639',
      '#662426',
      '#331213',
    ],
    secondary: [
      '#E6F9F7',
      '#CCF2EF',
      '#99E5DF',
      '#66D9CF',
      '#33CCBF',
      '#00A699',
      '#00857A',
      '#00645C',
      '#00423D',
      '#00211F',
    ],
    accent: [
      '#FFEEEC',
      '#FFDCD8',
      '#FFB9B0',
      '#FF9689',
      '#FF7D61',
      '#FC642D',
      '#CA5024',
      '#973C1B',
      '#652813',
      '#32140A',
    ],
    success: [
      '#E6F9F4',
      '#CCF2E9',
      '#99E5D2',
      '#66D9BC',
      '#33CCA6',
      '#00B797',
      '#009279',
      '#006E5B',
      '#00493C',
      '#00251E',
    ],
    warning: [
      '#FFF9E6',
      '#FFF3CC',
      '#FFE699',
      '#FFDA66',
      '#FFCE33',
      '#FFBD00',
      '#CC9700',
      '#997100',
      '#664B00',
      '#332600',
    ],
    error: [
      '#FFECEF',
      '#FFD8DE',
      '#FFB0BD',
      '#FF899D',
      '#FF617C',
      '#FF385C',
      '#CC2D49',
      '#992137',
      '#661624',
      '#330B12',
    ],
    neutral: [
      '#FFFFFF',
      '#F7F7F7',
      '#E5E5E5',
      '#CCCCCC',
      '#999999',
      '#666666',
      '#333333',
      '#222222',
      '#111111',
      '#000000',
    ],
  },
  primaryColor: 'primary',
  fontFamily: 'Roboto, sans-serif',
  headings: {
    fontFamily: 'Roboto, sans-serif',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
  },
  components: {
    Button: {
      styles: (theme: MantineTheme) => ({
        root: {
          '&[dataVariant="primary"]': {
            backgroundColor: theme.colors.primary[5],
            '&:hover': {
              backgroundColor: theme.colors.primary[6],
            },
          },
          '&[dataVariant="secondary"]': {
            backgroundColor: theme.colors.secondary[5],
            '&:hover': {
              backgroundColor: theme.colors.secondary[6],
            },
          },
          '&[dataVariant="outline"]': {
            borderColor: theme.colors.primary[5],
            color: theme.colors.primary[5],
            '&:hover': {
              backgroundColor: theme.colors.primary[0],
            },
          },
          '&[dataVariant="ghost"]': {
            color: theme.colors.primary[5],
            '&:hover': {
              backgroundColor: theme.colors.primary[0],
            },
          },
        },
      }),
    },
    Card: {
      styles: (theme: MantineTheme) => ({
        root: {
          '&[dataVariant="filled"]': {
            backgroundColor: theme.colors.neutral[1],
          },
          '&[dataVariant="outline"]': {
            borderColor: theme.colors.neutral[2],
          },
          '&[dataVariant="elevated"]': {
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          },
        },
      }),
    },
    Text: {
      styles: (theme: MantineTheme) => ({
        root: {
          '&[dataVariant="heading"]': {
            fontWeight: 700,
          },
          '&[dataVariant="body"]': {
            fontSize: theme.fontSizes.md,
          },
          '&[dataVariant="caption"]': {
            fontSize: theme.fontSizes.xs,
            color: theme.colors.neutral[4],
          },
          '&[dataVariant="highlight"]': {
            color: theme.colors.primary[5],
            fontWeight: 500,
          },
        },
      }),
    },
  },
});
