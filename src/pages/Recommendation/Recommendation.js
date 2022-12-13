import { useState,useEffect } from "react";
import Navbar from "../../components/Navbar";
import RecommendBarChart from "./RecommendBarChart";
import RecommendChart from "./RecommendChart"
import './Recommendation.css';
import Table from 'react-bootstrap/Table';

function Recommendation() {

  const[currentHourSales,setCurrentHourSales] = useState([]);
  const[hourlydata,setHourlyData]=useState([]);
  const[productbundle,setProductBundle]=useState({})
  let auth=sessionStorage.getItem('jwt');
  
  useEffect(()=>{
    const fetchHourlySales = async () => {
      const response = await fetch(
        'http://127.0.0.1:8000/analysis/adrecommendations/'
      );
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      const responseData = await response.json();
      console.log(responseData)
      setHourlyData(responseData);
    };
    fetchHourlySales().catch((error) => {
    });
  
    const fetchproductbundle = async () => {
      const res = await fetch(
        'http://127.0.0.1:8000/analysis/productbundles/'
      );
      if (!res.ok) {
        throw new Error('Something went wrong!');
      }
    const resData = await res.json();
    setProductBundle(resData);
    };
    fetchproductbundle().catch((error) => {
    });

    const fetchHourlyProductSales = async () => {
      const response = await fetch(
        'http://127.0.0.1:8000/api/monthlysales/',{
          headers:{
            'Authorization':auth
          }
        }
      );
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      const responseData = await response.json();   
      const loadedHourlyProductSales = [];

      for (const key in responseData) {
        loadedHourlyProductSales.push({
          id: responseData[key].id,
          monthlist: responseData[key].monthlist,
          sales: responseData[key].sales,
        });
      }
      setCurrentHourSales(loadedHourlyProductSales);
    };
    fetchHourlyProductSales().catch((error) => {
    });
  },[])

const customerRecommendation={
    labels: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],
    datasets: [
      {
        label: "Hourly total Sales",
        data: hourlydata.map(data => data),
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
  

  const hourlyProductSales={
    labels: currentHourSales.map((data) => data.monthlist),
    datasets: [
      {
        label: "Sales Amount",
        data: currentHourSales.map((data) => data.sales),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  }

    return(
        <div>
        <Navbar/>
        <h2>Recommendations</h2>

        <div className="recommendation-content">
        <div className='charts-line'>
        <h3>Hourly sales demand</h3>
        <RecommendChart chartData={customerRecommendation} />
      </div>
      <div className="bundle-data">
        <h3>bundle data</h3>
      <Table className='BundleDataTable'>
          <thead>
            <tr className='Row1'>
              <th>products bought together</th>
              <th>Analyze from cases</th>
            </tr>
          </thead>
        <tbody>
          {
            Object.entries(productbundle)
            .map( ([key, value]) => <tr key={key}><td>{key}</td><td>{value}</td></tr> )
          }
        </tbody>
      </Table>
      </div>
      </div>

      <div className='charts-bar'>
      <h3>Sales Analysis in current Hour</h3>
        <RecommendBarChart chartData={hourlyProductSales} />
        {/* <button onClick={generateMonthlyReport}>Download Report</button> */}
      </div>

        </div>
    )
}
export default Recommendation;