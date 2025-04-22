import React, {  useEffect, useState } from 'react'
import FormComponent from '../components/FormComponent'
import ListCompontent from '../components/ListCompontent'
import ProviderComponent from '../components/ProvidersComponent'
import { getAllSubscribersData, getAllProviders, getUserInfo, getAllNotification } from '../functions';
import { useNavigate} from 'react-router';

export default function Dashboard() {
        const navigate = useNavigate();
          const [refresh,SetRefresh]=useState(false)
          const[msg,setMsg]=useState('')
    const [user, setUser] = useState(false);
    const [userData, setUserData] = useState({});
    const [providersData, setProvidersData] = useState([]);
    const [notificationLists, setNotificationLists] = useState([]);
     const [success, setSuccess] = useState('')
    const providerDataArray = providersData.map((item) => ({
      id: item._id,
      name: item.name,
     
    }));

    function f5(){
      return SetRefresh((prev)=>!prev)
    }
     const getStatus = async () => {
       const data = await getUserInfo();
       const providerData = await getAllProviders();

       setProvidersData(providerData)
      
        setUserData(data.user)
    
        if (data.code !== 200) {
          // window.location.href = '/login';
          return   navigate("/" ,{ replace: true });
        } else {
          setUser(true);
        }
      };
      useEffect(() => {
        const getAllNotifications = async () => {
          try {
            const data= await getAllNotification();
 
            setNotificationLists(data);
          } catch (error) {
            setMsg('Error loading from server')
          }
          
        
        }
       getAllNotifications()
      }, [success]);
    useEffect(() => {
      getStatus()
    }, [user]);

    useEffect(() => {
      const fetchProviders = async () => {
        const data = await getAllProviders();
        setProvidersData(data);
      };
      fetchProviders();
    }, [refresh]);
    
  
  return (
    <div className='flex md:flex-row flex-col gap-1  h-screen bg-gradient-to-br from-gray-200 to-gray-300 justify-between'>


        {user ?
        <>
        <FormComponent success={success} setSuccess={setSuccess}  setUser={setUser} userData={userData} providerDataArray={providerDataArray}/>
       

      
        <ListCompontent  notificationLists={notificationLists} setNotificationLists={setNotificationLists}/>
        
        <ProviderComponent providersData={providersData} f5={f5}/>
        </>
        :<p className='text-center text-slate-50'>Loading...</p>

    }
        
        </div>
  )
}
