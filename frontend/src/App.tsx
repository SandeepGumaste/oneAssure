import './App.css';
import { DataType } from './types';
import { OptionsProvider } from './providers/OptionsProvider';
import SelectComponent from './components/SelectComponent';
import { useOptions } from './hooks/useOptions';
import FamilyMembers from './components/FamilyMembers';
import { useGlobalData } from './hooks/useGlobalData';
import Table from './components/Table';



function App() {

  const { options, isOptionsLoading } = useOptions()
  const { data, setData } = useGlobalData()

  const handleSelectChange = (name: string, newData: number | string) => {
    let tempData: DataType = {
      ...data
    }
    if (typeof (newData) === "number") {
      if (name === "City tier") {
        tempData = { ...data, cityTier: newData }
      }
      if (name === "Sum insured") {
        tempData = { ...data, sumInsured: newData }

      }
      if (name === "Tenure in years") {
        tempData = { ...data, tenure: newData }

      }
    } else {

      if (name === "Family type") {
        tempData = { ...data, family: newData }
      }
    }
    setData(tempData)
  }


  if (isOptionsLoading) {
    return <h1>Loading...</h1>
  }

  if (!options) {
    return <h1>Data Fetching error: No Options found</h1>
  }


  return (
    <OptionsProvider>
      <div className=" text-white flex items-center flex-col mt-5 px-5">
        <h1 className='pb-4 text-4xl'>OneAssure Insurance plan builder</h1>
        <div className='flex container justify-evenly mt-5 w-full flex-col md:flex-row flex-wrap'>
          <SelectComponent name="Family type" options={Object.keys(options.member_csv)} onChange={handleSelectChange} />
          <SelectComponent name='City tier' options={options.cityTiers} onChange={handleSelectChange} />
          <SelectComponent name='Sum insured' options={options.sumInsuredinLakhs} onChange={handleSelectChange} />
          <SelectComponent name='Tenure in years' options={options.tenure} onChange={handleSelectChange} />
        </div>
        {
          data.family &&
          <FamilyMembers data={options.member_csv[data.family]} ageOptions={options.age_ranges} childAgeOptions={options.child_age_ranges}
          />
        }
        {
          data.insuranceData && <Table />
        }
      </div>
    </OptionsProvider>
  );
}

export default App;
