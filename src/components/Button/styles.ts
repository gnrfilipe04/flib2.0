import { StyleProp, TouchableOpacityProps, ViewStyle } from "react-native";
import styled from "styled-components/native"

interface ContainerProps {
    bgColor: string;
}

interface TitleProps {
    color: string;

}

export const Container = styled.TouchableOpacity<ContainerProps>`
    background-color: ${({bgColor}) => bgColor};
`;

export const Title = styled.Text<TitleProps>`
    color: ${({color}) => color};
`;