import React, { useEffect, useState } from 'react'
import { useGlobalData } from '../hooks/useGlobalData'




const Table = () => {

    const { data } = useGlobalData()
    const { insuranceData, members } = data

    const [dataToBeShown, setDataToBeShown] = useState<{
        baseRates: number[] | [], floaterDiscount: number[] | [], discountedRates: number[] | [], total: number
    }>({
        baseRates: [], floaterDiscount: [], discountedRates: [], total: 0
    })
    useEffect(() => {
        let temp: any = {}
        if (insuranceData && members && members?.length > 0) {
            const baseRates = members?.map((m, idx) => {
                if (Number(members[idx].ageRange?.split('-')[0]) < 18) {
                    return Math.round(insuranceData[0][data.sumInsured] * 0.75)
                } else {
                    return insuranceData?.find((i) => i.age_range === m.ageRange)[data.sumInsured]
                }
            })
            temp.baseRates = baseRates
            temp.floaterDiscount = baseRates.map((rate, idx) => {
                return idx === 0 ? 0 : 50
            })
            const discountedRates = baseRates.map((rate, idx) => {
                return idx > 0 ? rate * 0.5 : rate
            })
            temp.discountedRates = discountedRates
            temp.total = discountedRates.reduce((a, c) => a + c)
            setDataToBeShown(temp)

        }





    }, [])

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            {
                                members?.map((member) => <th>{member.name}</th>)
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        <tr>
                            <th>Base Rate</th>

                            {dataToBeShown.baseRates.length > 0 &&
                                dataToBeShown.baseRates.map((rate: number, idx) => <td
                                    key={`rate${idx}`}
                                >
                                    {rate}
                                </td>)
                            }

                        </tr>
                        {/* row 2 */}
                        <tr>
                            <th>Floater Discount</th>
                            {dataToBeShown.floaterDiscount.length > 0 &&
                                dataToBeShown.floaterDiscount.map((discount: number, idx) => <td key={`discount${idx}`}>
                                    {discount}%
                                </td>)
                            }
                        </tr>
                        {/* row 3 */}
                        <tr>
                            <th>Discounted Rate</th>
                            {dataToBeShown.discountedRates.length > 0 &&
                                dataToBeShown.discountedRates.map((discount: number, idx) => <td key={`discountedRate${idx}`}>
                                    {discount}
                                </td>)
                            }
                        </tr>
                        {/* row 4 */}
                        <tr>
                            <th>Total</th>
                            {dataToBeShown.total > 0 &&
                                <td>
                                    {
                                        dataToBeShown.total
                                    }
                                </td>
                            }
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Table