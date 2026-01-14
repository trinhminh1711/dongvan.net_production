<template>
    <div class="d-md-flex align-items-center justify-content-between">
        <div>
            <h3 class="text-color_primary fw-bold">{{ tableData[0]?.topicTitle }}</h3>
            <p class="py-2 text-16">Trao đổi chia sẻ những câu truyện hay nào!</p>
        </div>
        <div>
            <button @click="dialogVisible = true" class="btn-alert"><el-icon class="align-middle">
                    <Plus />
                </el-icon> <span class="align-middle py-2">Đăng bài mới</span></button>
        </div>
    </div>
    <div class="mt-4 hide-mobile" style="border: solid 1px #E4E7EC; border-radius: 10px;">
        <el-table :data="tableData" style="width: 100%">
            <!-- Cột 1: Tên -->
            <el-table-column label="Chủ đề" prop="name" width="500">
                <template #default="scope">
                    <div class="post-info py-3">
                        <div class="imgAuthor">
                            <el-tooltip popper-class="custom-tooltip" placement="left-start">
                                <template #content>
                                    <UserInfoCard :idUserComment="scope.row.user_id" />
                                </template>
                                <img class="cursor-pointer" @click="goToProfile(scope.row.user_id)"
                                    style="width: 70px; height: 70px; border-radius: 50%;" :src="scope.row.avatarImg"
                                    alt="">
                            </el-tooltip>
                        </div>
                        <div class="info">
                            <p>
                                <span class="text-sm fw-semibold post-topic"
                                    :class="getTopicColor(scope.row.topicTitle).text">
                                    <span class="dot" :class="getTopicColor(scope.row.topicTitle).dot"></span>
                                    {{ scope.row.topicTitle }}
                                </span> <span @click="goToPost(scope.row.postId)"
                                    class="text-md fw-bold color-blue hover_link">{{
                                        scope.row.name }}</span>
                            </p>
                            <div class="d-flex gap-3 align-items-center mt-2">
                                <p class="d-flex gap-1 align-items-center">
                                    <el-icon>
                                        <User />
                                    </el-icon> <span class=" hover-link" @click="goToProfile(scope.row.user_id)">{{
                                        scope.row.author }}</span>
                                </p>
                                <p class="d-flex gap-1 align-items-center">
                                    <el-icon>
                                        <Calendar />
                                    </el-icon> {{ scope.row.time }}
                                </p>
                            </div>
                        </div>
                    </div>
                </template>
            </el-table-column>

            <!-- Cột 2: Số chương -->
            <el-table-column label="Lượt tương tác" prop="chapters">
                <template #default="scope">
                    <p class="like-share d-flex gap-4 py-4">
                        <span @click="likeShare(scope.row.postId)">

                            <svg width="22" height="20" viewBox="0 0 22 20" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M10.9932 3.13771C8.9938 0.800292 5.65975 0.171535 3.15469 2.31191C0.649644 4.45228 0.296968 8.03087 2.2642 10.5623C3.89982 12.667 8.84977 17.106 10.4721 18.5427C10.6536 18.7035 10.7444 18.7838 10.8502 18.8154C10.9426 18.843 11.0437 18.843 11.1361 18.8154C11.2419 18.7838 11.3327 18.7035 11.5142 18.5427C13.1365 17.106 18.0865 12.667 19.7221 10.5623C21.6893 8.03087 21.3797 4.42976 18.8316 2.31191C16.2835 0.194049 12.9925 0.800292 10.9932 3.13771Z"
                                    stroke="#667085" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            {{ scope.row.like }}</span>
                        <span @click="goToPost(scope.row.postId)"><el-icon :size="24">
                                <ChatRound />
                            </el-icon>{{ scope.row.comment }}</span>
                    </p>
                </template>
            </el-table-column>

            <!-- Cột 3: Ngày đăng -->
            <el-table-column label="Tương tác gần nhất" prop="publishDate" width="200">
                <template #default="scope">
                    <div class="closest-interaction justify-content-between d-flex align-items-center gap-1">
                        <div>
                            <p class="text-md color-blue text-right">{{ scope.row.closestInteraction.date }}</p>
                            <p :class="scope.row.closestInteraction.user_id ? 'hover-link' : ''"
                                @click="goToProfile(scope.row.closestInteraction.user_id)" class="text-sm">{{
                                    scope.row.closestInteraction.name }}</p>
                        </div>
                        <el-tooltip popper-class="custom-tooltip" placement="left-start">
                            <template #content>
                                <UserInfoCard :idUserComment="scope.row.closestInteraction.user_id" />
                            </template>
                            <img class="cursor-pointer" @click="goToProfile(scope.row.closestInteraction.user_id)"
                                v-if="scope.row.closestInteraction.user_id"
                                style="width: 40px; height: 40px; border-radius: 50%;"
                                :src="scope.row.closestInteraction.avatarImg" alt="">
                        </el-tooltip>
                    </div>
                </template>
            </el-table-column>
        </el-table>
    </div>
    <div class="mt-4 hide-desktop post-list">
        <div v-for="(item, index) in tableData" :key="index"
            class="post-item d-flex align-items-center gap-3 border-bottom py-3">
            <!-- Avatar -->
            <div class="imgAuthor">
                <el-tooltip popper-class="custom-tooltip" placement="left-start">
                    <template #content>
                        <UserInfoCard :idUserComment="item.user_id" />
                    </template>
                    <img class="cursor-pointer user-avatar" @click="goToProfile(item.user_id)" :src="item.avatarImg"
                        alt="" />
                </el-tooltip>
            </div>

            <!-- Nội dung bài viết -->
            <div class="info flex-grow-1">
                <p class="mb-1 d-flex align-items-start">
                    <span class="text-sm fw-semibold post-topic  text-nowrap" :class="getTopicColor(item.topicTitle).text">
                        <span class="dot" :class="getTopicColor(item.topicTitle).dot"></span>
                        {{ item.topicTitle }}
                    </span>
                    <span class="text-md fw-bold color-blue hover_link ms-2  text-1-line" @click="goToPost(item.postId)">
                        {{ item.name }}
                    </span>
                </p>
                <div class="d-flex gap-2 align-items-center text-sm color-primary_gray mt-2">
                    <p class="d-flex align-items-center gap-1">
                        <el-icon>
                            <User />
                        </el-icon>
                        <span class="hover-link" @click="goToProfile(item.user_id)">
                            {{ item.author }}
                        </span>
                    </p>
                    <p class="d-flex align-items-center gap-1">
                        <el-icon>
                            <Calendar />
                        </el-icon> {{ item.time }}
                    </p>
                    <p class="d-flex align-items-center gap-1">
                        <el-icon>
                            <ChatRound />
                        </el-icon> {{ item.comment }}
                    </p>
                </div>
            </div>
        </div>
    </div>
    <div class="example-pagination-block d-flex justify-content-center mt-2">
        <el-pagination :page-size="5" v-model:current-page="currentPage" layout="prev, pager, next"
            :total="totalPage" />
    </div>

    <el-dialog v-model="dialogVisible" width="500" append-to-body>
        <CreatePostForum @closeDialog="dialogVisible = false" />
    </el-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import CreatePostForum from './CreatePostForum.vue';
