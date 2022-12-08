import React, { useState,useEffect, Fragment } from "react";
import ReadOnlyRow from "./ReadOnlyRow";
import EditableRow from "./EditableRow";
import axios from "axios";
import './SupportForm.css'
import Navbar from "../../components/Navbar";
import { distinct } from "@progress/kendo-data-query";
import { RiAddFill } from "react-icons/ri";

import { RxReset } from "react-icons/rx";

const SupportForm = () => {
    const [supports, setSupports] = useState([]);
    const [product,setProduct]=useState([])
    let auth=sessionStorage.getItem('jwt');
    const fetchCustomerProducts= async(data) =>{
      const response=await fetch(
        'http://127.0.0.1:8000/apii/customerorders/',{
             method:'POST',     
             headers: {
               'Accept':'application/json',
               'content-type':'application/json',
               'Authorization':auth
             },
             body:JSON.stringify({
               id:data,
            })}
               
      );
      if (!response.ok){
       throw  new Error('something went wrong!');
      }   
     const responseData=await response.json();
     console.log(responseData)
    const loadedData=[]
    responseData.map((item) =>{
      loadedData.push(item.ProductName)
    })
    console.log(loadedData)
    setProduct(loadedData);  
    }

    const fetchsupportdetails = async () => {
      const response=await fetch(
        'http://127.0.0.1:8000/supportapi/support/',{
          headers:{'Accept':'application/json',

          'Content-Type':'application/json',

          'Authorization':auth}
        }
      );
      if (!response.ok){
       throw  new Error('something went wrong!');
      }   
     const responseData=await response.json();
     
     setSupports(responseData);}
   fetchsupportdetails().catch((error) => {
   })  

    const [addFormData, setAddFormData] = useState({})
  
    const [editFormData, setEditFormData] = useState({});
  
    const [editSupportId, setEditSupportId] = useState(null);

  
  
    const handleAddFormChange = (name,value) => {
  
      // const fieldName = event.target.getAttribute("name");
      // const fieldValue = event.target.value;
      const fieldName = name;
      const fieldValue = value;
      if(name==="customer"){
        fetchCustomerProducts(fieldValue);

      }
      const newFormData = { ...addFormData };
      newFormData[fieldName] = fieldValue;
      setAddFormData(newFormData); 
    };
  
    const handleEditFormChange = (name,value) => {
      // event.preventDefault();
  
      // const fieldName = event.target.getAttribute("name");
      // const fieldValue = event.target.value;
      const fieldName = name;
      const fieldValue = value;
  
const newFormData = { ...editFormData };
      newFormData[fieldName] = fieldValue;
  
      setEditFormData(newFormData);
    };
  
    const handleAddFormSubmit = async(event) => {
      event.preventDefault();
  
      const newSupport = {
        "customer": addFormData.customer,
        "productname": addFormData.productname,
        "supporttype": addFormData.supporttype,
        "remarks": addFormData.remarks,
        "status":addFormData.status
      };
      const response=await fetch(
          'http://127.0.0.1:8000/supportapi/support/',{
               method:"POST", 
               body:JSON.stringify(newSupport),  
               headers: {
                 'Accept':'application/json',
                 'content-type':'application/json',
                 'Authorization':auth,
               }},
               
                 
        );
        const responsedata = await response.json();
        if (response.status === 200) {
          setSupports(responsedata);
          console.log(responsedata)
        } else {
          console.log("Some error occured");
        }
      }
  
    const handleEditFormSubmit = (event) => {
      event.preventDefault();
  
      const editedSupport = {
        customer: editFormData.customer,
        productname: editFormData.productname,
        supporttype: editFormData.support,
        remarks: editFormData.remarks,
        status: editFormData.status
      };
      console.log(editedSupport)
      const newSupports = [...supports];
      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json','Authorization':auth },
        body: JSON.stringify(editedSupport)
    };
        fetch(`http://127.0.0.1:8000/supportapi/editsupport/${editSupportId}`, requestOptions)
        .then(response => response.json())

  
        newSupports[editSupportId]  = editedSupport;
  
      setSupports(newSupports);
      setEditSupportId(null);
    }

    const handleEditClick = (event, support) => {
      event.preventDefault();
      setEditSupportId(support.id);
  
      const formValues = {
        customer: support.customer,
        productname: support.productname,
        supporttype: support.supporttype,
        remarks: support.remarks,
        status:support.status
      };
  
      setEditFormData(formValues);
    };
  
    const handleCancelClick = () => {
      setEditSupportId(null);
    };
  
    const handleDeleteClick = (supportId) => {
      const newSupports = [...supports];
      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json','Authorization':auth },
      }
      axios.delete(`http://127.0.0.1:8000/supportapi/editsupport/${supportId}`,requestOptions)  
      .then(res => {   
    
        const items = supports.filter(item => item.id !== supportId);  
        setSupports(items);  
      })  }
    return (
      <div>
        <Navbar />
        <div className="support-container">
          <h2>SUPPORT</h2>
          <form onSubmit={handleAddFormSubmit} className="supportcard">
          <input
            type="text"
            name="customer"
            required="required"
            placeholder="Enter customerid"
            onChange={(val)=>handleAddFormChange("customer",val.target.value)}
          /><br />

          {/* <label for="subject"></label>     
          <div className=''>
          <select onChange={(val) => handleAddFormChange("customer",val.target.value)}> 
            {result.map(item=>(
            <option key={item.id} value={item.id}>{item.id}</option> 
          ))}
          <option value="">Choose Customer Id</option>
          </select><br></br>

        </div> */}
          {/* <label for="subject"></label> 
          <div className=''>
          <select className=''value={productName} onChange={handlenameChange}> 
            {result.map(item=>(
            <option key={item.id}>{item.title}</option> 
          ))}
          <option value="">Choose Product</option>
          </select><br></br>
          </div> */}
          <select onChange={(val) => handleAddFormChange("productname",val.target.value)}>
          <option  value="">Choose Product</option>
          {product.map(item=>(
          <option value={item}>{item}</option> 
        ))}
 
        </select><br></br>
        <select onChange={(val) => handleAddFormChange("supporttype",val.target.value)}>
        <option value="" selected>Enter kind of support needed </option>
        <option value="Product Use & Support">Product Use & Support</option>
        <option value="Product Service">Product Service</option>
        <option value="Product Spare Parts">Product Spare Parts</option>
        </select><br />
        <input
          type="text"
          name="remarks"
          placeholder="Enter Remarks if any"
          onChange={(val) => handleAddFormChange("remarks",val.target.value)} /><br />
        <select onChange={(val) => handleAddFormChange("status",val.target.value)}>
        <option value="" selected>Status</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
        <option value="Not Initiated">Not Initiated</option>
        </select><br />
        <div >
          <button type="Submit" className="buttonsupportsubmitreset"><RiAddFill></RiAddFill></button>
          <span></span>
          <button type="Reset" className="buttonsupportsubmitreset"><RxReset></RxReset></button>
        </div>
        </form></div>
      <form onSubmit={handleEditFormSubmit}>
          <table className="supporttable">
            <thead>
              <tr>
                <th>customerid</th>
                <th>productname</th>
                <th>Support</th>
                <th>Remarks</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {supports.map((support) => (
                <Fragment>
                  {editSupportId === support.id ? (
                    <EditableRow
                      editFormData={editFormData}
                      handleEditFormChange={handleEditFormChange}
                      handleCancelClick={handleCancelClick} />
                  ) : (
                    <ReadOnlyRow
                      support={support}
                      handleEditClick={handleEditClick}
                      handleDeleteClick={handleDeleteClick} />
                  )}
                </Fragment>
              ))}
            </tbody>
          </table>
        </form></div>
    );
  };

  export default SupportForm;