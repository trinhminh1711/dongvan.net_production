<template>
    <div class="container">
        <h2 class="text-center fw-bold">
            Câu hỏi thường gặp
        </h2>
        <p class="text-center mt-2 mb-4">Tìm lời giải cho những thắc mắc của bạn ở đây</p>
        <div class="row align-items-center">
            <div style="margin: auto;" class="col-md-10 px-mb-0">
                <div class="demo-collapse">
                    <el-collapse v-model="activeNames" @change="handleChange">
                        <!-- 1 -->
                        <el-collapse-item name="1">
                            <template #title>
                                <span class="fw-semibold text-18">Tang Diệp là gì? Cách để có Tang Diệp trong tài
                                    khoản?</span>
                            </template>
                            <div class="text-16">
                                Tang Diệp là đơn vị tiền được sử dụng trong nền tảng Mạng văn học Đông Văn. Tang Diệp
                                dùng để mở khoá chương, mua
                                Phiếu đề cử, tặng quà, nâng cấp tài khoản.
                                - Bạn có thể có Tang Diệp thông qua nạp tiền bằng momo, chuyển khoản ngân hàng.
                            </div>
                            <template #icon>
                                <div v-if="activeNames.includes('1')">
                                    <img style="width: 24px;" src="@/assets/icon/icon-minus-svg.svg" alt="minus" />
                                </div>
                                <div v-else>
                                    <img style="width: 24px;" src="@/assets/icon/icon-plus-svg.svg" alt="plus" />
                                </div>
                            </template>
                        </el-collapse-item>

                        <!-- 2 -->
                        <el-collapse-item name="2">
                            <template #title>
                                <span class="fw-semibold text-18">Phiếu Đề cử là gì? Làm sao để có Phiếu đề cử?</span>
                            </template>
                            <div class="text-16">
                                - Phiếu đề cử là phiếu dùng để đề cử cho các truyện bạn đang đọc hoặc yêu thích, giúp
                                truyện đó xuất hiện trên
                                bảng xếp hạng.
                                - Có 2 cách để có Phiếu đề cử: miễn phí hoặc đổi từ Tang Diệp.
                            </div>
                            <template #icon>
                                <div v-if="activeNames.includes('2')">
                                    <img style="width: 24px;" src="@/assets/icon/icon-minus-svg.svg" alt="minus" />
                                </div>
                                <div v-else>
                                    <img style="width: 24px;" src="@/assets/icon/icon-plus-svg.svg" alt="plus" />
                                </div>
                            </template>
                        </el-collapse-item>

                        <!-- 3 -->
                        <el-collapse-item name="3">
                            <template #title>
                                <span class="fw-semibold text-18">Liên hệ hỗ trợ</span>
                            </template>
                            <div class="text-16">
                                - Khi gặp vấn đề đọc hoặc đăng truyện, bạn có thể chọn mục “Liên hệ hỗ trợ” để được giúp
                                đỡ.
                            </div>
                            <template #icon>
                                <div v-if="activeNames.includes('3')">
                                    <img style="width: 24px;" src="@/assets/icon/icon-minus-svg.svg" alt="minus" />
                                </div>
                                <div v-else>
                                    <img style="width: 24px;" src="@/assets/icon/icon-plus-svg.svg" alt="plus" />
                                </div>
                            </template>
                        </el-collapse-item>

                        <!-- 4 -->
                        <el-collapse-item name="4">
                            <template #title>
                                <span class="fw-semibold text-18">Làm sao để Đề cử truyện hoặc Tặng quà cho tác
                                    giả?</span>
                            </template>
                            <div class="text-16">
                                - Cuối mỗi chương truyện sẽ có nút “Đề cử” và “Tặng quà”.
                            </div>
                            <template #icon>
                                <div v-if="activeNames.includes('4')">
                                    <img style="width: 24px;" src="@/assets/icon/icon-minus-svg.svg" alt="minus" />
                                </div>
                                <div v-else>
                                    <img style="width: 24px;" src="@/assets/icon/icon-plus-svg.svg" alt="plus" />
                                </div>
                            </template>
                        </el-collapse-item>

                        <!-- 5 -->
                        <el-collapse-item name="5">
                            <template #title>
                                <span class="fw-semibold text-18">Đăng truyện trên “Đông Văn” có thể kiếm được tiền
                                    không?</span>
                            </template>
                            <div class="text-16">
                                - Có, thông qua mở chương thu phí, quà tặng, và giải thưởng.
                            </div>
                            <template #icon>
                                <div v-if="activeNames.includes('5')">
                                    <img style="width: 24px;" src="@/assets/icon/icon-minus-svg.svg" alt="minus" />
                                </div>
                                <div v-else>
                                    <img style="width: 24px;" src="@/assets/icon/icon-plus-svg.svg" alt="plus" />
                                </div>
                            </template>
                        </el-collapse-item>

                        <!-- 6 -->
                        <el-collapse-item name="6">
                            <template #title>
                                <span class="fw-semibold text-18">Khi nào thì truyện đạt điều kiện mở VIP?</span>
                            </template>
                            <div class="text-16">
                                - Cần đạt tiêu chuẩn nội dung, có ít nhất 10 chương, và 1000 lượt đọc.
                            </div>
                            <template #icon>
                                <div v-if="activeNames.includes('6')">
                                    <img style="width: 24px;" src="@/assets/icon/icon-minus-svg.svg" alt="minus" />
                                </div>
                                <div v-else>
                                    <img style="width: 24px;" src="@/assets/icon/icon-plus-svg.svg" alt="plus" />
                                </div>
                            </template>
                        </el-collapse-item>

                        <!-- 7 -->
                        <el-collapse-item name="7">
                            <template #title>
                                <span class="fw-semibold text-18">Các loại hợp đồng khi truyện vào VIP?</span>
                            </template>
                            <div class="text-16">
                                - Có 2 loại: độc quyền và không độc quyền, với tỷ lệ chia khác nhau.
                            </div>
                            <template #icon>
                                <div v-if="activeNames.includes('7')">
                                    <img style="width: 24px;" src="@/assets/icon/icon-minus-svg.svg" alt="minus" />
                                </div>
                                <div v-else>
                                    <img style="width: 24px;" src="@/assets/icon/icon-plus-svg.svg" alt="plus" />
                                </div>
                            </template>
                        </el-collapse-item>
                    </el-collapse>
                </div>

            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import type { CollapseModelValue } from 'element-plus'

