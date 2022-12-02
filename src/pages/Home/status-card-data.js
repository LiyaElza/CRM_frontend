import React from 'react';
import { BsFillBagCheckFill } from "react-icons/bs";
import { BsFillCartCheckFill } from "react-icons/bs";
import { FaRupeeSign } from "react-icons/fa";
import { FaReceipt } from "react-icons/fa";


export const StatusCards = [
    {
        "icon": <BsFillBagCheckFill/>,
        "title": "Total Sales"
    },
    {
        "icon": <FaRupeeSign/>,
        "title": "Total Income"
    },
    {
     
        "icon": <BsFillCartCheckFill />,
        "title": "Customers"
    },
    {
        "icon": <FaReceipt/>,
        "title": "Total Orders"
    }
];
