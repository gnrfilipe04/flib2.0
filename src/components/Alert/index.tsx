import { useState } from 'react'
import { Center, Alert, VStack, HStack, Text, IconButton, CloseIcon, Box } from 'native-base'

interface MyAlertProps {
    isShow?: boolean,
    onDismiss: () => void;
}

export function MyAlert({
    isShow = false,
    onDismiss
}: MyAlertProps) {

    return (
        
        isShow ? <Center position={'absolute'} bottom={30}>
            <Alert maxW="400" status="error" colorScheme="info">
            <VStack space={2} flexShrink={1} w="100%">
                <HStack flexShrink={1} space={2} alignItems="center" justifyContent="space-between">
                <HStack flexShrink={1} space={2} alignItems="center">
                    <Alert.Icon />
                    <Text fontSize="md" fontWeight="medium" color="coolGray.800">
                        Usuário Inválido!
                    </Text>
                </HStack>
                <IconButton variant="unstyled" _focus={{
                    borderWidth: 0
                }} icon={<CloseIcon size="3" />} onPress={onDismiss} _icon={{
                    color: "coolGray.600"
                }} />
                </HStack>
                <Box pl="6" _text={{
                    color: "coolGray.600"
                }}>
                    Verifique suas credenciais e tente novamente!
                </Box>
            </VStack>
            </Alert>
        </Center>
        : <></>
    )
  }