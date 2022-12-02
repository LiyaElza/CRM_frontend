import React from 'react';
// import StatusCards from './status-card-data';
import StatusCard from './StatusCard';
import { useState,useEffect } from 'react';
import { StatusCards } from './status-card-data';
// import { Icon } from '@iconify/react';
import './Dashboard.css';


const Dashboard = () => {
    const [count, setCount] = useState([]);

    useEffect(()=>{
      const fetchCustomerDetails = async () => {
       const response=await fetch(
         'http://127.0.0.1:8000/api2/dashboard/'
       );
       if (!response.ok){
        throw  new Error('something went wrong!');
       }   
      const responseData=await response.json();
      
     
      
      setCount(responseData);
      console.log(count);
    };
    fetchCustomerDetails().catch((error) => {
    })  
    },[])
    return(
        <div className='main'>
            {/* <h2 className="page-header">Dashboard</h2> */}
            <span></span>
            <div className="row">
                <div className="col-6">
                    <div className="row">
                        {
                            StatusCards.map((item, index) => (
                                <div className="col-6" key={index}>
                                    <StatusCard
                                        icon={item.icon}
                                        count={count[index]}
                                        title={item.title}
                                    />
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Dashboard;
  