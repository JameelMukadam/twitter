import styled from 'styled-components';

export const Background = styled.div`
    background: ${props => props.theme.colors.main};
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
    min-height: 100vh;
    color: ${props => props.theme.colors.secondary};
`;
