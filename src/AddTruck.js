import './TruckPage.css'
import AddTruckForm from './Components/AddTruckForm';
import React from 'react';

/*
PLAN:
1) make a react form with info as needed
2) make user upload buttons that allow you to select from local 
3) make the payment deposit 
*/

/*
    addTruckForm() {
    // form titled "Input business information here: "
    // text field: business name
    // location autofill: location
    // food type: food autofill, else --> other
    // text field: max capacity of customers

    // local upload: upload PDF/PNG of menu
    // local upload: upload license
    // new page: thanks for verifying page, you'll get an email as soon as we verify you
}
*/
const AddTruck =() => {
    return (
        <div> 
            <AddTruckForm/>
        </div>
        
    );
}

export default AddTruck;