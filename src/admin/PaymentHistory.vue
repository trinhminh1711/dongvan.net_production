<template>
    <div class="container">
        <div class="d-flex align-items-center justify-content-between mt-4">
            <h2>Duyệt thanh toán
            </h2>
            <div class="filter-container">
                <el-date-picker v-model="dateRange" type="daterange" range-separator="đến"
                    start-placeholder="Start date" end-placeholder="End date" />
                <el-button type="primary" @click="getTransaction()">Lọc</el-button>
            </div>
        </div>
        <div class="mt-4">
            <el-table v-if="tableData.length" :data="tableData" style="width: 100%">
                <el-table-column prop="id" label="ID" width="150" />
                <el-table-column prop="created_at" label="Thời gian" width="180">
                    <template #default="{ row }">
                        {{ formatDate(row.created_at) }}
                    </template>
                </el-table-column>
                <el-table-column prop="description" label="Nội dung" width="280">
                    <template #default="{ row }">
                        <span>User {{ row.user_id }} chuyển khoản nạp tiền </span>
                    </template>
                </el-table-column>

                <!-- Cột direction dùng template -->
                <el-table-column label="Giao dịch" width="180">
                    <template #default="{ row }">
                        <span>Nạp {{ formatMoney(row.amount) }} VNĐ </span>
                    </template>
                </el-table-column>
                <el-table-column label="Giao dịch" width="120">
                    <template #default="{ row }">
                        <span>Nạp {{ Number(row.coin) }} <img src="@/assets/icon/tamdiep-icon.png"></span>
                    </template>
                </el-table-column>
                <el-table-column>
                    <template #default="{ row }">
                        <div class="d-flex">
                            <el-button v-if="!row.is_duyet" @click="handleOpenDialog(row.id)" type="success"> <el-icon>
                                    <Check />
                                </el-icon><span> Duyệt</span></el-button>
                            <el-button v-if="row.is_duyet" :disabled="true" type="danger"><el-icon>
                                    <Delete />
                                </el-icon> <span>Đã duyệt</span></el-button>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <div v-if="!tableData.length">
                <img style="display: block; margin: 0 auto;" src="@/assets/icon/nodata.png" />
                <p style="text-align: center;">Không có dữ liệu</p>
            </div>
        </div>
        <div class="d-flex justify-content-center mt-3">
            <el-pagination @current-change="handlePageChange" v-model:current-page="currentPage" :page-size="10"
                :pager-count="11" layout="prev, pager, next" :total="23" />
        </div>
        <el-dialog v-model="dialogVisible" title="Duyệt giao dịch" width="500" append-to-body>
            <span class="text-xl">Duyệt giao dịch Tang diệp sẽ được chuyển về tài khoản người dùng</span>
            <template #footer>
                <div class="dialog-footer">
                    <button style="border-radius: 5px;" class="btn-alert me-2" @click="duyetGiaoDich">Đồng ý</button>
                    <button style="border-radius: 5px;" class="btn-outline" @click="dialogVisible = false">Hủy
                        bỏ</button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { getTransactions, approveTransaction } from '@/api/mail';
import { useAuthStore } from "@/stores/auth";
import { toast } from 'vue3-toastify';
const currentPage = ref(1);
const dateRange = ref();
const selectedId = ref()
const auth = useAuthStore();
const tableData = ref([])
const dialogVisible = ref(false)
async function getTransaction() {
    const params = {} as any
    if (dateRange.value) {
        params.start_date = formatDateSelect(dateRange.value[0])
        params.end_date = formatDateSelect(dateRange.value[1])
        const res = await getTransactions();
        tableData.value = res.data || []
    }
    else {
        const res = await getTransactions();
        tableData.value = res.data || []
    }
}
const handleOpenDialog = (id) => {
    selectedId.value = id;
    dialogVisible.value = true;

};
async function duyetGiaoDich() {
    const res = await approveTransaction(selectedId.value)
    if (res.success) {
        toast.success("Đã duyệt giao dịch");
        await getTransaction()
    }
    else {
        toast.error("Duyệt giao dịch lỗi")
        await getTransaction()
    }
    dialogVisible.value = false;
}
const handlePageChange = async (page) => {
    const res = await getTransactions(page);
    tableData.value = res.data || []
};
function formatMoney(value) {
    return Number(value).toLocaleString("vi-VN");
}
const onDateChange = (val: [string, string]) => {
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
const formatDateSelect = (date) => {
    const d = new Date(date)
    const yyyy = d.getFullYear()
    const mm = String(d.getMonth() + 1).padStart(2, '0')
    const dd = String(d.getDate()).padStart(2, '0')
    const hh = String(d.getHours()).padStart(2, '0')
    const min = String(d.getMinutes()).padStart(2, '0')
    const ss = String(d.getSeconds()).padStart(2, '0')
    return `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`
}
onMounted(() => {
    getTransaction()
})
</script>

<style scoped></style>
