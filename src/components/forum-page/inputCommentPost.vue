<template>
    <p v-if="authStore.userId" class=" mb-3 mt-5 fw-bold ms-2">Tham gia thảo luận</p>
    <div v-if="authStore.userId" v-loading="loading" class="comment-box pb-2 pt-3">
        <div class="post-main__info d-flex justify-content-between gap-3">
            <div class="d-flex align-items-start">
                <img style="width: 50px; height: 50px; border-radius: 50%;" :src="authStore.user?.link_thumbnail"
                    alt="">
            </div>
            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 3 }" class="comment-area-parent" v-model="commentContent" placeholder="Thêm bình luận của bạn..."
                style="height: 130px; resize: none;" />
            <button @click="postComment()" class="btn-comment d-flex align-items-center gap-2">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M7.60206 10.0911L16.3521 1.34109M7.70838 10.3645L9.89847 15.9961C10.0914 16.4923 10.1879 16.7403 10.3269 16.8127C10.4474 16.8755 10.5909 16.8756 10.7115 16.813C10.8506 16.7407 10.9473 16.4928 11.1409 15.9969L16.6328 1.92375C16.8075 1.4761 16.8948 1.25228 16.8471 1.10925C16.8056 0.985045 16.7081 0.887572 16.5839 0.846078C16.4409 0.798298 16.217 0.885645 15.7694 1.06034L1.69627 6.55229C1.20038 6.74581 0.95243 6.84257 0.880172 6.98165C0.817532 7.10223 0.817617 7.24577 0.880398 7.36627C0.95282 7.50527 1.20088 7.60174 1.697 7.79467L7.32867 9.98477C7.42938 10.0239 7.47973 10.0435 7.52213 10.0738C7.55971 10.1006 7.59258 10.1334 7.61939 10.171C7.64963 10.2134 7.66921 10.2638 7.70838 10.3645Z"
                        stroke="#344054" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
                </svg></button>
        </div>
    </div>

</template>

<script lang="ts" setup>
import { useLoginModal } from '@/stores/useLoginModal'
import { useAuthStore } from "@/stores/auth";
import { addPostComment } from "@/api/forum";
const loginModal = useLoginModal()
const authStore = useAuthStore();
import { ref, onMounted } from 'vue'
const loading = ref(false)
const props = defineProps({
    postId: {
        type: Number,
    }
})
const commentContent = ref('')
async function postComment() {


    loading.value = true
    const res = await addPostComment(props.postId, authStore.userId, commentContent.value)
    if (res.success) {
        setTimeout(() => {
            loading.value = false
            window.location.reload();
        }, 1000);
    } else {
        loading.value = false
        console.error("Server trả về lỗi:", res.error);
    }

}
onMounted(() => {


})
</script>
<style></style>