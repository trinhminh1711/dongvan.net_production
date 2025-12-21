<template>
    <h3 data-v-132bd6c3="" class="list-title text-color_primary border-b mb-4 pb-2  title-mobile">Truyện đã hoàn thành</h3>
    <div class="row mt-4">
        <div v-for="stories in categoryList" :key="stories.id" class="box-left__content col-md-6">
            <div class="book-card">
                <div class="ribbon">FULL</div>
                <img style="width: 150px; height: 100%; border-radius: 10px;" :src="stories.urlImg" alt=""></img>
            </div>
            <div class="left-content">
                <p @click="goToStory(stories.story_id)" class="text-color_primary fw-bold text-mb-md hover-link">{{
                    stories.title }}</p>
                <p @click="goToProfile(stories.author_id)" class="text-md hover-link">{{
                    stories.pen_name || stories.author_name }}</p>
                <p class="color-red fst-italic"><span class="fw-bold text-md">{{
                    stories.chap_number || "Chưa đăng " }}</span><span class="text-md">
                        chương</span></p>
                <p  class="text-mb-sm text-justify text-limit-5">
                    {{ stories.description }}</p>
            </div>
        </div>
    </div>
    <div v-if="!categoryList.length">
        <div class="nodata-block">
            <img style="display: block; margin: 0 auto;" src="@/assets/icon/nodata.png" />
            <p style="text-align: center;">Không có dữ liệu</p>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { getListPostLike, unfollowStory, followStory, getFollowedStories } from "@/api/stories";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from 'vue-router'
import { getStoryComplete } from '@/api/stories';
const router = useRouter()
const auth = useAuthStore()
const listStoryChecked = false;
const categoryList = ref([]);
const selectedStories = ref([])
onMounted(async () => {
    const res = await getStoryComplete(10);
    categoryList.value = res
    console.log(res);
    
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
async function getStoryFollow() {
    const res = await getFollowedStories(auth.userId)
    selectedStories.value = res.map(item => item.story_id)

}
async function handleChange(storyId, event) {
    const isChecked = event.target.checked
    if (isChecked) {
        await followStory(auth.userId, storyId)
        console.log('✅ Theo dõi', storyId)
    } else {
        await unfollowStory(storyId, auth.userId)
        console.log('❌ Bỏ theo dõi', storyId)
    }
}
</script>

<style scoped>
.box-left__content {
    display: flex;
    padding: 10px;
}
.text-limit-5 {
  display: -webkit-box;
  -webkit-line-clamp: 5;      /* Giới hạn tối đa 5 dòng */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;    /* Thêm dấu ... */
}
.book-card {
    width: 40%;
}

.box-left__content .left-content {
    padding: 10px 15px;
    flex: 1;
    /* giúp chiếm hết phần còn lại */
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