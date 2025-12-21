import axiosClient from "./axios";

const API_URL = "/stories";


export const checkStoryOwner = async (storyId) => {
  try {
    const res = await axiosClient.get(`${API_URL}/check-owner/${storyId}`);
    return res.data; // { success: true, isOwner: true/false }
  } catch (err) {
    console.error("Error checking story owner:", err);
    return { success: false, isOwner: false };
  }
};

export const createStory = async (data) => {

    try {
        const formData = new FormData();
        formData.append("title", data.storyName);
        formData.append("author_id", data.storyAuthor);
        formData.append("pen_name", data.pen_name);
        formData.append("genres_id", data.storyGenre);
        formData.append("description", data.storyDesc);
        formData.append("link_forum", data.storyLinkForum);
        if (data.cover) {
            formData.append("cover", data.cover);
        }
        const res = await axiosClient.post(API_URL, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        if (res.status === 201 && res.data?.success) {
            return {
                success: true,
                id: res.data.id,
                message: res.data.message || "Tạo story thành công!",
            };
        } else {
            return {
                success: false,
                message: res.data?.message || "Tạo story thất bại!",
                error: res.data?.error || null,
            };
        }
    } catch (error) {
        console.error("Error creating story:", error);
        return {
            success: false,
            message: "Lỗi kết nối server!",
            error: error.response?.data || error.message,
        };
    };
}
export const updateStory = async (data, story_id) => {

    try {
        const formData = new FormData();
        formData.append("title", data.storyName);
        formData.append("genres_id", data.storyGenre);
        formData.append("description", data.storyDesc);
        formData.append("link_forum", data.storyLinkForum);
        if (data.cover) {
            formData.append("cover", data.cover);
        }
        const res = await axiosClient.put(`${API_URL}/edit-story/${story_id}`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        if (res.status === 200 && res.data?.success) {
            return {
                success: true,
                message: "Cập nhật thành công!",
            };
        } else {
            return {
                success: false,
                message: res.data?.message || "Tạo story thất bại!",
                error: res.data?.error || null,
            };
        }
    } catch (error) {
        console.error("Error creating story:", error);
        return {
            success: false,
            message: "Lỗi kết nối server!",
            error: error.response?.data || error.message,
        };
    };
}
export const getStory = async (authorId, status = 'published') => {
  try {
    const res = await axiosClient.get(`${API_URL}/${authorId}`, {
      params: { status } // 👈 gửi query param ?status=...
    })
    return res.data
  } catch (err) {
    return err
  }
}
export const getAllStory = async () => {
    try {
        const res = await axiosClient.get(`${API_URL}/story/get-all`);
        return res.data
    } catch (err) {
        return err
    }
};

export const getStoryById = async (storyId) => {
    try {
        const res = await axiosClient.get(`${API_URL}/story/${storyId}`);
        return res.data
    } catch (err) {
        return err
    }
};

export const getStoryByCategory = async (categoryId) => {
    try {
        const res = await axiosClient.get(`${API_URL}/category/${categoryId}`);
        return res.data
    } catch (err) {
        return err
    }
};
export const getStoryFullInfo = async (story_id, status = 'published') => {
  try {
    const res = await axiosClient.get(`${API_URL}/story-allinfo/${story_id}`, {
      params: { status },
    })
    return res.data
  } catch (error) {
    console.error('Lỗi khi lấy thông tin truyện:', error)
    return { success: false, message: error.message }
  }
}
export const getStoryComment = async (story_id) => {
    try {
        const res = await axiosClient.get(`${API_URL}/${story_id}/comments`);
        return res.data
    } catch (err) {
        return err
    }
};


export const getStoryRandom = async (limit) => {
  try {
    
    const res = await axiosClient.get(`${API_URL}/random/story`, {
      params: { limit }   // query param ?limit=10
    });
    return res.data;
  } catch (err) {
    console.error("Error fetching stories:", err);
  }
};

export const getStoryComplete = async (limit) => {
  try {
    const res = await axiosClient.get(`${API_URL}/complete/story`, {
      params: { limit }   // query param ?limit=10
    });
    return res.data;
  } catch (err) {
    console.error("Error fetching stories:", err);
  }
};


export const updateUserReadingBook = async (userId, storyId, chapterId) => {
    try {
        const res = await axiosClient.post(`${API_URL}/story/reading`, {
            user_id: userId,
            story_id: storyId,
            chapter_id: chapterId
        });
        return res.data
    } catch (err) {
        return err
    }
};

export const getListUserReading = async (userId) => {
    try {
        const res = await axiosClient.get(`${API_URL}/user/reading/${userId}`);
        return res.data
    } catch (err) {
        return err
    }
}

export const getListPostLike = async (userId) => {
    try {
        const res = await axiosClient.get(`${API_URL}/favorite/${userId}`);
        return res.data
    } catch (err) {
        return err
    }
};

export const checkStoryLike = async (userId, storyId) => {
    try {
        const res = await axiosClient.get(`${API_URL}/check/storylike`, {
            params: {
                user_id: userId,
                story_id: storyId
            }
        });
        return res.data
    } catch (err) {
        return err
    }
};

export const addFavorite = async (userId, storyId) => {
    try {
        const res = await axiosClient.post(`${API_URL}/user-story/favorite`, {
            user_id: userId,
            story_id: storyId,
        });
        return res.data
    } catch (err) {
        return err
    }
};

export const getTopStoryReaded = async (limit) => {
    try {
        const res = await axiosClient.get(`${API_URL}/check/top-reader?limit=${limit}`,
        );
        return res.data
    } catch (err) {
        return err
    }
};

export const getTopStoryReadedMonth = async (limit) => {
    try {
        const res = await axiosClient.get(`${API_URL}/check/top-reader/month?limit=${limit}`,
        );
        return res.data
    } catch (err) {
        return err
    }
};

export const getTopAuthorWeek = async (limit) => {
    try {
        const res = await axiosClient.get(`${API_URL}/check/top-author/week?limit=${limit}`,
        );
        return res.data
    } catch (err) {
        return err
    }
};

export const getTopUserReaders = async (limit) => {
    try {
        const res = await axiosClient.get(`${API_URL}/check/top-user/reader?limit=${limit}`,
        );
        return res.data
    } catch (err) {
        return err
    }
};

export const getListStoryUpdatedNew = async (limit) => {
    try {
        const res = await axiosClient.get(`${API_URL}/check/just-updated?limit=${limit}`,
        );
        return res.data
    } catch (err) {
        return err
    }
};

export const getNumberChapterStory = async (storyId) => {
    try {
        const res = await axiosClient.get(`${API_URL}/${storyId}/chapters/count`);
        return res.data;
    } catch (error) {
        console.error("Error fetching chapter count:", error);
        throw error;
    }
};

export const getNumberChapterNotPurchaseStory = async (storyId, userId) => {
    try {
        const res = await axiosClient.get(`${API_URL}/${storyId}/chapters/user/${userId}/notpurchase`);
        return res.data;
    } catch (error) {
        console.error("Error fetching chapter count:", error);
        throw error;
    }
};

export const getTopStoryRecomment = async () => {
    try {
        const res = await axiosClient.get(`${API_URL}/story/recommendations`);
        return res.data;
    } catch (error) {
        console.error("Error fetching chapter count:", error);
        throw error;
    }
};

export const getTopUserSpending = async () => {
    try {
        const res = await axiosClient.get(`${API_URL}/check/top-user/spending`);
        return res.data.data;
    } catch (error) {
        console.error("Error fetching chapter count:", error);
        throw error;
    }
};

export const addBookMarkStories = async () => {
    try {
        const res = await axiosClient.get(`${API_URL}/check/top-user/spending`);
        return res.data.data;
    } catch (error) {
        console.error("Error fetching chapter count:", error);
        throw error;
    }
};

export const unlockChapters = async (storyId, userId, chapters) => {
  try {
    // ✅ Cho phép axios nhận mọi status code, không tự throw
    const res = await axiosClient.post(
      `${API_URL}/unlock-chapter/user/${userId}/story/${storyId}`,
      { chapters },
      { validateStatus: () => true }
    );

    // ✅ Tự check status
    if (res.status >= 200 && res.status < 300) {
      return {
        success: true,
        status: res.status,
        data: res.data,
        message: res.data?.message || "Mở khóa chương thành công",
      };
    } else {
      return {
        success: false,
        status: res.status,
        message: res.data?.message || "API error",
        data: res.data,
      };
    }

  } catch (error) {
    console.error("❌ Unlock API error:", error);

    if (error.response) {
      return {
        success: false,
        status: error.response.status,
        message: error.response.data?.message || "API error",
        data: error.response.data,
      };
    } else if (error.request) {
      return { success: false, message: "No response from server" };
    } else {
      return { success: false, message: error.message };
    }
  }
};


export const saveReadingProgress = async ({ user_id, story_id, chapter_id, scroll }) => {
  try {
    const res = await axiosClient.post(`${API_URL}/add-bookmark`, {
      user_id,
      story_id,
      chapter_id,
      scroll,
    })
    return res.data
  } catch (err) {
    console.error('Lỗi khi lưu tiến độ đọc:', err)
    throw err
  }
}

// 🔹 Lấy tiến độ đọc
export const getReadingProgress = async (user_id, story_id) => {
  try {
    const res = await axiosClient.get(`${API_URL}/bookmark/${user_id}/${story_id}`)
    return res.data
  } catch (err) {
    console.error('Lỗi khi lấy tiến độ đọc:', err)
    throw err
  }
}

export const followStory = async (user_id, story_id) => {
  try {
    const res = await axiosClient.post(`${API_URL}/${story_id}/follow`, { user_id: user_id})
    return res.data
  } catch (err) {
    console.error('Có lỗi xảy ra', err)
    throw err
  }
}
export const unfollowStory = async (storyId, userId) => {
  const res = await axiosClient.delete(`${API_URL}/${storyId}/unfollow`, { data: { user_id: userId } });
  return res.data;
};

// Lấy danh sách truyện user đã follow
export const getFollowedStories = async (userId) => {
  try {
    const res = await axiosClient.get(`${API_URL}/user/follow-story/${userId}`)
    return res.data.data // hoặc res.data nếu bạn để khác
  } catch (err) {
    console.error('Lỗi khi lấy danh sách follow:', err)
    throw err
  }
}