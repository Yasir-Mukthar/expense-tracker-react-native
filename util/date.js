import { Text } from "react-native"


export function getFormattedDate(date){



    return <Text>
    {date.getFullYear()}-{date.getMonth() + 1}-{date.getDay()}
    </Text>
}