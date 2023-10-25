import React from 'react'

interface SelectComponentProps {
    name: string,
    options: string[] | number[],
    onChange: (name: string, newData: number | string) => void
}

const SelectComponent: React.FC<SelectComponentProps> = ({
    name, options, onChange
}) => {
    return (
        <div className="form-control w-full max-w-xs mt-2 mx-2 ">
            <label className="label">
                <span className="label-text text-xl">{name}</span>
            </label>
            <select className="select select-bordered" onChange={(e) => {

                onChange(name, name === "Family type" ? e.target.value : Number(e.target.value))
            }}>
                <option key={"disabled"} disabled selected>Pick one</option>
                {
                    options.map((opt: string | number) => {
                        return <option key={opt.toString()} value={opt}>{opt}</option>
                    })
                }

            </select>

        </div>
    )
}

export default SelectComponent