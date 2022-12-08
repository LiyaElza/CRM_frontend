import React ,{useState,Axios, useEffect} from 'react';
// import Products from '../Products/Products';
import './Form.css';
import axios from 'axios';
import { distinct } from '@progress/kendo-data-query';




function Form() {
 // array declare
// const [offer, setOfferState] = React.useState(offerDetails);
// const [selectedDay, setSelectedDay] = useState(null);
  const[productType,setProductType]=useState('')
  const[productName,setProductName]=useState('')
  const[offerMsg,setOfferMsg]=useState('')
  const [product,setProduct]=useState([])
  const [menuItems, setMenuItems] = useState([]);

  const[error,setError]=useState(false);
  const[errorproductType,setProductTypeError]=useState(false);
  const[errorproductName,setProductNameerror]=useState(false);
  const[alertMsg,setAlertMsg]=useState('');
  let auth=sessionStorage.getItem('jwt');
  useEffect(()=>{
      const fetchData=async ()=>{
      const response=await fetch('http://127.0.0.1:8000/app/products/',{headers:""})
      const newData=await response.json();
      setProduct(newData);
      console.log(newData);
    }
    fetchData();
  },[]);
   const handletypeChange=(event)=>{
     setProductType(event.target.value)
   } 
   const handlenameChange=(event)=>{
    setProductName(event.target.value)
   } 
   const handleOfferMsg=(event)=>{
    setOfferMsg(event.target.value)
   }


   useEffect(() => {
    const productdetails = async () => {
      let config = {
        headers: {
          'Authorization': auth
        },}
      axios.get("http://127.0.0.1:8000/aoffer/offer/",config)
      .then(res => {
        setMenuItems(res.data);
      });
    };
    productdetails().catch((error) => {

    });

  }, []);




   let addButton = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("http://127.0.0.1:8000/aoffer/offer/", {
        method: "POST",
        body: JSON.stringify({
          id:menuItems[menuItems.length-1].id+1,
          product_type:productType,
          product: productName,
          message:offerMsg,
        }),
        headers:{
          'Accept':'application/json',
          'Content-Type':'application/json',
          'Authorization':auth,
        }
      });

      if(offerMsg.length==0){

        setError("Please enter the offer Message");

      }

      if(productType.length==0)

      {

        setProductTypeError("Please select the Product Type");

      }

      if(productName.length==0)

      {

        setProductNameerror("Please select the Product Name");

      }

      if(res.status===201)

      {

        setAlertMsg("Offer Added...Alert sent to customers");

      }

      else

      {

        setAlertMsg("Ooops!.... Adding Offer Failed...!");

      }
    
      setProductType('');
      setProductName('');
      setOfferMsg('');

      
    } catch (err) {
      console.log(err);
    }
  };  
  // let uniquedate=[new Set(product)]
  const result = distinct(product, "category");
  return (

    <div class="container">
    <form onSubmit={addButton} className="offerform">
      <div className='offerformform'>
        <div className='inneroffer'>
  <label for="subject" id="star">Product Type</label>     
  <div className=''>
 <select className=''value={productType} onChange={handletypeChange}> 
 {result.map(item=>(
    <option key={item.id}>{item.category}</option> 
  ))}
  <option value="">Choose Product Type</option>
 </select>
 <div className='subin'>

    {errorproductType}

    </div>
 
 
 </div>

 <label for="subject" id="star">Product Name</label> 
 <select className=''value={productName} onChange={handlenameChange}>
 <option  value="">Choose Product</option>
  {product.map(item=>(
    <option key={item.id}>{item.title}</option> 
  ))}
 
 </select>
 <div className='subin'>

    {errorproductName}

    </div>

    
    
      <label for="subject" id="star">Offers</label> <br></br>
<div className='msg' value={offerMsg} onChange={handleOfferMsg}>
       <textarea
       type="text"
       id="subject"
       name=''
       className='txtarea'  
       placeholder='Enter the msg'
       
       ></textarea>
       </div>
       <div className='subin'>

    {error}

    </div>

   <div>
       <button className='buttonask' type="Submit">Submit</button>
       </div>
       <div className='akshay'>

    {alertMsg}

    </div>
       </div>
       </div>
    </form>
   
  </div>
  );
};

export default Form;
