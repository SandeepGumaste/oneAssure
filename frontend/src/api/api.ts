import axios from 'axios';

export const fetchOptions = async () => {
    try {
        const response = await axios.get('http://localhost:5000/options');
        const { options } = response.data;
        return options
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

export const fetchMembersData = async (memberCsv: string, ageRanges: (string | undefined)[]) => {
    try {
        const uri = `http://localhost:5000/find_records?member_csv=${memberCsv}&` + ageRanges.map((range) => `age_range=${range}`).join("&")
        const response = await axios.get(uri);
        const { data } = response.data;
        return data
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};