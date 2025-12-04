<template>
    <div class="d-flex justify-content-center pb-3 gap-3">
        <slot name="header"></slot>
    </div>
    <div class="list-topvote">
        <div v-for="(item, index) in items" :key="index"
            class="topvote-item justify-content-between gap-4 d-flex text-start py-2">
            <div class="d-flex align-items-start">
                <img class="top-icon" v-if="index == 0" :src="rankingIcon1" alt="" srcset="">
                <img class="top-icon" v-if="index == 1" :src="rankingIcon2" alt="" srcset="">
                <img class="top-icon" v-if="index == 2" :src="rankingIcon3" alt="" srcset="">
                <span v-if="index > 2" class="color-gray fw-bold mx-2"> {{ index < 9 ? '0' + (index + 1) : index +1}}</span>
                        <div>
                            <p class="hover-link" @click="goToStory(item.story_id)">{{ item.story_title || item.title }}</p>
                            <p @click="profileUser(item.author_id)" class="text-sm text-color__tertiary hover-link" v-if="index == 0">Tác giả: {{ item.author_name }}
                            </p>
                            <p class="text-sm text-color__tertiary" v-if="index == 0">{{ item.coins_spent ? "Số đề cử "
                                + item.coins_spent /2 : ""}}</p>

                        </div>
            </div>
             <div class="pe-3">
                <img style="width: 52px; height: 66px;" v-if="index == 0" :src="item.urlImg" />
            </div>
        </div>
    </div>
</template>

<script setup>
import rankingIcon1 from '@/assets/icon/icon-ranking1.png'
import rankingIcon2 from '@/assets/icon/icon-ranking2.png'
import rankingIcon3 from '@/assets/icon/icon-ranking3.png'
import imageThumbail from '@/assets/image/img-vote.png'
import { useRouter } from 'vue-router'
const router = useRouter()
// ✅ Khai báo props (thay cho props: {...})
const props = defineProps({
  items: {
    type: Array,
    default: () => []
  },
  content: {
    type: String,
    default: "Người Đọc Đề Cử"
  }
})

// ✅ Biến reactive (thay cho data)
const rankingIcon1Ref = rankingIcon1
const rankingIcon2Ref = rankingIcon2
const rankingIcon3Ref = rankingIcon3
const imageThumbailRef = imageThumbail

function goToStory(post_id) {
    router.push({
        name: 'story',   // Tên route bạn đã định nghĩa trong router/index.js
        params: { id: post_id }       // Truyền param id
    })
}
function profileUser(id) {
  router.push({
    name: "user",
    params: { id }
  })
}
</script>

<style scoped>
.topvote-item .top-icon {
    width: 30px;
}
.hover-link:hover
{
   color: #FC6C28;
   cursor: pointer;
}
</style>