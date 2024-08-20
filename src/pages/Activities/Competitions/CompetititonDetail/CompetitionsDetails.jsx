import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import Data from '../Data/CompetitionsData.json'

const CompetitionsDetails = () => {
  
  const {title} = useParams()

  const formattedTitle = title.split('-').join(" ")
  .split(' ')
  .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
  .join(' ')

  const competition = Data.find(item => item.title === formattedTitle)

  if(!competition){
    return <h2>Competition Not Found</h2>
  }

  console.log(formattedTitle);
  
  
  return (
    <>
    <ul>
      <li>{competition.title}</li>
      <li>{competition.content}</li>
      <li>{competition.location}</li>
      <li>{competition.date}</li>
      <li>{competition.time}</li>
      </ul>
    </>
  )
}

export default CompetitionsDetails