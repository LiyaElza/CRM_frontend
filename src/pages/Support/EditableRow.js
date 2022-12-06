import React from "react";
import { useState } from "react";
import { MdOutlineSaveAlt } from "react-icons/md"

import { MdCancel } from "react-icons/md"
import './SupportForm.css';

const EditableRow = ({
  editFormData,
  handleEditFormChange,
  handleCancelClick,
}) => {
  return (
    <tr>
      <td>
        {editFormData.customer}
        
      </td>
      <td>
        {editFormData.product}
      </td>
      <td>
       {editFormData.supporttype}
       </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter remarks"
          name="remarks"
          value={editFormData.remarks}
          onChange={(val) => handleEditFormChange("remarks",val.target.value)}
        ></input>
        
      </td>
      <td>
      <select value={editFormData.support} onChange={(val) => handleEditFormChange("status",val.target.value)}>
         <option value="" selected>Status</option>
         <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
        <option value="Not Initiated">Not Initiated</option>
        
       </select>
       </td>
      <td>
        <button  className="buttonsupportsubmitreset" type="submit"><MdOutlineSaveAlt></MdOutlineSaveAlt></button>
        <span></span>
        <button  className="buttonsupportsubmitreset" type="button" onClick={handleCancelClick}>
          <MdCancel></MdCancel>
        </button>
      </td>
    </tr>
  );
};

export default EditableRow;