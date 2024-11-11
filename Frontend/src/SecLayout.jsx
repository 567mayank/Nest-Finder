import React from 'react'
import { Outlet } from 'react-router-dom'

function SecLayout() {
  return (
    <div>
      <Outlet/>
    </div>
  )
}

export default SecLayout