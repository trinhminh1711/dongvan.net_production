<template>
    <div class="container py-4">
        <div class="row">
            <div v-if="loading">
                <p>Đang tải dữ liệu...</p>
            </div>
            <!-- Cột ảnh bìa -->
            <div v-if="!loading" class="col-md-4 text-center">
                <div class="book-cover">
                    <img story
                        :src="storyData?.urlImg ? storyData.urlImg : 'https://res.cloudinary.com/djr4f7ceu/image/upload/v1767774141/Frame_2144769426_cm29g7.png'"
                        alt="Ảnh truyện" fit="cover"
                        style="width: 100%; border-radius: 12px; height: 500px; border: solid 2px #e4e7ec;" />
                </div>
            </div>

            <!-- Cột nội dung -->
            <div v-if="!loading" class="col-md-8">
                <!-- Tiêu đề + rating -->
                <h3 class="fw-bold text-center text-md-start text-20">{{ storyData?.story_title }}</h3>
                <div class="d-flex align-items-center mb-3 justify-content-md-start justify-content-centerr">
                    <div class="hover-pointer">
                        <el-rate @click="auth.userId ? rateDialog = true : loginModal.open()"  v-model="rateDataStar" show-score text-color="#ff9900" />
                    </div>
                    <span class="ms-3 text-muted">{{ rateData.length > 0 ? rateData.length : 'Chưa có' }} đánh giá</span>
                </div>

                <!-- Tag -->
                <div v-if="isTopReader" class="mb-3">
                    <el-tag class="top-view" type="danger"><span class="text-16">#{{ isTopReader }}</span><span
                            class="text-16">Top đọc nhiều trong
                            tháng</span></el-tag>
                </div>

                <!-- Thông tin khác -->
                <div class="el-descriptions-storyinfo">
                    <el-descriptions label-width="150px" :column="4" direction="vertical" size="small"
                        class="mb-3 desc-center">
                        <el-descriptions-item label="Tác giả"><span @click="goToProfile(storyData?.user_id)"
                                class="fw-bold text-16 text-mb-14 hover-link">{{
                                    storyData?.author_name
                                }}</span></el-descriptions-item>
                        <el-descriptions-item label="Thể loại"><span @click="goToGenres(storyData?.genres_id)"
                                class="fw-bold text-16 text-mb-14 hover-link">{{
                                    storyData?.genre_name
                                }}</span></el-descriptions-item>
                        <el-descriptions-item label="Trạng thái"><span class="fw-bold text-16 text-mb-14">{{
                            storyData?.is_final == 1 ? 'Đã hoàn thành' : 'Đang sáng tác'
                                }}</span></el-descriptions-item>
                        <el-descriptions-item label="Gói cước"><span class="fw-bold text-16 text-mb-14">{{
                            storyData?.is_vip == 1 ? 'Vip' : 'Miễn phí' }}</span></el-descriptions-item>
                    </el-descriptions>
                </div>
                <div class="el-descriptions-storyinfo border-top border-bottom border-opacity-50 pt-3">
                    <el-descriptions label-width="120px" :column="4" direction="vertical" size="small" class="mb-3">
                        <el-descriptions-item><span class="fw-bold text-16">{{ fullStoryData.data.length }}
                                chương</span></el-descriptions-item>
                        <el-descriptions-item><span class="fw-bold text-16">{{ storyData?.total_reads }} lượt
                                đọc</span></el-descriptions-item>
                        <el-descriptions-item><span class="fw-bold text-16">{{ storyData?.total_votes }} đề
                                cử</span></el-descriptions-item>
                    </el-descriptions>
                </div>
                <!-- Nút hành động -->
                <div class="my-4 d-flex gap-3 btn-mb-action">
                    <div @click="auth.userId ? voteDialog = true : loginModal.open()"
                        class="btn-option d-flex align-items-center gap-2">
                        <img src="@/assets/icon/coin2.png" alt="">
                        <span class="fw-bold" v-if="!coinVoted">Đề cử</span>
                        <span class="fw-bold" v-if="coinVoted"><span class="fw-bold hide-mobile">Đã vote</span> {{
                            coinVoted }} phiếu</span>
                    </div>
                    <div class="btn-option " @click="auth.userId ? likeStory(storyData.story_id) : loginModal.open()">
                        <div v-if="!isFavorite" class="d-flex align-items-center gap-2">
                            <img src="@/assets/icon/hearth.png" alt="">
                            <span class="fw-bold">Yêu thích</span>
                        </div>
                        <div v-if="isFavorite" class="d-flex align-items-center gap-2">
                            <span class="fw-bold">Bỏ yêu thích</span>
                        </div>
                    </div>
                    <div @click="auth.userId ? rateDialog = true : loginModal.open()"
                        class="btn-option d-flex align-items-center gap-2"><img src="@/assets/icon/start.png"
                            alt="">Đánh giá</div>
                    <div @click="auth.userId ? giftDialog = true : loginModal.open()"
                        class="btn-option d-flex align-items-center gap-2"><img src="@/assets/icon/present.png"
                            alt="">Tặng quà</div>
                </div>
                <div class="flex-mb-center">
                    <button style="border-radius: 50px;" @click="goReadChap(1)"
                        class="btn-alert  d-flex align-items-center px-md-4 py-md-3"> <img src="@/assets/icon/book.png"
                            alt=""><span class="fw-bold text-20 ps-2 text-mb-16"> Đọc truyện ngay</span></button>
                </div>
                <!-- Mô tả -->
                <p :class="!isExpanded ? 'text-four-line' : ''" class="text-secondary mt-5 ">{{ storyData?.description
                    }}

                </p>
                <a class="text-link" v-if="storyData?.description.length > 100" @click="toggleExpand" type="primary">
                    {{ isExpanded ?
                        'Thu gọn' : 'Xem thêm' }}</a>
                <div class="mt-5">
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <h3 class="fw-bold">Danh sách chương {{ fullStoryData.data.length > 1 ? '(' +
                            fullStoryData.data.length + ')' : '' }}</h3>
                        <div class="d-flex align-items-center gap-1 sort-toggle" @click="toggleSort"
                            style="cursor: pointer; color: #2c3e50; user-select: none;">
                            <span>{{ sort === 'desc' ? 'Mới nhất' : 'Cũ nhất' }}</span>
                            <span class="sort-icons">
                                <i class="bi bi-arrow-up" :class="{ active: sort === 'desc' }"></i>
                                <i class="bi bi-arrow-down" :class="{ active: sort === 'asc' }"></i>
                            </span>
                        </div>
                    </div>
                    <div>
                        <div v-if="!chapters[0]?.chap_number">
                            <img style="display: block; margin: 0 auto;" src="@/assets/icon/nodata.png" />
                            <p style="text-align: center;">Chưa đăng chương</p>
                        </div>
                        <el-table class="hide-mobile" v-if="chapters[0]?.chap_number" :data="pagedChapters"
                            style="width: 100%">
                            <el-table-column min-width="300">
                                <template #default="scope">
                                    <p class="one-line">
                                        <span v-if="scope.row.is_vip" class="me-2">
                                            <img src="@/assets/icon/key.png" alt="">
                                        </span>
                                        <span class="fw-semibold text-18">Chương {{ scope.row.chap_number }}</span> :
                                        <span class="text-18 text-one-line ms-1">{{ scope.row.chapter_title }}</span>
                                    </p>
                                </template>
                            </el-table-column>

                            <el-table-column min-width="100">
                                <template #default="scope">
                                    <p class="fw-semibold">{{ scope.row.word_count }} chữ</p>
                                </template>
                            </el-table-column>

                            <el-table-column min-width="100">
                                <template #default="scope">
                                    <button @click="goReadChap(scope.row.chap_number)" style="padding: 10px 15px;"
                                        class="btn-alert d-flex align-items-center fw-bold">
                                        Đọc ngay
                                    </button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div v-if="chapters[0]?.chap_number" class="hide-desktop list-chap__mb">
                            <div style="border-radius: 10px; margin: 10px 0;" class="bg-lightblue"
                                v-for="chapData in pagedChapters">
                                <div class="px-3 py-3">
                                    <p class="text-mb-14 fw-semibold">{{ chapData.chapter_title }} ({{
                                        chapData.chap_number }})</p>
                                    <div class="d-flex align-items-center justify-content-between py-2">
                                        <span class="text-mb-12"> {{ chapData.word_count }} chữ </span>
                                        <span @click="goReadChap(chapData.chap_number)" class="color-alert">Đọc ngay
                                            <svg width="6" height="10" viewBox="0 0 6 10" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path d="M0.5 9.5L5 5L0.5 0.5" stroke="#BF2C24" stroke-linecap="round"
                                                    stroke-linejoin="round" />
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div v-if="chapters[0]?.chap_number"
                            class="mt-3 d-flex justify-content-center justify-content-md-end">
                            <el-pagination layout="prev, pager, next" :page-size="pageSize" :current-page="currentPage"
                                :total="chapters.length" @current-change="handlePageChange" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="container">
        <h3 class="fw-bold"> Độc giả nói gì về {{ storyData?.story_title }}</h3>
        <div>
            <el-tabs class="mt-3 tab-mb-full" v-model="activeName">
                <el-tab-pane label="User" name="first">
                    <template #label>
                        <span @click="!auth.userId && loginModal.open()" class="custom-tab">
                            <i class="el-icon-star-on"></i>
                            Bình luận
                        </span>
                    </template>
                    <Comment :story_id="route.params.id" />
                </el-tab-pane>
                <el-tab-pane label="Config" name="second">
                    <template #label>
                        <span class="custom-tab">
                            <i class="el-icon-star-on"></i>
                            Đánh giá & nhận xét
                        </span>
                    </template>
                    <ReviewStory :story_id="route.params.id" />
                </el-tab-pane>
            </el-tabs>
        </div>
        <el-dialog v-model="voteDialog" title="Đề cử" width="500">
            <span class="fw-bold text-color_primary text-md ">Số lượng Tang Diệp đề cử</span>
            <el-input class="mt-1" v-model="inputCoinVote" placeholder="10" />
            <ul class="list-note mt-3">
                <li>5 Tang Diệp = 1 phiếu đề cử</li>
                <li>Đề cử sẽ giúp truyện lên “Top Người đọc đề cử” trên Bảng Xếp Hạng</li>
                <li>Top đại gia hàng tháng hoặc mỗi khi lên hạng người đọc sẽ được tặng phiếu đề cử</li>
            </ul>
            <button @click="onVote()" style="width: 100%; height: 40px;" class="btn-alert mt-3"><span
                    class="py-2 text-16">Đề
                    cử</span></button>
        </el-dialog>
        <el-dialog v-model="noEnoughCoinDialog" title="Không đủ Tang Diệp" width="500">
            <span class="text-color_primary text-md ">Vui lòng nạp thêm Tang Diệp để tiếp tục!</span>
            <button @click="router.push({ name: 'payment' })" style="width: 100%; height: 40px;"
                class="btn-alert mt-3"><span class="py-2 text-16">Nạp Tang Diệp</span></button>
        </el-dialog>
        <el-dialog v-model="rateDialog" title="Đánh giá và nhận xét" width="500">
            <div class="d-flex align-items-center gap-2">
                <span class="fw-bold">Đánh giá</span>
                <el-rate v-model="rateValue" :texts="['Chưa hay', 'Bình thường', 'Tạm được', 'Khá hay', 'Tuyệt vời']"
                    show-text />
            </div>
            <div class="mt-2">
                <span class="fw-bold">Nhật xét</span>
                <el-input class="mt-2" v-model="rateComment" type="textarea" :rows="5"
                    placeholder="Hãy cho chúng mình vài nhận xét và đóng góp ý kiến nhé!" />
            </div>
            <button @click="onRate()" style="width: 100%; height: 40px;" class="btn-alert mt-3"><span
                    class="py-2 text-16">Gửi
                    nhận
                    xét</span></button>
        </el-dialog>
        <el-dialog v-model="giftDialog" title="Ủng hộ tác giả" width="500">
            <div class="gap-2">
                <span class="fw-semibold">Số lượng Tang diệp ủng hộ</span>
                <span>
                    <el-tooltip class="box-item" effect="dark" :content="'Số tang diệp của bạn: ' + coinUser"
                        placement="top">
                        <el-icon>
                            <InfoFilled />
                        </el-icon>
                    </el-tooltip>
                </span>
                <el-input v-model="giftValue" class="mt-2" type="input" />
            </div>
            <div class="mt-2">
                <span class="fw-semibold">Lời nhắn (nếu có)</span>
                <el-input v-model="giftMessenger" class="mt-2" type="textarea" :rows="5"
                    placeholder="Gửi lời nhắn đến tác giả bạn yêu thích..." />
            </div>
            <button @click="onGift()" style="width: 100%; height: 40px;" class="btn-alert mt-3">
                <span class="py-2 text-16">Gửi ủng hộ</span>
            </button>
        </el-dialog>
    </div>
