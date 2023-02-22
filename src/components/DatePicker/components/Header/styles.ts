import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper'

export const Container = styled.View`
    background-color: #cc3764;
    padding: ${getStatusBarHeight() + 20}px 10px 10px 10px;
    height: 25%;
    justify-content: space-between;
`;

export const Top = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;

export const Save = styled.Text`
    color: white;
    font-weight: 600;
    font-size: 16px;
    text-transform: uppercase;
`;

export const Bottom = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
`;

export const SelectDate = styled.View`

`;

export const SelectDateTitle = styled.Text`
    color: white;
    font-weight: 400;
    font-size: 10px;
    text-transform: uppercase;
`;
export const SelectDateValue = styled.Text`
    color: white;
    font-weight: bold;
    font-size: 20px;
`;