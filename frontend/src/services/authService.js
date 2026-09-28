import instance from './axios';

export const registerUser = async (userData) => {
    const response = await instance.post('/auth/register', userData);
    return response.data;
};

export const verifyOtpData = async (verifyData) => {
    const response = await instance.post('/auth/verify-otp', verifyData);
    return response.data;
};

export const loginUser = async (loginData) => {
    const response = await instance.post('/auth/login', loginData);
    return response.data;
};