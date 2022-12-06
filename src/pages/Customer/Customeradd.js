import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Customer.css';
import CustomerModel from './CustomerModel';
const Customeradd = () => {
     const [selectedFile,setState] = useState(null);

    // On file select (from the pop up)
    const onFileChange = event => {
    // Update the state
        setState(event.target.files[0]);
    };


    const onFileUpload = (e) => {
        e.preventDefault();
        setState(e.target.files);

        const formData = new FormData();
        formData.append('employeedetails',selectedFile);
        fetch('http://127.0.0.1:8000/employee/addemployee/', {method: 'post',body: formData})
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
                    <p>File Name: {selectedFile.name}</p>
                    <p>
                        Last Modified:{" "}
                        {selectedFile.lastModifiedDate.toDateString()}
                    </p>
                </div>
            );
        } else {
            return (
                <div className='warnchoose'>
                    <br />

                    <h6>*️⃣Choose before Pressing the Upload button</h6>

                 
                </div>
            );
        }
    };
   
        return (
            <div className='manage'>
                <div className='upload'>
                    <h4>
                        Upload customer details
                    </h4>
                    <div>

                        <br></br>
                        <input type="file" onChange={onFileChange} />
                        <button onClick={onFileUpload}>
                            Upload!
                       
                        </button>
                        </div>
                    <div className='filedata'>{fileData()}</div>
                    <CustomerModel/>
                    </div>
                </div>
            );
       
    }


export default Customeradd;