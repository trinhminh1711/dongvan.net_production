<template>
    <div class="container">
        <div class="d-flex align-items-center justify-content-between mt-4">
            <h2>Quản lý người dùng
            </h2>
        </div>
        <div class="mt-4">
            <el-table highlight-current-row v-if="tableData.length" :data="tableData" class="table-data"
                style="width: 100%">
                <el-table-column prop="user_id" label="ID" width="50" />
                <el-table-column prop="created_at" label="Ngày tạo tài khoản" width="180">
                    <template #default="{ row }">
                        {{ formatDate(row.created_at) }}
                    </template>
                </el-table-column>
                <el-table-column prop="description" label="Bút danh" width="180">
                    <template #default="{ row }">
                        <span>{{ row.username }} </span>
                    </template>
                </el-table-column>

                <!-- Cột direction dùng template -->
                <el-table-column label="Email đăng nhập" width="230">
                    <template #default="{ row }">
                        <span> {{ row.email }} </span>
                    </template>
                </el-table-column>
                <el-table-column label="Số điện thoại" width="130">
                    <template #default="{ row }">
                        <span>{{ row.phone_number ? row.phone_number : 'Chưa đăng ký' }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="Quyền tài khoản" width="130">
                    <template #default="{ row }">
                        <el-button size="small" :type="row.role === 'master_admin'
                            ? 'danger'
                            : row.role === 'content_admin'
                                ? 'success'
                                : 'info'
                            ">
                            {{
                                row.role === 'user'
                                    ? 'Người dùng'
                                    : row.role === 'content_admin'
                                        ? 'Biên tập viên'
                                        : row.role === 'master_admin'
                                            ? 'Quản trị viên'
                                            : 'Không xác định'
                            }}</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="Trạng thái" width="150">
                    <template #default="{ row }">
                        <el-button v-if="row.role != 'master_admin'"
                            :type="row.status === 'active' ? 'success' : 'danger'" size="small" plain
                            @click="handleStatusClick(row)">
                            <el-icon style="margin-right: 4px;">
                                <component :is="row.status === 'active' ? 'Unlock' : 'Lock'" />
                            </el-icon>
                            {{ row.status === 'active' ? 'Đang hoạt động' : 'Bị khóa' }}
                        </el-button>
                    </template>
                </el-table-column>

            </el-table>
            <div v-if="!tableData.length">
                <img style="display: block; margin: 0 auto;" src="@/assets/icon/nodata.png" />
                <p style="text-align: center;">Không có dữ liệu</p>
            </div>
        </div>
        <el-dialog v-model="dialogVisible" :title="dialogTitle" width="400px" append-to-body>
            <p>{{ dialogMessage }}</p>

            <template #footer>
                <el-button @click="dialogVisible = false">Hủy</el-button>
                <el-button type="primary" @click="confirmAction">Xác nhận</el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
const dialogVisible = ref(false);
const selectedUser = ref(null);
const dialogTitle = ref("");
const dialogMessage = ref("");
import { ref, onMounted } from 'vue'
import { getTransactions, approveTransaction } from '@/api/mail';
import { useAuthStore } from "@/stores/auth";
import { getAllUsers } from '@/api/admin';
import { updateUserStatus } from '@/api/other.user';
import { toast } from 'vue3-toastify';
const currentPage = ref(1);
const unlockUserDialog = ref(0)
const dateRange = ref();
const selectedId = ref()
const auth = useAuthStore();
const userSelected = ref();
const statusSelected = ref()
const tableData = ref([])
const listUser = async () => {
    const res = await getAllUsers();
    const order = { master_admin: 1, content_admin: 2, user: 3 }
    tableData.value = res.sort((a, b) => order[a.role] - order[b.role])

}
function formatDate(dateStr: string) {
    const date = new Date(dateStr);
    return date.toLocaleString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });
}
const handleStatusClick = (row) => {
    selectedUser.value = row;
    userSelected.value = row.user_id
    if (row.status === "active") {
        dialogTitle.value = "Khóa người dùng";
        dialogMessage.value = `Bạn có chắc muốn khóa tài khoản của ${row.username}?`;
        statusSelected.value = 'denied'
    } else {
        dialogTitle.value = "Mở khóa người dùng";
        dialogMessage.value = `Bạn có chắc muốn mở khóa tài khoản của ${row.username}?`;
         statusSelected.value = 'active'
    }

    dialogVisible.value = true;
};
const confirmAction = async () => {
    const newStatus = selectedUser.value.status === "active" ? "locked" : "active";
    const res = await updateUserStatus(userSelected.value, statusSelected.value)
    toast.success(res.message)
    selectedUser.value.status = newStatus;
    await listUser();
    dialogVisible.value = false;
};
onMounted(() => {
    listUser()
})
</script>

<style>
.table-data {
    transition: box-shadow 0.3s ease;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
    border-radius: 10px;
    padding: 20px;
}

.table-data:hover {
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

.table-data .el-table__body tr:hover>td {
    background-color: #afecff !important;
    /* xanh nhạt */
    transition: background-color 0.2s ease;
}
</style>
