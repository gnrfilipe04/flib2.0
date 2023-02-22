import React, { memo } from 'react'
import { Text } from "react-native";


interface ItemProps {
    text: string | number;
}

function Item({text}: ItemProps){
    return (
        <Text style={{fontSize: 50}}>{text}</Text>
    )
}

export default memo(Item)