import axios from 'axios';

// const BASE_URL = 'http://localhost:3000';
const BASE_URL = "https://notifier-adminserver.onrender.com";
const API_URL = `${BASE_URL}/api/v1`;

export const logoutUser = async () => {
  try {
    const {data} = await axios.get(`${BASE_URL}/auth/logout`, {
      withCredentials: true,
    });
   
    return data.code;
  } catch (error) {
    console.error('Error logging out:', error);
    throw error;
  }
};
export const getUserInfo = async () => {
  try {
   
    const {data} = await axios.get(`${API_URL}/auth/users/status`, {
      withCredentials: true,
    });

    return data
  } catch (error) {
    await logoutUser()
    return error?.response?.status;
  
  }
};
// /api/v1/notification

export const getAllSubscribersData = async () => {
  try {
    const {data} = await axios.get(`${API_URL}/notification`, {
      withCredentials: true,
    });

    return data
  } catch (error) {
    return error?.response?.status;
  }
}
export const getAllNotification = async () => {
  try {
    const {data} = await axios.get(`${API_URL}/notification/full`, {
      withCredentials: true,
    });

    return data.data
  } catch (error) {
    return error?.response?.status;
  }
}

export const getAllProviders = async () => {
  try {
    const {data} = await axios.get(`${API_URL}/providers`, {
      withCredentials: true,
    });
    return data.data
  } catch (error) {
    return error?.response?.status;
  }
}
export const createProvider= async (formData) => {
  try {
    const data= await axios.post(`${API_URL}/providers`,formData, {
      withCredentials: true,
    });
    return data.status
  } catch (error) {

    return error?.response?.status;
  }
}
export const deleteProvider= async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/providers/${id}`, {
      withCredentials: true,
    });
   
    return response.status
  } catch (error) {
    console.log(error)
    return error?.response?.status;
  }
}

export const createNotification = async (formData) => {
  try {
    const {data} = await axios.post(`${API_URL}/notification`, formData, {
      withCredentials: true,validateStatus: () => true,
    });
    return data.code
  } catch (error) {
  
    return 500;
  }
}

export const deleteNotification = async (id) => {
  try {

    const data = await axios.delete(`${API_URL}/notification/${id}`, {     
      withCredentials: true,
    });
    
    return data.status
  } catch (error) {
   
    return error?.response?.status;
  }
}