import { getPostForumByTopic } from '@/api/forum';
import UserInfoCard from './UserInfoCard.vue';
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import { toggleLike, getListLikePost } from '../../api/forum';
import { useLoginModal } from '@/stores/useLoginModal'
import { useAuthStore } from "@/stores/auth";
const auth = useAuthStore();
const loginModal = useLoginModal()
const router = useRouter();
const route = useRoute();
const dialogVisible = ref(false)
const currentPage = ref();
const totalPage = ref();
const listPostTopic = ref([])
interface Item {
    topicTitle: string,
    postId: number,
    name: string
    author: string,
    time: string,
    like: number,
    comment: number,
    avatarImg: string,
    closestInteraction: object,
}

const tableData = ref<Item[]>([
    {
        topicTitle: null,
        postId: null,
        avatarImg: new URL('@/assets/image/avatar-author-post2.png', import.meta.url).href,
        name: 'Đại Đạo Triều Thiên - Lý Miêu Nị cùng Cửu Bảo Trân',
        author: "Đông Văn",
        time: '21 giờ trước',
        like: null,
        comment: 67,
        closestInteraction:
            { avatarImg: new URL('@/assets/image/avatar-author-post.png', import.meta.url).href, name: 'khanhbao3tt', date: '22/03/2025', user_id: null }
    },

])
interface TopicColor {
    text: string
    dot: string
}

// Map chủ đề → màu tương ứng
const topicColors: Record<string, TopicColor> = {
    'Luận truyện': { text: 'border-color-blue', dot: 'dot-blue' },
    'Thông báo': { text: 'border-color-red', dot: 'dot-red' },
    'Đề cử và Review truyện': { text: 'border-color-green', dot: 'dot-green' },
    'Nhập môn sáng tác': { text: 'border-color-pink', dot: 'dot-pink' },
    'Hỏi đáp cùng tác giả': { text: 'border-color-orange', dot: 'dot-orange' }
}
const getTopicColor = (title: string): TopicColor => {
    return topicColors[title] || { text: 'border-color-gray', dot: 'dot-gray' }
}

