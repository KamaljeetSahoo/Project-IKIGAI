import React from 'react'
import DietChat from './DietChat'
import FoodList from './FoodList'

const Diet = () => {
  return (
    <div>
      <div className='container mt-4'>
        <DietChat/>
        <FoodList/>
      </div>
    </div>
  )
}

export default Diet