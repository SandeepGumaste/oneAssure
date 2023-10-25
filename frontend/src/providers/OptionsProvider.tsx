import React, { FC, ReactNode, useEffect, useState, createContext } from 'react';
import { OptionsContextType, OptionsType } from '../types';
import { fetchOptions } from '../api/api';


const OptionsContext = createContext<OptionsContextType | undefined>(undefined);


const initialOptions: OptionsType = {
    cityTiers: [],
    sumInsuredinLakhs: [],
    tenure: [],
    member_csv: [],
    age_ranges: [],
    child_age_ranges: [],
};
const OptionsProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [options, setOptions] = useState<OptionsType>(initialOptions);
    const [isOptionsLoading, setIsOptionsLoading] = useState(true)

    useEffect(() => {
        const getOptions = async () => {
            const tempOptions = await fetchOptions()
            if (tempOptions) {
                setOptions(tempOptions)
            }
            setIsOptionsLoading(false)
        }
        getOptions()
    }, []);

    return <OptionsContext.Provider value={{ options, setOptions, isOptionsLoading }}>{children}</OptionsContext.Provider>;
};

export { OptionsProvider, OptionsContext };