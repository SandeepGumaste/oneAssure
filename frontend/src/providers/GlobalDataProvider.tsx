
import React, { FC, ReactNode, useState, createContext } from 'react';
import { DataType, GlobalContextType } from '../types';


const GlobalDataContext = createContext<GlobalContextType | undefined>(undefined);


const initialData: DataType = {
    family: undefined,
    cityTier: 0,
    sumInsured: 0,
    tenure: 0,
}
const GlobalDataProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [data, setData] = useState<DataType>(initialData)

    return <GlobalDataContext.Provider value={{ data, setData }}>{children}</GlobalDataContext.Provider>;
};

export { GlobalDataContext, GlobalDataProvider };