</template>

<script setup>
import { getStoryRate } from "@/api/author";
import Comment from "@/components/story-detail/Comment.vue"
import ReviewStory from "@/components/story-detail/ReviewStory.vue"
import { voteStory, rateStory, giveSupport } from "@/api/author";
import { getVoteStory } from "@/api/author";
import { toast } from "vue3-toastify"; // nếu dùng toast
import "vue3-toastify/dist/index.css";
import { ref, onMounted, watch, computed } from "vue"
import { getStoryFullInfo } from "@/api/stories";
import { useRoute, useRouter } from "vue-router";
import { addFavorite } from "@/api/stories";
import { getTopStoryReadedMonth } from "@/api/stories";
import { useAuthStore } from "@/stores/auth";
import { useLoginModal } from "@/stores/useLoginModal";
const loginModal = useLoginModal();
import { checkStoryLike } from "@/api/stories";
const auth = useAuthStore();
const loading = ref(true);
const route = useRoute();
const router = useRouter();
const storyData = ref(null);
const fullStoryData = ref(null);
const rating = ref(0)
const sort = ref("desc")
const activeName = "first"
const isFavorite = ref();
const voteDialog = ref(false);
const rateDialog = ref(false);
const coinUser = ref(0);
const isExpanded = ref(false);
const inputCoinVote = ref(10);
const rateValue = ref();
const rateComment = ref();
const noEnoughCoinDialog = ref(false)
const coinVoted = ref();
const giftDialog = ref()
const giftValue = ref(10)
const currentPage = ref(1)
const pageSize = 10
const giftMessenger = ref()
const isTopReader = ref(0)
const rateData = ref([]);
const ratingCounts = ref({ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 });
const rateDataStar = ref(0);
const chapters = ref([
    { title: "Tập 46 - Chương 24: Ngoại truyện", words: "839 chữ" },
    { title: "Tập 46 - Chương 23: Ngoại truyện", words: "819 chữ" },
    { title: "Tập 46 - Chương 22: Ngoại truyện", words: "750 chữ" },
    { title: "Tập 46 - Chương 21: Ngoại truyện", words: "740 chữ" },
    { title: "Tập 46 - Chương 20: Ngoại truyện", words: "833 chữ" }
])
const toggleExpand = () => {
    isExpanded.value = !isExpanded.value;
};
function goReadChap(chapNumber) {
    router.push({
        name: "chap-detail",
        params: {
            id: route.params.id,
            chapId: chapNumber
        }
    });
}
function goToGenres(params) {
    router.push({ name: 'article', params: { id: params } })
}

