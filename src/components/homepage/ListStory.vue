<template>
    <h3 class="list-title text-color_primary border-b pb-2">Chương mới cập nhật</h3>
    <div class="list-container">
        <div @click="gotoChapDetail(item.story_id, item.chap_number)" v-for="(item, index) in items" :key="index"
            class="list-item">
            <span class="text-one-line">{{ item.title }}</span>
            <span class="text-color__tertiary">Chương {{ item.chap_number }}</span>
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
    padding: 10px 0;
    justify-content: space-between;
    border-bottom: solid 1px #E4E7EC;
}

.list-container>div:hover {
    cursor: pointer;
    background-color: #f7f6f2;
    transition: all .2s ease-in;
}

.text-one-line {
    max-width: 70%;
    text-wrap: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