const activeNames = ref(['1'])
const handleChange = (val: CollapseModelValue) => {
    console.log(val)
}
</script>
<style>
.collapse .el-collapse-item__content p {
    line-height: 2;
}
.el-collapse-item__content
{
    padding-bottom: 0;
}

.el-collapse-item__wrap {
    overflow: hidden;
    /* đảm bảo nội dung bung ra không đè lên item khác */
    transition: height 0.3s ease;
    /* mượt khi mở/đóng */
}
.el-collapse-item__header > div
{
    display: flex;
    align-items: center;
    
}
.demo-collapse {
    position: relative;
    width: 100%;
}

.el-collapse-item__header {
    height: auto !important;
    border: none !important;
}
.el-collapse-item
{
    padding: 20px 0;
}
.el-collapse-item__wrap
{
    border:none
}
.el-collapse-item
{
    border-bottom: solid 1px   #E4E7EC;
}
@media (max-width: 768px) {
    .demo-collapse .el-collapse-item__title {
        line-height: 2rem;
        padding: 0px 10px;
    }

    .demo-collapse .el-collapse-item__content {
        text-align: justify;
        padding: 0px 10px 10px 10px;
        color: #667085;
    }

    .el-collapse-icon-position-right .el-collapse-item__header {
        padding: 0;
    }
}
</style>