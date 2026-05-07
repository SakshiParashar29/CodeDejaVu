import axios from 'axios';

let accessToken = null;

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
    withCredentials: true,
});

// attach access token to every request
api.interceptors.request.use((config) => {
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
});

// if 401, refresh and retry — skip for login/register routes
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const original = error.config;

        const isAuthRoute =
            original.url.includes('/auth/login') ||
            original.url.includes('/auth/register');

        if (error.response?.status === 401 && !original._retry && !isAuthRoute) {
            original._retry = true;
            try {
                const res = await api.post('/auth/refresh');
                const newToken = res.data?.data?.token;
                if (newToken) {
                    accessToken = newToken;
                    original.headers.Authorization = `Bearer ${newToken}`;
                }
                return api(original);
            } catch (err) {
                accessToken = null;
                window.location.href = '/login';
                return Promise.reject(err);
            }
        }

        return Promise.reject(error);
    }
);

// Auth

export const registerApi = (data) =>
    api.post('/auth/register', data);

export const loginApi = async (data) => {
    const res = await api.post('/auth/login', data);
    const token = res.data?.data?.token;
    if (token) accessToken = token;
    return res;
};

export const logoutApi = () =>
    api.post('/auth/logout');

export const verifyEmailApi = (token) =>
    api.get(`/auth/verify-email?token=${token}`);

export const refreshApi = async () => {
    const res = await api.post('/auth/refresh');
    const newToken = res.data?.data?.token;
    if (newToken) {
        accessToken = newToken; 
    }
    return res;
};

export const forgotPasswordApi = (email) =>
    api.post('/auth/forget-password', { email });

export const resetPasswordApi = (data) =>
    api.post('/auth/reset-password', data);

export const getProfileApi = () =>
    api.get('/auth/profile');
 
export const updateNemesisApi = (nemesis) =>
    api.patch('/auth/nemesis', { nemesis });

// Problems 
export const saveProblemApi = (data) =>
    api.post('/problem/save', data);
    
export const getProblemsApi = () =>
    api.get('/problem/all');

export const updateProblemApi = (id) =>
    api.patch(`/problem/${id}`); 

export const deleteProblemApi = (id) =>
    api.delete(`/problem/${id}`);

export const getTotalCountApi = () =>
    api.get('/problem/count');

export const getCompletedCountApi = () =>
    api.get('/problem/reviewed/count');

export const getHeatMapApi = () =>
    api.get('/problem/heatmap');

export const getRevisionListApi = () =>
    api.get('/problem/revision');