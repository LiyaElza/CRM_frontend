import React ,{useState,Axios, useEffect} from 'react';
// import Products from '../Products/Products';
// import './Form.css';
import axios from 'axios';
import './View.css';

function View() {
    const [menuItems, setMenuItems] = useState([]);
    useEffect(() => {
        const productdetails = async () => {
          let config={}
          axios.get("http://127.0.0.1:8000/aoffer/offer/")
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
                  </tr>);
})}
          </tbody>
        </table>

    </div>

    
  );
};

export default View;
