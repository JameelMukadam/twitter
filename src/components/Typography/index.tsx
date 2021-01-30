import styled from 'styled-components';

export const H1 = styled.h1`
  color: ${(props) => props.theme.colors.secondary};
  font-size: ${(props) => props.theme.fontSizes.title};
  font-weight: ${(props) => props.theme.fontWeights.title};
  margin: 4px;
`;

export const H2 = styled.h2`
  color: ${(props) => props.theme.colors.secondary};
  font-size: ${(props) => props.theme.fontSizes.heading};
  font-weight: ${(props) => props.theme.fontWeights.heading};
  margin: 4px;
`;

export const H3 = styled.h2`
  color: ${(props) => props.theme.colors.secondary};
  font-size: ${(props) => props.theme.fontSizes.subHeading};
  font-weight: ${(props) => props.theme.fontWeights.subHeading};
  margin: 4px;
`;

export const Paragraph = styled.p`
  color: ${(props) => props.theme.colors.secondary};
  font-size: ${(props) => props.theme.fontSizes.paragraph};
  font-weight: ${(props) => props.theme.fontWeights.paragraph};
  margin: 4px;
`;

export const ErrorText = styled.span`
  color: red;
  font-size: ${(props) => props.theme.fontSizes.subHeading};
  font-weight: ${(props) => props.theme.fontWeights.subHeading};
  margin: 4px;
`;
