import axios from 'axios';
import { useState, useEffect } from 'react';

function HomePage() {
    const [message, setMessage] = useState('');

    const fetchData = async () => {
        try{
            const response = await axios.get('https://stingray-app-jmrty.ondigitalocean.app/api/home');
            setMessage(response.data.message)
        } catch (error) {
            console.error('error fetching data:', error);
        }
    }

    useEffect(() =>  {
        fetchData();
    }, [])
    
    return (
        <div>{message}</div>
    )
}
export default HomePage;