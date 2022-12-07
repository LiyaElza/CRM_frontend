import axios from 'axios';
import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import './Message.css'

function Message() {
    const[emailsubject,setEmailsub]=useState('')
    const[emailmsg,setEmailMsg]=useState('')
    const[message,setMessage]=useState('')
    const[alertsubject,setAlertSubject]=useState(false)
    const[alertmsg,setAlertMsg]=useState(false)
    // const[send,setSend]=useState('')

    const handleEmailsub=(event)=>{
        setEmailsub(event.target.value)
    }
    const handleEmailMsg=(event)=>{
        setEmailMsg(event.target.value)
    }
    const sendButton=async(event)=>{
      event.preventDefault();
      const data={"subject":emailsubject,"message":emailmsg}
      axios.post('http://127.0.0.1:8000/mailapp/mail/',data)
      .then(function (response) {
        if(response?.status===200)
        console.log(message)
        else
          setMessage("Message Sent")
      })

      if(emailsubject.length==0){
        setAlertSubject("Please enter the subject");
      }
      if(emailmsg.length==0){
        setAlertMsg("Please enter the Message");
      }



      setEmailsub('');
      setEmailMsg('');
      setMessage('');
      };
      return(
        <div>
          <Navbar />
       <div className='emailbackground'>
          <form onSubmit={sendButton}>
              <div className='emailcover'>
              <label for ="messagelabel"className='Messageheadlabel' ><h2>Message</h2></label>
              <div className='subjectbox' value={emailsubject} onChange={handleEmailsub}>
              <label for ="msgSubject"className='Subjectheadlabel' id='star'>Subject</label><br />
              <input 
              type="text"
              id="emailsub"
              name=''
              placeholder='Enter the subject'
              className="emailsub"
              
              ></input>
              <div className='subin'>

{alertsubject}

</div>
              </div>
              <div className='emailmsg' value={emailmsg} onChange={handleEmailMsg}>
               <label for ="msgSubject"className='msgHead'  id='star'>Message</label>
               <br></br>
              <textarea 
              type="text"
              id="mailtext"
              name=''
              placeholder='Enter the message'
              className="mailtext"
              
              ></textarea>
              <div className='subin'>

{alertmsg}

</div>
              </div>
          
              <div className='emailbuttondiv'>
             <button className='emailButton' type="Submit">Send </button>
             </div>
             <div className='mailalert'>{message}</div>
             </div>
          </form>
       </div>
       </div>);
      }
      export default Message