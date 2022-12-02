import React, { useEffect, useState } from 'react'; 
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import './List.css';

function List() {
  const [contacts, setContacts] = useState([]);
  const [customerOrders,setCustomerOrders]=useState([]);
  const [search, setSearch] = useState('');
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

  return (
  <div>
    <Container className="container">
        <h1 className='text-center mt-4'>Customer Data</h1>
        <Form>
          <InputGroup className='my-3'>
            <Form.Control className='search'
              onChange={(e) => setSearch(e.target.value)}
              placeholder='Search customers'
            />
          </InputGroup>
        </Form>

        <Table className='customertable'>
          <thead>
            <tr className='row'>
              <th>FirstName</th>
              <th>LastName</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts
              .filter((item) => {
                return search.toLowerCase() === ''
                  ? item
                  : item.first_name.toLowerCase().includes(search);
              })
              .map((item, index) =>( 
                <tr key={index}>
                  <td>{item.first_name}</td>
                  <td>{item.last_name}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
               
<button onClick={(event) => handleChange(item.id)} className="btn-modal">
ProductList
</button>

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

          </tr>
              ))}
          </tbody>
        </Table>
    </Container>
</div>
  );
}

export default List;
