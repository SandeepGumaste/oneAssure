import React, { useEffect, useState } from 'react'
import AgeRangeSelector from './AgeRangeSelector'
import { FamilyType } from '../types'
import { useGlobalData } from '../hooks/useGlobalData'
import { fetchMembersData } from '../api/api'

interface FamilyMemberProps {
    data: FamilyType,
    ageOptions: string[],
    childAgeOptions: string[]
}

const FamilyMembers: React.FC<FamilyMemberProps> = ({
    data, ageOptions, childAgeOptions
}) => {
    const { adults, children } = data
    const [membersArray, setMembersArray] = useState<{ name: string, ageRange?: string }[] | undefined>(undefined)
    const { data: globalData, setData: setGlobalData } = useGlobalData()
    useEffect(() => {
        let tempMemberAges: any = []
        for (let i = 0; i < adults; i++)
            tempMemberAges.push({
                name: `Adult ${i + 1}`
            })
        for (let i = 0; i < children; i++)
            tempMemberAges.push({
                name: `Child ${i + 1}`
            })

        setMembersArray(tempMemberAges);

    }, [adults, children])

    const handleAgeChange = (age: string, name: string) => {
        if (membersArray) {
            let temp: any = [...membersArray]

            const requiredObjectIndex = membersArray.findIndex((obj: any) => obj.name === name)
            temp[requiredObjectIndex] = {
                ...temp[requiredObjectIndex], ageRange: age
            }
            setMembersArray(temp)
        }


    }

    const handleGeneratePlan = () => {
        let ageRangesArray: (string | undefined)[]
        if (membersArray && adults > 1) {

            const adultOneAgeRange = membersArray[0].ageRange
            const adultTwoAgeRange = membersArray[1].ageRange
            if (adultOneAgeRange && adultTwoAgeRange && adultOneAgeRange.split('-')[0] > adultTwoAgeRange.split('-')[0]) {
                alert("Adult 2 age range should be smaller than age Range of adult 1")
                return
            }
        }
        if (globalData && membersArray) {
            if (!globalData.cityTier) {
                alert("Please choose your city tier")
                return
            }
            if (!globalData.family) {
                alert("Please choose your Family type")
                return
            }
            if (!globalData.sumInsured) {
                alert("Please choose an amount you want to insure")
                return
            }
            if (!globalData.tenure) {
                alert("Please choose tenure")
                return
            }
            ageRangesArray = membersArray.map((member) => member.ageRange)
            try {
                const getInsuranceData = async () => {
                    const reqdData = await fetchMembersData(data.name, ageRangesArray)
                    setGlobalData({ ...globalData, insuranceData: reqdData, members: membersArray })
                }
                getInsuranceData()
            } catch (error) {
                alert(`error:${error}`)
                console.error(error)
            }
        }
    }

    return (
        <div className='container my-5'>
            <div className="card w-full bg-base-100 shadow-xl image-full">
                <div className="card-body">
                    <h2 className="card-title">Enter Family details</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {
                            membersArray?.map((member: { name: string }) =>
                                <AgeRangeSelector key={member.name} name={member.name} options={member.name.includes("Child") ? childAgeOptions : ageOptions} onChange={handleAgeChange} />
                            )
                        }
                    </div>
                    <div className="card-actions justify-center">
                        <button className="btn btn-active mt-5" onClick={handleGeneratePlan}>Generate Plan</button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default FamilyMembers