import { useState } from 'react'
import { Center, CircleIcon, Tooltip, useToast, View, } from "native-base";
import { PanGestureHandler, } from "react-native-gesture-handler"
import Animated, { runOnJS, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { CircleDTO } from "../dtos/CircleDTO";
import { areEqualsCirclesOverlapping } from "../utils/areEqualsCirclesOverlapping";

export function DragAndDropExample(){

    const [ isOverlapping, setIsOverlapping ] = useState(false)

    const toast = useToast();

    const positionX = useSharedValue(170)
    const positionY = useSharedValue(650)

    const recipientPositionX = useSharedValue(160)
    const recipientPositionY = useSharedValue(100)

    const color = useSharedValue('#34ebc9')
    const recipientColor = useSharedValue('#c5f5ec')

    const circleDiameter = 80
    const circleRadius = circleDiameter / 2

    const recipientDiameter = 90
    const recipientRadius = recipientDiameter / 2

    const circleStyle = useAnimatedStyle(() => {
        return {
            backgroundColor: color.value,
            width: circleDiameter,
            height: circleDiameter,
            borderRadius: circleRadius,
            position: 'absolute',
            transform: [
                { translateX: positionX.value },
                { translateY: positionY.value }
            ]
        }
    })

    const recipientStyle = useAnimatedStyle(() => {
        return {
            borderWidth: 5,
            borderColor: recipientColor.value,
            width: recipientDiameter,
            height: recipientDiameter,
            borderRadius: recipientRadius,
            transform: [
                { translateX: recipientPositionX.value },
                { translateY: recipientPositionY.value }
            ]
        }
    })
    
    const showToast = () => {
        toast.show({
            description: 'Movido com sucesso!'
        })
    }

    const handleOverlapping = (recipient: CircleDTO, circle: CircleDTO, circleDiameterOrRadius: number) => {
        const areOverlapping = areEqualsCirclesOverlapping(recipient, circle, circleRadius)

        if(areOverlapping){
            positionX.value = withSpring(recipientPositionX.value + 5)
            positionY.value = withSpring(recipientPositionY.value + 5)
        }else {
            positionX.value = withSpring(0)
            positionY.value = withSpring(0)
        }

    }

    const changeColorRecipient = (recipient: CircleDTO, circle: CircleDTO, circleDiameterOrRadius: number) => {
        const areOverlapping = areEqualsCirclesOverlapping(recipient, circle, circleRadius)

        if(areOverlapping){
            recipientColor.value = '#34aeeb'
        }else {
            recipientColor.value = '#c5f5ec'
        }
    }

    const onTap = useAnimatedGestureHandler({
        onStart: (_, ctx: any) => {
            ctx.positionX = positionX.value
            ctx.positionY = positionY.value
        },
        onActive: (event, ctx) => {

            const circle: CircleDTO = { x: positionX.value, y: positionY.value }
            const recipient: CircleDTO = { x: recipientPositionX.value, y: recipientPositionY.value }
            
            runOnJS(changeColorRecipient)(recipient, circle, circleRadius)

            positionX.value = withSpring(ctx.positionX + event.translationX)
            positionY.value = withSpring(ctx.positionY + event.translationY)
        },
        onEnd: (event, ctx) => {

            positionX.value = withSpring(recipientPositionX.value + 5)
            positionY.value = withSpring(recipientPositionY.value + 5)
            //runOnJS(showToast)()
        },
    });

    return (
        <View flex={1} bgColor={'#0f1317'}>
            <Animated.View 
                style={[recipientStyle]}
            />
            <PanGestureHandler onGestureEvent={onTap}>

                <Animated.View style={[circleStyle]} />
                    
            </PanGestureHandler>
        </View>
    )
}