<template>
    <h3 class="list-title text-color_primary border-b pb-2">Review tác phẩm</h3>
    <div class="list-container">
        <div @click="gotoPost(value.post_id)" class="list-item" v-for="value in items">
            <p class="text-ellipsis" style="max-width: 60%;;">{{ value.title }}</p>
            <p style="color: #AEAEAE; font-size: 14px; text-wrap: nowrap;">{{ value.username }}</p>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { getListChapterUpdate } from "@/api/chapter";
import { getPostForumByTopic } from "@/api/forum";
import { useRouter } from "vue-router";
const router = useRouter();
const emit = defineEmits(["update:items"]);
const items = ref([]);
function gotoChapDetail(storyId, chapterId) {
    router.push({
        name: "chap-detail",
        params: {
            id: storyId,
            chapId: chapterId
        }
    });
}
function gotoPost(id) {
    router.push({ name: 'post-detail', params: { id: id } });
}
onMounted(async () => {
    try {
        const res = await getPostForumByTopic(2,1,14)
        items.value = res.data
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
    padding: 10px 0;
    justify-content: space-between;
    border-bottom: solid 1px #E4E7EC;
}

.list-container>div:hover {
    cursor: pointer;
    background-color: #f7f6f2;
    transition: all .2s ease-in;
}

.text-two-line {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    /* số dòng muốn hiển thị */
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
}

.text-ellipsis {
    max-width: 70%;
    /* giới hạn chiều ngang */
    white-space: nowrap;
    /* không xuống dòng */
    overflow: hidden;
    /* ẩn phần dư thừa */
    text-overflow: ellipsis;
    /* hiển thị ... */
}
</style>
