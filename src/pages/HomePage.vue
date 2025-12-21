<template>
  <Banner />
  <div class="container py-10 text-center d-flex flex-column">
    <div class="row align-items-stretch justify-content-between order-1 order-md-1">
      <div class="col-md-3 col-12 d-flex flex-column justify-content-between hide-mobile">
        <ListStory />
      </div>
      <div class="col-md-6 col-12 el-menu-story px-md-3 p-0 d-flex flex-column justify-content-between">
        <h3 class="text-color_primary fw-bold text-start border-b pb-2 title-mb">Biên tập viên đề cử</h3>
        <div class="text-center border-bottom pb-md-5 pb-4">
          <SliderCenter />
        </div>
        <div class="container text-center pt-2">
          <div class="row align-items-center gap-10">
            <div v-for="(item, index) in dataPropose" :key="index" class="col-md-4 col-6 px-md-0 px-2 mb-2">
              <p @click="goToStory(item.story_id)"
                class="text-start text-md fw-bold mt-md-1 text-capitalize text-nowrap hover-link">{{ item.title }}</p>
              <p class="text-start color-alert text-md mt-md-1">
                <span class="fw-bold">{{ item.numberChapter }} </span> Chương
              </p>
              <p style="text-align:justify" class="text-color__tertiary text-sm mt-1 two-line-ellipsis">{{ item.desc
                }}
              </p>
            </div>
          </div>
        </div>
        <div class="container text-center mt-3">
          <div class="row align-items-center gap-3 flex-md-nowrap">
            <div @click="goToStory(28)" class="col-md-6 px-2 d-flex story-card__horizontal color-layout hover-link">
              <div>
                <h4 class="color-yellow fw-semibold">Tiêu Sơn Tráng Sĩ</h4>
                <p class="text-color_primary text-sm">[cao định hai mươi ngàn, tinh phẩm bảo đảm ] Tỉnh dậy, Lục </p>
              </div>
              <div class="story-card__img">
                <img src="@/assets/image/tieusontrangsi.png" alt="">
              </div>
            </div>
            <div class="col-md-6 px-2 d-flex story-card__horizontal color-layout">
              <div>
                <h4 @click="goToStory(29)" class="color-blue fw-semibold hover-link">Việt Nam Sử Lược</h4>
                <p class="text-color_primary text-sm">Cảnh Huyên xuyên qua đến một cái chư quốc loạn chiến, rung </p>
              </div>
              <div class="story-card__img">
                <img src="@/assets/image/vietnamsuluoc.png" alt="">
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3 col-12 d-flex flex-column justify-content-between hide-mobile">
        <ReviewStory />
      </div>
    </div>
    <div id="ranking" class="row align-items-start mt-5 justify-content-between g-0 hide-mobile order-md-2"
      style="row-gap: 20px; column-gap: 20px;">
      <div style="border-radius: 10px; background: linear-gradient(to bottom, #F3FAFF, #FCFEFF); margin: 0;"
        class="row py-4 col-md-3 col-12 px-0 d-flex align-items-center ranking-box">
        <RankingList :items="topUserReadersRecoment">
          <template #header>
            <img class="vote-icon__yellow" src="@/assets/icon/icon-top-2.svg" alt="">
            <h3 class="topvote-title color-light-blue">Người đọc đề cử</h3>
            <img class="vote-icon__yellow" src="@/assets/icon/icon-top-1.svg" alt="">
          </template>
        </RankingList>

      </div>
      <div style="border-radius: 10px; background: linear-gradient(to bottom, #FFF6F2, #FFFBF9); margin: 0;"
        class="row col-md-3 px-0 py-4 d-flex align-items-center ranking-box">
        <RankingList :items="topStoryRead">
          <template #header>
            <img class="vote-icon__yellow" src="@/assets/icon/icon-top-3.svg" alt="">
            <h3 style="color: #EA8759;" class="topvote-title color-light-blue">Đọc nhiều trong tuần</h3>
            <img class="vote-icon__yellow" src="@/assets/icon/icon-top-4.svg" alt="">
          </template>
        </RankingList>

      </div>
      <div style="border-radius: 10px; background: linear-gradient(to bottom, #FFF7EC, #FFFDF9); margin: 0;"
        class="row col-md-3 px-0 py-4 d-flex align-items-center ranking-box">
        <RankingList :items="topStoryMonthRead">
          <template #header>
            <img class="vote-icon__yellow" src="@/assets/icon/top-icon-8.svg" alt="">
            <h3 style="color:#EAAE00 ;" class="topvote-title color-light-blue">Đọc nhiều trong tháng </h3>
            <img style="  transform: scaleX(-1);" class="vote-icon__yellow" src="@/assets/icon/top-icon-8.svg" alt="">
          </template>
        </RankingList>

      </div>
      <div style="border-radius: 10px; background: linear-gradient(to bottom, #FCFAFF, #FDFBFF); margin: 0;"
        class="row py-4 col-md-3 px-0 d-flex align-items-center ranking-box">
        <RankingListUser :items="topAuthorWeek">
          <template #header>
            <img class="vote-icon__yellow" src="@/assets/icon/icon-top-8.svg" alt="">
            <h3 class="topvote-title color-light-blue">Top tác giả của tuần</h3>
            <img class="vote-icon__yellow" src="@/assets/icon/icon-top-7.svg" alt="">
          </template>
        </RankingListUser>

      </div>
    </div>
    <div id="ranking" class="mt-5 hide-desktop order-2">
      <Swiper :space-between="16" :breakpoints="{
        0: { slidesPerView: 'auto' },
        768: { slidesPerView: 4 }
      }" class="ranking-swiper">
        <!-- Box 1 -->
        <SwiperSlide class="ranking-box-slide">
          <div class="ranking-box row py-4 col-12 px-0 d-flex align-items-center"
            style="border-radius: 10px; background: linear-gradient(to bottom, #F3FAFF, #FCFEFF);">
            <RankingList :items="topUserReadersRecoment">
              <template #header>
                <img class="vote-icon__yellow" src="@/assets/icon/icon-top-2.svg" alt="">
                <h3 class="topvote-title color-light-blue">Người đọc đề cử</h3>
                <img class="vote-icon__yellow" src="@/assets/icon/icon-top-1.svg" alt="">
              </template>
            </RankingList>
          </div>
        </SwiperSlide>

        <!-- Box 2 -->
        <SwiperSlide class="ranking-box-slide">
          <div class="ranking-box row py-4 col-12 px-0 d-flex align-items-center"
            style="border-radius: 10px; background: linear-gradient(to bottom, #FFF6F2, #FFFBF9);">
            <RankingList :items="topStoryRead">
              <template #header>
                <img class="vote-icon__yellow" src="@/assets/icon/icon-top-3.svg" alt="">
                <h3 style="color:#EA8759" class="topvote-title">Đọc nhiều trong tuần</h3>
                <img class="vote-icon__yellow" src="@/assets/icon/icon-top-4.svg" alt="">
              </template>
            </RankingList>
          </div>
        </SwiperSlide>

        <!-- Box 3 -->
        <SwiperSlide class="ranking-box-slide">
          <div class="ranking-box row py-4 col-12 px-0 d-flex align-items-center"
            style="border-radius: 10px; background: linear-gradient(to bottom, #FFF7EC, #FFFDF9);">
            <RankingList :items="topStoryMonthRead">
              <template #header>
                <img class="vote-icon__yellow" src="@/assets/icon/top-icon-8.svg" alt="">
                <h3 style="color:#EAAE00" class="topvote-title">Đọc nhiều trong tháng</h3>
                <img style="transform: scaleX(-1)" class="vote-icon__yellow" src="@/assets/icon/top-icon-8.svg" alt="">
              </template>
            </RankingList>
          </div>
        </SwiperSlide>

        <!-- Box 4 -->
        <SwiperSlide class="ranking-box-slide">
          <div class="ranking-box row py-4 col-12 px-0 d-flex align-items-center"
            style="border-radius: 10px; background: linear-gradient(to bottom, #FCFAFF, #FDFBFF);">
            <RankingListUser :items="topAuthorWeek">
              <template #header>
                <img class="vote-icon__yellow" src="@/assets/icon/icon-top-8.svg" alt="">
                <h3 class="topvote-title color-light-blue">Top tác giả của tuần</h3>
                <img class="vote-icon__yellow" src="@/assets/icon/icon-top-7.svg" alt="">
              </template>
            </RankingListUser>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
    <div class="row align-items-start mt-5 justify-content-between order-5 order-md-3">
      <div class="col-md-3 px-md-3">
        <TopListUser v-if="topUserReadersStory && topUserReadersStory.length > 0" :items="topUserReadersStory">
          <template #author-top3>
            <div class="d-flex justify-content-between author-card__img">
              <div class="d-flex flex-column">
                <span class="bg-red text-white fw-bold p-1 text-sm align-self-start">NO.1</span>
                <p @click="goToProfile(topUserReadersStory[0].user_id)" class="my-1 hover-link">{{
                  topUserReadersStory[0].username }}</p>
                <p class="text-start color-alert text-md">
                  <span class="color-red fw-bold">{{ topUserReadersStory[0].total_reads }}</span> <span
                    class="fst-italic color-red ">Chương</span>
                </p>
              </div>
              <div>
                <img style="width: 50px; height: 100%;" :src="topUserReadersStory[0].link_thumbnail" alt="">
              </div>
            </div>
          </template>
        </TopListUser>
      </div>
      <div class="col-md-6 px-md-3 hide-mobile">
        <TopListUpdate :items="topStoryUpdatedNew" :content="'Truyện mới cập nhật'" />
      </div>
      <div class="col-md-3 px-md-3 pt-mobile-2">
        <TopListUserSpending v-if="topSpendingUsers" :items="topSpendingUsers" :content="'Top đại gia'">
          <template #author-top3>
            <div class="d-flex justify-content-between author-card__img">
              <div class="d-flex flex-column">
                <span class="bg-red text-white fw-bold p-1 text-sm align-self-start">NO.1</span>
                <p @click="goToProfile(topSpendingUsers[0].user_id)" class="my-1 hover-link text-start">{{
                  topSpendingUsers[0].username }}</p>
                <p class="text-start color-alert text-md">
                  <span class="color-red fw-bold">{{ topSpendingUsers[0].total_spent % 1 === 0 ? parseInt(
                    topSpendingUsers[0].total_spent) : topSpendingUsers[0].total_spent }}</span> <span
                    class="fst-italic color-red ">Tang Diệp</span>
                </p>
              </div>
              <div>
                <img style="width: 50px; height: 100%;" :src="topSpendingUsers[0].link_thumbnail" alt="">
              </div>
            </div>
          </template>
        </TopListUserSpending>
      </div>
    </div>
    <div class="row align-items-start order-3 swiper-hidden-mb">
      <TopAuthorWeek />
    </div>
    <div class="row align-items-stretch justify-content-between order-4 pt-mobile-2  hide-desktop">
      <div class="col-md-3 col-12 d-flex flex-column justify-content-between">
        <ListStory />
      </div>
      <div class="col-md-3 col-12 d-flex flex-column justify-content-between pt-mobile-2">
        <ReviewStory />
      </div>
    </div>
  </div>
  <div class="container-fluid hide-mobile">
    <img style="max-width: 100%;display: block;margin: 0 auto;" src="@/assets/image/img-bottom.jpg" alt="">
  </div>
  <div class="container-fluid bg-successfull-story hide-mobile">
    <StoryCompleted />
  </div>
  <div class="container-fluid bg-successfull-story hide-desktop">
    <LibrarySuccess />
  </div>
