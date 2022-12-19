import { useState,useEffect } from "react";
import axios from 'axios';
import './PlusOffer.css';

function PlusOffers(){
    const[offerPlusMsg,setofferPlusMsg]=useState('');
    const[creditvalue,setCreditValue]=useState('');
    const[startdate,setStartDate]=useState('');
    const[enddate,setEndDate]=useState('');
    const[alertMsg,setAlertMsg]=useState('');
    const[error,setError]=useState(false);
    const [availableoffers, setAvailableOffers] = useState([]);
    const[errorStartDate,setErrorStartDate]=useState(false);
    const handleOfferPlusMsg=(event)=>{
        setofferPlusMsg(event.target.value)
      } 
      const handleStartDate=(event)=>{
        setStartDate(event.target.value)
      } 
      const handleEndDate=(event)=>{
        setEndDate(event.target.value)
      } 
      const handleCreditValue=(event)=>{
        setCreditValue(event.target.value)
      } 
      let addButton = async (e) => {
        e.preventDefault();
        try {
          let res = await fetch("http://127.0.0.1:8000/offer/specialoffer/", {
            method: "POST",
            body: JSON.stringify({
              offer:offerPlusMsg,
              startDate:startdate,
              endDate:enddate,
              minCredits:creditvalue,
              
            }),
            headers:{
              'Accept':'application/json',
              'Content-Type':'application/json',
            }
          });
    
          if(offerPlusMsg.length==0){
    
            setError("Enter Message");
    
           }
           if(startdate.length==0){
            setErrorStartDate("Select date");
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
          setStartDate('');
          setEndDate('');
          setCreditValue('');
    
          
        } catch (err) {
          console.log(err);
        }
      }; 
      useEffect(() => {
        const availOffers = async () => {
          axios.get("http://127.0.0.1:8000/offer/specialoffer/")
          .then(response => {
            setAvailableOffers(response.data);
          });
        };
        availOffers().catch((error) => {
    
        });
    
      }, []);
    
  
    return(
        <div>
        <div class="container">
            <form onSubmit={addButton} className="offerform">
            <div className='offerformform'>
        <div className='inneroffer'>
          
            <label for="subject" id="Pstar" className="premium"><b>Premium Customers</b></label><br></br>
            <br>
            </br>
            < div className='datesection'>
            <br></br>
            <label for="subject" id="pstar">Start Date</label>
            <div className='startdate' value={startdate} onChange={handleStartDate}>
           <input type="date" id="startdate" name="startdate"></input>
           </div>
           <div className='msgAlert'>{errorStartDate}</div>
           <label for="subject" id="pstar">End Date</label>
            <div className='startdate' value={enddate} onChange={handleEndDate}>
           <input type="date" id="enddate" name="enddate"></input>
           </div>
           </div>
           <br></br>
           <div className="mincredit">
           <label for="subject" id="pstar">Min Credits : </label><br></br>
      <div className='credit' value={creditvalue} onChange={handleCreditValue}>
       <input
       type="number"
       id="subject"
       className='creditinside'
       defaultValue={6} 
       min="6"
       
       ></input>
       </div>
       </div>
       <br></br>
           <label for="subject" id="pstar">Message : </label> <br></br>
<div className='pmsg' value={offerPlusMsg} onChange={handleOfferPlusMsg}>
       <textarea
       type="text"
       id="psubject"
       name=''
       className='txtarea'  
       placeholder='Enter the msg'
       
       ></textarea>
       </div>
       <div className='msgAlert'>

    {error}

    </div>
    <div>
       <button className='buttonask' type="Submit">Submit</button>
       </div>
       <div className='alertSend'>

    {alertMsg}

    </div>
    </div>
       </div>
            </form>
        </div>
        <div>
        <span></span>
        <table className='tableoffer'>
          <thead>
            <tr className='row'>
              <th>Offer </th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Minimum Credits</th>
            </tr>
          </thead>
          <tbody>
         { availableoffers.map((item,index) => {
                return(
                <tr key={index}>

                  <td>{item.offer}</td>
                  <td>{item.startDate}</td>
                  <td>{item.endDate}</td>
                  <td>{item.minCredits}</td>
                  </tr>);
})}
          </tbody>
        </table>

    </div>
        </div>
    );
}
export default PlusOffers;
