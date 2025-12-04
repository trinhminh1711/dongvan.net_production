<template>
    <h3 class="list-title text-color_primary border-b mb-4 pb-2">{{ content }}</h3>
    <div class="row">
        <div v-for="(item, index) in items" class="list-container col-md-6">
            <div  :key="index" class="list-item">
                <span @click="goToStory(item.story_id)" class="hover-link text-one-line">{{ item.title }}</span>
                <span class="text-color__tertiary text-nowrap">{{ formatDateTime(item.create_at) }}</span>
            </div>
        </div>
    </div>
</template>

<script setup>
import top2Icon from '@/assets/icon/icon-top2-author.png'
import top3Icon from '@/assets/icon/icon-top3-author.png'
import { useRouter } from 'vue-router'
const router = useRouter()
function goToStory(post_id) {
    router.push({
        name: 'story',   // Tên route bạn đã định nghĩa trong router/index.js
        params: { id: post_id }       // Truyền param id
    })
}
// 🧩 Định nghĩa props
const props = defineProps({
  items: {
    type: Array,
    default: () => []
  },
  content: {
    type: String,
    default: "Top độc giả"
  }
})

// 🖼️ Biến hình ảnh
const top2IconSrc = top2Icon
const top3IconSrc = top3Icon

// 🕓 Hàm format thời gian
function formatDateTime(dateString) {
  const date = new Date(dateString)

  const day = String(date.getDate()).padStart(2, "0")
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const hours = String(date.getHours()).padStart(2, "0")
  const minutes = String(date.getMinutes()).padStart(2, "0")

  return `${hours}:${minutes} ${day}/${month}`
}
</script>


<style scoped>
.list-title {
    font-weight: bold;
    text-align: left;
}

.author-card__img img {
    max-width: 50px;
}

.list-item {
    text-align: left;
    display: flex;
    padding: 10px 0;
    justify-content: space-between;
    border-bottom: solid 1px #E4E7EC;
}

.active-top {
    background-image: url(/src/assets/Icon/icon-top2-author.png);
    background-size: contain;
    padding: 0 7px 7px 5px;
    color: #fff;
    background-repeat: no-repeat;
}
.hover-link:hover
{
   color: #FC6C28;
   cursor: pointer;
}
</style>
