import styled from 'styled-components';

type PageItemProps = {
    isSelected: boolean;
}

export const Container = styled.div`
    max-width: 598px;
    display: flex;
    width: 90%;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin: 24px;
`;

export const PageItem = styled.div<PageItemProps>`
    padding: 12px;
    background-color: ${props => props.isSelected ? props.theme.colors.hover : props.theme.colors.main};
    border: 1px solid ${props => props.theme.colors.subHeading};
    color: ${props => props.theme.colors.secondary};
    cursor: pointer;

    &:hover {
        background-color: ${props => props.theme.colors.hover}
    }
`;
