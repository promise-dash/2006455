import React, { useEffect, useState } from 'react'
import TrainCard from './TrainCard';

const Trains = ({token}) => {

    const [trains, setTrains] = useState([]);

    useEffect(() => {
        const getTrains = async() => {
            const response = await fetch("http://20.244.56.144/train/auth/", {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to get train details');
            }
      
            const data = await response.json();
            setTrains(data);
        }

        getTrains();
    }, []);

  return (
    <div>
        {trains.map((train) => {
            return (
                <TrainCard id={train.trainNumber}/>
            )
        })}
    </div>
  )
}

export default Trains