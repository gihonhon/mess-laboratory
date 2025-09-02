import React from 'react'
import './Button.css'

const Button = ({props, onButtonClick,type}) => {
    return <div className={`Button ${props === '0' ? 'zero' : '' } ${type || ''}`} onClick={onButtonClick(props)}>
        {props}
        </div>
}

export default Button