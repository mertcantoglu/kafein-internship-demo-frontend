
import axios from 'axios';
import SessionHelper from './SessionHelper';

const api = axios.create({
  baseURL: 'http://localhost:8080/api', // BASE URL
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const user = SessionHelper.getUser();
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 403) {
      SessionHelper.deleteUser(); // Clear session
      window.location.href = '/'; // Redirect to sign-in page
    }
    return Promise.reject(error);
  }
);

export const fetchEmployees = async () => {
  const response = await api.get('/employees');
  return response.data;
};

export const fetchEmployee = async (id) => {
  const response = await api.get(`/employees/${id}`);
  return response.data;
};

export const fetchEmployeeLeaves = async (id) => {
  const response = await api.get(`/leaves/${id}`);
  return response.data;
};

export const addLeaveRecord = async (leaveRecord) => {
    const response = await api.post('/leaves', leaveRecord);
    return response.data;
  };


export const deleteLeaveRecord = async (id) => {
    const response = await api.delete(`/leaves/${id}`);
    return response.data;
  };

export const addEmployee = async (employee) => {
    const response = await api.post('/auth/register', employee);
    return response.data;
  };

export const updateEmployee = async (employee) => {
    const response = await api.put('/employees', employee);
    return response.data;
  };

export const deleteEmployee = async (id) => {
    const response = await api.delete(`/employees/${id}`);
    return response.data;
  };

export const login = async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  }

export const fetchUsers = async () => {
  const response = await api.get('/auth/users');
  return response.data;
};

export const addUser = async (user) => {
  const response = await api.post('/auth/register', user);
  return response.data;
}

export const deleteUser = async (id) => {
  const response = await api.delete(`/auth/users/${id}`);
  return response.data;
}

export const leaveApprove = async (id) => {
  const body = {
    status: 'APPROVE'
  }
  const response = await api.put(`/leaves/${id}/status` , body);
  return response.data;
}

export const leaveReject = async (id) => {
  const body = {
    status: 'REJECT'
  }
  const response = await api.put(`/leaves/${id}/status`,body);
  return response.data;
}

export const fetchPendingRequests = async () => {
  const response = await api.get('/employees', {
    params: {
      status: 'PENDING'
    }
  });
  return response.data;
}



