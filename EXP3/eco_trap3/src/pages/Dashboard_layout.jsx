import React from 'react'
import { Outlet } from 'react-router-dom'

export default function Dashboard_layout() {
  return (
    <>
      <h1>Dashboard_layout</h1>
    
      <Outlet/>
    </>
  )
}
