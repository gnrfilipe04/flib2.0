import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    position: relative;
`;

export const Input = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
`;

export const SelectValue = styled.Text`
    color: gray;
    font-weight: 400;
    font-size: 16px;
    padding: 5px 10px 5px 5px;
`;

export const ContainerList = styled.View`
    height: 200px;
    background-color: white;
    position: absolute;
    top: 30px;
    z-index: 998;
    padding: 10px;
    border-width: 1px;
    border-color: silver;
    border-radius: 4px;
    margin: 0 5px;
`;

export const ListItem = styled.Text`
    font-size: 16px;
    color: black;
    font-weight: 600;
`;

export const ListItemContainer = styled.TouchableOpacity`
    justify-content: space-between;
    flex-direction: row;
    width: 150px;
    padding: 10px 0;
    margin-bottom: 5px;
`;

