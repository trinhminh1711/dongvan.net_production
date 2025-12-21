import axiosClient from "./axios";

const API_URL = "/story-comment";

export const addStoryComment = async (story_id, user_id, content) => {
    try {
        const res = await axiosClient.put(`${API_URL}/add`, {
            story_id: story_id,          // id của story
            user_id: user_id,          // id user đang login
            content: content // nội dung comment
        });
        return res.data
    } catch (err) {
        return err
    }
};
export const getRepliesByComment = async (commentId) => {
  try {
    const res = await axiosClient.get(`${API_URL}/comment/${commentId}/replies`);
    return res.data;
  } catch (err) {
    console.error('Lỗi khi lấy replies:', err);
    return [];
  }
};
export const createReply = async (commentId, userId, content) => {
    try {
        const res = await axiosClient.post(`${API_URL}/comment/reply`, {
            comment_id: commentId,
            user_id: userId,
            content,
        });
        return res.data;
    } catch (err) {
        console.error(err);
    }
};
export const increaseLike = async (comment_id) => {
    try {
        const res = await axiosClient.post(`${API_URL}/add-like`, {
            comment_id: comment_id
        });
        return res.data
    } catch (err) {
        return err
    }
};