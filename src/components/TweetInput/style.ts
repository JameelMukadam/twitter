import styled from 'styled-components';

export const Container = styled.div`
    max-width: 598px;
    display: flex;
    width: 100%;
    flex-wrap: wrap;
`;

export const Input = styled.input`
    padding: 1.5em;
    margin: 0.5em;
    width: 100%;
    color: ${props => props.theme.colors.secondary || "white"};
    background: ${props => props.theme.colors.main};
    font-size: ${props => props.theme.fontSizes.subHeading};
    font-weight: ${props => props.theme.fontWeights.heading};
    border: 1px solid ${props => props.theme.colors.subHeading};
    border-radius: 3px;

    ::placeholder {
        color: ${props => props.theme.colors.subHeading}
    }
`;

export const Button = styled.button`
    border-radius: ${props => props.theme.borderRadius};
    background-color: #1DA1F2;
    color: white;
    border: none;
    cursor: pointer;
    padding: 16px;

    &:hover {
        background-color: #0096F2;
    }
`;