</template>

<script lang="ts" setup>

import { ref, onMounted } from 'vue'
import Banner from '@/components/view/Banner.vue'
import type { TabsPaneContext } from 'element-plus'
import LibrarySuccess from '@/components/mobile-layout/LibrarySuccess.vue'
import ListStory from '@/components/homepage/ListStory.vue'
import SliderCenter from '@/components/homepage/SliderCenter.vue'
import RankingList from '@/components/homepage/RankingList.vue'
import TopListUser from '@/components/homepage/TopListUser.vue'
import RankingListUser from '@/components/homepage/RankingListUser.vue'
import TopListUpdate from '@/components/homepage/TopListUpdate.vue'
import ReviewStory from '@/components/homepage/ReviewStory.vue'
import TopAuthorWeek from '@/components/homepage/TopAuthorWeek.vue'
import TopListUserSpending from '@/components/homepage/TopListUserSpending.vue'
import StoryCompleted from '@/components/homepage/StoryCompleted.vue'
import { getTopUserRead } from '../api/chapter'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import { getTopStoryReaded, getTopStoryReadedMonth, getTopAuthorWeek, getTopUserReaders, getListStoryUpdatedNew, getTopStoryRecomment, getTopUserSpending } from '../api/stories'
const activeName = ref('first')
import { useRouter } from 'vue-router'
const topUserRead = ref()
const topStoryRead = ref()
const topAuthorWeek = ref()
const topUserReadersStory = ref()
const topSpendingUsers = ref()
const topUserReadersRecoment = ref()
const topStoryMonthRead = ref()
const storyNewUpdated = ref()
const topStoryUpdatedNew = ref()
const items = ref([
  { title: "mock", text: "mock text" }
]);
const router = useRouter()
function goToStory(post_id) {
  router.push({
    name: 'story',   // Tên route bạn đã định nghĩa trong router/index.js
    params: { id: post_id }       // Truyền param id
  })
}
function goToProfile(params) {
  router.push({ name: 'user', params: { id: params } })
}
const handleClick = (tab: TabsPaneContext, event: Event) => {

};
async function getTopStoryMonth() {
  topStoryMonthRead.value = await getTopStoryReadedMonth(10)
}
async function getTopStory() {
  topStoryRead.value = await getTopStoryReaded(10);
}
async function getTopAuthor() {
  topAuthorWeek.value = await getTopAuthorWeek(10);;


}
async function getTopUserReader() {
  topUserReadersStory.value = await getTopUserReaders(10);
}
async function getTopStoryUpdate() {
  topStoryUpdatedNew.value = await getListStoryUpdatedNew(24);
}
async function getTopRecomment() {
  topUserReadersRecoment.value = await getTopStoryRecomment();
  console.log(topUserReadersRecoment.value);

}
async function getTopSpendingUsers() {
  topSpendingUsers.value = await getTopUserSpending();

}
onMounted(async () => {
  await getTopStory()
  await getTopStoryMonth()
  await getTopAuthor()
  await getTopUserReader()
  await getTopStoryUpdate()
  await getTopRecomment()
  await getTopSpendingUsers()
})
const reviewTitle = "Review Tác phẩm";
const dataReview = [
  { title: "Số Đỏ", text: "Nhật Ánh" },
  { title: "Lan Nhược Tiên Du", text: "Huy Thiệp" },
  { title: "Trận Vấn Trường", text: "Anh Thái" }
];
const dataPropose = [
  { title: "Số đỏ", story_id: 24, numberChapter: "20", desc: "“Số đỏ” là một trong những tiểu thuyết nổi tiếng của Vũ Trọng Phụng" },
  { title: "Sống mòn", story_id: 56, numberChapter: "20", desc: "Tác phẩm Sống mòn là một trong những tiểu thuyết đặc sắc nhất của Nam Cao" },
  { title: "Tắt đèn", story_id: 58, numberChapter: "27", desc: "Tắt đèn là tiểu thuyết hiện thực xuất sắc của Ngô Tất Tố, được viết vào năm 1939, phản ánh sâu sắc cuộc sống cơ cực của người nông dân Việt Nam dưới ách bóc lột tàn bạo của chế độ thực dân – phong kiến" },
  { title: "Vỡ đê", story_id: 27, numberChapter: "2", desc: "Tác phẩm phản ánh tình cảnh khốn khổ của người dân lao động trong nạn đói và lũ lụt, đồng thời phơi bày bộ mặt giả dối, vô cảm của tầng lớp thống trị và quan lại đương thời" },
  { title: "Nửa chừng Xuân", story_id: 48, numberChapter: "18", desc: "Câu chuyện xoay quanh mối tình éo le giữa Lộc và Mai, hai con người trẻ tuổi chân thành nhưng bị ngăn trở bởi định kiến xã hội và lễ giáo gia đình" },
  { title: "Phan Đình Phùng", story_id: 43, numberChapter: "21", desc: "Tác phẩm “Phan Đình Phùng” của Đào Trinh Nhất là một trong những cuốn tiểu sử – khảo cứu lịch sử tiêu biểu về nhân vật anh hùng yêu nước cuối thế kỷ XIX" },

]
</script>

