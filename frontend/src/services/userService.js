import instance from './axios';

export const getUsers = async () => {
    const response = await instance.get('/users');
    return response.data;
};

export const toggleUserStatus = async (id, isActive) => {
    const response = await instance.put(`/users/${id}/status`, null, {
        params: { isActive }
    });
    return response.data;
};