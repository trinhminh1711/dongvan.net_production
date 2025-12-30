<template>
    <div class="mt-4">
        <div class="hide-mobile">
            <div v-if="dataTableStoryChapter"> <el-table v-if="(dataTableStoryChapter[0]?.chap_number)"
                    class="story-table" :data="dataTableStoryChapter" style="width: 100%" :fit="true"> <el-table-column
                        type="index" label="STT" width="80"> </el-table-column> <el-table-column prop="title"
                        width="450"> <template #header> <span class="table-header">Tên chương</span> </template>
                        <template #default="scope">
                            <div class="d-flex align-items-center gap-2"> {{ scope.row.chapter_title }} </div>
                        </template>
                    </el-table-column> <el-table-column label="Date" prop="create_at"> <template #header> <span
                                class="table-header">Thời gian đăng</span> </template> <template #default="scope"> {{
                                    formatDateVN(scope.row.created_at) }} </template> </el-table-column>
                    <el-table-column prop="last_chapter_id"> <template #header> <span class="table-header">Số từ</span>
                        </template>
                        <template #default="scope"> {{ scope.row.word_count }} </template> </el-table-column>
                    <el-table-column prop="last_chapter_id"> <template #header> <span class="table-header">Lượt
                                đọc</span>
                        </template> <template #default="scope"> {{ scope.row.total_reads }} </template>
                    </el-table-column>
                </el-table>
                <div v-if="!(dataTableStoryChapter[0]?.chap_number)"> <img style="display: block; margin: 0 auto;"
                        src="@/assets/icon/nodata.png" />
                    <p style="text-align: center;">{{ 'Không có dữ liệu' }}</p>
                </div>
            </div>
        </div>
        <div class="hide-desktop">
            <div v-if="dataTableStoryChapter">
                <!-- Nếu có dữ liệu -->
                <div v-if="dataTableStoryChapter[0]?.chap_number" class="chapter-list">
                    <div class="story-header d-flex align-items-center justify-content-between p-3 rounded-top">
                        <!-- Nếu chưa bấm tìm --> <template v-if="!isSearching">
                            <div class="header-title fw-semibold">Tên chương</div>
                            <div class="d-flex align-items-center gap-3"> <el-icon class="header-icon"
                                    @click="isSearching = true">
                                    <Search />
                                </el-icon> </div>
                        </template>
                        <!-- Nếu đang bấm tìm --> <template v-else>
                            <div class="search-box d-flex align-items-center w-100 gap-2"> <el-input v-model="search"
                                    placeholder="Nhập tên chương..." size="large" clearable
                                    class="search-input flex-grow-1" @clear="clearSearch" @keyup.enter="doSearch" />
                                <el-icon class="header-icon" @click="clearSearch()">
                                    <Close />
                                </el-icon>
                            </div>
                        </template>
                    </div>
                    <div v-for="(item, index) in filteredChapters" :key="item.chap_number || index"
                        class="chapter-item">
                        <div class="chapter-title"> {{ item.chapter_title }} </div>
                        <div class="chapter-meta d-flex"> <span class="text-color__tertiary d-flex align-items-center">
                                <div class="text-color__tertiary">{{ formatDateVN(item.created_at) }}</div>
                                <div class="circle"></div>
                            </span> <span class="text-color__tertiary d-flex align-items-center">
                                <div class="text-color__tertiary">{{ item.word_count }}</div>
                                <div class="circle"></div>
                            </span> <span class="text-color__tertiary d-flex align-items-center">
                                <div class="text-color__tertiary">{{ item.total_reads }} lượt đọc</div>
                            </span> </div>
                    </div>
                </div>

                <!-- Nếu không có dữ liệu -->
                <div v-else>
                    <img style="display: block; margin: 0 auto;" src="@/assets/icon/nodata.png" />
                    <p style="text-align: center;">{{ 'Không có dữ liệu' }}</p>
                </div>
            </div>
        </div>

    </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
import { getStoryFullInfo } from '@/api/stories'
import { useRoute } from 'vue-router';

const route = useRoute();

// Lấy giá trị param
const storyId = route.params.id;
const dataTableStoryChapter = ref([])
const isSearching = ref(false)
const search = ref('')
interface Story {
    story_id: Number,
    urlImg: String
    create_at: string
    title: string
    last_chapter_id: Number
    total_word_count: Number
    total_view_count: Number
}
const clearSearch = () => {
    search.value = ''
    isSearching.value = false
}

// 🔍 Hàm thực hiện tìm kiếm (khi nhấn Enter hoặc click icon)
const doSearch = () => {
    if (!search.value.trim()) return
    // bạn có thể thêm logic gọi API ở đây nếu cần (ví dụ search server-side)
    console.log('Đang tìm chương:', search.value)
}
const filteredChapters = computed(() => {
    if (!search.value.trim()) return dataTableStoryChapter.value
    const keyword = search.value.toLowerCase()
    return dataTableStoryChapter.value.filter(item =>
        item.chapter_title?.toLowerCase().includes(keyword)
    )
})
async function handleOpenListChapter() {
    const res = await getStoryFullInfo(storyId)
    dataTableStoryChapter.value = res.data
}
function formatDateVN(isoString) {
    const date = new Date(isoString)
    const vnTime = new Date(date.getTime() + 7 * 60 * 60 * 1000)
    const day = String(vnTime.getDate()).padStart(2, "0")
    const month = String(vnTime.getMonth() + 1).padStart(2, "0")
    const year = vnTime.getFullYear()
    const hours = String(vnTime.getHours()).padStart(2, "0")
    const minutes = String(vnTime.getMinutes()).padStart(2, "0")
    const seconds = String(vnTime.getSeconds()).padStart(2, "0")
    const formatted = new Intl.DateTimeFormat("vi-VN", {
        timeZone: "Asia/Ho_Chi_Minh",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
    }).format(date)
    return formatted
}
onMounted(() => {
    handleOpenListChapter()
})

</script>

<style scoped>
.story-table .table-header {
    font-weight: 500;
    color: #344054;
}

.story-table .story-thumnail {
    max-width: 50px
}

.story-table {
    border: solid 1px #cfd0d0;
    border-radius: 10px;
    padding-top: 10px;
}

.story-table .el-button,
.el-button.is-round {
    padding: 0;
    border: none;
}

.story-table .el-button span,
.story-table .el-button.is-round span {
    font-weight: bold;
    color: #344054;
    padding: 0 2px;
    font-size: 18px;

}

@media (max-width: 768px) {
    .chapter-list {
        border: 1px solid #e5e7eb;
        border-radius: 10px;
        background: #fff;
        overflow: hidden;
    }

    .chapter-item {
        padding: 12px 16px;
        border-bottom: 1px solid #f0f0f0;
        transition: background 0.2s ease;
        cursor: pointer;
    }

    .chapter-item:hover {
        background: #f9fafb;
    }

    .chapter-title {
        font-weight: 400;
        font-size: 16px;
        color: #1e1e1e;
        margin-bottom: 4px;
    }

    .chapter-meta {
        font-size: 14px;
        color: #6b7280;

    }

    .chapter-meta .circle {
        width: 5px;
        /* chiều rộng */
        height: 5px;
        /* chiều cao (phải bằng width) */
        border-radius: 50%;
        margin: 0 15px;
        /* 50% là tạo tròn */
        background-color: #E4E7EC;
        /* màu nền */
    }


}
</style>