function goToProfile(params) {
    router.push({ name: 'user', params: { id: params } })
}
async function getRateting() {
    const res = await getStoryRate(route.params.id);
    rateData.value = res.data || [];
    rateDataStar.value = avgRating(res.data)
    ratingCounts.value = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    rateData.value.forEach(r => {
        ratingCounts.value[r.rating] = (ratingCounts.value[r.rating] || 0) + 1;
    });
}
function avgRating(ratings) {
  if (!Array.isArray(ratings) || ratings.length === 0) return 0;
  const total = ratings.reduce((sum, item) => sum + (item.rating || 0), 0);
  const avg = total / ratings.length;
  return parseFloat(avg.toFixed(1)); // ép về số
}
async function getTopUserRead() {
    const res = await getTopStoryReadedMonth(10);
    isTopReader.value = getStoryPosition(res, route.params.id)
}
function getStoryPosition(data, storyId) {
    console.log(data);

    const index = data.findIndex(item => item.story_id == storyId)
    return index === -1 ? 0 : index + 1
}
const pagedChapters = computed(() => {
    // Sao chép mảng gốc để không mutate
    let sorted = [...chapters.value];

    if (sort.value === "desc") {
        sorted.reverse(); // hoặc sắp xếp theo chap_number nếu có
    }

    const start = (currentPage.value - 1) * pageSize
    const end = start + pageSize
    return sorted.slice(start, end)
})

