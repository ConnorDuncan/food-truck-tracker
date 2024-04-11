import React from 'react';
import { useParams } from 'react-router-dom';

function DetailPage(){
  const { truckName } = useParams();

  return (
    <div>
      <h1>Update Food Truck: {truckName}</h1>

    </div>
  );
};

export default DetailPage;