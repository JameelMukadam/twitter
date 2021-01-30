import styled from 'styled-components';

export const H1 = styled.h1`
  color: ${(props) => props.theme.colors.secondary};
  font-size: ${(props) => props.theme.fontSizes.title}
  font-weight: ${(props) => props.theme.fontWeights.title}
`;

export const H2 = styled.h2`
  color: ${(props) => props.theme.colors.secondary};
  font-size: ${(props) => props.theme.fontSizes.subHeading}
  font-weight: ${(props) => props.theme.fontWeights.subHeading}
`;

export const Paragraph = styled.p`
  color: ${(props) => props.theme.colors.secondary};
  font-size: ${(props) => props.theme.fontSizes.paragraph}
  font-weight: ${(props) => props.theme.fontWeights.paragraph}
`;

export const ErrorText = styled.span`
  color: red;
  font-size: ${(props) => props.theme.fontSizes.subHeading}
  font-weight: ${(props) => props.theme.fontWeights.subHeading}
`;
