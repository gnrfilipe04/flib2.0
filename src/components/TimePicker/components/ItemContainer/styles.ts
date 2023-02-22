import styled from "styled-components/native";

interface ItemContainerProps {
    itemSize: number;
}

export const Container = styled.View<ItemContainerProps>`
    height: ${({itemSize}) => itemSize}px;
    justify-content: center;
    align-items: center;
`;