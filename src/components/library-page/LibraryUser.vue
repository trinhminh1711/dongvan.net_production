<template>
    <div class="container">
        <div class="row mt-4">
            <div v-for="stories in categoryList" :key="stories.id" class="box-left__content col-md-6 py-3">
                <img style="width: 150px; height: 100%; border-radius: 10px; border: solid 2px #E4E7EC;" :src="stories.urlImg">
                <div class="left-content">
                    <h4 @click="goToStory(stories.story_id)"  class="text-color_primary fw-bold hover-link">{{ stories.title }}</h4>
                    <p class="color-red fst-italic"><span class="fw-bold text-md">
                        {{ stories.last_chap_number > 0 ? stories.last_chap_number + ' Chương' : 'Chưa đăng chương' }}</span><span class="text-md"></span></p>
                    <p class="text-sm"> Chương đang viết: [Chương 1] Trùng Sinh Tỉnh Lại </p>
                     <button  @click="$router.push(`/create-story/new-chap/${stories.story_id}`)" v-if="!stories.last_chapter_is_final" class="btn-alert my-3">Đăng Chương</button>
                    <button v-if="stories.last_chapter_is_final" class="btn-success my-3">Hoàn thành</button>
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
const currentPage = 1
import { ref, onMounted } from 'vue';
import { useAuthStore } from "@/stores/auth";
const auth = useAuthStore()
const categoryList = ref([]);
import { useRouter } from "vue-router";
const router = useRouter();
import { getStory } from "@/api/stories"
function handlePageChange(page) {
  console.log('Trang mới:', page) // In ra số trang
}
onMounted(async () => {
    const res = await getStory(auth.userId);
    categoryList.value = res
    
})
function goToStory(post_id) {
    router.push({
        name: 'story',   // Tên route bạn đã định nghĩa trong router/index.js
        params: { id: post_id }       // Truyền param id
    })
}
</script>

<style scoped>
.box-left__content {
    display: flex;
    padding: 10px;
}

.box-left__content .left-content {
    padding: 10px 15px;
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
.box-left__content h4
{
    font-size: 22px;
}
</style>