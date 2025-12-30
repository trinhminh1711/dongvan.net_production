<template>
    <div class="container">
        <div class="d-flex align-items-center justify-content-between mt-md-4">
            <h2 class="px-2 px-md-0">Tang Diệp đang có: {{ auth.user.coin_balance }} <img src="@/assets/icon/tamdiep-icon.png">
            </h2>

        </div>
        <div class="mt-4">
            <el-table class="custom-table hide-mobile" v-if="tableData.length" :data="tableData" style="width: 100%">
                <el-table-column prop="id" label="ID" width="180" />
                <el-table-column prop="created_at" label="Thời gian" width="300">
                    <template #default="{ row }">
                        {{ formatDate(row.created_at) }}
                    </template>
                </el-table-column>
                <el-table-column prop="description" label="Nội dung" />

                <!-- Cột direction dùng template -->
                <el-table-column label="Giao dịch" width="120">
                    <template #default="{ row }">
                        <span v-if="row.direction === 'IN'">+{{ Number(row.amount) }} <img
                                src="@/assets/icon/tamdiep-icon.png"></span>
                        <span v-else>-{{ Number(row.amount) }} <img src="@/assets/icon/tamdiep-icon.png"></span>
                    </template>
                </el-table-column>

            </el-table>
            <div v-if="tableData.length" class="transaction-list hide-desktop mb-5">
                <div class="p-3 fw-bold">Nội dung</div>
                <div v-for="(row, index) in tableData" :key="index" class="transaction-item">
                    <!-- Tiêu đề giao dịch -->
                    <div class="transaction-title">
                        {{ row.description }}
                    </div>

                    <!-- Dòng thông tin phụ -->
                    <div class="transaction-meta">
                        <span>ID: {{ row.id }}</span>
                        <span>• {{ formatDate(row.created_at) }}</span>
                        <span>
                            •
                            <span :class="row.direction === 'IN' ? 'tx-in' : 'tx-out'">
                                {{ row.direction === 'IN' ? '+' : '-' }}{{ Number(row.amount) }}
                            </span>
                        </span>
                        <img src="@/assets/icon/tamdiep-icon.png" alt="Tang Diep" class="tamdiep-icon" />
                    </div>
                </div>
            </div>
            <div v-if="!tableData.length">
                <img style="display: block; margin: 0 auto;" src="@/assets/icon/nodata.png" />
                <p style="text-align: center;">Không có dữ liệu</p>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { fetchTransactions } from '@/api/author'
import { useAuthStore } from "@/stores/auth";

const dateRange = ref();
const auth = useAuthStore();
const tableData = ref([])

async function getTransaction() {
    const params = {} as any
    if (dateRange.value) {
        console.log(dateRange.value);
        params.start_date = formatDateSelect(dateRange.value[0])
        params.end_date = formatDateSelect(dateRange.value[1])
        const res = await fetchTransactions(auth.userId, params);
        tableData.value = res.transactions || []
    }
    else {
        const res = await fetchTransactions(auth.userId)
        tableData.value = res.transactions || []
    }
}

const onDateChange = (val: [string, string]) => {
    console.log('Chọn ngày:', val)
}
function formatDate(dateStr: string) {
    const date = new Date(dateStr);
    const datePart = date.toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
    const timePart = date.toLocaleTimeString('vi-VN', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    });
    return `${datePart} ${timePart}`;
}
const formatDateSelect = (date) => {
    const d = new Date(date)
    const yyyy = d.getFullYear()
    const mm = String(d.getMonth() + 1).padStart(2, '0')
    const dd = String(d.getDate()).padStart(2, '0')
    const hh = String(d.getHours()).padStart(2, '0')
    const min = String(d.getMinutes()).padStart(2, '0')
    const ss = String(d.getSeconds()).padStart(2, '0')
    return `${hh}:${min}:${ss} ${yyyy}-${mm}-${dd} `
}
onMounted(() => {
    getTransaction()
})
</script>

<style scoped>
.custom-table ::v-deep(.el-table__header th) {
    background-color: #F9FAFB;
    /* hoặc #2f2f2f tuỳ tone */
    color: #344054;
    font-weight: 600;
    height: 56px;
}

.custom-table ::v-deep(.el-table__cell) {
    padding: 12px 16px;
    /* tăng padding để row cao hơn, gọn hơn height cứng */
    vertical-align: middle;
}

/* ✅ Thêm border và bo góc cho bảng */
.custom-table {
    border: 1px solid #E4E7EC;
    border-radius: 8px;
    overflow: hidden;
    /* để border-radius áp dụng cả header + body */
}

/* ✅ Viền giữa các ô (nếu muốn rõ hơn) */
.custom-table ::v-deep(.el-table__cell) {
    border-color: #E4E7EC;
    /* màu viền giữa các ô */
}
@media (max-width: 768px) {
    .transaction-list {
  display: flex;
  flex-direction: column;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
  background: #fff;
}

.transaction-item {
  padding: 12px 16px;
  border-bottom: 1px solid #f3f4f6;
}

.transaction-item:last-child {
  border-bottom: none;
}

.transaction-title {
  font-weight: 600;
  color: #1f2937;
  font-size: 15px;
  margin-bottom: 4px;
  line-height: 1.4;
}

.transaction-meta {
  font-size: 13px;
  color: #6b7280;
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}

.tx-in {
  color: #16a34a;
  font-weight: 600;
}

.tx-out {
  color: #dc2626;
  font-weight: 600;
}

.tamdiep-icon {
  width: 16px;
  height: 16px;
  object-fit: contain;
  margin-left: 2px;
}

.empty {
  text-align: center;
  padding: 20px;
  color: #9ca3af;
}

}
</style>
