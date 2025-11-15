<template>
    <div v-if="dataUser">
        <div style="background-color: #F7F6F2; border-top-left-radius: 8px; border-top-right-radius: 8px; " class="d-flex gap-2 py-2 px-2 align-items-center">
            <div>
                <img style=" height:50px; width:40px" :src="dataUser.link_thumbnail" alt=""></img>
            </div>
            <div>
                <p> <span class="fw-bold text-color_primary">{{ dataUser.username }}</span><span style="color: #667085;"> (ID: 2025{{ dataUser.user_id }})</span></p>
                <p style="color: #667085;">Người đọc cấp 2</p>
                 
            </div>
        </div>
        <div style="background-color: white;" class="d-flex gap-2 justify-content-between px-2 py-2">
            <div>
                <p class="text-center text-secondary">Bài viết</p>
                <p class="text-center text-color_primary fw-semibold">{{ dataUser.total_posts }}</p>
            </div>
            <div>
               <p class="text-center text-secondary">Lượt thích</p>
               <p class="text-center text-color_primary fw-semibold">{{ dataUser.total_likes }}</p>
            </div>
            <div>
               <p class="text-center text-secondary">Tang điệp</p>
                <p class="text-center text-color_primary fw-semibold">{{ dataUser.coin_balance }}</p>
            </div>
        </div>
    </div>

</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { getUserInfo, getPostUserInfo } from '@/api/users'
const props = defineProps({
    idUserComment: {
        type: Number,
        default: false
    }
})
const dataUser = ref()
onMounted(async () => {
    const res = await getPostUserInfo(props.idUserComment);
    dataUser.value = res
})
</script>

<style></style>