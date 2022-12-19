import React ,{useState,Axios, useEffect} from 'react';
// import Products from '../Products/Products';
// import './Form.css';
import axios from 'axios';
import './View.css';

function View() {
    const [menuItems, setMenuItems] = useState([]);
    const auth=window.sessionStorage.jwt
    useEffect(() => {
        const productdetails = async () => {
          let config={headers:{'Authorization':auth}}
          axios.get("http://127.0.0.1:8000/offer/offer/",config)
          .then(response => {
            setMenuItems(response.data);
          });
        };
        productdetails().catch((error) => {
    
        });
    
      }, []);
    
  
  return (
    <div>
        <span></span>
        <table className='tableoffer'>
          <thead>
            <tr className='row'>
              <th>Offer Id</th>
              <th>Product Type</th>
              <th>Product Name</th>
              <th>Offer Message</th>
              <th>Start Date</th>
              <th>End Date</th>
            </tr>
          </thead>
          <tbody>
         { menuItems.map((item,index) => {
                return(
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>{item.product_type}</td>
                  <td>{item.product}</td>
                  <td>{item.message}</td>
                  <td>{item.startDate}</td>
                  <td>{item.endDate}</td>
                  </tr>);
})}
          </tbody>
        </table>

    </div>

    
  );
};

export default View;
