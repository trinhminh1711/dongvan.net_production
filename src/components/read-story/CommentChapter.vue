<template>
    <p v-if="authStore.userId">Bình luận</p>
    <div :style="listComment.length == 0 ? 'margin-bottom: 100px;' : ''" v-if="authStore.userId" v-loading="loading"
        class="comment-box pb-2 pt-3 mt-3">
        <div class="post-main__info d-flex justify-content-between gap-2">
            <div class="d-flex align-items-start">
                <img style="border-radius: 50%; width: 50px; height: 50px;
                object-fit: cover;" :src="authStore.user?.link_thumbnail" alt="">
            </div>
            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 5 }" class="chap-comment-area"
                v-model="commentContent" placeholder="Thêm bình luận của bạn..." style="height: 170px; resize: none;" />
        </div>
        <div class="d-flex justify-content-end">
            <button @click="postComment()" class="btn-comment d-flex align-items-center gap-2">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M7.60206 10.0911L16.3521 1.34109M7.70838 10.3645L9.89847 15.9961C10.0914 16.4923 10.1879 16.7403 10.3269 16.8127C10.4474 16.8755 10.5909 16.8756 10.7115 16.813C10.8506 16.7407 10.9473 16.4928 11.1409 15.9969L16.6328 1.92375C16.8075 1.4761 16.8948 1.25228 16.8471 1.10925C16.8056 0.985045 16.7081 0.887572 16.5839 0.846078C16.4409 0.798298 16.217 0.885645 15.7694 1.06034L1.69627 6.55229C1.20038 6.74581 0.95243 6.84257 0.880172 6.98165C0.817532 7.10223 0.817617 7.24577 0.880398 7.36627C0.95282 7.50527 1.20088 7.60174 1.697 7.79467L7.32867 9.98477C7.42938 10.0239 7.47973 10.0435 7.52213 10.0738C7.55971 10.1006 7.59258 10.1334 7.61939 10.171C7.64963 10.2134 7.66921 10.2638 7.70838 10.3645Z"
                        stroke="#344054" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
                </svg></button>
        </div>

    </div>
    <div v-if="listComment.length > 0"
        v-for="comment in listComment" class="post-main__content mt-4 text-14 flex-grow-1">
        <div>
            <img style="width: 50px; height:50px ; border-radius: 50%;" :src="comment.avatar" alt="">
        </div>
        <div class="post-content__info">
            <div class="d-flex justify-content-between">
                <p class="fw-bold hover-link text-14">{{ comment.username }}</p>
                <p class="text-14 pe-3">{{ timeAgo(comment.created_at) }}</p>
            </div>
            <div class="text-14 mt-2">{{ comment.content }}</div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { increaseLikePostComment, getListLikeComment } from "../../api/forum";
import { useAuthStore } from "@/stores/auth";
import { useLoginModal } from "@/stores/useLoginModal";
import { useRouter } from 'vue-router'
const router = useRouter()
const loginModal = useLoginModal()
import { postCommentChapter, getCommentsByChapter } from '@/api/chapter';
const authStore = useAuthStore();
const loading = ref(false)
const listComment = ref([])
const props = defineProps({
    story_id: {
        type: Number,
    },
    chapter_id: {
        type: Number,
    }
})
async function fetchComment() {
    const res = await getCommentsByChapter(props.chapter_id, props.story_id);
    listComment.value = res.data
    console.log(listComment.value);

}
const commentContent = ref('')
async function postComment() {
    if (!commentContent.value.trim()) return; // chặn gửi rỗng
    loading.value = true;

    const payload = {
        userId: authStore.user?.user_id, // ID người đang đăng nhập
        content: commentContent.value.trim(),
    };

    const res = await postCommentChapter(props.chapter_id, props.story_id, payload);

    if (res.success) {
        commentContent.value = ""; // reset input
        setTimeout(() => {
            loading.value = false;
            window.location.reload();
        }, 1000);
    } else {
        loading.value = false;
        console.error("Server trả về lỗi:", res.message || res.error);
    }
}
function linkifyText(text) {
    if (!text) return "";
    // Regex tìm URL
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    // Thay thế link bằng thẻ a
    return text.replace(
        urlRegex,
        (url) => `<a href="${url}" target="_blank" style="color:#3498db; text-decoration:underline;">${url}</a>`
    );
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
function goToProfile(params) {
    router.push({ name: 'user', params: { id: params } })
}
const handleFocus = (e) => {
    if (!authStore.userId) {
        e.target.blur() // ngăn người dùng nhập
        loginModal.open() // mở popup login
    }
}
onMounted(async () => {
    await fetchComment()
});
</script>

<style scoped>
.comment-box {
    position: relative;

}

.box-shadow {
    border-radius: 10px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
    border: solid 1px #e7e7e7;
}

.heart-icon-unliked {


    /* màu xám mặc định */
    cursor: pointer;
    transition: color 0.3s;
}

.heart-icon-liked {
    color: red;
    /* màu xám mặc định */
    cursor: pointer;
    transition: color 0.3s;
}

.heart-icon-unliked:hover {
    color: red;
    /* khi hover đổi sang đỏ */
}

.post-main__content {
    line-height: 1.5rem;

}

.post-main__content .post-content__info {
    background-color: #F9FAFB;
    border-radius: 10px;
    padding: 10px 20px;
}

.post-main__content {
    display: flex;
    gap:10px;
}
.post-main__content .post-content__info {
    background-color: #F9FAFB;
    border-radius: 10px;
    padding: 10px 20px;
    flex: 1;
}


</style>