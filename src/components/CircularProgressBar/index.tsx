import { useEffect } from 'react';
import { ColorValue, StyleSheet, TextInput, View, TextInputProps } from 'react-native';
import Svg, { Circle, G, } from 'react-native-svg';
import Animated, { AnimateProps, Easing, useAnimatedProps, useSharedValue, withDelay, withTiming } from 'react-native-reanimated'

const AnimatedCircle = Animated.createAnimatedComponent(Circle)
const AnimatedSvg = Animated.createAnimatedComponent(Svg)
const AnimationG = Animated.createAnimatedComponent(G)
const AnimationInput = Animated.createAnimatedComponent(TextInput)
const AnimatedView = Animated.createAnimatedComponent(View)

interface CircularProgressBarProps {
    percentage?: number
    radius?: number
    strokeWidth?: number
    duration?: number
    color?: ColorValue
    delay?: number
    textColor?: string 
    max?: number
    isPercent?: boolean
}


export function CircularProgressBar({
    percentage=75,
    radius=80,
    strokeWidth=20,
    duration=1000,
    color='tomato',
    delay=0,
    textColor, 
    max=100,
    isPercent=true
}: CircularProgressBarProps) {

    const halfCircle = radius + strokeWidth

    const circleCircunference = useSharedValue(2 * Math.PI * radius)
    const initialStrokeDashoffset = useSharedValue(circleCircunference.value)
    const label = useSharedValue(0)

    const maxPerc = (100 * percentage) / max
    const strokeDashoffset = circleCircunference.value - (circleCircunference.value * maxPerc) / 100

    const progressCircle = useAnimatedProps(() => {
        return {
            strokeDashoffset: initialStrokeDashoffset.value
        }
    })

    const textInputAnimatedProps = useAnimatedProps(() => {
        return {
            text: `${Math.round(label.value)}${isPercent ? '%' : ''}`
        }
    })

    const changeProgressBarValue = () => {
        initialStrokeDashoffset.value = withDelay(delay, withTiming(strokeDashoffset, {
            duration,
            easing: Easing.ease
        }))
    }

    const changeLabelValue = () => {
        label.value = withDelay(delay, withTiming(percentage, {
            duration,
            easing: Easing.ease
        }))
    }

    const updateProgressBar = () => {
        changeProgressBarValue()
        changeLabelValue()
    }

    useEffect(() => {
        updateProgressBar()
    }, [])

    return (
        <AnimatedView>
            <AnimatedSvg 
                width={radius * 2} 
                height={radius * 2} 
                viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}
            >
                <AnimationG rotation='-90' origin={`${halfCircle}, ${halfCircle}`}>
                    <AnimatedCircle 
                        cx={'50%'}
                        cy={'50%'}
                        stroke={color}
                        strokeWidth={strokeWidth}
                        r={radius}
                        fill={'transparent'}
                        strokeOpacity={0.2}
                    />
                    <AnimatedCircle
                        animatedProps={progressCircle}
                        cx={'50%'}
                        cy={'50%'}
                        stroke={color}
                        strokeWidth={strokeWidth}
                        r={radius}
                        fill={'transparent'}
                        strokeDasharray={circleCircunference.value}
                        strokeLinecap={'round'}
                    />
                </AnimationG>
            </AnimatedSvg>
            <AnimationInput
                animatedProps={textInputAnimatedProps as Partial<AnimateProps<TextInputProps>>} 
                underlineColorAndroid={'transparent'}
                editable={false}
                style={[
                    StyleSheet.absoluteFillObject,
                    { 
                        fontSize: radius / 2, 
                        color: textColor ?? color,
                        fontWeight: '900',
                        textAlign: 'center'
                    },
                    
                ]}
            />
        </AnimatedView>
    );
}