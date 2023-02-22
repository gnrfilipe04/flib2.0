import React, { Dispatch, SetStateAction, useRef, useState } from 'react';
import { KeyboardTypeOptions, Text, TextInput, TextInputProps, View } from 'react-native';

import Animated, { 
  useSharedValue, 
  useAnimatedStyle,
  withTiming
} from 'react-native-reanimated';

import {
  Container,
  Field
} from './styles';

export interface InputStylesProps {
    activeColor: string;
    disableColor: string;
    backgroundColor: string;
    fontSize: number;
    fontFamily?: string;
}

export interface FieldProps {
    name: string;
    label: string;
    value: string;
    onChangeValue: Dispatch<SetStateAction<string>>;
    inputStyle: InputStylesProps;
    type?: 'outline' | 'filled';
    keyboardType?: KeyboardTypeOptions;
    right?: JSX.Element
}

export function Input({ 
    label,
    value,
    onChangeValue,
    inputStyle,
    type = 'outline',
    keyboardType,
    right
 }: FieldProps){

  const [inputColor, setInputColor] = useState(inputStyle?.disableColor)

  const refInput = useRef<TextInput | null>(null);

  const getFocusInput = () => {
    refInput.current?.focus();
  }

  const animationY = useSharedValue(0)
  const fontSize = useSharedValue(inputStyle.fontSize)

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: withTiming(animationY.value) },
      ],
      fontSize: withTiming(fontSize.value)
    }
  })

  function handleAnimationPositon() {
    animationY.value = type === 'outline' ? -30 : -20
    fontSize.value = 14

    setInputColor(inputStyle?.activeColor)
  }

  function handleAnimationDefaultPosition() {
    animationY.value = !value ? 0 : animationY.value
    fontSize.value = !value ? inputStyle.fontSize : fontSize.value

    setInputColor(inputStyle?.disableColor)
  }

  return (
        
        <Container>
          <Field
            type={type}
            activeColor={inputColor}
            selectionColor='white'
            ref={refInput}
            value={value}
            onChangeText={onChangeValue}
            onFocus={handleAnimationPositon}
            onBlur={handleAnimationDefaultPosition}
            keyboardType={keyboardType ? keyboardType : 'default'}
          />
          <Animated.Text
          onPress={getFocusInput}
          style={[{
              color: inputColor,
              textAlign: 'center',
              position: 'absolute',
              backgroundColor: (type === 'outline') ? inputStyle?.backgroundColor : 'transparent',
              paddingHorizontal: 5,
              marginLeft: 20,
          }, animatedStyles]}>
            {label}
          </Animated.Text>

          {right && 
          <View style={{ position: 'absolute', right: 20}}>
            {right}
          </View>}

        </Container>
  );
}