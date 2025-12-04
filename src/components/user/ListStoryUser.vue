<template>
    <div class="container">
        <div v-if="categoryList.length" class="row">
            <div v-for="(stories, index) in paginatedList" :key="index" class="box-left__content col-md-6 mt-2">
                <div class="book-card col-5">
                    <img style=" width: 150px;
    height: 100%;
    border-radius: 10px;" class="d-block" :src="stories.urlImg" alt=""></img>
                </div>
                <div class="left-content col-7">
                    <p class="text-color_primary fw-bold text-lg">{{ stories.title }}</p>
                    <p class="color-red fst-italic"><span class="fw-bold text-md">{{ stories.last_chap_number > 0 ?
                        stories.last_chap_number : "Chưa có" }}</span>
                        <span class="text-md">
                            chương</span>
                    </p>
                    <button @click="readOnBook(stories.story_id)" class="btn-alert my-3">Đọc
                        ngay</button>
                </div>
            </div>
        </div>
        <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[6, 10, 20, 50]"
            :total="total" layout=" prev, pager, next" class="mt-4 d-flex justify-content-center" />
        <div v-if="!categoryList.length">
            <img style="display: block; margin: 0 auto;" src="@/assets/icon/nodata.png" />
            <p style="text-align: center;">Không có dữ liệu</p>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue';
import { useAuthStore } from '../../stores/auth';
import { getListUserReading } from '@/api/stories';
import { getStory } from '@/api/stories';
import { useRouter } from "vue-router";
const router = useRouter();

const categoryList = ref([])       // toàn bộ data trả về
const currentPage = ref(1)         // trang hiện tại
const pageSize = ref(6)
const props = defineProps({
    userId: {
        type: [Number, String],
        required: true
    },
})
function handlePageChange(page) {
    console.log('Trang mới:', page) // In ra số trang
}
async function getListReading() {
    const res = await getStory(props.userId)
    categoryList.value = res
    console.log(res);

}

function readOnBook(storyId) {
    router.push({
        name: "story",
        params: { id: storyId }
    });
}
const paginatedList = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value
    return categoryList.value.slice(start, start + pageSize.value)
})

const totalPages = computed(() => {
    return Math.ceil(categoryList.value.length / pageSize.value)
})
const total = computed(() => categoryList.value.length)
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