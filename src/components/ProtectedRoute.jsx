import React, { useEffect, useState } from 'react'
import { getUserInfo, logoutUser } from '../functions'
import { Outlet, useNavigate } from 'react-router'
export default function ProtectedRoute() {
  const navigate = useNavigate();
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        const response = await getUserInfo();

        if (!response || response.code !== 200) {
          await logoutUser(); // Ensure any session cleanup
          navigate('/', { replace: true });
        } else {
          setIsAuthChecked(true);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        navigate('/', { replace: true });
      }
    };

    checkUserStatus();
  }, [navigate]);

  if (!isAuthChecked) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-900">
        <div className="w-16 h-16 border-4 border-slate-50 border-dashed rounded-full animate-spin" />
      </div>
    );
  }

  return <Outlet />;
}
