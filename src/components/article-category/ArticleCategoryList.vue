<template>
    <div v-if="categoryList?.length > 0" class="container">
        <h2 class="text-color_primary fw-bold">{{ Number(route.params.id) < 12 ? "Truyện " + categoryList[0]?.genre_name
            : "Toàn bộ truyện" }}</h2>
                <p style="background-color: rgba(24, 119, 242, 0.1); border-radius: 5px;"
                    class="color-blue  px-3 py-2 mt-2">
                    <span class="fw-bold">Mô tả thể loại:</span> {{ Number(route.params.id) < 12 ?
                        categoryList[0]?.genre_description
                        : "Khám phá kho truyện phong phú nhất với hàng nghìn tác phẩm thuộc nhiều thể loại khác nhau..."
                        }} </p>
                        <div class="row mt-4">
                            <div @click="goToStory(stories.story_id)" v-for="stories in pagedStories" :key="stories.id" class="box-left__content col-md-4 mt-3 cursor-pointer">
                                <img style="width: 150px; height: 240px;object-fit: cover; flex-shrink: 0; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); /* bóng mờ nhẹ */ border-radius: 8px;"
                                    :src="stories.urlImg" alt="">
                                <div class="left-content px-4">
                                    <h4 @click="goToStory(stories.story_id)"
                                        class="text-color_primary text-24 fw-bold hover_link">{{
                                        stories.title }}</h4>
                                    <p class="left-content__author text-color__tertiary">{{ stories.author }}</p>
                                    <p><img src="@/assets/icon/quote.png" alt="">
                                        <desc class="left-content__desc text-sm">
                                            {{ stories.description }}
                                        </desc>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="d-flex justify-content-center mt-3">
                             <el-pagination v-if="categoryList.length > pageSize" layout="prev, pager, next"
                            :page-size="pageSize" :current-page="currentPage" :total="categoryList.length"
                            @current-change="handlePageChange" />
                        </div>
    </div>
    <div v-else class="pt-4">
        <img style="display: block; margin: 0 auto;" src="@/assets/icon/nodata.png" />
        <p style="text-align: center;">Không có dữ liệu</p>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch, computed } from "vue";
import { useRoute } from "vue-router";
import { useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute();
const currentPage = ref(1)
const categoryList = ref([]);
const pageSize = 10; // số item trên 1 trang

import { getStoryByCategory } from '@/api/stories'
async function fetchData(categoryId) {
    const res = await getStoryByCategory(categoryId);
    // Sắp xếp theo title A → Z
    categoryList.value = res.data.sort((a, b) =>
        a.title.toLowerCase().localeCompare(b.title.toLowerCase())
    );
    console.log(categoryList.value);
}
const pagedStories = computed(() => {
    const start = (currentPage.value - 1) * pageSize;
    const end = start + pageSize;
    return categoryList.value.slice(start, end);
});

// Sự kiện thay đổi trang
function handlePageChange(page) {
    currentPage.value = page;
}
onMounted(() => {
    fetchData(route.params.id);
});

function goToStory(post_id) {
    router.push({
        name: 'story',   // Tên route bạn đã định nghĩa trong router/index.js
        params: { id: post_id }       // Truyền param id
    })
}
watch(
    () => route.params.id,
    (newId) => {
        fetchData(newId);
    }
);
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
</style>