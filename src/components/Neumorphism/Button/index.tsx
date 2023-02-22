import React from 'react'
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native'

export function NeuButton() {
    return (
        <View style={styles.container}>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#DEE9FD'
    },
    inner: {
        backgroundColor: "#DEE9F7",
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#E2ECFD',
        borderWidth: 1,
        width: 40,
        height: 40,
        borderRadius: 20
    },
    topShadow: {
        shadowColor: '#FBFFFF',
        shadowOpacity: 1,
        shadowOffset: { width: -6, height: -6},
        shadowRadius: 6,
        elevation: 3,

    },
    bottomShadow: {
        shadowOffset: {
            width: 6,
            height: 6,
        },
        shadowOpacity: 1,
        shadowRadius: 6,
        shadowColor: '#B7C4DD',
    }
})