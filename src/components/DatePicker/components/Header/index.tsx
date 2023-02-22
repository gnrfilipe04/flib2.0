import React, { useEffect, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { useDatePicker } from '../../contexts/DatePickerContext';
import { allMonths } from '../Calendar/config';

import {
  Container, 
  Save,
  Top,
  Bottom,
  SelectDate,
  SelectDateTitle,
  SelectDateValue
} from './styles';

interface HeaderProps {
  getDate: (date: Date) => void;
}

export function Header({
  getDate
}: HeaderProps){
  const { dateSelected }  = useDatePicker()

  const [dateText, setDateText] = useState('')
  
  const handleDateText = (date: Date) => {
    const month = allMonths[date.getMonth()] || '-'
    const day = date.getDate()

    const dayFormatted = day ? String(day).padStart(2, '0') : '-'

    setDateText(`${dayFormatted} ${month?.substring(0, 3)}`)
  }

  useEffect(() => {
    const date = dateSelected || new Date()
    handleDateText(date)

  }, [dateSelected])

  return (
    <Container>
        
        <Top>
            <AntDesign name="close" size={20} color="white" />
            <TouchableOpacity onPress={() => getDate(dateSelected)}>
              <Save>Salvar</Save>
            </TouchableOpacity>
        </Top>

        <Bottom>
            <SelectDate>
                <SelectDateTitle>Data selecionada</SelectDateTitle>
                <SelectDateValue>{dateText}</SelectDateValue>
            </SelectDate>
            <MaterialIcons name="edit" size={30} color="white" />
        </Bottom>
    </Container>
  );
}