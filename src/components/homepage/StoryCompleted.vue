<template>
    <div class="container px-0">
        <h3 class="text-color_primary fw-bold mb-4 mt-5 text-24">Truyện Đã Hoàn Thành</h3>
        <div v-if="storyComplete" class="row d-md-flex d-none  mt-5">
            <!-- <div class="col-md-3">
                <div @click="gotoStory(storyComplete?.[1].story_id)"
                    class="box-img__vertical box-img__vertical2 d-flex flex-column gap-2 px-4 cursor-pointer">
                    <div class="d-flex">
                        <div class="coverflow">
                            <img :src="storyComplete?.[1].urlImg" alt="Book Left" class="left">
                            <img :src="storyComplete?.[1].urlImg" alt="Book Center" class="active">
                            <img :src="storyComplete?.[1].urlImg" alt="Book Right" class="right">
                        </div>
                    </div>
                    <p class="text-center fw-semibold">{{ storyComplete?.[1].title }}</p>
                    <p class="text-center color-alert text-md mt-1">
                        <span class="fw-bold"> {{ storyComplete?.[1].chap_number }} </span> chương
                    </p>
                    <p class="text-sm text-center text-three-line">{{ storyComplete?.[1].description }}</p>
                    <p @click="gotoStory(storyComplete?.[1].story_id)" class="text-center mt-2"> <button
                            class="btn-alert__rounded">Đọc ngay</button></p>
                </div>
            </div> -->
            <div class="list-container">
                <div class="row g-5">
                    <div @click="goToStory(stories.story_id)" v-for="stories in listStoryCompleteWithCategory"
                        :key="stories.id" class="box-left__content col-md-4 cursor-pointer">
                        <div class="cover-book">
                            <a @click="goToStory(stories.story_id)" href=""> <img style="" :src="stories.urlImg"
                                    alt=""></a>
                            <span></span>
                        </div>
                        <div class="left-content">
                            <h4 @click="goToStory(stories.story_id)"
                                class="text-color_primary text-18 fw-bold text-limit-2 hover_link ">{{
                                    stories.title }}</h4>
                            <p class="left-content__author text-color__tertiary">{{ stories.pen_name ||
                                stories.username }}</p>
                            <p data-v-a3bb3c86="" class="color-red fst-italic"><span data-v-a3bb3c86=""
                                    class="fw-bold text-md">{{ stories.chap_number || 'chương' }}</span><span
                                    data-v-a3bb3c86="" class="text-md">
                                    chương</span></p>
                            <p><img src="@/assets/icon/quote.png" alt="">
                                <desc style="text-align: justify;" class="left-content__desc text-sm">
                                    {{ stories.description }}
                                </desc>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="bottom-card-image pt-100">
            <div @click="goToStory(item.story_id)"
                class="d-flex flex-column align-items-center gap-2 py-3 cursor-pointer"
                v-for="(item, index) in storyCompletedBottom">
                <div class="cover-book cover-book-small">
                    <img style="max-width: 70px; height:100%; box-shadow: rgba(0, 0, 0, 0.25) 0px 3px 10px; border-radius: 5px;"
                        :src="item.urlImg" alt="">
                </div>

                <p class="text-color_primary fw-bold text-md text-one-line hover-link px-3">{{ item.title }}</p>
                <small class="d-block"> {{ item.genre_name }} </small>
                <button @click="goToStory(item.story_id)" class="btn-outline">Đọc ngay</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { getStoryRandom, getStoryComplete } from '@/api/stories';
import { useRouter } from 'vue-router'
const router = useRouter()

