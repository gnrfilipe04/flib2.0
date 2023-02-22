import { useEffect, useRef, useState } from 'react';
import { AnimatedList } from '../AnimatedList';
import { Button } from '../Button';

import { genHours } from './utils/genHours';
import { genMinutes } from './utils/genMinutes';

import { 
  Animated, 
  Dimensions,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { 
  Container,
  Separate,
  ButtonContainer
} from './styles';

interface TimePickerProps {
  
}

export function TimePicker() {
  const {height, width} = Dimensions.get('window')

  const [time, setTime] = useState({
    hours: '00',
    minutes: '00'
  })

  const [hours, setHours] = useState<string[]>([])
  const [minutes, setMinutes] = useState<string[]>([])

  const arrHours = genHours()
  const arrMinutes = genMinutes()

  const itemSize = 40

  const scrollYHours = useRef(new Animated.Value(0)).current
  const scrollYM = useRef(new Animated.Value(0)).current

  const getTime = () => {
    console.log(time)
  }

  useEffect(() => {
    setHours(arrHours)
    setMinutes(arrMinutes)

  }, [])

  return (
    <>
    <Container 
      maxHeight={120}>
      <AnimatedList 
        list={hours}
        itemSize={itemSize}
        scrollValue={scrollYHours}
        getValue={(hours) => setTime({...time, hours})}
      />
      <Separate>:</Separate> 
      <AnimatedList 
        list={minutes}
        itemSize={itemSize}
        scrollValue={scrollYM}
        getValue={(minutes) => setTime({...time, minutes})}
      />
    </Container>
    
    <ButtonContainer>
      <Button 
        bgColor='transparent'
        textColor='white'
        title='Cancelar'
      />

      <Button 
        bgColor='transparent'
        textColor='white'
        title='Confirmar'
        style={{
          borderWidth: 1,
          borderColor: 'white',
          paddingVertical: 5,
          paddingHorizontal: 15,
          borderRadius: 4,
        }}
      />
    </ButtonContainer>
    </>
  );
};
