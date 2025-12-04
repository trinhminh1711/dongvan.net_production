<template>
    <div>
        <PostCard v-for="(post, index) in paginatedPosts" :key="index" :title="post.title" :content="post.content"
            :username="post.username" :user_id="post.user_id" :created_at="timeAgo(post.created_at)" :hashtag="post.hashtag"
            :postId="post.post_id"
            :total_likes="post.total_likes" :total_comments="post.total_comments" :is-active="true"
            :topic_title="post.topic_title" :topic_id="post.topic_id" :STT="index" />
        <div class="d-flex justify-content-center mt-4">
            <el-pagination layout="prev, pager, next" :total="postData.length" :page-size="pageSize"
                v-model:current-page="currentPage" @current-change="handlePageChange" />
        </div>
    </div>
    <el-dialog v-model="dialogVisible" width="500">
        <CreatePostForum />
    </el-dialog>
</template>

<script lang="ts" setup>
import { onMounted, ref, computed } from "vue"
import { getPost } from "@/api/forum";
import CreatePostForum from './CreatePostForum.vue';
import PostCard from './PostCard.vue';
const dialogVisible = ref(false)
const currentPage = ref(1);
const pageSize = ref(3); // số bài trên mỗi trang
const postData = ref([])
onMounted(async () => {
    const res = await getPost()
    postData.value = res.data

    
})
const paginatedPosts = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value;
    const end = start + pageSize.value;
    return postData.value.slice(start, end);
});
function handlePageChange(page) {
    currentPage.value = page;
}
function timeAgo(isoString) {
    const now = new Date();
    const past = new Date(isoString);
    const diffMs = now.getTime() - past.getTime(); // chênh lệch mili giây

    const diffSeconds = Math.floor(diffMs / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);
    const diffMonths = Math.floor(diffDays / 30);

    if (diffMinutes < 60) {
        return `${diffMinutes} phút trước`;
    } else if (diffHours < 24) {
        return `${diffHours} giờ trước`;
    } else if (diffDays < 30) {
        return `${diffDays} ngày trước`;
    } else {
        return `${diffMonths} tháng trước`;
    }
}
</script>

<style></style>