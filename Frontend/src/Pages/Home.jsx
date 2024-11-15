import React from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()
  return (
    <div className='ml-64'>
      <div>Home</div>
      <button onClick={()=>navigate("/login", { state: { from: location.pathname } })}>Hello</button>
    </div>
  )
}

export default Home