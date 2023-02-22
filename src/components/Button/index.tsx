import { TouchableOpacity, TouchableOpacityProps } from "react-native";

interface ButtonProps extends TouchableOpacityProps {
    title: string;
    bgColor: string;
    textColor: string;
}

import {
    Container,
    Title
} from './styles'

export function Button({
    title,
    bgColor,
    textColor,
    ...props
}: ButtonProps): JSX.Element {
    return (
        <Container bgColor={bgColor} {...props}>
            <Title color={textColor}>
                {title}
            </Title>
        </Container>
    )
}