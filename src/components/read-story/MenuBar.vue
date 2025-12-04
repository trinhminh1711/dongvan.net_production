<template>
  <el-tabs v-if="storyData" v-model="activeName">
    <el-tab-pane label="Mục lục" name="first">
      <ul class="list-menu" style="list-style: none;">
        <li @click="gotoChap(value.chap_number)" class="my-3" v-for="(value, index) in bookIndex" :key="index">
          <p class="fw-bold hover_link">Chương {{ value.chap_number }} : {{ value.chapter_title }}</p>
          <p v-if="!value.isPayfee" class="text-sm">Miễn phí</p>
        </li>
      </ul>
    </el-tab-pane>
    <el-tab-pane label="Dấu trang" name="second">
      <ul class="list-menu" style="list-style: none;">
        <li class="my-3" v-for="(value, index) in props.bookmarkValue" :key="index">
          <p @click="goToBookmark(value)" class="fw-bold hover-link">Bookmark {{ index + 1 }} : {{ value.chapter_title
            }}
          </p>
          <p class="text-sm">Update: {{ value.updated_at.split("T")[0] }}</p>
        </li>
      </ul>
    </el-tab-pane>
  </el-tabs>
</template>

<script setup>
import { ref } from 'vue'
import { defineProps } from "vue";
import { onMounted } from "vue";
import { getStoryFullInfo, getReadingProgress } from '@/api/stories';
import { useRouter } from "vue-router";
import { nextTick } from 'vue'

const router = useRouter();
const props = defineProps({
  type: [Number, String],
  storyId: Number,
  chapterId: Number,
  userId: String,
  bookmarkValue: Array
});
const emit = defineEmits(['update:isBookmark'])
const storyData = ref(null)
const bookmark = ref()
const bookIndex = ref()

async function fetchChapter() {
  storyData.value = await getStoryFullInfo(props.storyId);

  bookIndex.value = (storyData.value.data).map(chap => ({
    chap_number: chap.chap_number,
    chapter_title: chap.chapter_title,
  }));


}
async function getBookMark() {
  const res = await getReadingProgress(props.userId, props.storyId)
  bookmark.value = res.data

  
   if (bookmark.value) {
    emit('update:isBookmark', true)
  }
}
function gotoChap(chap_number) {
  router.push({
    name: "chap-detail",
    params: {
      id: props.storyId,
      chapId: chap_number
    }
  });
}
function goToBookmark(bookmark) {
  router.push({
    name: 'chap-detail',
    params: {
      id: bookmark.story_id,
      chapId: bookmark.chapter_id
    },
    query: {
      scroll: bookmark.scroll
    }
  }).then(async () => {
    // chờ DOM render xong
    await nextTick()
    window.scrollTo({
      top: bookmark.scroll,
      behavior: 'smooth'
    })
  })
}

onMounted(async () => {
  await fetchChapter();
  await getBookMark()

});
const activeName = ref('first')


</script>
<style scoped>
.list-menu {
  padding: 0;
}

.list-menu p {
  line-height: 1.5rem;
  color: #000 !important;
}
.list-menu p:hover
{
  color: #ff6114 !important;
}
</style>
