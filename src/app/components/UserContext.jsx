"use client"
import React, {  createContext, useState } from 'react'


export const context = createContext();

const UserContext = ({children}) => {

    const [user, setUser] = useState([]);

  return (
    <>
        <context.Provider value={{user, setUser}}>
            {children}
        </context.Provider>
    </>
  )
}

export default UserContext