<template>
    <div class="pt-100">
        <h2 class="fw-semibold">Top Tác Giả Mới Của Tuần</h2>
        <div class="row gap-3 flex-md-nowrap mt-4">
            <div :style="{
                backgroundImage: `url(${getBgImage(index)})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }"  v-for="(item, index) in usersInfo" class="image-box col-md-4 gap-y-5">
                <p @click="goToProfile(item.data.user_id)" class="d-flex align-items-center gap-2">
                    <img style="border-radius: 50%; height: 50px; width: 50px;" :src="item.data.link_thumbnail" alt="">
                    <span class="fw-bold text-color_primary hover-link">{{ item.data.username }}</span>
                </p>
                <p class="text-start py-3"><span class="color-light-gray">Tác phẩm tiêu biểu: </span>
                    <span @click="readOnBook(item.storyDataId)" class="fw-bold text-color_primary hover-link">《 {{
                        item.storyData }} 》</span>
                </p>
                <p class="text-start"><span class="color-light-gray">Huy hiệu: </span> <span
                        class="fw-bold text-color_primary">Tác giả cấp {{ item.rank }}</span></p>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { getUserInfomation } from '@/api/other.user';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router'
const router = useRouter()
function goToProfile(params) {
    router.push({ name: 'user', params: { id: params } })
}
function readOnBook(storyId) {
    router.push({
        name: "story",
        params: { id: storyId }
    });
}
function getBgImage(index) {
    const images = [
      new URL('@/assets/image/bg-card-1.jpg', import.meta.url).href,
      new URL('@/assets/image/bg-card-2.jpg', import.meta.url).href,
     new URL('@/assets/image/bg-card-3.jpg', import.meta.url).href,
    ];
    return images[index % images.length];
  }
const authors = [
    {
        avatarImg:
            new URL('@/assets/image/TopAuthorWeek.jpg', import.meta.url).href,
        name: "Đông Phương Bất Bại", featuredWorks: "Tiêu Sơn Tráng Sĩ",
        authorLevel: 1
    },
    { avatarImg: new URL('@/assets/image/TopAuthorWeek2.jpg', import.meta.url).href, name: "Trương Nhã Hân ", featuredWorks: "Đạo đồ thần tọa", authorLevel: 2 },
    { avatarImg: new URL('@/assets/image/TopAuthorWeek3.jpg', import.meta.url).href, name: "Tăng Dĩ Phàm", featuredWorks: "Đạo đồ thần tọa", authorLevel: 2 },
]
const userIds = [10, 16, 11]
const usersInfo = ref([])
const storyData = ['Tiêu Sơn Tráng Sĩ', 'Vỡ đê', 'Cạm Bẫy Người']
const storyDataId = [28, 26, 20]
onMounted(async () => {
    try {
        // Gọi 3 API song song và đợi tất cả hoàn thành
        const results = await Promise.all(userIds.map(id => getUserInfomation(id)))
        usersInfo.value = results.map((user, index) => ({
            ...user,
            rank: `${index + 1}`,
            storyData: storyData[index],
            storyDataId: storyDataId[index],      // ví dụ: thêm thứ hạng
            fetchedAt: new Date().toISOString() // ví dụ: thêm thời điểm lấy dữ liệu
        }))

    } catch (error) {
        console.error('Lỗi lấy thông tin user:', error)
    }
})
</script>

<style scoped>
.image-box {
    padding: 20px;
    border: solid 1px #E4E7EC;
    border-radius: 10px;
}
</style>