import { Center, CircleIcon, Tooltip, useToast, } from "native-base";
import { Alert } from "react-native";
import { PanGestureHandler, } from "react-native-gesture-handler"
import Animated, { runOnJS, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

export function DragExample(){

    const toast = useToast();

    const positionX = useSharedValue(0)
    const positionY = useSharedValue(0)

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: positionX.value },
                { translateY: positionY.value }
            ]
        }
    })

    
    const showToast = () => {
        toast.show({
            description: 'Movido com sucesso!'
        })
    }

    const onTap = useAnimatedGestureHandler({
        onStart: (_, ctx: any) => {
            ctx.positionX = positionX.value
            ctx.positionY = positionY.value
        },
        onActive: (event, ctx) => {
            positionX.value = withSpring(ctx.positionX + event.translationX)
            positionY.value = withSpring(ctx.positionY + event.translationY)
        },
        onEnd: (_) => {
            runOnJS(showToast)()
        },
    });


    return (
        <Center style={{ flex: 1, backgroundColor: '#0f1317',}}>
            <PanGestureHandler onGestureEvent={onTap}>

                <Animated.View style={[animatedStyle]}>
                    <CircleIcon color={'error.500'} size={16} />
                </Animated.View>
                    
            </PanGestureHandler>
        </Center>
    )
}