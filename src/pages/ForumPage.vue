<template>
    <div class="container">
        <div v-if="loading" class="loader-overlay">
            <div class="spinner"></div>
        </div>
        <div class="row">
            <div class="col-3 d-md-block d-none sidebar-sticky">
                <h3 class="fw-bold mb-3">Danh mục</h3>
                <div @click="goToListPost(item.id ?? items[4].id)" v-for="(item, index) in items" :key="index"
                    class=" d-flex align-items-center menu-category__item gap-2 py-2">
                    <div>
                        <img :src="item.image" alt="Logo">
                    </div>
                    <div>
                        <p class="text-color_primary">{{ item.text }}</p>
                        <p class="text-color__tertiary">
                            {{ item.number ?? items[4].number }} bài viết
                        </p>
                    </div>

                </div>
            </div>
            <div class="d-block d-md-none mb-3">
                 <h3 class="fw-bold mb-3">Danh mục</h3>
                <el-select placeholder="Chọn danh mục" @change="goToListPost" style="width: 100%;">
                    <el-option v-for="(item, index) in items" :key="index"
                        :label="`${item.text} - ${item.number ?? items[4].number} bài viết`"
                        :value="item.id ?? items[4].id" />
                </el-select>
            </div>
            <div class="col-md-9">
                <router-view v-if="!loading" :key="$route.fullPath" v-slot="{ Component }">
                    <component :is="Component || PostCategory" />
                </router-view>

            </div>
        </div>
    </div>

</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { ref, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();
const router = useRouter();
import storyIcon from '@/assets/icon/Forum-topic-0111.png'
import vectorIcon2 from '@/assets/icon/Forum-topic 0-11.png'
import vectorIcon3 from '@/assets/icon/forum-topic-0-1.png'
import vectorIcon4 from '@/assets/icon/forum-topic-0.png'
import vectorIcon5 from '@/assets/icon/forum-topic2.png'
import vectorIcon6 from '@/assets/icon/forum-topic-3.png'
import vectorIcon7 from '@/assets/icon/forum-topic-4.png'
import vectorIcon8 from '@/assets/icon/forum-topic-5.png'
import vectorIcon9 from '@/assets/icon/forum-topic-7.png'
import vectorIcon10 from '@/assets/icon/forum-topic-6.png'
import PostCard from '@/components/forum-page/PostCard.vue'
import { getNumberPost } from '@/api/forum';
import ListPost from '@/components/forum-page/ListPost.vue'
import PostDetail from '@/components/forum-page/PostDetail.vue'
import CreatePostForum from '@/components/forum-page/CreatePostForum.vue'
import PostCategory from '@/components/forum-page/PostCategory.vue'

const loading = ref(false);
const items = [
    { image: storyIcon, text: 'Trinh thám' },
    { image: vectorIcon2, text: 'Ngôn tình' },
    { image: vectorIcon3, text: 'Linh dị' },
    { image: vectorIcon4, text: 'Lịch sử' },
    { id: 1, image: vectorIcon5, text: 'Thể loại khác' },
    { id: 2, image: vectorIcon6, text: 'Đề cử và Review truyện', number: '43492' },
    { id: 3, image: vectorIcon7, text: 'Nhập môn sáng tác', number: '77225' },
    { id: 4, image: vectorIcon8, text: 'Tìm bạn đồng sáng tác', number: '45378' },
    { id: 5, image: vectorIcon9, text: 'Tin tức và sự kiện', number: '45378' },
    { id: 6, image: vectorIcon10, text: 'Hỏi đáp cùng tác giả', number: '77225' },
]
function goToListPost(id) {
    router.push({
        name: 'list-post',  // tên route đã định nghĩa trong router
        params: { id: id }
    });

}

async function getNumberPostForum() {
    const res = await getNumberPost();

    res.data.forEach(d => {
        const item = items.find(i => i.id === d.topic_id)
        if (item) {
            item.number = d.total_posts
        }
    })

}
onMounted(() => {
    getNumberPostForum()
}),
    watch(
        () => route.fullPath,
        async () => {
            loading.value = true;
            await new Promise(resolve => setTimeout(resolve, 1000)); // delay 1s
            loading.value = false;
        },
        { immediate: true }
    );
</script>

<style>
.sidebar-sticky {
    position: sticky;
    top: 20px;
    /* khoảng cách với top khi scroll */
    align-self: flex-start;
    max-height: calc(100vh - 40px);
    overflow-y: auto;
    scrollbar-width: thin;
}

.loader-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
}

/* Spinner */
.spinner {
    width: 50px;
    height: 50px;
    border: 5px solid #ddd;
    border-top-color: #42b983;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

/* Fade transition */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.8s ease;
    /* tăng thời gian cho fade chậm hơn */
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.menu-category__item:hover {
    cursor: pointer;

}

.menu-category__item:hover p.text-color_primary {
    color: #BF2C24;
    font-weight: 900;
    transform: scale(1.02);
    /* bù lại độ giãn */
    transition: all .2s ease-in;
}
</style>