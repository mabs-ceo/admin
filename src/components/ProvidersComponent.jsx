import React, { useEffect, useState } from 'react'
import FormPoroviderComponent from './FormPoroviderComponent'
import {  deleteProvider } from '../functions'

export default function ProviderComponent({providersData,f5}) {
  const[providers,setProviders]=useState(providersData)

  const [loading,setLoading]=useState(false)
  const [error,setError]=useState('')

    async function handleDelete(id,e) {
      e.preventDefault()
      setLoading(true)
      setError('')

   
        const response = await deleteProvider(id);
       
        if (response === 204) {
          setProviders((prev) => prev.filter((item) => item._id !== id));
          setLoading(false)
        } else {
          setTimeout(() => {
            setError('Error deleting notification');
            f5()
            setLoading(false)
          }, 3000)
         
          
        }
    
    }
    

  return (
    <div className="w-full  bg-slate-800 shadow-2xl ring-1 ring-slate-600/20">
        <FormPoroviderComponent f5={f5}/>
    <div className="p-4 border-b border-slate-700">
      <h2 className="text-lg font-semibold text-white">Providers</h2>
    </div>
    <ul className="divide-y divide-slate-700 overflow-auto max-h-96">
      {providers?.map((item) => (
        <li
          key={item._id}
          className="px-4 py-3 hover:bg-slate-700/50 transition flex justify-between items-center"
        > 
          <div className='flex flex-col w-full'>
        
            <p className="font-medium text-white bg-orange-600 pl-2 flex justify-between">{item.name} <span className='bg-yellow-400 w-[150px] text-slate-700 text-center font-black' > {item.providedCount}</span> </p>
            <p className="text-sm text-slate-400">UEN: {item.uen}</p>
            <p className="text-sm text-slate-400">Email: {item.email}</p>
            <p className="text-sm text-slate-400">Contact: {item.contact}</p>
            <p className="text-sm text-slate-400">Address: {item.postal}</p>
      
          </div>
          <button disabled={loading} onClick={(e)=>handleDelete(item._id,e)} className="text-blue-400 hover:underline text-sm">{loading ?'Deleting': "Delete"}</button>
        </li>
      ))}
    </ul>
  </div>
  
  )
}