// ✅ Sự kiện khi đổi trang
const handlePageChange = (page) => {
    currentPage.value = page
}

async function getData() {
    const id = route.params.id; // lấy id từ param
    try {
        const res = await getStoryFullInfo(id);
        fullStoryData.value = res
        storyData.value = res.data[0]
        chapters.value = (fullStoryData.value.data);


        loading.value = false;

    } catch (err) {
        console.error("Lỗi khi load dữ liệu:", err);
    }
}
async function onVote() {
    const res = await voteStory(auth.userId, route.params.id, inputCoinVote.value);
    if (res.success) {
        toast.success("Đề cử thành công!")
        setTimeout(() => {
            window.location.reload()
        }, 1000);
    }
    else {
        voteDialog.value = false
        noEnoughCoinDialog.value = true
        toast.error(res.data.message)
    }
}
async function onGift() {
    if (!giftMessenger.value) {
        giftMessenger.value = "Gửi tặng tác giả, truyện rất hay"
    }
    const res = await giveSupport(auth.userId, storyData.value.user_id, giftValue.value, giftMessenger.value)
    if (res.success) {
        toast.success("Gửi thành công " + giftValue.value + " Tang diệp")
        setTimeout(() => {
            window.location.reload()
        }, 1000);
    }
    else {
        giftDialog.value = false
        noEnoughCoinDialog.value = true
        toast.error(res.data.message)

    }
}
async function onRate() {
    const res = await rateStory(route.params.id, auth.userId, rateValue.value, rateComment.value);
    if (res.status == 201) {
        toast.success("Đã gửi đánh giá truyện")
        setTimeout(() => {
            window.location.reload()
        }, 1000);
    }
}
async function getAllVote() {
    const res = await getVoteStory(route.params.id, auth.userId)
    coinVoted.value = res.total_votes / 5

}
async function likeStory(story_id) {
    const res = await addFavorite(auth.userId, story_id)
    isFavorite.value = res.isFavorite

}
async function checkLikeStory() {
    const res = await checkStoryLike(auth.userId, route.params.id)
    isFavorite.value = res.isFavorite
}
const toggleSort = () => {
    sort.value = sort.value === 'desc' ? 'asc' : 'desc'
}
onMounted(async () => {
    coinUser.value = auth.user?.coin_balance
    await checkLikeStory();
    await getData();
    await getAllVote()
    await getTopUserRead()
    await getRateting()
});
watch
</script>
<style>
.el-descriptions-storyinfo .el-descriptions__table {
    width: auto;
}

