import React from 'react'

const CustomButton = ({title, style, onClick}: CustomButtonProps) => {
  return (
    <div>
        <button onClick={onClick} className={style}>
            {title}
        </button>
    </div>
  )
}

export default CustomButton