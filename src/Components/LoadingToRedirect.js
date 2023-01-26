import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
const LoadingToRedirect = () => {
    const [count, setCount] = useState(5);
    const navigate = useNavigate()
    useEffect(()=>{
        const interval = setInterval(()=>{
            setCount((curr)=> --curr)
        },1000)

        count ===0 && navigate('/login');
        return ()=> clearInterval(interval);
    },[count, navigate])
  return (
    <div style={{ marginTop: "100px", textAlign:'center' }}>
        <p>You can't access this page without logging in to the site
            Redireccting you to the login page in {count} secs
        </p>
    </div>
  )
}

export default LoadingToRedirect