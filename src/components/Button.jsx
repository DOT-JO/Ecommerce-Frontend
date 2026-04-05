import React from 'react'
import { Navigate } from 'react-router-dom'

const Button = ({text,onClick,children,disabled}) => {

  return (
    <div>
        <button type='button'  disabled={disabled}  onClick={onClick} style={{width:"110px",height:"30px",borderRadius:"0.5rem",cursor:"pointer",border:"1px solid",color:"#333", borderColor:"#333",fontSize:"13px",fontWeight:"900", cursor: disabled ? 'not-allowed' : 'pointer'}}>
            {text}
            {children}
        </button>
    </div>
  )
}

export default Button