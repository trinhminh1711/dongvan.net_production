<template>
    <div class="container mt-3">
        <div class="row gap-4 flex-md-nowrap">
            <div class="col-md-4">
                <div class="infor-contact">
                    <div class="p-4">
                        <h4 class="fw-bold color-alert"> Thông tin liên hệ</h4>
                        <div class="d-flex align-items-start mt-4">
                            <img style="width: 15px;" src="@/assets/icon/mail.png" alt=""></img>
                            <ul class="list-style">
                                <li class="fw-bold">Email</li>
                                <li>mvhdongminhtanvan@gmail.com </li>
                            </ul>
                        </div>
                        <div class="d-flex align-items-start mt-3">
                            <img style="width: 15px;" src="@/assets/icon/messbox.png" alt=""></img>
                            <ul class="list-style">
                                <li class="fw-bold">Thời gian phản hồi</li>
                                <li>Trong vòng 24h</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="infor-contact mt-5 ">
                    <div class="p-4">
                        <h4 class="fw-bold color-alert"> Câu hỏi thường gặp</h4>
                        <a @click="router.push({ name: 'instruct' })">
                            <p>Làm sao để Đề cử truyện hoặc Tặng quà cho tác giả?</p>
                            <p>- Cuối mỗi chương truyện, sẽ có nút “Đề cử” và “Tặng quà” cho tác giả của truyện bạn đang
                                đọc.</p>
                        </a>
                        <a @click="router.push({ name: 'instruct' })">
                            <p>Cách để có Tang Diệp trong tài khoản?</p>
                            <p>- Bạn có thể có Tang Diệp thông qua nạp tiền bằng momo, chuyển khoản ngân hàng.</p>
                        </a>
                        <a @click="router.push({ name: 'instruct' })">
                            <p>Phiếu Đề cử là gì?</p>
                            <p>- Phiếu đề cử là phiếu dùng để đề cử cho các truyện bạn đang đọc, hoặc các truyện bạn yêu
                                thích để cho truyện đó xuất hiện trong bảng xếp hạng trên Trang chủ của nền tảng (Truyện
                                có số lượng phiếu đề cử càng nhiều sẽ xếp hạng ở vị trí càng cao trong bảng xếp hạng).
                            </p>
                        </a>
                    </div>

                </div>
            </div>
            <div class="col-md-8 contact-form">
                <div class="pt-4 px-md-4 pb-4">
                    <SupportContacForm />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import SupportContacForm from '@/components/contact-form/SupportContacForm.vue';
const router = useRouter();

</script>

<style scoped>
a:hover p {
    color: #ff6114 !important;
    cursor: pointer;
}

.list-style {
    list-style: none;
    margin: 0;
    padding: 0 0 0 10px;
}

.list-style li {
    line-height: 1;
    margin: 0;
    padding-bottom: .5rem;
}

.infor-contact,
.contact-form {
    border-radius: 10px;
    box-shadow:
        0 3px 6px rgba(0, 0, 0, 0.12),
        /* 👇 cạnh dưới vừa phải */
        0 -2px 4px rgba(0, 0, 0, 0.02),
        /* 👆 trên siêu nhạt */
        2px 0 4px rgba(0, 0, 0, 0.02),
        /* 👉 phải siêu nhạt */
        -2px 0 4px rgba(0, 0, 0, 0.02);
    /* 👈 trái siêu nhạt */
}

.infor-contact a p:first-child {
    color: #344054;
    font-weight: 500;
    font-size: 14px;
}

.infor-contact a p:last-child {
    color: rgb(111, 109, 109);

    font-size: 14px;
}

.infor-contact a p {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    /* Giới hạn 2 dòng */
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>