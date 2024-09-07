import React from 'react'
import './SearchFilter.css'

const SearchFilter = ({setFiltered}) => {

  
  return (
    <div className="search-filter">
        <input onChange={(e => {setFiltered(e.target.value)})}  type="text" placeholder='yarışma ara...' />
    </div>
  )
}

export default SearchFilter