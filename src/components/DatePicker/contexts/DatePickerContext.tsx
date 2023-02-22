import React, { createContext, ReactNode, useContext, useState } from "react";

interface DatePickerProviderProps {
    children: ReactNode;
}

interface DatePickerContext {
    dateSelected: Date;
    setDateSelected: React.Dispatch<React.SetStateAction<Date>>
}

const DatePickerContext = createContext({} as DatePickerContext)

export function DatePickerProvider({ children }: DatePickerProviderProps){

    const [dateSelected, setDateSelected] = useState<Date>(new Date())

    return (
        <DatePickerContext.Provider
            value={{
                dateSelected,
                setDateSelected
            }}
        >
            {children}
        </DatePickerContext.Provider>
    )
}

export const useDatePicker = () => useContext(DatePickerContext)