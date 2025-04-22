import React, { useState } from 'react'
import {createProvider} from "../functions"


const formData = {
  name: '',
  email: '',
  uen: '',
contact:0,
  postal: 0,
  
}


export default function FormPoroviderComponent({f5}) {
  const[isShown, setIsShown] = useState(false)
  const[success, setSuccess] = useState('')
  const [form, setForm] = useState(formData)
    const [error, setError] = useState('')
  
   
    const [loading, setLoading] = useState(false)
  

    const isFormComplete = 
    !form.name || 
    !form.email || 
    !form.uen || 
    String(form.contact).trim() === '' || 
    String(form.postal).trim() === ''
  
  function showPanel() {
    setIsShown((prev) => !prev)
  }
  function handleChange(e) {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

   async function handleSubmit(e) {
    
        e.preventDefault()
     setLoading(true)
     const response = await  createProvider(form)
 
      if (response !== 201) {
        setError('Error: Please check all the fields')
        setForm(formData)
        f5()
      }else {        setSuccess('Provider Created Successfully')

        setForm(formData)
      }
      
  
   
     
      setTimeout(() => {
        setSuccess('')
        setError('')
        f5()
        setForm(formData)
        
      }, 3000)
    }
  
  return (
    <div className="w-full    bg-slate-800 shadow-2xl ring-1 ring-slate-600/20 ">
      
      <div className=' cursor-pointer text-center text-slate-50 mt-5 ' onClick={showPanel}>   {isShown ? 'Collapse ▲' : 'Add new▼'}</div>


  <div
  className={`transition-all duration-500 ease-in-out overflow-hidden ${
    isShown ? 'max-h-full opacity-100' : 'max-h-0 opacity-0'
  }`}
>
<form  className="flex flex-col gap-6 p-6 text-slate-100">
    <h2 className="text-xl font-semibold text-center text-white">Add Provider</h2>
    {error && <p className="text-red-500 text-sm">{error}</p>}
    {success && <p className="text-green-500 text-sm">{success}</p>}
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium">Name</label>
      <input
      name='name'
        onChange={handleChange}
        value={form.name}
        type="text"
        placeholder="Name"
        className="rounded-xl bg-slate-700 px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium">UEN</label>
      <input
      name='uen'
        onChange={handleChange}
        value={form.uen}
        type="text"
        placeholder="UEN"
        className="rounded-xl bg-slate-700 px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium">Postal</label>
      <input
        onChange={handleChange}
        value={form.postal}
        name='postal'
        type="number"
        placeholder="Postal"
        className="rounded-xl bg-slate-700 px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium">email</label>
      <input
        onChange={handleChange}
        name='email'
        value={form.email}
        type="email"
        placeholder="Email"
        className="rounded-xl bg-slate-700 px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium">contact</label>
      <input
      name='contact'
        onChange={handleChange}
        value={form.contact}
        type="number"
        placeholder="Contact"
        className="rounded-xl bg-slate-700 px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <button
       onClick={handleSubmit}
       disabled={loading || isFormComplete}
      
      className="mt-4 rounded-xl bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600 active:scale-95"
    >
      Add
    </button>
  </form>
</div>


</div>

  )
}
