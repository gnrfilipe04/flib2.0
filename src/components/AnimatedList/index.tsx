import React, { useEffect, useState } from 'react'
import { Animated, NativeSyntheticEvent, TextInputScrollEventData } from 'react-native'
import { genInputRange } from './utils/getInputRange';
import { interpolateByScroll } from './utils/interpolateByScroll';
import { ItemText, ItemContainer } from './styles';

interface AnimatedListProps {
    list: string[];
    itemSize: number;
    scrollValue: Animated.Value;
    getValue: (hour: string) => void;
}

export function AnimatedList ({
    list,
    itemSize,
    scrollValue,
    getValue
}: AnimatedListProps): JSX.Element {
    
    const [value, setValue] = useState('0')

    useEffect(() => {
        getValue(value)
    }, [value])

    return (
        <Animated.FlatList 
        data={list}
        keyExtractor={(item, index) => String(index)}
        showsVerticalScrollIndicator={false}
        snapToInterval={itemSize}
        decelerationRate={'fast'}
        style={{flexGrow: 0}}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollValue}}}],
          { useNativeDriver: true,
            listener: (e: NativeSyntheticEvent<TextInputScrollEventData>) => {
              const hour = e.nativeEvent.contentOffset.y / itemSize

              setValue(String(hour).padStart(2, '0'))
            }
          }
        )}
        renderItem={(({item, index}) => {

          const inputRange = genInputRange(itemSize, index)
          const outputRangeOpacity = [.4, 1, .4]
          const outputRangeScale = [.7, 1, .7]

          const opacity = interpolateByScroll(inputRange, outputRangeOpacity, scrollValue)
          const scale = interpolateByScroll(inputRange, outputRangeScale, scrollValue)

          return (
            <ItemContainer>
              <ItemText
                color={'white'}
                fontSize={30} 
                style={{ opacity, transform: [{ scale }]}}>
                  {item}
              </ItemText>
            </ItemContainer>
          )
        })}
      />
    )
}