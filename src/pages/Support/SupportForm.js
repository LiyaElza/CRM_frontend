import React, { useState, Fragment } from "react";
import ReadOnlyRow from "./ReadOnlyRow";
import EditableRow from "./EditableRow";
import axios from "axios";
import './SupportForm.css'
import Navbar from "../../components/Navbar";

const SupportForm = () => {
    const [supports, setSupports] = useState([]);
    const fetchsupportdetails = async () => {
      const response=await fetch(
        'http://127.0.0.1:8000/supportapi/support/'
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
  
    const handleAddFormChange = (event) => {
      event.preventDefault();
  
      const fieldName = event.target.getAttribute("name");
      const fieldValue = event.target.value;
  
      const newFormData = { ...addFormData };
      newFormData[fieldName] = fieldValue;
  
      setAddFormData(newFormData); 
    };
  
    const handleEditFormChange = (event) => {
      event.preventDefault();
  
      const fieldName = event.target.getAttribute("name");
      const fieldValue = event.target.value;
  
      const newFormData = { ...editFormData };
      newFormData[fieldName] = fieldValue;
  
      setEditFormData(newFormData);
    };
  
    const handleAddFormSubmit = async(event) => {
      event.preventDefault();
  
      const newSupport = {
        "customer": addFormData.customer,
        "product": addFormData.product,
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
                 'content-type':'application/json'
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
        product: editFormData.product,
        supporttype: editFormData.support,
        remarks: editFormData.remarks,
        status: editFormData.status
      };
      console.log(editedSupport)
      const newSupports = [...supports];
      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
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
        product: support.product,
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
      axios.delete(`http://127.0.0.1:8000/supportapi/editsupport/${supportId}`)  
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
              placeholder="Enter customer Id"
              onChange={handleAddFormChange} /><br />
            <input
              type="text"
              name="product"
              required="required"
              placeholder="Enter product Id"
              onChange={handleAddFormChange} /><br />
            <input
              type="text"
              name="supporttype"
              required="required"
              placeholder="Enter Support Needed"
              onChange={handleAddFormChange} /><br />
            <input
              type="text"
              name="remarks"
              placeholder="Enter Remarks if any"
              onChange={handleAddFormChange} /><br />
            <input
              type="text"
              name="status"
              required="required"
              placeholder="Enter Status"
              onChange={handleAddFormChange} />
        <div>
          <button type="Submit">Add</button>
          <button type="Reset">Reset</button>
        </div>
        </form></div>
      <form onSubmit={handleEditFormSubmit}>
          <table className="supporttable">
            <thead>
              <tr>
                <th>customerid</th>
                <th>productid</th>
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