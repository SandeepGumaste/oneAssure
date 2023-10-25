import React from 'react'

interface AgeRangeSelectorProps {
    name: string,
    options: string[],
    onChange: (age: string, name: string) => void
}

const AgeRangeSelector: React.FC<AgeRangeSelectorProps> = ({
    options, name, onChange
}) => {
    return (
        <div>
            <div className="form-control w-full max-w-xs mt-2 ">
                <label className="label">
                    <span className="label-text text-xl">{name}</span>
                </label>
                <select className="select select-bordered" onChange={(e) => onChange(e.target.value, name)}
                >
                    <option key={"disabled"} disabled selected>Select Age Range</option>
                    {
                        options.map((opt: string) => {
                            return <option key={opt} value={opt}>{opt}</option>
                        })
                    }

                </select>

            </div>
        </div>
    )
}

export default AgeRangeSelector