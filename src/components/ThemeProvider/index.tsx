import React, { ReactChild, ReactChildren } from 'react';
import { ThemeProvider as Provider, DefaultTheme } from 'styled-components';

type ThemeProviderProps = {
  children: ReactChild | ReactChildren;
};

const theme: DefaultTheme = {
  borderRadius: '18px',
  colors: {
    main: '#151E2B',
    secondary: '#FFFFFF',
    hover: '#343A45',
    subHeading: '#999999',
  },
  fontSizes: {
    title: '18px',
    heading: '16px',
    subHeading: '14px',
    paragraph: '14px',
  },
  fontWeights: {
    title: 800,
    heading: 700,
    subHeading: 400,
    paragraph: 400,
  },
};

function ThemeProvider({ children }: ThemeProviderProps) {
  return <Provider theme={theme}>{children}</Provider>;
}

export default ThemeProvider;
