import React, { useEffect, useState } from 'react';
import { FlatGrid } from 'react-native-super-grid';

import {
  Container,
  Day
} from './styles';

interface WeekDaysProps {
    formatDayName?: () => void;
}

export function WeekDays({
    formatDayName
}: WeekDaysProps){

    const [daysOfWeek, setDaysOfWeek] = useState<string[]>([
        "domingo",
        "segunda",
        "terça",
        "quarta",
        "quinta",
        "sexta",
        "sábado",
    ])

    const format = () => {
        if(formatDayName){
            
        }
    }

    useEffect(() => {
        format()

    }, [])

    return (
        <Container pointerEvents='none'>
  
            <FlatGrid
            itemDimension={38}
            maxItemsPerRow={7}
            spacing={10}
            data={daysOfWeek}
            renderItem={({ item }) => (
                <Day>{item}</Day>
            )}
            />

        </Container>
    );
}