<template>
  <div class="container">
    <div class="mt-2">
      <h2 class="mb-3">Quản lý truyện</h2>

      <!-- Thanh tìm kiếm và filter -->
      <div class="d-flex justify-content-between mb-3">
        <el-input v-model="search" placeholder="Tìm kiếm truyện" clearable style="width: 300px">
          <template #prefix>
            <el-icon><Search /></el-icon>
          </template>
        </el-input>

        <el-select v-model="filterStoryData" placeholder="Chọn trạng thái" clearable size="small" style="width: 200px">
          <el-option label="Tất cả" value="" />
          <el-option label="Bản nháp" value="draft" />
          <el-option label="Chờ duyệt" value="pending" />
          <el-option label="Xuất bản" value="published" />
        </el-select>
      </div>

      <!-- Table truyện -->
      <el-table class="story-table" :data="paginatedData" style="width: 100%" :fit="true">
        <el-table-column type="index" label="STT" width="80" />
        <el-table-column prop="title" width="300">
          <template #header>
            <span class="table-header">Tên truyện</span>
          </template>
          <template #default="scope">
            <div @click="viewStoryDetail(scope.row)" class="d-flex align-items-center gap-2 cursor-pointer">
              <img class="story-thumbnail" :src="scope.row.urlImg" alt="">
              {{ scope.row.title }}
            </div>
          </template>
        </el-table-column>

        <el-table-column prop="last_chapter_id">
          <template #header>
            <span class="table-header">Số chương đã đăng</span>
          </template>
          <template #default="scope">
            {{ scope.row.last_chap_number ?? 1 }} Chương
          </template>
        </el-table-column>

        <el-table-column prop="author_name">
          <template #header>
            <span class="table-header">Tác giả</span>
          </template>
          <template #default="scope">
            {{ scope.row.author_name }}
          </template>
        </el-table-column>

        <el-table-column prop="create_at">
          <template #header>
            <span class="table-header">Ngày tháng đăng</span>
          </template>
          <template #default="scope">
            {{ formatDateVN(scope.row.create_at) }}
          </template>
        </el-table-column>

        <el-table-column align="center" width="250">
          <template #header>
            <span class="table-header">Trạng thái</span>
          </template>
          <template #default="scope">
            <el-select
              :model-value="scope.row.status"
              placeholder="Chọn trạng thái"
              size="small"
              style="width: 140px"
              @change="(newStatus) => handleStatusChange(scope.row, newStatus)"
            >
              <el-option label="Bản nháp" value="draft" />
              <el-option label="Chờ duyệt" value="pending" />
              <el-option label="Xuất bản" value="published" />
              <el-option label="Xóa bài viết" value="denied" />
            </el-select>
          </template>
        </el-table-column>
      </el-table>

      <!-- Pagination -->
      <div class="mt-4 flex justify-content-center">
        <el-pagination
          layout="prev, pager, next"
          :page-size="pageSize"
          :total="filteredData.length"
          v-model:current-page="currentPage"
        />
      </div>
    </div>

    <!-- Dialog confirm đổi trạng thái -->
    <el-dialog v-model="dialogVisible" title="Xác nhận thay đổi" width="400px">
      <p>Bạn có chắc muốn đổi trạng thái truyện
        <strong>{{ storySelected?.title }}</strong>
        từ
        <strong>{{ storySelected?.status }}</strong>
        sang
        <strong>{{ statusSelected }}</strong>
        không?
      </p>
      <template #footer>
        <el-button @click="dialogVisible = false">Hủy</el-button>
        <el-button type="primary" @click="confirmChange">Xác nhận</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { getAllPublishedStories, updateStoryStatus } from '@/api/admin'
import { toast } from 'vue3-toastify'
import { ElIcon } from 'element-plus'
import { Search } from '@element-plus/icons-vue'

interface Story {
  story_id: number
  urlImg: string
  create_at: string
  title: string
  author_name: string
  last_chap_number: number
  status: string
}

const router = useRouter()
const tableData = ref<Story[]>([])
const search = ref('')
const filterStoryData = ref('')
const currentPage = ref(1)
const pageSize = ref(10)

const storySelected = ref<Story | null>(null)
const statusSelected = ref<string | null>(null)
const dialogVisible = ref(false)

// Fetch danh sách truyện
async function fetchListStory() {
  const res = await getAllPublishedStories()
  tableData.value = res.data
}
onMounted(() => fetchListStory())

// Filter theo search + status
const filteredData = computed(() => {
  return tableData.value.filter(story => {
    const matchesSearch = !search.value || story.title.toLowerCase().includes(search.value.toLowerCase())
    const matchesStatus = !filterStoryData.value || story.status === filterStoryData.value
    return matchesSearch && matchesStatus
  })
})

// Paginate
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return filteredData.value.slice(start, end)
})

// Reset page khi search/filter thay đổi
watch([search, filterStoryData], () => currentPage.value = 1)

// Hàm đổi trạng thái
function handleStatusChange(story: Story, newStatus: string) {
  storySelected.value = story
  statusSelected.value = newStatus
  dialogVisible.value = true
}

async function confirmChange() {
  if (!storySelected.value || !statusSelected.value) return
  const res = await updateStoryStatus(storySelected.value.story_id, statusSelected.value)
  if (res.success) toast.success(res.message)
  else toast.error(res.message)
  dialogVisible.value = false
  await fetchListStory()
}

// Xem chi tiết truyện
function viewStoryDetail(story: Story) {
  router.push({ name: 'story-detail', params: { id: story.story_id } })
}

// Format ngày tháng VN
function formatDateVN(isoString: string) {
  const date = new Date(isoString)
  return new Intl.DateTimeFormat('vi-VN', {
    timeZone: 'Asia/Ho_Chi_Minh',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(date)
}
</script>

<style scoped>
.story-table .table-header {
  font-weight: 500;
  color: #344054;
}

.story-table .story-thumbnail {
  max-width: 50px;
}

.story-table {
  border: solid 1px #cfd0d0;
  border-radius: 10px;
  padding-top: 10px;
}

.cursor-pointer {
  cursor: pointer;
}
</style>
