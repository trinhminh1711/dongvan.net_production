import axiosClient from "./axios";

const API_URL = "/notifications";

export const getNotifications = async (user_id) => {
    try {
        const res = await axiosClient.get(`${API_URL}/${user_id}`);
        return res.data
    } catch (err) {
        return err
    }
};
export const markReadNotifications = async (user_id, notificationId) => {
    try {
        const res = await axiosClient.post(`${API_URL}/read`,
            {
                notification_id: notificationId,
                user_id: user_id
            }
        );
        return res.data
    } catch (err) {
        return err
    }
};

export const markAllReadNotifications = async (user_id) => {
    try {
        const res = await axiosClient.post(`${API_URL}/read/all`,
            {
                user_id: user_id
            }
        );
        return res.data
    } catch (err) {
        return err
    }
};