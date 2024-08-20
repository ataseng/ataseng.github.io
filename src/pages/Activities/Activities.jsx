import React from 'react'
import './Activities.css'
import Data from './Data/ActivitiesData.json'
import { Link, Outlet } from 'react-router-dom'
const Activities = () => {
  return (
    <>
    <h2>Activities Page</h2>
        {
            Data.map((item,key) => (
                <Link style={{display:"flex",textDecoration:"none"}} key={key} to={`${item.path}`}>{item.name}</Link>
              ))
        }
        <Outlet/>
    </>
  )
}

export default Activities