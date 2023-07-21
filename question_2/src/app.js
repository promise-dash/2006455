import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom';
import Trains from './components/Trains';
import TrainCard from './components/TrainCard';

const App = () => {

    const [credentials, setCredentials] = useState(null);
    const [token, setToken] = useState("");

    const company = {
        "companyName": "Train Central",
        "ownerName": "Promise",
        "rollNo": "2006455",
        "ownerEmail": "2006455@kiit.ac.in",
        "accessCode": "oJnNPG"
    };

    useEffect(() => {
        const registerCompany = async() => {
            const response = await fetch("http://20.244.56.144/train/register", {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(company),
            });

            if (!response.ok) {
                throw new Error('Request failed');
            }
      
            const data = await response.json();
            setCredentials(data);
        }

        const authenticateCompany = async() => {
            const response = await fetch("http://20.244.56.144/train/auth/", {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            });

            if (!response.ok) {
                throw new Error('Authentication failed');
            }
      
            const {access_token} = await response.json();
            setToken(access_token);
        }

        !credentials ? registerCompany() : authenticateCompany();
    }, []);

  return (
    <>
    <Routes>
        <Route path='/' element={<App/>}/>
        <Route path='/trains' element={token ? <Trains token={token}/> : <App />}/>
        <Route path='/train/:id' element={token ? <TrainCard token={token}/>: <App />}/>
    </Routes>        
    </>
  )
}

export default App