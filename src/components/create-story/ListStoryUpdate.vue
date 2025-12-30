<template>
    <div class="mt-4">
        <!-- Thanh tìm kiếm toàn bảng -->
        <div class="hide-mobile d-flex justify-content-between">
            <el-input v-model="search" placeholder="Tìm kiếm truyện" clearable
                style="width: 300px; margin-bottom: 15px"><template #prefix>
                    <el-icon>
                        <Search />
                    </el-icon>
                </template>
            </el-input>
            <el-select v-model="filterStoryData" @change="handleSelectStoryStatus" placeholder="Chọn một mục"
                style="width: 240px">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
        </div>
        <div class="hide-mobile table-responsive">
            <el-table class="story-table" :data="paginatedData" :fit="true">
                <el-table-column type="index" label="STT" width="80" />
                <el-table-column prop="title" width="450">
                    <template #header>
                        <span class="table-header">Tên truyện</span>
                    </template>
                    <template #default="scope">
                        <div class="d-flex align-items-center gap-2">
                            <img class="story-thumnail" :src="scope.row.urlImg" alt="">
                            {{ scope.row.title }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="last_chapter_id" width="250">
                    <template #header>
                        <span class="table-header">Số chương</span>
                    </template>
                    <template #default="scope">
                        {{ scope.row.last_chap_number ?? 1 }} Chương
                    </template>
                </el-table-column>

                <el-table-column label="Date" prop="create_at" width="250">
                    <template #header>
                        <span class="table-header">Ngày tháng đăng</span>
                    </template>
                    <template #default="scope">
                        {{ formatDateVN(scope.row.create_at) }}
                    </template>
                </el-table-column>
                <el-table-column align="center" width="250">
                    <template #default="scope">
                        <el-tooltip class="box-item" effect="dark" content="Thêm chương" placement="top-start">
                            <el-button @click="handleAdd(scope.row.story_id)">
                                <img src="@/assets/icon/plus.svg" alt="">
                            </el-button>
                        </el-tooltip>
                        <el-tooltip class="box-item" effect="dark" content="Danh sách chương" placement="top-start">
                            <el-button @click="goToListChap(scope.row.story_id)">
                                <img src="@/assets/icon/menu-04.svg" alt="">
                            </el-button>
                        </el-tooltip>
                        <el-tooltip class="box-item" effect="dark" content="Chỉnh sửa truyện" placement="top-start">
                            <el-button @click="handleEdit(scope.$index, scope.row)">
                                <img src="@/assets/icon/edit-05.svg" alt="">
                            </el-button>
                        </el-tooltip>
                        <el-tooltip class="box-item" effect="dark" content="Hỗ trợ" placement="top-start">
                            <el-button @click="handleSupport(scope.$index, scope.row)">
                                <img src="@/assets/icon/message-check-circle.svg" alt="">
                            </el-button>
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="hide-desktop story-list-container">
            <div class="story-header d-flex align-items-center justify-content-between p-3 rounded-top">
                <!-- Nếu chưa bấm tìm -->
                <template v-if="!isSearching">
                    <div class="header-title fw-semibold">Tên truyện</div>
                    <div class="d-flex align-items-center gap-3">
                        <el-icon class="header-icon" @click="isSearching = true">
                            <Search />
                        </el-icon>

                        <el-select ref="selectRef" v-model="filterStoryData" @change="handleSelectStoryStatus"
                            placeholder="" class="icon-select" popper-class="custom-dropdown">
                            <template #prefix>
                                <svg width="18" height="18" viewBox="0 0 17 12" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3.25 5.75H13.25M0.75 0.75H15.75M5.75 10.75H10.75" stroke="#344054"
                                        stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </template>

                            <el-option v-for="item in options" :key="item.value" :label="item.label"
                                :value="item.value">
                                <div class="option-item">
                                    <span>{{ item.label }}</span>
                                    <span v-if="filterStoryData === item.value" class="check-icon">✓</span>
                                </div>
                            </el-option>
                        </el-select>
                    </div>
                </template>

                <!-- Nếu đang bấm tìm -->
                <template v-else>
                    <div class="search-box d-flex align-items-center w-100 gap-2">
                        <el-input v-model="search" placeholder="Nhập tên truyện..." size="large" clearable
                            class="search-input flex-grow-1" @clear="clearSearch" @keyup.enter="doSearch" />
                        <el-icon class="header-icon" @click="clearSearch()">
                            <Close />
                        </el-icon>
                    </div>
                </template>
            </div>
            <div v-for="(story, index) in paginatedData"
                class="story-item d-flex align-items-center justify-content-between p-2">
                <!-- Ảnh + Thông tin -->
                <div class="d-flex align-items-center gap-3">
                    <img class="story-thumbnail" :src="story.urlImg" alt="thumbnail" />
                    <div>
                        <div class="story-title fw-semibold">{{ story.title }}</div>
                        <div class="story-meta text-muted small mt-2">
                            <span>{{ story.last_chap_number ?? 1 }} chương </span>
                            <span class="mx-1">•</span>
                            <span>{{ formatDateVN(story.create_at) }}</span>
                        </div>
                    </div>
                </div>
                <div class="story-list-func"> <el-dropdown trigger="click" placement="bottom-end">
                        <span class="el-dropdown-link">
                            <el-icon>
                                <el-icon class="vertical-more">
                                    <MoreFilled />
                                </el-icon>
                            </el-icon>
                        </span>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item @click="handleAdd(story.story_id)">
                                    <img src="@/assets/icon/plus.svg" class="action-icon me-2" /> Thêm chương
                                </el-dropdown-item>
                                <el-dropdown-item @click="goToListChap(story.story_id)">
                                    <img src="@/assets/icon/menu-04.svg" class="action-icon me-2" /> Danh sách chương
                                </el-dropdown-item>
                                <el-dropdown-item @click="handleEdit(index, story)">
                                    <img src="@/assets/icon/edit-05.svg" class="action-icon me-2" /> Chỉnh sửa truyện
                                </el-dropdown-item>
                                <el-dropdown-item @click="handleSupport(index, story)">
                                    <img src="@/assets/icon/message-check-circle.svg" class="action-icon me-2" /> Hỗ trợ
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown></div>
                <!-- Menu 3 chấm -->

            </div>
        </div>

        <div style="display: flex; justify-content: center;" class="mt-4 d-flex">
            <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[5, 10, 20, 50]"
                :total="tableData.length" layout=" prev, pager, next" />
        </div>
        <el-dialog v-model="dialogVisible" width="500">
            <span class="text-color_primary fw-bold text-18">Gửi yêu cầu hỗ trợ</span>
            <p class="text-sm mt-2">Trước khi gửi câu hỏi, vui lòng đọc hết mục <span @click="goToSupportPage()"
                    class="text-underline fw-semibold cursor-pointer">Hướng dẫn</span> , nếu bạn vẫn không tìm thấy
                câu trả
                lời,
                hãy gửi câu hỏi cho chúng tôi.</p>
            <el-form label-position="top" class="mt-3">
                <!-- Input 1: Text -->
                <el-form-item label="Liên quan đến truyện">
                    <el-input v-model="form.name" />
                </el-form-item>

                <!-- Input 2: Select -->
                <el-form-item label="Vấn đề cần hỗ trợ">
                    <el-select v-model="form.category" placeholder="Chọn danh mục" style="width: 100%;">
                        <el-option label="Yêu cầu quảng cáo truyện" value="1" />
                        <el-option label="Yêu cầu làm poster riêng cho truyện" value="2" />
                        <el-option label="Yêu cầu bật thu phí" value="3" />
                        <el-option label="Vấn đề khác" value="4" />
                    </el-select>
                </el-form-item>

                <!-- Input 3: Textarea -->
                <el-form-item label="Mô tả chi tiết">
                    <el-input type="textarea" v-model="form.description" placeholder="Nhập mô tả" :rows="4" />
                </el-form-item>
                <el-upload ref="upload" class="upload-demo"
                    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" :limit="1"
                    :on-exceed="handleExceed" :auto-upload="false">
                    <template #trigger>
                        <p class="text-color_primary fw-bold"><el-icon>
                                <Paperclip />
                            </el-icon> Đính kèm tệp (tối đa 3)</p>
                    </template>
                </el-upload>
                <div v-if="form.category === '3'" class="note">
                    <p class="color-light-blue text-14">Bạn chỉ đủ điều kiện bật thu phí cho truyện nếu:</p>
                    <ul class="text-14 color-light-blue">
                        <li>Tác phẩm đó phải có trên 15.000 chữ.</li>
                        <li>Đã đăng ít nhất 10 chương.</li>
                        <li>Đạt tối thiểu 1.000 lượt đọc hợp lệ.</li>
                    </ul>
                </div>
                <div class="mt-4">
                    <button style="border-radius: 5px; width: 100%;" class="btn-alert fw-bold py-2-5 text-16"
                        type="button">Gửi
                        yêu
                        cầu</button>
                </div>
            </el-form>
        </el-dialog>

    </div>
    <!-- <div class="nodata-wrapper" v-else>
        <img style="display: block; margin: 0 auto;" src="@/assets/icon/nodata.png" />
        <p style="text-align: center;">Không có dữ liệu</p>
    </div> -->
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from "vue-router"
import { genFileId } from 'element-plus'
import type { UploadInstance, UploadProps, UploadRawFile } from 'element-plus'
import { getStory } from "@/api/stories"

import { useAuthStore } from "@/stores/auth";
const auth = useAuthStore();
const router = useRouter()
const tableData = ref<Story[]>([])
const upload = ref<UploadInstance>()
const selectRef = ref(null)

const handleFilter = () => {
    // Kiểm tra phần tử tồn tại
    if (selectRef.value) {
        // Dùng API nội bộ của Element Plus để mở dropdown
        selectRef.value.toggleMenu() // mở hoặc đóng menu
    }
}
interface Story {
    story_id: Number,
    urlImg: string,
    create_at: string,
    title: string,
    last_chapter_id: Number
    last_chap_number?: number
    total_word_count: Number
    total_view_count: Number
}
const form = ref({
    name: '',
    category: '',
    description: '',
})
const options = [
    { value: 'all', label: 'Tất cả' },
    { value: 'pending', label: 'Đang chờ duyệt' },
    { value: 'published', label: 'Đã xuất bản' },
]
const dialogVisible = ref(false)
const openDialogListChapter = ref(false)
const filterStoryData = ref(options[0].value)

const search = ref('')
const currentPage = ref(1)
const pageSize = ref(10)

const isSearching = ref(false)
const searchText = ref('')

const doSearch = () => {
    console.log('Tìm truyện:', search.value)
}

const clearSearch = () => {
    isSearching.value = false
    search.value = ''
}


const handleExceed: UploadProps['onExceed'] = (files) => {
    upload.value!.clearFiles()
    const file = files[0] as UploadRawFile
    file.uid = genFileId()
    upload.value!.handleStart(file)
}

onMounted(async () => {
    getDataStoryApi('all')
})
async function getDataStoryApi(status) {
    const res = await getStory(auth.userId, status)
    tableData.value = res
}
const filterTableData = computed(() =>
    tableData.value.filter(
        (data) =>
            !search.value ||
            data.title.toLowerCase().includes(search.value.toLowerCase())
    )
)
const paginatedData = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value
    const end = start + pageSize.value
    return filterTableData.value.slice(start, end)
})
async function handleSelectStoryStatus(val) {
    getDataStoryApi(val)

}
function handleAdd(value) {
    router.push(`/create-story/new-chap/${value}`)

}

