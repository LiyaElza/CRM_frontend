import React from 'react';
import { useState , useEffect } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Menu from './Menu';
import './Products.css';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import 'react-tabs/style/react-tabs.css';
import Modal1 from './Modal1';

function Products() {
  const [menuItems, setMenuItems] = useState([]);
  const [selectedFile,setState] = useState(null);


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



  // On file select (from the pop up)
  const onFileChange = event => {
      setState(event.target.files[0]);
  };
  const onFileUpload = (e) => {
      e.preventDefault();
      setState(e.target.files)
      const formData = new FormData()
      formData.append('file',selectedFile)
      console.log(formData)
      fetch('http://127.0.0.1:8000/app/productsupload/', {method: 'POST',body:formData})
      .then(res => {
          if (res.ok) {
              console.log(res.data);
              alert("File uploaded successfully.")
          }
      });
  };

 
  const fileData = () => {
      if (selectedFile) {
          return (
              <div className='detailsShown'>
                  <h6>File Details:</h6>
                  <p>File Name: {selectedFile.name}</p><br></br>
                  <p className='date'>
                      Last Modified:{" "}
                      {selectedFile.lastModifiedDate.toDateString()}
                  </p>
              </div>
          );
      }


      else {
        return (
          <div>
              <br />
              <h6>Choose before Pressing the Upload button</h6>
          </div>
      );
  }
  }

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
        <div className='title'></div>
        <Menu items={menuItems} />
      </section>
    </TabPanel>
  <TabPanel>


  <div className='manage'>
                <div className='upload'>
                    <h3>
                        Add New Products
                    </h3>
                    <div>
                        <br></br>
                        <input type="file" onChange={onFileChange} />
                        <button onClick={onFileUpload}>
                            Upload
                        </button>
                    </div>
                    <div className='filedata'>{fileData()}</div>
                  
                  <Modal1></Modal1>
                </div>
            </div>

  </TabPanel>
  </Tabs>   
    </main>
  );

}

export default Products;