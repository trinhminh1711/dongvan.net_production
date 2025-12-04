<template>
    <div v-if="authStore.userId" v-loading="loading" class="comment-box px-3 pb-2 pt-3 mt-3">
        <div class="post-main__info d-flex justify-content-between gap-1">
            <div class="d-flex align-items-start">
                <img @click="goToProfile(authStore.userId)" style="width: 50px; height: 50px; border-radius: 50%;" :src="authStore.user?.link_thumbnail"
                    alt="">
            </div>
            <el-mention @focus="handleFocus" v-model="commentContent" type="textarea"
                placeholder="Thêm bình luận của bạn" style="height: 80px; resize: none;" />
        </div>
        <div class="d-flex justify-content-end">
            <button @click="postComment()" class="btn-alert d-flex align-items-center gap-2">
                <el-icon>
                    <Promotion />
                </el-icon></button>
        </div>

    </div>
</template>

<script lang="ts" setup>
import { useLoginModal } from '@/stores/useLoginModal'

const loginModal = useLoginModal()
import { useAuthStore } from "@/stores/auth";
import { addPostComment } from "@/api/forum";
import { createReply } from "@/api/forum";
const authStore = useAuthStore();
import { ref, onMounted } from 'vue'
const loading = ref(false)
const emit = defineEmits(['reload']);
import { useRouter } from 'vue-router'
const router = useRouter()
const props = defineProps({
    commentId: {
        type: Number,
    }
})
const commentContent = ref('')
async function postComment() {
    loading.value = true
    const res = await createReply(props.commentId, authStore.userId, commentContent.value)
    if (res.success) {
        setTimeout(() => {
            loading.value = false
            emit('reload');
        }, 1000);
    } else {
        loading.value = false
        console.error("Server trả về lỗi:", res.error);
    }
}
const handleFocus = (e) => {
    if (!authStore.userId) {
        e.target.blur() // ngăn người dùng nhập
        loginModal.open() // mở popup login
    }
}
function goToProfile(params) {   
    router.push({ name: 'user', params: { id: params } })
}
</script>

<style>
.comment-box {
    border-radius: 10px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
    border: solid 1px #e7e7e7;
}

.comment-box .el-mention,
.comment-box .el-mention .el-textarea__inner {
    border: none !important;
    box-shadow: none !important;
    outline: none !important;
}

.comment-box .el-mention.is-focus,
.comment-box .el-mention.is-focus .el-textarea__inner {
    border: none !important;
    box-shadow: none !important;
    outline: none !important;
}
</style>