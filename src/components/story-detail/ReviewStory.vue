<template>
  <div class="card p-3">
    <div v-if="rateData" class="row">
      <!-- Điểm trung bình -->
      <div class="col-4 d-flex flex-column align-items-center justify-content-center rate-number">
        <h2> {{ rateDataStar ? rateDataStar : "Chưa có đánh giá" }}</h2>

        <small>{{ rateData.length }} đánh giá</small>
      </div>

      <!-- Breakdown -->
      <div class="col-8">
        <div v-for="star in [5, 4, 3, 2, 1]" :key="star" class="rating-row d-flex my-3">
          <div class="me-2">
            <el-rate :model-value="star" disabled />
          </div>
          <el-progress style="width: 80%;" :percentage="getPercentage(star)" color="#fadb14" :stroke-width="14"
            :show-text="false" />
        </div>
      </div>
    </div>

    <!-- Button viết đánh giá -->
    <div class="text-end mt-3 d-flex justify-content-end">
      <button style="border-radius: 50px;" @click="auth.userId ? rateDialog = true : loginModal.open()"
        class="btn-alert d-flex align-items-center gap-2 py-2 px-4" type="danger" round>
        <img src="@/assets/icon/write-rate.png" /> <span class="text-16 py-2 fw-semibold">Viết đánh giá</span>
      </button>
    </div>
  </div>
  <div class="list-comment">
    <div v-for="comment in rateData" class="mt-5 d-flex gap-4">
      <div>
        <img   style="width: 45px; height: 45px; border-radius: 50%;"  :src="comment.link_thumbnail" alt="">
      </div>
      <div class="comment-items">
        <div class="comment-username d-flex align-items-center justify-content-between">
          <p class="fw-bold">{{ comment.username }}</p>
          <p style="color: #667085;">06/05/2025</p>
        </div>
        <div class="mt-2 d-flex align-items-center justify-content-between">
          <p class="pe-5" style="color: #344054; font-size: 14px; text-align: justify">{{ comment.comment }}</p>
          <el-rate v-model="comment.rating" disabled text-color="#ff9900" />
        </div>
      </div>
    </div>
  </div>
  <el-dialog v-model="rateDialog" title="Đánh giá và nhận xét" width="500">
    <div class="d-flex align-items-center gap-2">
      <span class="fw-bold">Đánh giá</span>
      <el-rate v-model="rateValue" :texts="['Chưa hay', 'Bình thường', 'Tạm được', 'Khá hay', 'Tuyệt vời']" show-text />
    </div>
    <div class="mt-2">
      <span class="fw-bold">Nhật xét</span>
      <el-input class="mt-2" v-model="rateComment" type="textarea" :rows="5"
        placeholder="Hãy cho chúng mình vài nhận xét và đóng góp ý kiến nhé!" />
    </div>
    <button @click="onRate()" style="width: 100%; height: 40px;" class="btn-alert mt-3"><span class="py-2">Gửi nhận
        xét</span></button>
  </el-dialog>
</template>

<script setup>
import { getStoryRate } from "@/api/author";
import { ref, onMounted } from "vue";
import { useAuthStore } from "@/stores/auth";
import { rateStory } from "@/api/author";
import { useLoginModal } from "@/stores/useLoginModal";
const loginModal = useLoginModal(0)
import { toast } from "vue3-toastify"; // nếu dùng toast
const auth = useAuthStore();
const props = defineProps({
  story_id: {
    type: [Number, String],
    required: true
  },
})
const rateDialog = ref(false);
const rateValue = ref();
const rateComment = ref();
const rateData = ref([]);
const ratingCounts = ref({ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 });
const rateDataStar = ref(0);

function avgRating(ratings) {
  if (!Array.isArray(ratings) || ratings.length === 0) return '0.0';
  const total = ratings.reduce((sum, item) => sum + (item.rating || 0), 0);
  const avg = total / ratings.length;
  return avg.toFixed(1); // luôn hiển thị 1 chữ số sau dấu thập phân
}
async function onRate() {
  const res = await rateStory(props.story_id, auth.userId, rateValue.value, rateComment.value);
  console.log(res);

  if (res.status == 201) {
    toast.success("Đã gửi đánh giá truyện")
    setTimeout(() => {
      window.location.reload()
    }, 1000);
  }
}
async function getRateting() {
  const res = await getStoryRate(props.story_id);

  rateData.value = res || [];
  rateDataStar.value = avgRating(res)
  ratingCounts.value = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  rateData.value.forEach(r => {
    ratingCounts.value[r.rating] = (ratingCounts.value[r.rating] || 0) + 1;
  });
}
const getPercentage = (star) => {
  const total = Object.values(ratingCounts.value).reduce((a, b) => a + b, 0);
  if (!total) return 0;
  return (ratingCounts.value[star] / total) * 100;
}
onMounted(async () => {
  await getRateting()

})
</script>
<style scoped>
.col-8 .rating-row {
  width: 100%;
}

.col-8 .rating-row>.el-progress {
  flex: 1;
  /* cho phép thanh progress chiếm hết phần còn lại */
  width: 100% !important;
}

.col-8 .rating-row>.me-2 {
  flex-shrink: 0;
  /* phần sao giữ nguyên kích thước */
}

.rate-number h2 {
  font-size: 80px;
}

.rate-number small {
  font-size: 16px;
}

.comment-items {
  background-color: #f9fafb;
  border-radius: 10px;
  padding: 20px;
  flex: 1;
}
</style>