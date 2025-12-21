<template>
    <div class="container">
        <div class="row mt-4">
            <div v-for="(stories, index) in categoryList" :key="index" class="box-left__content col-md-6">
                <div class="book-card">
                    <div v-if="!stories.is_vip_story" class="ribbon">FULL</div>
                    <div v-if="stories.is_vip_story" class="ribbon-vip">VIP</div>
                    <img style="width: 150px; height: 100%" :src="stories.link_img" alt=""></img>
                </div>
                <div class="left-content">
                    <p @click="goToStory(stories.story_id)" class="text-color_primary fw-bold text-lg hover-link">{{
                        stories.story_title }}</p>
                    <p @click="goToProfile(stories.author_id)" class="text-md fw-semibold hover-link">{{
                        stories.author_name }}</p>
                    <p class="color-red fst-italic"><span class="fw-bold text-md ">{{ stories.total_chapters
                            }}</span>
                        <span class="text-md">
                            chương</span>
                    </p>
                    <p @click="gotoChapDetail(stories.story_id, stories.chapter_number)" class="text-md fw-semibold  text-limit-2 hover-link">
                        Chương đang đọc: [Chương {{ stories.chapter_number }}] {{
                            stories.chapter_title }} </p>
                    <button @click="readOnBook(stories.story_id, stories.chapter_number)" class="btn-alert my-3">Đọc
                        tiếp</button>
                </div>
            </div>
        </div>
        <div v-if="!categoryList.length">
            <img style="display: block; margin: 0 auto;" src="@/assets/icon/nodata.png" />
            <p style="text-align: center;">Không có dữ liệu</p>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '../../stores/auth';
import { getListUserReading } from '@/api/stories';
import { useRouter } from "vue-router";
const router = useRouter();
const currentPage = 1
const categoryList = ref([]);
function handlePageChange(page) {
    console.log('Trang mới:', page) // In ra số trang
}
async function getListReading() {
    const auth = useAuthStore();
    const res = await getListUserReading(auth.userId);
    categoryList.value = res.data;


}
function readOnBook(storyId, chapId) {
    router.push({
        name: "chap-detail",
        params: { id: storyId, chapId: chapId }
    });
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
function gotoChapDetail(storyId, chapterId) {
    router.push({
        name: "chap-detail",
        params: {
            id: storyId,
            chapId: chapterId
        }
    });
}
onMounted(async () => {
    await getListReading()
})
</script>

<style scoped>
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

.fw-semibold {
    font-weight: 500 !important;
}
</style>