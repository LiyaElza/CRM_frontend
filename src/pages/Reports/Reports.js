import React from 'react';
import { useState,useEffect,useRef } from 'react'
import PieChart from './PieChart';
import LineChart from './LineChart';
import BarChart from './BarChart';
import { UserData } from './Data';
import './Reports.css'
import Navbar from '../../components/Navbar';

function Reports() {

  const [monthData,setMonthData]=useState({});
  const [productData,setProductData]=useState([]);
  const [customerData,setCustomerData]=useState([]);
  const [selectedYear,setSelectedYear]=useState(2022);
  let auth=sessionStorage.getItem('jwt');


  // const [userData, setUserData] = useState({
  //   labels: UserData.map((data) => data.year),
  //   datasets: [
  //     {
  //       label: "Users Gained",
  //       data: UserData.map((data) => data.userGain),
  //       backgroundColor: [
  //         "rgba(75,192,192,1)",
  //         "#ecf0f1",
  //         "#50AF95",
  //         "#f3ba2f",
  //         "#2a71d0",
  //       ],
  //       borderColor: "black",
  //       borderWidth: 2,
  //     },
  //   ],
  // });
  
  
  useEffect(() => {
    // const handleYearChange=async()=>{
    //   
    //   console.log(data)
    const fetchMonthlySales = async (value) => {
      console.log(value)
      const response = await fetch('http://127.0.0.1:8000/reports/monthlysales/',{
          method:"POST",
          body:JSON.stringify({"year":selectedYear}),
          headers:{
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization':auth},
        },
      );
  
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      const responseData = await response.json();   
      setMonthData(responseData);
  
    };
    fetchMonthlySales().catch((error) => {
    });
    const fetchProductSales = async () => {
      const response = await fetch(
        'http://127.0.0.1:8000/reports/productsales/',{
          headers:{
            'Authorization':auth
          }
        }
      );

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      const responseData = await response.json();
      const loadedProductSales = [];

      for (const key in responseData) {
        loadedProductSales.push({
          id: responseData[key].id,
          producttype: responseData[key].producttype,
          sales: responseData[key].sales,
        });
      }  
      setProductData(loadedProductSales);

    };

    fetchProductSales().catch((error) => {
    });

    
    const fetchCustomerSales = async () => {
      const response = await fetch(
        'http://127.0.0.1:8000/reports/customersales/',{
          headers:{'Authorization':auth}
        }
      );

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const responseData = await response.json();

      
      
      const loadedCustomerSales = [];

      for (const key in responseData) {
        loadedCustomerSales.push({
          year: responseData[key].year,
          number: responseData[key].number,
        });
      }


      
      setCustomerData(loadedCustomerSales);

    };

    fetchCustomerSales().catch((error) => {
    });

  },[]);


  const handleYearChange=(year)=>{
    setSelectedYear(year)
  }

  const monthlyData={
    labels: Object.keys(monthData),
    datasets: [
      {
        label: "Sales Amount",
        data: Object.values(monthData),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  }
  const productTypeData={
    labels: productData.map((data) => data.producttype),
    datasets: [
      {
        label: "Product Sales",
        data: productData.map((data) => data.sales),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  }

  const customerJoinData={
    labels: customerData.map((data) => data.year),
    datasets: [
      {
        label: "Customers Joining",
        data: customerData.map((data) => data.number),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  }
  const generateProductReport=()=>{

    window.open('http://127.0.0.1:8000/reports/generateProductReport/', '_blank', 'noopener,noreferrer');
  
  }
  const generateMonthlyReport=()=>{
    window.open('http://127.0.0.1:8000/reports/generateMonthlyReport/', '_blank', 'noopener,noreferrer');
  }

  const generateCustomerReport=()=>{
    window.open('http://127.0.0.1:8000/reports/generateCustomerReport/','_blank', 'noopener,noreferrer');
  }

  return (
    
    <div className="Reports">
      <Navbar/>
      <h2>Sales Report</h2>
    <div className='reportrow'>
   
    <div className='charts bar'>
      <h3>Sales Analysis in a Month</h3>
      <label>Select Year</label>
        < select onChange={(val)=>handleYearChange(val.target.value)}>
          <option value="2022">2022</option>
          <option value="2021">2021</option>
          <option value="2020">2020</option>
        </select>
        <BarChart chartData={monthlyData} />
        <button onClick={generateMonthlyReport}>Download Report</button>
        
      </div>
      <div className='charts line'>
        <h3>Customer Reach Analysis</h3>
        <LineChart chartData={customerJoinData} />
        <button onClick={generateCustomerReport}>Download Report</button>
      </div>
      </div>
      <div className='charts pie'>
        <h3>Product-Wise sales distribution</h3>
        <PieChart chartData={productTypeData} />
        <button onClick={generateProductReport}>Download Report</button>
      </div>
    </div>
  );
}

export default Reports;
