import React from "react";

const ReadOnlyRow = ({ support, handleEditClick, handleDeleteClick }) => {
  return (
    <tr>
      <td>{support.customer}</td>
      <td>{support.product}</td>
      <td>{support.supporttype}</td>
      <td>{support.remarks}</td>
      <td>{support.status}</td>
      <td>
      <button
          type="button"
          onClick={(event) => handleEditClick(event, support)}
        >
          Edit
        </button>
        <button type="button" onClick={() => handleDeleteClick(support.id)}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;