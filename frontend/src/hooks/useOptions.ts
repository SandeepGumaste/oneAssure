import { useContext } from 'react';
import { OptionsType } from '../types';
import { OptionsContext } from '../providers/OptionsProvider';

export const useOptions = (): { options: OptionsType; setOptions: React.Dispatch<React.SetStateAction<OptionsType>>, isOptionsLoading: boolean } => {
    const context = useContext(OptionsContext);
    if (!context) {
        throw new Error('useOptions must be used within an OptionsProvider');
    }
    return context;
};