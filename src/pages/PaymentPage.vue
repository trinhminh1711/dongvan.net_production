<template>
    <div class="container-fuild">
        <div class="container bg-gray px-3 mt-3 ">
            <div style="background-color: #FFF5F5; border-top-left-radius: 10px;
border-top-right-radius: 10px;" class="py-3">
                <img style="max-width: 50px; display: block; margin: auto; padding: 20px 0;"
                    src="@/assets/icon/icon-payment.png" alt="">
                <p class="text-center px-3 text-mb-16">Nạp Tang Diệp vào tài khoản để mua chương VIP và ủng hộ tác giả</p>
            </div>
            <h3 class="fw-bold mt-mb-32 mb-3 mt-md-5 mb-md-0">
                Chọn mệnh giá
            </h3>
            <div class="d-flex flex-wrap justify-content-between">
                <div @click="selectPayment(index)" v-for="(item, index) in payments" :key="index"
                    class="payment-value-box text-center border rounded-3 my-md-4 my-md-0"
                    :class="{ active: selected === index }">
                    <h4 class="fw-bold text-xlg color-yellow">{{ item.price }}</h4>
                    <div v-if="item.budget" class="popular-payment btn-alert">Phổ biến</div>
                    <p class="mt-md-2">{{ item.value }} Tang Diệp</p>
                </div>
            </div>
            <div class="select-value py-3">
                <p class="fw-bold mb-3">Hoặc nhập số tiền tùy chỉnh</p>
                <el-input @focus="handleFocus" size="large" v-model="inputValue" clearable placeholder="Nhập số tiền" />
                <p class="mt-2" style="text-transform: uppercase; color: #AEAEAE;" v-if="inputValue">
                    {{ renderValueMoney(inputValue) }}</p>
            </div>
            <div class="row  d-flex justify-content-center mt-5">
                <el-tabs class="tab-payment" v-model="activeName" type="card">
                    <el-tab-pane class="mt-5" name="first">
                        <template #label>
                            <div class="d-flex align-items-center">
                                <p class="px-2 d-flex align-items-center">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                        xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                        <rect width="24" height="24" fill="url(#pattern0_149_1684)" />
                                        <defs>
                                            <pattern id="pattern0_149_1684" patternContentUnits="objectBoundingBox"
                                                width="1" height="1">
                                                <use xlink:href="#image0_149_1684" transform="scale(0.00195312)" />
                                            </pattern>
                                            <image id="image0_149_1684" width="512" height="512"
                                                preserveAspectRatio="none"
                                                xlink:href="data:image/png;base64,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" />
                                        </defs>
                                    </svg>
                                </p>
                                <p>
                                    Quét mã QR
                                </p>
                            </div>
                        </template>
                        <div>
                            <RenderQRcode :key="valueRenderQRcode" :amount="valueRenderQRcode"
                                :add-info="auth.userId + ' Chuyển khoản' + valueRenderQRcode + 'mua Tang diệp'" />
                        </div>
                    </el-tab-pane>
                    <el-tab-pane class="mt-5 full-weight" name="seconds">
                        <template #label>
                            <div class="d-flex align-items-center">
                                <p class="px-2 d-flex align-items-center">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M16.6667 7.33332V3.25075C16.6667 2.28038 16.6667 1.7952 16.4623 1.49703C16.2837 1.23653 16.0071 1.05956 15.6957 1.00658C15.3393 0.945931 14.8988 1.14925 14.0178 1.55589L3.66885 6.33231C2.88309 6.69497 2.49021 6.87629 2.20246 7.15752C1.94807 7.40614 1.75389 7.70962 1.63476 8.04478C1.5 8.4239 1.5 8.85661 1.5 9.72202V15.5M17.25 14.9166H17.2617M1.5 11.0666L1.5 18.7666C1.5 20.0734 1.5 20.7268 1.75432 21.226C1.97802 21.665 2.33498 22.022 2.77402 22.2457C3.27315 22.5 3.92654 22.5 5.23333 22.5H18.7667C20.0735 22.5 20.7268 22.5 21.226 22.2457C21.665 22.022 22.022 21.665 22.2457 21.226C22.5 20.7268 22.5 20.0734 22.5 18.7666V11.0667C22.5 9.75986 22.5 9.10647 22.2457 8.60734C22.022 8.16829 21.665 7.81134 21.226 7.58764C20.7269 7.33332 20.0735 7.33332 18.7667 7.33332L5.23333 7.33332C3.92654 7.33332 3.27315 7.33332 2.77402 7.58763C2.33498 7.81134 1.97802 8.16829 1.75432 8.60734C1.5 9.10647 1.5 9.75986 1.5 11.0666ZM17.8333 14.9166C17.8333 15.2388 17.5722 15.5 17.25 15.5C16.9278 15.5 16.6667 15.2388 16.6667 14.9166C16.6667 14.5945 16.9278 14.3333 17.25 14.3333C17.5722 14.3333 17.8333 14.5945 17.8333 14.9166Z"
                                            stroke="#667085" stroke-width="2" stroke-linecap="round"
                                            stroke-linejoin="round" />
                                    </svg>

                                </p>
                                <p>
                                    Chuyển khoản
                                </p>
                            </div>
                        </template>
                        <div>
                            <BankInfo />
                        </div>
                    </el-tab-pane>
                </el-tabs>

            </div>
            <div class="text-center mt-5">
                <p class="mt-3 text-center text-16 text-color_primary">Đã thanh toán thành công, để Tang diệp có thể về
                    tài khoản
                    sớm nhất!</p>
                <button class="fw-bold mt-3 py-2 btn-alert btn-sendpayment" @click="sendRequest()">Gửi yêu cầu duyệt
                    ngay</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { sendMail } from '@/api/mail';
