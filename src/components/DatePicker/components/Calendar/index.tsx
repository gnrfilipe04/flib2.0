import React, { useEffect, useState } from 'react';
import { Dropdown, DropdownItemProps, DropdownProps } from '../../../Dropdown';
import { Ionicons } from '@expo/vector-icons';
import { WeekDays } from './components/WeekDays';
import { Days } from './components/Days';
import uuid from 'react-native-uuid';
import { allMonths } from './config';

import {
  Container,
  Top,
  Arrows
} from './styles';

export function Calendar(){
    const [monthList, setMonthList] = useState<DropdownProps<string>['list']>([])
    const [monthSelected, setMonthSelected] = useState<DropdownItemProps<string>>({} as DropdownItemProps<string>)
    const [dropdownState, setDropdownState] = useState(false)

    const getCurrentDate = () => {
        const date = new Date()
        const currentMonth = date.getMonth()
        const currentYear = date.getFullYear()
        const currentDate: DropdownItemProps<string> = {
            key: String(uuid.v4()),
            label: `${allMonths[currentMonth]} ${currentYear}`,
            value: `${currentMonth + 1}|${currentYear}`
        }
        setMonthSelected(currentDate)
    }

    const mountMonthList = () => {
        const allYears = getAllYears()
        const monthsOfYear: DropdownProps<string>['list'] = []
        
        allYears.forEach(year => {

            for(let i = 0; i < 12; i++){
                monthsOfYear.push({
                    key: String(uuid.v4()),
                    label: `${allMonths[i]} ${year}`,
                    value: `${i + 1}|${year}`
                }) 
            }
        })
        
        setMonthList(monthsOfYear.reverse())
    }

    const getAllYears = () => {
        const currentYear = new Date().getFullYear()
        const minimumYear = 1970
        let allYears = [minimumYear]

        for(let i = minimumYear; i < currentYear; i ++){
            allYears.push(i + 1)
        }
        
        return allYears
    }

    useEffect(() => {
        mountMonthList()
        getCurrentDate()
    }, [])

    return (
        <Container>
            <Top>
                <Dropdown getState={setDropdownState} list={monthList} onChange={(item) => setMonthSelected(item)}/>
                <Arrows>
                    <Ionicons name="chevron-back" size={20} color={'#805AD5'} />
                    <Ionicons name="chevron-forward" size={20} color={'#805AD5'}/>
                </Arrows>
            </Top>
            <WeekDays />
            <Days monthSelected={monthSelected} dropdownVisible={dropdownState}/>
        </Container>
    );
}