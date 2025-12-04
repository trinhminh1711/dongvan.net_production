<template>
    <div class="container">
        <h3 class="text-color_primary fw-bold mb-4 mt-5">Truyện Đã Hoàn Thành</h3>
        <div v-if="storyComplete" class="row d-flex align-items-center">
            <div class="col-md-3">
                <div @click="gotoStory(storyComplete?.[0].story_id)"
                    class="box-img__vertical d-flex flex-column gap-2 px-4 cursor-pointer">
                    <div class="d-flex">
                        <div class="coverflow">
                            <img :src="storyComplete?.[0].urlImg" alt="Book Left" class="left">
                            <img :src="storyComplete?.[0].urlImg" alt="Book Center" class="active">
                            <img :src="storyComplete?.[0].urlImg" alt="Book Right" class="right">
                        </div>
                    </div>
                    <p class="text-center fw-semibold">{{ storyComplete?.[0].title }}</p>
                    <p class="text-center color-alert text-md mt-1">
                        <span class="fw-bold"> {{ storyComplete?.[0].chap_number }} </span> chương
                    </p>
                    <p class="text-sm text-center text-three-line">{{ storyComplete?.[0].description }}</p>
                    <p class="text-center mt-2"> <button class="btn-alert__rounded">Đọc ngay</button></p>
                </div>
            </div>
            <div class="list-container col-md-9">
                <div class="row">
                    <div v-for="(item, index) in listStoryCompleteWithCategory"
                        class="card-story-completed col-md-4 px-4 pb-3">
                        <p class="d-flex align-items-center d-flex justify-content-between border-bottom mb-3">
                            <span class="fw-bold text-18">{{ item.category_name }}</span>
                            <img :src="item.image" alt="">
                        </p>
                        <div>
                            <p class="content-title " v-for="(detail, key) in item.content">
                                <span @click="goToProfile(detail.author_id)" class="text-16 hover-link left">[{{
                                    detail.author }}]</span>
                                <span @click="gotoStory(detail.story_id)"
                                    class="text-color_primary fw-bold text-16 right text-link_alert ms-1">{{ detail.name
                                    }}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="storyComplete" class="row d-md-flex d-none align-items-center  mt-4">
            <div class="col-3">
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
            </div>
            <div class="list-container col-9">
                <div class="row">
                    <div v-for="(item, index) in listStoryCompleteWithCategory"
                        class="card-story-completed col-4 px-4 pb-3">
                        <p class="d-flex align-items-center d-flex justify-content-between border-bottom mb-3">
                            <span class="fw-bold text-18">{{ item.category_name }}</span>
                            <img :src="item.image" alt="">
                        </p>
                        <p class="d-flex content-title" v-for="(detail, key) in item.content">
                            <span @click="goToProfile(detail.author_id)" class="text-16 hover-link left">[{{
                                detail.author
                            }}]</span> <span class="text-color_primary fw-bold  text-one-line right text-16">{{
                                    detail.name
                                }}</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div class="bottom-card-image pt-100">
            <div @click="gotoStory(item.story_id)"
                class="d-flex flex-column align-items-center gap-2 py-3 cursor-pointer"
                v-for="(item, index) in storyCompletedBottom">
                <img style="max-width: 70px; height: 100px; box-shadow: rgba(0, 0, 0, 0.25) 0px 3px 10px; border-radius: 5px;"
                    :src="item.urlImg" alt="">
                <p class="text-color_primary fw-bold text-md text-one-line hover-link px-3">{{ item.title }}</p>
                <small class="d-block"> {{ item.genre_name }} </small>
                <button @click="gotoStory(item.story_id)" class="btn-outline">Đọc ngay</button>
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
async function getStoryData() {
    const res = await getStoryRandom(7);
    storyCompletedBottom.value = res
}
async function getAllStoryComplete() {
    const res = await getStoryComplete(10);
    storyComplete.value = res
    console.log(storyComplete.value);

    listStoryCompleteWithCategory.value = (mapStoriesToCategories(storyCompleted1.value, storyComplete.value));
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

function gotoStory(params) {
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
.box-img__vertical img {
    max-width: 100px;
    display: block;
    margin: 0 auto;
}

.box-img__vertical {
    padding: 40px 0;
    border-radius: 10px;
    background: linear-gradient(to bottom,
            #E2EBF3 0%,
            #FFFFFF 63%);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
}

.box-img__vertical2 {
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
    display: -webkit-box;
    -webkit-line-clamp: 1;
    /* số dòng muốn hiển thị */
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
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
