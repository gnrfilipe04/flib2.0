import styled from 'styled-components/native';

interface ContainerProps {
    maxHeight: number
}

export const Container = styled.View<ContainerProps>`
    flex: 1;
    max-height: ${({maxHeight}) => maxHeight}px;
    flex-direction: row;
    align-items: center;
`;

export const Separate = styled.Text`
    color: white;
    font-size:28px;
    padding: 0 10px 3px 10px;
`;

export const ButtonContainer = styled.View`
    flex-direction: row;
    margin-top: 40px;
    width: 150px;
    justify-content: space-between;
    align-items: center;
`;