.sort-toggle {
    cursor: pointer;
    color: #2c3e50;
    user-select: none;
    transition: all 0.2s;
}

.sort-toggle:hover {
    opacity: 0.8;
}

.sort-icons i {
    font-size: 1.1rem;
    margin-left: 2px;
    color: #aaa;
    /* Màu mặc định */
    transition: color 0.2s, font-weight 0.2s;
}

.sort-icons i.active {
    color: #000;
    /* Mũi tên đang active sẽ đậm hơn */
    font-weight: 700;
}

.sort-label {
    font-weight: 600;
}
</style>
<style scoped>
.one-line {
    display: flex;
    align-items: center;
    white-space: nowrap;
    overflow: hidden;
}

::v-deep(.el-table__row)>td {
    border-bottom: none !important;
}

.border-bottom {
    border-bottom: solid 1px #E4E7EC !important;
}

.btn-like {
    background-color: red;
    color: #fff;
}

.btn-option {
    padding: 5px 10px;
    border-radius: 15px;
    font-weight: 700;
    font-size: 14px;
    border: solid 1px #e7e9eb;
}

.btn-option:hover {
    cursor: pointer;
}

.btn-option img {
    max-width: 20px;
}

.el-tag {
    border-radius: 20px;
    font-weight: bold;
}

