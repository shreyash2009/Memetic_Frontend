import React from 'react'
import img from '../Assets/404.gif'
const PageNotFound = () => {
  return (
    <div style={{display:'flex', justifyContent:"center", alignItem:"center"}}>
        <img src={img} alt="img" style={{display:"block"}}/>
        <p className='mt-5'>Page Not Found </p>
    </div>
  )
}

export default PageNotFound