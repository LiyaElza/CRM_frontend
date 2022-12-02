import React from 'react'

import './Statuscard.css'


const StatusCard = props => {
    return (
        <div className='status-card'>
            <div className="status-card__icon">
                {props.icon}
            </div>
            <span></span>
            <div className='content'>
            <div className='title'>
            {props.title}
            </div>
                <div className='header'>
                {props.count}
                </div>
            </div>
        </div>
    )
}

export default StatusCard