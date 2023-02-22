import React, { useEffect, useState } from 'react';
import { Button } from 'react-native';
import { FieldProps, Input } from './Input/Input';

import {
  Container
} from './styles';

interface Field {

}

interface FormProps {
    fields: FieldProps[]
}

export function Form({
    fields
}: FormProps){

    const [data, setData] = useState([])

    function handleData(){
        const data = fields.map((item, index) => {
            return {
                [item.name]: item.value
            }
        })
        console.log(data)
        //setData(data)
    }

    return (
        <Container>
            {Object.values(fields).map((item, index) => {
                
                return <Input
                    key={`${index * Math.random()}`} 
                    name={item.name}
                    inputStyle={item.inputStyle}
                    label={item.label}
                    onChangeValue={item.onChangeValue}
                    value={item.value}
                    type={item.type}
                    keyboardType={item.keyboardType}
                />
            })}

            <Button onPress={handleData} title='Enviar'/>
        </Container>
    );
}