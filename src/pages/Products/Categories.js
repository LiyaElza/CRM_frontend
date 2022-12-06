import React from 'react';

const Categories = (props) => {
  const categoryButtons = props.categories.map((category, index) => {
    return (
      <button key={index} type="button" className='filter-btn' onClick={() => props.filterItems(category)}>{category}</button>
    )
  })

  return (
    <div className='btn-container'>
      {categoryButtons}
    </div>
  )
};

export default Categories;
