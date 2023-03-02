import { useState, useRef } from 'react'
import { Text, Box } from 'native-base'
import Animated, { interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated'

export function TimePicker(){

    const [ initValue, setInitValue ] = useState({
      hour: new Date().getHours(),
      minutes: new Date().getMinutes()
    })

    const hRef = useRef<Animated.ScrollView>(null) 
    const mRef = useRef<Animated.ScrollView>(null) 

    const [ hourSelected, setHourSelected ] = useState<String>('00')
    const [ minuteSelected, setMinuteSelected ] = useState<String>('00')

    const hours = ["", ...Array.from({ length: 24}, (_, index) => String(index).padStart(2, '0')), ""]
    const minutes = ["", ...Array.from({ length: 60}, (_, index) => String(index).padStart(2, '0')), ""]

    const HEIGHT = 120

    const scrollHours = useSharedValue(0)
    const scrollMinutes = useSharedValue(0)

    const scrollHourHandler = useAnimatedScrollHandler({

        onScroll: (event) => {
            scrollHours.value = event.contentOffset.y
        },
        
    });

    const scrollMinuteHandler = useAnimatedScrollHandler({

        onScroll: (event) => {
            scrollMinutes.value = event.contentOffset.y
        },
        
    });

    const scrollTo = (ref: React.RefObject<Animated.ScrollView>, value = 0) => {
      ref.current && ref.current.scrollTo({
        x: 0,
        y: HEIGHT / 3 * value,
        animated: true
      })
    }

    return (
      <>
      <Box flexDir={'row'} alignItems={'center'} justifyContent={'center'} maxH={HEIGHT}> 
          
          <Animated.ScrollView
              ref={hRef}
              showsVerticalScrollIndicator={false}
              snapToInterval={HEIGHT / 3}
              decelerationRate={'fast'}
              onLayout={() => scrollTo(hRef, initValue.hour)}
              onScroll={scrollHourHandler}
              style={{flexGrow: 0}}
              onMomentumScrollEnd={(event) => {

                  const hour = (event.nativeEvent.contentOffset.y / (HEIGHT / 3)).toFixed(0).padStart(2, '0')

                  setHourSelected(hour)
              }}
          >
              {hours.map((item, index) => {
                  const itemSize = HEIGHT / 3

                  const inputRange = [
                      (index - 2) * itemSize,
                      (index - 1) * itemSize,
                      index * itemSize,
                  ]

                  const outputRange = [.4, 1, .4]
                  const outputRangeScale = [.7, 1, .7]

                  const scaleItemStyle = useAnimatedStyle(() => {
                      return {
                          justifyContent: 'center',
                          alignItems: 'center',
                          height: HEIGHT / 3,
                          opacity: interpolate(scrollHours.value, inputRange, outputRange),
                          transform: [
                              { scale: interpolate(scrollHours.value, inputRange, outputRangeScale)}
                          ]
                      }
                  }) 

                  return (
                      <Animated.View 
                          key={index}
                          style={scaleItemStyle}>
                          <Text color={'white'} fontSize={HEIGHT / 4}>{item}</Text>
                      </Animated.View>
                  )
              })}
          </Animated.ScrollView>

          <Text textAlign={'center'} color={'white'} fontSize={HEIGHT / 4} px={5}>:</Text>
          <Animated.ScrollView
            ref={mRef}
              showsVerticalScrollIndicator={false}
              snapToInterval={HEIGHT / 3}
              decelerationRate={'fast'}
              onScroll={scrollMinuteHandler}
              onLayout={() => scrollTo(mRef, initValue.minutes)}
              style={{flexGrow: 0}}
              onMomentumScrollEnd={(event) => {

                  const minute = (event.nativeEvent.contentOffset.y / (HEIGHT / 3)).toFixed(0).padStart(2, '0')

                  setMinuteSelected(minute)
              }}
          >
              {minutes.map((item, index) => {
                  const itemSize = HEIGHT / 3

                  const inputRange = [
                      (index - 2) * itemSize,
                      (index - 1) * itemSize,
                      index * itemSize,
                  ]

                  const outputRange = [.4, 1, .4]
                  const outputRangeScale = [.7, 1, .7]

                  const scaleItemStyle = useAnimatedStyle(() => {
                      return {
                          justifyContent: 'center',
                          alignItems: 'center',
                          height: HEIGHT / 3,
                          opacity: interpolate(scrollMinutes.value, inputRange, outputRange),
                          transform: [
                              { 
                                  scale: interpolate(scrollMinutes.value, inputRange, outputRangeScale),                            
                              }
                          ]
                      }
                  }) 

                  return (
                      <Animated.View 
                          key={index}
                          style={scaleItemStyle}>
                          <Text color={'white'} fontSize={HEIGHT / 4}>{item}</Text>
                      </Animated.View>
                  )
              })}
          </Animated.ScrollView>
          
      </Box>
      </>
    )
}
