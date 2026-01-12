<template>
  <div class="container">
    <div class="mt-2">
      <h2 class="mb-3">Quản lý bài viết</h2>

      <!-- Thanh tìm kiếm + filter -->
      <div class="d-flex justify-content-between mb-3">
        <el-input v-model="search" placeholder="Tìm kiếm tiêu đề" clearable style="width: 300px">
          <template #prefix>
            <el-icon>
              <Search />
            </el-icon>
          </template>
        </el-input>

        <el-select v-model="selectedStatus" placeholder="Chọn trạng thái" clearable size="small" style="width: 140px">
          <el-option label="Tất cả" value="" />
          <el-option label="Đã duyệt" value="published" />
          <el-option label="Lưu nháp" value="draft" />
        </el-select>
      </div>

      <!-- Table bài viết -->
      <el-table
  ref="tableRef"
  :data="paginatedData"
  style="width: 100%"
  height="400"
  stripe
>
        <el-table-column prop="post_id" label="ID" width="50" />
        
        <el-table-column prop="title" label="Tiêu đề" width="350">
          <template #default="scope">
            <span 
              @click="goToPost(scope.row.post_id)" 
              class="cursor-pointer text-blue-600 hover:underline"
            >
              {{ scope.row.title }}
            </span>
          </template>
        </el-table-column>

        <el-table-column prop="topic_title" label="Chủ đề" width="240" />
        <el-table-column prop="username" label="Tác giả" width="200" />

        <el-table-column prop="created_at" label="Ngày tạo" width="200">
          <template #default="scope">
            {{ formatDateVN(scope.row.created_at) }}
          </template>
        </el-table-column>

        <el-table-column prop="status" label="Trạng thái" width="130">
          <template #default="scope">
            <el-tag :type="scope.row.status === 'published' ? 'primary' : 'success'" disable-transitions>
              {{ scope.row.status }}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column align="center">
          <template #header>
            <span class="table-header">Update</span>
          </template>
          <template #default="scope">
            <el-select 
              :model-value="scope.row.status" 
              placeholder="Chọn trạng thái" 
              size="small" style="width: 100px"
              @change="(newStatus) => handleStatusChange(scope.row, newStatus)"
            >
              <el-option label="Duyệt bài" value="published" />
              <el-option label="Lưu nháp" value="draft" />
            </el-select>
          </template>
        </el-table-column>
      </el-table>

      <!-- Pagination -->
      <div class="mt-4 flex justify-content-center">
<el-pagination
  v-model:current-page="currentPage"
  :page-size="pageSize"
  :total="filteredData.length"
  layout="prev, pager, next"
  background
/>
      </div>
    </div>

    <!-- Dialog confirm đổi trạng thái -->
    <el-dialog v-model="dialogVisible" width="800px" append-to-body>
      <div class="px-3">
        <h2 class="fw-bold">Xác nhận thay đổi</h2>
        <p>Bạn có chắc muốn đổi trạng thái bài viết
          <strong>{{ postSelected?.title }}</strong>
          từ
          <strong>{{ postSelected?.status }}</strong>
          sang
          <strong>{{ statusSelected }}</strong>
          không?
        </p>
        <p class="mt-4">Nội dung bài viết:</p>
        <p class="scroll-box" v-html="postSelected?.content" style="line-height: 2;"></p>
      </div>
      <template #footer>
        <el-button @click="dialogVisible = false">Hủy</el-button>
        <el-button type="primary" @click="confirmChange">Xác nhận</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { getAllPostAdmin, updatePostStatus } from '@/api/forum';
import { toast } from 'vue3-toastify';
import { ElIcon } from 'element-plus';
import { Search } from '@element-plus/icons-vue';

interface Post {
  post_id: number;
  username: string;
  title: string;
  topic_title: string;
  content: string;
  status: string;
  created_at: string;
}

const router = useRouter();

const tableData = ref<Post[]>([]);
const search = ref('');
const selectedStatus = ref('');
const currentPage = ref(1);
const pageSize = ref(10);

const postSelected = ref<Post | null>(null);
const statusSelected = ref<string | null>(null);
const dialogVisible = ref(false);

// Fetch data
async function fetchData() {
  const res = await getAllPostAdmin();
  tableData.value = res.data || [];
}

// Filtered data
const filteredData = computed(() => {
  return tableData.value.filter(row => {
    const matchesSearch = !search.value || row.title.toLowerCase().includes(search.value.toLowerCase());
    const matchesStatus = !selectedStatus.value || row.status === selectedStatus.value;
    return matchesSearch && matchesStatus;
  });
});

// Paginated data
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return filteredData.value.slice(start, end);
});

// Watch search/status => reset page
watch([search, selectedStatus], () => currentPage.value = 1);

// Watch filteredData => adjust currentPage
watch(filteredData, (newData) => {
  const totalPages = Math.ceil(newData.length / pageSize.value);
  if (currentPage.value > totalPages) currentPage.value = totalPages || 1;
});

// Handle status change
function handleStatusChange(row: Post, newStatus: string) {
  postSelected.value = row;
  statusSelected.value = newStatus;
  dialogVisible.value = true;
}

async function confirmChange() {
  if (!postSelected.value || !statusSelected.value) return;
  const res = await updatePostStatus(postSelected.value.post_id, statusSelected.value);
  if (res.success) toast.success(res.message);
  else toast.error(res.message);
  dialogVisible.value = false;
  await fetchData();
}

// Navigate to post detail
function goToPost(postId: number) {
  router.push({ name: 'post-detail', params: { id: postId } });
}

// Format VN Date
function formatDateVN(isoString: string) {
  const date = new Date(isoString);
  return new Intl.DateTimeFormat('vi-VN', {
    timeZone: 'Asia/Ho_Chi_Minh',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(date);
}

onMounted(() => {
  fetchData();
});
</script>

<style scoped>
.scroll-box {
  max-height: 300px;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 6px;
}

.table-header {
  font-weight: 500;
  color: #344054;
}

.cursor-pointer {
  cursor: pointer;
}

.text-blue-600 {
  color: #2563eb;
}

.hover\:underline:hover {
  text-decoration: underline;
}
</style>
