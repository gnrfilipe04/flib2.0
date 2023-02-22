import { useEffect, useState } from "react";
import { runOnJS } from 'react-native-reanimated'
import { View, } from "native-base";
import { Gesture , GestureDetector, } from 'react-native-gesture-handler'
import Animated from 'react-native-reanimated';
import { ColorType } from "native-base/lib/typescript/components/types";
import { areEqualsCirclesOverlapping } from "../utils/areEqualsCirclesOverlapping";

export function AddPointerExample(){

    const color = 'error.500'

    const [ pointers, setPointers ] = useState<{x: number, y: number, color: ColorType }[]>([])

    const circleDiameter = 80
    const circleRadius = circleDiameter / 2

    const tap = Gesture.Tap().onStart((event) => {
        const newPointer = { x: event.x - circleRadius, y: event.y - circleRadius, color}

        runOnJS(setPointers)([...pointers, newPointer])
    });

    const colitionDetector = () => {

        if(pointers.length === 1) return 

        const lastPointer = pointers[pointers.length - 1]
        
        for (let i = 0; i < pointers.length -1; i++) {
            
            const currentPointer = pointers[i];

            if((!lastPointer || !currentPointer)) return
            
            const areOverlapping = areEqualsCirclesOverlapping(currentPointer, lastPointer, circleRadius)
            
            if(areOverlapping) {
                const pointersFiltered = pointers.filter(pointer => pointer !== currentPointer && pointer !== lastPointer)
                setPointers(pointersFiltered)
            }
        }
    }

    useEffect(() => {
        colitionDetector()

    }, [pointers.length])

    return (
        <GestureDetector gesture={tap}>
            <Animated.View style={{ flex: 1, backgroundColor: '#0f1317'}}>

                {pointers.map(pointer => {
                    return (
                        <View
                            key={`${pointer.x * pointer.y}`} 
                            bgColor={pointer.color}
                            borderWidth={1}
                            borderColor={'white'} 
                            style={{
                                position: 'absolute',
                                left: pointer.x, 
                                top: pointer.y,
                                width: circleDiameter,
                                height: circleDiameter, 
                                borderRadius: circleRadius 
                        }}/>
                    )
                })}
                
            </Animated.View>
        </GestureDetector>
    )
}