import React, { useEffect, useState } from 'react'; 
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import './List.css';
import DataTable from "react-data-table-component";
import Button from 'react-bootstrap/Button';

function List() {
  const [contacts, setContacts] = useState([]);
  const [filtercontacts, setFilterContacts] = useState([]);
  const [customerOrders,setCustomerOrders]=useState([]);
  const [search, setSearch] = useState('');
  const [searchh, settSearch] = useState(''); 
  const [innerSearch, setInnerSearch] = useState('');


    useEffect(()=>{
      const fetchCustomerDetails = async () => {
       const response=await fetch(
         'http://127.0.0.1:8000/apii/customers/'
       );
       if (!response.ok){
        throw  new Error('something went wrong!');
       }   
      const responseData=await response.json();
      
      const loadedCustomerDetails=[];
      for (const key in responseData){
        loadedCustomerDetails.push({
          id:responseData[key].id,
          first_name: responseData[key].FirstName,
          last_name: responseData[key].LastName,
          email: responseData[key].Email,
          phone: responseData[key].PhoneNumber,
        });
      }
      setContacts(loadedCustomerDetails);
      setFilterContacts(loadedCustomerDetails);
    };
    fetchCustomerDetails().catch((error) => {
    })  
    },[])

    const [modal, setModal] = useState(false);
    const toggleModal = () => {
    setModal(!modal);
    };

    function handleChange(data){
      setModal(!modal);
      // console.log(data)
      
      const fetchCustomerOrderDetails = async () => {
       const response=await fetch(
         'http://127.0.0.1:8000/apii/customerorders/',{
              method:'post',     
              headers: {
                'Accept':'application/json',
                'content-type':'application/json'
              },
              body:JSON.stringify({
                id:data,
             })}
                
       );
       if (!response.ok){
        throw  new Error('something went wrong!');
       }   
      const responseOrderData=await response.json();
      //  console.log(responseOrderData);
     setCustomerOrders(responseOrderData);    
    };
    fetchCustomerOrderDetails().catch((error) => {
    })  
    }
    
    useEffect(()=>{
      const result=contacts.filter((ev)=>{
        return ev.first_name.toLowerCase().match(searchh.toLowerCase());
      });
      setFilterContacts(result);
    },[searchh])


    const columns = [
      {
        name: "First Name",
        selector: (row) => row.first_name,
        sortable:true,
      },
      {
        name: "Last Name",
        selector: (row) => row.last_name,
      },
      {
        name: "Email",
        selector: (row) => row.email,
      },
      {
        name: "Phone",
        selector: (row) => row.phone,
      },
      {
        name: "Action",
        cell: (row)=><Button variant="success" onClick={(event) => handleChange(row.id)}>Product List</Button>,
      },
  
      
    ];
  
  

  return (
  <div>
    <div className="container">
        <h1 className='text-center mt-4'>Customer Data</h1>
    <DataTable 
    columns={columns}
    data={filtercontacts} 
    pagination
    className='datatable' 
    fixedHeaderScrollHeight='40px'
    selectableRowsHighlight
    highlightOnHover
    subHeader
    subHeaderComponent={<input 
      type='text' 
      placeholder='Search here'
      className='search'
      value={searchh}
      onChange={(e)=>settSearch(e.target.value)}
      />}

    />

        

{modal && (
  <div className="modal">
    <div onClick={toggleModal} className="overlay"></div>
    <div className="modal-content">

    <h3><strong>Customer Purchase History</strong></h3>
      <Form>
          <InputGroup className='my-3'>
            <Form.Control className='search'
              onChange={(e) => setInnerSearch(e.target.value)}
              placeholder='Search Product Name'
            />
          </InputGroup>
      </Form>
   
      <Table striped bordered hover className='table1'>
          <thead>
            <tr className='row1'>
              <th>Product id</th>
              <th>Productname</th>
              <th>Price</th>
              <th>Order ID</th>   
            </tr>
          </thead>
        <tbody>
          {customerOrders
              .filter((item) => {
                return innerSearch.toLowerCase() === ''
                  ? item
                  : item.ProductName.toLowerCase().includes(innerSearch);
              })
              .map((item, index) => (
                <tr key={index}>
                  <td>{item.ProductId}</td>
                  <td>{item.ProductName}</td>
                  <td>{item.Amount}</td>
                  <td>{item.orderId}</td>
                </tr>
              )) }
        </tbody>
      </Table>

      <button className="close-modal" onClick={toggleModal}> X </button>
   
      </div>
    </div>

   )}
    </div>
</div>
  );
}

export default List;
