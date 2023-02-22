import React, { useEffect, useState } from 'react';
import { FlatGrid } from 'react-native-super-grid';
import { DropdownItemProps } from '../../../../../Dropdown';
import { useDatePicker } from '../../../../contexts/DatePickerContext';
import { allMonths } from '../../config';

import {
  Container,
  Day,
  DayContainer
} from './styles';

interface MonthProps {
    monthNumber: number,
    daysCount: number,
    monthName: string,
    firstDay: number,
    lastDay: number,
}

interface YearProps {
    year: number,
    months: MonthProps[]
}

interface DaysProps {
    day: number;
    isCurrentMonth: boolean;
    isToday: boolean; 
}

interface DaysComponentProps {
    monthSelected: DropdownItemProps<string>;
    dropdownVisible: boolean;
}

export function Days({
    monthSelected,
    dropdownVisible
}: DaysComponentProps){

    const { setDateSelected } = useDatePicker()

    const [year, setYear] = useState<Record<string, YearProps>>({})
    const [days, setDays] = useState<DaysProps[]>([])

    const [monthNumber, setMonthNumber] = useState(6)

    const [monthNames, setMonthNames] = useState(allMonths)

    const [daySelected, setDaySelected] = useState<DaysProps>({} as DaysProps)

    const [yearLong, setYearLong] = useState<number>(1970)
    
    const mountYear = (year: number ): Promise<Record<string, YearProps>> => {

        return new Promise((resolve, reject) => {
            const yearComplete: Record<string, YearProps> = {
                [year]: {
                    year,
                    months: Array.from({length: 12}, (month, index) => {
                        const monthNumber: number = index + 1
                        const totalDays = new Date(year, monthNumber, 0).getDate()
                        const firstDayFormat = `${year}/${monthNumber}/1`
                        const lastDayFormat = `${year}/${monthNumber}/${totalDays}`

                        return {
                            monthNumber,
                            firstDay: new Date(firstDayFormat).getDay(),
                            lastDay: new Date(lastDayFormat).getDay(),
                            daysCount: totalDays,
                            monthName: monthNames[index]
                        }
                    })
                }
            }
            resolve(yearComplete)
        })
    }

    const setSelectedDate = (year: number) => {
        mountYear(year)
            .then((yearComplete) => {
                setYear(yearComplete)
                setDaysOfMonth(yearComplete)
            })

    }

    const getPreviousMonth = (yearSelected: Record<string, YearProps>, currentMonth: number, yearNumber: number, ) => {
        return yearSelected[yearNumber].months.find(month => month.monthNumber === currentMonth - 1) || year[yearNumber].months[0]
    }

    const findMonth = (yearSelected: Record<string, YearProps>,yearNumber: number, currentMonth: number): MonthProps => {
        //Retornar data atual caso undefined
        return yearSelected[yearNumber].months.find(month => month.monthNumber === currentMonth) || year[yearNumber].months[0]
    }

    const getDaysOfMonth = (yearSelected: Record<string, YearProps>, yearNumber: number, currentMonth: number): number => {
        const monthSelected = findMonth(yearSelected, yearNumber, currentMonth)
        return monthSelected.daysCount
    }
    const getToday = (day: number) => {
        return day === new Date().getDate() && monthNumber === new Date().getMonth() + 1
    }

    const setDaysOfMonth = (yearSelected: Record<string, YearProps>) => {
        
        //Previous Month
        const previousMonth = getPreviousMonth(yearSelected, monthNumber, yearLong)
        const previousToArray = toArray(getDaysOfMonth(yearSelected, yearLong, previousMonth.monthNumber))
        const previousToDaysProps: DaysProps[] = previousToArray.map(day => ({day, isCurrentMonth: false, isToday: false}))
        console.log(previousToDaysProps.length, previousMonth.lastDay, previousToDaysProps.length)
        const previousDays = previousToDaysProps
            .slice(previousToDaysProps.length - previousMonth.lastDay - 1, previousToDaysProps.length) 

        //Current Month
        const currentMonth = getDaysOfMonth(yearSelected, yearLong, monthNumber)
        const daysOfMonthArray = toArray(currentMonth)
        const daysToCurrentMonth: DaysProps[] = daysOfMonthArray.map(day => ({day, isCurrentMonth: true, isToday: getToday(day)}))

        //Next Month
        const nextToArray = toArray(35 - currentMonth - previousDays.length)
        const nextDays: DaysProps[] = nextToArray.map(day => ({day, isCurrentMonth: false, isToday: false}))

        setDays([...previousDays, ...daysToCurrentMonth, ...nextDays])

    }

    const toArray = (length: number) => {
        return Array.from({length}, (item, index) => index + 1)
    }

    const handleSelectedDate = () => {
        if(daySelected && monthSelected){
            const date = `${yearLong}/${monthNumber}/${daySelected.day}`
            setDateSelected(new Date(date))
        }
    }

    const clearDay = () => {
        const emptyDay = {} as DaysProps
        setDaySelected(emptyDay)
    }

    useEffect(() => {
        setSelectedDate(yearLong)

    }, [monthNumber])

    useEffect(() => {
        console.log('MONTH NUMBER', monthSelected)
        setMonthNumber(Number(monthSelected?.value?.split('|')[0]))
        setYearLong(Number(monthSelected?.value?.split('|')[1]))
        clearDay()
        
    }, [monthSelected])

    useEffect(() => {
        handleSelectedDate()
    }, [daySelected])

    return (
        <Container pointerEvents={dropdownVisible ? 'none' : 'auto'}>
            <FlatGrid
            itemDimension={38}
            maxItemsPerRow={7}
            data={days}
            renderItem={({ item }) => (
                <DayContainer 
                    isSelected={item.day === daySelected.day && item.isCurrentMonth === daySelected.isCurrentMonth} 
                    activeOpacity={1}
                    isToday={item.isToday}
                    onPress={() => item.isCurrentMonth && setDaySelected(item)}>

                    <Day 
                        isToday={item.isToday}
                        isSelected={item.day === daySelected.day && item.isCurrentMonth === daySelected.isCurrentMonth} 
                        isCurrentMonth={item.isCurrentMonth}>{item.day}</Day>
                </DayContainer>
            )}
            />
        </Container>
    );
}