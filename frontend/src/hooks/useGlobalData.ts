import { useContext } from 'react';
import { DataType } from '../types';
import { GlobalDataContext } from '../providers/GlobalDataProvider';

export const useGlobalData = (): { data: DataType; setData: React.Dispatch<React.SetStateAction<DataType>> } => {
    const context = useContext(GlobalDataContext);
    if (!context) {
        throw new Error('useGlobalData must be used within an OptionsProvider');
    }
    return context;
};