

import React, { useContext } from 'react'
import { StoreContext } from '../context/store'

export default function Profile() {

    const {url,token} = useContext(StoreContext)

  return (

    <div>Profile</div>

  )

}
