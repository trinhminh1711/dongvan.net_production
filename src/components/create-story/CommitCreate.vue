<template>
    <div class="container">
        <h2>Cam kết</h2>
        <div style="line-height: 2;">
            <p>
                Tôi. [Tên tác giả/Bút danh], chủ tài khoản [Tên tài khoản tác giả] tại Đông Văn, xin cam kết tuân thủ
                các quy định và chính sách nội dung của nền tảng như sau:
            </p>
            <p class="fw-semibold">
                1. Mọi tác phẩm đăng tải là nguyên bản, do chính tôi sáng tác và thuộc quyền sở hữu hợp pháp của
                tôi.<br></br>
                2.Tôi cam kết không sao chép, sử dụng trái phép, hay vi phạm bản quyền nội dung của cá nhân/tổ chức
                khác.<br></br>
                3. Tôi cam kết không đăng tải nội dung chống phá nhà nước, xuyên tạc lịch sử.<br></br>
                4. Tôi cam kết không kỳ thị, miệt thị, bôi nhọ, xúc phạm, chia rẽ liên quan đến sắc tộc, giới Tôi cam
                kết
                không đăng tải nội dung khiêu dâm, đồi trụy, mô tả chi tiết hành vi tình dục phản cảm.<br></br>
                5. Tôi cam kết không cổ súy, hướng dẫn các hành vi vi phạm pháp luật, tệ nạn xã hội (ma túy, cờ bạc, mại
                dâm, bạo lực...), không xuyên tạc giá trị văn hóa, lịch sử, hoặc xúc phạm danh nhân. <br></br>6. Mọi nội
                dung đăng
                tải phải tuân thủ pháp luật Việt Nam về quản lý thông tin
                trên mạng.
                Bằng việc nhấn nút "Đồng ý", tôi xác nhận đã đọc, hiểu và đồng ý hoàn toàn với các điều khoản nêu trên.
                Tôi
                chịu trách nhiệm hoàn toàn về nội dung mà tôi đăng tải trên nền tảng Đông Văn.</p>
        </div>
        <div class="d-flex gap-4 justify-content-end">
            <button class="btn-outline-primary my-4 align-middle" @click="goBack">
                <img src="@/assets/icon/back-icon.svg" alt=""><span class="fw-semibold ms-1 text-16">Quay lại</span>
            </button>
            <button @click="submitForm()" style="display: block;" class="btn-alert my-4 fw-semibold">
                Xác nhận
            </button>
        </div>
    </div>

</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
const router = useRouter();
function goBack() {
    router.back()
}
</script>

<style></style>