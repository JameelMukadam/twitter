// import original module declarations
import 'styled-components';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    borderRadius: string;

    colors: {
      main: string;
      secondary: string;
      hover: string;
    };

    fontSizes: {
      title: string;
      heading: string;
      subHeading: string;
      paragraph: string;
    }

    fontWeights: {
      title: number;
      heading: number;
      subHeading: number;
      paragraph: number;
    }
  }
}