function handleEdit(index: number, row: Story) {
    router.push({
        name: 'edit-story',
        params: { id: Number(row.story_id) }
    })

}

function handleSupport(index: number, row: Story) {
    dialogVisible.value = true;
    form.value.name = row.title

}
function goToListChap(storyId) {
    router.push({
        name: 'list-chap',
        params: { id: storyId }
    });
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
function goToSupportPage() {

    router.push({ name: 'instruct' }) // dựa trên name của route

}
</script>
<style>
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

    .table-responsive {
        width: 100%;
        overflow-x: auto;
        /* cho phép scroll ngang */
    }

    .el-dialog {
        max-width: 90%;
    }

    .story-list-container {
        width: 100%;
        border: solid 1px #E4E7EC;
        border-radius: 10px;
    }

    .story-item {
        background: #fff;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        transition: background 0.2s;
    }

    .story-item:hover {
        background: #f9f9f9;
    }

    .story-thumbnail {
        width: 55px;
        height: 75px;
        border-radius: 8px;
        object-fit: cover;
    }

    .story-title {
        font-size: 16px;
        color: #333;
    }

    .story-meta {
        font-size: 13px;
        color: #888;
    }

    .story-item {
        border-bottom: solid 1px #E4E7EC;
        ;
    }

    .vertical-more {
        transform: rotate(90deg);
        /* 🔄 xoay 90 độ */
        cursor: pointer;
        transition: 0.2s;
    }

    .vertical-more:hover {
        color: #409eff;
        /* đổi màu khi hover cho giống Element Plus */
    }

    .story-list-func .el-dropdown-menu__item {
        padding: 10px 16px !important;
    }

    .story-header {
        background: #fafbfc;
        border-bottom: solid 1px #E4E7EC;

    }

    .header-title {
        font-size: 16px;
        color: #374151;
    }

    .header-icon {
        font-size: 20px;
        color: #374151;
        cursor: pointer;
        transition: color 0.2s;
    }

    .header-icon:hover {
        color: #409eff;
    }

    .search-box .el-input {
        flex: 1;
    }

    /* Ẩn border + nền + focus outline */
    .story-list-container .search-input .el-input__wrapper {
        box-shadow: none !important;
        border: none !important;
        background: transparent !important;
    }

    .story-list-container .search-input .el-input__inner {
        background: transparent !important;
    }

    .story-list-container .search-input .el-input__wrapper:hover,
    .story-list-container .search-input .el-input__wrapper.is-focus {
        box-shadow: none !important;
    }

    .story-list-container .search-input .el-input__suffix {
        display: none;
    }

    .story-list-container .el-input__wrapper {
        padding: 0 !important;
    }

    .icon-select .el-select__wrapper {
        box-shadow: none;
        background: none;
    }

    .icon-select .el-select__suffix {
        display: none;
    }

    .icon-select {
        position: relative;
        display: inline-block;
        /* giữ vị trí của icon trong dòng */
    }

    .custom-dropdown .option-item {
        justify-content: space-between !important;
    }

    .custom-dropdown {
        position: absolute !important;

        width: 200px;
        transform: none !important;
        background: #FFFFFF;
        border: solid 1px #E4E7EC;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
    }
    .py-2-5 
    {
        padding: 14px 0;
        border-radius: 8px !important;
    }
}
</style>
