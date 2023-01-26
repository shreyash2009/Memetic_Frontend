import React from 'react'
import '.././Styles/home.css'
const Loader = () => {
  return (
    <div style={
        {
          display:'flex',
          justifyContent:'center'
        }
      }>
        <span class="loader" style={{ width: "3rem", height: "3rem", marginTop:'300px' }}></span>
    </div>
  )
}

export default Loader