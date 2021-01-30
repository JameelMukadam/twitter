import styled from 'styled-components';

export const Container = styled.div`
    max-width: 598px;
    display: flex;
    width: 100%;
    border: 1px solid ${props => props.theme.colors.hover};
`;

export const Avatar = styled.div`
    width: 49px;
    height: 49px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 100%;
    background-color: ${props => props.theme.colors.hover};
    margin-top: 12px;
    margin-left: 12px;
`;

export const Content = styled.div`
    margin-left: 8px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 100%;
    padding: 8px;
`;
