import React from 'react';
import Model from './Model';
import './Menu.css'
import './Model.css'

const Menu = (props) => {


  const itemElements = props.items.map((item, index) => {
    return (
      <article className='menu-item' key={index}>
          <img src={item.img} alt="title" className="photo" />
        <div className='item-info'>
          <div className='headersubin'>
          {item.title}
          </div>

            <div className='producttype'>
            Product Type: {item.category}
            <span></span>
            </div>
         <Model 
            items={props.items}
            thiruvalla={item.thiruvalla}
            kottayam={item.kottayam}
            kochi={item.kochi}
            />
         </div>
      </article>
    )
  })

  return (
    <div className='section-center'>
      {itemElements}
    </div>
  )
};

export default Menu;
