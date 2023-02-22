import { useState } from "react";
import { Button, View } from "native-base";
import { MyAlert } from "../components/Alert";
import { StyleSheet } from "react-native";

export function AlertExample(){
    const [isShow, setIsShow] = useState(false)
    return (
        <View style={styles.container}>

        <MyAlert isShow={isShow} onDismiss={() => setIsShow(false)} />

        <Button onPress={() => setIsShow(true)}>Open</Button>
        
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#0f1317',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20
    },
  });