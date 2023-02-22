import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

import {
  Container,
  SelectValue,
  Input,
  ContainerList,
  ListItemContainer,
  ListItem
} from './styles';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';

export interface DropdownItemProps<V> {
  key: string | number[],
  label: string,
  value: V
}

export interface DropdownProps<V> {
    list: DropdownItemProps<V>[];
    onChange: (item: DropdownItemProps<V>) => void;
    getState: (state: boolean) => void;

}

export function Dropdown<V>({
    list,
    onChange,
    getState
}: DropdownProps<V>){

  const [listVisible, setListVisible] = useState(false)
  const [value, setValue] = useState('')

  const toogleVisibleList = () => {
    setListVisible(!listVisible)
  }

  useEffect(() => {
    getState(listVisible)
    
  }, [listVisible])

  return (
    <Container>
        <Input onPress={toogleVisibleList} activeOpacity={1}>
            <SelectValue>{value || 'Selecione o mês'}</SelectValue>
            <Ionicons name={listVisible ? "chevron-up" : "chevron-down"} size={20} color="black"/>
        </Input>

        {listVisible && 
        <>
          <ContainerList style={{elevation: 998}}>
            <FlatList
              data={list}
              showsVerticalScrollIndicator={false}
              keyExtractor={({key}) => String(key)}
              renderItem={({item}) => (
                <ListItemContainer onPress={() => {
                  setValue(item.label)
                  setListVisible(false)
                  onChange(item)
                }}>
                  <ListItem>{item.label.split(' ')[0]}</ListItem>
                  <ListItem>{item.label.split(' ')[1]}</ListItem>
                </ListItemContainer>
              )}
            />
          </ContainerList>
        </>}
    </Container>
  );
}