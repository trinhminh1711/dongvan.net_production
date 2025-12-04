<template>
    <div class="container">
        <h2 class="text-center fw-bold">
            Câu hỏi thường gặp
        </h2>
        <p class="text-center mt-2 mb-4">Tìm lời giải cho những thắc mắc của bạn ở đây</p>
        <div class="row align-items-center">
            <div style="margin: auto;" class="col-md-10">
                <div class="demo-collapse">
                    <el-collapse v-model="activeNames" @change="handleChange">
                        <el-collapse-item name="1">
                            <template #title>
                                <span class="fw-semibold text-18">Tang Diệp là gì? Cách để có Tang Diệp trong tài
                                    khoản?</span>
                            </template>
                            <div>
                                <p class="text-16">
                                    Tang Diệp là đơn vị tiền được sử dụng trong nền tảng Mạng văn học Đông Văn. Tang
                                    Diệp
                                    dùng để mở
                                    khoá chương, mua
                                    Phiếu đề cử, tặng quà, nâng cấp tài khoản.
                                    - Bạn có thể có Tang Diệp thông qua nạp tiền bằng momo, chuyển khoản ngân hàng.
                                </p>

                            </div>
                            <template #icon>
                                <el-icon style="font-size:20px;" v-if="activeNames.includes('1')">
                                    <el-icon style="font-size:12px;" class="icon-circle minus">
                                        <Minus />
                                    </el-icon>
                                </el-icon>
                                <el-icon class="icon-circle minus" style="font-size:20px;" v-else>
                                    <el-icon style="font-size:12px;">
                                        <Plus />
                                    </el-icon>
                                </el-icon>
                            </template>
                        </el-collapse-item>
                        <el-collapse-item title="Feedback" name="2">
                            <template #title>
                                <span class="fw-semibold text-18">Phiếu Đề cử là gì? Làm sao để có Phiếu đề cử?</span>
                            </template>
                            <div class="text-16">
                                - Phiếu đề cử là phiếu dùng để đề cử cho các truyện bạn đang đọc, hoặc các truyện bạn
                                yêu thích
                                để cho truyện đó
                                xuất hiện trong bảng xếp hạng trên Trang chủ của nền tảng (Truyện có số lượng phiếu đề
                                cử càng
                                nhiều sẽ xếp hạng
                                ở vị trí càng cao trong bảng xếp hạng). <br>
                                - Có 2 cách để bạn có Phiếu đề cử: <br>
                                + Phiếu đề cử miễn phí: Khi bạn đọc truyện hoặc tham gia viết review tác phẩm trên Diễn
                                đàn của
                                nền tảng, bạn sẽ
                                nhận được Phiếu đề cử miễn phí<br>
                                + Mua phiếu đề cử: Bạn có thể dùng Tang Diệp để đổi thành Phiếu đề cử. Tỉ lệ quy đổi
                                hiện nay là
                                5 Tang Diệp đổi
                                một Phiếu đề cử.<br>
                            </div>
                         <template #icon>
                                <el-icon style="font-size:20px;" v-if="activeNames.includes('2')">
                                    <el-icon style="font-size:12px;" class="icon-circle minus">
                                        <Minus />
                                    </el-icon>
                                </el-icon>
                                <el-icon class="icon-circle minus" style="font-size:20px;" v-else>
                                    <el-icon style="font-size:12px;">
                                        <Plus />
                                    </el-icon>
                                </el-icon>
                            </template>
                        </el-collapse-item>
                        <el-collapse-item title="Efficiency" name="3">
                            <template #title>
                                <span class="fw-semibold text-18">Liên hệ hỗ trợ</span>
                            </template>
                            <div class="text-16">
                                - Đối với các vấn đề gặp phải khi đọc hoặc đăng tải truyện bạn sáng tác trên nền tảng
                                như thắc
                                mắc về việc nạp,
                                đổi Tang Diệp, xét duyệt truyện thu phí dành cho tác giả, báo lỗi, góp ý, yêu cầu quảng
                                cáo. Bạn
                                có thể ấn vào
                                mục “Liên hệ hỗ trợ” để được hỗ trợ. <br>
                                - Bạn có thể truy cập vào mục Liên hệ hỗ trợ bằng các cách sau:<br>
                                + Click vào mục “Hỗ trợ” trong thanh Menu trên trang chủ.<br>
                                + Click vào mục “Hỗ trợ” trên Menu hiện ra khi ấn vào avatar.<br>
                                + Click vào biểu tượng “Hỗ trợ” trong mục “Truyện đã đăng” của mục “Đăng chương” để liên
                                hệ BTV
                                hỗ trợ với tác
                                phẩm.
                            </div>
                             <template #icon>
                                <el-icon style="font-size:20px;" v-if="activeNames.includes('3')">
                                    <el-icon style="font-size:12px;" class="icon-circle minus">
                                        <Minus />
                                    </el-icon>
                                </el-icon>
                                <el-icon class="icon-circle minus" style="font-size:20px;" v-else>
                                    <el-icon style="font-size:12px;">
                                        <Plus />
                                    </el-icon>
                                </el-icon>
                            </template>
                        </el-collapse-item>
                        <el-collapse-item title="Controllability" name="4">
                            <template #title>
                                <span class="fw-semibold text-18">Làm sao để Đề cử truyện hoặc Tặng quà cho tác
                                    giả?</span>
                            </template>
                            <div class="text-16">
                                - Cuối mỗi chương truyện, sẽ có nút “Đề cử” và “Tặng quà” cho tác giả của truyện bạn
                                đang đọc.
                            </div>
                            <template #icon>
                                <el-icon style="font-size:20px;" v-if="activeNames.includes('4')">
                                    <el-icon style="font-size:12px;" class="icon-circle minus">
                                        <Minus />
                                    </el-icon>
                                </el-icon>
                                <el-icon class="icon-circle minus" style="font-size:20px;" v-else>
                                    <el-icon style="font-size:12px;">
                                        <Plus />
                                    </el-icon>
                                </el-icon>
                            </template>
                        </el-collapse-item>
                        <el-collapse-item name="5">
                            <template #title>
                                <span class="fw-semibold text-18">Đăng truyện trên “Đông Văn” có thể kiếm được tiền
                                    không?</span>
                            </template>
                            <div class="text-16">
                                - Câu trả lời là có. Nền tảng “Đông Văn” được thành lập với một trong những mục tiêu
                                chính là
                                giúp cho các tác
                                giả trẻ Việt có thể kiếm được thu nhập từ chính tác phẩm của mình.:<br>
                                - Các tác giả có thể kiếm được thu nhập trên nền tảng bằng các hình thức sau::<br>
                                + Khi truyện của bạn đạt đủ điều kiện để mở VIP (tức mở thu phí):<br>
                                , bạn sẽ nhận được tỉ lệ % tiền từ mỗi lần mở khóa chương tính phí.:<br>
                                + Tiền từ quà tặng của các độc giả gửi đến tác giả.:<br>
                                + Tiền thưởng khi bạn đạt được các danh hiệu, hoặc tham gia các cuộc thi của nền tảng.
                            </div>
                         <template #icon>
                                <el-icon style="font-size:20px;" v-if="activeNames.includes('5')">
                                    <el-icon style="font-size:12px;" class="icon-circle minus">
                                        <Minus />
                                    </el-icon>
                                </el-icon>
                                <el-icon class="icon-circle minus" style="font-size:20px;" v-else>
                                    <el-icon style="font-size:12px;">
                                        <Plus />
                                    </el-icon>
                                </el-icon>
                            </template>
                        </el-collapse-item>
                        <el-collapse-item name="6">
                            <template #title>
                                <span class="fw-semibold text-18">Khi nào thì truyện của bạn đạt điều kiện xét duyệt thu
                                    phí (mở
                                    VIP)?</span>
                            </template>
                            <div class="text-16">
                                - Để đạt đủ điều kiện mở thu phí, bạn cần đáp ứng các điều kiện:<br>
                                +Truyện của bạn đáp ứng các tiêu chuẩn sáng tác của nền tảng “Đông Văn”.<br>
                                + Đăng tối thiểu 10 chương (dung lượng mỗi chương từ 1500 từ trở lên”<br>
                                + Lượt đọc của truyện từ 1000 lượt trở lên.<br>
                            </div>
                           <template #icon>
                                <el-icon style="font-size:20px;" v-if="activeNames.includes('6')">
                                    <el-icon style="font-size:12px;" class="icon-circle minus">
                                        <Minus />
                                    </el-icon>
                                </el-icon>
                                <el-icon class="icon-circle minus" style="font-size:20px;" v-else>
                                    <el-icon style="font-size:12px;">
                                        <Plus />
                                    </el-icon>
                                </el-icon>
                            </template>
                        </el-collapse-item>
                        <el-collapse-item name="7">
                            <template #title>
                                <span class="fw-semibold text-18">Các loại hợp đồng khi truyện của bạn vào VIP (đủ điều
                                    kiện mở
                                    thu
                                    phí)?</span>
                            </template>
                            <div class="text-16">
                                - Khi truyện của bạn đủ điều kiện mở thu phí (vào VIP), bạn có thể lựa chọn kí 1 trong 2
                                loại
                                hợp động: Hợp đồng
                                không độc quyền, và hợp đồng độc quyền. <br>
                                + Hợp đồng không độc quyền: Có nghĩa là ngoài đăng truyện trên “Đông Văn”, bạn có thể
                                đăng
                                truyện của mình ở
                                nhiều nền tảng khác. Khi bạn chọn kí “hợp đồng không độc quyền”, bạn sẽ nhận được tiền
                                mở chương
                                thu phí với tỉ
                                lệ từ 20 - 30%( tùy vào chính sách của nền tảng vào thời điểm kí hợp đồng) trên mỗi lượt
                                độc giả
                                trả phí.<br>
                                + Hợp đồng độc quyền: Khi bạn kí hợp đồng độc quyền với nền tảng “Đông Văn”, bạn không
                                được đăng
                                bộ truyện đó ở
                                các nền tảng, fanpafe nào khác ngoài của “Đông Văn”. Khi bạn chọn kí “hợp đồng độc
                                quyền”, bạn
                                sẽ nhận được tiền
                                mở chương thu phí với tỉ lệ từ 50 - 80%( tùy vào chính sách của nền tảng và vào cấp độ
                                tác giả
                                của bạn vào thời
                                điểm kí hợp đồng) trên mỗi lượt độc giả trả phí.
                            </div>
                                <template #icon>
                                <el-icon style="font-size:20px;" v-if="activeNames.includes('7')">
                                    <el-icon style="font-size:12px;" class="icon-circle minus">
                                        <Minus />
                                    </el-icon>
                                </el-icon>
                                <el-icon class="icon-circle minus" style="font-size:20px;" v-else>
                                    <el-icon style="font-size:12px;">
                                        <Plus />
                                    </el-icon>
                                </el-icon>
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
.icon-circle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 21px;
  height: 21px;
  border-radius: 50%;
  border: 2px solid #AEAEAE; /* hoặc #ffd04b */
  color: #AEAEAE;
}
.el-collapse-item__wrap {
  overflow: hidden;  /* đảm bảo nội dung bung ra không đè lên item khác */
  transition: height 0.3s ease; /* mượt khi mở/đóng */
}
.demo-collapse {
  position: relative;
  width: 100%;
}
.el-collapse-item__header {
    height: auto !important;
}
</style>