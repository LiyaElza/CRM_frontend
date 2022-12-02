import React from 'react';
import { useState , useEffect } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Menu from './Menu';
import './Products.css';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import 'react-tabs/style/react-tabs.css';

function Products() {
  const [menuItems, setMenuItems] = useState([]);
  const [product_type, setProduct_Type] = useState("");
  const [product, setProduct] = useState("");
  const [img, setImg] = useState("");
  const [message, setMessage] = useState("");
  useEffect(() => {
    const productdetails = async () => {
      axios.get('http://127.0.0.1:8000/app/products/')
      .then(res => {
        setMenuItems(res.data);
      
      });
    };

    productdetails().catch((error) => {
    });
  }, []);


  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("http://127.0.0.1:8000/app/products/", {
        method: "POST",
        body: JSON.stringify({
          id:menuItems[menuItems.length-1].id+1,
          title: product,
          category: product_type,
          thiruvalla:0,
          kottayam:0,
          kochi:0,
          img: img,
        }), 
        headers:{
          'Accept':'application/json',
          'Content-Type':'application/json',
        }
      });
      setProduct_Type('');
      setProduct('');
      setImg('');

      let resJson = await res.json();
      if (resJson.status === 200) {
        setMessage("User created successfully");
      } else {
        setMessage("Some error occured");
      }
    } catch (err) {
      console.log(err);
    }
  };

  

  return (
    <main>
      <Navbar/>
      <span></span>
      <span></span>
      <span></span>
      <Tabs>
    <TabList className='tabs'> 
      <Tab><h4>OUR STOCK</h4></Tab>
      <Tab><h4>ADD PRODUCT</h4></Tab>
    </TabList>

    <TabPanel>
    <section className='menu-section' >
        <div className='title'>
          {/* <h3>OUR STOCK</h3> */}
          {/* <div className='underline'></div> */}
        </div>
        <Menu items={menuItems} />
      </section>
    </TabPanel>
    <TabPanel>
    <span></span>
      {/* <h2>Any content 2</h2> */}
      <div class="center">
      {/* <h2>Add Product</h2> */}
      <form className='addproduct' onSubmit={handleSubmit} >
      <span></span>
      <div class="txt_field">
      <label for="product_type">Product Type :</label>
      {/* <select id="product_type" name="product_type" value={product_type} onChange={(e) => setProduct_Type(e.target.value)}>
      <option value="textiles">Textiles</option>
      <option value="gadgets">Gadgets</option>
      <option value="cosmetics">Cosmetics</option>
      </select> */}
       <input type="text" required name="product_type" value={product_type} onChange={(e) => setProduct_Type(e.target.value)}></input>
      </div>
      <span></span>

      <div class="txt_field">
      <label for="product_type">Product-     :</label>
      <span></span>
      <span></span>
          <input type="textt" required name="product" value={product} onChange={(e) => setProduct(e.target.value)} ></input>
          <span></span>
          {/* <label>Username</label> */}
        </div>
        <span></span>
        <div class="txt_field">
        <label for="imglink">Image Link- :</label>
        <span></span>
          <input type="text" required name="img" value={img} onChange={(e) => setImg(e.target.value)}></input>
          {/* <span></span> */}
        </div>
        {/* <span></span> */}
       <div className='button'>
        <button type="submitt" value="Submit">Submit</button>
        </div>
        
      </form>
    </div>
      

    </TabPanel>
  </Tabs>
      
    </main>
  );
}

export default Products;