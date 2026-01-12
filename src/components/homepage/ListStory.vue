<template>
    <h3 class="list-title text-color_primary border-b pb-2 title-mobile">Chương mới cập nhật</h3>
    <div class="list-container">
        <div @click="gotoChapDetail(item.story_id, item.chap_number)" v-for="(item, index) in items?.slice(0,8)" :key="index"
            class="list-item">
            <div class="item-img">
                <div class="book-cover-small">
                <img :src="item.story_img" alt="">
                </div>

            </div>
            <div class="item-text">
                <span class="text-one-line">{{ item.story_title }}</span>
                <span class="text-color__tertiary text-one-line">Chương {{ item.chap_number }}: {{ item.title}}</span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { getListChapterUpdate } from "@/api/chapter";
import { useRouter } from "vue-router";
const router = useRouter();
const emit = defineEmits(["update:items"]);
const items = ref();
function gotoChapDetail(storyId, chapterId) {
    router.push({
        name: "chap-detail",
        params: {
            id: storyId,
            chapId: chapterId
        }
    });
}
onMounted(async () => {
    try {
        const res = await getListChapterUpdate()
        const result = res.map((bItem) => ({
            title: bItem.title,
            text: "Chương " + bItem.chap_number,
            chap_number: bItem.chap_number,
            story_id: bItem.story_id
        }));
        items.value = res
    } catch (err) {
        console.error("Lỗi khi fetch API:", err);
    }
});
</script>
<style scoped>
.list-title {
    font-weight: bold;
    text-align: left;
}

.list-item {
    text-align: left;
    display: flex;
    padding: 12px 0;
    justify-content: space-between;
    border-bottom: solid 1px #E4E7EC;
}

.list-container>div:hover {
    cursor: pointer;
    background-color: #f7f6f2;
    transition: all .2s ease-in;
}

.text-one-line {
    max-width: 100%;
  display: -webkit-box;          /* ✅ cần thiết */
  -webkit-box-orient: vertical;  /* ✅ cần thiết */
  -webkit-line-clamp: 1;         /* ✅ số dòng muốn hiển thị */
  overflow: hidden;              /* ✅ cần thiết */
  text-overflow: ellipsis;       /* ⚠️ không bắt buộc, nhưng nên có */
  white-space: normal;           /* ✅ đảm bảo text có thể wrap */
}
.list-item .item-img {
  flex: 0 0 20%;  /* không co, không giãn, 20% */
}
.list-item .item-text {
  flex: 1;        /* chiếm phần còn lại */
}
.list-item .item-img img
{
    width: 60%;
    height: 50px;
    border-radius: 5px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
</style>