.top-view span {
    font-weight: 600;
}

.top-view span:first-child {
    color: #fff;
    border-radius: 15px;
    background: #E60000;
    padding: 5px 10px;
    margin-right: 20px;

}

.top-view {
    border: none;
    padding: 20px;
    color: #BF2C24;
}

.list-note {
    padding: 0 20px;
}

.list-note li {
    color: #1877F2;
}

.text-four-line {
    display: -webkit-box;
    -webkit-line-clamp: 4;
    /* Giới hạn 4 dòng */
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-word;
}

::v-deep(.el-table),
::v-deep(.el-table__cell),
::v-deep(.el-table__inner-wrapper),
::v-deep(.el-table__header-wrapper),
::v-deep(.el-table__body-wrapper) {
    border: none !important;
}

/* 2️⃣ Xóa viền giữa các ô */
::v-deep(.el-table td),
::v-deep(.el-table th.is-leaf) {
    border: none !important;
}

/* 3️⃣ Xóa line dọc (nếu có border vertical) */
::v-deep(.el-table--border::after),
::v-deep(.el-table--group::after),
::v-deep(.el-table--border::before),
::v-deep(.el-table--group::before) {
    display: none;
}

/* 4️⃣ Thêm background + spacing cho từng hàng */
::v-deep(.el-table__row)>td {
    background-color: #F9FAFB !important;
    /* màu nền mỗi hàng */
    transition: background 0.2s ease-in-out;
}

/* 5️⃣ Hover màu đậm hơn một chút */
::v-deep(.el-table__row:hover)>td {
    background-color: #ffe0e0 !important;
}

/* 6️⃣ Bo góc hàng */
::v-deep(.el-table__row:first-child > td:first-child) {
    border-top-left-radius: 8px;
}

::v-deep(.el-table__row:first-child > td:last-child) {
    border-top-right-radius: 8px;
}

::v-deep(.el-table__row:last-child > td:first-child) {
    border-bottom-left-radius: 8px;
}

::v-deep(.el-table__row:last-child > td:last-child) {
    border-bottom-right-radius: 8px;
}

::v-deep(.el-table__body) {
    border-collapse: separate !important;
    border-spacing: 0 10px !important;
    /* 10px = khoảng trắng giữa các row */
}

/* Xóa border mặc định */
::v-deep(.el-table__cell) {
    border: none !important;
}

/* Màu nền và radius từng row */
::v-deep(.el-table__row)>td {
    background: #F9FAFB !important;
    border-radius: 8px;

}

::v-deep(.el-table__row > td) {
    height: 60px;
    /* chiều cao row */
    line-height: 0px;
    /* để text căn giữa theo chiều dọc */
    padding: 0 16px;
    /* nếu muốn padding ngang */
}

/* Hover */
::v-deep(.el-table__row:hover)>td {
    background-color: #fff7f3 !important;
}

@media (max-width: 768px) {
    .btn-mb-action {
        flex-wrap: wrap;
        justify-content: center;
    }

    .btn-mb-action .btn-option {
        width: 30%;
        text-wrap: nowrap;
    }

    .btn-mb-action .btn-option span {
        text-wrap: nowrap;
    }

    .flex-mb-center {
        display: flex;
        justify-content: center;
    }

    .btn-option {
        font-size: 12px;
    }

}
</style>