<style>
.topvote-title {
  font-weight: bold;
}

.ranking-box {
  flex: 1 1 calc(25% - 20px);
}

.demo-tabs>.el-tabs__content {
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

.bg-successfull-story {
  background-image: url('@/assets/image/Background-story-successfull.jpg');
  background-size: 100% 100%;
  background-position: center;
}

.two-line-ellipsis {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.story-card__horizontal {
  text-align: left;
  padding: 10px 0;
  gap: 10px;
}

.story-card__img {
  width: 40%;
}

.story-card__img img {
  max-width: 100%;
}

.author-card__img {
  padding: 25px 0;
}

.author-card__img img {
  box-shadow:
    -2px 0 4px rgba(0, 0, 0, 0.08),
    /* bên trái */
    0 2px 4px rgba(0, 0, 0, 0.08),
    /* bên dưới */
    0 -2px 4px rgba(0, 0, 0, 0.05);
  /* bên trên */
}
</style>
<style scoped>
.ranking-swiper {
  overflow: visible;
  /* để peek không bị cắt */
  padding-left: 10px;
  padding-right: 10px;
}

/* Peek effect trên mobile */
@media (max-width: 767px) {
  #ranking , .swiper-hidden-mb {
    overflow-x: hidden;
  }

  /* Giữ hiệu ứng peek */
  .ranking-swiper {
    overflow: visible;
    width: 100%;
    box-sizing: border-box;
  }

  .ranking-swiper .swiper-slide {
    width: 80% !important;
    /* lộ 20% box kế */
  }

  .story-card__img {
    justify-content: right;
    display: flex;
  }

  .story-card__img img {
    max-width: 55px;
  }

  .bg-successfull-story {
    background-image: unset !important;
  }
}

/* Desktop vẫn dạng grid 4 cột (Swiper auto xử lý qua slidesPerView) */
@media (min-width: 768px) {
  .ranking-swiper .swiper-slide {
    width: auto !important;
  }
}
</style>