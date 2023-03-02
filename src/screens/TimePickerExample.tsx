import { Box } from 'native-base'
import { TimePicker } from '../components/TimePicker'

export function TimePickerExample(){

    return (
        <Box flex={1} bgColor={'#0f1317'} justifyContent={'center'}>
            <TimePicker />
        </Box>
    )
}
