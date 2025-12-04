<template>
    <div class="container">
        <div class="row mt-4">
            <div v-for="stories in categoryList" :key="stories.id" class="box-left__content col-md-6">
                <div class="book-card">
                    <div v-if="!stories" class="ribbon">FULL</div>
                    <div v-if="stories" class="ribbon-vip">VIP</div>
                    <img style="width: 150px; height: 100%; border-radius: 10px;" :src="stories.urlImg" alt=""></img>
                </div>
                <div class="left-content">
                    <p @click="goToStory(stories.story_id)" class="text-color_primary fw-bold text-lg hover-link">{{
                        stories.title }}</p>
                    <p @click="goToProfile(stories.author_id)" class="text-md hover-link">Tác giả: {{
                        stories.author_name }}</p>
                    <p class="color-red fst-italic"><span class="fw-bold text-md">{{
                            stories.total_chapters}}</span><span class="text-md">
                            chương</span></p>
                    <button @click="readBook(stories.story_id)" class="btn-alert my-4">Đọc truyện</button>
                    <p class="text-md-nowrap"><input type="checkbox" :value="stories.story_id">
                        Nhận thông báo khi có chương mới </input></p>
                </div>
            </div>
        </div>
        <div v-if="!categoryList.length">
            <div class="nodata-block">
                <img style="display: block; margin: 0 auto;" src="@/assets/icon/nodata.png" />
                <p style="text-align: center;">Không có dữ liệu</p>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { getListPostLike } from "@/api/stories";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from 'vue-router'
const router = useRouter()
const auth = useAuthStore()
const listStoryChecked = false;
const categoryList = ref([]);

onMounted(async () => {
    const user_id = auth.userId
    const res = await getListPostLike(user_id);
    categoryList.value = res
})
function readBook(id) {
    router.push({ name: 'story', params: { id: id } })
}
function goToStory(post_id) {
    router.push({
        name: 'story',   // Tên route bạn đã định nghĩa trong router/index.js
        params: { id: post_id }       // Truyền param id
    })
}
function goToProfile(params) {
    router.push({ name: 'user', params: { id: params } })
}
</script>

<style scoped>
.box-left__content {
    display: flex;
    padding: 10px;
}

.box-left__content .left-content {
    padding: 10px 15px;
    width: 60%;
}

.left-content__desc {
    display: -webkit-box;
    /* cần cho multi-line clamp */
    -webkit-line-clamp: 4;
    /* số dòng muốn hiển thị */
    -webkit-box-orient: vertical;
    /* hướng hộp */
    overflow: hidden;
}

.box-left__content h4 {
    font-size: 22px;
}

.book-card {
    position: relative;
    overflow: hidden;
    border-radius: 8px;
}

.ribbon {
    position: absolute;
    top: 12px;
    left: -35px;
    /* dịch ra để canh chéo */
    width: 120px;
    text-align: center;
    background: #16a34a;
    /* xanh lá */
    color: #fff;
    font-weight: bold;
    transform: rotate(-45deg);
    padding: 4px 0;
    font-size: 14px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
}

.ribbon-vip {
    position: absolute;
    top: 12px;
    left: -35px;
    /* dịch ra để canh chéo */
    width: 120px;
    text-align: center;
    background: red;
    /* xanh lá */
    color: #fff;
    font-weight: bold;
    transform: rotate(-45deg);
    padding: 4px 0;
    font-size: 14px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
}
</style>