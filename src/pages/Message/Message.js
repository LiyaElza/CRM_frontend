import axios from 'axios';
import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import './Message.css'

function Message() {
    const[emailsubject,setEmailsub]=useState('')
    const[emailmsg,setEmailMsg]=useState('')
    const[message,setMessage]=useState('')
    const handleEmailsub=(event)=>{
        setEmailsub(event.target.value)
    }
    const handleEmailMsg=(event)=>{
        setEmailMsg(event.target.value)
    }
    let sendButton=async(e)=>{
        const data={"subject":emailsubject,"message":emailmsg}
        axios.post('http://127.0.0.1:8000/mailapp/mail/',data)
        .then(function (response) {
          if(response?.status===200)
            window.history.go(0)
          else
              alert(response?.message)
        
        })
        setEmailsub('');
        setEmailMsg('');
      };
 return(
  <div>
    <Navbar />
 <div className='emailbackground'>
    <form onSubmit={sendButton}>
        
        <div className='emailcover'>
        <label for ="messagelabel"className='Messageheadlabel'><h3>Message</h3></label>
        <div className='subjectbox' value={emailsubject} onChange={handleEmailsub}>
        <label for ="msgSubject"className='Subjectheadlabel'>Subject</label><br />
        <input 
        type="text"
        id="emailsub"
        name=''
        className="emailsub"
        required
        ></input>
        </div>
        <div className='emailmsg' value={emailmsg} onChange={handleEmailMsg}>
         <label for ="msgSubject"className='msgHead'>Message</label>
         <br></br>
        <textarea 
        type="text"
        id="mailtext"
        name=''
        className="mailtext"
        required
        ></textarea>
        </div>
    
        <div className='emailbutton'>
       <button className='emailButton' type="Submit">Send </button>
       </div>
       {message}
       </div>
    </form>
 </div>
 </div>);
}
export default Message