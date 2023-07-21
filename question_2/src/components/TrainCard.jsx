import React, { useEffect, useState } from 'react'

const TrainCard = ({token, id}) => {

    const [trainDetails, setTrainDetails] = useState({});

    useEffect(() => {
        const getTrain = async() => {
            const response = await fetch(`http://20.244.56.144/train/trains/${id}`, {
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
            setTrainDetails(data);
        }

        getTrain();
    }, []);
  return (
    <div>
        <h4>{trainDetails.trainName}</h4>
        <p>Departure Time: {trainDetails.Hours + ":" + trainDetails.Minutes + ":" + trainDetails.seconds}</p>
        <span>Sleeper: {trainDetails.seatsAvailable.sleeper + " Price: " + trainDetails.price.sleeper}</span>
        <span>AC: {trainDetails.seatsAvailable.AC + " Price: " + trainDetails.price.AC}</span>
        <p>Delayed By: {trainDetails.delayedBy}</p>
    </div>
  )
}

export default TrainCard