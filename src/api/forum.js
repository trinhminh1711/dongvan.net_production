import axiosClient from "./axios";

const API_URL = "/forum";
export const createPost = async (postData) => {
    try {
        const res = await axiosClient.post(`${API_URL}/post-forum/create-post`,postData);
        return res.data
    } catch (err) {
       return err
    }
};
export const getPost = async () => {
    try {
        const res = await axiosClient.get(`${API_URL}/post-forum/get-post`);
        return res.data
    } catch (err) {
       return err
    }
};
export const getPostForumByTopic = async (TopicId , page, limit) => {
    try {
        const res = await axiosClient.get(`${API_URL}/post-forum/category/${TopicId}`,{
            params: { page, limit}, 
        });
        return res.data
    } catch (err) {
       return err
    }
};
export const getPostDetail = async (post_id) => {
    try {
        const res = await axiosClient.get(`${API_URL}/post-forum/post-detail/${post_id}`);
        return res.data
    } catch (err) {
       return err
    }
}

export const addPostComment = async (post_id, user_id, content) => {
    try {
        const res = await axiosClient.post(`${API_URL}/post-forum/comment/add`, {
            post_id: post_id,          // id của story
            user_id: user_id,          // id user đang login
            content: content // nội dung comment
        });
        return res.data
    } catch (err) {
        return err
    }
};

export const increaseLikePostComment = async (comment_id, user_id) => {
    try {
        const res = await axiosClient.post(`${API_URL}/post-forum/comment/add-like`, {
            comment_id, user_id 
        });
        return res.data
    } catch (err) {
        return err
    }
};
export const getListLikeComment = async (commentId) => {
    try {
        const res = await axiosClient.get(`${API_URL}/post-forum/comment-likes/${commentId}`);
        return res.data
    } catch (err) {
        return err
    }
};
export const getNumberPost = async () => {
    try {
        const res = await axiosClient.get(`${API_URL}/post-forum/number/topic`);
        return res.data
    } catch (err) {
        return err
    }
};
export const getListLikePost = async (postId) => {
    try {
        const res = await axiosClient.get(`${API_URL}/post-forum/post/${postId}/likes`);
        return res.data
    } catch (err) {
        return err
    }
};
export const toggleLike = async (userId, postId) => {
  try {
    const res = await axiosClient.post(`${API_URL}/post-forum/post/add-like`, {
      user_id: userId,
      post_id: postId
    });
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

  export const createReply = async (commentId, userId, content) => {
  try {
    const res = await axiosClient.post(`${API_URL}/post-forum/comments/reply`, {
    comment_id: commentId,
    user_id: userId,
    content,
    });
    return res.data;
  } catch (err) {
    console.error(err);
  }
};


export const getAllPostAdmin = async () => {
    try {
        const res = await axiosClient.get(`${API_URL}/post-forum/admin/get-post`);
        return res.data
    } catch (err) {
       return err
    }
};

export const updatePostStatus = async (postId, status) => {
  try {
    const res = await axiosClient.put(`${API_URL}/post-forum/update/${postId}/status`, { status });
    return res.data;
  } catch (err) {
    console.error("Lỗi updatePostStatus:", err);
    return { success: false, message: err.message };
  }
};


export const updatePostCreateAt = async (postId) => {
  try {
    const res = await axiosClient.put(`${API_URL}/post-forum/${postId}/update-time`);
    return res.data;
  } catch (err) {
    console.error("Lỗi updatePostStatus:", err);
    return { success: false, message: err.message };
  }
};
