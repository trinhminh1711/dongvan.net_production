<template>
    <div class="container">
        <h2 class="text-color_primary fw-bold">{{
            Number(route.params.id) < 12 ? "Truyện " + genres[Number(route.params.id) - 1]?.genres_name
                : "Toàn bộ truyện" }}</h2>
                <p style="background-color: rgba(24, 119, 242, 0.1); border-radius: 5px;"
                    class="color-blue  px-3 py-2 mt-2 mx-2 mx-md-0">
                    <span class="fw-bold">Mô tả thể loại:</span>
                    {{
                        Number(route.params.id) < 12 ? genres[Number(route.params.id) - 1]?.genres_des
                            : "Khám phá kho truyện phong phú nhất với hàng nghìn tác phẩm thuộc nhiều thể loại khác nhau..."
                        }} </p>
    </div>
    <div v-if="categoryList?.length > 0" class="container">
        <div class="row mt-4">
            <div  v-for="stories in pagedStories" :key="stories.id"
                class="box-left__content col-md-4 mt-3 cursor-pointer">
                <img @click="goToStory(stories.story_id)" style="width: 150px; height: 240px;object-fit: cover; flex-shrink: 0; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); /* bóng mờ nhẹ */ border-radius: 8px;"
                    :src="stories.urlImg" alt="">
                <div class="left-content px-4">
                    <h4 @click="goToStory(stories.story_id)"
                        class="text-color_primary text-24 fw-bold text-limit-2 hover_link text-mb-16">{{
                            stories.title }}</h4>
                    <p @click="goToProfile(stories.author_id)" class="left-content__author text-color__tertiary hover_link">{{ stories.pen_name ||
                        stories.username }}</p>
                    <p data-v-a3bb3c86="" class="color-red fst-italic"><span data-v-a3bb3c86=""
                            class="fw-bold text-md">{{ stories.latest_chapter || 'chương' }}</span><span
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
        <div class="d-flex justify-content-center mt-3">
            <el-pagination v-if="categoryList.length > pageSize" layout="prev, pager, next" :page-size="pageSize"
                :current-page="currentPage" :total="categoryList.length" @current-change="handlePageChange" />
        </div>
    </div>

    <div v-else class="pt-4 nodata-wrapper">
        <img style="display: block; margin: 0 auto;" src="@/assets/icon/nodata.png" />
        <p style="text-align: center;">Không có dữ liệu</p>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch, computed } from "vue";
import { useRoute } from "vue-router";
import { useRouter } from 'vue-router'
const genres = [
    {
        genre_id: 1,
        genres_name: "Linh dị",
        genres_des: "Những câu chuyện mang yếu tố ma quái, rùng rợn, siêu nhiên hoặc tâm linh, tạo cảm giác hồi hộp, ám ảnh và sợ hãi cho người đọc."
    },
    {
        genre_id: 2,
        genres_name: "Trinh thám",
        genres_des: "Thể loại truyện xoay quanh quá trình điều tra, phá giải các vụ án bí ẩn, tội phạm phức tạp, kích thích sự tò mò và suy luận của độc giả."
    },
    {
        genre_id: 3,
        genres_name: "Lịch sử",
        genres_des: "Tác phẩm lấy bối cảnh, nhân vật hoặc sự kiện từ quá khứ, tái hiện lại một giai đoạn lịch sử một cách sống động, có thể hư cấu hoặc dựa trên thực tế."
    },
    {
        genre_id: 4,
        genres_name: "Ngôn tình",
        genres_des: "Truyện tập trung vào các mối quan hệ tình cảm lãng mạn, với những diễn biến tâm lý, tình tiết ngọt ngào hoặc trắc trở của các nhân vật chính."
    },
    {
        genre_id: 5,
        genres_name: "Truyện ngắn",
        genres_des: "Tác phẩm tự sự có dung lượng ngắn, cốt truyện thường tập trung vào một khoảnh khắc, một tình huống hay một lát cắt trong cuộc đời nhân vật."
    },
    {
        genre_id: 6,
        genres_name: "Thơ",
        genres_des: "Hình thức sáng tác văn học sử dụng ngôn từ giàu hình ảnh, nhịp điệu và vần điệu để thể hiện cảm xúc, tư tưởng một cách cô đọng, hàm súc."
    },
    {
        genre_id: 7,
        genres_name: "Huyền ảo",
        genres_des: "Thể loại truyện huyền ảo, hay Chủ nghĩa Hiện thực Huyền ảo (Magical Realism), là một thể loại văn học kết hợp các yếu tố kỳ ảo, siêu nhiên vào một bối cảnh hoàn toàn đời thực, với giọng kể tự nhiên và không giải thích về những điều kỳ lạ xảy ra. Điểm khác biệt chính so với thể loại kỳ ảo thông thường là chủ nghĩa hiện thực huyền ảo lấy bối cảnh thế giới thực, trong khi thể loại kỳ ảo thường diễn ra trong những thế giới hư cấu."
    },
    {
        genre_id: 8,
        genres_name: "Viễn tưởng",
        genres_des: "Thể loại truyện xây dựng những thế giới, công nghệ hoặc sự kiện không có thật, dựa trên trí tưởng tượng về tương lai, vũ trụ hay các khái niệm khoa học."
    },
    {
        genre_id: 9,
        genres_name: "Cổ đại",
        genres_des: "Thể loại truyện cổ đại thường ám chỉ các câu chuyện thuộc văn học dân gian như truyện cổ tích, thần thoại, và truyền thuyết, được truyền miệng qua nhiều thế hệ trong quá khứ xa xưa, hoặc các tác phẩm văn học hiện đại mô phỏng bối cảnh và văn hóa của các thời đại phong kiến, đế quốc. Mục đích của những truyện này là giải thích thế giới, phản ánh ước mơ về công lý và sự tốt đẹp, hoặc ca ngợi những nhân vật lịch sử anh hùng."
    },
    {
        genre_id: 10,
        genres_name: "Hiện thực",
        genres_des: "Truyện phản ánh chân thực các vấn đề, hoàn cảnh và con người trong xã hội đương đại, đi sâu vào những góc khuất và thực trạng cuộc sống."
    },
    {
        genre_id: 11,
        genres_name: "Tản văn",
        genres_des: "Lối viết tự do, phóng khoáng, thể hiện suy ngẫm, cảm xúc và quan điểm của tác giả về một vấn đề, sự vật, hiện tượng trong cuộc sống."
    }
];
const router = useRouter()
const route = useRoute();
const currentPage = ref(1)
const categoryList = ref([]);
const pageSize = 9; // số item trên 1 trang

import { getStoryByCategory } from '@/api/stories'
async function fetchData(categoryId) {
    const res = await getStoryByCategory(categoryId);
    categoryList.value = res.data.sort((a, b) =>
        a.title.toLowerCase().localeCompare(b.title.toLowerCase())
    );
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
function goToProfile(params) {
    router.push({ name: 'user', params: { id: params } })
}
watch(
    () => route.params.id,
    (newId) => {
        fetchData(newId);
    }
);
</script>
<style>
.text-three-line {
    display: -webkit-box;
    /* Bắt buộc để dùng line clamp */
    -webkit-line-clamp: 3;
    /* Giới hạn 3 dòng */
    -webkit-box-orient: vertical;
    /* Cắt theo chiều dọc */
    overflow: hidden;
    /* Ẩn phần dư */
    text-overflow: ellipsis;
    /* Hiển thị dấu ... */
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
    -webkit-line-clamp: 3;
    /* số dòng muốn hiển thị */
    -webkit-box-orient: vertical;
    /* hướng hộp */
    overflow: hidden;
}
</style>