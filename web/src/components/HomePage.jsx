import axios from 'axios';
import { useState, useEffect } from 'react';

function HomePage() {
    const [message, setMessage] = useState('');

    // useEffect(()=> {
    //     fetch('http://localhost:8080/api/home')
    //     .then((response)=> response.json())
    //     .then((data)=> setMessage(data.message));
    // }, []);

    const fetchData = async () => {
        try{
            const response = await axios.get('http://localhost:5000/api/home');
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