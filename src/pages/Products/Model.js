import React, { useState } from "react";
import "./Model.css";

const Model=(props)=> {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  if(modal) {
    document.body.classList.add('active-modall')
  } else {
    document.body.classList.remove('active-modall')
  }

  return (
    <>
    <span></span>
      <button onClick={toggleModal} className="btn-modall">
      Availiable Stocks
      </button>
    
      {modal && (
        <div className="modall">
          <div onClick={toggleModal} className="overlayy"></div>
          <div className="modal-contentt">
            <p></p>
            <p>Thiruvalla: {props.thiruvalla}</p>
            <p>kottayam: {props.kottayam}</p>
            <p>Kochi: {props.kochi}</p>
            <button className="close-modall" onClick={toggleModal}>
              Close
            </button>
          </div>
        </div>
      )}

    </>
  );
}
export default Model;