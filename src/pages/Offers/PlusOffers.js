import { useState,useEffect } from "react";
import axios from 'axios';

function PlusOffers(){
    const[offerPlusMsg,setofferPlusMsg]=useState('');
    const[alertMsg,setAlertMsg]=useState('');
    const[error,setError]=useState(false);
    const [specialoffer, setSpecialOffer] = useState([]);
    const handleOfferPlusMsg=(event)=>{
        setofferPlusMsg(event.target.value)
      } 
      let addButton = async (e) => {
        e.preventDefault();
        try {
          let res = await fetch("http://127.0.0.1:8000/aoffer/specialoffer/", {
            method: "POST",
            body: JSON.stringify({
              offer:offerPlusMsg,
            }),
            headers:{
              'Accept':'application/json',
              'Content-Type':'application/json',
            }
          });
    
          if(offerPlusMsg.length==0){
    
            setError("Please enter the offer Message");
    
           }
    
           if(res.status===201)
    
           {
    
             setAlertMsg("Offer Added...Alert sent to customers");
    
          }
    
          else
    
           {
    
            setAlertMsg("Ooops!.... Adding Offer Failed...!");
    
           }
          setofferPlusMsg('');
    
          
        } catch (err) {
          console.log(err);
        }
      }; 
      useEffect(() => {
        const productdetails = async () => {
          axios.get("http://127.0.0.1:8000/aoffer/specialoffer/")
          .then(response => {
            setSpecialOffer(response.data);
          });
        };
        productdetails().catch((error) => {
    
        });
    
      }, []);
    
  
    return(
        <div>
        <div class="container">
            <form onSubmit={addButton} className="offerform">
            <label for="subject" id="star">For Premium Customers</label><br></br>
            <label for="subject" id="star">Offers</label> <br></br>
<div className='msg' value={offerPlusMsg} onChange={handleOfferPlusMsg}>
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
            </form>
        </div>
        <div>
        <span></span>
        <table className='tableoffer'>
          <thead>
            <tr className='row'>
              <th>Offer </th>
            </tr>
          </thead>
          <tbody>
         { specialoffer.map((item,index) => {
                return(
                <tr key={index}>
                  <td>{item.offer}</td>
                  </tr>);
})}
          </tbody>
        </table>

    </div>
        </div>
    );
}
export default PlusOffers;