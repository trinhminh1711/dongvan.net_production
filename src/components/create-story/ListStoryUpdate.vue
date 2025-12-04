<template>
    <div class="mt-4">
        <!-- Thanh tìm kiếm toàn bảng -->
        <div class="d-flex justify-content-between">
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
        <div class="table-responsive">
            <el-table class="story-table" :data="paginatedData" style="width: 100%" :fit="true">
                <el-table-column type="index" label="STT" width="80" />
                <el-table-column prop="title" width="500">
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
        <div style="display: flex; justify-content: center;" class="mt-4 d-flex">
            <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[5, 10, 20, 50]"
                :total="tableData.length" layout=" prev, pager, next" />
        </div>
        <el-dialog v-model="dialogVisible" width="500">
            <span class="text-color_primary fw-bold">Gửi yêu cầu hỗ trợ</span>
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
                    <p class="text-sm color-light-blue">Bạn chỉ đủ điều kiện bật thu phí cho truyện nếu:</p>
                    <ul class="text-sm color-light-blue">
                        <li>Tác phẩm đó phải có trên 15.000 chữ.</li>
                        <li>Đã đăng ít nhất 10 chương.</li>
                        <li>Đạt tối thiểu 1.000 lượt đọc hợp lệ.</li>
                    </ul>
                </div>
                <div class="mt-4">
                    <button style="border-radius: 5px; width: 100%;" class="btn-alert fw-bold py-3 text-16"
                        type="button">Gửi
                        yêu
                        cầu</button>
                </div>
            </el-form>
        </el-dialog>

    </div>
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

interface Story {
    story_id: Number,
    urlImg: String
    create_at: string
    title: string
    last_chapter_id: Number
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


const handleExceed: UploadProps['onExceed'] = (files) => {
    upload.value!.clearFiles()
    const file = files[0] as UploadRawFile
    file.uid = genFileId()
    upload.value!.handleStart(file)
}

const submitUpload = () => {
    upload.value!.submit()
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
.el-dialog
{
    max-width: 90%;
}
}
</style>
