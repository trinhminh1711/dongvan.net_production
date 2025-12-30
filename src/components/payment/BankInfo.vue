<template>
    <div class="container bank-info ">
        <el-form label-position="top">
            <div class="row">
                <div class="col-md-6 mb-3 px-0-mb">
                    <el-form-item label="Ngân hàng">
                        <el-input class="w-80 input-disable-bg" v-model="form.name" readonly>
                            <template #suffix>
                                <el-icon @click="copyToClipboard(form.name)" class="cursor-pointer" :size="25">
                                    <CopyDocument />
                                </el-icon>
                            </template>
                        </el-input>
                    </el-form-item>
                </div>
                <div class="col-md-6 mb-3 px-0-mb">
                    <el-form-item label="Số tài khoản">
                        <el-input class="w-80 input-disable-bg" v-model="form.email" readonly>
                            <template #suffix>
                                <el-icon @click="copyToClipboard(form.email)" class="cursor-pointer" :size="25">
                                    <CopyDocument />
                                </el-icon>
                            </template>
                        </el-input>
                    </el-form-item>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6 mb-3 px-0-mb">
                    <el-form-item label="Chủ tài khoản">
                        <el-input class="w-80 input-disable-bg" v-model="form.phone" readonly>
                            <template #suffix>
                                <el-icon @click="copyToClipboard(form.phone)" class="cursor-pointer" :size="25">
                                    <CopyDocument />
                                </el-icon>
                            </template>
                        </el-input>
                    </el-form-item>
                </div>
                <div class="col-md-6 mb-3 px-0-mb">
                    <el-form-item label="Nội dung chuyển khoản">
                        <el-input @click="copyToClipboard(form.address)" class="w-80 input-disable-bg" v-model="form.address"
                            readonly></el-input>
                    </el-form-item>
                </div>
            </div>
        </el-form>
    </div>
    <div class="bg-paymentnote">
        <p style="color: #1877F2; font-weight: bold;">Lưu ý quan trọng</p>
        <ul class="payment-note mt-3">
            <li>Vui lòng chuyển khoản đúng nội dung để được xử lý tự động</li>
            <li>Thay [ID_USER] bằng ID tài khoản của bạn (Xem ID ở trang cá nhân hoặc ấn vào avatar
                ở trên cùng bên
                phải)</li>
            <li>Tang Diệp sẽ được cộng vào tài khoản sau 1-5 phút</li>

        </ul>
    </div>

</template>

<script setup>
import { sendMail } from "@/api/mail";
import { useAuthStore } from "@/stores/auth";
import { reactive } from "vue";
const auth = useAuthStore();
import { ElMessage } from 'element-plus'
const form = reactive({
    name: "Vietcombank",
    email: "123456789",
    phone: "DOAN VAN DUC",
    address: `NAPTIEN [${auth.userId}]`
});
const copyToClipboard = async (text) => {
    try {
        await navigator.clipboard.writeText(text)
        ElMessage({
            message: 'Đã sao chép!' + text,
            type: 'success',
            duration: 1000, // hiển thị trong 1 giây
            grouping: true, // gộp nếu click nhiều lần
            offset: 40, // cách mép trên 40px (nhỏ gọn hơn)
            showClose: false, // ẩn nút close
        })
    } catch (err) {
        ElMessage.error('Không thể sao chép!')
    }
}
const handleSend = async () => {
    try {
        await sendMail({
            to: "mvhdongminhtanvan@gmail.com",
            subject: "Thông báo từ hệ thống",
            text: "Email test",
        });
        alert("Gửi email thành công!");
    } catch (err) {
        console.error(err);
        alert("Gửi email thất bại!");
    }
};
</script>
<style>
.input-disable-bg .el-input__wrapper
{
 background-color: #FAFAFA; /* màu nền */
 border: solid 1px #E4E7EC;
 border-radius: 8px;
}
.bank-info .el-input__inner {
    font-weight: 700;
    /* đậm chữ */
    font-size: 16px;
    /* có thể chỉnh thêm size */
    color: #344054;
    /* màu chữ */
}

.w-80 .el-input__inner {
    height: 60px;
    /* cố định chiều cao */
}
</style>
<style scoped>
::v-deep(.el-form-item__label) {

    font-size: 16px;
    color: #344054;
}
.bg-paymentnote
{
    background-color: #F2F7FF;
    padding: 20px;
    border-radius: 20px;
}
ul.payment-note
{
    padding: 0 30px !important;
}
.payment-note {
    color: #1877F2;
    line-height: 2;
}
@media (max-width: 768px) {
    .bank-info
    {
        padding: 0 !important;
    }
  ul.payment-note
    {
          padding: 0 12px !important; 
    }
}

</style>