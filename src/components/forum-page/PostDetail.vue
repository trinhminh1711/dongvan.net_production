<template>
    <div v-if="postData">
        <div>
            <div>
                <h2 class="text-color_primary fw-bold d-flex gap-2 align-items-center cursor-pointer post-title">
                    <div @click="goBack()">
                        <el-icon>
                            <Back />
                        </el-icon>
                    </div>
                    {{ postData[0].title }}
                </h2>
            </div>
        </div>
        <div class="post-main p-3 mt-3">
            <div class="post-main__info d-flex align-items-center gap-1">
                <img style="width: 50px; height: 50px; border-radius: 50%;" :src="postData[0].post_link_thumbnail"
                    alt="">
                <div class="ms-3">
                    <p class="fw-bold">{{ postData[0].post_username }}</p>
                    <p class="text-sm"> <el-icon>
                            <Calendar />
                        </el-icon> {{ timeAgo(postData[0].created_at) }}</p>
                </div>
            </div>
            <div class="post-main__content text-sm ps-md-5 pe-md-3 mt-3">
                <div v-html="postData[0].content"></div>
                <div class="post-comment">
                    <p class="like-share d-flex gap-4 py-4">
                        <span @click="likePost(postData[0].post_id)"
                            class="d-flex align-items-center gap-2 cursor-pointer text-md">
                            <svg width="20" height="18" viewBox="0 0 20 18" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M9.99431 3.27985C8.32819 1.332 5.54981 0.808035 3.46227 2.59168C1.37472 4.37532 1.08083 7.35748 2.72019 9.467C4.0832 11.2209 8.20816 14.9201 9.5601 16.1174C9.71136 16.2513 9.78698 16.3183 9.8752 16.3446C9.95219 16.3676 10.0364 16.3676 10.1134 16.3446C10.2016 16.3183 10.2773 16.2513 10.4285 16.1174C11.7805 14.9201 15.9054 11.2209 17.2684 9.467C18.9078 7.35748 18.6498 4.35656 16.5264 2.59168C14.4029 0.826798 11.6604 1.332 9.99431 3.27985Z"
                                    :fill="isLiked ? '#FF0000' : '#667085'" :stroke="isLiked ? 'none' : '#667085'"
                                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            {{ listLiked?.total_likes || 0 }}
                        </span>
                        <span @click="!auth.userId && loginModal.open()" class="d-flex align-items-center gap-2 text-md cursor-pointer">
                            <svg width="21" height="20" viewBox="0 0 21 20" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M2.20864 10.6074C1.96452 10.3981 1.84246 10.2935 1.79774 10.169C1.75848 10.0598 1.75848 9.94022 1.79774 9.83095C1.84246 9.70645 1.96452 9.60183 2.20864 9.39258L10.6794 2.13196C11.0996 1.77176 11.3097 1.59166 11.4876 1.58725C11.6422 1.58342 11.7899 1.65134 11.8876 1.77122C12 1.90915 12 2.18589 12 2.73936V7.03462C14.1347 7.40807 16.0884 8.48974 17.5403 10.1139C19.1232 11.8845 19.9988 14.1759 20 16.551V17.1629C18.9507 15.8989 17.6405 14.8765 16.1592 14.1659C14.8533 13.5394 13.4416 13.1683 12 13.0705V17.2606C12 17.8141 12 18.0908 11.8876 18.2288C11.7899 18.3486 11.6422 18.4166 11.4876 18.4127C11.3097 18.4083 11.0996 18.2282 10.6794 17.868L2.20864 10.6074Z"
                                    stroke="#667085" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>

                            Trả lời
                        </span>
                    </p>
                </div>
            </div>

        </div>
        <div class="post__comment mt-5 ms-2">
            <h4 v-if="showComment" class=" mb-3 fw-bold">Bình luận ({{ listComment.length }})</h4>
        </div>
    </div>
    <PostComment v-if="showComment" v-for="value in listComment" :user_id="value.comment_user_id" :comment_id="value.comment_id"
        :like="value.comment_total_likes" :user="value.comment_username" :user_thumbnail="value.comment_link_thumbnail"
        :comment="value.comment_content" :date="value.comment_created_at" />
    <div class="post__comment">

        <div class="user-comment">
            <InputCommentPost :postId="Number(route.params.id)" />
        </div>
    </div>
</template>
<script setup lang="ts">
import { toggleLike, getListLikePost } from '../../api/forum';
import PostComment from './PostComment.vue';
import { useRoute } from "vue-router";
import { useRouter } from 'vue-router'
import { getPostDetail } from '@/api/forum';
import { onMounted, ref, computed } from 'vue';
import { useAuthStore } from "@/stores/auth";
import { useLoginModal } from '@/stores/useLoginModal';
const loginModal = useLoginModal()
const isLiked = ref(false)
import InputCommentPost from './inputCommentPost.vue';
const route = useRoute();
const auth = useAuthStore()
const showComment = ref()
const postData = ref();
const listLiked = ref()
const listComment = ref([])
const router = useRouter()

function goBack() {
    router.back()
}
onMounted(async () => {
    const postId = route.params.id;
    const res = await getPostDetail(postId);
    postData.value = res.data;
    showComment.value = res.data[0].comment_id;
    listComment.value = postData.value.map(item => ({
        comment_id: item.comment_id,
        comment_user_id: item.comment_user_id,
        comment_username: item.comment_username,
        comment_link_thumbnail: item.comment_link_thumbnail,
        comment_content: item.comment_content,
        comment_created_at: item.comment_created_at,
        comment_total_likes: item.comment_total_likes
    }));
    console.log(1,listComment.value);
    
    getListLike()
})
async function getListLike() {
    const res = await getListLikePost(route.params.id);
    listLiked.value = res
    isLiked.value = res.liked_users.some(
        (u) => u.user_id == auth.userId
    );
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
async function likePost(id) {
    if (auth.userId) {
        isLiked.value = !isLiked.value // đảo trạng thái like
        await toggleLike(auth.userId, id)
        await getListLike()
    }
    else{
        loginModal.open()
    }

}
// ví dụ test

</script>
<style>
.post-main {
    border-radius: 10px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
    border: solid 1px #e7e7e7;
}

.post-main__content {
    line-height: 1.5rem;

}

.cursor-pointer:hover {
    cursor: pointer;
}
@media (max-width: 768px) {
    .post-title
    {
        font-size: 16px;
    }
}
</style>
