<template>
    <div v-if="categoryList?.length > 0" class="container">
        <div class="row mt-4">
            <div v-for="stories in categoryList" :key="stories.id" class="box-left__content col-md-6">
                <img class="img-cover" :src="stories.urlImg" alt="">
                <div class="left-content">
                    <h4 class="text-color_primary fw-bold hover_link" @click="gotoStory(stories.story_id)">
                        {{ stories.title }}
                    </h4>
                    <p class="color-red fst-italic">
                        <span class="text-md">
                            <span class="fw-bold">{{ stories.last_chap_number ?? 1 }}</span> chương</span>
                    </p>
                    <p class="text-md py-2"> Chương đang viết: [Chương {{ stories.last_chap_number ?? 1 }}]
                        {{ stories.last_chapter_title }} </p>
                    <button @click="createNewTrap(stories.story_id, stories)" class="btn-alert my-4">Đăng
                        chương</button>
                </div>
            </div>
        </div>

    </div>
    <div class="nodata-wrapper" v-if="!(categoryList?.length > 0)">
        <img style="display: block; margin: 0 auto;" src="@/assets/icon/nodata.png" />
        <p style="text-align: center;">Không có dữ liệu</p>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ref, onMounted } from "vue"
import { toast } from 'vue3-toastify';
import { getStory } from "@/api/stories"
import { useAuthStore } from "@/stores/auth";
const auth = useAuthStore();
const stories = ref([])
const loading = ref(false)
const router = useRouter()
const currentPage = 1
const categoryList = ref([]);
onMounted(async () => {
    const res = await getStory(auth.userId)
    categoryList.value = res
})
function handlePageChange(page) {
    console.log('Trang mới:', page) // In ra số trang
}
function gotoStory(id) {
    router.push({ name: 'story', params: { id } });
}
function createNewTrap(story_id, stories) {
    if (stories.last_chapter_is_final) {
        toast.info("Bạn đã hoàn thành bộ truyện!")
    }
    else {
        router.push(`/create-story/new-chap/${story_id}`)
    }

}

</script>
<style>
.nodata-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 500px; /* hoặc 100% vùng tab */
  text-align: center;
}
.nodata-wrapper img {
  width: 250px;
  margin-bottom: 10px;
}
</style>
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

.box-left__content h4 {
    font-size: 22px;
}

.img-cover {
    width: 150px;
    border-radius: 10px;
    object-fit: cover;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
}
</style>