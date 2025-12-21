<template>
    <div class="d-flex justify-content-center pb-3 gap-3">
        <slot name="header"></slot>
    </div>
    <div class="list-topvote">
        <div v-for="(item, index) in items" :key="index"
            class="topvote-item justify-content-between gap-4 d-flex text-start py-2">
            <div class="d-flex align-items-start">
                <img class="top-icon me-2" v-if="index == 0" :src="rankingIcon1" alt="" srcset="">
                <img class="top-icon me-2" v-if="index == 1" :src="rankingIcon2" alt="" srcset="">
                <img class="top-icon me-2" v-if="index == 2" :src="rankingIcon3" alt="" srcset="">
                <span v-if="index > 2" class="color-gray fw-bold mx-2 color-gray fw-bold mx-2"> {{ index < 9 ? '0' + (index + 1) : index + 1}}</span>
                        <div class=" ps-12 ps-md-16">
                            <p class="hover-link" @click="profileUser(item.author_id)">{{ item.author_name }}</p>
                            <p class="text-sm text-color__tertiary" v-if="index == 0">{{ item.total_reads }} lượt đọc</p>
                        </div>
            </div>
            <div class="pe-3">
                <img style="width: 52px; height: 66px;" v-if="index == 0" :src="item.link_thumbnail" />
            </div>
        </div>
    </div>
</template>

<script setup>
import rankingIcon1 from '@/assets/icon/icon-ranking1.png'
import rankingIcon2 from '@/assets/icon/icon-ranking2.png'
import rankingIcon3 from '@/assets/icon/icon-ranking3.png'
import imageThumbail from '@/assets/image/img-vote.png'
import { useRouter } from "vue-router"

// --- props ---
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

// --- router ---
const router = useRouter()

function profileUser(id) {
  router.push({
    name: "user",
    params: { id }
  })
}

// --- data ---
const rankingIcons = {
  rankingIcon1,
  rankingIcon2,
  rankingIcon3,
  imageThumbail
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