<template>
  <div class="row">
    <div class="carousel-wrapper col-md-6 col-12">
      <!-- Swiper -->
      <Swiper :modules="[EffectCoverflow, Pagination, Autoplay]" effect="coverflow" centered-slides :slides-per-view="3"
        :coverflow-effect="{
          rotate: 0,
          stretch: 0,
          depth: 150,
          modifier: 1.5,
          slideShadows: false
        }" :autoplay="{
          delay: 3000,       // thời gian giữa mỗi slide (ms)
          disableOnInteraction: false // vẫn auto chạy dù user bấm
        }" :pagination="{ clickable: true }" loop class="mySwiper" @slideChange="onSlideChange">
        <SwiperSlide v-for="(item, i) in items" :key="i">
          <img class="slide-centermode-img" :src="item" alt="" />
        </SwiperSlide>
      </Swiper>
    </div>

    <div class="slide-content col-md-6">
      <h3 @click="gotoStory(idStory[currentIndex])" class="text-start text-color_primary fw-bold">{{ title[currentIndex]
        }}</h3>
      <p class="text-start text-color__tertiary slide-content__desc text-sm">
        {{ descriptions[currentIndex] }}
      </p>
      <p class="text-start">
        <button @click="gotoStory(idStory[currentIndex])" class="btn-alert__rounded mt-3">Đọc truyện</button>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

// Import Swiper và modules
import { Swiper, SwiperSlide } from "swiper/vue";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules"; 
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

// Import ảnh
import slideImg1 from "@/assets/image/slide-img1.jpg";
import slideImg2 from "@/assets/image/slide-img2.jpg";
import slideImg3 from "@/assets/image/slide-img3.jpg";
import slideImg4 from "@/assets/image/slide-img4.jpg";
import slideImg5 from "@/assets/image/slide-img5.jpg";

const router = useRouter();

// ==================== DỮ LIỆU ====================
const items = [
  'https://res.cloudinary.com/djr4f7ceu/image/upload/v1757504771/stories_covers/ogwdojbwe0glf4n0rffp.jpg',
  'https://res.cloudinary.com/djr4f7ceu/image/upload/v1757505108/stories_covers/r3dxz4bwg1ybvajyqc3u.jpg',
  'https://res.cloudinary.com/djr4f7ceu/image/upload/v1757505108/stories_covers/r3dxz4bwg1ybvajyqc3u.jpg',
  'https://res.cloudinary.com/djr4f7ceu/image/upload/v1758071874/stories_covers/lpobtjqolnlrikegvywx.jpg',
  'https://res.cloudinary.com/djr4f7ceu/image/upload/v1759544568/stories_covers/k2sasaop7xzouifw60nx.jpg',
  'https://res.cloudinary.com/djr4f7ceu/image/upload/v1760266390/stories_covers/kcashihxqcgsbtiqenhi.jpg',
  slideImg2,
  slideImg3,
  slideImg4,
  slideImg5,
];

const idStory = [20, 21, 23, 24, 25, 26, 22];

const descriptions = [
  "Cạm bẫy người là một tác phẩm phóng sự của nhà văn Vũ Trọng Phụng",
  '"Cơm thầy cơm cô" là một thiên phóng sự mô tả thực trạng di dân từ nông thôn ra thành thị"',
  "Tác phẩm ra đời năm 1934, phản ánh chân thực cuộc sống xã hội Việt Nam thời Pháp thuộc",
  "Số đỏ là tiểu thuyết nổi tiếng của Vũ Trọng Phụng, đăng trên Hà Nội báo từ năm 1936",
  "Lều chõng là tiểu thuyết phóng sự của Ngô Tất Tố, ra mắt năm 1939 tại Hà Nội.",
  'Tác phẩm "Vỡ đê" của Vũ Trọng Phụng ra đời năm 1936',
  'Truyện "Giông Tố" phản ánh xã hội Việt Nam những năm 1930',
  "Mô tả cho ảnh 9",
  "Mô tả cho ảnh 10",
];

const title = [
  "Cạm Bẫy Người",
  "Cơm thầy cơm cô",
  "Kỹ Nghệ Lấy Tây",
  "Số đỏ",
  "Lều chõng",
  "Tiêu Sơn Tráng Sĩ",
  "Giông tố",
  "Mô tả cho ảnh 8",
  "Mô tả cho ảnh 9",
  "Mô tả cho ảnh 10",
];

// Chỉ mục slide hiện tại
const currentIndex = ref(0);

// ==================== HÀM XỬ LÝ ====================

// Khi Swiper đổi slide
function onSlideChange(swiper) {
  // realIndex bỏ qua các slide clone khi loop
  currentIndex.value = swiper.realIndex;
}

// Chuyển trang tới truyện
function gotoStory(id) {
  router.push({
    name: "story",
    params: { id },
  });
}
</script>

<style scoped>
.swiper-coverflow {
  padding: 20px 0;
}

.carousel-wrapper {
  flex: 1;
  min-width: 0;
  height: 150px;
}

.carousel-wrapper .swiper-pagination {
  position: absolute;
  bottom: 0;
  left: 50% !important;
  transform: translateX(-50%) !important;
  width: 100%;
}

.carousel-wrapper .swiper-pagination-bullet-active {
  background: none;
  height: 10px;
  width: 10px;
  border: solid 1px red;
}

.slide-centermode-img {
  width: 100% !important;
}

.slide-content {
  margin-top: 20px;
  text-align: center;
  line-height: 2;
}

.slide-content__desc {
  line-height: 1.5;
  display: -webkit-box !important;
  -webkit-line-clamp: 2 !important;
  -webkit-box-orient: vertical !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
}

.text-start:hover {
  cursor: pointer;
  color: #FF6114;
}
@media (max-width: 768px) {
  .slide-content{
    margin-top: 60px;
  }
  .slide-content > *
  {
    text-align: center !important;
  }
}
</style>
