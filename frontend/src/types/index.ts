export interface OptionsType {
    cityTiers: string[],
    sumInsuredinLakhs: number[],
    tenure: number[],
    member_csv: any,
    age_ranges: string[],
    child_age_ranges: string[]
}

export interface FamilyType {
    name: string,
    adults: number,
    children: number
}
export interface DataType {
    family: string | undefined;
    cityTier: number;
    sumInsured: number;
    tenure: number;
    insuranceData?: any[],
    members?: { name: string, ageRange?: string }[]

}

export interface LoadingContextType {
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface OptionsContextType {
    options: OptionsType;
    setOptions: React.Dispatch<React.SetStateAction<OptionsType>>;
    isOptionsLoading: boolean
}

export interface GlobalContextType {
    data: DataType;
    setData: React.Dispatch<React.SetStateAction<DataType>>
}