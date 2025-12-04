<template>
     <p v-if="authStore.userId" class=" mb-3 mt-5 fw-bold ms-2">Tham gia thảo luận</p>
    <div v-if="authStore.userId" v-loading="loading" class="comment-box px-3 pb-2 pt-3">
        <div class="post-main__info d-flex justify-content-between gap-1">
            <div class="d-flex align-items-start">
                <img style="width: 50px; height: 50px; border-radius: 50%;" :src="authStore.user?.link_thumbnail" alt="">
            </div>
            <el-mention v-model="commentContent" type="textarea" placeholder="Thêm bình luận của bạn"
                style="height: 100px; resize: none;" />
        </div>
        <div class="d-flex justify-content-end">
            <button @click="postComment()" class="btn-alert d-flex align-items-center gap-2">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M9.49952 12.5001L19.9995 2.00005M9.6271 12.8281L12.2552 19.5861C12.4867 20.1815 12.6025 20.4791 12.7693 20.566C12.9139 20.6414 13.0862 20.6415 13.2308 20.5663C13.3977 20.4796 13.5139 20.1821 13.7461 19.587L20.3364 2.69925C20.5461 2.16207 20.6509 1.89348 20.5935 1.72185C20.5437 1.5728 20.4268 1.45583 20.2777 1.40604C20.1061 1.34871 19.8375 1.45352 19.3003 1.66315L2.41258 8.25349C1.8175 8.48572 1.51997 8.60183 1.43326 8.76873C1.35809 8.91342 1.35819 9.08567 1.43353 9.23027C1.52043 9.39707 1.81811 9.51283 2.41345 9.74436L9.17146 12.3725C9.29231 12.4195 9.35273 12.443 9.40361 12.4793C9.44871 12.5114 9.48815 12.5509 9.52031 12.596C9.55661 12.6468 9.58011 12.7073 9.6271 12.8281Z"
                        stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                Đăng bình luận</button>
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
onMounted(()=>
{
    

})
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