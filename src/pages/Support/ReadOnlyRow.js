import React from "react";
import { FiEdit3 } from "react-icons/fi";
import './SupportForm.css';

import { RiDeleteBin6Line } from "react-icons/ri";

const ReadOnlyRow = ({ support, handleEditClick, handleDeleteClick }) => {
  return (
    <tr>
      <td>{support.customer}</td>
      <td>{support.product}</td>
      <td>{support.supporttype}</td>
      <td>{support.remarks}</td>
      <td>{support.status}</td>
      <td>
      <button className="buttonsupportsubmitreset"
          type="button"
          onClick={(event) => handleEditClick(event, support)}
        ><FiEdit3></FiEdit3>
          
        </button>
        <span></span>
        <button  className="buttonsupportsubmitreset" type="button" onClick={() => handleDeleteClick(support.id)}>
          <RiDeleteBin6Line></RiDeleteBin6Line>
        </button>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;