const storyCompletedBottom = ref([])
const storyComplete = ref(null)
const storyComplete2 = ref(null)
const storyCompleted1 = ref([
    {
        category: 1,
        content: [
            { author: "Bố Cốc Liêu", name: "Tiên Lục" },
            { author: "Phạm A Lâm", name: "Ta Tại Sông Vô Định Vớt" },
            { author: "Tiêu Tiềm", name: "Ất Mộc Tu Tiên Lục" },
            { author: "Đổng Cầu Đế", name: "Lục Nhân Thiên Kiêu" },
            { author: "Bán Hồ Sinh Khương", name: "Tộc Trưởng Mang" },
        ],
        image: new URL('@/assets/icon/category-completed1.png', import.meta.url).href
    },
    {
        category: 2,
        content: [
            { author: "Bố Cốc Liêu", name: "Tiên Lục" },
            { author: "Phạm A Lâm", name: "Ta Tại Sông Vô Định Vớt" },
            { author: "Tiêu Tiềm", name: "Ất Mộc Tu Tiên Lục" },
            { author: "Đổng Cầu Đế", name: "Lục Nhân Thiên Kiêu" },
            { author: "Bán Hồ Sinh Khương", name: "Tộc Trưởng Mang" },
        ],
        image: new URL('@/assets/icon/category-completed2.png', import.meta.url).href
    },
    {
        category: 3,
        content: [
            { author: "Bố Cốc Liêu", name: "Tiên Lục" },
            { author: "Phạm A Lâm", name: "Ta Tại Sông Vô Định Vớt" },
            { author: "Tiêu Tiềm", name: "Ất Mộc Tu Tiên Lục" },
            { author: "Đổng Cầu Đế", name: "Lục Nhân Thiên Kiêu" },
            { author: "Bán Hồ Sinh Khương", name: "Tộc Trưởng Mang" },
        ],
        image: new URL('@/assets/icon/category-completed3.png', import.meta.url).href
    },
    {
        category: 4,
        content: [
            { author: "Bố Cốc Liêu", name: "Tiên Lục" },
            { author: "Phạm A Lâm", name: "Ta Tại Sông Vô Định Vớt" },
            { author: "Tiêu Tiềm", name: "Ất Mộc Tu Tiên Lục" },
            { author: "Đổng Cầu Đế", name: "Lục Nhân Thiên Kiêu" },
            { author: "Bán Hồ Sinh Khương", name: "Tộc Trưởng Mang" },
        ],
        image: new URL('@/assets/icon/category-completed4.png', import.meta.url).href
    },
    {
        category: 5,
        content: [
            { author: "Bố Cốc Liêu", name: "Tiên Lục" },
            { author: "Phạm A Lâm", name: "Ta Tại Sông Vô Định Vớt" },
            { author: "Tiêu Tiềm", name: "Ất Mộc Tu Tiên Lục" },
            { author: "Đổng Cầu Đế", name: "Lục Nhân Thiên Kiêu" },
            { author: "Bán Hồ Sinh Khương", name: "Tộc Trưởng Mang" },
        ],
        image: new URL('@/assets/icon/category-completed5.png', import.meta.url).href
    },
    {
        category: 6,
        content: [
            { author: "Bố Cốc Liêu", name: "Tiên Lục" },
            { author: "Phạm A Lâm", name: "Ta Tại Sông Vô Định Vớt" },
            { author: "Tiêu Tiềm", name: "Ất Mộc Tu Tiên Lục" },
            { author: "Đổng Cầu Đế", name: "Lục Nhân Thiên Kiêu" },
            { author: "Bán Hồ Sinh Khương", name: "Tộc Trưởng Mang" },
        ],
        image: new URL('@/assets/icon/category-completed6.png', import.meta.url).href
    }

])
const listStoryCompleteWithCategory = ref([])
const listStoryCompleteWithCategory2 = ref([])
async function getStoryData() {
    const res = await getStoryRandom(7);
    storyCompletedBottom.value = res
}
async function getAllStoryComplete() {
    const res = await getStoryComplete(9, 0);
    const res2 = await getStoryComplete(9, 9);
    storyComplete.value = res
    listStoryCompleteWithCategory.value = res
    storyComplete2.value = res
    listStoryCompleteWithCategory2.value = res2
}
function mapStoriesToCategories(categories, stories) {
    return categories.map(cat => {
        // lọc ra những story khớp với genres_id
        const filteredStories = stories.filter(story => story.genres_id === cat.category)
        return {
            ...cat,
            category_name: filteredStories[0]?.genre_name || "",
            content: filteredStories.map(story => ({
                story_id: story.story_id,
                author: story.author_name,
                author_id: story.author_id,
                name: story.title
            }))
        }
    })
}

function goToStory(params) {
    router.push({ name: 'story', params: { id: params } })
}
function goToProfile(params) {
    router.push({ name: 'user', params: { id: params } })
}
onMounted(async () => {
    await getStoryData()
    await getAllStoryComplete()
})
</script>

<style scoped>
.box-left__content {
    display: flex;

}

.box-left__content .book-cover {
    width: 30%;
    height: 150px;
}


.box-left__content .book-cover::before {
    width: 10px !important;
}
.left-content
{
    padding: 0 35px;
}
.left-content__desc {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  overflow-wrap: break-word;
  word-break: break-word;
  white-space: normal;
  font-size: 14px;
  padding: 0 10px;
}

.box-img__vertical img {
    max-width: 100px;
    display: block;
    margin: 0 auto;
}

.box-img__vertical {
    padding: 40px 0;
    height: 100%;
    border-radius: 10px;
    background: linear-gradient(to bottom,
            #E2EBF3 0%,
            #FFFFFF 63%);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
}

.box-img__vertical2 {
    height: 100%;
    padding: 40px 0;
    border-radius: 10px;
    background: linear-gradient(to bottom,
            #E1E1F2 0%,
            #FFFFFF 63%);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
}

.hover-link:hover {
    color: #FC6C28;
    cursor: pointer;
}

.bottom-card-image {
    display: flex;

}

.bottom-card-image>div {
    flex: 1
}

.bottom-card-image>div:nth-child(even) {
    background-color: #f7f6f2;
}

.bottom-card-image>div:nth-child(odd) {
    background-color: #FCFCFA;
}

.content-title {
    display: flex;
    align-items: center;
    gap: 6px;
}

.content-title .left {
    flex-shrink: 0;
    /* không cho co lại */
}

.content-title .right {
    flex: 1;
    /* chiếm phần còn lại */
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    /* số dòng muốn hiển thị */
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
}

.img-boxshadow {
    box-shadow: rgba(0, 0, 0, 0.25) 0px 3px 10px;
    ;
}

.text-three-line {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    /* số dòng muốn hiển thị */
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
}

.text-one-line {
    max-width: 100%;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
}

.coverflow {
    position: relative;
    width: 600px;
    height: 230px;
    perspective: 1000px;
}

.coverflow img {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 230px;
    height: auto;
    transform-style: preserve-3d;
    border-radius: 5px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
    transition: all 0.6s ease;
    cursor: pointer;
}

/* Ảnh trung tâm */
.coverflow img.active {
    transform: translate(-50%, -50%) scale(1.2);
    z-index: 3;
    height: 140px;
    filter: brightness(1);
}

/* Ảnh bên trái */
.coverflow img.left {
    transform: translate(-120%, -40%) scale(0.9);
    z-index: 2;
    filter: brightness(0.5);
}

/* Ảnh bên phải */
.coverflow img.right {
    transform: translate(20%, -40%) scale(0.9);
    z-index: 2;
    filter: brightness(0.5);
}

@media (max-width: 768px) {
    .bottom-card-image {
        display: flex;
        flex-wrap: wrap;
        gap: 10px
    }

    .bottom-card-image>.flex-column {
        width: calc(50% - 10px);
        flex: unset;
    }
}
</style>
