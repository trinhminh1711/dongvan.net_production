<template>
    <div class="d-flex align-items-center justify-content-between">
        <div>
            <h3 class="text-color_primary fw-bold">{{ tableData[0]?.topicTitle }}</h3>
            <p>Trao đổi chia sẻ những câu truyện hay nào!</p>
        </div>
        <div>
            <button @click="dialogVisible = true" class="btn-alert"><el-icon class="align-middle">
                    <Plus />
                </el-icon> <span class="align-middle py-2">Đăng bài mới</span></button>
        </div>
    </div>
    <div class="mt-4" style="border: solid 1px #E4E7EC; border-radius: 10px;">
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
                                <img style="width: 70px; height: 70px; border-radius: 50%;" :src="scope.row.avatarImg"
                                    alt="">
                            </el-tooltip>
                        </div>
                        <div class="info">
                            <p> <span class="text-sm fw-semibold color-blue post-topic"><span class="dot"></span>
                                    {{ scope.row.topicTitle }}
                                </span> <span @click="goToPost(scope.row.postId)"
                                    class="text-md fw-bold color-blue hover_link">{{
                                        scope.row.name }}</span></p>
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
                        <span>
<svg data-v-fb47b416="" class="heart-icon-unliked" width="22" height="20" viewBox="0 0 20 18" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path data-v-fb47b416="" d="M9.99431 3.27985C8.32819 1.332 5.54981 0.808035 3.46227 2.59168C1.37472 4.37532 1.08083 7.35748 2.72019 9.467C4.0832 11.2209 8.20816 14.9201 9.5601 16.1174C9.71136 16.2513 9.78698 16.3183 9.8752 16.3446C9.95219 16.3676 10.0364 16.3676 10.1134 16.3446C10.2016 16.3183 10.2773 16.2513 10.4285 16.1174C11.7805 14.9201 15.9054 11.2209 17.2684 9.467C18.9078 7.35748 18.6498 4.35656 16.5264 2.59168C14.4029 0.826798 11.6604 1.332 9.99431 3.27985Z"></path></svg>
                            {{ scope.row.like }}</span>
                        <span><el-icon>
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
                            <p class="text-md color-blue">{{ scope.row.closestInteraction.date }}</p>
                            <p class="text-sm">{{ scope.row.closestInteraction.name }}</p>
                        </div>
                        <el-tooltip popper-class="custom-tooltip" placement="left-start">
                            <template #content>
                                <UserInfoCard :idUserComment="scope.row.closestInteraction.user_id" />
                            </template>
                            <img v-if="scope.row.closestInteraction.user_id"
                                style="width: 40px; height: 40px; border-radius: 50%;"
                                :src="scope.row.closestInteraction.avatarImg" alt="">
                        </el-tooltip>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <div class="example-pagination-block d-flex justify-content-center mt-2">
            <el-pagination :page-size="5" v-model:current-page="currentPage" layout="prev, pager, next"
                :total="totalPage" />
        </div>
    </div>


    <el-dialog v-model="dialogVisible" width="500">
        <CreatePostForum />
    </el-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import CreatePostForum from './CreatePostForum.vue';
import { getPostForumByTopic } from '@/api/forum';
import UserInfoCard from './UserInfoCard.vue';
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
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
async function getAllPostByTopic(page) {
    const res = await getPostForumByTopic(route.params.id, page, 5);
    listPostTopic.value = res.data;
    totalPage.value = res.totalPage;
    console.log(listPostTopic.value);

    tableData.value = listPostTopic.value.map(post => ({
        topicTitle: post.topic_title,
        postId: post.post_id,
        avatarImg: post.link_thumbnail, // tạm thời fix cứng, hoặc lấy từ user table
        name: post.title,
        user_id: post.user_id,
        author: post.username,  // chỗ này có thể thay bằng username nếu backend trả về
        time: timeAgo(post.created_at), // cần xử lý từ created_at nếu backend có
        like: post.total_likes, // nếu backend có trường view thì gán trực tiếp
        comment: post.total_comments, // hoặc số comment thực tế nếu có
        closestInteraction: {
            avatarImg: post.latest_comment ? convertJsonData(post.latest_comment).link_thumbnail : null,
            name: post.latest_comment ? convertJsonData(post.latest_comment).username : "Chưa có tương tác",
            date: post.latest_comment ? convertJsonData(post.latest_comment).created_at.split(" ")[0] : null,
            user_id: post.latest_comment ? convertJsonData(post.latest_comment).user_id : null,
        }
    }));
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
    border-radius: 10px;
    padding: 2px 10px;
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
</style>