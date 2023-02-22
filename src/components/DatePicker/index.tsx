import React from 'react';
import { Calendar } from './components/Calendar';
import { Header } from './components/Header';
import { DatePickerProvider, useDatePicker } from './contexts/DatePickerContext';

import {
  Container
} from './styles';

interface DatePickerProps {
  getDate: (date: Date) => void;
}

export function DatePicker({
  getDate
}: DatePickerProps){

  return (
    <DatePickerProvider>
      <Container>
        <Header getDate={getDate}/>
        <Calendar />
      </Container>
    </DatePickerProvider>
  );
}