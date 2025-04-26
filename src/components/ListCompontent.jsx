import React, { useEffect, useState } from 'react'
import { deleteNotification } from '../functions';

export default function ListCompontent({ notificationLists,setNotificationLists }) {
  const [error, setError] =useState('')
  const [loading, setLoading] = useState(false)
  const [deletingId, setDeletingId] = useState(null)
  const readableData = notificationLists.map((item) => {
    const date = new Date(item.dueDate);
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  
    return {
      ...item,
      completed:new Date(item.dueDate) > new Date(),
      dueDate: date.toLocaleString('en-SG', options),
    };
  })

 

  async function handleDelete(id,e) {
    e.preventDefault()
    setDeletingId(id)
    setLoading(true)
    setError('')
      const response = await deleteNotification(id);
     
      if (response === 204) {
        setNotificationLists((prev) => prev.filter((item) => item._id !== id));
        setLoading(false)
        setDeletingId(null)
      } else {
        setTimeout(() => {
          setError('Error deleting notification');
          setLoading(false)
          setDeletingId(null)
        }, 3000)
       
        
      }
  
  }
 






  return (
    <div className="w-full h-full  bg-slate-800 shadow-2xl ring-1 ring-slate-600/20">
    <div className="p-4 border-b border-slate-700">
      <h2 className="text-lg font-semibold text-white">Upcoming Prayers</h2>
      {loading && <p className="text-sm text-slate-400">Deleting...</p>}

{error && <p className="text-sm text-red-500">{error}</p>}
    </div>
   { !notificationLists?.length ? <p className="text-xl text-slate-400 text-center">No Janaza Notifications</p> :<ul className="divide-y divide-slate-700 overflow-auto max-h-full">
      {readableData?.map((item) => (
        <li
          key={item._id}
          className="px-4 py-3 hover:bg-slate-700/50 transition flex justify-between items-center"
        > 
          <div className='flex flex-col w-full'>
            <div className='flex items-center gap-2 w-full'> 

            <p className="font-medium text-white p-1 text-center w-full bg-orange-600 ">Provider: {item.providerName}</p>
            </div>
            <p className="font-medium text-white">{item.name}</p>
            {item?.isShow ?
            <p className="text-sm text-slate-400">Address: {item?.address}</p>
            :  
            <p className="text-sm text-slate-400"> Hide</p>
          }
            <p className="text-sm text-slate-400">Prayer time: {item.dueDate}</p>
          </div>
        
          <button disabled={deletingId === item._id}  className=" disabled:cursor-not-allowed text-blue-400 hover:underline text-sm"  onClick={(e)=>handleDelete(item._id,e)}> {deletingId === item._id ? 'Deleting...' : 'Delete'}</button>
         {!item.completed && <div className='ml-2 w-2 h-2 rounded-full bg-yellow-400 animate-pulse' title="Overdue" />}
        </li>
      ))}
    </ul>}
  </div>
  
  )
}
