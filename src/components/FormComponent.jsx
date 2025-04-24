import React, { useEffect, useState } from 'react'
import LogoutPanel from './LogoutPanel'
import { createNotification } from '../functions'


export default function FormComponent({userData,providerDataArray ,success,setSuccess}) {
 
  const formData = {
    providerId: '',
    name: '',
    dueDate: '',
    postal: '',
    
  }
  
  const[isShown, setIsShown] = useState(false)

  const [form, setForm] = useState(formData)
  const [error, setError] = useState('')

 
  const [loading, setLoading] = useState(false)


  const isFormComplete=!form.name || !form.dueDate || !form.postal || !form.providerId
   
  
  function handleChange(e) {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }
 async function handleSubmitOld(e) {
    e.preventDefault()
    setLoading(true)
   const response = await createNotification(form)

    if (response !== 201) {
      setError('Error: Please check all the fields')
    }else {
      setSuccess('Notification Created Successfully')}

 
   
    setTimeout(() => {
      setSuccess('')
      setError('')
      setLoading(false)
    }, 3000)
  }

  async function handleSubmit(e){
    e.preventDefault()
    setLoading(true)
    try {
      const response = await createNotification(form)
      if(response !== 201){
        setError('Error: Please check all the fields')
      }else{
        setSuccess('Notification created successfully')
      }
    } catch (error) {
      console.error(err)
    setError('Server error. Try again later.')
    }finally{
      setTimeout(()=>{
        setSuccess('')
        setError('')
        setLoading(false)
      },3000)
    }
  
  }

  

  function showPanel() {
    setIsShown((prev) => !prev)
  }


  return (
    <div className="w-full md:max-w-md   bg-slate-800 shadow-2xl ring-1 ring-slate-600/20 md:h-full">
      
      <div className=' cursor-pointer text-center text-slate-50 mt-5 ' onClick={showPanel}>   {isShown ? 'Collapse ▲' : 'Expand ▼'}</div>


  <div
  className={`transition-all duration-500 ease-in-out overflow-hidden ${
    isShown ? 'max-h-full opacity-100' : 'max-h-0 opacity-0'
  }`}
>
<form  className="flex flex-col gap-6 p-6 text-slate-100">
    <h2 className="text-xl font-semibold text-center text-white">Send Notification</h2>
    {error && <p className="text-red-500 text-sm">{error}</p>}
    {success && <p className="text-green-500 text-sm">{success}</p>}

    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium">Name</label>
      <input
        name="name"
        onChange={handleChange}
        value={form.name}
        type="text"
        placeholder="Name"
        className="rounded-xl bg-slate-700 px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium">Prayer Time</label>
      <input
        name="dueDate"
        onChange={handleChange}
        value={form.dueDate}
        type="datetime-local"
        placeholder="Date Time"
        className="rounded-xl bg-slate-700 px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium">Postal</label>
      <input
        name="postal"
        onChange={handleChange}
        value={form.postal}
        type="number"
        placeholder="Postal"
        className="rounded-xl bg-slate-700 px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div className="flex flex-col gap-1 mb-5 h-max">    
    
      <label className="text-sm font-medium " >
      Provider
        </label>
      <select onChange={handleChange} name="providerId" className="rounded-xl bg-slate-700 px-4 py-2 w-max text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 h-max">
        <option className="text-sm font-medium" value="">Select a provider</option>
        {providerDataArray.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
       
      </select>
    </div>

    <button
      onClick={handleSubmit}
      disabled={loading || isFormComplete}
      className="mt-4 rounded-xl bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      Submit
    </button>
    
  </form>
</div>

  <LogoutPanel name={userData.name} />
</div>

  )
}