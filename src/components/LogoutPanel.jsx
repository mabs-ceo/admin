import {  useEffect, useMemo, useState } from "react";
import { useNavigate} from "react-router";
import {  getAllSubscribersData, logoutUser } from "../functions";

const LogoutPanel = ({ name }) => {
  const navigate = useNavigate();
  const[loading,setLoading]=useState(false)
  const [subscribersData, setSubscribersData] = useState({
    notification: 0,
    email: 0,
  });
  const [time, setTime] = useState(new Date());
  

 
  
  const handleLogout = async () => {
    await logoutUser();
    
   return navigate("/", { replace: false });
  };
  
useEffect(() => {
  console.log("data")
    const fetchSubscribersData = async () => {
      const {data}= await getAllSubscribersData()
      const subData = {
        notification: data?.notification,
        email: data?.email,
      };
 
      setSubscribersData(subData);
    };

  
      fetchSubscribersData();
    
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  const memoizedSubscribersData = useMemo(() => {
    return {
      notification: subscribersData.notification,
      email: subscribersData.email,
    };
  }, [subscribersData]);

  const formattedTime = time.toLocaleTimeString("en-SG", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
 


  return (
    <div className=" mt-10 rounded-b-xl p-4 flex justify-around  items-center border w-full" >
  <div>

      <div className="text-center">
        <p className="text-sm text-slate-400">Notification Subscribers</p>
        <h2 className="text-xl font-semibold text-green-500">{memoizedSubscribersData.notification}</h2>
      </div>
      <div className="text-center">
        <p className="text-sm text-slate-400">Email subscribers</p>
        <h2 className="text-xl font-semibold text-green-500">{memoizedSubscribersData.email}</h2>
      </div>
  </div>
      <div className="flex flex-col items-center">
      <div className="text-slate-300  tracking-wide">{formattedTime}</div>
        
      <div className="text-center">
        <p className="text-sm text-slate-400">Logged in as</p>
        <h2 className="text-xl font-semibold text-green-500">{name}</h2>
      </div  >
      {/* <button
        className="mt-4  rounded-xl bg-red-500 px-4 py-2 text-white hover:bg-red-600 transition active:scale-95"
        onClick={handleLogout}
        >
        Logout
      </button> */}
      {loading ? (
  <span className="spinner"></span>
) : (
  <button className="mt-4 rounded-xl bg-red-500 px-4 py-2 text-white hover:bg-red-600 transition active:scale-95" onClick={handleLogout}>
    Logout
  </button>
)}
          </div>
     
    </div>
  );
};

export default LogoutPanel;
