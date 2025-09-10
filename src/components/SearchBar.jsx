import React from 'react'
import iconHouse from '/Vector (1).png'
import { AppBar, Toolbar } from '@mui/material'

function SearchBar() {
  return (
    <div className='container mx-auto my-3'>
        <div className='border border-sky-500 flex gap-3.5 p-3'>
            <img src={iconHouse} alt="" className='w-[30px]'/>
            <input type="text" className='outline-0 text-black flex-1' placeholder='Enter an address, neighborhood, city, or ZIP code'/>
        </div>
    </div>
  )
}

export default SearchBar