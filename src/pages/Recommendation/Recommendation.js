import { useState } from "react";
import Navbar from "../../components/Navbar";
import RecommendChart from "./RecommendChart";
import './Recommendation.css';
import Table from 'react-bootstrap/Table';
function Recommendation() {

  const[Recommends,setRecommends]=useState([]);

    // useEffect(() => {
    const fetchHourlySales = async () => {
      const response = await fetch(
        'http://127.0.0.1:8000/api/monthlysales/'
      );

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const responseData = await response.json();

      
      const loadedHourlySales = [];

      for (const key in responseData) {
        loadedHourlySales.push({
          id: responseData[key].id,
          monthlist: responseData[key].monthlist,
          sales: responseData[key].sales,
        });
      }

      setRecommends(loadedHourlySales);
    };

    fetchHourlySales().catch((error) => {
    });
  
    
const customerRecommendation={
    labels: Recommends.map((data) => data.year),
    datasets: [
      {
        label: "Recommendations",
        data: Recommends.map((data) => data.number),
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
    return(
        <div>
        <Navbar/>
        <h2>Recommendations</h2>

        <div className="recommendation-content">
        <div className='charts-line'>
        <h3>Hourly sales demand</h3>
        <RecommendChart chartData={customerRecommendation} />
        {/* <button onClick={generateCustomerReport}>Download Report</button> */}
      </div>
      <div className="bundle-data">
        <h3>bundle data</h3>
      <Table className='Table1'>
          <thead>
            <tr className='Row1'>
              <th>Sl.No</th>
              <th>products bought together</th>
              <th>Analyze from cases</th>
            </tr>
          </thead>
        <tbody>
                <tr>
                  <td>1</td>
                  <td>tv,fridge</td>
                  <td>high sales </td>
                </tr>
        </tbody>
      </Table>
      </div>
      </div>

        </div>
    )
}
export default Recommendation;