import { createRequest } from '@/api/mail';
import BankInfo from '@/components/payment/BankInfo.vue';
import RenderQRcode from '@/components/payment/RenderQRcode.vue';
import { ref, computed } from 'vue'
import vnNum2Words from "vn-num2words";
import { toast } from "vue3-toastify";
import { useAuthStore } from "@/stores/auth";
const auth = useAuthStore();
const payments = [
    { price: "10.000đ", value: 100 },
    { price: "20.000đ", value: 200, budget: true },
    { price: "50.000đ", value: 550 },
    { price: "100.000đ", value: 1100 },
];
const priceSelect = ref()
const valueSelect = ref()
function handleFocus() {
    selected.value = null; // hủy chọn box khi focus vào input
}
function renderValueMoney(value) {
    if (!value) return "Số tiền chưa hợp lệ";

    // Loại bỏ tất cả dấu chấm chỉ ở nghìn (không xóa dấu thập phân)
    const cleaned = String(value).replace(/\.(?=\d{3}\b)/g, '');

    const num = parseFloat(cleaned);
    if (!isNaN(num) && num > 9999) {
        const tangDiep = Math.floor(num / 100);
        return vnNum2Words(num) + " đồng = " + tangDiep + " Tang diệp";
    }

    return "Số tiền chưa hợp lệ";
}
function selectPayment(index) {
    inputValue.value = "";
    selected.value = index;
    priceSelect.value = Number(payments[index].price.replace(/\./g, "").replace("đ", ""));
    valueSelect.value = payments[index].value
}
async function sendRequest() {
    if (priceSelect.value && valueSelect.value) {
        const res = await createRequest(auth.userId, priceSelect.value, valueSelect.value)
        if (res.success) {
            toast.success("Đã gửi yêu cầu duyệt cho Admin. Tang Diệp sẽ được cộng vào tài khoản sau 1-5 phút")
        }
        else {
            toast.error("Chức năng nạp tiền đang bảo trì, vui lòng thử lại sau")
        }
    }
    else if (inputValue.value) {
        const res = await createRequest(auth.userId, inputValue.value, valueSelect.value)
        if (res.success) {
            toast.success("Đã gửi yêu cầu duyệt cho Admin. Tang Diệp sẽ được cộng vào tài khoản sau 1-5 phút")
        }
        else {
            toast.error("Chức năng nạp tiền đang bảo trì, vui lòng thử lại sau")
        }
    }
    else {
        toast.error("Vui lòng chọn hoặc nhập số tiền muốn nạp")
    }

}
async function handleSend() {
    try {
        await sendMail({
            to: "minhdeptrai1711@gmail.com",
            subject: "Thông báo từ hệ thống",
            text: "Email test",
        });
        alert("Gửi email thành công!");
    } catch (err) {
        console.error(err);
        alert("Gửi email thất bại!");
    }
}
const valueRenderQRcode = computed(() => {
    if (inputValue.value) return Number(inputValue.value);
    if (priceSelect.value) return Number(priceSelect.value);
    return 0;
});
const selected = ref(null);
const activeName = ref("first")
const inputValue = ref()
</script>

<style scoped>
.container-fuild {
    background-color: #F9FAFB;
}

.btn-sendpayment {
    padding: 30px;
    line-height: 1.5;
}

.payment-value-box {
    padding: 20px 100px;
    position: relative;
}

.popular-payment {
    top: 0;
    transform: translate(-50%, -50%);
    left: 50%;
    padding: 5px 15px;
    position: absolute;
    text-wrap: nowrap;
}

.payment-value-box {
    cursor: pointer;
    border: 2px solid transparent;
}

.payment-value-box.active {
    border-color: #28a745;
    box-shadow: 0 0 8px rgba(40, 167, 69, 0.5);
}
</style>
<style>
.tab-payment .payment-value-box {
    display: flex;
}

.tab-payment .el-tabs__nav {
    width: 100%;
    display: flex;
    background-color: #F7F6F2;
    border: none;
    padding: 10px;
}

.tab-payment .el-tabs__nav>div {
    flex: 1;
}

.tab-payment .el-tabs__nav>div.is-active {
    background-color: #fff;
    border-radius: 5px;
}

.tab-payment .el-tabs__header {
    border: none !important;
}

.tab-payment .el-tabs__nav-wrap::after {
    display: none !important;
    /* bỏ line dưới */
}

.tab-payment .el-tabs__item {
    border: none !important;
}

.el-tabs--card>.el-tabs__header .el-tabs__nav {
    border: none !important;
}

.tab-payment .el-tab-pane {
    display: flex;
    justify-content: center;
    width: 100%;
}

.tab-payment .full-weight>div {
    width: 100%;
}

@media (max-width: 768px) {
    .payment-value-box {
        padding: 20px 0 15px 0 !important;
        width: calc(50% - 10px);
        /* mỗi cột trừ nửa khoảng cách */
        margin: 5px;
        /* mỗi bên 5px = tổng 10px giữa 2 phần tử */
    }

    .popular-payment {
        left: 50%;
        padding: 5px 15px;
    }
}
</style>
