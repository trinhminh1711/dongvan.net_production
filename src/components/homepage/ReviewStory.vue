<template>
    <h3 class="list-title text-color_primary border-b pb-2  title-mobile">Truyện mới cập nhật</h3>
    <div class="list-container">
        <div @click="gotoChapDetail(item.story_id)" v-for="(item, index) in items?.slice(0, 8)" :key="index"
            class="list-item">
            <div class="item-img">
                <div class="book-cover-small">
                    <img :src="item.urlImg || 'https://via.placeholder.com/150?text=No+Image'" alt="">
                </div>

            </div>
            <div class="item-text">
                <span class="text-one-line">{{ item.title }}</span>
                <span class="text-color__tertiary">{{ item.author_name }}</span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { getAllStory } from "@/api/stories";
const router = useRouter();
const emit = defineEmits(["update:items"]);
const items = ref();
function gotoChapDetail(storyId) {
    router.push({ name: 'story', params: { id: storyId } })
}
onMounted(async () => {
    try {
        const res = await getAllStory()
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
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
}

.list-item .item-img {
    flex: 0 0 20%;
    /* không co, không giãn, 20% */
}

.list-item .item-text {
    flex: 1;
    /* chiếm phần còn lại */
}

.list-item .item-img img {
    width: 60%;
    height: 50px;
    border-radius: 5px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
</style>