async function getAllPostByTopic(page) {
    const res = await getPostForumByTopic(route.params.id, page, 5);
    listPostTopic.value = res.data;
    totalPage.value = res.totalPage;


tableData.value = listPostTopic.value.map(post => {
  let latestComment = null;

  try {
    const comment = post.latest_comment;

    if (typeof comment === "string") {
      // Nếu là chuỗi JSON → parse
      latestComment = JSON.parse(comment);
    } else if (typeof comment === "object" && comment !== null) {
      // Nếu đã là object → dùng luôn
      latestComment = comment;
    } else {
      latestComment = null;
    }

  } catch (e) {
    console.warn("Latest comment JSON parse error:", e, post.latest_comment);
    latestComment = null;
  }

  return {
    topicTitle: post.topic_title,
    postId: post.post_id,
    avatarImg: post.link_thumbnail ?? null,
    name: post.title,
    user_id: post.user_id,
    author: post.username,
    time: post.created_at ? timeAgo(post.created_at) : null,
    like: post.total_likes ?? 0,
    comment: post.total_comments ?? 0,
    closestInteraction: {
      avatarImg: latestComment?.link_thumbnail ?? null,
      name: latestComment?.username ?? "Chưa có tương tác",
      date: latestComment?.created_at ? timeAgo(latestComment.created_at) : null,
      user_id: latestComment?.user_id ?? null,
      content: latestComment?.content ?? null
    }
  };
});

}
async function likeShare(postId) {
    if (auth.userId) {
        const res = await toggleLike(auth.userId, postId)
        router.push({
            name: 'post-detail',   // Tên route bạn đã định nghĩa trong router/index.js
            params: { id: postId }       // Truyền param id
        })
    }
    else {
        loginModal.open()
    }
}
function timeAgo(dateString: string): string {
    const inputDate = new Date(dateString);
    const now = new Date();

    const diffMs = now.getTime() - inputDate.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHours = Math.floor(diffMin / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffSec < 60) {
        return `${diffSec} giây trước`;
    } else if (diffMin < 60) {
        return `${diffMin} phút trước`;
    } else if (diffHours < 24) {
        return `${diffHours} giờ trước`;
    } else if (diffDays <= 30) {
        return `${diffDays} ngày trước`;
    } else {
        const diffMonths = Math.floor(diffDays / 30);
        return `${diffMonths} tháng trước`;
    }
}
onMounted(async () => {
    await getAllPostByTopic(1);
})
function goToPost(postId) {
    router.push({
        name: "post-detail",  // name của route đã định nghĩa trong router/index.js
        params: { id: postId }
    });


}
function goToProfile(params) {
    router.push({ name: 'user', params: { id: params } })
}
function convertJsonData(data) {
    return (data)
}
watch(currentPage, (newPage) => {
    getAllPostByTopic(newPage)
})
</script>
<style scoped>
.border-color-blue {
    color: #007bff;
    border: solid 1px #007bff !important
}

.border-color-red {
    color: #dc3545;
    border: solid 1px #dc3545 !important
}

.border-color-green {
    color: #28a745;
    border: solid 1px #28a745 !important
}

.border-color-pink {
    color: #C11574;
    border: solid 1px #C11574 !important
}

.border-color-gray {
    color: #6c757d;
    border: solid 1px #6c757d !important
}

.border-color-orange {
    color: #B93815;
    border: solid 1px #B93815 !important;
}

.dot-blue {
    background-color: #007bff !important;
    ;
}

.dot-red {
    background-color: #dc3545 !important;
    ;
}

.dot-green {
    background-color: #28a745 !important;
    ;
}

.dot-pink {
    background-color: #C11574 !important;
}

.dot-orange {
    background-color: #B93815 !important;
}

.dot-gray {
    background-color: #6c757d !important;
}

.like-share span {
    display: flex;
    align-items: center;
    gap: 5px
}

.like-share span svg {
    width: 17px;
}

.post-info {
    display: flex;
    align-items: center;
    gap: 10px;
}

.dot {
    height: 5px;
    /* kích thước chấm */
    width: 5px;
    background-color: #0060bf;
    border-radius: 50%;
    /* bo tròn thành hình tròn */
    display: inline-block;
    /* hiển thị inline */
}

.post-topic {
    border: solid 1px #b0d5f4;
    border-radius: 25px;
    padding: 0px 10px;
    display: inline-flex;
    /* cho phép căn giữa theo chiều dọc */
    align-items: center;
    /* căn giữa dọc */
    gap: 6px;
}
</style>
<style>
.custom-tooltip {
    font-size: 13px;
    border-radius: 8px !important;
    border: none !important;
    padding: 0;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.custom-tooltip .el-popper__arrow::before {
    background: #f7f6f2 !important;
    border: solid 1px #f7f6f2 !important;
}

.hover_link:hover {
    cursor: pointer;
    color: #ff6114;
}
@media (max-width: 768px) {
.post-list {
  width: 100%;
}

.post-item {
  border-bottom: 1px solid #e5e7eb;
  
}

.user-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
}
.color-primary_gray
{
    color: #667085;
}
.post-topic {
  background-color: #f0f7ff;
  padding: 4px 8px;
  border-radius: 8px;
  color: #1d4ed8;
}

.hover_link {
  cursor: pointer;
  transition: color 0.2s ease;
}

.hover_link:hover {
  color: #2563eb;
}
}
</style>